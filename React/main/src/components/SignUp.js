import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const response = await axios.post("http://127.0.0.1:8000/api/signup/", {
        username,
        password,
      });

      if (response.status === 201) {
        setSuccess("Account created successfully! Redirecting to login...");
        setTimeout(() => {
          navigate("/home"); // Redirect to login page after successful signup
        }, 2000);
      } else {
        setError("Unable to create account. Please try again.");
      }
    } catch (err) {
      console.error(err);
      setError("Error occurred: " + (err.response?.data?.message || "Please try again."));
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-gray-100 border border-gray-300 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">Sign Up</h2>
      {error && <p className="text-red-600 text-sm mb-4">{error}</p>}
      {success && <p className="text-green-600 text-sm mb-4">{success}</p>}
      <form onSubmit={handleSignUp}>
        <div className="mb-4">
          <label htmlFor="username" className="block text-gray-700 font-medium mb-1">
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
          <label htmlFor="password" className="block text-gray-700 font-medium mb-1">
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
          Sign Up
        </button>
      </form>
      <div className="mt-4 text-center">
        <p className="text-sm text-gray-600">
          Already have an account?{" "}
          <button
            onClick={() => navigate("/")}
            className="text-yellow-500 font-medium hover:underline"
          >
            Login
          </button>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
