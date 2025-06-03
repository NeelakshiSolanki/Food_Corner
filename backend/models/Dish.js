const mongoose = require('mongoose');

const DishSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
  type: String,      // "veg" or "nonVeg"
  mealTime: String,  // "breakfast", "lunch", or "dinner"
  image: String      // URL or path of image
});

module.exports = mongoose.model('Dish', DishSchema);
