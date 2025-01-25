const express = require('express');
const app = express();
const router = express.Router();
const Appointment=require("../Models/appointmentModel");
const mongoose = require('mongoose');

const appointments = [];    

router.get('/', async (req, res) => {
    try {
      // Retrieve all services from the database
      const appointments = await Appointment.find();  // Using Mongoose's find() method to get all documents
  
      res.status(200).json(appointments);  // Respond with the services data
    } catch (err) {
      res.status(500).json({ error: 'Error fetching services from the database', details: err.message });
    }
  });
  
  router.post('/', async (req, res) => {
    const { serviceId, customerId, date, status } = req.body;
  
    // Convert customerId to a valid ObjectId
    let customerObjectId;
    try {
      customerObjectId = mongoose.Types.ObjectId(customerId);
    } catch (err) {
      return res.status(400).json({ error: 'Invalid customerId format', details: err.message });
    }
  
    const newAppointment = new Appointment({
      serviceId: mongoose.Types.ObjectId(serviceId), // Assuming serviceId is also an ObjectId
      customerId: customerObjectId,
      date,
      status: status || 'pending'
    });
  
    try {
      // Save the appointment to the database
      const savedAppointment = await newAppointment.save();
      res.status(201).json(savedAppointment);  // Return the saved appointment
    } catch (err) {
      res.status(500).json({ error: 'Error saving appointment to the database', details: err.message });
    }
  });
  
  module.exports = router;
  

module.exports = router;