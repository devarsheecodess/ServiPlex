import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import axios from 'axios';

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const [reply, setReply] = useState('');

  const fetchReviews = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/reviews/name`, {
        params: { name: localStorage.getItem('provider') },
      });
      setReviews(response.data);
      console.log('Reviews:', response.data);
    } catch (error) {
      console.error('Error fetching reviews:', error);
      alert('An error occurred while fetching reviews');
    }
  };

  const sendReply = async (id) => {
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/reviews`, // No `id` in the URL
        { id: id, providerResponse: reply } // Pass `id` and `providerResponse` in the request body
      );
      console.log('Response:', response.data);
      fetchReviews();
    } catch (error) {
      console.error('Error sending reply:', error);
      alert('An error occurred while sending reply');
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

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
            <SwiperSlide key={review._id}>
              <div
                className="bg-gray-900 bg-opacity-90 p-6 rounded-3xl shadow-lg transition-shadow border-2 border-yellow-500 hover:border-yellow-500 hover:border-2 cursor-pointer"
              >
                <h3 className="text-2xl font-bold text-green-600">{review.customerName}</h3>
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

                <div className="relative w-full">
                  <input
                    type="text"
                    onChange={(e) => setReply(e.target.value)}
                    placeholder="Reply to this review"
                    className="w-full p-3 border-2 border-gray-300 bg-gray-300 mt-5 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent shadow-md"
                  />
                  <button onClick={() => sendReply(review.id)} className="absolute top-1/2 right-2 transform -translate-y-1/2 rounded-full outline-0 mt-3 text-black p-4 cursor-pointer transition-all duration-200">
                    <i className="fa-solid fa-paper-plane"></i>
                  </button>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Reviews;