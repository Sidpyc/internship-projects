import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Navbar = ({ onLogout }) => {
  const navigate = useNavigate(); 

  const handleLogout = () => {
    onLogout(); // Call the provided onLogout callback function
    navigate("/"); // Redirect to the login page
  };



  
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex space-x-6">
          <Link
            to="/home"
            className="text-white text-lg font-semibold hover:text-gray-300"
          >
            Home
          </Link>
          <Link
            to="/posts"
            className="text-white text-lg font-semibold hover:text-gray-300"
          >
            Blog Posts
          </Link>
          <Link
            to="/newpost"
            className="text-white text-lg font-semibold hover:text-gray-300"
          >
            Add Post
          </Link>
        </div>
        <button
          onClick={handleLogout}  
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
        >
          Log Out
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
