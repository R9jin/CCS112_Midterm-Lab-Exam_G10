import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import TaskList from "./TaskList";
import TaskForm from "./TaskForm";

export default function App() {
  return (
    <BrowserRouter>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container">
          <Link className="navbar-brand" to="/">TaskApp</Link>
          <div className="collapse navbar-collapse">
            <ul className="navbar-nav me-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/">Tasks</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/tasks/add">Add Task</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<TaskList />} />
        <Route path="/tasks/add" element={<TaskForm />} />
        <Route path="/tasks/edit/:id" element={<TaskForm />} />
      </Routes>
    </BrowserRouter>
  );
}
