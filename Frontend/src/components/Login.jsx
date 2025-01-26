import React, { useState } from "react";
import axios from "axios";

const Login = () => {
  const [role, setRole] = useState("");
  const [form, setForm] = useState({ username: "", password: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let response1, response2;
      if (role === "user") {
        response1 = await axios.post("http://localhost:3000/user-login", form);
      } else if (role === "provider") {
        response2 = await axios.post(
          "http://localhost:3000/provider-login",
          form
        );
      }

      if (response1 && response1.status === 200) {
        localStorage.setItem("userID", response1.data.id);
        localStorage.setItem("name", response1.data.name);
        alert("Login successful");
        window.location.href = "/user-home";
      } else if (response2 && response2.status === 200) {
        alert("Login successful");
        localStorage.setItem("provider", response2.data.shop);
        localStorage.setItem("providerID", response2.data.id);
        window.location.href = "/provider-home";
      } else {
        alert("Invalid credentials");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred during login");
    }
  };

  const handleInputChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="absolute top-0 left-0 -z-20 w-full min-h-screen bg-[radial-gradient(125%_125%_at_50%_10%,#000_50%,#32cd32_100%)] flex flex-col items-center justify-center p-4">
      <div className="bg-neutral-900 text-white w-full max-w-md p-8 rounded-2xl shadow-2xl">
        {/* Login Heading */}
        <h2 className="text-3xl font-extrabold text-center mb-6">Login</h2>

        {/* Form Section */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div>
            <label className="block text-sm font-semibold mb-1">Username</label>
            <input
              type="text"
              className="w-full p-3 bg-neutral-800 rounded-lg focus:ring-2 focus:ring-green-400 text-white outline-none"
              name="username"
              value={form.username}
              onChange={handleInputChange}
              placeholder="Enter your username"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1">Password</label>
            <input
              type="password"
              className="w-full p-3 bg-neutral-800 rounded-lg focus:ring-2 focus:ring-green-400 text-white outline-none"
              name="password"
              value={form.password}
              onChange={handleInputChange}
              placeholder="Enter your password"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1">Login as</label>
            <select
              className="w-full p-3 bg-neutral-800 rounded-lg focus:ring-2 focus:ring-green-400 text-white outline-none"
              name="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="" className="text-blue-600">
                Select Role
              </option>
              <option value="user" className="text-blue-600">
                User
              </option>
              <option value="provider" className="text-blue-600">
                Provider
              </option>
            </select>
          </div>
          <button
            type="submit"
            className="w-full p-3 bg-green-500 rounded-lg text-black font-bold hover:bg-green-400 transition duration-300"
          >
            Login
          </button>
        </form>

        {/* Google Sign-in */}
        <div className="mt-6 flex justify-center items-center space-x-4">
          <button
            className="flex items-center justify-center w-full border rounded-lg px-4 py-2 hover:bg-gray-100 transition duration-200 text font-semibold text-blue-600 hover:text-black"
            onClick={() => console.log("Google Login")}
          >
           <i className="fa-brands fa-google mr-2 text-yellow-600 font-semibold hover:text-black"></i>
            Sign in with Google
          </button>
        </div>

        {/* Sign-Up Prompt */}
        <div className="mt-6 text-center text-neutral-400">
          <p>
            Don't have an account?{" "}
            <span
              className="text-green-400 cursor-pointer hover:underline"
              onClick={() => (window.location.href = "/signup")}
            >
              Sign Up
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
