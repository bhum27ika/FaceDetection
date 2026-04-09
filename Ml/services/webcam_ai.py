import cv2
import numpy as np
import tensorflow as tf
import time
from ai_agent import generate_ai_recommendation

# Load ML model
import os
import tensorflow as tf

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

model_path = os.path.join(BASE_DIR, "model", "skin_model.h5")

print("Model path:", model_path)
print("Exists:", os.path.exists(model_path))

model = tf.keras.models.load_model(model_path)

# Update according to your model
classes = ["Wrinkles", "Spots", "Acne"]

# Convert confidence → severity
def get_severity(conf):
    if conf < 0.5:
        return "Low"
    elif conf < 0.75:
        return "Moderate"
    else:
        return "High"

# Start webcam
cap = cv2.VideoCapture(0)

last_called = 0

print("Press 'q' to exit...\n")

while True:
    ret, frame = cap.read()
    if not ret:
        break

    # Preprocess image
    img = cv2.resize(frame, (224, 224))
    img = img / 255.0
    img = np.expand_dims(img, axis=0)

    # Prediction
    pred = model.predict(img, verbose=0)
    class_index = np.argmax(pred)
    confidence = float(np.max(pred))

    label = classes[class_index]
    severity = get_severity(confidence)

    # Call AI every 5 sec (IMPORTANT)
    if time.time() - last_called > 5:
        ai_output = generate_ai_recommendation(label, severity)

        print("="*60)
        print(f"Prediction : {label}")
        print(f"Confidence : {confidence:.2f}")
        print(f"Severity   : {severity}")
        print("\n🧠 AI Recommendation:\n")
        print(ai_output)

        last_called = time.time()

    # Show webcam
    cv2.imshow("Webcam", frame)

    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

cap.release()
cv2.destroyAllWindows()