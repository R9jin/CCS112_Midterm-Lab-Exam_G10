import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./TaskList.css"; // reuse the universal CSS

function TaskForm() {
  const { id } = useParams(); 
  const navigate = useNavigate();
  const [form, setForm] = useState({ title: "", status: "pending" });
  const apiUrl = "http://127.0.0.1:8000/api/tasks";

  useEffect(() => {
    if (id) {
      fetch(`${apiUrl}/${id}`)
        .then(res => res.json())
        .then(data => setForm(data))
        .catch(console.error);
    }
  }, [id]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    const method = id ? "PUT" : "POST";
    const url = id ? `${apiUrl}/${id}` : apiUrl;

    fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    })
      .then(() => navigate("/"))
      .catch(console.error);
  };

  return (
    <div className="item-list-container">
      <h2>{id ? "Edit Task" : "Add New Task"}</h2>
      <form onSubmit={handleSubmit} className="item-form">
        <input
          name="title"
          placeholder="Title"
          value={form.title}
          onChange={handleChange}
          required
          className="form-input"
        />
        <select
          name="status"
          value={form.status}
          onChange={handleChange}
          className="form-select"
        >
          <option value="pending">Pending</option>
          <option value="completed">Completed</option>
        </select>
        <button type="submit" className="btn complete mt-2">
          {id ? "Update" : "Add"} Task
        </button>
      </form>
    </div>
  );
}

export default TaskForm;
