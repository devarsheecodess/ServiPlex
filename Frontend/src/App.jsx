import './App.css'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Landing from "./components/Landing";
import Login from "./components/Login";
import Signup from "./components/Signup";
import ProviderHome from "./components/provider/Home";
import ServiceList from './components/provider/Servicelist';
import Appointment from './components/provider/Appointment';
import UserHome from "./components/user/Home";

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
    path: "//appointments",
    element: (
      <div>
        <Appointment />
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