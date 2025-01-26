const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Service = require('../Models/serviceModel');

// Get all services
router.get('/', async (req, res) => {
  const { id } = req.query;
  try {
    const services = await Service.find({providerID: id}); // Retrieve all services from the database
    res.status(200).json(services);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching services from the database', details: err.message });
  }
});

// Update a service
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { name, description, price, offers } = req.body;

  // Validate ObjectId
  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({ error: 'Invalid service ID' });
  }

  try {
    const updatedService = await Service.findByIdAndUpdate(
      id,
      { 
        name,
        description,
        price,
        offers 
      },
      { new: true } // Return the updated document
    );

    if (!updatedService) {
      return res.status(404).json({ message: 'Service not found' });
    }

    res.status(200).json(updatedService);
  } catch (err) {
    res.status(500).json({ error: 'Error updating service', details: err.message });
  }
});

// Delete a service
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  // Validate ObjectId
  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({ error: 'Invalid service ID' });
  }

  try {
    const deletedService = await Service.findByIdAndDelete(id);

    if (!deletedService) {
      return res.status(404).json({ error: 'Service not found' });
    }

    res.status(200).json({ message: 'Service deleted successfully' });
  } catch (err) {
    console.error('Error deleting service:', err.message); // Logging
    res.status(500).json({ error: 'Error deleting service', details: err.message });
  }
});


module.exports = router;
