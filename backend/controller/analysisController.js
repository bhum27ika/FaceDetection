// import axios from "axios";
// import FormData from "form-data";

// export const createAnalysis = async (req, res) => {
//   try {
//     const { lat, lon } = req.body;

//     if (!req.file) {
//       return res.status(400).json({ error: "No image uploaded" });
//     }

//     // Send to FastAPI ML server
//     const formData = new FormData();
//     formData.append("file", req.file.buffer, "image.jpg");

//     if (lat) formData.append("lat", lat);
//     if (lon) formData.append("lon", lon);

//     const mlResponse = await axios.post(
//     "http://localhost:8000/predict",
//     formData,
//     {
//       headers: formData.getHeaders(),
//       timeout: 10000, // ✅ prevent hanging
//     }
//   );

//     const data = mlResponse.data;

//     // Optional formatting
//     return res.json({
//       condition: data.condition,
//       confidence: data.confidence,
//       severity: data.severity,
//       recommendations: data.recommendations,
//       dermatologists: data.dermatologists || [],
//     });

//   } catch (error) {
//     console.error(error.message);
//     res.status(500).json({ error: "ML Server Error" });
//   }
// };

import axios from "axios";
import FormData from "form-data";

const ML_SERVICE_URL = process.env.ML_SERVICE_URL || "http://localhost:8000";

export const createAnalysis = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No image uploaded" });
    }

    const { lat, lon } = req.body;

    // Build multipart form to forward to Python FastAPI
    const formData = new FormData();
    formData.append("file", req.file.buffer, {
      filename: "image.jpg",
      contentType: req.file.mimetype || "image/jpeg",
    });

    if (lat) formData.append("lat", String(lat));
    if (lon) formData.append("lon", String(lon));

    const mlResponse = await axios.post(
      `${ML_SERVICE_URL}/predict`,
      formData,
      {
        headers: formData.getHeaders(),
        timeout: 30000,
      }
    );

    const data = mlResponse.data;

    if (data.error) {
      return res.status(400).json({ error: data.error });
    }

    return res.status(200).json({
      condition: data.condition,       // "acne" | "spots" | "wrinkles"
      confidence: data.confidence,     // 0.0 – 1.0
      severity: data.severity,         // "mild" | "moderate" | "severe"
      recommendations: data.recommendations, // raw AI text from Groq
      dermatologists: data.dermatologists || [],
    });

  } catch (error) {
    console.error("Analysis error:", error.message);

    if (error.code === "ECONNREFUSED") {
      return res.status(503).json({ error: "ML server is not running. Please start FastAPI." });
    }
    if (error.code === "ECONNABORTED") {
      return res.status(504).json({ error: "ML server timed out." });
    }

    return res.status(500).json({ error: "Analysis failed: " + error.message });
  }
};
