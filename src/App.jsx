import React from "react";
import TaskInput from "./components/TaskInput";
import TaskList from "./components/TaskList";

function App() {
  return (
    <div style={{ padding: "20px" }}>
      <h2>Redux Toolkit Task List</h2>
      <TaskInput />
      <TaskList />
    </div>
  );
}

export default App;
