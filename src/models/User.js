const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, unique: true, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  userType: { type: String, enum: ['reader', 'creator', 'admin'], required: true },
  createdAt: { type: Date, default: Date.now }


});

const User = mongoose.model('User', userSchema);

module.exports = User;
