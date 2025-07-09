import express from "express";

const router = express.Router();

// TODO: Routes only Admin
router.get("/admin", (req, res) => {
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
