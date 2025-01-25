import React, { useState } from "react";
import ServiceModal from "./Addservice";
import DeleteConfirmation from "./DeleteConfirm";

const ServiceList = () => {
  const [services, setServices] = useState([
    { id: 1, name: "Pipe Repair", description: "Fix broken pipes", price: 200 },
    { id: 2, name: "Electrical Wiring", description: "Install new wiring", price: 500 },
  ]);

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

  // Handle delete
  const confirmDelete = () => {
    setServices((prev) => prev.filter((service) => service.id !== deleteServiceId));
    setShowDeletePrompt(false);
    setDeleteServiceId(null);
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold">Service List</h1>
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          onClick={() => setShowModal(true)}
        >
          Add Service
        </button>
      </div>

      {/* Service List */}
      <table className="w-full border border-gray-200">
        <thead>
          <tr className="bg-gray-100">
            <th className="py-2 px-4 text-left">Name</th>
            <th className="py-2 px-4 text-left">Description</th>
            <th className="py-2 px-4 text-left">Price</th>
            <th className="py-2 px-4 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {services.map((service) => (
            <tr key={service.id} className="border-t">
              <td className="py-2 px-4">{service.name}</td>
              <td className="py-2 px-4">{service.description}</td>
              <td className="py-2 px-4">${service.price.toFixed(2)}</td>
              <td className="py-2 px-4 text-center">
                <button
                  className="px-2 py-1 bg-green-500 text-white rounded hover:bg-green-600 mr-2"
                  onClick={() => {
                    setSelectedService(service);
                    setShowModal(true);
                  }}
                >
                  Edit
                </button>
                <button
                  className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                  onClick={() => {
                    setDeleteServiceId(service.id);
                    setShowDeletePrompt(true);
                  }}
                >
                  Delete
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

      {/* Delete Confirmation Prompt */}
      {showDeletePrompt && (
        <DeleteConfirmation
          onConfirm={confirmDelete}
          onCancel={() => setShowDeletePrompt(false)}
        />
      )}
    </div>
  );
};

export default ServiceList;
