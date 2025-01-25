import React, { useState, useEffect } from 'react';

const Services = () => {
  const [services, setServices] = useState([]);
  const [selectedService, setSelectedService] = useState(null);

  useEffect(() => {
    // Simulated data fetch for services
    const fetchServices = async () => {
      const mockData = [
        {
          id: 1,
          name: 'Urban Barbers',
          rating: 4.5,
          location: '456 Elm Street, Los Angeles, CA',
          phone: '+1 123-456-7890',
          image: 'https://example.com/barber.jpg',
        },
        {
          id: 2,
          name: 'Fix-It Plumbers',
          rating: 4.2,
          location: '123 Main Street, New York, NY',
          phone: '+1 234-567-8901',
          image: 'https://example.com/plumber.jpg',
        },
        {
          id: 3,
          name: 'Glow Beauty Salon',
          rating: 4.8,
          location: '789 Pine Street, Miami, FL',
          phone: '+1 345-678-9012',
          image: 'https://example.com/beauty.jpg',
        },
        {
          id: 4,
          name: 'Electrician Experts',
          rating: 4.3,
          location: '321 Oak Avenue, Austin, TX',
          phone: '+1 456-789-0123',
          image: 'https://example.com/electrician.jpg',
        },
      ];
      setServices(mockData);
    };

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
                src={service.image}
                alt={service.name}
                className="w-full h-40 object-cover"
              />
              <div className="p-4">
                <h2 className="text-xl font-semibold text-gray-800">{service.name}</h2>
                <p className="text-gray-600 text-sm mb-2">{service.location}</p>
                <p className="text-yellow-500 text-sm font-medium">
                  ⭐ {service.rating} / 5.0
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
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">{selectedService.name}</h2>
              <img
                src={selectedService.image}
                alt={selectedService.name}
                className="w-full h-40 object-cover rounded-lg mb-4"
              />
              <p className="text-gray-600 mb-2">
                <strong>Location:</strong> {selectedService.location}
              </p>
              <p className="text-gray-600 mb-4">
                <strong>Phone:</strong> {selectedService.phone}
              </p>
              <button
                className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300"
                onClick={() => {
                  alert(`Booking appointment for ${selectedService.name}`);
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
