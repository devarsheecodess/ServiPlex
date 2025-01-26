// Payment Model
const mongoose = require('mongoose');
const paymentSchema = new mongoose.Schema({
    providerId: {
      type: String,
      required: true,
    },
    customerId:{
      type: String,
      required: true
    },
    shopName:{
      type: String,
      required: true
    },
    amount: {
      type: Number,
      required: true,
    },
    paymentMethod: {
      type: String,
      enum: ['credit card', 'cash', 'UPI'],
      required: true,
    },
    status: {
      type: String,
      enum: ['pending', 'completed'],
      default: 'pending',
    },
  }, { timestamps: true });
  
  module.exports = mongoose.model('Payment', paymentSchema);