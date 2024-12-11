import React, { useState } from "react";


function App() {
  return (
    <div>
      <Todo />
    </div>
  );
}

function Todo() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  const addTask = () => {
    if (newTask.trim() === "") {
      return;
    } else {
      setTasks([...tasks, { text: newTask, completed: false }]);
      setNewTask(""); // Reset input after adding the task
    }
  };

  function deleteTask(index) {
    setTasks(tasks.filter((_, i) => i !== index));
  }

  function doneTask(index) {
    setTasks(tasks.map((task, i) =>
      i === index ? { ...task, completed: !task.completed } : task
    ));
  }

  return (
    <div className="container w-50 mx-auto p-4" style={{ minHeight: '100vh' }}>
      <div className="card shadow-lg p-4">
        <h1 className="text-dark mb-4">To Do List</h1>

        {/* Input field and button next to each other */}
        <div className="d-flex flex-column flex-sm-row mb-3">
          <input 
            type="text" 
            onChange={(e) => setNewTask(e.target.value)} 
            value={newTask} 
            className="form-control me-2 mb-2 mb-sm-0" // Adjusting spacing for smaller screens
            placeholder="Enter task"
          />
          <button 
            onClick={addTask} 
            type="button" 
            className="btn btn-success">
            Add
          </button>
        </div>

        {/* Task List */}
        <ul style={{ listStyle: 'none', paddingLeft: '0' }}>
          {tasks.map((task, index) => (
            <li key={index} className="d-flex align-items-center justify-content-between mb-3">
              {/* Checkbox and Task */}
              <div className="d-flex align-items-center">
                <input 
                  onChange={() => doneTask(index)} 
                  type="checkbox" 
                  className="form-check-input me-2" 
                  checked={task.completed}
                />
                <span 
                  style={{ 
                    textDecoration: task.completed ? "line-through" : "none",
                    color: task.completed ? "#6c757d" : "#343a40", // Muted text for completed tasks
                  }}
                >
                  {task.text}
                </span>
              </div>

              {/* Delete Button */}
              <button 
                onClick={() => deleteTask(index)} 
                type="button" 
                className="btn-close" 
                aria-label="Close" 
                style={{ color: "#e74a3b" }} // Red close button for delete
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;