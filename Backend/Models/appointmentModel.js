// Appointment Model

const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
    providerId: {
      type: String,
    },
    customerId: {
      type: String,
      required: true,
    },
    shop: {
      type: String,
      required: true,
    },
    services:{
      type: Array,
      required: true,
    },
    price:{
      type: Number,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      enum: ['pending', 'in progress', 'completed'],
      default: 'pending',
    },
  }, { timestamps: true });
  
  module.exports = mongoose.model('Appointment', appointmentSchema);