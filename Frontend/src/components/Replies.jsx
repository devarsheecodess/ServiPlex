import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const [reply, setReply] = useState('');
  const [selectedReviewId, setSelectedReviewId] = useState(null);

  // Simulate fetching reviews
  useEffect(() => {
    const fetchReviews = async () => {
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

  // Handle provider reply
  const handleReplySubmit = () => {
    const updatedReviews = reviews.map((review) => {
      if (review.id === selectedReviewId) {
        return { ...review, providerResponse: reply };
      }
      return review;
    });
    setReviews(updatedReviews);
    setReply('');
    setSelectedReviewId(null);
    alert('Reply submitted!');
  };

  return (
    <div className="absolute w-full top-0 left-0 h-full bg-[radial-gradient(125%_125%_at_50%_10%,#000_50%,#32cd32_100%)] p-6">
      <div className="max-w-4xl mx-auto bg-transparent p-6 rounded-lg shadow-xl">
        <h1 className="text-4xl font-extrabold text-green-600 mb-8 text-center">Provider Responses</h1>

        <div className="provider-reply-section text-white">
          <h2 className="text-2xl mb-4">Provider, please select a review to respond to:</h2>
          <div className="reviews-list mb-6">
            {reviews.map((review) => (
              <div
                key={review.id}
                className="bg-gray-900 p-4 rounded-lg mb-4"
                onClick={() => setSelectedReviewId(review.id)}
              >
                <h3 className="text-xl text-green-600">{review.provider}</h3>
                <p>{review.userComment}</p>
                {review.providerResponse && <p><strong>Response:</strong> {review.providerResponse}</p>}
              </div>
            ))}
          </div>

          {selectedReviewId && (
            <div className="reply-form">
              <textarea
                placeholder="Write your reply here"
                value={reply}
                onChange={(e) => setReply(e.target.value)}
                rows="3"
                className="w-full p-4 border-2 border-gray-300 rounded-lg mb-4"
              />
              <button
                onClick={handleReplySubmit}
                className="px-6 py-2 bg-yellow-600 text-white rounded-lg"
              >
                Submit Reply
              </button>
            </div>
          )}
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
