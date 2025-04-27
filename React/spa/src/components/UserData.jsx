import React, { useState, useEffect } from 'react';

const UserData = () => {
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);

    // Fetching users
    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/users')
            .then(response => response.json())
            .then(data => setUsers(data));
    }, []);

    // Handle user selection
    const handleChange = (e) => {
        const userId = e.target.value;
        const user = users.find(user => user.id === parseInt(userId));
        setSelectedUser(user);
    };

    return (
        <div className="p-6 bg-gray-100 min-h-screen flex flex-col items-center">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">User Data</h1>

            <label htmlFor="users" className="text-lg font-medium text-gray-700 mb-2">
                Select a User
            </label>
            
            <select
                name="users"
                id="users"
                onChange={handleChange}
                className="mb-6 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
                <option value="">--Select a User--</option>
                {users.map(user => ( 
                    <option key={user.id} value={user.id}>
                        {user.name}
                    </option>
                ))}
            </select>

            <div className="w-full max-w-md bg-white shadow-md rounded-lg p-4">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">User Details</h2>
                {selectedUser ? (

                    <div className="space-y-2">
                        <p>
                            <span className="font-medium">Name:</span> {selectedUser.name}
                        </p>
                        <p>
                            <span className="font-medium">Email:</span> {selectedUser.email}
                        </p>
                        <p>
                            <span className="font-medium">Phone:</span> {selectedUser.phone}
                        </p>
                        <p>
                            <span className="font-medium">Address:</span> {selectedUser.address.street}, {selectedUser.address.suite}, {selectedUser.address.city}, {selectedUser.address.zipcode}
                        </p>
                    </div>
                ) : (
                    <p className="text-gray-600">Please select a user to see details.</p>
                )}
            </div>
        </div>
    );
};

export default UserData;
