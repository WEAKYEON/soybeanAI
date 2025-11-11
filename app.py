from flask import Flask, request, render_template, jsonify
from io import BytesIO
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing import image
from waitress import serve
import numpy as np
import os

app = Flask(__name__)

# --- [ส่วนที่ 1: โหลดโมเดล (เหมือนเดิม)] ---
print("Loading models...")
models = {
    "model_MobileNetV3": load_model("model/soybean_model.h5"),
    "model_ResNet50V2": load_model("model/soybean_classifier_model.h5") 
}
print("Models loaded.")

class_names = ["Broken", "Immature", "Intact", "Skin-damaged", "Spotted"]

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/predict", methods=["POST"])
def predict():
    file = request.files.get("file")
    if not file:
        return jsonify({"error": "No file uploaded"}), 400

    # --- [ส่วนที่ 2: รับค่า 'mode' ที่ส่งมาจากปุ่ม (เหมือนเดิม)] ---
    mode = request.form.get("mode", "fast").lower()
    if mode not in {"fast", "slow"}:
        mode = "fast"
    
    selected_model = None
    model_used_key = None # สร้างตัวแปรไว้ส่งกลับ

    if mode == "slow":
        # ถ้าโหมด "ช้า" ให้ใช้โมเดล ResNet (ที่แม่นยำกว่า)
        selected_model = models["model_MobileNetV3"]
        model_used_key = "model_MobileNetV3"
    else: 
        # ถ้าโหมด "เร็ว" (หรือค่า default) ให้ใช้ MobileNet
        selected_model = models["model_ResNet50V2"]
        model_used_key = "model_ResNet50V2"
    # -----------------------------------------------

    # โหลดรูป (เหมือนเดิม)
    img = image.load_img(BytesIO(file.read()), target_size=(224, 224))
    img_array = image.img_to_array(img) / 255.0
    img_array = np.expand_dims(img_array, axis=0)

    # พยากรณ์โดยใช้โมเดลที่เลือกจาก 'mode' (เหมือนเดิม)
    pred = selected_model.predict(img_array)[0] 
    
    prediction = class_names[np.argmax(pred)]
    
    percentages = {class_names[i]: float(pred[i]*100) for i in range(len(class_names))}

    return jsonify({
        "prediction": prediction,
        "percentages": percentages,
        "mode": mode,
        "model_used": model_used_key # ส่งชื่อโมเดลที่ใช้จริงกลับไป
    })

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 8080))
    serve(app, host="0.0.0.0", port=port)