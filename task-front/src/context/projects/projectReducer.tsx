import { Reducer } from "react";
import { ContextProjectI, ReducerAction } from "../../models/task.context";
import { ProjectI } from "../../models/task.model";
import {
  PROJECT_FORM,
  GET_PROJECTS,
  ADD_PROJECT,
  VALIDATE_FORM,
  CURRENT_PROJECT,
  DELETE_PROJECT,
  ERROR_PROJECT,
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
      if (action.payload === null) {
        return {
          ...state,
          project: null,
          
        };
      }
      return {
        ...state,
        project: state.projects.find(
          (project: ProjectI) => project._id === action.payload
        ),
      };
    case DELETE_PROJECT:
      return {
        ...state,
        projects: state.projects.filter(
          (project: ProjectI) => project._id !== action.payload
        ),
        project: null,
      };
    case ERROR_PROJECT:
      return { ...state, alert: action.payload };
    default:
      return state;
  }
};

export default ProjectReducer;
