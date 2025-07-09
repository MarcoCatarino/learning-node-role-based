import mongoose from "mongoose";
import { ENV } from "./env.js";

export const connectDB = async () => {
  try {
    await mongoose.connect(ENV.MONGO_URI);
    console.log("Connected to DB ✅");
  } catch (error) {
    console.error({ error: "Error Connecting to DB ❌" });
    process.exit(1);
  }
};
