const express = require('express');
const app = express();
const router = express.Router();


app.get('/appointments', (req, res) => {
    res.status(200).json(appointments);
  });
  
  app.post('/appointments', (req, res) => {
    const { serviceId, customerId, date, status } = req.body;
    const newAppointment = { id: Date.now(), serviceId, customerId, date, status: status || 'pending' };
    appointments.push(newAppointment);
    res.status(201).json(newAppointment);
  });
  
  app.put('/appointments/:id', (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    const appointment = appointments.find(a => a.id === parseInt(id));
    if (appointment) {
      appointment.status = status;
      res.status(200).json(appointment);
    } else {
      res.status(404).json({ message: 'Appointment not found' });
    }
  });

module.exports = router;