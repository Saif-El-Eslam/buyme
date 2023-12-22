// path: /api/profile
import express from "express";
import dotenv from "dotenv";
dotenv.config();

import { getUserById } from "../models/user.js";
import { verifyToken } from "../middlewares/token.js";

const router = express.Router();

router.get("/", verifyToken, async (req, res) => {
  try {
    const user_id = req.user_id;
    const user = await getUserById(user_id);

    res.json({
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      phone: user.phone,
      address: user.address,
      payment_method: user.payment_method,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put("/", verifyToken, async (req, res) => {
  try {
    const user_id = req.user_id;
    const user = await getUserById(user_id);

    req.body.first_name ? (user.first_name = req.body.first_name) : null;
    req.body.last_name ? (user.last_name = req.body.last_name) : null;
    req.body.email ? (user.email = req.body.email) : null;
    req.body.phone ? (user.phone = req.body.phone) : null;
    req.body.address ? (user.address = req.body.address) : null;
    req.body.payment_method
      ? (user.payment_method = req.body.payment_method)
      : null;

    const updatedUser = await user.save();

    res.json({
      first_name: updatedUser.first_name,
      last_name: updatedUser.last_name,
      email: updatedUser.email,
      phone: updatedUser.phone,
      address: updatedUser.address,
      payment_method: updatedUser.payment_method,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
