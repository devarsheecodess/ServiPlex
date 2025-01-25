const express = require('express');
const router = express.Router();

let reviews = [
  {
    id: 1,
    serviceId: 101,
    customerId: 1,
    rating: 5,
    comment: 'Great service!',
    providerResponse: 'Thank you!',
    date: '2025-01-01',
  },
  {
    id: 2,
    serviceId: 102,
    customerId: 2,
    rating: 4,
    comment: 'Good service, but room for improvement.',
    providerResponse: '',
    date: '2025-01-15',
  },
];

// Get reviews for a specific service
router.get('/reviews/:serviceId', (req, res) => {
  const { serviceId } = req.params;
  const serviceReviews = reviews.filter(
    (review) => review.serviceId === parseInt(serviceId)
  );

  if (serviceReviews.length === 0) {
    return res
      .status(404)
      .json({ message: `No reviews found for service ID: ${serviceId}` });
  }

  res.status(200).json(serviceReviews);
});

// Add a new review
router.post('/reviews', (req, res) => {
  const { serviceId, customerId, rating, comment } = req.body;

  // Validate input
  if (!serviceId || !customerId || !rating || !comment) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  const newReview = {
    id: Date.now(),
    serviceId,
    customerId,
    rating,
    comment,
    providerResponse: '',
    date: new Date().toISOString(),
  };

  reviews.push(newReview);
  res.status(201).json(newReview);
});

// Update provider response for a review
router.put('/reviews/:id', (req, res) => {
  const { id } = req.params;
  const { providerResponse } = req.body;

  const reviewIndex = reviews.findIndex((review) => review.id === parseInt(id));
  if (reviewIndex === -1) {
    return res.status(404).json({ message: `Review with ID: ${id} not found.` });
  }

  reviews[reviewIndex].providerResponse = providerResponse;
  res.status(200).json(reviews[reviewIndex]);
});

module.exports = router;
