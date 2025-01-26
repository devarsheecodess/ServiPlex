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
const User = require('./Models/userModel');
const Provider = require('./Models/providerModel');

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

    res.status(200).json({ message: 'Login successful', success: true, id: user.id , name: user.name});
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

    res.status(200).json({ message: 'Login successful', success: true, id: provider.id , shop: provider.shop});
  } catch (error) {
    console.error('Error logging in provider:', error);
    res.status(500).json({ message: 'Error logging in provider', error });
  }
});

// Get provider details
app.get('/provider', async (req, res) => {
  try{
    const provider = await Provider.find();
    res.status(200).json(provider);
  } catch (error) {
    console.error('Error fetching provider details:', error);
    res.status(500).json({ message: 'Error fetching provider details', error });
  }
});

// User Details
app.get('/profile', async (req, res) => {
  const id = req.query.id;
  try{
    const user = await User.find({id: id});
    res.status(200).json(user);
  } catch (error) {
    console.error('Error fetching user details:', error);
    res.status(500).json({ message: 'Error fetching user details', error });
  }
});

// Update User Details
app.put('/profile', async (req, res) => {
  const id = req.query.id;
  const { email, username, name, password } = req.body;
  try{
    let user;
    if(password.length > 0){
      const hashedPassword = await bcrypt.hash(password, 10);
      user = await User.findOneAndUpdate({id: id}, {email, username, name, password: hashedPassword});
    }
    else{
      user = await User.findOneAndUpdate({id: id}, {email, username, name});
    }
    res.status(200).json(user);
  } catch (error) {
    console.error('Error updating user details:', error);
    res.status(500).json({ message: 'Error updating user details', error });
  }
});

const appointmentRoutes = require('./routes/appointmentRoutes');
const paymentRoutes = require('./routes/paymentRoutes');
const reviewRoutes = require('./routes/reviewRoutes');
const serviceRoutes = require('./routes/serviceRoutes');

const Service = require('./Models/serviceModel')


app.use('/appointments', appointmentRoutes);
app.use('/payments', paymentRoutes);
app.use('/reviews', reviewRoutes);
app.use('/services', serviceRoutes);

// User routes
const services = require('./routes/Services');
const userAppointments = require('./routes/userAppointments');
app.use('/providers', services); // Correct usage
app.use('/userAppointments', userAppointments); // Correct usage

// Add a new service
app.post('/addServices', async (req, res) => {
  const { serviceID, providerID, name, description, price, offers } = req.body;

  // Validate required fields
  if (!serviceID || !name || !description || !price) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const newService = new Service({
    serviceID,
    providerID,
    name,
    description,
    price,
    offers,
  });

  try {
    const savedService = await newService.save();
    res.status(201).json(savedService);
  } catch (err) {
    res.status(500).json({ error: 'Error saving service to the database', details: err.message });
  }
});

app.listen(port, () => {`Server running on port ${port}`});