const express = require('express');
const router = express.Router();
const Service=require("../Models/serviceModel");

const services = [];

// Get all services
router.get('/', async (req, res) => {
    try {
      // Retrieve all services from the database
      const services = await Service.find();  // Using Mongoose's find() method to get all documents
  
      res.status(200).json(services);  // Respond with the services data
    } catch (err) {
      res.status(500).json({ error: 'Error fetching services from the database', details: err.message });
    }
  });

// Add a new service
router.post('/', async (req, res) => {
    const { name, description, price, image, offers } = req.body;
  
    // Create a new Service document
    const newService = new Service({
      name,
      description,
      price,
      image,
      offers,
    });
  
    try {
      // Save the service to MongoDB
      const savedService = await newService.save();
      res.status(201).json(savedService); // Respond with the saved service
    } catch (err) {
      res.status(500).json({ error: 'Error saving service to the database', details: err.message });
    }
  });

// Update a service
router.put('/:id', async (req, res) => {
    const { id } = req.params;  // Extract the id from the request params
    const { name, description, price, image, offers } = req.body;  // Extract data from the request body
  
    try {
      // Find the service by its ObjectId and update the document
      const updatedService = await Service.findByIdAndUpdate(
        id, // The id to find the service
        { name, description, price, image, offers }, // New data to update
        { new: true } // Option to return the updated document
      );
  
      if (!updatedService) {
        return res.status(404).json({ message: 'Service not found' }); // If service not found
      }
  
      res.status(200).json(updatedService); // Return the updated service
    } catch (err) {
      res.status(500).json({ error: 'Error updating service', details: err.message }); // Handle errors
    }
  });

// Delete a service
router.delete('/:id', async (req, res) => {
    const { id } = req.params;  // Extract the id from the request params
  
    try {
      // Find the service by its ObjectId and delete it
      const deletedService = await Service.findByIdAndDelete(id);
  
      if (!deletedService) {
        return res.status(404).json({ message: 'Service not found' });  // If service not found
      }
  
      res.status(200).json({ message: 'Service deleted' });  // If deletion is successful
    } catch (err) {
      res.status(500).json({ error: 'Error deleting service', details: err.message }); // Handle errors
    }
  });

module.exports = router;
