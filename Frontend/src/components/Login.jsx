import React, { useState } from 'react';
import axios from 'axios'; // Import axios

const Landing = () => {
  const [role, setRole] = useState('');
  const [form, setForm] = useState({ username: '', password: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(form)
      console.log(role)
      let response;
      if (role === 'user') {
        response = await axios.post('http://localhost:3000/user-login', form);
      } else if (role === 'provider') {
        response = await axios.post('http://localhost:3000/provider-login', form);
      }

      if (response.status === 200) {
        alert('Login successful');
      } else {
        alert('Invalid credentials');
      }
    } catch (error) {
      console.error('Error logging in user:', error);
    }
  };

  const handleInputChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div>
      <form className='flex flex-col gap-3'>
        <div>
          <label>Username</label>
          <input
            type="text"
            className='border-2 p-1 ml-3 rounded-md'
            name='username'
            value={form.username}
            onChange={handleInputChange} // Add this for username input change
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type="password" // Change to password input type for security
            className='border-2 p-1 ml-3 rounded-md'
            name='password'
            value={form.password}
            onChange={handleInputChange} // Add this for password input change
          />
        </div>
        <div>
          <label>Login as</label>
          <select
            className="border-2 p-1 ml-3 rounded-md"
            name="role"
            value={role}  // Bind the value to state
            onChange={(e) => setRole(e.target.value)} // Update the state on change
          >
            <option value="">Select Role</option> 
            <option value="user">User</option>
            <option value="provider">Provider</option>
          </select>
        </div>

        <button onClick={handleSubmit} className='bg-blue-500 text-white p-2 rounded-md'>
          Login
        </button>
      </form>
    </div>
  );
};

export default Landing;
