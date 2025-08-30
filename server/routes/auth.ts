import { RequestHandler } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { connectDB } from "../db";
import { User } from "../models/User";

const TOKEN_TTL_SECONDS = 60 * 60 * 24 * 7; // 7 days

function signToken(payload: object) {
  const secret = process.env.JWT_SECRET;
  if (!secret) throw new Error("JWT_SECRET not set");
  return jwt.sign(payload, secret, { expiresIn: TOKEN_TTL_SECONDS });
}

export const signup: RequestHandler = async (req, res) => {
  try {
    await connectDB(process.env.MONGODB_URI || "");

    const { email, password, displayName, role } = req.body || {};
    if (!email || !password || !displayName || !role) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const existing = await User.findOne({ email: email.toLowerCase() });
    if (existing) {
      return res.status(409).json({ message: "An account with this email already exists." });
    }

    const passwordHash = await bcrypt.hash(password, 12);
    const user = await User.create({
      email: email.toLowerCase(),
      passwordHash,
      displayName,
      role,
    });

    const token = signToken({ uid: user.id });

    return res.status(201).json({
      token,
      user: {
        uid: user.id,
        email: user.email,
        displayName: user.displayName,
        role: user.role,
        createdAt: user.createdAt,
      },
    });
  } catch (err: any) {
    return res.status(500).json({ message: err.message || "Signup failed" });
  }
};

export const login: RequestHandler = async (req, res) => {
  try {
    await connectDB(process.env.MONGODB_URI || "");

    const { email, password } = req.body || {};
    if (!email || !password) {
      return res.status(400).json({ message: "Missing email or password" });
    }

    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) return res.status(404).json({ message: "No account found with this email address." });

    const valid = await bcrypt.compare(password, user.passwordHash);
    if (!valid) return res.status(401).json({ message: "Incorrect password. Please try again." });

    const token = signToken({ uid: user.id });

    return res.json({
      token,
      user: {
        uid: user.id,
        email: user.email,
        displayName: user.displayName,
        role: user.role,
        createdAt: user.createdAt,
      },
    });
  } catch (err: any) {
    return res.status(500).json({ message: err.message || "Login failed" });
  }
};

export const me: RequestHandler = async (req, res) => {
  try {
    await connectDB(process.env.MONGODB_URI || "");

    const authHeader = req.headers.authorization || "";
    const token = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : null;
    if (!token) return res.status(401).json({ message: "Missing token" });

    const secret = process.env.JWT_SECRET;
    if (!secret) throw new Error("JWT_SECRET not set");

    const decoded = jwt.verify(token, secret) as { uid: string };
    const user = await User.findById(decoded.uid);
    if (!user) return res.status(404).json({ message: "User not found" });

    return res.json({
      user: {
        uid: user.id,
        email: user.email,
        displayName: user.displayName,
        role: user.role,
        createdAt: user.createdAt,
      },
    });
  } catch (err: any) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};
