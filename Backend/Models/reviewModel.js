// Review Model
const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    serviceId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Service',
      required: true,
    },
    customerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', // Assuming a User model exists
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
  }, { timestamps: true });
  
  module.exports = mongoose.model('Review', reviewSchema);
  