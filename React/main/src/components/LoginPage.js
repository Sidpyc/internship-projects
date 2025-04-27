import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LoginPage = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(""); // Reset error message

    try {
      const response = await axios.post("http://127.0.0.1:8000/api/login/", {
        username,
        password,
      });

      console.log(response.data); // Log the response for debugging

      if (response.data.token) {
        const token = response.data.token;
        localStorage.setItem("authToken", token); // Save the token in localStorage
        // alert("Login successful!");
        onLogin(); // Update authentication state in App.js
        navigate("/home"); // Navigate to the home page
      } else {
        setError("Invalid username or password.");
      }
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-gray-100 border border-gray-300 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">Login</h2>
      {error && <p className="text-red-600 text-sm mb-4">{error}</p>}
      <form onSubmit={handleLogin}>
        <div className="mb-4">
          <label
            htmlFor="username"
            className="block text-gray-700 font-medium mb-1"
          >
            Username:
          </label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-yellow-200"
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-gray-700 font-medium mb-1"
          >
            Password:
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-yellow-200"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-yellow-400 text-gray-800 font-semibold py-2 px-4 rounded-md hover:bg-yellow-500 transition-colors"
        >
          Login
        </button>
      </form>
      <div className="mt-4 text-center">
        <p className="text-sm text-gray-600">
          Don't have an account?{" "}
          <button
            onClick={() => navigate("/signup")}
            className="text-yellow-500 font-medium hover:underline"
          >
            Signup
          </button>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
