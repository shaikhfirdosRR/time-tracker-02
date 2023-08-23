// action.js
export const ADD_PROJECT = "ADD_PROJECT";
export const ADD_TASK = "ADD_TASK";

export const addProject = (projectName) => ({
  type: ADD_PROJECT,
  payload: projectName,
});

export const addTask = (projectName, task) => ({
  type: ADD_TASK,
  payload: { projectName, task },
});
