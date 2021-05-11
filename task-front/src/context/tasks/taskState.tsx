import { useReducer } from "react";
import { ContextTaskI } from "../../models/task.context";
import { TaskI } from "../../models/task.model";
import {
  PROJECT_TASKS,
  ADD_TASK,
  VALIDATE_TASK,
  DELETE_TASK,
  STATE_TASK,
  CURRENT_TASK,
  UPDATE_TASK,
} from "../../types";
import TaskContext from "./../../context/tasks/taskContext";
import TaskReducer from "./../../context/tasks/taskReducer";

const TaskState = (props: any) => {
  const initalState: ContextTaskI = {
    tasks: [
      { id: "T1", name: "Select platform", state: false, projectId: "P001" },
      { id: "T2", name: "Deploy test", state: true, projectId: "P001" },
      { id: "T3", name: "Check database", state: true, projectId: "P003" },
      { id: "T4", name: "Select hosting", state: false, projectId: "P002" },
      { id: "T5", name: "Select Web App", state: false, projectId: "P001" },
      {
        id: "T6",
        name: "Deploy Server Testing",
        state: true,
        projectId: "P001",
      },
      { id: "T7", name: "Create Database", state: true, projectId: "P003" },
      {
        id: "T8",
        name: "Learn new technologies",
        state: false,
        projectId: "P002",
      },
    ],
    projectTasks: [],
    errorTask: false,
    taskSelected: null,
    addNewTaskFn: () => {},
    getTaskByProjectFn: () => {},
    showErrorTaskFn: () => {},
    deleteTaskFn: () => {},
    changeTaskStateFn: () => {},
    selectTaskFn: () => {},
    updateTaskFn: () => {},
  };

  const [state, dispatch] = useReducer(TaskReducer, initalState);

  //Functions

  //Get project tasks
  const getTaskByProjectFn = (id: string) => {
    dispatch({ type: PROJECT_TASKS, payload: id });
  };

  //Add new task
  const addNewTaskFn = (task: TaskI) => {
    dispatch({ type: ADD_TASK, payload: task });
  };

  //Validate task form
  const showErrorTaskFn = () => {
    dispatch({
      type: VALIDATE_TASK,
    });
  };

  //Delete task
  const deleteTaskFn = (taskId: string) => {
    dispatch({
      type: DELETE_TASK,
      payload: taskId,
    });
  };

  //Change task state
  const changeTaskStateFn = (task: TaskI) => {
    dispatch({
      type: STATE_TASK,
      payload: task,
    });
  };

  //Extract task for edit
  const selectTaskFn = (task: TaskI) => {
    dispatch({
      type: CURRENT_TASK,
      payload: task,
    });
  };

  //Edit task
  const updateTaskFn = (task: TaskI) => {
    dispatch({
      type: UPDATE_TASK,
      payload: task,
    });
  };

  return (
    <TaskContext.Provider
      value={{
        tasks: state.tasks,
        projectTasks: state.projectTasks,
        errorTask: state.errorTask,
        taskSelected: state.taskSelected,
        getTaskByProjectFn,
        addNewTaskFn,
        showErrorTaskFn,
        deleteTaskFn,
        changeTaskStateFn,
        selectTaskFn,
        updateTaskFn,
      }}
    >
      {props.children}
    </TaskContext.Provider>
  );
};

export default TaskState;
