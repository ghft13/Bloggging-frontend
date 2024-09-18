import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [userdata, setuserdata] = useState({
    email: "",
    password: "",
    flashmessage: "",
  });

  function handledata(e) {
    const { value, name } = e.target;
    setuserdata((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let response = await axios.post(
        `${process.env.REACT_APP_API_URL}/login`,
        {
          email: userdata.email,
          password: userdata.password,
        },
        { withCredentials: true }
      );

      // Ensure you're setting the correct state
      setuserdata((prev) => ({
        ...prev,
        flashmessage: response.data.flash, // Use the correct state key
      }));

      setTimeout(() => navigate("/Blog"), 2000);
    } catch (err) {
      setuserdata((prev) => ({
        ...prev,
        flashmessage: err.response?.data.flash || "Login failed", // Use the correct state key
      }));

      setTimeout(() => {
        setuserdata((prev) => ({ ...prev, flashmessage: "" }));
      }, 2000);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-700">
          Login
        </h2>

        {userdata.flashmessage && (
          <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-4">
            <p>{userdata.flashmessage}</p> {/* Use correct flashmessage */}
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={userdata.email}
            onChange={handledata}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={userdata.password}
            onChange={handledata}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-colors"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
