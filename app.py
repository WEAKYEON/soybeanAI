from flask import Flask, request, render_template, jsonify
from io import BytesIO
import numpy as np
import os
import time
from waitress import serve

# --- นำเข้าไลบรารีฝั่ง TensorFlow / Keras ---
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing import image

# --- นำเข้าไลบรารีฝั่ง PyTorch ---
import torch
import timm
import torch.nn as nn
import torch.nn.functional as F
from torchvision import transforms
from PIL import Image

app = Flask(__name__)

# --- [ส่วนที่ 1: โหลดโมเดลทั้งหมด] ---
print("Loading models...")

# 1.1 โหลด TensorFlow/Keras Models
models_tf = {
    "model_MobileNetV3": load_model("model/soybean_model.h5"),
    "model_ResNet50V2": load_model("model/soybean_classifier_model.h5") 
}

# 1.2 โหลด PyTorch Model (Swin Transformer)
device = torch.device('cpu') # บังคับรันบน CPU เพื่อความเสถียรบนเซิร์ฟเวอร์

swin_model = timm.create_model('swin_tiny_patch4_window7_224', pretrained=False, num_classes=5)

# โหลด Weights
swin_model.load_state_dict(torch.load('model/swin_gamma05_best.pth', map_location=device))
swin_model.eval()

print("Models loaded successfully.")

class_names = ["Broken", "Immature", "Intact", "Skin-damaged", "Spotted"]

# เตรียมฟังก์ชันแปลงรูปภาพสำหรับ PyTorch
pytorch_transform = transforms.Compose([
    transforms.Resize((224, 224)),
    transforms.ToTensor(),
    transforms.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225])
])

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/predict", methods=["POST"])
def predict():
    file = request.files.get("file")
    if not file:
        return jsonify({"error": "No file uploaded"}), 400

    # รับค่า 'mode' ที่ส่งมาจากปุ่ม (เพิ่มโหมด swin เข้ามา)
    mode = request.form.get("mode", "fast").lower()
    
    selected_model = None
    model_used_key = None 

    # ⏳ 1. เริ่มจับเวลา (เริ่มนับตั้งแต่เตรียมแปลงรูปภาพ)
    start_time = time.time()

    # ---------------------------------------------------------
    # --- [ส่วนที่ 2.1: ประมวลผลด้วย PyTorch (Swin Transformer)] ---
    # ---------------------------------------------------------
    if mode == "swin":
        model_used_key = "model_SwinTransformer"
        
        # อ่านรูปภาพและแปลงเป็น RGB (ป้องกัน Error จากไฟล์ PNG พื้นหลังใส)
        pil_img = Image.open(BytesIO(file.read())).convert('RGB')
        
        # แปลงรูปเป็น Tensor
        input_tensor = pytorch_transform(pil_img).unsqueeze(0).to(device)
        
        # พยากรณ์โดยไม่เก็บ Gradient (ประหยัด RAM)
        with torch.no_grad():
            outputs = swin_model(input_tensor)
            # ใช้ Softmax แปลงค่าให้อยู่ในรูปแบบความน่าจะเป็น (0-1)
            probs = F.softmax(outputs[0], dim=0).cpu().numpy()
            
        prediction = class_names[np.argmax(probs)]
        percentages = {class_names[i]: float(probs[i] * 100) for i in range(len(class_names))}

    # ---------------------------------------------------------
    # --- [ส่วนที่ 2.2: ประมวลผลด้วย Keras (ResNet / MobileNet)] ---
    # ---------------------------------------------------------
    else:
        if mode == "slow":
            selected_model = models_tf["model_MobileNetV3"]
            model_used_key = "model_MobileNetV3"
        else: 
            mode = "fast"
            selected_model = models_tf["model_ResNet50V2"]
            model_used_key = "model_ResNet50V2"

        # โหลดรูปภาพแบบ Keras
        img = image.load_img(BytesIO(file.read()), target_size=(224, 224))
        img_array = image.img_to_array(img) / 255.0
        img_array = np.expand_dims(img_array, axis=0)

        # พยากรณ์
        pred = selected_model.predict(img_array)[0] 
        
        prediction = class_names[np.argmax(pred)]
        percentages = {class_names[i]: float(pred[i] * 100) for i in range(len(class_names))}

    # 2. หยุดจับเวลา
    end_time = time.time()
    
    # 3. คำนวณเวลาที่ใช้ไปทั้งหมด (แปลงเป็นมิลลิวินาที ทศนิยม 2 ตำแหน่ง)
    inference_ms = round((end_time - start_time) * 1000, 2)

    # 4. ส่งผลลัพธ์พร้อมเวลาที่จับได้ กลับไปยังหน้าเว็บ
    return jsonify({
        "prediction": prediction,
        "percentages": percentages,
        "mode": mode,
        "model_used": model_used_key,
        "inference_time_ms": inference_ms  
    })

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 7860))
    serve(app, host="0.0.0.0", port=port)