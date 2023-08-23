import "./App.css";
import Project from "./Component/Project";
import Tasks from "./Component/Tasks";
import { Route, Routes } from "react-router";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Project/>} />
        <Route path="/createTask" element={<Tasks/>} />
      </Routes>
    </div>
  );
}

export default App;
