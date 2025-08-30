import { RequestHandler } from "express";
import { connectDB } from "../db";
import { User } from "../models/User";

export const ping: RequestHandler = async (_req, res) => {
  try {
    const conn = await connectDB(process.env.MONGODB_URI || "");
    return res.json({
      ok: true,
      host: (conn as any).host,
      name: (conn as any).name,
      readyState: conn.readyState,
    });
  } catch (e: any) {
    return res.status(500).json({ ok: false, message: e.message });
  }
};

export const usersCount: RequestHandler = async (_req, res) => {
  try {
    await connectDB(process.env.MONGODB_URI || "");
    const count = await User.countDocuments();
    return res.json({ ok: true, count });
  } catch (e: any) {
    return res.status(500).json({ ok: false, message: e.message });
  }
};
