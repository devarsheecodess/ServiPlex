import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import axios from 'axios';

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const [reply, setReply] = useState('');
  const [selectedReview, setSelectedReview] = useState(null);

  const fetchReviews = async () => {
    try {
      const response = await axios.get('http://localhost:3000/reviews/name', {
        params: { name: localStorage.getItem('provider') },
      });
      setReviews(response.data);
      console.log('Reviews:', response.data);
    } catch (error) {
      console.error('Error fetching reviews:', error);
      alert('An error occurred while fetching reviews');
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  // Handle provider reply submission
  const handleReplySubmit = () => {
    const updatedReviews = reviews.map((review) => {
      if (review.id === selectedReview.id) {
        return { ...review, providerResponse: reply };
      }
      return review;
    });
    setReviews(updatedReviews);
    setReply('');
    setSelectedReview(null);
    alert('Reply submitted!');
  };

  return (
    <div className="absolute w-full top-0 left-0 h-full bg-[radial-gradient(125%_125%_at_50%_10%,#000_50%,#32cd32_100%)] p-6">
      <div className="max-w-4xl mx-auto bg-transparent p-6 rounded-lg shadow-xl">
        <h1 className="text-4xl font-extrabold text-green-600 mb-8 text-center">
          Provider Responses
        </h1>

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
                className="bg-gray-900 bg-opacity-90 p-6 rounded-3xl shadow-lg transition-shadow border-2 border-yellow-500 hover:border-yellow-500 hover:border-2 cursor-pointer"
                onClick={() => setSelectedReview(review)}
              >
                <h3 className="text-2xl font-bold text-green-600">{review.provider}</h3>
                <p className="text-yellow-500">{review.comment}</p>
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

      {/* Modal for responding */}
      {selectedReview && (
        <div className="fixed z-50 inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <h2 className="text-xl font-bold mb-4">Respond to Review</h2>
            <p className="mb-2">
              <strong>Review:</strong> {selectedReview.comment}
            </p>
            <textarea
              placeholder="Write your reply here"
              value={reply}
              onChange={(e) => setReply(e.target.value)}
              rows="4"
              className="w-full p-4 border-2 border-gray-300 rounded-lg mb-4"
            />
            <div className="flex justify-end">
              <button
                onClick={() => setSelectedReview(null)}
                className="px-4 py-2 bg-gray-300 text-black rounded-lg mr-2"
              >
                Cancel
              </button>
              <button
                onClick={handleReplySubmit}
                className="px-4 py-2 bg-yellow-600 text-white rounded-lg"
              >
                Submit Reply
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Reviews;
