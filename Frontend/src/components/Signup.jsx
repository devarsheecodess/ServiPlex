import React, { useState } from 'react';

const LoginPage = () => {
  const [activeTab, setActiveTab] = useState('user'); // Default tab: User

  return (
    <div className="bg-black h-screen w-full flex items-center justify-center px-6">
      {/* Card Container */}
      <div className="bg-gray-900 text-white w-full max-w-md p-8 rounded-xl shadow-lg">
        {/* Tabs */}
        <div className="flex justify-between mb-8 border-b border-gray-700 pb-4">
          <button
            aria-selected={activeTab === 'user'}
            className={`text-lg font-bold px-4 py-2 ${
              activeTab === 'user' ? 'text-green-500 border-b-2 border-green-500' : 'text-gray-300'
            }`}
            onClick={() => setActiveTab('user')}
          >
            User
          </button>
          <button
            aria-selected={activeTab === 'provider'}
            className={`text-lg font-bold px-4 py-2 ${
              activeTab === 'provider' ? 'text-green-500 border-b-2 border-green-500' : 'text-gray-300'
            }`}
            onClick={() => setActiveTab('provider')}
          >
            Service Provider
          </button>
        </div>

        {/* Form Section */}
        {activeTab === 'user' && (
          <form>
            <h2 className="text-2xl font-extrabold text-center mb-6">User Sign-In</h2>
            {/* Login Fields */}
            <div className="space-y-4">
              <input
                type="email"
                placeholder="Email"
                className="w-full bg-gray-800 text-white p-3 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
              />
              <input
                type="password"
                placeholder="Password"
                className="w-full bg-gray-800 text-white p-3 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
              />
              <button
                type="submit"
                className="w-full bg-green-500 text-black p-3 rounded-lg font-semibold hover:bg-green-400 transition duration-300"
              >
                Sign In
              </button>
            </div>
          </form>
        )}

        {activeTab === 'provider' && (
          <form>
            <h2 className="text-2xl font-extrabold text-center mb-6">Service Provider Sign-In</h2>
            {/* Login Fields */}
            <div className="space-y-4">
              <input
                type="email"
                placeholder="Email"
                className="w-full bg-gray-800 text-white p-3 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
              />
              <input
                type="password"
                placeholder="Password"
                className="w-full bg-gray-800 text-white p-3 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
              />
              <button
                type="submit"
                className="w-full bg-green-500 text-black p-3 rounded-lg font-semibold hover:bg-green-400 transition duration-300"
              >
                Sign In
              </button>
            </div>
          </form>
        )}

        {/* Google Sign-in */}
        <div className="mt-6 flex justify-center items-center space-x-4">
          <button
            className="w-full flex items-center justify-center bg-blue-500 text-white p-3 rounded-lg font-semibold hover:bg-blue-400 transition duration-300"
            onClick={() => console.log('Google Sign-in')}
          >
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/5/51/Google.png"
              alt="Google"
              className="w-6 h-6 mr-3" // Adjust the size of the logo
            />
            Sign in with Google
          </button>
        </div>

        {/* Sign-up Prompt */}
        <div className="mt-6 text-center text-gray-400">
          {activeTab === 'user' ? (
            <p>
              Don't have an account?{' '}
              <span
                className="text-green-500 cursor-pointer"
                onClick={() => setActiveTab('user')}
              >
                Register
              </span>
            </p>
          ) : (
            <p>
               Don't have an account?{' '}
              <span
                className="text-green-500 cursor-pointer"
                onClick={() => setActiveTab('provider')}
              >
                Register
              </span>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
