import { useReducer } from "react";
import axiosCustomer from "../../config/axios.config";
import { ContextTaskI } from "../../models/task.context";
import { TaskI, TaskNewI } from "../../models/task.model";
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
    tasks: [],
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
  const getTaskByProjectFn = async (id: string) => {
    if (id === null) {
      dispatch({ type: PROJECT_TASKS, payload: [] });
      return;
    }

    try {
      const response = await axiosCustomer.get(`/tasks/${id}`);
      const tasks: TaskI[] = response.data;

      dispatch({ type: PROJECT_TASKS, payload: tasks });
    } catch (error) {
      console.log(error);
    }
  };

  //Add new task
  const addNewTaskFn = async (taskNew: TaskNewI) => {
    try {
      const response = await axiosCustomer.post("/tasks", taskNew);
      const task: TaskI = response.data;
      dispatch({ type: ADD_TASK, payload: task });
    } catch (error) {
      console.log(error);
    }
  };

  //Validate task form
  const showErrorTaskFn = () => {
    dispatch({
      type: VALIDATE_TASK,
    });
  };

  //Delete task
  const deleteTaskFn = async (taskId: string) => {
    try {
      const response = await axiosCustomer.delete(`/tasks/${taskId}`);
      const { deleted }: { deleted: number } = response.data;
      if (deleted !== 0) {
        dispatch({
          type: DELETE_TASK,
          payload: taskId,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  //Change task state
  const changeTaskStateFn = async (task: TaskI) => {
    try {
      const response = await axiosCustomer.patch(`/tasks/${task._id}`, {
        state: task.state,
      });
      const taskEdited = response.data;
      dispatch({
        type: STATE_TASK,
        payload: taskEdited,
      });
    } catch (error) {
      console.log(error);
    }
  };

  //Extract task for edit
  const selectTaskFn = (task: TaskI) => {
    if (task === null) {
      dispatch({
        type: CURRENT_TASK,
        payload: null,
      });
      return;
    }

    dispatch({
      type: CURRENT_TASK,
      payload: task,
    });
  };

  //Edit task
  const updateTaskFn = async (task: TaskI) => {
    try {
      const response = await axiosCustomer.put(`/tasks/${task._id}`, {
        name: task.name,
      });
      const taskEdited = response.data;

      dispatch({
        type: UPDATE_TASK,
        payload: taskEdited,
      });
    } catch (error) {
      console.log(error);
    }
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
