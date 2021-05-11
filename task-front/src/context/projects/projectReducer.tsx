import { Reducer } from "react";
import { ContextProjectI, ReducerAction } from "../../models/task.context";
import {
  PROJECT_FORM,
  GET_PROJECTS,
  ADD_PROJECT,
  VALIDATE_FORM,
  CURRENT_PROJECT,
  DELETE_PROJECT,
} from "./../../types";

const ProjectReducer: Reducer<ContextProjectI, ReducerAction> = (
  state,
  action
) => {
  switch (action.type) {
    case PROJECT_FORM:
      return {
        ...state,
        form: true,
      };
    case GET_PROJECTS:
      return {
        ...state,
        projects: action.payload,
      };
    case ADD_PROJECT:
      return {
        ...state,
        projects: [...state.projects, action.payload],
        form: false,
        errorForm: false,
      };
    case VALIDATE_FORM:
      return {
        ...state,
        errorForm: true,
      };
    case CURRENT_PROJECT:
      return {
        ...state,
        project: state.projects.find(
          (project: any) => project.id === action.payload
        ),
      };
    case DELETE_PROJECT:
      return {
        ...state,
        projects: state.projects.filter(
          (project: any) => project.id !== action.payload
        ),
        project: null,
      };
    default:
      return state;
  }
};

export default ProjectReducer;
