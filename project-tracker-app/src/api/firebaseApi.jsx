import React from "react";
import axios from "axios";

// Replace with your Firebase Realtime Database URL
const BASE_URL = "https://project-tracker-51e1d-default-rtdb.asia-southeast1.firebasedatabase.app";

// Fetch all projects
export const fetchProjects = async () => {
  const res = await axios.get(`${BASE_URL}/projects.json`);
  return res.data;
};

// Add project
export const addProject = async (project) => {
  await axios.post(`${BASE_URL}/projects.json`, project);
};

// Update project
export const updateProject = async (id, project) => {
  await axios.put(`${BASE_URL}/projects/${id}.json`, project);
};

// Delete project
export const deleteProject = async (id) => {
  await axios.delete(`${BASE_URL}/projects/${id}.json`);
};
