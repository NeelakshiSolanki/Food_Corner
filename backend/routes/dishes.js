const express = require('express');
const router = express.Router();
const Dish = require('../models/Dish');

router.get('/', async (req, res) => {
  const { type, mealTime } = req.query;
  try {
    const query = {};
    if (type) query.type = type;
    if (mealTime) query.mealTime = mealTime;

    const dishes = await Dish.find(query);
    if (dishes.length === 0) {
      return res.status(404).json({ message: 'No dishes found' });
    }
    res.json(dishes);
  } catch (err) {
    res.status(500).json({ message: 'Server Error', error: err.message });
  }
});

module.exports = router;
