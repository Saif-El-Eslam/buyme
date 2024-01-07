// path: /api/auth
import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import validator from "validator";
import sgMail from "@sendgrid/mail";
import dotenv from "dotenv";
dotenv.config();

import {
  createUser,
  getUserByEmail,
  getUserById,
  updateUser,
} from "../models/user.js";
import { createCart } from "../models/cart.js";
import { verifyToken, verifyEmailToken } from "../middlewares/token.js";

const router = express.Router();

router.post("/signup", async (req, res) => {
  const {
    first_name,
    last_name,
    email,
    password,
    verify_password,
    phone,
    address,
    role,
  } = req.body;

  // Validate password, must be at least 8 characters long and contain at least 1 number, 1 uppercase letter, and 1 lowercase letter
  if (!validator.isStrongPassword(password, { minSymbols: 0 })) {
    return res.status(400).json({ message: "Password is not strong enough" });
  }
  // Validate password and verify password
  if (password !== verify_password) {
    return res.status(400).json({ message: "Passwords do not match" });
  }
  // Validate email
  if (!validator.isEmail(email)) {
    return res.status(400).json({ message: "Email is not valid" });
  }
  // Validate phone number
  if (!validator.isMobilePhone(phone, ["ar-EG"])) {
    return res.status(400).json({ message: "Phone number is not valid" });
  }

  // Check if the email is already registered
  const existingUser = await getUserByEmail(email);
  if (existingUser) {
    return res.status(400).json({ message: "Email already exists" });
  }

  const password_hash = await bcrypt.hash(password, 10);

  const payment_method = {
    payment_type: "cash",
  };

  createUser({
    first_name,
    last_name,
    email,
    password_hash,
    phone,
    role,
    address,
    payment_method,
  })
    .then((result) => {
      createCart({ user_id: result._id, products: [], total_price: 0 });

      res.send("User created successfully");
    })
    .catch((error) => {
      res.send(error.message).status(500);
    });
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate email
    if (!validator.isEmail(email)) {
      return res.status(400).json({ message: "Email is not valid" });
    }

    const user = await getUserByEmail(email);
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    bcrypt.compare(password, user.password_hash).then((result) => {
      if (!result) {
        return res.status(400).json({ message: "Invalid email or password" });
      }

      const token = jwt.sign(
        { user_id: user._id, email, role: user.role },
        process.env.TOKEN_KEY,
        {
          expiresIn: "12h",
        }
      );

      // add token to user
      updateUser(user._id, { token });

      res.json({ token, role: user.role });
    });
  } catch (error) {
    res.send(error.message).status(500);
  }
});

router.post("/logout", verifyToken, (req, res) => {
  try {
    const { user_id } = req;

    // get user
    getUserById(user_id).then((user) => {
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      // check the token
      if (user.token !== req.headers.authorization.split(" ")[1]) {
        return res.status(401).json({ message: "Unauthorized: Token expired" });
      }

      // remove token from user
      updateUser(user_id, { token: null });

      res.json({ message: "Loged out!" });
    });
  } catch (error) {
    res.send(error.message).status(500);
  }
});

router.post("/verify-email", verifyToken, (req, res) => {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);

  try {
    const user_id = req.user_id;
    // get user
    getUserById(user_id).then((user) => {
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      // check the token
      if (user.token !== req.headers.authorization.split(" ")[1]) {
        return res.status(401).json({ message: "Unauthorized: Token expired" });
      }

      // check if the user is already verified
      if (user.isVerified) {
        return res
          .status(400)
          .json({ message: "User is already verified, please login" });
      }

      // create token
      const token = jwt.sign(
        { user_id: user._id, email: user.email },
        process.env.TOKEN_KEY,
        {
          expiresIn: "2h",
        }
      );
      // add token to user
      updateUser(user_id, { verify_email_token: token });

      // send email
      const msg = {
        to: "saif82820@gmail.com",
        from: "saifeleslam3520@gmail.com",
        subject: "Verify your email",
        text: "Verify your email",
        html: `<!DOCTYPE html>
        <html>
          <body style="width:80%; background-color:#d6d6d6; padding:50px; border-radius:20px;">

          <h1 style="text-align:center;color:#fa9111;">Verify your email</h1>

          <div style="width:70%; margin:auto; font-size:18px;">
            <p style="margin-top:50px;">Hi , <br/> You're almost set to start buying your favourate products. Simply click the link below to verify your email address and get started. The link expires in 2 hours.</p>
            <div style="width:fit-content;margin:auto;margin-top:50px;margin-bottom:50px;">
              <button style="padding:10px; width:200px; background-color:#FFA73B; border:none; border-radius:5px; font-weight:bold; color:black;"><a href="${process.env.WEBSITE_URL}/verify-email/${token}" style="text-decoration:none;">Verify my email address</a></button>
            </div>
            <p>If that doesn't work, copy and paste the following link in your browser: ${process.env.WEBSITE_URL}/verify-email/${token}</p>
          </div>
          </body>
        </html>
        `,
      };
      sgMail
        .send(msg)
        .then(() => {
          res.json({ message: "Email sent" });
        })
        .catch((error) => {
          console.error(error);
          res.status(500).json({ message: "Internal server error" });
        });
    });
  } catch (error) {
    res.send(error.message).status(500);
  }
});

