import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
function Blogpage() {
  const navigate = useNavigate();
  const [posts, setpost] = useState([]);

  const location = useLocation();
  const [flashmessage, setflashmessage] = useState();

  useEffect(() => {
    async function fetchpost() {
      try {
        let response = await axios.get("http://localhost:5000/api/posts", {
          withCredentials: true,
        });

        setpost(response.data.posts);

     
      } catch (error) {
        if (error.response?.status === 401) {
          navigate("/login");
        }
      }
    }

    if (location.state?.updated && posts.length>0) {
      setflashmessage("Post Updated successfully");
      setTimeout(() => {
        setflashmessage("");
      }, 2000);
    }
    fetchpost();
  }, []);

  async function handleDelete(id) {
    try {
      let response = await axios.post(
        "http://localhost:5000/api/delete",
        {
          id,
        },
        { withCredentials: true }
      );
      if (response.status === 200) {
        setpost(response.data.posts);
      }
      if (response.data.flash) {
        setflashmessage(response.data.flash);
      }

      setTimeout(() => {
        setflashmessage("");
      }, 2000);
    } catch (error) {
      setflashmessage("Error while deleting");
      setflashmessage("");
    }
  }

  function handleEdit(id) {
    navigate(`/Edit/${id}`);
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
        All Posts
      </h1>

      {flashmessage && (
        <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-4">
          <p>{flashmessage}</p>
        </div>
      )}
      {posts.length > 0 ? (
        posts.map((post) => (
          <div
            key={post._id}
            className="bg-white shadow-md rounded-lg p-5 mb-6 border border-gray-200"
          >
            <h2 className="text-2xl font-bold mb-2 text-gray-800">
              {post.title}
            </h2>
            <p className="text-gray-700 mb-3">{post.blog}</p>
            <p className="text-gray-500">
              <strong>Posted on:</strong>{" "}
              {new Date(post.createdAt).toLocaleDateString()}
            </p>

            <div className="mt-4 flex gap-4">
              <button
                className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md"
                onClick={() => handleEdit(post._id)}
              >
                Edit
              </button>
              <button
                className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-md"
                onClick={() => handleDelete(post._id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))
      ) : (
        <p className="text-center text-gray-500">No posts found</p>
      )}
    </div>
  );
}

export default Blogpage;
