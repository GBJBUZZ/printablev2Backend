import prisma from "../../config/db.js";

import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { hashPassword } from "../../utils/token.js";
import { 
  sendRegistrationMail, 
  sendOTPEmail, 
  sendPasswordUpdatedMail 
} from "../../utils/mailer.js";
import { OAuth2Client } from "google-auth-library";

// Google Client
const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// ========================= REGISTER =========================

export const register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields required" });
    }

    const exist = await prisma.users.findUnique({ where: { email } });
    if (exist) {
      return res.status(409).json({ message: "Email already registered" });
    }

    const allowedRoles = ["user", "merchant", "admin"];
    const finalRole = allowedRoles.includes(role) ? role : "user";

    const hashed = await hashPassword(password);

    const user = await prisma.users.create({
      data: {
        name,
        email,
        password: hashed,
        role: finalRole,
      },
    });

    sendRegistrationMail(email, name);

    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    return res.status(201).json({
      message: "User registered successfully",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      token,
    });

  } catch (err) {
    console.error("Register Error:", err);
    return res.status(500).json({ message: "Server error", error: err.message });
  }
};

// ========================= LOGIN =========================

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password required" });
    }

    const user = await prisma.users.findUnique({ where: { email } });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password || "");
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    return res.status(200).json({
      message: "Login successful",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      token,
    });

  } catch (err) {
    console.error("Login Error:", err);
    return res.status(500).json({ message: "Server error", error: err.message });
  }
};

// ========================= FORGOT PASSWORD =========================

export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) return res.status(400).json({ message: "Email is required" });

    const user = await prisma.users.findUnique({ where: { email } });
    if (!user) return res.status(404).json({ message: "User not found" });

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expireTime = new Date(Date.now() + 10 * 60 * 1000);

    await prisma.users.update({
      where: { email },
      data: { otp, otp_expire: expireTime },
    });

    await sendOTPEmail(email, otp);

    return res.status(200).json({ message: "OTP sent to your email" });

  } catch (err) {
    console.error("Forgot Password Error:", err);
    return res.status(500).json({ message: "Server error", error: err.message });
  }
};

// ========================= VERIFY OTP =========================

export const verifyOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp)
      return res.status(400).json({ message: "Email and OTP required" });

    const user = await prisma.users.findUnique({ where: { email } });

    if (!user) return res.status(404).json({ message: "User not found" });

    if (user.otp !== otp) return res.status(400).json({ message: "Invalid OTP" });

    if (user.otp_expire < new Date())
      return res.status(400).json({ message: "OTP expired" });

    await prisma.users.update({
      where: { email },
      data: { otp: null, otp_expire: null },
    });

    return res.status(200).json({ message: "OTP verified successfully" });

  } catch (err) {
    console.error("Verify OTP Error:", err);
    return res.status(500).json({ message: "Server error", error: err.message });
  }
};

// ========================= RESET PASSWORD =========================

export const resetPassword = async (req, res) => {
  try {
    const { email, newPassword } = req.body;

    if (!email || !newPassword)
      return res.status(400).json({ message: "Email and new password required" });

    const user = await prisma.users.findUnique({ where: { email } });

    if (!user) return res.status(404).json({ message: "User not found" });

    const hashed = await bcrypt.hash(newPassword, 10);

    await prisma.users.update({
      where: { email },
      data: { password: hashed, otp: null, otp_expire: null },
    });

    sendPasswordUpdatedMail(email, user.name);

    return res.status(200).json({ message: "Password updated successfully" });

  } catch (err) {
    console.error("Reset Password Error:", err);
    return res.status(500).json({ message: "Server error", error: err.message });
  }
};

// ========================= GOOGLE AUTH =========================

export const googleAuth = async (req, res) => {
  try {
    const { idToken } = req.body;

    if (!idToken) {
      return res.status(400).json({ message: "Google token required" });
    }

    // verify token
    const ticket = await googleClient.verifyIdToken({
      idToken,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    const email = payload.email;
    const name = payload.name;

    if (!email) {
      return res.status(400).json({ message: "Invalid Google account" });
    }

    let user = await prisma.users.findUnique({ where: { email } });

    if (!user) {
      // new user create
      user = await prisma.users.create({
        data: {
          name,
          email,
          password: null,
          role: "user",
        },
      });
    }

    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    return res.status(200).json({
      message: "Google login successful",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      token,
    });

  } catch (err) {
    console.error("Google Auth Error:", err);
    return res.status(500).json({
      message: "Server error",
      error: err.message,
    });
  }
};
