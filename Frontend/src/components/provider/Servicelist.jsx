import React, { useState, useEffect } from "react";
import ServiceModal from "./Addservice";
import DeleteConfirmation from "./DeleteConfirm";

const ServiceList = () => {
  const [services, setServices] = useState([]);

  const [selectedService, setSelectedService] = useState(null); // For editing
  const [showModal, setShowModal] = useState(false);
  const [showDeletePrompt, setShowDeletePrompt] = useState(false);
  const [deleteServiceId, setDeleteServiceId] = useState(null);

  // Handle adding or updating a service
  const handleSaveService = (newService) => {
    if (selectedService) {
      setServices((prev) =>
        prev.map((service) => (service.id === selectedService.id ? newService : service))
      );
    } else {
      setServices((prev) => [...prev, { ...newService, id: Date.now() }]);
    }
    setShowModal(false);
    setSelectedService(null);
  };

  const fetchServices = async () => {
    try {
      const response = await fetch("http://localhost:3000/services");
      const data = await response.json();
      setServices(data);
    } catch (err) {
      console.error("Error fetching services:", err);
    }
  };

  // Handle delete
  const confirmDelete = async (id) => {
    try{
      const response = await fetch(`http://localhost:3000/services`, {
        id: id,
      });
      if(response.ok){
        setShowDeletePrompt(false);
        setDeleteServiceId(null);
      }
    } catch(error){
      console.error("Error deleting service:", error);
    }
  };

  const cancelDelete = () => {
    setShowDeletePrompt(false);
    setDeleteServiceId(null);
  };

  // Dynamically add FontAwesome CDN link to the document head
  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css";
    link.integrity = "sha384-2nmw+gkH7o7pK1CBhA3FThQxO+8Z5fFlW6UOcegk0kEKrjA4NJkfk1W+tTzYibc0";
    link.crossOrigin = "anonymous";
    document.head.appendChild(link);

    // Cleanup the link on component unmount
    return () => {
      document.head.removeChild(link);
    };

    fetchServices();
  }, []);

  return (
    <div className="absolute top-0 left-0 w-full h-screen bg-[radial-gradient(125%_125%_at_50%_10%,#000_50%,#32cd32_100%)] flex flex-col items-center justify-center p-8">
      <div className="bg-neutral-900 text-white w-full max-w-4xl p-8 rounded-2xl shadow-2xl">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-extrabold text-green-400">Service List</h1>
          <button
            className="px-4 py-2 bg-green-500 rounded-lg text-black font-bold hover:bg-green-400 transition duration-300"
            onClick={() => setShowModal(true)}
          >
         <i class="fa-solid fa-plus text-white"></i>
          </button>
        </div>

        {/* Service List */}
        <table className="w-full border border-neutral-800 rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-neutral-800">
              <th className="py-3 px-4 text-left text-green-400 font-semibold">Name</th>
              <th className="py-3 px-4 text-left text-green-400 font-semibold">Description</th>
              <th className="py-3 px-4 text-left text-green-400 font-semibold">Price</th>
              <th className="py-3 px-4 text-center text-green-400 font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {services.map((service) => (
              <tr key={service.id} className="border-t border-neutral-800">
                <td className="py-3 px-4 text-white">{service.name}</td>
                <td className="py-3 px-4 text-white">{service.description}</td>
                <td className="py-3 px-4 text-white">${service.price.toFixed(2)}</td>
                <td className="py-3 px-4 text-center">
                  <button
                    className="px-3 py-1 bg-blue-500 text-black rounded hover:bg-blue-400 transition duration-200 mr-2"
                    onClick={() => {
                      setSelectedService(service);
                      setShowModal(true);
                    }}
                  >
                  <i class="fa-solid fa-pen text-yellow-400"></i>
                  </button>
                  <button
                    className="px-3 py-1 bg-red-500 text-black rounded hover:bg-red-400 transition duration-200"
                    onClick={() => {
                      setDeleteServiceId(service.id);
                      setShowDeletePrompt(true);
                    }}
                  >
                    <i class="fa-solid fa-trash text-black"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Add/Edit Service Modal */}
        {showModal && (
          <ServiceModal
            service={selectedService}
            onClose={() => setShowModal(false)}
            onSave={handleSaveService}
          />
        )}

        {/* Delete Confirmation Prompt - Sticky to the service list */}
        {showDeletePrompt && (
          <DeleteConfirmation
            onConfirm={confirmDelete}
            onCancel={cancelDelete}
          />
        )}
      </div>
    </div>
  );
};

export default ServiceList;
