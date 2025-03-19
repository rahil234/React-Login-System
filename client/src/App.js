import React, { useEffect } from "react";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import UserLogin from "./pages/User/Login";
import AdminLogin from "./pages/Admin/Login";
import SignUp from "./pages/User/SignUp";
import Home from "./pages/User/Home";
import SideBar from "./components/Admin/SideBar";
import Users from "./pages/Admin/Users";
import Dashboard from "./pages/Admin/Dashboard";
import Footer from "./components/User/Footer";
import NavBar from "./components/User/NavBar";
import UpdateProfile from "./pages/User/UpdateProfile";
import IsAuth from "./components/User/IsAuth";
import IsNotAuth from "./components/User/IsNotAuth";
import { useDispatch } from "react-redux";
import { fetchUserData } from "./authSlice";

const Layout = ({ children }) => {
  return (
    <>
      <nav className="h-[40px]">
        <NavBar />
      </nav>
      {children}
      <Footer />
    </>
  );
};

const AdminLayout = () => {
  return (
    <div className="flex">
      <SideBar />
      <div className="flex-grow">
        <Outlet />
      </div>
    </div>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    children: [
      {
        path: "",
        element: (
          <IsAuth>
            <Layout>
              <Home />
            </Layout>
          </IsAuth>
        ),
      },
      {
        path: "login",
        element: (
          <IsNotAuth>
            <UserLogin />
          </IsNotAuth>
        ),
      },
      {
        path: "signup",
        element: (
          <IsNotAuth>
            <SignUp />
          </IsNotAuth>
        ),
      },
      {
        path: "profile",
        element: (
          <IsAuth>
            <UpdateProfile />
          </IsAuth>
        ),
      },
    ],
  },
  {
    path: "/admin",
    children: [
      {
        path: "",
        element: <AdminLayout />,
        children: [
          {
            path: "",
            element: (
                <Dashboard />
            ),
          },
          {
            path: "users",
            element: <Users />,
          }
        ],
      },

      {
        path: "login",
        element: <AdminLogin />,
      },
    ],
  },
]);

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      dispatch(fetchUserData(token)); // Fetch user data if token exists
    }
  }, [dispatch]);

  return <RouterProvider router={router} />;
}

export default App;
