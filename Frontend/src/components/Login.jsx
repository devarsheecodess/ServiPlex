import React, { useState } from 'react';
import axios from 'axios'; // Import axios

const Login = () => {
  const [role, setRole] = useState('');
  const [form, setForm] = useState({ username: '', password: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let response1, response2;
      if (role === 'user') {
        response1 = await axios.post('http://localhost:3000/user-login', form);
      } else if (role === 'provider') {
        response2 = await axios.post('http://localhost:3000/provider-login', form);
      }
  
      if (response1 && response1.status === 200) {
        alert('Login successful');
        window.location.href = '/user-home';
      } else if (response2 && response2.status === 200) {
        alert('Login successful');
        window.location.href = '/provider-home';
      } else {
        alert('Invalid credentials');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred during login');
    }
  };
  

  const handleInputChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="bg-black h-screen w-full flex items-center justify-center px-6">
      <div className="bg-gray-900 text-white w-full max-w-md p-8 rounded-xl shadow-lg">
        {/* Tabs */}
        <div className="flex justify-between mb-8 border-b border-gray-700 pb-4">
          <button
            className="text-lg font-bold px-4 py-2 text-green-500 border-b-2 border-green-500"
          >
            Login
          </button>
        </div>

        {/* Form Section */}
        <form onSubmit={handleSubmit} className='flex flex-col gap-3'>
          <h2 className="text-2xl font-extrabold text-center mb-6">Login</h2>
          <div>
            <label>Username</label>
            <input
              type="text"
              className='border-2 p-1 ml-3 rounded-md'
              name='username'
              value={form.username}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label>Password</label>
            <input
              type="password"
              className='border-2 p-1 ml-3 rounded-md'
              name='password'
              value={form.password}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label>Login as</label>
            <select
              className="border-2 p-1 ml-3 rounded-md"
              name="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="" className='text-black'>Select Role</option> 
              <option value="user" className='text-black'>User</option>
              <option value="provider" className='text-black'>Provider</option>
            </select>
          </div>

          <button type="submit" className='bg-blue-500 text-white p-2 rounded-md'>
            Login
          </button>
        </form>

        {/* Google Sign-up (Optional for Login) */}
        <div className="mt-6 flex justify-center items-center space-x-4">
          <button
            className="w-full flex items-center justify-center bg-blue-500 text-white p-3 rounded-lg font-semibold hover:bg-blue-400 transition duration-300"
            onClick={() => console.log('Google Login')}
          >
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/5/51/Google.png"
              alt="Google"
              className="w-6 h-6 mr-3" // Adjust the size of the logo
            />
            Sign in with Google
          </button>
        </div>

        {/* Sign-In Prompt */}
        <div className="mt-6 text-center text-gray-400">
          <p>Don't have an account? 
            <span 
              className="text-green-500 cursor-pointer" 
              onClick={() => window.location.href = '/signup'}
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
