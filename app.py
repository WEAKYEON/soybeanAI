from flask import Flask, request, render_template, jsonify
from io import BytesIO
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing import image
import numpy as np
import os  # <--- เพิ่มตรงนี้

app = Flask(__name__)

# Load model
model = load_model("model/soybean_model.h5")
class_names = ["Broken", "Immature", "Intact", "Skin-damaged", "Spotted"]

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/predict", methods=["POST"])
def predict():
    file = request.files.get("file")
    if not file:
        return jsonify({"error": "No file uploaded"}), 400

    # โหลดรูป
    img = image.load_img(BytesIO(file.read()), target_size=(224, 224))
    img_array = image.img_to_array(img) / 255.0
    img_array = np.expand_dims(img_array, axis=0)

    # พยากรณ์
    pred = model.predict(img_array)[0]  # shape = (5,)
    prediction = class_names[np.argmax(pred)]
    
    # สร้าง dictionary ของเปอร์เซ็นต์
    percentages = {class_names[i]: float(pred[i]*100) for i in range(len(class_names))}

    return jsonify({
        "prediction": prediction,
        "percentages": percentages
    })

if __name__ == "__main__":
    # ใช้ port จาก environment variable ของ Render หรือ default 8080
    port = int(os.environ.get("PORT", 8080))
    from waitress import serve
    serve(app, host="0.0.0.0", port=port)
