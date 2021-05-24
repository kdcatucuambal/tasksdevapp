import { Reducer } from "react";
import { ContextAlertI, ReducerAction } from "../../models/task.context";
import { HIDDEN_ALERT, SHOW_ALERT } from "../../types";

const AlertReducer: Reducer<ContextAlertI, ReducerAction> = (state, action) => {
  switch (action.type) {
    case SHOW_ALERT:
      return { ...state, alert: action.payload };
    case HIDDEN_ALERT:
      return { ...state, alert: null };
    default:
      return state;
  }
};

export default AlertReducer;
