const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  vid: {
    type: String,
    required: true,
    unique: true
  },
  telegramId: {
    type: String,
    required: true
  },
  simbreefLink: {
    type: String,
    required: true
  },
  active: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('User', userSchema);
