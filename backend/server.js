require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dishRoutes = require('./routes/dishes');
const bookingRoutes = require('./routes/bookings');
const authRoutes = require('./routes/auth');
const orderRoutes = require('./routes/orderRoutes');

const app = express();

app.use(cors());
app.use(express.json());

// Connect MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("MongoDB connected"))
.catch((err) => console.error("MongoDB connection error:", err));

// Routes
app.use('/api/dishes', dishRoutes);

app.use('/api/bookings', bookingRoutes);
app.use('/api/auth', authRoutes);
app.use('/api', orderRoutes);

// Dummy payment verification route
app.post('/api/payment/verify', (req, res) => {
  const { paymentId, amount, status } = req.body;

  if (!paymentId || !amount || !status) {
    return res.status(400).json({ success: false, message: "Invalid payment data" });
  }

  if (status === "success") {
    return res.json({ success: true, message: "Dummy payment verified successfully" });
  } else {
    return res.status(400).json({ success: false, message: "Dummy payment failed" });
  }
});
app.post("/api/place-order", async (req, res) => {
  try {
    const { userId, items } = req.body;
    if (!userId || !items || items.length === 0) {
      return res.status(400).json({ error: "Missing data" });
    }

    const newOrder = new Order({
      userId,
      items,
      placedAt: new Date()
    });

    await newOrder.save();
    res.status(201).json({ message: "Order placed", order: newOrder });
  } catch (error) {
    console.error("Error placing order:", error);
    res.status(500).json({ error: "Server error" });
  }
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
