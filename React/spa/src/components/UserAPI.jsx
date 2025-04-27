import React, { useState, useEffect } from 'react';

function UserAPI() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/users')
            .then(response => response.json())
            .then(data => setUsers(data))
            .catch(error => console.error('Error:', error));
    }, []); // dependency array ensures the useEffect only runs once

    console.log(users);

    return (
        <>
            <h1 className='text-3xl text-center py-5'>Users</h1>
        <div className='flex justify-center items-center'>
            <ul className='list-decimal '>
                {users.map(user => (
                    <li 
                    className= 'text-left text-xl' 
                    key={user.id}
                    >{user.name}</li>
                ))}
            </ul>
        </div>
        </>
    );
}

export default UserAPI;
