const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})

app.post('/services/add', async (req, res) => {
  const { providerId, name, description, price, images, specialOffers } = req.body;
  try {
      const provider = await Provider.findById(providerId);
      if (!provider) return res.status(404).json({ error: 'Provider not found' });

      const newService = {
          serviceId: new mongoose.Types.ObjectId(),
          name,
          description,
          price,
          images,
          specialOffers,
      };

      provider.services.push(newService);
      await provider.save();

      res.status(201).json({ message: 'Service added successfully', service: newService });
  } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
  }
});

app.put('/services/edit/:serviceId', async (req, res) => {
  const { serviceId } = req.params;
  const { providerId, name, description, price, images, specialOffers } = req.body;

  try {
      const provider = await Provider.findById(providerId);
      if (!provider) return res.status(404).json({ error: 'Provider not found' });

      const service = provider.services.find(s => s.serviceId.toString() === serviceId);
      if (!service) return res.status(404).json({ error: 'Service not found' });

      Object.assign(service, { name, description, price, images, specialOffers });
      await provider.save();

      res.json({ message: 'Service updated successfully', service });
  } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
  }
});

app.delete('/services/delete/:serviceId', async (req, res) => {
  const { serviceId } = req.params;
  const { providerId } = req.body;

  try {
      const provider = await Provider.findById(providerId);
      if (!provider) return res.status(404).json({ error: 'Provider not found' });

      provider.services = provider.services.filter(s => s.serviceId.toString() !== serviceId);
      await provider.save();

      res.json({ message: 'Service deleted successfully' });
  } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/services/:providerId', async (req, res) => {
  const { providerId } = req.params;

  try {
      const provider = await Provider.findById(providerId);
      if (!provider) return res.status(404).json({ error: 'Provider not found' });

      res.json({ services: provider.services });
  } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
  }
});
