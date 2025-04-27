import React, { useState } from 'react';

const TodoList = () => {
  const [tasks, setTasks] = useState([
   
  ]);

  const [currentTask, setCurrentTask] = useState('');

  function handleFormChange(e) {
    setCurrentTask(e.target.value);
  }

  function addTask() {
    if (currentTask.trim() !== '') {
      setTasks([...tasks, currentTask.trim()]);
      setCurrentTask('');
    }
  }

  function moveTaskUp(index) {
    if (index > 0) {
      const updatedTasks = [...tasks];
      [updatedTasks[index], updatedTasks[index - 1]] = [updatedTasks[index - 1], updatedTasks[index]];
      setTasks(updatedTasks);
    }
  }

  function moveTaskDown(index) {
    if (index < tasks.length - 1) {
      const updatedTasks = [...tasks];
      [updatedTasks[index], updatedTasks[index + 1]] = [updatedTasks[index + 1], updatedTasks[index]];
      setTasks(updatedTasks);
    }
  }

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-blue-100 to-blue-300 flex flex-col items-center py-10">
        <h1 className="text-4xl font-bold text-blue-800 mb-8 drop-shadow-md">Todo List App</h1>

        <div className="flex items-center space-x-4 mb-10">
          <input
            type="text"
            className="border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none px-4 py-2 rounded-md shadow-sm w-72"
            value={currentTask}
            onChange={handleFormChange}
            placeholder="Enter a task"
          />
          <button
            className="bg-blue-600 text-white px-6 py-2 rounded-md shadow-md hover:bg-blue-700 transition-all duration-200"
            onClick={addTask}
          >
            Add Task
          </button>
        </div>

        <ol className="space-y-4 w-full max-w-md">
          {tasks.map((task, i) => (
            <li
              key={i}
              className="flex justify-between items-center bg-white border border-gray-300 shadow-lg rounded-lg px-4 py-3 transition-transform transform hover:scale-105 hover:shadow-2xl"
            >
              <span className="flex-1 pr-4">{task}</span>
              <div className="flex space-x-2">
                <button
                  className="text-red-500 hover:text-red-700 transition-all duration-200"
                  onClick={() => setTasks(tasks.filter((_, index) => index !== i))}
                >
                  🗑️
                </button>
                <button
                  className={`text-blue-500 hover:text-blue-700 transition-all duration-200 ${i === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
                  onClick={() => moveTaskUp(i)}
                  disabled={i === 0}
                >
                  👆
                </button>
                <button
                  className={`text-blue-500 hover:text-blue-700 transition-all duration-200 ${i === tasks.length - 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
                  onClick={() => moveTaskDown(i)}
                  disabled={i === tasks.length - 1}
                >
                  👇
                </button>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </>
  );
};

export default TodoList;
