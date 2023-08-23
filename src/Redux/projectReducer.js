import { ADD_PROJECT, ADD_TASK } from "./action";

const initialState = [
  {
    projectName: "Project Alpha",
    tasks: [],
  },
];

const projectReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_PROJECT:
      return [
        ...state,
        {
          projectName: action.payload,
          tasks: [],
        },
      ];

    case ADD_TASK:
      return state.map((project) => {
        if (project.projectName === action.payload.projectName) {
          return {
            ...project,
            tasks: [...project.tasks, action.payload.task],
          };
        }
        return project;
      });

    default:
      return state;
  }
};

export default projectReducer;
