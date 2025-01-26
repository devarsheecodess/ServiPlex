import './App.css'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Landing from "./components/Landing";
import Login from "./components/Login";
import Signup from "./components/Signup";
import ProviderHome from "./components/provider/Home";
import ServiceList from './components/provider/Servicelist';
import UserHome from "./components/user/Home";
import Services from "./components/user/Services";
import Appointments from "./components/user/Appointments";
import Appointment from './components/provider/Appointment';
import Recent from "./components/user/Recent";
import Profile from './components/user/Profile';
import Reviews from './components/Reviews';
import Replies from './components/Replies';
import ProviderPaymentSetup from './components/provider/Payments';
import Payments from './components/user/Payments';
import ServiceDiscovery from './components/user/Search_Discovery/ServiceDiscovery';

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <div>
        <Landing/>
      </div>
    ),
  },
  {
    path: "/login",
    element: (
      <div>
        <Login />
      </div>
    ),
  },
  {
    path: "/signup",
    element: (
      <div>
        <Signup />
      </div>
    ),
  },
  {
    path: "/user-home",
    element: (
      <div>
        <UserHome />
      </div>
    ),
  },
  {
    path: "/provider-home",
    element: (
      <div>
        <ProviderHome />
      </div>
    ),
  },
  {
    path: "/service-catalogue",
    element: (
      <div>
        <ServiceList />
      </div>
    ),
  },
  {
    path: "/appointment",
    element: (
      <div>
        <Appointment />
      </div>
    ),
  },
  {
    path: "/services",
    element: (
      <div>
        <Services />
      </div>
    ),
  },
  {
    path:"service-discovery",
    element: (
      <div>
        <ServiceDiscovery/>
      </div>
    ),
  },
  {
    path: "/provider-payments",
    element: (
      <div>
        <ProviderPaymentSetup/>
      </div>
    ),
  },
  {
    path: "/appointments",
    element: (
      <div>
        <Appointments />
      </div>
    ),
  },
  {
    path: "/reviews",
    element: (
      <div>
        <Reviews />
      </div>
    ),
  },
  {
    path: "/replies",
    element: (
      <div>
        <Replies />
      </div>
    ),
  },
  {
    path: "/recent",
    element: (
      <div>
        <Recent />
      </div>
    ),
  },
  {
    path: "/profile",
    element: (
      <div>
        <Profile />
      </div>
    ),
  },
  {
    path: "/user-payments",
    element: (
      <div>
        <Payments />
      </div>
    ),
  },
]);

function App() {

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App