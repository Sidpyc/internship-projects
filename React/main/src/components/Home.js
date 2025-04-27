import React from 'react';
import { Navbar } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';


const Home = () => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/posts');
    };
    

    return (
      <>
      
        <>
        
            
            <div className="bg-gray-100 p-8 rounded-lg shadow-md flex flex-col items-center justify-center text-center">
  <h1 className="text-3xl font-bold text-gray-800 mb-4">Welcome to the Home Page</h1>
  <p className="text-gray-700 text-lg mb-6">
    Discover amazing blog posts or create your own. Click the button below to explore all posts.
  </p>
  <button 
    onClick={handleClick} 
    className="bg-yellow-300 text-gray-800 font-semibold py-2 px-4 rounded hover:bg-yellow-400 transition duration-200"
  >
    View All Posts
  </button>
</div>


        </>
        </>
    );
};

export default Home;
