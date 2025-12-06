const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

// =========================================
// Temporary OTP Storage (Valid for 5 minutes)
// =========================================
let otpStore = {};

// =========================================
// SIGNUP
// =========================================
router.post("/signup", async (req, res) => {
  try {
    const { name, email, phone, password } = req.body;

    // Check if email exists
    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({ message: "Email already exists" });
    }

    // Check if phone exists
    const existingPhone = await User.findOne({ phone });
    if (existingPhone) {
      return res.status(400).json({ message: "Phone number already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = new User({
      name,
      email,
      phone,
      password: hashedPassword,
    });

    await user.save();

    const token = jwt.sign(
      { id: user._id, email: user.email },
      "swiggy-clone-secret-key-2025",
      { expiresIn: "7d" }
    );

    res.status(201).json({
      message: "User registered successfully",
      token,
      user: {
        name: user.name,
        email: user.email,
        phone: user.phone,
      },
    });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// =========================================
// LOGIN
// =========================================
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Check password
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Generate token
    const token = jwt.sign(
      { id: user._id, email: user.email },
      "swiggy-clone-secret-key-2025",
      { expiresIn: "7d" }
    );

    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// =========================================
// FORGOT PASSWORD → SEND OTP
// =========================================
router.post("/forgot-password", async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Email not registered" });
    }

    // Generate OTP
    const otp = Math.floor(100000 + Math.random() * 900000);

    otpStore[email] = {
      otp,
      expiresAt: Date.now() + 5 * 60 * 1000, // 5 minutes
    };

    try {
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "analargowda26@gmail.com",
          pass: "ljvn tcjq koch fkcz",
        },
      });

      const mailOptions = {
        from: "yourgmail@gmail.com",
        to: email,
        subject: "Password Reset OTP",
        text: `Your OTP is ${otp}. It is valid for 5 minutes.`,
      };

      await transporter.sendMail(mailOptions);
      console.log(`OTP sent to ${email}: ${otp}`);
    } catch (emailError) {
      console.error("Email sending failed:", emailError);
    }

    res.json({
      message: "OTP generated (check console or email if configured)",
    });
  } catch (error) {
    console.error("Forgot Password error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// =========================================
// VERIFY OTP
// =========================================
router.post("/verify-otp", (req, res) => {
  const { email, otp } = req.body;

  const data = otpStore[email];

  if (!data) {
    return res.status(400).json({ message: "OTP not generated or expired" });
  }

  if (Date.now() > data.expiresAt) {
    delete otpStore[email];
    return res.status(400).json({ message: "OTP expired" });
  }

  if (parseInt(otp) !== data.otp) {
    return res.status(400).json({ message: "Invalid OTP" });
  }

  res.json({ message: "OTP verified" });
});

// =========================================
// RESET PASSWORD
// =========================================
router.post("/reset-password", async (req, res) => {
  try {
    const { email, newPassword } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();

    delete otpStore[email];

    res.json({ message: "Password reset successful" });
  } catch (error) {
    console.error("Reset Password error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
