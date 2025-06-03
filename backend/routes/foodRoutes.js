const express = require("express");
const router = express.Router();
const Food = require("../models/Food");

// GET all food items
router.get("/", async (req, res) => {
  const foods = await Food.find();
  res.json(foods);
});

// POST add new food item
router.post("/", async (req, res) => {
  const { name, description, price } = req.body;
  const newFood = new Food({ name, description, price });
  await newFood.save();
  res.json(newFood);
});

module.exports = router;
