import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Signup() {
  const navigate = useNavigate();
  const [userdata, setUserdata] = useState({
    username: "",
    email: "",
    password: "",
    flashmessage: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserdata((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/signup`,
        {
          username: userdata.username,
          email: userdata.email,
          password: userdata.password,
        },
        { withCredentials: true }
      );

      // Show the flash message for a successful signup
      setUserdata((prev) => ({
        ...prev,
        flashmessage: response.data.flash,
      }));

      // Delay navigation to allow the flash message to be visible for 2 seconds
      setTimeout(() => {
        navigate("/Blog"); // Navigate after 2 seconds
      }, 2000);
    } catch (error) {
      // Show flash message for an error
      setUserdata((prev) => ({
        ...prev,
        flashmessage: error.response?.data.flash || "Signup failed",
      }));

      // Automatically hide the error message after 2 seconds
      setTimeout(() => {
        setUserdata((prev) => ({ ...prev, flashmessage: "" }));
      }, 2000);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-4 text-center">Sign Up</h2>

        {userdata.flashmessage && (
          <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-4">
            <p>{userdata.flashmessage}</p>
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={userdata.username}
            onChange={handleChange}
            required
            className="w-full p-3 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={userdata.email}
            onChange={handleChange}
            required
            className="w-full p-3 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={userdata.password}
            onChange={handleChange}
            required
            className="w-full p-3 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-3 rounded-md hover:bg-blue-600 transition-colors"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
}

export default Signup;
