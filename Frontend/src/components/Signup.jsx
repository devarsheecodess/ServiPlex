import React, { useState } from "react";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

const UserForm = () => {
  const [form, setForm] = useState({ id: uuidv4(), name: "", username: "", email: "", password: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(form);
      const response = await axios.post("http://localhost:3000/user-signup", form);
      console.log(response);
      if (response.status === 201) {
        alert("User registered successfully!");
        setForm({ id: uuidv4(), name: "", username: "", email: "", password: "" });
      }
    } catch (error) {
      console.error(error);
      alert("Error submitting the form.");
    }
  };

  return (
    <form className="flex flex-col gap-5 bg-gray-900 p-6 rounded-lg shadow-md text-white">
      <h2 className="text-2xl font-bold text-green-400 mb-4">User Sign-Up</h2>
      <div>
        <label className="block mb-1">Name</label>
        <input
          type="text"
          onChange={handleChange}
          className="w-full bg-gray-800 text-white p-3 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
          name="name"
          required
        />
      </div>
      <div>
        <label className="block mb-1">Username</label>
        <input
          type="text"
          onChange={handleChange}
          className="w-full bg-gray-800 text-white p-3 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
          name="username"
          required
        />
      </div>
      <div>
        <label className="block mb-1">Email</label>
        <input
          type="email"
          onChange={handleChange}
          className="w-full bg-gray-800 text-white p-3 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
          name="email"
          required
        />
      </div>
      <div>
        <label className="block mb-1">Password</label>
        <input
          type="password"
          onChange={handleChange}
          className="w-full bg-gray-800 text-white p-3 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
          name="password"
          required
        />
      </div>
      <button
        type="submit"
        onClick={handleSubmit}
        className="w-full bg-green-500 text-black p-3 rounded-lg font-semibold hover:bg-green-400 transition duration-300"
      >
        Submit
      </button>
    </form>
  );
};

const ProviderForm = () => {
  const [form, setForm] = useState({
    id: uuidv4(),
    username: "",
    email: "",
    password: "",
    owner: "",
    profession: "",
    shop: "",
    phone: "",
    address: "",
    logo: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(form);
      const response = await axios.post("http://localhost:3000/provider-signup", form);
      if (response.status === 201) {
        alert("Provider registered successfully!");
        setForm({
          id: uuidv4(),
          username: "",
          email: "",
          password: "",
          owner: "",
          profession: "",
          shop: "",
          phone: "",
          address: "",
          logo: null,
        });
      }
    } catch (error) {
      console.error(error);
      alert("Error submitting the form.");
    }
  };

  return (
    <form className="flex flex-col gap-5 bg-gray-900 p-6 rounded-lg shadow-md text-white" method="POST">
      <h2 className="text-2xl font-bold text-blue-400 mb-4">Service Provider Sign-Up</h2>
      <div>
        <label className="block mb-1">Email</label>
        <input
          type="email"
          className="w-full bg-gray-800 text-white p-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          name="email"
          value={form.email}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label className="block mb-1">Username</label>
        <input
          type="text"
          className="w-full bg-gray-800 text-white p-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          name="username"
          value={form.username}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label className="block mb-1">Owner Name</label>
        <input
          type="text"
          className="w-full bg-gray-800 text-white p-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          name="owner"
          value={form.owner}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label className="block mb-1">Profession</label>
        <input
          type="text"
          className="w-full bg-gray-800 text-white p-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          name="profession"
          value={form.profession}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label className="block mb-1">Shop Name</label>
        <input
          type="text"
          className="w-full bg-gray-800 text-white p-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          name="shop"
          value={form.shop}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label className="block mb-1">Phone Number</label>
        <input
          type="tel"
          className="w-full bg-gray-800 text-white p-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          name="phone"
          value={form.phone}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label className="block mb-1">Address</label>
        <input
          type="text"
          className="w-full bg-gray-800 text-white p-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          name="address"
          value={form.address}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label className="block mb-1">Password</label>
        <input
          type="password"
          className="w-full bg-gray-800 text-white p-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          name="password"
          value={form.password}
          onChange={handleChange}
          required
        />
      </div>
      <button
        type="submit"
        onClick={handleSubmit}
        className="w-full bg-blue-500 text-black p-3 rounded-lg font-semibold hover:bg-blue-400 transition duration-300"
      >
        Submit
      </button>
    </form>
  );
};

const Landing = () => {
  const [role, setRole] = useState("User");

  return (
    <div className="absolute top-0 left-0 -z-20 w-full min-h-screen bg-[radial-gradient(125%_125%_at_50%_10%,#000_50%,#32cd32_100%)] flex flex-col items-center p-4">
      <div></div>
      <div className="bg-gray-800 p-8 rounded-xl shadow-md w-full max-w-lg">
        <div className="mb-6">
          <label className="block mb-2 text-lg font-bold text-green-400">Sign-Up Role</label>
          <select
            className="w-full bg-gray-700 p-3 rounded-lg text-white focus:ring-2 focus:ring-green-500 outline-none"
            name="role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="User">User</option>
            <option value="Provider">Service Provider</option>
          </select>
        </div>
        {role === "User" ? <UserForm /> : <ProviderForm />}
      </div>
    </div>
  );
};

export default Landing;
