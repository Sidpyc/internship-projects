import React, { useState } from 'react';
import axios from 'axios';

const AddPost = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [author, setAuthor] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const post = { title, content, author };

    try {
      const response = await axios.post('http://127.0.0.1:8000/post/api/post/add/', post, {
        headers: { 'Content-Type': 'application/json' },
      });
      setMessage('Post added successfully!');
      setTitle('');
      setContent('');
      setAuthor('');
    } catch (error) {
      console.error('Error adding post:', error);
      setMessage('Error adding post.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="max-w-lg w-full p-6 bg-gray-200 shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold text-yellow-600 mb-4 text-center">Create a New Post</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Title:</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Content:</label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500"
              rows="4"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Author:</label>
            <input
              type="text"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              required
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-yellow-500 text-gray-800 px-4 py-2 rounded hover:bg-yellow-600 transition focus:outline-none focus:ring-2 focus:ring-yellow-500"
          >
            Create Post
          </button>
        </form>
        {message && (
          <p
            className={`mt-4 text-center text-sm font-medium ${
              message.includes('successfully') ? 'text-green-600' : 'text-red-600'
            }`}
          >
            {message}
          </p>
        )}
      </div>
    </div>
  );
};

export default AddPost;
