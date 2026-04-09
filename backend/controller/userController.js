import User from "../models/User.js";

// GET PROFILE
export const getUserProfile = async (req, res) => {
  const user = await User.findById(req.user.id).select("-password");
  res.json(user);
};

// UPDATE PROFILE (Questionnaire)
export const updateUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user) return res.status(404).json({ message: "User not found" });

    user.skinType = req.body.skinType || user.skinType;
    user.skinConcerns = req.body.skinConcerns || user.skinConcerns;
    user.allergies = req.body.allergies || user.allergies;
    user.completedQuestionnaire = req.body.completedQuestionnaire ?? true;

    const updatedUser = await user.save();

    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE USER
export const deleteUser = async (req, res) => {
  await User.findByIdAndDelete(req.user.id);
  res.json({ message: "User deleted" });
};