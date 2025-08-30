import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  email: string;
  passwordHash: string;
  displayName: string;
  role: "patient" | "doctor" | "hospital";
  createdAt: Date;
}

const UserSchema = new Schema<IUser>({
  email: { type: String, unique: true, required: true, index: true },
  passwordHash: { type: String, required: true },
  displayName: { type: String, required: true },
  role: {
    type: String,
    enum: ["patient", "doctor", "hospital"],
    required: true,
  },
  createdAt: { type: Date, default: Date.now },
});

export const User =
  mongoose.models.User || mongoose.model<IUser>("User", UserSchema);
