import express from "express";

import { verifyToken } from "../middlewares/authMiddleware.js";

const router = express.Router();

// TODO: Routes only Admin
router.get("/admin", verifyToken, (req, res) => {
  res.json({ message: "Welcome Admin" });
});

// TODO: Routes only Manager (admin)
router.get("/manager", (req, res) => {
  res.json({ message: "Welcome Manager" });
});

// TODO: Routes User (admin, manager)
router.get("/user", (req, res) => {
  res.json({ message: "Welcome User" });
});

export default router;
