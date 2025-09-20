import React from "react";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchProjects, updateProject } from "../api/firebaseApi";

export default function EditProject() {
  const { id } = useParams();
  const [project, setProject] = useState({ title: "", description: "" });
  const navigate = useNavigate();

  const loadProject = async () => {
    const data = await fetchProjects();
    if (data && data[id]) setProject({ title: data[id].title, description: data[id].description });
  };

  useEffect(() => { loadProject(); }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!project.title || !project.description) return;
    await updateProject(id, { ...project, tasks: (await fetchProjects())[id].tasks, createdAt: (await fetchProjects())[id].createdAt });
    navigate("/");
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-r from-purple-500 to-indigo-500">
      <div className="glass p-10 w-96">
        <h1 className="text-2xl font-bold mb-6 text-white text-center">Edit Project</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Project Title"
            value={project.title}
            onChange={(e) => setProject({ ...project, title: e.target.value })}
            className="p-2 rounded bg-white/20 text-white placeholder-white"
          />
          <textarea
            placeholder="Project Description"
            value={project.description}
            onChange={(e) => setProject({ ...project, description: e.target.value })}
            className="p-2 rounded bg-white/20 text-white placeholder-white resize-none h-24"
          />
          <button type="submit" className="bg-white text-purple-700 px-4 py-2 rounded hover:bg-white/90">
            Update Project
          </button>
        </form>
      </div>
    </div>
  );
}
