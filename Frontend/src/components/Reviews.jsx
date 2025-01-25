import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css'; // Corrected import for Swiper styles

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(0);

  // Simulate fetching reviews
  useEffect(() => {
    const fetchReviews = async () => {
      // Mock data for now
      const mockReviews = [
        {
          id: 1,
          provider: 'Glow Beauty Salon',
          userComment: 'Great service!',
          rating: 5,
          providerResponse: 'Thank you for your feedback!',
          date: '2025-01-30',
        },
        {
          id: 2,
          provider: 'Urban Barbers',
          userComment: 'Good, but could be faster.',
          rating: 3,
          providerResponse: 'We appreciate your feedback, and we’ll work on improving speed.',
          date: '2025-02-05',
        },
        {
          id: 3,
          provider: 'Royal Spa',
          userComment: 'Amazing experience, will visit again!',
          rating: 5,
          providerResponse: 'We are happy to hear that! Thank you.',
          date: '2025-02-10',
        },
        {
          id: 4,
          provider: 'City Nails',
          userComment: 'Good service, but the price was too high.',
          rating: 2,
          providerResponse: 'We will review our pricing, thank you for your input.',
          date: '2025-02-12',
        },
      ];
      setReviews(mockReviews);
    };

    fetchReviews();
  }, []);

  // Submit user review
  const handleSubmit = () => {
    const newReview = {
      id: reviews.length + 1,
      provider: 'New Provider', // Replace with dynamic provider info
      userComment: comment,
      rating: rating,
      providerResponse: '',
      date: new Date().toISOString(),
    };
    setReviews([...reviews, newReview]);
    setComment('');
    setRating(0);
    alert('Review submitted!');
  };

  return (
    <div className="absolute w-full top-0 left-0 h-full bg-[radial-gradient(125%_125%_at_50%_10%,#000_50%,#32cd32_100%)] p-6">
      <div className="max-w-4xl mx-auto bg-transparent p-6 rounded-lg shadow-xl">
        <h1 className="text-4xl font-extrabold text-green-600 mb-8 text-center">User Reviews</h1>

        <div className="submit-review text-white mb-6">
          <textarea
            placeholder="Write your review here"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            rows="2"
            className="w-full p-4 border-2 border-gray-300 rounded-lg mb-4"
          />
          <div className="rating mb-4">
            <span className="text-lg">Rating:</span>
            {[1, 2, 3, 4, 5].map((star) => (
              <span
                key={star}
                className={`text-2xl cursor-pointer ${rating >= star ? 'text-yellow-500' : 'text-gray-400'}`}
                onClick={() => setRating(star)}
              >
                ★
              </span>
            ))}
          </div>
          <button
            onClick={handleSubmit}
            className="px-6 py-2 bg-green-600 text-white rounded-lg hover:shadow-[0_0_20px_rgba(50,205,50,0.8)] transition-shadow"
          >
            Submit Review
          </button>
        </div>

        <h2 className="text-2xl font-semibold text-green-600 mb-2">All Reviews</h2>
        <Swiper
          spaceBetween={30}
          slidesPerView={1}
          loop={true}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          className="reviews-swiper"
        >
          {reviews.map((review) => (
            <SwiperSlide key={review.id}>
              <div
                className="bg-gray-900 bg-opacity-90 p-6 rounded-3xl shadow-lg transition-shadow border-2 border-yellow-500 hover:border-yellow-500 hover:border-2"
              >
                <h3 className="text-2xl font-bold text-green-600">{review.provider}</h3>
                <p className="text-yellow-500">{review.userComment}</p>
                <div className="rating-display mt-2 text-yellow-500">
                  Rating: {'★'.repeat(review.rating)}{' '}
                  {'☆'.repeat(5 - review.rating)}
                </div>
                <p className="text-sm text-yellow-500 mt-2">Reviewed on: {review.date}</p>

                {review.providerResponse && (
                  <div className="provider-response mt-3 text-gray-300">
                    <strong className="font-semibold">Provider's Response:</strong>
                    <p>{review.providerResponse}</p>
                  </div>
                )}
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Reviews;