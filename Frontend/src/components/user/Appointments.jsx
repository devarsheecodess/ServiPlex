import React, { useState, useEffect } from "react";

const Appointments = () => {
  // Sample data for appointments
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    // Simulate fetching data from an API
    const fetchData = async () => {
      const mockData = [
        {
          id: 1,
          shopName: "Glow Beauty Salon",
          date: "2025-01-30",
          time: "3:00 PM",
          address: "123 Main Street, New York, NY",
          paymentPrice: "$50",
        },
        {
          id: 2,
          shopName: "Urban Barbers",
          date: "2025-02-05",
          time: "10:30 AM",
          address: "456 Elm Street, Los Angeles, CA",
          paymentPrice: "$30",
        },
      ];
      setAppointments(mockData);
    };

    fetchData();
  }, []);

  return (
    <div className="absolute w-full top-0 left-0 h-screen bg-[radial-gradient(125%_125%_at_50%_10%,#000_50%,#32cd32_100%)] p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-extrabold text-green-600 mb-10 text-center tracking-tight">
          Your Appointments
        </h1>

        {appointments.length > 0 ? (
          <div className="grid grid-cols-1 gap-8">
            {appointments.map((appointment) => (
              <div
                key={appointment.id}
                className="bg-gray-800 bg-opacity-90 p-8 rounded-xl shadow-2xl hover:shadow-[0_0_25px_rgba(50,205,50,0.8)] transition-all transform hover:scale-105 flex flex-col sm:flex-row items-start sm:items-center justify-between"
              >
                <div>
                  <h2 className="text-2xl font-bold text-white tracking-tight">
                    {appointment.shopName}
                  </h2>
                  <p className="text-sm text-gray-400 mt-1">{appointment.address}</p>
                  <p className="mt-3 text-sm text-gray-300">
                    Date:{" "}
                    <span className="font-medium text-green-600">
                      {appointment.date}
                    </span>
                  </p>
                  <p className="text-sm text-gray-300">
                    Time:{" "}
                    <span className="font-medium text-gray-200">
                      {appointment.time}
                    </span>
                  </p>
                </div>
                <div className="mt-6 sm:mt-0 sm:ml-8">
                  <p className="text-2xl font-bold text-green-600">{appointment.paymentPrice}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-300 text-center">
            No appointments booked yet.
          </p>
        )}
      </div>
    </div>
  );
};

export default Appointments;
