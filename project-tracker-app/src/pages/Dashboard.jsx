import React from "react";
import { useEffect, useState } from "react";
import { fetchProjects, deleteProject } from "../api/firebaseApi";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const [projects, setProjects] = useState({});

  const loadProjects = async () => {
    const data = await fetchProjects();
    setProjects(data || {});
  };

  useEffect(() => { loadProjects(); }, []);

  return (
    <div className="p-6 min-h-screen bg-gradient-to-r from-purple-400 to-indigo-600">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-6">Projects</h1>
        <Link to="/add-project" className="mb-4 inline-block bg-white text-purple-700 px-4 py-2 rounded hover:bg-white/90">
          Add Project
        </Link>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects && Object.entries(projects).map(([id, proj]) => (
            <div key={id} className="glass p-4">
              <h2 className="text-xl font-bold text-white">{proj.title}</h2>
              <p className="text-white/90">{proj.description}</p>
              <div className="mt-4 flex gap-2">
                <Link to={`/project/${id}`} className="bg-white text-purple-700 px-2 py-1 rounded hover:bg-white/90">
                  View
                </Link>
                <Link to={`/edit-project/${id}`} className="bg-white text-purple-700 px-2 py-1 rounded hover:bg-white/90">
                  Edit
                </Link>
                <button onClick={() => { deleteProject(id); loadProjects(); }} className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600">
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
