import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../authSlice";

function NavBar() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  console.log("====================================");
  console.log(user);
  console.log("====================================");
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    dispatch(logout());
  };

  const toggleProfileDropdown = () => {
    setIsProfileOpen(!isProfileOpen);
  };

  const imageURL = user.profileImageUrl || "user_profile_placeholder.jpg ";

  return (
    <nav className="bg-blue-600 p-4">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo or Brand */}
        <div className="text-white text-2xl font-bold">
          <a href="/">MyApp</a>
        </div>

        {/* Navigation Links */}
        <div className="hidden md:flex space-x-6">
          <a href="/" className="text-white hover:text-blue-200">
            Home
          </a>
          <a href="/features" className="text-white hover:text-blue-200">
            Features
          </a>
          <a href="/about" className="text-white hover:text-blue-200">
            About
          </a>
        </div>
        <div className="relative">
          <div
            onClick={toggleProfileDropdown}
            className="text-white bg-gray-800 rounded-full  hover:bg-gray-700 focus:outline-none overflow-hidden"
          >
            <img src={imageURL} alt="" width="44" />
          </div>

          {/* Dropdown Menu */}
          {isProfileOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2">
              <Link
                to="/profile"
                className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
              >
                View Profile
              </Link>
              <span
                className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                onClick={handleLogout}
              >
                Logout
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Menu (optional) */}
      <div className="md:hidden flex justify-between items-center mt-4">
        <a href="/" className="text-white hover:text-blue-200">
          Home
        </a>
        <a href="/features" className="text-white hover:text-blue-200">
          Features
        </a>
        <a href="/about" className="text-white hover:text-blue-200">
          About
        </a>
      </div>
    </nav>
  );
}

export default NavBar;
