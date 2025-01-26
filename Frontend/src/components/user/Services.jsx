import React, { useState, useEffect } from "react";
import axios from "axios";

const Services = () => {
  const [services, setServices] = useState([]);
  const [subServices, setSubServices] = useState([]);
  const [selectedService, setSelectedService] = useState(null);
  const [viewAll, setViewAll] = useState(false);
  const [order, setOrder] = useState([]);
  const [showBookingPopup, setShowBookingPopup] = useState(false);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch("http://localhost:3000/providers");
        const data = await response.json();
        setServices(data);
      } catch (error) {
        console.log("Error: ", error);
      }
    };

    fetchServices();
  }, []);

  const fetchSubServices = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/services?id=${id}`);
      const data = await response.json(); // Corrected to handle JSON response
      setSubServices(data); // Updated from response.data to data
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  const handleServices = (id) => {
    setViewAll(true);
    fetchSubServices(id);
  };

  const addToOrder = (service) => {
    setOrder((prevOrder) => [...prevOrder, service]);
    alert("Service added");
  };

  const bookAppointment = async () => {
    try {
      if (order.length === 0) {
        alert("Please add services to your order.");
        return;
      }
      const appointmentDetails = {
        providerId: selectedService.id,
        customerId: localStorage.getItem("userID"),
        customerName: localStorage.getItem("name"),
        shop: selectedService.shop,
        services: order,
        price: order.reduce((acc, item) => acc + item.price, 0),
        date: new Date(),
        status: "pending",
      };
      console.log(appointmentDetails);
      const response = await axios.post("http://localhost:3000/appointments", appointmentDetails);
      if (response.status === 201) {
        alert("Appointment booked successfully!");
        setShowBookingPopup(false);
        setOrder([]);
      } else {
        alert("Failed to book appointment.");
      }
    } catch (error) {
      console.log("Error: ", error);
      alert("An error occurred while booking the appointment.");
    }
  };

  const fetchReviews = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/reviews/name`, { params: { name: selectedService.shop } });
      setReviews(response.data);
    } catch (error) {
      console.log("Error: ", error);
    }
  }

  const removeService = () => {
    setSelectedService(null);
  };

  useEffect(() => {
    if (selectedService) {
      fetchReviews();
    }
  }, [selectedService]);

  return (
    <div className="absolute top-0 left-0 w-full min-h-screen bg-[radial-gradient(125%_125%_at_50%_10%,#000_50%,#32cd32_100%)] flex flex-col items-center justify-center p-4">
  <button
    className="absolute top-4 right-4 px-4 py-2 bg-black backdrop-blur-lg rounded-lg "
    onClick={() => window.location.href = 'service-discovery'}
  >
    <i class="fa-solid fa-magnifying-glass text-red-600 text-3xl"></i>
  </button>

        <h1 className="text-4xl font-bold text-white mb-10 tracking-wide">
          Discover Our <span className="text-green-400">Services</span>
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <div
              key={service.id}
              className="bg-[rgba(255,255,255,0.1)] backdrop-blur-lg border border-[rgba(255,255,255,0.2)] rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-transform duration-300 transform hover:scale-105 cursor-pointer"
            >
              <img
                src={service.logo || "https://demofree.sirv.com/nope-not-here.jpg"}
                alt={service.profession}
                className="w-full h-48 object-cover rounded-t-2xl"
              />
              <div className="p-6 text-left">
                <h2 className="text-2xl font-semibold text-cyan-400">{service.shop}</h2>
                <p className="text-white text-sm mt-2">{service.address}</p>
                <p className="text-yellow-400 text-sm mt-4">⭐ / 5.0</p>
                <button
                  className="mt-4 bg-cyan-500 text-black py-2 px-4 rounded-lg hover:bg-cyan-400 transition-transform duration-300 transform hover:scale-105"
                  onClick={() => { setSelectedService(service); }}
                >
                  View Details
                </button>
                <button
                  className="mt-4 ml-4 bg-green-500 text-black py-2 px-4 rounded-lg hover:bg-green-400 transition-transform duration-300 transform hover:scale-105"
                  onClick={() => handleServices(service.id)}
                >
                  View Services
                </button>
              </div>
            </div>
          ))}
        </div>

        {selectedService && (
          <div className="fixed inset-0 bg-[rgba(0,0,0,0.8)] flex items-center justify-center z-50">
            <div className="bg-[rgba(255,255,255,0.1)] backdrop-blur-lg border border-[rgba(255,255,255,0.2)] rounded-xl p-8 max-w-lg w-full text-white relative shadow-2xl">
              <div className="overflow-y-auto h-[350px] mb-3 p-3">
                <button
                  className="absolute cursor-pointer outline-0 top-4 right-4 text-gray-300 hover:text-white text-xl"
                  onClick={removeService}
                >
                  ✖
                </button>
                <h2 className="text-3xl font-semibold text-cyan-400 mb-6">{selectedService.shop}</h2>
                <img
                  src={selectedService.logo || "https://demofree.sirv.com/nope-not-here.jpg"}
                  alt={selectedService.shop}
                  className="w-full h-48 object-cover rounded-lg mb-6"
                />
                <p className="text-gray-300 mb-4 flex flex-col">
                  <p><strong>Location:</strong> {selectedService.address}</p>
                  <p><strong className="ml-4">Contact:</strong> {selectedService.phone}</p>
                </p>

                {/* Reviews Section */}
                <div className="flex items-center flex-col mt-10 justify-center mb-8 px-4 sm:px-8">
                  <div className="text-center text-gray-300 mb-6">
                    <p className="text-lg font-semibold">
                      <strong>Reviews:</strong> {selectedService.reviews}
                    </p>
                  </div>

                  {/* Reviews List */}
                  {reviews.length > 0 ? (
                    <div className="space-y-6 w-full max-w-3xl">
                      {reviews.map((review) => (
                        <div
                          key={review.id}
                          className="bg-[rgba(255,255,255,0.1)] backdrop-blur-lg flex flex-col border border-[rgba(255,255,255,0.2)] rounded-lg p-6 shadow-lg hover:scale-105 transition-transform duration-300"
                        >
                          <p className="text-gray-300 mb-3 text-base">{review.comment}</p>
                          <p className="text-yellow-400 text-sm">
                            {"⭐".repeat(review.rating)}
                          </p>

                          <p className="text-gray-400 text-sm">By: {review.customerName}</p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500">No reviews yet.</p>
                  )}
                </div>

              </div>
              <button
                className="w-full bg-cyan-500 text-black py-3 rounded-lg hover:bg-cyan-400 transition-transform duration-300 transform hover:scale-105"
                onClick={() => setShowBookingPopup(true)}
              >
                Book Appointment
              </button>
            </div>
          </div>
        )}

        {viewAll && (
          <div className="fixed inset-0 bg-[rgba(0,0,0,0.8)] flex items-center justify-center z-50">
            <div className="bg-[rgba(255,255,255,0.1)] backdrop-blur-lg border border-[rgba(255,255,255,0.2)] rounded-xl p-8 max-w-3xl w-full text-white relative shadow-2xl">
              <button
                className="absolute cursor-pointer outline-0 top-4 right-4 text-gray-300 hover:text-white text-xl"
                onClick={() => setViewAll(false)}
              >
               <i className="fa-solid fa-xmark text-green-600"></i>
              </button>
              <h2 className="text-3xl font-semibold text-cyan-400 mb-6">Services</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {subServices.map((subService) => (
                  <div key={subService.id} className="bg-[rgba(255,255,255,0.1)] backdrop-blur-lg border border-[rgba(255,255,255,0.2)] rounded-lg shadow-lg hover:scale-105 transition-transform duration-300">
                    <div className="p-6">
                      <h3 className="text-xl font-semibold text-white">{subService.name}</h3>
                      <p className="text-gray-300 mb-4">{subService.description}</p>
                      <button
                        className="w-full bg-green-500 text-black py-2 rounded-lg hover:bg-green-400 transition-transform duration-300 transform hover:scale-105"
                        onClick={() => addToOrder(subService)}
                      >
                        Add to Order
                      </button>
                    </div>
                    <button
                      className="bg-green-500 cursor-pointer text-black py-2 px-4 rounded-lg hover:bg-green-400 transition-transform duration-300 transform hover:scale-105"
                      onClick={() => addToOrder(service)}
                    >
                      <i className="fa-solid fa-plus text-black"></i>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {showBookingPopup && (
          <div className="fixed inset-0 bg-[rgba(0,0,0,0.8)] flex items-center justify-center z-50">
            <div className="bg-[rgba(255,255,255,0.1)] backdrop-blur-lg border border-[rgba(255,255,255,0.2)] rounded-xl p-8 max-w-lg w-full text-white relative shadow-2xl">
              <button
                className="absolute cursor-pointer outline-0 top-4 right-4 text-gray-300 hover:text-white text-xl"
                onClick={() => setShowBookingPopup(false)}
              >
                ✖
              </button>
              <h2 className="text-3xl font-semibold text-cyan-400 mb-6">Order Summary</h2>
              <ul className="mb-6">
                {order.map((item, index) => (
                  <li key={index} className="flex justify-between text-gray-300 mb-2">
                    <span>{item.name}</span>
                    <span>₹ {item.price}</span>
                  </li>
                ))}
                {
                  order.length === 0 && (
                    <div className="flex justify-center items-center w-full h-48">
                      <p className="text-gray-300 text-center">No services added to the order.</p>
                    </div>
                  )
                }
              </ul>
              <button
                className="w-full bg-green-500 text-black py-3 rounded-lg hover:bg-green-400 transition-transform duration-300 transform hover:scale-105"
                onClick={bookAppointment}
              >
                Confirm Booking
              </button>
            </div>
          </div>
        )}

      </div>
  );
};

export default Services;
