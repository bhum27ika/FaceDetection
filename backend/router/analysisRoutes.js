import express from "express";
import multer from "multer";
import { createAnalysis } from "../controller/analysisController.js";


const router = express.Router();

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 }, // 10 MB
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new Error("Only image files are allowed"), false);
    }
  },
});

// POST /api/analysis
// React Native sends FormData with field name "file"
// multer field name here MUST match that exactly
router.post("/", upload.single("file"), createAnalysis);

export default router;
