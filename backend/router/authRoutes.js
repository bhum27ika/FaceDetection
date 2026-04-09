import express from "express";
import { login, signUp } from "../controller/authController.js";

const router = express.Router();

router.post("/signup", signUp);
router.post("/login", login);

export default router;