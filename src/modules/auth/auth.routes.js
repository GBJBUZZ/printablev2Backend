import { Router } from "express";
import { 
  register, 
  login, 
  forgotPassword, 
  verifyOTP, 
  resetPassword, 
  googleAuth 
} from "./auth.controller.js";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.post("/forgot-password", forgotPassword);
router.post("/verify-otp", verifyOTP);
router.post("/reset-password", resetPassword);
router.post("/google-auth", googleAuth);

export default router;
