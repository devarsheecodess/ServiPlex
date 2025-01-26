import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    const cf = confirm("are you sure you want to logout?")
    if(cf){
      localStorage.clear();
      navigate('/');
    }
  }

  return (
    <div className="absolute top-0 left-0 w-full min-h-screen bg-[radial-gradient(125%_125%_at_50%_10%,#000_50%,#32cd32_100%)] flex flex-col items-center justify-center p-4">
        <h1 className="text-4xl font-extrabold text-blue-600 mb-8">User Dashboard</h1>
      <button className="text-white text-xl cursor-pointer outline-0 p-5 absolute top-5 right-5" onClick={handleLogout}><i class="fa-solid fa-right-from-bracket"></i></button>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 max-w-6xl w-full">
        {/* Services */}
        <div
          className="bg-black text-white border-2 border-blue-600 p-6 rounded-lg shadow-lg flex flex-col items-start relative cursor-pointer hover:scale-105 transition transform duration-300"
          onClick={() => window.location.href = '/services'}
        >
          <img src="https://banner2.cleanpng.com/20180423/ykw/avecjmkwe.webp" alt="Service Catalogue" className="w-20 h-20 border-2 border-blue-600 rounded-2xl absolute top-4 right-4" />
          <h2 className="text-2xl font-semibold text-white mb-2">Services</h2>
          <p className="text-sm text-green-500">Discover a variety of services tailored to your needs.</p>
        </div>

        {/* Appointment */}
        <div
          className="bg-black text-white border-2 border-blue-600 p-6 rounded-lg shadow-lg flex flex-col items-start relative cursor-pointer hover:scale-105 transition transform duration-300"
          onClick={() => window.location.href = '/appointments'}
        >
          <img src="https://img.freepik.com/free-vector/appointment-booking-with-smartphone_23-2148554313.jpg?t=st=1737795212~exp=1737798812~hmac=170ee73427903d20ef2b7805fe009a2741df84ff536081085d7b9df65cf0d16e&w=740" alt="Appointments" className="w-20 h-20  border-2 border-blue-600 rounded-2xl absolute top-4 right-4" />
          <h2 className="text-2xl font-semibold text-white mb-2">Appointments</h2>
          <p className="text-sm text-green-500">Manage and track your upcoming and past </p>
          <p className="text-sm text-green-500">appointments with ease.</p>
        </div>

        {/* Recent Services */}
        <div
          className="bg-black text-white border-2 border-blue-600 p-6 rounded-lg shadow-lg flex flex-col items-start relative cursor-pointer hover:scale-105 transition transform duration-300"
          onClick={() => window.location.href = '/recent'}
        >
          <img src="https://cdn.vectorstock.com/i/1000x1000/56/62/cartoon-man-and-woman-employees-customer-service-vector-21215662.webp" alt="Payments" className="w-20 h-20 border-2 border-blue-600 rounded-2xl absolute top-4 right-4" />
          <h2 className="text-2xl font-semibold text-white mb-2">Recent Services</h2>
          <p className="text-sm text-green-500">View and revisit the services you’ve recently used.</p>
        </div>

        {/* User Profile */}
        <div
          className="bg-black text-white border-2 border-blue-600 p-6 rounded-lg shadow-lg flex flex-col items-start relative cursor-pointer hover:scale-105 transition transform duration-300"
          onClick={() => window.location.href = '/profile'}
        >
          <img src="https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_960_720.png" alt="Reviews" className="w-20 h-20 border-2 border-blue-600 rounded-2xl absolute top-4 right-4" />
          <h2 className="text-2xl font-semibold text-white mb-2">User Profile</h2>
          <p className="text-sm text-green-500">Access and update your profile information effortlessly.</p>
        </div>
           <div
          className="bg-black text-white border-2 border-blue-600 p-6 rounded-lg shadow-lg flex flex-col items-start relative cursor-pointer hover:scale-105 transition transform duration-300"
          onClick={() => window.location.href = '/profile'}
        >
          <img src="https://cdn.pixabay.com/photo/2021/03/19/13/40/online-6107598_640.png" alt="Payments" className="w-20 h-20 border-2 border-blue-600 rounded-2xl absolute top-4 right-4" />
          <h2 className="text-2xl font-semibold text-white mb-2">Payments</h2>
          <p className="text-sm text-green-500">Set up and manage your payment methods for services.</p>
        </div>

        {/* Ratings and Reviews */}
        <div 
          className="bg-black text-white border-2 border-blue-600 p-6 rounded-lg shadow-lg flex flex-col items-start relative cursor-pointer hover:scale-105 transition transform duration-300"
          onClick={() => window.location.href = '/reviews'} 
        >
          <img src="https://www.irpcommerce.com/IRPStrategyCenter/Interface/DisplayImages/55.jpg" alt="Reviews" className="w-20 h-20 border-2 border-blue-600 rounded-2xl absolute top-4 right-4" />
          <h2 className="text-2xl font-semibold text-white mb-2">Reviews</h2>
          <p className="text-sm text-green-500">View customer feedback and improve your services.</p>
        </div>
      </div>
    </div>

  );
};

export default Home;
