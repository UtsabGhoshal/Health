import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import { connectDB } from "./db";   // 👈 import connectDB

import { handleDemo } from "./routes/demo";
import { getAllDoctors, getDoctorById, getDoctorSpecialties } from "./routes/doctors";
import { getAppointments, createAppointment, updateAppointment, cancelAppointment } from "./routes/appointments";
import { getMedicalRecords, createMedicalRecord, updateMedicalRecord, deleteMedicalRecord } from "./routes/medical-records";
import { signup, login, me } from "./routes/auth";
import { ping, usersCount } from "./routes/db";

export function createServer() {
  const app = express();

  // Middleware
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // ✅ Connect to MongoDB
  connectDB(process.env.MONGODB_URI!)
    .then(() => console.log("✅ MongoDB connected"))
    .catch((err) => console.error("❌ MongoDB connection error:", err));

  // Example API routes
  app.get("/api/ping", (_req, res) => {
    const ping = process.env.PING_MESSAGE ?? "ping";
    res.json({ message: ping });
  });

  app.get("/api/demo", handleDemo);

  // Doctor routes
  app.get("/api/doctors", getAllDoctors);
  app.get("/api/doctors/specialties", getDoctorSpecialties);
  app.get("/api/doctors/:id", getDoctorById);

  // Appointment routes
  app.get("/api/appointments", getAppointments);
  app.post("/api/appointments", createAppointment);
  app.put("/api/appointments/:id", updateAppointment);
  app.delete("/api/appointments/:id", cancelAppointment);

  // Medical records routes
  app.get("/api/medical-records", getMedicalRecords);
  app.post("/api/medical-records", createMedicalRecord);
  app.put("/api/medical-records/:id", updateMedicalRecord);
  app.delete("/api/medical-records/:id", deleteMedicalRecord);

  // Auth routes
  app.post("/api/auth/signup", signup);
  app.post("/api/auth/login", login);
  app.get("/api/auth/me", me);

  // DB diagnostics
  app.get("/api/db/ping", ping);
  app.get("/api/db/users/count", usersCount);

  return app;
}
