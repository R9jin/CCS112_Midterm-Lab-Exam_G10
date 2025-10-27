import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./TaskList.css"; // <-- import the CSS here

function TaskList() {
  const [tasks, setTasks] = useState([]);
  const apiUrl = "http://127.0.0.1:8000/api/tasks";

  useEffect(() => {
    fetch(apiUrl)
      .then(res => res.json())
      .then(setTasks)
      .catch(console.error);
  }, []);

  const handleDelete = (id) => {
    if (!window.confirm("Delete this task?")) return;
    fetch(`${apiUrl}/${id}`, { method: "DELETE" })
      .then(() => setTasks(tasks.filter(t => t.id !== id)))
      .catch(console.error);
  };

  const handleComplete = (task) => {
    fetch(`${apiUrl}/${task.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...task, status: "completed" }),
    })
      .then(() => setTasks(tasks.map(t => t.id === task.id ? { ...t, status: "completed" } : t)))
      .catch(console.error);
  };

  return (
    <div className="item-list-container">
      <h2>Task List</h2>
      <Link to="/tasks/add" className="btn btn-primary mb-3">Add New Task</Link>
      <table className="table table-bordered item-list">
        <thead>
          <tr>
            <th>Title</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map(task => (
            <tr key={task.id} className="item">
              <td className="item-info">{task.title}</td>
              <td className="item-info">{task.status}</td>
              <td className="item-actions">
                <button className="btn complete" onClick={() => handleComplete(task)}>Complete</button>
                <Link className="btn edit" to={`/tasks/edit/${task.id}`}>Edit</Link>
                <button className="btn delete" onClick={() => handleDelete(task.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TaskList;
