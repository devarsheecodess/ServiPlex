import React, { useState, useEffect } from "react";
import axios from "axios";

const ProviderPaymentSetup = () => {
  const [formData, setFormData] = useState({
    providerId: "",
    upiId: "",
    bankAccountNumber: "",
    ifscCode: "",
    accountHolderName: "",
  });

  const [responseMessage, setResponseMessage] = useState("");

  useEffect(() => {
    const providerId = localStorage.getItem("providerID");
    if (providerId) {
      setFormData((prevData) => ({ ...prevData, providerId }));
    } else {
      setResponseMessage("Provider ID not found. Please log in again.");
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting form data:", formData); // Log form data for debugging
    try {
      const response = await axios.post("http://localhost:3000/providerPay", formData);
      setResponseMessage(response.data.message);
      setFormData({
        providerId: formData.providerId,
        upiId: "",
        bankAccountNumber: "",
        ifscCode: "",
        accountHolderName: "",
      });
    } catch (error) {
      console.error("Error submitting form:", error); // Log error for debugging
      console.log("Error response data:", error.response?.data); // Log error response data for debugging
      setResponseMessage(
        error.response?.data?.message || "Something went wrong, please try again."
      );
    }
  };

  return (
    <div className="absolute top-0 left-0 w-full h-screen bg-[radial-gradient(125%_125%_at_50%_10%,#000_50%,#32cd32_100%)] flex flex-col items-center justify-center p-8">
      <div className="bg-neutral-900 text-white w-full max-w-4xl p-8 rounded-2xl shadow-2xl">
        <h2 className="text-2xl font-extrabold text-green-400 mb-6">Payment Setup</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="providerId" className="block text-sm font-medium text-gray-700">
              Provider ID
            </label>
            <input
              type="text"
              name="providerId"
              id="providerId"
              value={formData.providerId}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          <div>
            <label htmlFor="upiId" className="block text-sm font-medium text-gray-700">
              UPI ID
            </label>
            <input
              type="text"
              name="upiId"
              id="upiId"
              value={formData.upiId}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          <div>
            <label
              htmlFor="bankAccountNumber"
              className="block text-sm font-medium text-gray-700"
            >
              Bank Account Number
            </label>
            <input
              type="text"
              name="bankAccountNumber"
              id="bankAccountNumber"
              value={formData.bankAccountNumber}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          <div>
            <label htmlFor="ifscCode" className="block text-sm font-medium text-gray-700">
              IFSC Code
            </label>
            <input
              type="text"
              name="ifscCode"
              id="ifscCode"
              value={formData.ifscCode}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          <div>
            <label
              htmlFor="accountHolderName"
              className="block text-sm font-medium text-gray-700"
            >
              Account Holder Name
            </label>
            <input
              type="text"
              name="accountHolderName"
              id="accountHolderName"
              value={formData.accountHolderName}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
          >
            Save Payment Details
          </button>
        </form>

        {responseMessage && (
          <p className="mt-4 text-center text-sm text-gray-700">{responseMessage}</p>
        )}
      </div>
    </div>
  );
};

export default ProviderPaymentSetup;
