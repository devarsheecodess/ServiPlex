// Service Model
const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
    required: false, // Optional field
  },
  offers: {
    type: String,
    required: false, // Optional field
  },
}, { timestamps: true });

module.exports = mongoose.model('Service', serviceSchema);