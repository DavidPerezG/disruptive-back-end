const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  name: { type: String, unique: true, required: true },
  cover: { type: String, required: true },
  permissions: {
    images: { type: Boolean, default: false },
    videos: { type: Boolean, default: false },
    text: { type: Boolean, default: false }
  },
  createdAt: { type: Date, default: Date.now },


});

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;
