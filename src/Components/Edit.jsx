import axios from "axios";

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
function Edit() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [post, setpost] = useState({
    title: "",
    blog: "",
  });
  const [flashmessage, setflashmessage] = useState("");

  function handleChange(e) {
    const { value, name } = e.target;
    setpost((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  useEffect(() => {
    async function getdata() {
      try {
        let response = await axios.get(`http://localhost:5000/api/edit/${id}`, {
          withCredentials: true,
        });

        setpost({
          title: response.data.post.title,
          blog: response.data.post.blog,
        });
      } catch (error) {
        setflashmessage("Error Occured")
      }
    }

    getdata();
  }, [id]);

  async function handlesubmit(e) {
    e.preventDefault();
    try {
      let response = await axios.post(
        `http://localhost:5000/api/update/${id}`,
        {
          title: post.title,
          blog: post.blog,
        },
        { withCredentials: true }
      );

      if (response.status === 201) {
        setflashmessage(response.data.flash);
      }

      navigate('/Blogpage',{state:{updated:true}})
    } catch (error) {
      setflashmessage("Error occurred while updating the post.");
    }
  }

  return (
    <>
      <div className="p-6 bg-gray-100 min-h-screen">
        <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
          Edit Post
        </h1>

        {flashmessage && (
          <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-4">
            <h1>{flashmessage}</h1>
          </div>
        )}

        <form
          onSubmit={handlesubmit}
          className="max-w-lg mx-auto bg-white p-6 shadow-md rounded-md"
        >
          <div className="mb-4">
            <label
              htmlFor="title"
              className="block text-gray-700 font-bold mb-2"
            >
              Title:
            </label>
            <input
              type="text"
              name="title"
              value={post.title}
              onChange={handleChange}
              className="w-full border border-gray-300 p-2 rounded-md"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="blog"
              className="block text-gray-700 font-bold mb-2"
            >
              Content:
            </label>
            <textarea
              name="blog"
              value={post.blog}
              onChange={handleChange}
              className="w-full border border-gray-300 p-2 rounded-md"
              rows="8"
              required
            />
          </div>
          <div className="text-center">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default Edit;
