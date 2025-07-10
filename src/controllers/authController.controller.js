import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import { ENV } from "../config/env.js";
import User from "../models/userModel.js";

export const signup = async (req, res) => {
  try {
    const { username, password, role } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ username, password: hashedPassword, role });

    const existingUser = await User.findOne({ username });
    if (existingUser)
      return res.status(409).json({ message: "User already exist" });

    await newUser.save();

    res.status(201).json({ message: "User registered" });
  } catch (error) {
    res.status(400).json({ error: "User couldn't be created" });
  }
};

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    if (!user) return res.status(404).json({ message: "User doesn't exist" });

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch)
      return res.status(400).json({ message: "Invalid Credentials" });

    const token = jwt.sign({ id: user._id, role: user.role }, ENV.JWT_SECRET, {
      expiresIn: "1hr",
    });

    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ error: "Something went wrong!" });
  }
};
