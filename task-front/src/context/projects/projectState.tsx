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
  ERROR_PROJECT,
} from "./../../types";
import { ProjectI } from "../../models/task.model";
import { ContextProjectI } from "../../models/task.context";
import axiosCustomer from "../../config/axios.config";

//UPPERCASSE
const ProjectState = (props: any) => {
  const initialState: ContextProjectI = {
    form: false,
    projects: [],
    project: null,
    errorForm: false,
    alert: null,
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
  const getProjectsFn = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      return;
    }

    try {
      const response = await axiosCustomer.get("/projects");
      const projects: ProjectI[] = response.data;
      dispatch({
        type: GET_PROJECTS,
        payload: projects,
      });
    } catch (error) {
      dispatch({
        type: ERROR_PROJECT,
        payload: {
          message: "There is an error in projects",
          category: "alerta-error",
        },
      });
    }
  };

  //Add new project
  const addProjectFn = async (project: ProjectI) => {
    try {
      const response = await axiosCustomer.post("/projects", project);

      dispatch({
        type: ADD_PROJECT,
        payload: response.data,
      });
    } catch (error) {
      dispatch({
        type: ERROR_PROJECT,
        payload: {
          message: "There is an error add",
          category: "alerta-error",
        },
      });
    }
  };
  //Show error if project field is blank
  const showErrorFn = () => {
    dispatch({
      type: VALIDATE_FORM,
    });
  };

  //Select project that user clicked on
  const currentProject = (projectId: string) => {
    if (projectId === null) {
      dispatch({
        type: CURRENT_PROJECT,
        payload: null,
      });
      return;
    }
    dispatch({
      type: CURRENT_PROJECT,
      payload: projectId,
    });
  };

  //Delete a project when user do click
  const deleteProjectFn = async (projectId: string) => {
    try {
      const response = await axiosCustomer.delete(`/projects/${projectId}`);
      const { deleted }: { deleted: number } = response.data;
      if (deleted !== 0) {
        dispatch({
          type: DELETE_PROJECT,
          payload: projectId,
        });
      }
    } catch (error) {
      dispatch({
        type: ERROR_PROJECT,
        payload: {
          message: "There is an error",
          category: "alerta-error",
        },
      });
    }
  };

  return (
    <projectContext.Provider
      value={{
        form: state.form,
        projects: state.projects,
        errorForm: state.errorForm,
        project: state.project,
        alert: state.alert,
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
