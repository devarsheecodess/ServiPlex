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
    paymentStatus: { // New field for payment requirement
      type: String,
      enum: ['before', 'after'],
      default: 'after',  // Default is pay after service
    },
    paymentStatusUpdated: { // Track if payment status was updated
      type: Date,
      default: null
    }
  }, { timestamps: true });
  
  module.exports = mongoose.model('Appointment', appointmentSchema);