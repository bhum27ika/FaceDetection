import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },

    // Questionnaire fields
    skinType: { type: String },
    skinConcerns: [{ type: String }],
    allergies: [{ type: String }],
    completedQuestionnaire: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);