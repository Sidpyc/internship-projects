import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const UserProfile = () => {
  const { username } = useParams();
  const [profile, setProfile] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const accessToken = localStorage.getItem("access_token");

        if (!accessToken) {
          throw new Error("No access token found. Please log in.");
        }

        // Fetch profile data
        const profileResponse = await axios.get(
          `http://127.0.0.1:8000/newusers/${username}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        setProfile(profileResponse.data);

        // Fetch user posts
        const postsResponse = await axios.get(
          `http://127.0.0.1:8000/home/newposts/${username}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        setPosts(postsResponse.data);

        setLoading(false);
      } catch (err) {
        console.error("Error fetching profile or posts:", err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchProfileData();
  }, [username]);

  const handleDeletePost = async (postId) => {
    try {
      const accessToken = localStorage.getItem("access_token");
      if (!accessToken) {
        throw new Error("No access token found. Please log in.");
      }

      await axios.delete(`http://127.0.0.1:8000/home/myposts/deletepost/${postId}/`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      // Remove the deleted post from the state
      setPosts(posts.filter(post => post.id !== postId));
      alert("Post deleted successfully!");
    } catch (err) {
      console.error("Error deleting post:", err);
      alert("Failed to delete post. Please try again.");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="w-8 h-8 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 text-center text-red-500 font-medium">
        {error}
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="p-4 text-center text-gray-600 font-medium">
        No profile data available.
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 min-h-screen bg-gray-100 mt-16">
      {/* Profile Header */}
      <div className="bg-white rounded-xl shadow-md p-6 mb-8">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
          {/* Profile Picture */}
          <div className="w-32 h-32 flex-shrink-0">
            {profile.profile_picture ? (
              <img
                src={`http://127.0.0.1:8000${profile.profile_picture}`}
                alt={`${profile.username}'s profile`}
                className="w-full h-full rounded-full object-cover border-4 border-blue-100"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gradient-to-r from-blue-400 to-purple-500 text-white text-4xl font-bold rounded-full">
                {profile.username[0].toUpperCase()}
              </div>
            )}
          </div>

          {/* Profile Details */}
          <div className="flex-1 space-y-2">
            <h2 className="text-2xl font-bold text-gray-800">{profile.username}</h2>

            <div className="grid grid-cols-2 gap-4 text-gray-600">
              <div className="flex items-center space-x-2">
                <span>Email:</span>
                <span>{profile.email || "No email provided"}</span>
              </div>

              <div className="flex items-center space-x-2">
                <span>Followers:</span>
                <span>{profile.followers_count || 0}</span>
              </div>

              {profile.bio && (
                <div className="col-span-2">
                  <p className="text-gray-600 leading-relaxed">{profile.bio}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Posts Section */}
      <div>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Posts</h2>
        {posts.length === 0 ? (
          <div className="text-center p-8 bg-white rounded-2xl shadow-md border border-gray-100">
            <p className="text-gray-500 text-lg">No posts found. Start sharing your thoughts!</p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2">
            {posts.map((post) => (
              <div key={post.id} className="bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-800">{post.title}</h3>
                <p className="text-gray-700 mb-4 leading-relaxed">{post.content}</p>

                {post.image && (
                  <div className="mb-4 rounded-xl overflow-hidden border border-gray-200">
                    <img
                      src={`http://127.0.0.1:8000${post.image}`}
                      alt="Post"
                      className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                )}

                <div className="flex justify-between items-center border-t border-gray-100 pt-4">
                  <p className="text-sm text-gray-500">
                    {new Date(post.created_at).toLocaleString()}
                  </p>
                  <button 
                    onClick={() => handleDeletePost(post.id)}
                    className="text-red-500 hover:text-red-700 text-sm"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserProfile;