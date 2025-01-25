import React from 'react';
import Addservice from './Addservice';
import ServiceList from './Servicelist';
import DeleteConfirmation from './DeleteConfirm';

const Home = () => {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold text-green-500 mb-6">Provider Home</h1>
      <p className="text-lg mb-8">Manage your services effortlessly</p>

      <div className="flex flex-col gap-6 items-center">
        <Addservice />
        <ServiceList />
        <DeleteConfirmation />
      </div>
    </div>
  );
};

export default Home;
