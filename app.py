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

# ตั้งค่า Device สำหรับ PyTorch
device = torch.device('cpu')

# 1.2 โหลด PyTorch Model (Swin Transformer)
swin_model = timm.create_model('swin_tiny_patch4_window7_224', pretrained=False, num_classes=5)
swin_model.load_state_dict(torch.load('model/swin_gamma05_best.pth', map_location=device))
swin_model.eval()

# 1.3 โหลด PyTorch Model (Vision Transformer - ViT) 🌟 [ส่วนที่เพิ่มใหม่]
vit_model = timm.create_model('vit_base_patch16_224', pretrained=False, num_classes=5)
vit_model.load_state_dict(torch.load('model/modelvit0.8.pth', map_location=device))
vit_model.eval()

print("Models loaded successfully.")

class_names = ["Broken", "Immature", "Intact", "Skin-damaged", "Spotted"]

# เตรียมฟังก์ชันแปลงรูปภาพสำหรับ PyTorch (ใช้ร่วมกันได้ทั้ง Swin และ ViT)
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

    # รับค่า 'mode' ที่ส่งมาจากปุ่ม (รองรับ fast, slow, swin, vit)
    mode = request.form.get("mode", "fast").lower()
    
    selected_model = None
    model_used_key = None 

    # 1. เริ่มจับเวลา 
    start_time = time.time()

    # ---------------------------------------------------------
    # --- [ส่วนที่ 2.1: ประมวลผลด้วย PyTorch (Swin Transformer)] ---
    # ---------------------------------------------------------
    if mode == "swin":
        model_used_key = "model_SwinTransformer"
        
        pil_img = Image.open(BytesIO(file.read())).convert('RGB')
        input_tensor = pytorch_transform(pil_img).unsqueeze(0).to(device)
        
        with torch.no_grad():
            outputs = swin_model(input_tensor)
            probs = F.softmax(outputs[0], dim=0).cpu().numpy()
            
        prediction = class_names[np.argmax(probs)]
        percentages = {class_names[i]: float(probs[i] * 100) for i in range(len(class_names))}

    # ---------------------------------------------------------
    # --- [ส่วนที่ 2.2: ประมวลผลด้วย PyTorch (Vision Transformer)] --- 🌟 [ส่วนที่เพิ่มใหม่]
    # ---------------------------------------------------------
    elif mode == "vit":
        model_used_key = "model_VisionTransformer"
        
        pil_img = Image.open(BytesIO(file.read())).convert('RGB')
        input_tensor = pytorch_transform(pil_img).unsqueeze(0).to(device)
        
        with torch.no_grad():
            outputs = vit_model(input_tensor)
            probs = F.softmax(outputs[0], dim=0).cpu().numpy()
            
        prediction = class_names[np.argmax(probs)]
        percentages = {class_names[i]: float(probs[i] * 100) for i in range(len(class_names))}

    # ---------------------------------------------------------
    # --- [ส่วนที่ 2.3: ประมวลผลด้วย Keras (ResNet / MobileNet)] ---
    # ---------------------------------------------------------
    else:
        if mode == "slow":
            selected_model = models_tf["model_MobileNetV3"]
            model_used_key = "model_MobileNetV3"
        else: 
            mode = "fast"
            selected_model = models_tf["model_ResNet50V2"]
            model_used_key = "model_ResNet50V2"

        img = image.load_img(BytesIO(file.read()), target_size=(224, 224))
        img_array = image.img_to_array(img) / 255.0
        img_array = np.expand_dims(img_array, axis=0)

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