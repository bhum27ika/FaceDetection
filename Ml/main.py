from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware

from services.mobile_handler import process_mobile_image
from services.prediction import predict_skin
from services.ai_agent import generate_ai_recommendation
from services.dermatologist import get_dermatologists

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/predict")
async def predict(file: UploadFile = File(...), lat: float = None, lon: float = None):
    image_bytes = await file.read()

    # 📱 Process mobile image
    img, error = process_mobile_image(image_bytes)
    if error:
        return {"error": error}

    # 🧠 CNN prediction
    condition, confidence, severity = predict_skin(img)

    # 🤖 AI agent
    ai_response = generate_ai_recommendation(condition, severity)

    # 📍 Dermatologist
    dermatologists = []
    if severity == "severe" and lat and lon:
        dermatologists = get_dermatologists(lat, lon)

    return {
        "condition": condition,
        "confidence": confidence,
        "severity": severity,
        "recommendations": ai_response,
        "dermatologists": dermatologists
    }