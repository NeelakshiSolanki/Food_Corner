const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// Order Schema
const orderSchema = new mongoose.Schema({
  userId: String,
  items: [
    {
      name: String,
      price: Number,
      image: String,
      quantity: { type: Number, default: 1 }
    }
  ],
  orderedAt: { type: Date, default: Date.now }
});

const Order = mongoose.model('Order', orderSchema);

// POST: Save order
router.post('/place-order', async (req, res) => {
  try {
    const { userId, items } = req.body;
    const newOrder = new Order({ userId, items });
    await newOrder.save();
    res.status(201).json({ message: 'Order saved successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to save order' });
  }
});

// GET: Fetch orders by user
router.get('/orders/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;
    const orders = await Order.find({ userId });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
});

module.exports = router;
