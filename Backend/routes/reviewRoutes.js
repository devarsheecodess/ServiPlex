const express = require('express');
const app = express();

app.get('/reviews/:serviceId', (req, res) => {
    const { serviceId } = req.params;
    const serviceReviews = reviews.filter(r => r.serviceId === parseInt(serviceId));
    res.status(200).json(serviceReviews);
  });
  
  app.post('/reviews', (req, res) => {
    const { serviceId, customerId, rating, comment } = req.body;
    const newReview = { id: Date.now(), serviceId, customerId, rating, comment };
    reviews.push(newReview);
    res.status(201).json(newReview);
  });
  