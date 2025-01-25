const express = require('express');
const router = express.Router();

const services = [];

// Get all services
router.get('/', (req, res) => {
  res.status(200).json(services);
});

// Add a new service
router.post('/', (req, res) => {
  const { name, description, price, image, offers } = req.body;
  const newService = { id: Date.now(), name, description, price, image, offers };
  services.push(newService);
  res.status(201).json(newService);
});

// Update a service
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { name, description, price, image, offers } = req.body;
  const service = services.find(s => s.id === parseInt(id));
  if (service) {
    Object.assign(service, { name, description, price, image, offers });
    res.status(200).json(service);
  } else {
    res.status(404).json({ message: 'Service not found' });
  }
});

// Delete a service
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  const index = services.findIndex(s => s.id === parseInt(id));
  if (index !== -1) {
    services.splice(index, 1);
    res.status(200).json({ message: 'Service deleted' });
  } else {
    res.status(404).json({ message: 'Service not found' });
  }
});

module.exports = router;
