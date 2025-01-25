// Appointment Model

const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
    serviceId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Service',
      required: true,
    },
    providerId: {
      type: String,
    },
    customerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', // Assuming a User model exists
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