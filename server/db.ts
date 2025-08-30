import mongoose from "mongoose";

let isConnected = false;

export async function connectDB(uri: string) {
  if (isConnected) return mongoose.connection;
  if (!uri) throw new Error("MONGODB_URI is not set");

  mongoose.set("strictQuery", true);

  await mongoose.connect(uri, {
    dbName: process.env.MONGODB_DB || undefined,
  });

  isConnected = true;
  return mongoose.connection;
}

export function getConnection() {
  if (!isConnected) throw new Error("Database not connected");
  return mongoose.connection;
}
