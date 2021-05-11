import { useReducer } from "react";
import projectContext from "./projectContext";
import projectReducer from "./projectReducer";
import {
  PROJECT_FORM,
  GET_PROJECTS,
  ADD_PROJECT,
  VALIDATE_FORM,
  CURRENT_PROJECT,
  DELETE_PROJECT,
} from "./../../types";
import { ProjectI } from "../../models/task.model";
import { generate } from "short-uuid";
import { ContextProjectI, PropsInitState } from "../../models/task.context";

//UPPERCASSE
const ProjectState = (props: any) => {
  const projects = [
    { id: "P001", name: "Virtual Store" },
    { id: "P002", name: "Web Design" },
    { id: "P003", name: "Homework" },
  ];

  const initialState: ContextProjectI = {
    form: false,
    projects: [],
    project: null,
    errorForm: false,
    addProjectFn: () => {},
    currentProjectFn: () => {},
    deleteProjectFn: () => {},
    getProjectsFn: () => {},
    showErrorFn: () => {},
    showFormFn: () => {},
  };

  //Dispatch for ejecute actions
  const [state, dispatch] = useReducer(projectReducer, initialState);

  //CRUD FUNCTIONS

  //Show project form
  const showFormFn = () => {
    dispatch({ type: PROJECT_FORM });
  };

  //Get projects
  const getProjectsFn = () => {
    console.log("Function get projects");

    dispatch({ type: GET_PROJECTS, payload: projects });
  };

  //Add new project
  const addProjectFn = (project: ProjectI) => {
    project.id = generate();
    //Insert project in the state
    dispatch({
      type: ADD_PROJECT,
      payload: project,
    });
  };
  //Show error if project field is blank
  const showErrorFn = () => {
    dispatch({
      type: VALIDATE_FORM,
    });
  };

  //Select project that user clicked on
  const currentProject = (projectId: string) => {
    dispatch({
      type: CURRENT_PROJECT,
      payload: projectId,
    });
  };

  //Delete a project when user do click
  const deleteProjectFn = (projectId: string) => {
    dispatch({
      type: DELETE_PROJECT,
      payload: projectId,
    });
  };

  return (
    <projectContext.Provider
      value={{
        form: state.form,
        projects: state.projects,
        errorForm: state.errorForm,
        project: state.project,
        getProjectsFn,
        addProjectFn,
        showErrorFn,
        showFormFn,
        currentProjectFn: currentProject,
        deleteProjectFn,
      }}
    >
      {/* props.children: Indicate children componentes */}
      {props.children}
    </projectContext.Provider>
  );
};

export default ProjectState;
