import React, { useState, useEffect } from 'react';

const Recent = () => {
  // State to hold recent services
  const [recentServices, setRecentServices] = useState([]);

  useEffect(() => {
    // Simulating data fetch for recent services
    const fetchRecentServices = async () => {
      const mockData = [
        {
          id: 1,
          serviceName: 'Haircut',
          provider: 'Urban Barbers',
          date: '2025-01-15',
          price: '$20',
          address: '456 Elm Street, Los Angeles, CA',
        },
        {
          id: 2,
          serviceName: 'Facial Treatment',
          provider: 'Glow Beauty Salon',
          date: '2025-01-20',
          price: '$50',
          address: '123 Main Street, New York, NY',
        },
        {
          id: 3,
          serviceName: 'Full Body Massage',
          provider: 'Relax Spa',
          date: '2025-01-22',
          price: '$100',
          address: '789 Pine Street, Miami, FL',
        },
      ];
      setRecentServices(mockData);
    };

    fetchRecentServices();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Recent Services</h1>

        {recentServices.length > 0 ? (
          <div className="grid grid-cols-1 gap-6">
            {recentServices.map((service) => (
              <div
                key={service.id}
                className="bg-white p-6 rounded-lg shadow-lg flex flex-col sm:flex-row items-start sm:items-center justify-between"
              >
                <div>
                  <h2 className="text-xl font-semibold text-gray-800">{service.serviceName}</h2>
                  <p className="text-sm text-gray-500">Provider: {service.provider}</p>
                  <p className="text-sm text-gray-500">Address: {service.address}</p>
                  <p className="mt-2 text-sm text-gray-700">
                    Date: <span className="font-medium">{service.date}</span>
                  </p>
                </div>
                <div className="mt-4 sm:mt-0 sm:ml-6">
                  <p className="text-lg font-semibold text-green-600">{service.price}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-600">No recent services to display.</p>
        )}
      </div>
    </div>
  );
};

export default Recent;
