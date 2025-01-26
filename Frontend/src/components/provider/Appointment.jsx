import React, { useState } from "react";

const Appointment = () => {
  const [appointments, setAppointments] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);

  // Handle accepting the appointment
  const handleAccept = (appointment) => {
    const updatedAppointment = { ...appointment, progress: "Accepted" };
    setAppointments((prev) => [...prev, updatedAppointment]);
    setShowPopup(false);
  };

  // Handle declining the appointment
  const handleDecline = () => {
    setShowPopup(false);
  };

  // Update the progress of the appointment
  const handleUpdateProgress = (appointment, status) => {
    setAppointments((prev) =>
      prev.map((app) =>
        app.id === appointment.id ? { ...app, progress: status } : app
      )
    );
  };

  // Delete the appointment
  const handleDelete = (appointment) => {
    setAppointments((prev) => prev.filter((app) => app.id !== appointment.id));
  };

  return (
    <div className="absolute top-0 left-0 w-full h-screen bg-[radial-gradient(125%_125%_at_50%_10%,#000_50%,#32cd32_100%)] flex flex-col items-center justify-center p-8">
      <div className="bg-neutral-900 text-white w-full max-w-4xl p-8 rounded-2xl shadow-2xl">
        <h1 className="text-2xl font-extrabold text-green-400 mb-6">Appointments</h1>

        {/* Appointment List */}
        <div className="space-y-4 mt-6">
          {appointments.length === 0 ? (
            <p className="text-white">No appointments available</p>
          ) : (
            appointments.map((appointment) => (
              <div
                key={appointment.id}
                className="bg-neutral-800 p-4 rounded-lg"
              >
                <h2 className="text-green-400">
                  {appointment.name} - {appointment.service}
                </h2>
                <p className="text-white">Date: {appointment.date}</p>
                <p className="text-white">Progress: {appointment.progress}</p>
                <div className="flex gap-2 mt-2">
                  {/* Update Progress Button */}
                  <button
                    className={`px-4 py-2 rounded-lg text-black ${
                      appointment.progress === "Completed"
                        ? "bg-red-500 hover:bg-red-400"
                        : "bg-blue-500 hover:bg-blue-400"
                    }`}
                    onClick={() =>
                      appointment.progress === "Completed"
                        ? handleDelete(appointment)
                        : handleUpdateProgress(
                            appointment,
                            appointment.progress === "Accepted"
                              ? "In Progress"
                              : "Completed"
                          )
                    }
                  >
                    {appointment.progress === "Completed"
                      ? "Delete"
                      : "Update Progress"}
                  </button>

                  {/* Show Details Button */}
                  <button
                    className="px-4 py-2 bg-green-500 rounded-lg text-black"
                    onClick={() => {
                      setSelectedAppointment(appointment);
                      setShowPopup(true);
                    }}
                  >
                    View Details
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Appointment Details Popup */}
        {showPopup && selectedAppointment && (
          <div className="fixed top-0 left-0 w-full h-full bg-gray-500 bg-opacity-50 flex items-center justify-center">
            <div className="bg-neutral-900 p-8 rounded-lg w-96">
              <h2 className="text-2xl font-extrabold text-green-400">
                Appointment Details
              </h2>
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
                  Accept
                </button>
                <button
                  className="px-4 py-2 bg-red-500 text-white rounded-lg"
                  onClick={handleDecline}
                >
                  Decline
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
