import React from "react";
import { useEffect, useState, useMemo } from "react";
import { useParams } from "react-router-dom";
import { fetchProjects, updateProject } from "../api/firebaseApi";

export default function ProjectDetails() {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [tasks, setTasks] = useState({});
  const [newTask, setNewTask] = useState({ title: "", priority: "Medium" });
  const [filter, setFilter] = useState("All");
  const [sort, setSort] = useState("createdAt");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const tasksPerPage = 5;

  // Load project data
  const loadProject = async () => {
    const data = await fetchProjects();
    if (data && data[id]) {
      setProject(data[id]);
      setTasks(data[id].tasks || {});
    }
  };

  useEffect(() => { loadProject(); }, []);

  // Add task
  const addTask = async () => {
    if (!newTask.title) return;
    const idTask = Date.now().toString();
    const updatedTasks = { ...tasks, [idTask]: { ...newTask, completed: false, createdAt: new Date().toISOString() } };
    await updateProject(id, { ...project, tasks: updatedTasks });
    setNewTask({ title: "", priority: "Medium" });
    loadProject();
  };

  // Delete task
  const deleteTask = async (taskId) => {
    const updatedTasks = { ...tasks };
    delete updatedTasks[taskId];
    await updateProject(id, { ...project, tasks: updatedTasks });
    loadProject();
  };

  // Toggle complete
  const toggleComplete = async (taskId) => {
    const updatedTasks = { ...tasks };
    updatedTasks[taskId].completed = !updatedTasks[taskId].completed;
    await updateProject(id, { ...project, tasks: updatedTasks });
    loadProject();
  };

  // Filter + Sort + Search
  const filteredTasks = useMemo(() => {
    let arr = Object.entries(tasks || {});
    if (filter !== "All") arr = arr.filter(([_, t]) => (filter === "Completed" ? t.completed : !t.completed));
    if (search) arr = arr.filter(([_, t]) => t.title.toLowerCase().includes(search.toLowerCase()));
    if (sort === "priority") arr.sort((a, b) => {
      const priorityMap = { High: 1, Medium: 2, Low: 3 };
      return priorityMap[a[1].priority] - priorityMap[b[1].priority];
    });
    else arr.sort((a, b) => new Date(a[1].createdAt) - new Date(b[1].createdAt));
    return arr;
  }, [tasks, filter, sort, search]);

  // Pagination
  const paginatedTasks = filteredTasks.slice((page - 1) * tasksPerPage, page * tasksPerPage);
  const totalPages = Math.ceil(filteredTasks.length / tasksPerPage);

  // Task progress
  const completedCount = Object.values(tasks).filter(t => t.completed).length;
  const progress = tasks ? Math.round((completedCount / Object.keys(tasks).length) * 100) : 0;

  return (
    <div className="p-6 min-h-screen bg-gradient-to-r from-purple-400 to-indigo-600">
      <div className="max-w-4xl mx-auto glass p-6">
        <h1 className="text-3xl font-bold text-white mb-4">{project?.title}</h1>
        <p className="text-white/90 mb-4">{project?.description}</p>

        {/* Progress */}
        <div className="bg-white/20 rounded-full h-4 mb-6 overflow-hidden">
          <div className="bg-white/80 h-4" style={{ width: `${progress}%` }}></div>
        </div>
        <p className="text-white mb-4">{completedCount} of {Object.keys(tasks).length} tasks completed</p>

        {/* Add Task */}
        <div className="flex gap-2 mb-6">
          <input
            type="text"
            placeholder="Task title"
            value={newTask.title}
            onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
            className="flex-1 p-2 rounded bg-white/20 text-white placeholder-white"
          />
          <select
            value={newTask.priority}
            onChange={(e) => setNewTask({ ...newTask, priority: e.target.value })}
            className="p-2 rounded bg-white/20 text-white"
          >
            <option>High</option>
            <option>Medium</option>
            <option>Low</option>
          </select>
          <button onClick={addTask} className="bg-white text-purple-700 px-4 py-2 rounded hover:bg-white/90">
            Add
          </button>
        </div>

        {/* Filters */}
        <div className="flex gap-2 mb-4 flex-wrap">
          <select className="p-2 rounded bg-white/20 text-white" value={filter} onChange={(e) => setFilter(e.target.value)}>
            <option>All</option>
            <option>Completed</option>
            <option>Incomplete</option>
          </select>
          <select className="p-2 rounded bg-white/20 text-white" value={sort} onChange={(e) => setSort(e.target.value)}>
            <option value="createdAt">Sort by Date</option>
            <option value="priority">Sort by Priority</option>
          </select>
          <input
            type="text"
            placeholder="Search tasks..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="p-2 rounded bg-white/20 text-white placeholder-white"
          />
        </div>

        {/* Task List */}
        <div className="grid gap-4">
          {paginatedTasks.map(([taskId, task]) => (
            <div key={taskId} className="glass p-4 flex justify-between items-center">
              <div>
                <h2 className={`text-white text-lg font-semibold ${task.completed ? "line-through text-white/50" : ""}`}>{task.title}</h2>
                <p className="text-white/80">Priority: {task.priority}</p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => toggleComplete(taskId)}
                  className={`px-2 py-1 rounded ${task.completed ? "bg-green-500 text-white" : "bg-white text-purple-700 hover:bg-white/90"}`}
                >
                  {task.completed ? "Done" : "Mark Done"}
                </button>
                <button onClick={() => deleteTask(taskId)} className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600">Delete</button>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center gap-2 mt-6">
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                onClick={() => setPage(i + 1)}
                className={`px-3 py-1 rounded ${page === i + 1 ? "bg-white text-purple-700" : "bg-white/20 text-white"}`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
