import React, { useState, useEffect } from 'react';

const Services = () => {
  const [services, setServices] = useState([]);
  const [selectedService, setSelectedService] = useState(null);

  useEffect(() => {
    // Simulated data fetch for services
    const fetchServices = async () => {
      try {
        const response = await fetch('http://localhost:3000/providers');
        const data = await response.json();
        setServices(data);
      } catch (error) {
        console.log('Error: ', error);
      }
    };

    fetchServices();
  }, []);

  return (
    <div className="absolute top-0 left-0 w-full min-h-screen bg-[radial-gradient(125%_125%_at_50%_10%,#000_50%,#32cd32_100%)] flex flex-col items-center justify-center p-4">
      <div className="max-w-7xl mx-auto text-center">
        <h1 className="text-4xl font-bold text-white mb-10 tracking-wide">
          Discover Our <span className="text-green-400">Services</span>
        </h1>

        {/* Service Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <div
              key={service.id}
              className="bg-[rgba(255,255,255,0.1)] backdrop-blur-lg border border-[rgba(255,255,255,0.2)] rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-transform duration-300 transform hover:scale-105 cursor-pointer"
              onClick={() => setSelectedService(service)}
            >
              <img
                src={service.logo}
                alt={service.profession}
                className="w-full h-48 object-cover rounded-t-2xl"
              />
              <div className="p-6 text-left">
                <h2 className="text-2xl font-semibold text-cyan-400">{service.shop}</h2>
                <p className="text-white text-sm mt-2">{service.address}</p>
                <p className="text-yellow-400 text-sm mt-4">⭐ / 5.0</p>
              </div>
            </div>
          ))}
        </div>

        {/* Popup Modal */}
        {selectedService && (
          <div className="fixed inset-0 bg-[rgba(0,0,0,0.8)] flex items-center justify-center z-50">
            <div className="bg-[rgba(255,255,255,0.1)] backdrop-blur-lg border border-[rgba(255,255,255,0.2)] rounded-xl p-8 max-w-lg w-full text-white relative shadow-2xl">
              <button
                className="absolute top-4 right-4 text-gray-300 hover:text-white text-xl"
                onClick={() => setSelectedService(null)}
              >
                ✖
              </button>
              <h2 className="text-3xl font-semibold text-cyan-400 mb-6">{selectedService.shop}</h2>
              <img
                src={selectedService.logo}
                alt={selectedService.shop}
                className="w-full h-48 object-cover rounded-lg mb-6"
              />
              <p className="text-gray-300 mb-4">
                <strong>Location:</strong> {selectedService.address}
              </p>
              <p className="text-gray-300 mb-6">
                <strong>Phone:</strong> {selectedService.phone}
              </p>
              <button
                className="w-full bg-cyan-500 text-black py-3 rounded-lg hover:bg-cyan-400 transition-transform duration-300 transform hover:scale-105"
                onClick={() => {
                  alert(`Booking appointment for ${selectedService.shop}`);
                  setSelectedService(null);
                }}
              >
                Book Appointment
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Services;
