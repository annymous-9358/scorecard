const mongoose = require('mongoose');

const scoreSchema = new mongoose.Schema({
  employeeName: {
    type: String,
    required: true
  },
  productivity: {
    type: Number,
    required: true,
    min: 0,
    max: 100
  },
  quality: {
    type: Number,
    required: true,
    min: 0,
    max: 100
  },
  timeliness: {
    type: Number,
    required: true,
    min: 0,
    max: 100
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Score', scoreSchema);