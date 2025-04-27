import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import PostList from "./components/PostList";
import Home from "./components/Home";
import AddPost from "./components/AddPost";
import Navbar from "./components/Navbar";
import LoginPage from "./components/LoginPage";
import ProtectedRoute from "./components/ProtectedRoute";
import SignUp from "./components/SignUp";


function App() {


  // State to track if the user is authenticated
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem("authToken") // Check if a token exists in localStorage
  );

  // Function to handle login, triggered by LoginPage
  const handleLogin = (token) => {
    localStorage.setItem("authToken", token); // Store token in localStorage
    setIsAuthenticated(true); // Update authentication state
  };

  // Function to handle logout, triggered by Navbar
  const handleLogout = () => {
    localStorage.removeItem("authToken"); // Remove token from localStorage
    setIsAuthenticated(false);
    



     // Update authentication state
  };

  useEffect(() => {
    // Ensure state reflects localStorage on app load
    setIsAuthenticated(!!localStorage.getItem("authToken"));
  }, []);

  return (
    <Router>
      {/* Conditionally render Navbar based on authentication */}
      {isAuthenticated && <Navbar onLogout={handleLogout} />}
      
      <div className="App">
        <Routes>
          {/* LoginPage receives the handleLogin function */}
          <Route path="/" element={<LoginPage onLogin={handleLogin} />} />
          <Route
            path="/home"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/posts"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <PostList />
              </ProtectedRoute>
            }
          />
          <Route
            path="/newpost"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <AddPost />
              </ProtectedRoute>
            }
          />
          <Route path="/signup" element={<SignUp />} />
    
        </Routes>
      </div>
    </Router>
  );
}

export default App;
