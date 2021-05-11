import { Reducer } from "react";
import { ContextTaskI, ReducerAction } from "../../models/task.context";
import {
  ADD_TASK,
  CURRENT_TASK,
  DELETE_TASK,
  PROJECT_TASKS,
  STATE_TASK,
  UPDATE_TASK,
  VALIDATE_TASK,
} from "../../types";

const TaskReducer: Reducer<ContextTaskI, ReducerAction> = (state, action) => {
  switch (action.type) {
    case PROJECT_TASKS:
      return {
        ...state,
        projectTasks: state.tasks.filter(
          (task) => task.projectId === action.payload
        ),
      };
    case ADD_TASK:
      return {
        ...state,
        tasks: [action.payload, ...state.tasks],
        errorTask: false,
      };
    case VALIDATE_TASK:
      return {
        ...state,
        errorTask: true,
      };
    case DELETE_TASK:
      return {
        ...state,
        tasks: state.tasks.filter((task) => task.id !== action.payload),
      };
    case UPDATE_TASK:
    case STATE_TASK:
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === action.payload.id ? action.payload : task
        ),
        taskSelected: null,
      };
    case CURRENT_TASK:
      return {
        ...state,
        taskSelected: action.payload,
      };

    default:
      return state;
  }
};

export default TaskReducer;
