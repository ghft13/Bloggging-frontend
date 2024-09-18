import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Blog() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    blog: "",
    flashmessage: "",
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:5000/api/blog",
        {
          title: formData.title,
          blog: formData.blog,
        },
        { withCredentials: true } // Send cookies with the request
      );

      if (response.status === 201) {
        setFormData((prev) => ({
          ...prev,
          flashmessage: response.data.flash,
        }));

        // Redirect to Blogpage after 2 seconds
        setTimeout(() => {
          navigate("/Blogpage");
        }, 2000);
      }
    } catch (error) {
      if (error.response?.status === 401) {
        // Handle login redirect in case of authentication failure
        setFormData((prev) => ({
          ...prev,
          flashmessage: "Please login first",
        }));
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      } else {
        // Handle other errors (like server error)
        setFormData((prev) => ({
          ...prev,
          flashmessage: "Failed to create a Post",
        }));
        setTimeout(() => {
          setFormData((prev) => ({ ...prev, flashmessage: "" }));
        }, 2000);
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md"
      >
        <h2 className="text-2xl font-semibold mb-4 text-center text-gray-800">
          Add a Blog
        </h2>

        {formData.flashmessage && (
          <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-4">
            <p>{formData.flashmessage}</p>
          </div>
        )}
        <input
          type="text"
          name="title"
          placeholder="Enter title"
          value={formData.title}
          onChange={handleChange}
          required
          className="w-full p-3 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <textarea
          name="blog"
          placeholder="Enter Blog Here"
          value={formData.blog}
          onChange={handleChange}
          required
          className="w-full p-3 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        ></textarea>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-3 rounded-md hover:bg-blue-600 transition-colors"
        >
          Add
        </button>
      </form>
    </div>
  );
}

export default Blog;
