// path: /api/profile
import express from "express";
import validator from "validator";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
dotenv.config();

import { getUserById } from "../models/user.js";
import { verifyToken } from "../middlewares/token.js";
import { getUserByEmail } from "../models/user.js";

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

    if (req.body.first_name.length < 3 || req.body.last_name.length < 3) {
      return res.status(400).json({
        message: "First name and last name must be at least 3 chars",
      });
    }

    // Validate email
    if (!validator.isEmail(req.body.email)) {
      return res.status(400).json({ message: "Email is not valid" });
    }
    // Validate phone number
    if (!validator.isMobilePhone(req.body.phone, ["ar-EG"])) {
      return res.status(400).json({ message: "Phone number is not valid" });
    }
    // Check if the email is already registered
    const existingUser = await getUserByEmail(req.body.email);
    if (existingUser && existingUser._id != user_id) {
      return res.status(400).json({ message: "Email already exists" });
    }

    // Validate address
    if (
      (req.body.address.country.length ||
        req.body.address.governorate.length ||
        req.body.address.city.length ||
        req.body.address.street.length) &&
      (!req.body.address.country.length ||
        !req.body.address.governorate.length ||
        !req.body.address.city.length ||
        !req.body.address.street.length)
    ) {
      return res.status(400).json({
        message:
          "Address is not valid, all fields should be provided or delete all",
      });
    }
    if (
      !req.body.address.country.length &&
      !req.body.address.governorate.length &&
      !req.body.address.city.length &&
      !req.body.address.street.length
    ) {
      req.body.address = null;
    }

    req.body.first_name ? (user.first_name = req.body.first_name) : null;
    req.body.last_name ? (user.last_name = req.body.last_name) : null;
    req.body.email ? (user.email = req.body.email) : null;
    req.body.phone ? (user.phone = req.body.phone) : null;
    user.address = req.body.address;

    const updatedUser = await user.save();

    res.json({
      message: "Your profile has been updated",
      profile: {
        first_name: updatedUser.first_name,
        last_name: updatedUser.last_name,
        email: updatedUser.email,
        phone: updatedUser.phone,
        address: updatedUser.address,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put("/password", verifyToken, async (req, res) => {
  try {
    const user_id = req.user_id;
    const oldPassword = req.body.oldPassword;
    const newPassword = req.body.newPassword;

    if (!oldPassword || !newPassword) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const user = await getUserById(user_id);
    bcrypt.compare(oldPassword, user.password_hash).then((isMatch) => {
      if (!isMatch) {
        return res.status(400).json({ message: "Old password is incorrect" });
      }

      // Validate password, must be at least 8 characters long and contain at least 1 number, 1 uppercase letter, and 1 lowercase letter
      if (!validator.isStrongPassword(newPassword, { minSymbols: 0 })) {
        return res
          .status(400)
          .json({ message: "Password is not strong enough" });
      }

      const password_hash = bcrypt.hashSync(newPassword, 10);
      user.password_hash = password_hash;
      user.save();

      res.json({ message: "Your password has been updated" });
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
