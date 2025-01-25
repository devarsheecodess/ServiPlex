import React from 'react';

const Home = () => {
  const handleLogout = () => {
    const cf = confirm("are you sure you want to logout?")
    if(cf){
      window.location.href = '/';
    }
  }

  return (
    <div className="absolute top-0 left-0 w-full min-h-screen bg-[radial-gradient(125%_125%_at_50%_10%,#000_50%,#32cd32_100%)] flex flex-col items-center justify-center p-4">
      <h1 className="text-4xl font-extrabold text-blue-600 mb-8">Provider Dashboard</h1>
      <button className="text-white text-xl cursor-pointer p-5 absolute top-5 right-5" onClick={handleLogout}><i class="fa-solid fa-right-from-bracket"></i></button>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 max-w-6xl w-full">
        {/* Service Catalogue Management */}
        <div 
          className="bg-black text-white border-2 border-blue-600 p-6 rounded-lg shadow-lg flex flex-col items-start relative cursor-pointer hover:scale-105 transition transform duration-300"
          onClick={() => window.location.href = '/service-catalogue'} 
        >
          <img src="https://banner2.cleanpng.com/20180423/ykw/avecjmkwe.webp" alt="Service Catalogue" className="w-28 h-28 border-2 border-blue-600 rounded-2xl absolute top-4 right-4" />
          <h2 className="text-2xl font-semibold text-white mb-2">Service Catalogue</h2>
          <p className="text-sm text-green-500">Manage and list your services with detailed descriptions</p>
          <p className="text-sm text-green-500">Providers can list their services with detailed</p>
          <p className="text-sm text-green-500">  descriptions, prices, images, and any special offers or packages.</p>
        </div>

        {/* Appointment Management */}
        <div 
          className="bg-black text-white border-2 border-blue-600 p-6 rounded-lg shadow-lg flex flex-col items-start relative cursor-pointer hover:scale-105 transition transform duration-300"
          onClick={() => window.location.href = '/appointments'} 
        >
          <img src="https://img.freepik.com/free-vector/appointment-booking-with-smartphone_23-2148554313.jpg?t=st=1737795212~exp=1737798812~hmac=170ee73427903d20ef2b7805fe009a2741df84ff536081085d7b9df65cf0d16e&w=740" alt="Appointments" className="w-28 h-28  border-2 border-blue-600 rounded-2xl absolute top-4 right-4" />
          <h2 className="text-2xl font-semibold text-white mb-2">Appointments</h2>
          <p className="text-sm text-green-500">View and manage your service requests and appointments.</p>
        </div>

        {/* Payment Management */}
        <div 
          className="bg-black text-white border-2 border-blue-600 p-6 rounded-lg shadow-lg flex flex-col items-start relative cursor-pointer hover:scale-105 transition transform duration-300"
          onClick={() => window.location.href = '/payments'} 
        >
          <img src="https://cdn.pixabay.com/photo/2021/03/19/13/40/online-6107598_640.png" alt="Payments" className="w-28 h-28 border-2 border-blue-600 rounded-2xl absolute top-4 right-4" />
          <h2 className="text-2xl font-semibold text-white mb-2">Payments</h2>
          <p className="text-sm text-green-500">Set up and manage your payment methods for services.</p>
          <p className="text-sm text-green-500">Options to set payment methods, including accepting payments</p>
          <p className="text-sm text-green-500">before or after service delivery.</p>
        </div>

        {/* Ratings and Reviews */}
        <div 
          className="bg-black text-white border-2 border-blue-600 p-6 rounded-lg shadow-lg flex flex-col items-start relative cursor-pointer hover:scale-105 transition transform duration-300"
          onClick={() => window.location.href = '/reviews'} 
        >
          <img src="https://www.irpcommerce.com/IRPStrategyCenter/Interface/DisplayImages/55.jpg" alt="Reviews" className="w-28 h-28 border-2 border-blue-600 rounded-2xl absolute top-4 right-4" />
          <h2 className="text-2xl font-semibold text-white mb-2">Reviews</h2>
          <p className="text-sm text-green-500">View customer feedback and improve your services.</p>
        </div>
      </div>
    </div>
  );
};

export default Home;
