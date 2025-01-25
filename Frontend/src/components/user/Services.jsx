import React, { useState, useEffect } from 'react';

const Services = () => {
  const [services, setServices] = useState([]);
  const [selectedService, setSelectedService] = useState(null);

  useEffect(() => {
    // Simulated data fetch for services
    const fetchServices = async () => {
        try{
            const response = await fetch('http://localhost:3000/providers');
            const data = await response.json();
            setServices(data);
        }catch(error){
            console.log("Error: ", error);
        }
    }

    fetchServices();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Available Services</h1>

        {/* Service Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <div
              key={service.id}
              className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 cursor-pointer"
              onClick={() => setSelectedService(service)}
            >
              <img
                src={service.logo}
                alt={service.profession}
                className="w-full h-40 object-cover"
              />
              <div className="p-4">
                <h2 className="text-xl font-semibold text-gray-800">{service.shop}</h2>
                <p className="text-gray-600 text-sm mb-2">{service.address}</p>
                <p className="text-yellow-500 text-sm font-medium">
                  ⭐ / 5.0
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Popup Modal */}
        {selectedService && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-md w-full shadow-lg">
              <button
                className="absolute top-4 right-4 text-gray-600 hover:text-black"
                onClick={() => setSelectedService(null)}
              >
                ✖
              </button>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">{selectedService.shop}</h2>
              <img
                src={selectedService.logo}
                alt={selectedService.shop}
                className="w-full h-40 object-cover rounded-lg mb-4"
              />
              <p className="text-gray-600 mb-2">
                <strong>Location:</strong> {selectedService.address}
              </p>
              <p className="text-gray-600 mb-4">
                <strong>Phone:</strong> {selectedService.phone}
              </p>
              <button
                className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300"
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
