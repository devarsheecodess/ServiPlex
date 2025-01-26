import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

const Reviews = () => {
  const [providers, setProviders] = useState([]);
  const [rating, setRating] = useState(0);
  const date = new Date().toLocaleDateString();
  const [reviews, setReviews] = useState([]);
  const [reviewForm, setReviewForm] = useState({
    id: uuidv4(),
    customerId : localStorage.getItem('userID'),
    customerName: localStorage.getItem('name'),
    provider: '',
    comment: '',
    rating: '',
    providerResponse: '',
    date: date,
  });
  const [id, setId] = useState(localStorage.getItem('userID'));

  const fetchProviders = async () => {
    try {
      const response = await axios.get('http://localhost:3000/provider', {params: {id: id}});
      setProviders(response.data);
    } catch (error) {
      console.error('Error fetching providers:', error);
    }
  }

  const handleChange = (e) => {
    setReviewForm({ ...reviewForm, [e.target.name]: e.target.value });
  }

  const handleSubmit = async () => {
    try {
      // Update the rating in the reviewForm state
      if (rating === 0) {
        alert('Please select a rating');
        return;
      }

      const updatedReviewForm = { ...reviewForm, rating: rating };
  
      // Log the updated review form
      console.log(updatedReviewForm);
  
      const response = await axios.post('http://localhost:3000/reviews', updatedReviewForm);
      if (response.status === 201) {
        alert('Review submitted successfully');
        setReviewForm({
          id: uuidv4(),
          customerName: localStorage.getItem('name'),
          provider: '',
          comment: '',
          rating: '',
          providerResponse: '',
          date: date,
        });
        window.location.reload();
      }
    } catch (error) {
      console.error('Error submitting review:', error);
    }
  };

  const fetchReviews = async () => {
    try{
      const response = await axios.get('http://localhost:3000/reviews', {params: {id: id}});
      setReviews(response.data);
    }catch{
      console.error('Error fetching reviews:', error);
    }
  }

  useEffect(() => {
    fetchProviders();
    fetchReviews();
  }, []);

  return (
    <div className="absolute w-full top-0 left-0 h-full bg-[radial-gradient(125%_125%_at_50%_10%,#000_50%,#32cd32_100%)] p-6">
      <div className="max-w-4xl mx-auto bg-transparent p-6 rounded-lg shadow-xl">
        <h1 className="text-4xl font-extrabold text-green-600 mb-8 text-center">User Reviews</h1>


        <div className="submit-review text-yellow-600 mb-6">
          <select
            placeholder="Select the Provider"
            className="w-full p-4 mb-5 border-2 border-yellow-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            value={reviewForm.provider}
            name="provider"
            onChange={handleChange}
          >
            <option value="" className='bg-gray-900 text-white-600' disabled selected>Select the Provider</option>
            {providers.map((provider) => (
              <option key={provider.id} value={provider.shop} className='bg-gray-900 text-yellow-600'>{provider.shop}</option>
            ))}
          </select>

          <textarea
            placeholder="Write your review here"
            value={reviewForm.comment}
            name="comment"
            onChange={handleChange}
            rows="2"
            className="w-full p-4 border-2 border-yellow-600 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-green-500"

          />
          <div className="rating mb-4">
        <span className="text-lg">Rating:</span>
         {[1, 2, 3, 4, 5].map((star) => (
         <span
              key={star}
          className={`text-2xl cursor-pointer ${rating >= star ? 'text-yellow-500' : 'text-gray-400'}`}
            onClick={() => {
            setRating(star);
            console.log('Rating updated:', star); // Check if the rating is updating
           }}
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

        {/* {/* <h2 className="text-2xl font-semibold text-green-600 mb-2">All Reviews</h2> */}
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
    </div>
  );
};

export default Reviews;