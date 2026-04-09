# Soybean Seed Quality Classification

[![Hugging Face Space](https://img.shields.io/badge/%F0%9F%A4%97%20Hugging%20Face-Spaces-blue)](https://huggingface.co/spaces/WEAKYEON/soybeanAI)
![Python](https://img.shields.io/badge/python-3.8+-blue.svg)
![TensorFlow](https://img.shields.io/badge/TensorFlow-2.x-orange.svg)
![PyTorch](https://img.shields.io/badge/PyTorch-2.x-red.svg)

A deep learning-based web application designed to classify and detect defects in soybean seeds. This project demonstrates the evolution from traditional CNN architectures to state-of-the-art **Vision Transformers (ViT)** to achieve higher accuracy in agricultural quality control.

## Key Features
* **High Precision Classification:** Identifies 5 classes of seed quality (Intact, Broken, Spotted, Immature, Skin-damaged).
* **Model Evolution:** Includes a transition from CNNs to Transformers for enhanced feature extraction and global context understanding.
* **Interactive Web App:** High-speed, user-friendly interface deployed for real-time seed analysis with simulated inference metrics.

## Model Architecture Evolution
In this project, I experimented with and improved the model architecture to find the best performance for seed defect detection:

| Architecture Type | Models Implemented | Note |
| :--- | :--- | :--- |
| **Baseline (CNN)** | MobileNetV3, ResNet50V2 | Fast and efficient, but hit a plateau in complex defect patterns. Developed with TensorFlow/Keras. |
| **SOTA (Transformers)** | **Swin Transformer, Vision Transformer (ViT)** | **Current Version:** Superior global context understanding, leading to higher detection accuracy. Developed with PyTorch & timm. |

## Tech Stack
* **Deep Learning Frameworks:** TensorFlow / Keras, PyTorch
* **Architectures:** ViT, Swin Transformer, ResNet50V2, MobileNetV3
* **Backend:** Python (Flask), Waitress
* **Frontend:** HTML5, TailwindCSS, Vanilla JavaScript (Vanilla JS)
* **Deployment:** Hugging Face Spaces

## Installation & Usage
1. Clone the repository:
   ```bash
   git clone [https://github.com/WEAKYEON/soybeanAI.git](https://github.com/WEAKYEON/soybeanAI.git)
   cd soybeanAI
   ```
2. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
3. Run the application:
   ```bash
   python app.py
   ```
   The server will start on http://localhost:7860 (or your defined PORT).
   
## Live Demo
Check out the live demo here: https://huggingface.co/spaces/WEAKYEON/soybeanAI
