import express from "express";

import { ENV } from "./config/env.js";
import { connectDB } from "./config/db.js";

import authRoutes from "./routes/authRoutes.route.js";
import userRoutes from "./routes/userRoutes.route.js";

const app = express();

//todo: Middleware
app.use(express.json());

//todo: Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

//todo: Start Server
app.listen(ENV.PORT, async () => {
  try {
    await connectDB();

    console.log(`Server running in port: ${ENV.PORT || 7002}`);
  } catch (error) {
    console.error({ error: `Failed to start Server` });
  }
});
