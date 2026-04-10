import mongoose from "mongoose";

const analysisSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },

  condition: String,
  severity: String,
  confidence: Number,

  recommendations: String,

  imageUrl: String,

}, { timestamps: true });

export default mongoose.model("Analysis", analysisSchema);