import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaHeart } from "react-icons/fa"; // Import heart icon

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Fetch posts
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const accessToken = localStorage.getItem("access_token");
        if (!accessToken) throw new Error("No access token found. Please log in.");

        const response = await axios.get("http://127.0.0.1:8000/home/posts/", {
          headers: { Authorization: `Bearer ${accessToken}` },
        });

        setPosts(response.data);
      } catch (err) {
        console.error("Error fetching posts:", err);
        setError("Failed to fetch posts. Please log in.");
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  // Optimistic Like Toggle
  const toggleLike = async (id) => {
    try {
      const accessToken = localStorage.getItem("access_token");
      if (!accessToken) throw new Error("No access token found. Please log in.");

      // Optimistic UI Update
      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post.id === id
            ? {
                ...post,
                isLiked: !post.isLiked, // Instant toggle
                like_count: post.isLiked ? post.like_count - 1 : post.like_count + 1, // Adjust count
              }
            : post
        )
      );

      // API request
      const response = await axios.post(
        `http://127.0.0.1:8000/home/posts/${id}/toggle-like/`,
        {},
        { headers: { Authorization: `Bearer ${accessToken}` } }
      );

      // Sync with backend
      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post.id === id
            ? {
                ...post,
                isLiked: response.data.is_liked,
                like_count: response.data.like_count,
              }
            : post
        )
      );
    } catch (err) {
      console.error("Error toggling like:", err);

      // Rollback UI if API fails
      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post.id === id
            ? {
                ...post,
                isLiked: !post.isLiked, // Revert like status
                like_count: post.isLiked ? post.like_count + 1 : post.like_count - 1, // Revert count
              }
            : post
        )
      );
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-32 mt-16">
        <div className="w-8 h-8 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error) {
    return <div className="p-4 text-center text-red-500 font-medium mt-16">{error}</div>;
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 mt-16">
      <h1 className="text-3xl font-bold text-center mb-6 bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
        Posts
      </h1>

      {posts.length === 0 ? (
        <div className="text-center p-8 bg-white rounded-2xl shadow-md border border-gray-100">
          <p className="text-gray-500 text-lg">No posts available.</p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2">
          {posts.map((post) => (
            <div key={post.id} className="bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-100">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 flex items-center justify-center">
                  {post.image ? (
                    <img src={post.image} alt={post.author.username} className="w-full h-full rounded-full object-cover" />
                  ) : (
                    <span className="text-white font-bold">{post.author.username?.[0]?.toUpperCase() || "U"}</span>
                  )}
                </div>
                <button onClick={() => navigate(`/userprofile/${post.author.username}`)} className="text-gray-900 hover:text-gray-500 font-semibold">
                  {post.author.username || "Unknown Author"}
                </button>
              </div>

              <p className="text-gray-700 mb-4 leading-relaxed">{post.content}</p>

              {post.image && (
                <div className="mb-4 rounded-xl overflow-hidden border border-gray-200">
                  <img src={post.image} alt="Post" className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300" />
                </div>
              )}

              <div className="flex justify-between items-center border-t border-gray-100 pt-4">
                <p className="text-sm text-gray-500">{new Date(post.created_at).toLocaleString()}</p>
                <div className="flex items-center">
                  <button onClick={() => toggleLike(post.id)} className={`w-10 h-10 flex items-center justify-center rounded-full transition-colors duration-300 ${post.isLiked ? "bg-red-500" : "bg-gray-300"}`}>
                    <FaHeart className={`w-6 h-6 ${post.isLiked ? "text-white" : "text-gray-500"}`} />
                  </button>
                  <span className="text-sm ml-2">{post.like_count}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Posts;
