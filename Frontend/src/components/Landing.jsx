import React from "react";
import { useNavigate } from "react-router-dom";

function Landing() {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <div>
      <button
        className="bg-transparent text-white border border-white px-4 py-2 rounded-lg hover:bg-green-500 hover:text-black transition duration-300"
        onClick={() => handleNavigation("/login")}
      >
        Login
      </button>
      <button
        className="bg-transparent text-white border border-white px-4 py-2 rounded-lg hover:bg-green-500 hover:text-black transition duration-300"
        onClick={() => handleNavigation("/signup")}
      >
        Sign In
      </button>
      {/* Main Content */}
      <div className="text-center mt-20">
        <h1 className="text-5xl font-extrabold text-white mb-6">
          Welcome to <span className="text-green-500">Serviplex</span>
        </h1>
        <p className="text-lg text-gray-300 mb-6">
          Your one-stop solution for all your service needs.
        </p>
        <button
          className="bg-green-500 text-black px-6 py-2 rounded-md text-base font-medium hover:bg-green-400 transition duration-300 shadow-md"
          onClick={() => handleNavigation("/signup")}
        >
          Get Started
        </button>
      </div>
    </div>
  );
}

export default Landing