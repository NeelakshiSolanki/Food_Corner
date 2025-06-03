const express = require('express');
const router = express.Router();
const RegisterUser = require('../models/RegisterUser');
const LoginUser = require('../models/LoginUser');

// Register Route
router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await RegisterUser.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ success: false, message: "Email already exists" });
    }

    const user = new RegisterUser({ name, email, password });
    await user.save();

    res.status(201).json({ success: true, message: "User registered successfully" });
  } catch (err) {
    console.error("Register error:", err);
    res.status(500).json({ success: false, message: "Error registering user" });
  }
});

// Login Route (save login separately)
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await RegisterUser.findOne({ email, password });
    if (!user) {
      return res.status(400).json({ success: false, message: "Invalid credentials" });
    }

    const loginEntry = new LoginUser({ email, password });
    await loginEntry.save();

    res.json({ success: true, message: "Login successful", user });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ success: false, message: "Error logging in" });
  }
});

module.exports = router;
