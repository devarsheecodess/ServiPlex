const express = require('express');
const router = express.Router();
const Review = require('../Models/reviewModel');

// 1. Get all reviews
router.get('/', async (req, res) => {
  const userID = req.query.id;
  try {
    const reviews = await Review.find({customerId: userID}); // Fetch all reviews from the database
    res.status(200).json(reviews);
  } catch (error) {
    console.error('Error fetching reviews:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Get review by name
router.get('/name', async (req, res) => {
  const name = req.query.name;
  try {
    const reviews = await Review.find({provider: name}); // Fetch all reviews from the database
    res.status(200).json(reviews);
  } catch (error) {
    console.error('Error fetching reviews:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// 3. Add a new review
router.post('/', async (req, res) => {
  const { id,customerId, customerName, provider, comment, rating, providerResponse, date } = req.body;

  try {
    const newReview = new Review({
      id,
      customerId,
      customerName,
      provider,
      comment,
      rating,
      providerResponse,
      date,
    });

    const savedReview = await newReview.save(); // Save to the database
    res.status(201).json(savedReview);
  } catch (error) {
    console.error('Error saving review:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


// 4. Update provider response for a review
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { providerResponse } = req.body;

  try {
    const updatedReview = await Review.findByIdAndUpdate(
      id,
      { providerResponse },
      { new: true } // Return the updated document
    );

    if (!updatedReview) {
      return res.status(404).json({ message: `Review with ID: ${id} not found.` });
    }

    res.status(200).json(updatedReview);
  } catch (error) {
    console.error('Error updating review:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
