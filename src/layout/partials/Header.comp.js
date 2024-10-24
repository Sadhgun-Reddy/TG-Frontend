import React from "react";
import logo from "../../assets/img/logo.png";
import { useNavigate } from "react-router-dom"; // Using useNavigate for navigation
import { userLogout } from "../../api/userApi";

export const Header = () => {
  const navigate = useNavigate(); // Hook to navigate programmatically

  const logMeOut = () => {
    sessionStorage.removeItem("accessJWT"); // Remove session token
    localStorage.removeItem("crmSite"); // Clear local storage
    userLogout(); // Call logout API function
    navigate("/"); // Navigate to the home page after logout
  };

  return (
    <nav className="bg-info dark:bg-gray-800 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <img src={logo} alt="logo" className="h-12" /> {/* Adjusted size */}
          </div>
          <div className="hidden md:flex md:items-center">
            <div className="ml-auto flex space-x-4">
              <button
                className="text-white hover:bg-gray-700 px-3 py-2 rounded"
                onClick={() => navigate("/dashboard")}
              >
                Dashboard
              </button>
              <button
                className="text-white hover:bg-gray-700 px-3 py-2 rounded"
                onClick={() => navigate("/tickets")}
              >
                Tickets
              </button>
              <button
                className="text-white hover:bg-gray-700 px-3 py-2 rounded"
                onClick={logMeOut}
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};
