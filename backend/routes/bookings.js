// routes/bookings.js
const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');

// POST - Create a new booking
router.post('/', async (req, res) => {
  console.log("Booking request received:", req.body); // 👈 log here

  try {
    const booking = new Booking(req.body);
    await booking.save();
    console.log("Booking saved:", booking); // 👈 log here
    res.status(201).json({ success: true, message: "Booking stored successfully" });
  } catch (err) {
    console.error("Error storing booking:", err);
    res.status(500).json({ success: false, message: "Failed to store booking" });
  }
});

module.exports = router;
