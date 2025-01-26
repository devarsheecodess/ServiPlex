const express = require('express');
const app = express();
const router = express.Router();
const Appointment=require("../Models/appointmentModel");
const mongoose=require('mongoose')

const appointments = [];    

router.get('/', async (req, res) => {
  const { providerId, status } = req.query;

  try {
    // Parse status into an array if it's a string
    const statusArray = Array.isArray(status) ? status : [status];

    // Retrieve appointments based on providerId and status array
    const appointments = await Appointment.find({
      providerId,
      status: { $in: statusArray },
    });

    res.status(200).json(appointments); // Respond with the appointments data
  } catch (err) {
    res
      .status(500)
      .json({ error: 'Error fetching appointments from the database', details: err.message });
  }
});

  
router.post('/', async (req, res) => {
  const { providerId, customerId, customerName, shop, services, price, date, status } = req.body;

  // Create a new appointment
  const newAppointment = new Appointment({
      providerId,
      customerId,
      customerName,
      shop,
      services,
      price,
      date,
      status,
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
  const { id } = req.params;
  const { status, paymentStatus } = req.body;

  try {
    const updatedAppointment = await Appointment.findByIdAndUpdate(
      id,
      { 
        status,
        paymentStatus,  // Update payment status (before or after)
        paymentStatusUpdated: new Date()
      },
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