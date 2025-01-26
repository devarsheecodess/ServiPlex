import React, { useState, useEffect } from "react";
import axios from "axios";

const Appointment = () => {
  const [appointments, setAppointments] = useState([]);
  const [showStatusPopup, setShowStatusPopup] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [newAppointment, setNewAppointment] = useState({
    serviceId: "",
    customerId: "",
    date: "",
    status: "pending",
  });
  const [paymentStatus, setPaymentStatus] = useState("after");
  const [providerId, setProviderId] = useState(localStorage.getItem("providerID"));

  // Fetch appointments from backend
  const fetchAppointments = async () => {
    try {
      const response = await axios.get("http://localhost:3000/appointments", { params: { providerId, status: ["pending", "in-progress"] } });
      setAppointments(response.data);
    } catch (error) {
      console.error("Error fetching appointments:", error);
    }
  }

  useEffect(() => {
    fetchAppointments();
  }, []);

  // Handle accepting the appointment
  const handleAccept = (appointment) => {
    const updatedAppointment = { ...appointment, status: "Accepted" };

    fetch(`http://localhost:3000/appointments/${appointment._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedAppointment),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to accept appointment");
        }
        return response.json();
      })
      .then(() => {
        setAppointments((prev) =>
          prev.map((app) => (app._id === appointment._id ? updatedAppointment : app))
        );
        window.location.reload();
      })
      .catch((error) => console.error("Error updating appointment:", error));
  };

  // Handle declining the appointment
  const handleDecline = (appointment) => {
    const updatedAppointment = { ...appointment, status: "Declined" };

    fetch(`http://localhost:3000/appointments/${appointment._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedAppointment),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to decline appointment");
        }
        return response.json();
      })
      .then(() => {
        setAppointments((prev) =>
          prev.map((app) => (app._id === appointment._id ? updatedAppointment : app))
        );
        window.location.reload();
      })
      .catch((error) => console.error("Error updating appointment:", error));
  };


  // Update the progress of the appointment
  const handleUpdateStatus = (appointment) => {
    fetch(`http://localhost:3000/appointments/${appointment._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status: appointment.status }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to update appointment status");
        }
        return response.json();
      })
      .then((updatedAppointment) => {
        setAppointments((prev) =>
          prev.map((app) =>
            app._id === updatedAppointment._id ? updatedAppointment : app
          )
        );
        setShowStatusPopup(false);
        window.location.reload();
      })
      .catch((error) =>
        console.error("Error updating appointment status:", error)
      );
  };


  // Update payment status
  const handleUpdatePaymentStatus = (appointment) => {
    const updatedAppointment = { ...appointment, paymentStatus };
    fetch(`http://localhost:3000/appointments/${appointment._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedAppointment),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to update payment status");
        }
        return response.json();
      })
      .then(() => {
        setAppointments((prev) =>
          prev.map((app) => (app._id === appointment._id ? updatedAppointment : app))
        );
        setShowPopup(false);
        window.location.reload();
      })
      .catch((error) => console.error("Error updating payment status:", error));
  };

  // Add a new appointment

  return (
    <div className="absolute top-0 left-0 w-full h-screen bg-[radial-gradient(125%_125%_at_50%_10%,#000_50%,#32cd32_100%)] flex flex-col items-center justify-center p-8">
      <div className="bg-neutral-900 text-white w-full max-w-4xl p-8 rounded-2xl shadow-2xl">
        <h1 className="text-2xl font-extrabold text-green-400 mb-6">Appointments</h1>

        {/* Add New Appointment Form */}


        {/* Appointment List */}
        <div className="space-y-4 mt-6">
          {appointments.length === 0 ? (
            <p className="text-white">No appointments available</p>
          ) : (
            appointments.map((appointment) => (
              <div
                key={appointment._id}
                className="bg-neutral-800 p-4 rounded-lg"
              >
                <h2 className="text-green-400">
                  Customer Name: {appointment.customerName}
                </h2>
                <p className="text-white">Date: {appointment.date.slice(0, 10)}</p>
                <p className="text-white">Status: {appointment.status}</p>
                <p className="text-white">Payment Status: {appointment.paymentStatus || "N/A"}</p>

                <div className="flex gap-2 mt-2">
                  {/* Accept Button */}
                  <button
                    className="px-4 py-2 bg-green-500 text-white rounded-lg"
                    onClick={() => handleAccept(appointment)}
                  >
                    Accept
                  </button>

                  {/* Decline Button */}
                  <button
                    className="px-4 py-2 bg-red-500 rounded-lg border-2 border-red-500 transition hover:border-red-300 hover:shadow-md hover:shadow-red-500/50"
                    onClick={() => handleDecline(appointment)}
                  >
                    <i className="fa-solid fa-x text-black text-2xl font-extrabold"></i>
                  </button>

                </div>

                <div className="flex gap-2 mt-2">

                  {/* Update Status Button */}
                  <button
                    className="px-4 py-2 bg-purple-500 text-black rounded-lg"
                    onClick={() => {
                      setSelectedAppointment(appointment);
                      setShowStatusPopup(true);
                    }}
                  >
                    Update Status
                  </button>


                  {/* Update Payment Status Button */}
                  <button
                    className="px-4 py-2 bg-yellow-500 text-black rounded-lg"
                    onClick={() => {
                      setSelectedAppointment(appointment);
                      setShowPopup(true);
                    }}
                  >
                    Update Payment Status
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Update Payment Status Popup */}
        {showPopup && selectedAppointment && (
          <div className="fixed top-0 left-0 w-full h-full bg-gray-500 bg-opacity-50 flex items-center justify-center">
            <div className="bg-neutral-900 p-8 rounded-lg w-96">
              <h2 className="text-2xl font-extrabold text-green-400 mb-4">
                Update Payment Status
              </h2>
              <p className="text-white mb-4">
                Update the payment status for the appointment with Service ID:{" "}
                <span className="text-green-300 font-bold">
                  {selectedAppointment.serviceId}
                </span>
              </p>
              <div className="flex flex-col gap-4">
                <select
                  className="p-2 rounded-lg bg-neutral-800 text-white"
                  value={paymentStatus}
                  onChange={(e) => setPaymentStatus(e.target.value)}
                >
                  <option value="before">Pay Before</option>
                  <option value="after">Pay After</option>
                </select>
                <div className="flex justify-between">
                  <button
                    className="px-4 py-2 bg-green-500 text-black rounded-lg"
                    onClick={() => handleUpdatePaymentStatus(selectedAppointment)}
                  >
                    Update
                  </button>
                  <button
                    className="px-4 py-2 bg-red-500 text-white rounded-lg"
                    onClick={() => setShowPopup(false)}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
        {/* Update Status Popup */}
        {showStatusPopup && selectedAppointment && (
          <div className="fixed top-0 left-0 w-full h-full bg-gray-500 bg-opacity-50 flex items-center justify-center">
            <div className="bg-neutral-900 p-8 rounded-lg w-96">
              <h2 className="text-2xl font-extrabold text-green-400 mb-4">
                Update Appointment Status
              </h2>
              <p className="text-white mb-4">
                Update the status for the appointment with Service ID:{" "}
                <span className="text-green-300 font-bold">
                  {selectedAppointment.serviceId}
                </span>
              </p>
              <div className="flex flex-col gap-4">
                <select
                  className="p-2 rounded-lg bg-neutral-800 text-white"
                  value={selectedAppointment.status}
                  onChange={(e) =>
                    setSelectedAppointment({
                      ...selectedAppointment,
                      status: e.target.value,
                    })
                  }
                >
                  <option value="pending">Pending</option>
                  <option value="accepted">Accepted</option>
                  <option value="in-progress">In Progress</option>
                  <option value="completed">Completed</option>
                </select>
                <div className="flex justify-between">
                  <button
                    className="px-4 py-2 bg-green-500 text-black rounded-lg"
                    onClick={() => handleUpdateStatus(selectedAppointment)}
                  >
                    Update
                  </button>
                  <button
                    className="px-4 py-2 bg-red-500 text-white rounded-lg"
                    onClick={() => setShowStatusPopup(false)}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default Appointment;