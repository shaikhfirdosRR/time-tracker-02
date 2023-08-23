import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addProject } from "../Redux/action";
export const Project = () => {
  const [projects, setProjects] = useState([]);
  const [projectName, setProjectName] = useState("");
  const [showData, setShowData] = useState(-1);
  const [selectedProject, setSelectedProject] = useState("");

  const ProjectName = useSelector((state) => state.projectReducer);

  const dispatch = useDispatch();
  console.log("ProjectName", ProjectName);

  const handleProjectSubmit = (e) => {
    e.preventDefault();
    if (projectName) {
      setProjects([...projects, projectName]);
      setProjectName("");
      dispatch(addProject(projectName));
    }
  };

  const toggleCardCollapse = (index) => {
    setShowData((prevIndex) => (prevIndex === index ? -1 : index));
  };
  const navigate = useNavigate();

  return (
    <div>
      <h2>Create a Project</h2>
      <form onSubmit={handleProjectSubmit}>
        <input
          type="text"
          placeholder="Project Name"
          value={projectName}
          onChange={(e) => setProjectName(e.target.value)}
          className="project-input"
        />
        <button type="submit" className="project-btn">
          Add Project
        </button>
      </form>
      <h2>Project List</h2>
      <div className="main-container">
        {ProjectName  &&
          ProjectName?.map((project, index) => (
            <div key={index} className="project-detail">
              <div
                onClick={() => {
                  toggleCardCollapse(index);
                  setSelectedProject(project.projectName);
                }}
                className="project-text"
              >
                <div className="project-name"> {project.projectName}</div>
                <button
                  onClick={() => {
                    navigate(`/createTask`);
                  }}
                  className="project-btn"
                >
                  Add Task
                </button>
              </div>
              <div className="project-task">
                {showData === index && (
                  <div className="task-section">
                    {selectedProject &&
                      ProjectName?.filter(
                        (elem) => elem?.projectName === selectedProject
                      ).map((e) =>
                        e.tasks?.map((e) => (
                          <div className="tasks">
                            <div className="task-name">{e.taskName}</div>
                            <div className="task-time">{e.timeSpent}</div>
                          </div>
                        ))
                      )}
                  </div>
                )}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Project;
