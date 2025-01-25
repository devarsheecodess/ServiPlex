const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const cors = require('cors');
const app = express();
const dotenv = require('dotenv');
const port = 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
dotenv.config();

// MongoDB config
const mongoURI = process.env.MONGO_URI;
mongoose
  .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Models
const User = require('./Models/User');
const Provider = require('./Models/Provider');

app.get('/', (req, res) => {
  res.send('ServiPlex Server');
});

// Signup endpoints
app.post('/user-signup', async (req, res) => {
  try {
    const { password, ...userData } = req.body;
    
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      ...userData,
      password: hashedPassword, // Store the hashed password
    });

    const savedUser = await user.save();
    res.status(201).json({ message: 'User created successfully', id: savedUser.id });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ message: 'Error creating user', error });
  }
});

app.post('/provider-signup', async (req, res) => {
  try {
    const { password, ...otherData } = req.body;

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const provider = new Provider({ ...otherData, password: hashedPassword });
    const savedProvider = await provider.save();

    res.status(201).json({ message: 'Provider created successfully', id: savedProvider.id });
  } catch (error) {
    console.error('Error creating provider:', error);
    res.status(500).json({ message: 'Error creating provider', error });
  }
});

// Login for User
app.post('/user-login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    res.status(200).json({ message: 'Login successful', success: true });
  } catch (error) {
    console.error('Error logging in user:', error);
    res.status(500).json({ message: 'Error logging in user', error });
  }
});

// Login for Provider
app.post('/provider-login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const provider = await Provider.findOne({ username });
    if (!provider) {
      return res.status(404).json({ message: 'Provider not found' });
    }

    // Compare the password with the hashed password stored in the database
    const isMatch = await bcrypt.compare(password, provider.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    res.status(200).json({ message: 'Login successful', success: true });
  } catch (error) {
    console.error('Error logging in provider:', error);
    res.status(500).json({ message: 'Error logging in provider', error });
  }
});

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


// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
