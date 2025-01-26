const express = require('express');
const router = express.Router();
const Review = require('./Models/reviewModel'); // Import the Review model

// 1. Get all reviews
router.get('/', async (req, res) => {
  try {
    const reviews = await Review.find(); // Fetch all reviews from the database
    res.status(200).json(reviews);
  } catch (error) {
    console.error('Error fetching reviews:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// 2. Get reviews for a specific service
router.get('/:serviceId', async (req, res) => {
  const { serviceId } = req.params;

  try {
    const serviceReviews = await Review.find({ serviceId: serviceId }); // Fetch reviews by serviceId
    if (serviceReviews.length === 0) {
      return res.status(404).json({ message: `No reviews found for service ID: ${serviceId}` });
    }

    res.status(200).json(serviceReviews);
  } catch (error) {
    console.error('Error fetching reviews:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// 3. Add a new review
// 3. Add a new review
router.post('/', async (req, res) => {
  const { rating, providerName, userName, comment } = req.body;

  // Check if the fields are provided and not empty (including trimming spaces)
  if (
    !rating ||
    !providerName.trim() ||
    !userName.trim()
  ) {
    return res.status(400).json({ message: 'Rating, provider name, and user name are required.' });
  }

  try {
    // Create and save a new review
    const newReview = new Review({
      providerName: providerName.trim(),
      userName: userName.trim(),
      rating: parseInt(rating),
      comment: comment ? comment.trim() : '',
      date: new Date().toISOString(),
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
