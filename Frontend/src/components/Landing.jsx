import React from 'react';

const Landing = () => {
  return (
    <div
      className="bg-black h-screen w-screen relative flex  items-center justify-center overflow-hidden"
    >
      {/* Navbar */}
      <nav className="absolute top-0 left-0 w-full py-4 flex justify-between items-center px-6">
        {/* Serviplex logo on the left */}
        <h1 className="text-white text-2xl font-extrabold">Serviplex</h1>

        {/* Buttons on the right */}
        <div className="space-x-4">
          <button className="bg-transparent text-white border border-white px-4 py-2 rounded-lg hover:bg-green-500 hover:text-black transition duration-300">
            Login
          </button>
          <button className="bg-transparent text-white border border-white px-4 py-2 rounded-lg hover:bg-green-500 hover:text-black transition duration-300">
            Sign In
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <div className="text-center mt-20">
        <h1 className="text-5xl font-extrabold text-white mb-6">
          Welcome to <span className="text-green-500">Serviplex</span>
        </h1>
        <p className="text-lg text-gray-300 mb-6">
          Your one-stop solution for all your service needs.
        </p>
        <button className="bg-green-500 text-black px-6 py-2 rounded-md text-base font-medium hover:bg-green-400 transition duration-300 shadow-md">
          Get Started
        </button>
      </div>
    </div>
  );
};

export default Landing;
