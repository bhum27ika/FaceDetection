import tensorflow as tf
import numpy as np
from utils.preprocessing import preprocess_image

# Load model
model = tf.keras.models.load_model(
    "model/skin_model.h5",
    compile=False
)

classes = ['acne', 'spots', 'wrinkles']

def predict_skin(img):
    img = preprocess_image(img)

    prediction = model.predict(img)
    class_id = int(np.argmax(prediction))
    confidence = float(np.max(prediction))

    condition = classes[class_id]

    if confidence > 0.75:
        severity = "severe"
    elif confidence > 0.5:
        severity = "moderate"
    else:
        severity = "mild"

    return condition, confidence, severity