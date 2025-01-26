import React, { useState, useEffect } from "react";

// Helper function to fetch appointments from the backend
const fetchAppointments = async () => {
  try {
    const response = await fetch("http://localhost:3000/appointments");
    if (!response.ok) {
      throw new Error("Failed to fetch appointments");
    }
    const data = await response.json();
    return data; // Backend now sends properly serialized data
  } catch (err) {
    console.error("Error fetching appointments:", err);
    return [];
  }
};

const Appointment = () => {
  const [appointments, setAppointments] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [newAppointment, setNewAppointment] = useState(false);

  // Fetch appointments from the backend on component mount
  useEffect(() => {
    const getAppointments = async () => {
      console.log("Starting to fetch appointments...");
      const fetchedAppointments = await fetchAppointments();
      if (fetchedAppointments.length > 0) {
        console.log("Fetched appointments:", fetchedAppointments);
      } else {
        console.log("No appointments found");
      }
      setAppointments(fetchedAppointments);
    };
    getAppointments();
  }, []);

  // Handle accepting the appointment
  const handleAccept = (appointment) => {
    console.log("Accepting appointment:", appointment);
    const updatedAppointment = { ...appointment, status: "Accepted" };
    setAppointments((prev) =>
      prev.map((app) => (app._id === appointment._id ? updatedAppointment : app))
    );
    setShowPopup(false);
    setNewAppointment(true);
  };

  // Handle declining the appointment
  const handleDecline = () => {
    console.log("Declining the appointment");
    setShowPopup(false);
  };

  // Handle updating progress and payment status
  const handleUpdateProgress = (appointment, newStatus, newPaymentStatus) => {
    console.log(
      `Updating appointment progress. Appointment ID: ${appointment._id}, Status: ${newStatus}, Payment Status: ${newPaymentStatus}`
    );

    fetch(`http://localhost:3000/appointments/${appointment._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        status: newStatus,
        paymentStatus: newPaymentStatus,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Failed to update appointment, status: ${response.status}`);
        }
        return response.json();
      })
      .then((updatedAppointment) => {
        console.log("Appointment updated:", updatedAppointment);
        setAppointments((prev) =>
          prev.map((app) => (app._id === updatedAppointment._id ? updatedAppointment : app))
        );
      })
      .catch((error) => console.error("Error updating appointment:", error));
  };

  // Delete the appointment
  const handleDelete = (appointment) => {
    console.log("Attempting to delete appointment with ID:", appointment._id);
    fetch(`http://localhost:3000/appointments/${appointment._id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Failed to delete appointment, status: ${response.status}`);
        }
        console.log(`Appointment with ID: ${appointment._id} deleted successfully.`);
        setAppointments((prev) => prev.filter((app) => app._id !== appointment._id));
      })
      .catch((error) => console.error("Error deleting appointment:", error));
  };
  

  // Simulate creating a new appointment
  const createAppointment = () => {
    console.log("Creating a new appointment...");
    const newAppointment = {
      _id: String(Date.now()), // Simulated unique ID
      name: "John Doe",
      service: "Pipe Repair",
      date: new Date().toISOString(),
      status: "Pending",
      paymentStatus: "before",
    };
    setSelectedAppointment(newAppointment);
    setShowPopup(true);
  };

  return (
    <div className="absolute top-0 left-0 w-full h-screen bg-[radial-gradient(125%_125%_at_50%_10%,#000_50%,#32cd32_100%)] flex flex-col items-center justify-center p-8">
      <div className="bg-neutral-900 text-white w-full max-w-4xl p-8 rounded-2xl shadow-2xl">
        {newAppointment && (
          <div className="absolute top-4 right-4">
            <div className="relative">
              <i className="fa-solid fa-bell"></i>
              <div className="absolute top-0 right-0 w-3 h-3 bg-red-500 rounded-full"></div>
            </div>
          </div>
        )}
        <h1 className="text-2xl font-extrabold text-green-400 mb-6">Appointments</h1>
        <button
          className="px-4 py-2 bg-green-500 rounded-lg text-black mt-4"
          onClick={createAppointment}
        >
          Check New Appointment
        </button>
        <div className="space-y-4 mt-6">
          {appointments.length === 0 ? (
            <p className="text-white">No appointments found</p>
          ) : (
            appointments.map((appointment) => (
              <div key={appointment._id} className="bg-neutral-800 p-4 rounded-lg">
                <h2 className="text-green-400">
                  {appointment.name || "Unknown Name"} - {appointment.service || "Unknown Service"}
                </h2>
                <p className="text-white">Date: {new Date(appointment.date).toLocaleDateString()}</p>
                <p className="text-white">Status: {appointment.status || "Unknown Status"}</p>
                <p className="text-white">
                  Payment Status:{" "}
                  {appointment.paymentStatus === "before"
                    ? "Pay Before Service"
                    : "Pay After Service"}
                </p>
                <button
                  className={`px-4 py-2 rounded-lg text-black mt-2 ${
                    appointment.status === "Completed"
                      ? "bg-red-500 hover:bg-red-400"
                      : "bg-blue-500 hover:bg-blue-400"
                  }`}
                  onClick={() =>
                    appointment.status === "Completed"
                      ? handleDelete(appointment)
                      : handleUpdateProgress(
                          appointment,
                          appointment.status === "Accepted" ? "In Progress" : "Completed",
                          appointment.paymentStatus === "before" ? "after" : "before"
                        )
                  }
                >
                  {appointment.status === "Completed" ? "Delete" : "Update Progress"}
                </button>
              </div>
            ))
          )}
        </div>
        {showPopup && selectedAppointment && (
          <div className="fixed top-0 left-0 w-full h-full bg-gray-500 bg-opacity-50 flex items-center justify-center">
            <div className="bg-neutral-900 p-8 rounded-lg w-96">
              <h2 className="text-2xl font-extrabold text-green-400">Appointment Details</h2>
              <p className="text-white">Name: {selectedAppointment.name}</p>
              <p className="text-white">Service: {selectedAppointment.service}</p>
              <p className="text-white">Date: {selectedAppointment.date}</p>
              <p className="text-white">Progress: {selectedAppointment.status}</p>
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
