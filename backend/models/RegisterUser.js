const mongoose = require('mongoose');

const RegisterUserSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
});

module.exports = mongoose.model('RegisterUser', RegisterUserSchema);
