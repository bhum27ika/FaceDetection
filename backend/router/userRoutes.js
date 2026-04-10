import express from "express";
import {
  getUserProfile,
  updateUserProfile,
  deleteUser,
} from "../controller/userController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/profile", authMiddleware, getUserProfile);
router.put("/profile", authMiddleware, updateUserProfile);
router.delete("/profile", authMiddleware, deleteUser);

export default router;