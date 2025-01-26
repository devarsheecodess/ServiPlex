const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    id: {
      type: String,
      required: true,
    },
    customerId: {
      type: String,
      required: true,
    },
    customerName: {
      type: String,
      default: 'Anonymous',
      required: false,
    },
    provider: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
      required: true,
    },
    comment: {
      type: String,
      required: false, // Optional field
    },
    providerResponse: {
      type: String,
      required: false,
    },
    date: {
      type: String,
      default: Date
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Review', reviewSchema);
