import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PostList = () => {
    const [data, setData] = useState([]);
    const [editMode, setEditMode] = useState(false);
    const [editPost, setEditPost] = useState({ id: null, title: '', content: '', author: '' });

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:8000/post/api/post/');
            setData(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://127.0.0.1:8000/post/api/post/delete/${id}/`);
            setData(data.filter((post) => post.id !== id));
        } catch (error) {
            console.error('Error deleting post:', error);
        }
    };

    const handleEdit = (post) => {
        setEditMode(true);
        setEditPost(post);
    };

    const handleEditChange = (e) => {
        const { name, value } = e.target;
        setEditPost({ ...editPost, [name]: value });
    };

    const handleEditSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(
                `http://127.0.0.1:8000/post/api/post/edit/${editPost.id}/`,
                editPost
            );
            setData(data.map((post) => (post.id === response.data.id ? response.data : post)));
            setEditMode(false);
            setEditPost({ id: null, title: '', content: '', author: '' });
        } catch (error) {
            console.error('Error updating post:', error);
        }
    };

    return (
        <>
            {editMode ? (
                <div className="w-80 h-80 bg-white rounded-lg shadow-lg flex flex-col justify-center items-center">
                    <h2 className="text-2xl font-bold mb-4">Edit Post</h2>
                    <form onSubmit={handleEditSubmit} className="w-full p-4">
                        <div className="mb-4">
                            <label className="block text-sm font-semibold mb-2">Title:</label>
                            <input
                                type="text"
                                name="title"
                                value={editPost.title}
                                onChange={handleEditChange}
                                required
                                className="w-full px-4 py-2 border rounded-md"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-semibold mb-2">Content:</label>
                            <textarea
                                name="content"
                                value={editPost.content}
                                onChange={handleEditChange}
                                required
                                rows="4"
                                className="w-full px-4 py-2 border rounded-md"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-semibold mb-2">Author:</label>
                            <input
                                type="text"
                                name="author"
                                value={editPost.author}
                                onChange={handleEditChange}
                                required
                                className="w-full px-4 py-2 border rounded-md"
                            />
                        </div>
                        <div className="flex space-x-4">
                            <button type="submit" className="bg-yellow-400 text-gray-800 px-4 py-2 rounded-md hover:bg-yellow-500">
                                Save
                            </button>
                            <button 
                                onClick={() => setEditMode(false)} 
                                type="button" 
                                className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            ) : (
                <div className="grid grid-cols-3 gap-4 justify-center items-center p-4">
                    {data.map((post) => (
                        <div 
                            key={post.id} 
                            className="w-80 h-80 bg-gray-100 p-4 rounded-lg shadow-md flex flex-col justify-between items-center"
                        >
                            <div className="flex-1 text-center">
                                <h3 className="text-xl font-semibold text-gray-700">{post.title}</h3>
                                <p className="text-gray-600">{post.content}</p>
                                <p className="text-gray-500 italic">Author: {post.author}</p>
                            </div>
                            <div className="flex space-x-4 mt-4">
                                <button 
                                    onClick={() => handleEdit(post)} 
                                    className="bg-yellow-400 text-gray-800 py-2 px-4 rounded-md hover:bg-yellow-500"
                                >
                                    Edit
                                </button>
                                <button 
                                    onClick={() => handleDelete(post.id)} 
                                    className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </>
    );
};

export default PostList;
