import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  // Retrieve token from localStorage
  const token = localStorage.getItem("authToken");

  // If token exists, render the children (protected component); otherwise, navigate to login
  return token ? children : <Navigate to="/" replace />;
};

export default ProtectedRoute;
