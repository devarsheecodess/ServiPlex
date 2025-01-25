const express = require('express');
const app = express();
const router = express.Router();
const Appointment=require("../Models/appointmentModel");
const mongoose=require('mongoose')

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

    // Validate and convert customerId to a valid ObjectId
    let customerObjectId;
    try {
        customerObjectId = new mongoose.Types.ObjectId(customerId); // Use 'new' for ObjectId
    } catch (err) {
        return res.status(400).json({ error: 'Invalid customerId format', details: err.message });
    }

    // Create a new appointment
    const newAppointment = new Appointment({
        id: Date.now(),
        serviceId,
        customerId: customerObjectId, // Use the converted ObjectId
        date,
        status: status || 'pending'
    });

    try {
        // Save the appointment to the database
        const savedAppointment = await newAppointment.save();
        res.status(201).json(savedAppointment);
    } catch (err) {
        res.status(500).json({ error: 'Error saving appointment to the database', details: err.message });
    }
});
router.put('/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const { status } = req.body;
  
      const updatedAppointment = await Appointment.findByIdAndUpdate(
        id,
        { status },
        { new: true } // Returns the updated document
      );
  
      if (!updatedAppointment) {
        return res.status(404).json({ message: 'Appointment not found' });
      }
  
      res.status(200).json(updatedAppointment);
    } catch (err) {
      res.status(500).json({ 
        error: 'Error updating appointment status', 
        details: err.message 
      });
    }
  });

module.exports = router;