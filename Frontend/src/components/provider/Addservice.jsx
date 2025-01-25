import axios from "axios";
import React, { useState } from "react";

const ServiceModal = ({ service, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    offers: "",
    image: null,
    providerID: localStorage.getItem("providerID") || "",
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setFormData((prev) => ({ ...prev, image: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create a new FormData object
    const formDataToSend = new FormData();
    
    // Append each field to the FormData object
    formDataToSend.append("name", formData.name);
    formDataToSend.append("description", formData.description);
    formDataToSend.append("price", formData.price);
    formDataToSend.append("offers", formData.offers);
    
    // Only append image if it exists
    if (formData.image) {
      formDataToSend.append("image", formData.image);
    }
    
    formDataToSend.append("providerID", formData.providerID);

    try {
      const response = await axios.post(
        "http://localhost:3000/services",
        formDataToSend,
        {
          headers: {
            'Content-Type': 'multipart/form-data', // Important for file uploads
          },
        }
      );

      if (response.status === 201) {
        alert("Service added successfully!");
        console.log("Response:", response.data);
        onSave(); // Call onSave to refresh or update parent state if needed
      }
    } catch (error) {
      console.error("Error adding service:", error);
      alert("Failed to add service. Please try again.");
    }
  };

  return (
    <div className="absolute top-0 left-0 w-full min-h-screen bg-[radial-gradient(125%_125%_at_50%_10%,#000_50%,#32cd32_100%)] flex items-center justify-center p-8">
      <div className="backdrop-blur-xl bg-[rgba(0,0,0,0.6)] border-4 border-blue-500 p-6 rounded-2xl w-96 shadow-[0_0_15px_5px_rgba(50,205,50,0.6)]">
        <h2 className="text-3xl font-extrabold text-blue-400 mb-6 text-center tracking-widest">
          {service ? "EDIT SERVICE" : "ADD SERVICE"}
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-semibold text-white mb-1">
              Service Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full p-3 bg-[rgba(255,255,255,0.1)] text-white border border-blue-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 hover:scale-105 transition-transform"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-semibold text-white mb-1">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              className="w-full p-3 bg-[rgba(255,255,255,0.1)] text-white border border-blue-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 hover:scale-105 transition-transform"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-semibold text-white mb-1">
              Price
            </label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              required
              className="w-full p-3 bg-[rgba(255,255,255,0.1)] text-white border border-blue-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 hover:scale-105 transition-transform"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-semibold text-white mb-1">
              Offers
            </label>
            <input
              type="text"
              name="offers"
              value={formData.offers}
              onChange={handleChange}
              required
              className="w-full p-3 bg-[rgba(255,255,255,0.1)] text-white border border-blue-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 hover:scale-105 transition-transform"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-semibold text-white mb-1">
              Image
            </label>
            <input
              type="file"
              name="image"
              onChange={handleChange}
              className="w-full p-3 bg-[rgba(255,255,255,0.1)] text-white border border-blue-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 hover:scale-105 transition-transform"
            />
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              className="px-4 py-2 bg-red-700 text-white border border-gray-500 rounded-lg hover:bg-gray-700 hover:border-gray-300 transition-transform hover:scale-110 duration-300 mr-2 shadow-md"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-black font-bold rounded-lg hover:bg-blue-400 hover:scale-110 transition-transform duration-300 shadow-[0_0_10px_2px_rgba(50,205,50,0.8)]"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ServiceModal;
