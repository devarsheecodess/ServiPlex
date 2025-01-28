import React, { useEffect, useState } from "react";
import axios from "axios";

const Profile = () => {
  const [id, setId] = useState(localStorage.getItem("userID"));
  const [userDetails, setUserDetails] = useState({
    email: "",
    username: "",
    name: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const populateUserDetails = async () => {
    try {
      console.log("Fetching user details for ID:", id);
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/profile`, { params: { id } });
      const user = response.data[0];
      setUserDetails({
        email: user.email,
        username: user.username,
        name: user.name,
        password: "",
      });
    } catch (error) {
      console.error('Error fetching user details:', error);
    }
  };

  useEffect(() => {
    populateUserDetails();
  }, []);

  const handleSave = async () => {
    try {
      console.log(userDetails);
      const response = await axios.put(`${import.meta.env.VITE_BACKEND_URL}/profile`, userDetails, { params: { id } });
      if (response.status === 200) {
        alert("Details updated successfully");
        window.location.reload();
      }
    } catch (error) {
      console.error('Error updating user details');
    }
  };

  return (
    <div className="absolute top-0 left-0 w-full min-h-screen bg-[radial-gradient(125%_125%_at_50%_10%,#000_50%,#32cd32_100%)] flex items-center justify-center p-6">
      <div className="bg-gray-900 bg-opacity-90 rounded-3xl shadow-[0_4px_30px_rgba(0,0,0,0.9)] p-10 w-full max-w-xl backdrop-blur-lg">
        <h1 className="text-4xl font-extrabold text-white mb-8 text-center">
          Edit <span className="text-green-600">Profile</span>
        </h1>
        <form className="space-y-6">
          {/* Email */}
          <div className="relative">
            <label className="block text-sm font-medium text-gray-300">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={userDetails.email}
              onChange={handleChange}
              className="mt-2 w-full p-4 bg-gray-800 border border-gray-700 rounded-xl focus:ring-2 focus:ring-neon-green focus:outline-none text-white transition"
            />
          </div>

          {/* Username */}
          <div className="relative">
            <label className="block text-sm font-medium text-gray-300">
              Username
            </label>
            <input
              type="text"
              name="username"
              value={userDetails.username}
              onChange={handleChange}
              className="mt-2 w-full p-4 bg-gray-800 border border-gray-700 rounded-xl focus:ring-2 focus:ring-neon-green focus:outline-none text-white transition"
            />
          </div>

          {/* Name */}
          <div className="relative">
            <label className="block text-sm font-medium text-gray-300">
              Name
            </label>
            <input
              type="text"
              name="name"
              value={userDetails.name}
              onChange={handleChange}
              className="mt-2 w-full p-4 bg-gray-800 border border-gray-700 rounded-xl focus:ring-2 focus:ring-neon-green focus:outline-none text-white transition"
            />
          </div>

          {/* Password */}
          <div className="relative">
            <label className="block text-sm font-medium text-gray-300">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={userDetails.password}
              onChange={handleChange}
              className="mt-2 w-full p-4 bg-gray-800 border border-gray-700 rounded-xl focus:ring-2 focus:ring-neon-green focus:outline-none text-white transition"
            />
            <small className="block mt-2 text-sm text-gray-400">
              Leave blank to keep your current password.
            </small>
          </div>

          {/* Save Button */}
          <div className="flex justify-center">
            <button
              type="button"
              onClick={handleSave}
              className="bg-green-600 text-white py-3 px-8 rounded-full shadow-lg hover:shadow-[0_0_20px_rgba(50,205,50,0.8)] transform transition-transform hover:scale-105"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Profile;
