const mongoose = require('mongoose');

const LoginUserSchema = new mongoose.Schema({
  email: String,
  password: String,
  loginTime: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('LoginUser', LoginUserSchema);
