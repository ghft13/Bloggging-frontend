import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Home = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function getPost() {
      try {
        let response = await axios.get(`${process.env.REACT_APP_API_URL}/posts`, {
          withCredentials: true,
        });

        setPosts(response.data.posts);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    }
    getPost();
  }, []); // Use empty array to avoid infinite loop

  return (
    <div>
      {/* Header Section */}
      <header className="bg-gray-800 text-white py-5 text-center">
        <h1 className="text-4xl">Welcome to My Blog</h1>
        <p className="text-xl mt-2">
          Your one-stop destination for exciting posts and updates!
        </p>
        <nav>
          <ul className="flex justify-center space-x-6 mt-4">
          
            <li>
              <Link to="/blog" className="text-white hover:text-blue-400">
                Create Blog
              </Link>
            </li>
            <li>
              <Link to="/signup" className="text-white hover:text-blue-400">
                Signup
              </Link>
            </li>
            <li>
              <Link to="/login" className="text-white hover:text-blue-400">
                Login
              </Link>
            </li>
            <li>
              <Link to="/Blogpage" className="text-white hover:text-blue-400">
                View Blog
              </Link>
            </li>
          </ul>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="bg-blue-500 text-white text-center py-16">
        <h2 className="text-3xl font-bold">Explore Latest Posts</h2>
        <p className="text-lg mt-4">
          Read the most recent articles from our collection.
        </p>
        <a
          href="/posts"
          className="btn bg-white text-blue-500 hover:bg-gray-200 px-4 py-2 mt-6 inline-block rounded"
        >
          Go to Blog
        </a>
      </section>

      {/* Recent Posts Section */}
      <section className="bg-white py-16">
        <h2 className="text-3xl font-bold text-center">Recent Posts</h2>
        <div className="flex justify-around flex-wrap mt-10">
          {posts && posts.length > 0 ? (
            posts.slice(0, 3).map((post) => (
              <div
                key={post._id}
                className="bg-gray-100 border border-gray-200 p-6 m-4 w-1/3 rounded-lg"
              >
                <h3 className="text-2xl font-semibold mb-4">{post.title}</h3>
                <p>
                  {post.blog
                    ? post.blog.substring(0, 100)
                    : "No content available."}
                  ...
                </p>
                <p className="mt-2">
                  <strong>Posted on:</strong>{" "}
                  {new Date(post.createdAt).toLocaleDateString()}
                </p>
                <Link to='/Blogpage'
               
                  className="bg-blue-500 text-white hover:bg-blue-600 px-4 py-2 mt-4 inline-block rounded"
                >
                  Read More
                </Link>
              </div>
            ))
          ) : (
            <p className="text-center">No posts available. Check back later!</p>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white text-center py-4">
        <p>&copy; {new Date().getFullYear()} My Blog. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Home;
