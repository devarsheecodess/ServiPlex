import React, { useState } from 'react';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

const UserForm = () => {
  const [role, setRole] = useState('User');
  const [form, setForm] = useState({id: uuidv4(), name: '', username: '', email: '', password: ''});
  
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    try{
      console.log(form)
      const response = axios.post('http://localhost:3000/user-signup', form)

      console.log(response)
      if (response.status === 200) {
        alert("User registered successfully!");
        setForm({id: uuidv4(), name: '', username: '', email: '', password: ''});
      }
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <form className="flex flex-col gap-3">
      <div>
        <label>Name</label>
        <input type="name" onChange={handleChange} className="border-2 p-1 ml-3 rounded-md" name="name" required />
      </div>
      <div>
        <label>Username</label>
        <input type="text" onChange={handleChange} className="border-2 p-1 ml-3 rounded-md" name="username" required />
      </div>
      <div>
        <label>Email</label>
        <input type="email" onChange={handleChange} className="border-2 p-1 ml-3 rounded-md" name="email" required />
      </div>
      <div>
        <label>Password</label>
        <input type="password" onChange={handleChange} className="border-2 p-1 ml-3 rounded-md" name="password" required />
      </div>
      <button type="submit" onClick={handleSubmit} className="bg-blue-500 text-white px-4 py-2 rounded-md">Submit</button>
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
    logo: null, // For file input
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(form);
      const response = await axios.post(
        "http://localhost:3000/provider-signup", form );

      if (response.status === 200) {
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
    <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
      <div>
        <label>Email</label>
        <input
          type="email"
          className="border-2 p-1 ml-3 rounded-md"
          name="email"
          value={form.email}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Username</label>
        <input
          type="text"
          className="border-2 p-1 ml-3 rounded-md"
          name="username"
          value={form.username}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Owner Name</label>
        <input
          type="text"
          className="border-2 p-1 ml-3 rounded-md"
          name="owner"
          value={form.ownerName}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Profession</label>
        <input
          type="text"
          className="border-2 p-1 ml-3 rounded-md"
          name="profession"
          value={form.profession}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Shop Name</label>
        <input
          type="text"
          className="border-2 p-1 ml-3 rounded-md"
          name="shop"
          value={form.shopName}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Phone Number</label>
        <input
          type="tel"
          className="border-2 p-1 ml-3 rounded-md"
          name="phone"
          value={form.phoneNumber}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Address</label>
        <input
          type="text"
          className="border-2 p-1 ml-3 rounded-md"
          name="address"
          value={form.address}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Password</label>
        <input
          type="password"
          className="border-2 p-1 ml-3 rounded-md"
          name="password"
          value={form.password}
          onChange={handleChange}
          required
        />
      </div>
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md">
        Submit
      </button>
    </form>
  );
};

const Landing = () => {
  const [role, setRole] = useState('User');

  return (
    <div>
      <div className="mb-4">
        <label>Login as</label>
        <select
          className="border-2 p-1 ml-3 rounded-md"
          name="role"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="User">User</option>
          <option value="Provider">Provider</option>
        </select>
      </div>
      {role === 'User' ? <UserForm /> : <ProviderForm />}
    </div>
  );
};

export default Landing;
