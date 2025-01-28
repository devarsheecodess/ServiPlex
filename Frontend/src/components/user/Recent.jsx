import React, { useState, useEffect } from "react";
import axios from "axios";

const Recent = () => {
  const [appointments, setAppointments] = useState([]);
  const [userID, setUserID] = useState(localStorage.getItem("userID"));

  useEffect(() => {
    // Simulate fetching data from an API
    const fetchData = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/userAppointments`, {
          params: {
            customerId: userID,
            status: 'Completed'
          }
        });
        setAppointments(response.data);
      } catch (error) {
        console.error("Error fetching appointments:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="absolute w-full top-0 left-0 h-screen bg-[radial-gradient(125%_125%_at_50%_10%,#000_50%,#32cd32_100%)] p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-extrabold text-green-600 mb-10 text-center tracking-tight">
          Recent Appointments
        </h1>

        {appointments.length > 0 ? (
          <div className="grid grid-cols-1 gap-8">
            {appointments.map((appointment) => (
              <div
                key={appointment.id}
                className="bg-gray-800 bg-opacity-90 p-8 rounded-xl shadow-2xl hover:shadow-[0_0_25px_rgba(50,205,50,0.8)] transition-all transform hover:scale-105 flex flex-col sm:flex-row items-start sm:items-center justify-between"
              >
                <div className="flex flex-col sm:flex-row sm:justify-between w-full">
                  <div>
                    <h2 className="text-2xl font-bold text-white tracking-tight">
                      {appointment.shop}
                    </h2>
                    <p className="text-sm text-gray-400 mt-1">{appointment.address}</p>
                    <p className="mt-3 text-sm text-gray-300">
                      Date:{" "}
                      <span className="font-medium text-green-600">
                        {appointment.date.slice(0, 10)}
                      </span>
                    </p>
                  </div>
                  <div className="mt-6 sm:mt-0 sm:ml-8 flex flex-col items-end">
                    <p className="text-2xl font-bold text-green-600">
                      {appointment.paymentPrice}
                    </p>
                    <p className="text-lg text-yellow-600">
                      Bill:{" "}
                      <span className="font-medium text-green-600">
                        ₹ {appointment.price}
                      </span>
                    </p>
                  </div>
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

export default Recent;
