const express = require('express');
const app = express();
const router = express.Router();

router.get('/payments', (req, res) => {
    res.status(200).json(payments);
  });
  
  router.post('/payments', (req, res) => {
    const { providerId, amount, paymentMethod, status } = req.body;
    const newPayment = { id: Date.now(), providerId, amount, paymentMethod, status: status || 'pending' };
    payments.push(newPayment);
    res.status(201).json(newPayment);
  });
  
  router.put('/payments/:id', (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    const payment = payments.find(p => p.id === parseInt(id));
    if (payment) {
      payment.status = status;
      res.status(200).json(payment);
    } else {
      res.status(404).json({ message: 'Payment not found' });
    }
  });

module.exports = router;