const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
<<<<<<< HEAD
const nodemailer = require("nodemailer");

// =========================================
// Temporary OTP Storage (Valid for 5 minutes)
// =========================================
let otpStore = {};

// =========================================
// SIGNUP
// =========================================
=======

// Signup route
>>>>>>> deae9137424443e3aa1a99afc1c7f93137feb1b1
router.post("/signup", async (req, res) => {
  try {
    const { name, email, phone, password } = req.body;

<<<<<<< HEAD
    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const existingPhone = await User.findOne({ phone });
    if (existingPhone) {
      return res.status(400).json({ message: "Phone number already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

=======
    // 🔹 Check if email already exists
    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({
        message: "Email already exists",
      });
    }

    // 🔹 Check if phone already exists
    const existingPhone = await User.findOne({ phone });
    if (existingPhone) {
      return res.status(400).json({
        message: "Phone number already exists",
      });
    }

    // 🔹 Create new user
>>>>>>> deae9137424443e3aa1a99afc1c7f93137feb1b1
    const user = new User({
      name,
      email,
      phone,
<<<<<<< HEAD
      password: hashedPassword,
    });

    await user.save();

    res.status(201).json({ message: "User registered successfully", user });
=======
      password,
    });

    // 🔹 Save user to database (VERY IMPORTANT — was missing!)
    await user.save();

    // 🔹 Generate JWT
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
>>>>>>> deae9137424443e3aa1a99afc1c7f93137feb1b1
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

<<<<<<< HEAD
// =========================================
// LOGIN
// =========================================
=======

// Login route
>>>>>>> deae9137424443e3aa1a99afc1c7f93137feb1b1
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

<<<<<<< HEAD
=======
    // Check if user exists
>>>>>>> deae9137424443e3aa1a99afc1c7f93137feb1b1
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

<<<<<<< HEAD
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

=======
    // Check if password matches
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Generate JWT token
>>>>>>> deae9137424443e3aa1a99afc1c7f93137feb1b1
    const token = jwt.sign(
      { id: user._id, email: user.email },
      "swiggy-clone-secret-key-2025",
      { expiresIn: "7d" }
    );

<<<<<<< HEAD
    res.json({
=======
    res.status(200).json({
>>>>>>> deae9137424443e3aa1a99afc1c7f93137feb1b1
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

<<<<<<< HEAD
// =========================================
// FORGOT PASSWORD → SEND OTP (Updated)
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
    otpStore[email] = { otp, expiresAt: Date.now() + 5 * 60 * 1000 };

    // Try sending email but catch errors
    try {
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "analargowda26@gmail.com",      // 🔹 Replace with your Gmail
          pass: "ljvn tcjq koch fkcz",        // 🔹 Replace with Gmail App Password
        },
      });

      const mailOptions = {
        from: "yourgmail@gmail.com",
        to: email,
        subject: "Password Reset OTP",
        text: `Your OTP is ${otp}. It is valid for 5 minutes.`,
      };

      await transporter.sendMail(mailOptions);
      console.log(`OTP sent to ${email}: ${otp}`); // Log OTP for testing
    } catch (emailError) {
      console.error("Email sending failed:", emailError);
      // Continue even if email fails
    }

    res.json({ message: "OTP generated (check console or email if configured)" });
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

=======
>>>>>>> deae9137424443e3aa1a99afc1c7f93137feb1b1
module.exports = router;
