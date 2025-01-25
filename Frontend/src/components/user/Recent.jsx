import React, { useState, useEffect } from "react";

const Recent = () => {
  // State to hold recent services
  const [recentServices, setRecentServices] = useState([]);

  useEffect(() => {
    // Simulating data fetch for recent services
    const fetchRecentServices = async () => {
      const mockData = [
        {
          id: 1,
          serviceName: "Haircut",
          provider: "Urban Barbers",
          date: "2025-01-15",
          price: "$20",
          address: "456 Elm Street, Los Angeles, CA",
        },
        {
          id: 2,
          serviceName: "Facial Treatment",
          provider: "Glow Beauty Salon",
          date: "2025-01-20",
          price: "$50",
          address: "123 Main Street, New York, NY",
        },
        {
          id: 3,
          serviceName: "Full Body Massage",
          provider: "Relax Spa",
          date: "2025-01-22",
          price: "$100",
          address: "789 Pine Street, Miami, FL",
        },
      ];
      setRecentServices(mockData);
    };

    fetchRecentServices();
  }, []);

  return (
   <div  className=" absolute top-0 left-0 w-full h-screen bg-[radial-gradient(125%_125%_at_50%_10%,#000_50%,#32cd32_100%)] p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-extrabold text-green-600 mb-8 text-center">
          Recent Services
        </h1>

        {recentServices.length > 0 ? (
          <div className="grid grid-cols-1 gap-6">
            {recentServices.map((service) => (
              <div
                key={service.id}
                className="bg-gray-900  w -full bg-opacity-90 p-6 rounded-lg shadow-lg hover:shadow-[0_0_20px_rgba(50,205,50,0.8)] transition-shadow flex flex-col sm:flex-row items-start sm:items-center justify-between"
              >
                <div>
                  <h2 className="text-2xl font-bold text-white">
                    {service.serviceName}
                  </h2>
                  <p className="text-sm text-gray-400">
                    Provider: {service.provider}
                  </p>
                  <p className="text-sm text-gray-400">
                    Address: {service.address}
                  </p>
                  <p className="mt-2 text-sm text-gray-300">
                    Date:{" "}
                    <span className="font-medium text-green-500">
                      {service.date}
                    </span>
                  </p>
                </div>
                <div className="mt-4 sm:mt-0 sm:ml-6">
                  <p className="text-xl font-bold text-green-500">
                    {service.price}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-300 text-center">
            No recent services to display.
          </p>
        )}
      </div>
    </div>
  );
};

export default Recent;
