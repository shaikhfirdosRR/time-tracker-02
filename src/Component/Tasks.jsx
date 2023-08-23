import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTask } from "../Redux/action";
import { useNavigate } from "react-router";

const Tasks = () => {
  const [selectedProject, setSelectedProject] = useState("");
  const [taskName, setTaskName] = useState("");
  const [hoursSpent, setHoursSpent] = useState("");
  const [minutesSpent, setMinutesSpent] = useState("");
  const projects = useSelector((state) => state.projectReducer);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleTaskSubmit = (e) => {
    e.preventDefault();
    if (
      selectedProject &&
      taskName &&
      hoursSpent !== "" &&
      minutesSpent !== ""
    ) {
      const timeSpent = `${hoursSpent} Hr:${minutesSpent} Min`;
      dispatch(addTask(selectedProject, { taskName, timeSpent }));
      setTaskName("");
      setHoursSpent("");
      setMinutesSpent("");
    }
  };

  return (
    <div>
      <div
        onClick={() => navigate("/")}
        style={{ color: "blue", fontSize: "18px" , textDecoration:"underline" , position:'absolute', marginLeft:'30px'}}
      >
        Go to Projects
      </div>
      <h2>Create a Task</h2>
      <div className="task-main">
        <form onSubmit={handleTaskSubmit}>
          <select
            value={selectedProject}
            onChange={(e) => setSelectedProject(e.target.value)}
            className="select-task"
          >
            <option value="">Select Project</option>
            {projects.map((project) => (
              <option key={project.projectName} value={project.projectName}>
                {project.projectName}
              </option>
            ))}
          </select>
          <input
            type="text"
            placeholder="Task Name"
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
            className="task-input"
          />
          <input
            type="number"
            placeholder="Hours"
            min="0"
            max="23"
            value={hoursSpent}
            onChange={(e) => setHoursSpent(e.target.value)}
            className="task-time-input"
          />
          <input
            type="number"
            placeholder="Minutes"
            min="0"
            max="59"
            value={minutesSpent}
            onChange={(e) => setMinutesSpent(e.target.value)}
            className="task-time-input"
          />
          <button type="submit" className="add-task-btn">
            Add Task
          </button>
        </form>
        <div>
          {selectedProject &&
            projects
              .filter((elem) => elem?.projectName === selectedProject)
              .map((e) =>
                e.tasks?.map((e, index) => (
                  <div className="tasks">
                    <div className="task-name">{e.taskName}</div>
                    <div className="task-time">{e.timeSpent}</div>
                  </div>
                ))
              )}
        </div>
      </div>
    </div>
  );
};

export default Tasks;
