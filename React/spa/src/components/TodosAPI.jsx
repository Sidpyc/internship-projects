import React, { useState, useEffect } from 'react';

function TodosAPI() {
    const [todos, setTodos] = useState([]);

    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/todos')
            .then(response => response.json())
            .then(data => setTodos(data))
            .catch(error => console.error('Error:', error));
    }, []); // dependency array ensures the useEffect only runs once



    return (
        <div className="flex justify-center items-center ">
    <div>
        <h1 className="text-center">Users</h1>
        <ul className="list-decimal text-left">
            {todos.map(todo => (
                <li className="mb-2" key={todo.id}>
                    <span className='text-xl text-blue-300'>Task:</span> {todo.title} <br></br> <span className='text-xl text-red-300'>Status:</span> {todo.completed ? 'Done' : 'Not Done'}
                </li>
            ))}
        </ul>
    </div>
</div>
    );
}

export default TodosAPI ;
