import React, { useState } from 'react';

const Profile = () => {
  const [userDetails, setUserDetails] = useState({
    email: 'johndoe@example.com',
    username: 'johndoe',
    name: 'John Doe',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleSave = () => {
    console.log('Updated Details:', userDetails);
    alert('Profile updated successfully!');
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-6">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Edit Profile</h1>
        <form className="space-y-4">
          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-600">Email</label>
            <input
              type="email"
              name="email"
              value={userDetails.email}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Username */}
          <div>
            <label className="block text-sm font-medium text-gray-600">Username</label>
            <input
              type="text"
              name="username"
              value={userDetails.username}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-600">Name</label>
            <input
              type="text"
              name="name"
              value={userDetails.name}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-600">Password</label>
            <input
              type="password"
              name="password"
              value={userDetails.password}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
            />
            <small className="text-sm text-gray-500">Leave blank to keep your current password.</small>
          </div>

          {/* Save Button */}
          <div className="flex justify-end">
            <button
              type="button"
              onClick={handleSave}
              className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition"
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
