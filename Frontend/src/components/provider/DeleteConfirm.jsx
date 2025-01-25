import React from "react";

const DeleteConfirmation = ({ onConfirm, onCancel }) => {
  return (
    <div className="absolute top-0 left-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-black border-2 border-red-500 p-6 rounded-md shadow-lg w-80">
        <h2 className="text-xl font-bold text-red-500 mb-4 text-center">
          Confirm Deletion
        </h2>
        <p className="text-red-500 text-center mb-6">
          Are you sure you want to delete this service?
        </p>
        <div className="flex justify-between">
          <button
            className="px-4 py-2 bg-gray-800 text-red-500 font-bold rounded hover:bg-gray-700 transition"
            onClick={onCancel}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-red-500 text-black font-bold rounded hover:bg-red-400 transition"
            onClick={onConfirm}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmation;
