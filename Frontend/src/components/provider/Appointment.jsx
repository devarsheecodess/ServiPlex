import React, { useState } from "react";

const Appointment = () => {
  const [appointments, setAppointments] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [newAppointment, setNewAppointment] = useState(false); // Track if there's a new appointment

  // Handle accepting the appointment
  const handleAccept = (appointment) => {
    const newAppointment = { ...appointment, progress: "Accepted" };
    setAppointments(prev => [...prev, newAppointment]);
    setShowPopup(false); // Hide the popup after accepting
    setNewAppointment(true); // Mark new appointment
  };

  // Handle declining the appointment
  const handleDecline = () => {
    setShowPopup(false); // Close the popup if declined
  };

  // Update the progress of the appointment
  const handleUpdateProgress = (appointment, status) => {
    setAppointments(prev =>
      prev.map(app =>
        app.id === appointment.id ? { ...app, progress: status } : app
      )
    );
  };

  // Delete the appointment
  const handleDelete = (appointment) => {
    setAppointments(prev => prev.filter(app => app.id !== appointment.id));
  };

  // Create a new appointment (for simulation)
  const createAppointment = () => {
    const newAppointment = {
      id: Date.now(),
      name: "John Doe",
      service: "Pipe Repair",
      date: "2025-01-30",
      progress: "Pending"
    };
    setSelectedAppointment(newAppointment);
    setShowPopup(true); // Show the notification popup when a new appointment is created
  };

  return (
    <div className="absolute top-0 left-0 w-full h-screen bg-[radial-gradient(125%_125%_at_50%_10%,#000_50%,#32cd32_100%)] flex flex-col items-center justify-center p-8">
          <div className="bg-neutral-900 text-white w-full max-w-4xl p-8 rounded-2xl shadow-2xl">
                {/* Bell Icon with Red Dot */}
        {newAppointment && (
          <div className="absolute top-4 right-4">
            <div className="relative">
<i class="fa-solid fa-bell"></i>
              <div className="absolute top-0 right-0 w-3 h-3 bg-red-500 rounded-full"></div>
            </div>
          </div>
        )}
        <h1 className="text-2xl font-extrabold text-green-400 mb-6">Appointments</h1>
        {/* Button to simulate creating a new appointment */}
        <button
          className="px-4 py-2 bg-green-500 rounded-lg text-black mt-4"
          onClick={createAppointment}
        >
          Check New Appointment
        </button>

        {/* Appointment List */}
        <div className="space-y-4 mt-6">
          {appointments.map((appointment) => (
            <div key={appointment.id} className="bg-neutral-800 p-4 rounded-lg">
              <h2 className="text-green-400">{appointment.name} - {appointment.service}</h2>
              <p className="text-white">Date: {appointment.date}</p>
              <p className="text-white">Progress: {appointment.progress}</p>
              <button
                className={`px-4 py-2 rounded-lg text-black mt-2 ${
                  appointment.progress === "Completed"
                    ? "bg-red-500 hover:bg-red-400"
                    : "bg-blue-500 hover:bg-blue-400"
                }`}
                onClick={() =>
                  appointment.progress === "Completed"
                    ? handleDelete(appointment)
                    : handleUpdateProgress(
                        appointment,
                        appointment.progress === "Accepted" ? "In Progress" : "Completed"
                      )
                }
              >
                {appointment.progress === "Completed" ? "Delete" : "Update Progress"}
              </button>
            </div>
          ))}
        </div>

        {/* Appointment Details Popup */}
        {showPopup && selectedAppointment && (
          <div className="fixed top-0 left-0 w-full h-full bg-gray-500 bg-opacity-50 flex items-center justify-center">
            <div className="bg-neutral-900 p-8 rounded-lg w-96">
              <h2 className="text-2xl font-extrabold text-green-400">Appointment Details</h2>
              <p className="text-white">Name: {selectedAppointment.name}</p>
              <p className="text-white">Service: {selectedAppointment.service}</p>
              <p className="text-white">Date: {selectedAppointment.date}</p>
              <p className="text-white">Progress: {selectedAppointment.progress}</p>

              {/* Action Buttons for Accept/Decline */}
              <div className="flex justify-between mt-4">
                <button
                  className="px-4 py-2 bg-green-500 text-black rounded-lg"
                  onClick={() => handleAccept(selectedAppointment)}
                >
                 <i class="fa-solid fa-check  text-black"></i>
                </button>
                <button
                  className="px-4 py-2 bg-red-500 text-white rounded-lg"
                  onClick={handleDecline}
                >
                  <i class="fa-solid fa-trash text-black"></i>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Appointment;
