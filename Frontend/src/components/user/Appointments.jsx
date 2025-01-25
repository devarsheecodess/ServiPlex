import React, { useState, useEffect } from 'react';

const Appointments = () => {
  // Sample data for appointments
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    // Simulate fetching data from an API
    const fetchData = async () => {
      const mockData = [
        {
          id: 1,
          shopName: 'Glow Beauty Salon',
          date: '2025-01-30',
          time: '3:00 PM',
          address: '123 Main Street, New York, NY',
          paymentPrice: '$50',
        },
        {
          id: 2,
          shopName: 'Urban Barbers',
          date: '2025-02-05',
          time: '10:30 AM',
          address: '456 Elm Street, Los Angeles, CA',
          paymentPrice: '$30',
        },
      ];
      setAppointments(mockData);
    };

    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Your Appointments</h1>

        {appointments.length > 0 ? (
          <div className="grid grid-cols-1 gap-6">
            {appointments.map((appointment) => (
              <div
                key={appointment.id}
                className="bg-white p-6 rounded-lg shadow-lg flex flex-col sm:flex-row items-start sm:items-center justify-between"
              >
                <div>
                  <h2 className="text-xl font-semibold text-gray-800">
                    {appointment.shopName}
                  </h2>
                  <p className="text-sm text-gray-500">{appointment.address}</p>
                  <p className="mt-2 text-sm text-gray-700">
                    Date: <span className="font-medium">{appointment.date}</span>
                  </p>
                  <p className="text-sm text-gray-700">
                    Time: <span className="font-medium">{appointment.time}</span>
                  </p>
                </div>
                <div className="mt-4 sm:mt-0 sm:ml-6">
                  <p className="text-lg font-semibold text-green-600">
                    {appointment.paymentPrice}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-600">No appointments booked yet.</p>
        )}
      </div>
    </div>
  );
};

export default Appointments;