router.post("/verify-email/:token", verifyEmailToken, (req, res) => {
  try {
    const user_id = req.user_id;

    // get user
    getUserById(user_id).then((user) => {
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      // check if the user is already verified
      if (user.isVerified) {
        return res
          .status(400)
          .json({ message: "User is already verified, please login" });
      }

      // check if the token is correct
      if (user.verify_email_token !== req.params.token) {
        return res
          .status(401)
          .json({ message: "Unauthorized: Invalid token, or token expired" });
      }

      // update user
      updateUser(user_id, { isVerified: true, verify_email_token: null });

      res.json({ message: "Email verified successfully" });
    });
  } catch (error) {
    res.send(error.message).status(500);
  }
});

router.post("/reset-password-otp", (req, res) => {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);

  try {
    const email = req.body.email;

    // get user
    getUserByEmail(email).then((user) => {
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      const otp = {
        otp: Math.floor(100000 + Math.random() * 900000),
        expiry_date: Date.now() + 300000, // 1000 ms = 1 s, 300000 ms = 5 min
      };

      // add otp to user
      updateUser(user.id, { otp });

      // send email
      const msg = {
        to: email,
        from: "saifeleslam3520@gmail.com",
        subject: "Verify your email",
        text: "Verify your email",
        html: `<!DOCTYPE html>
        <html>
          <body style="width:80%; background-color:#d6d6d6; padding:50px; border-radius:20px; margin:auto;">

          <h1 style="text-align:center;color:#fa9111;">Reset Password</h1>

          <div style="width:60%; margin:auto; font-size:18px;">
            <p style="margin-top:50px;">Hi ${user.first_name} ${user.last_name}, <br/> Forgot Password? <br/> We received a request to reset the password for your account. <br/> To reset your password, copy this OTP below and paste it in the OTP field!</p>
            <div style="width:fit-content;margin:50px auto;">
              <div style="padding:10px; width:150px; background-color:#d6d6d6; color:#FFA73B; border:solid 2px #FFA73B; border-radius:5px; font-weight:bold; text-align:center;">${otp.otp}</div>
            </div>
            <p>If you did not make this request then please ignore this email.</p>
          </div>
          </body>
        </html>
        `,
      };
      sgMail
        .send(msg)
        .then(() => {
          res.json({ message: "Email sent" });
        })
        .catch((error) => {
          console.error(error);
          res.status(500).json({ message: "Internal server error" });
        });
    });
  } catch (error) {
    res.send(error.message).status(500);
  }
});

router.post("/reset-password", (req, res) => {
  try {
    const { otp, password, verify_password, email } = req.body;

    // Validate password, must be at least 8 characters long and contain at least 1 number, 1 uppercase letter, and 1 lowercase letter
    if (!validator.isStrongPassword(password, { minSymbols: 0 })) {
      return res.status(400).json({ message: "Password is not strong enough" });
    }
    // Validate password and verify password
    if (password !== verify_password) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    // get user
    getUserByEmail(email).then((user) => {
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      // check if the otp is correct
      if (
        user.otp.otp !== otp ||
        user.otp.expiry_date < Date.now() ||
        user.otp.otp === null
      ) {
        return res
          .status(401)
          .json({ message: "Unauthorized: Invalid OTP, Or OTP Expired" });
      }

      const password_hash = bcrypt.hashSync(password, 10);

      // update user
      updateUser(user.id, { password_hash, otp: { otp: null } });

      res.json({ message: "Password reset successfully" });
    });
  } catch (error) {
    res.send(error.message).status(500);
  }
});

export default router;
