const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const multer = require('multer');
const Service = require('../Models/serviceModel');

// Configure multer for file storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Specify the upload directory
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname); // Append timestamp to avoid filename collisions
  }
});

const upload = multer({ storage });

// Get all services
router.get('/', async (req, res) => {
  try {
    const services = await Service.find(); // Retrieve all services from the database
    res.status(200).json(services);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching services from the database', details: err.message });
  }
});

// Add a new service
router.post('/', upload.single('image'), async (req, res) => {
  const { serviceId, name, description, price, offers } = req.body;

  // Validate required fields
  if (!serviceId || !name || !description || !price) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const newService = new Service({
    serviceId,
    name,
    description,
    price,
    image: req.file ? req.file.path : null, // Save the path of the uploaded image
    offers,
  });

  try {
    const savedService = await newService.save();
    res.status(201).json(savedService);
  } catch (err) {
    res.status(500).json({ error: 'Error saving service to the database', details: err.message });
  }
});

// Update a service
router.put('/:id', upload.single('image'), async (req, res) => {
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
        image: req.file ? req.file.path : undefined, // Update image only if a new one is uploaded
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
      return res.status(404).json({ message: 'Service not found' });
    }

    res.status(200).json({ message: 'Service deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Error deleting service', details: err.message });
  }
});

module.exports = router;
