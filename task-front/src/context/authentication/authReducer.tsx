import { Reducer } from "react";
import { ContextAuthI, ReducerAction } from "../../models/task.context";

import {
  REGISTER_ERROR,
  REGISTER_SUCCESS,
  GET_USER,
  LOGIN_ERROR,
  LOGIN_SUCCESS,
  LOGOUT,
} from "../../types";

const AuthReducer: Reducer<ContextAuthI, ReducerAction> = (state, action) => {
  switch (action.type) {
    case REGISTER_SUCCESS:
      localStorage.setItem("token", action.payload.token);
      return { ...state, authenticated: true, alert: null };
    case LOGIN_SUCCESS:
      return { ...state, alert: action.payload };
    case LOGIN_ERROR:
    case REGISTER_ERROR:
      localStorage.removeItem("token");
      return { ...state, token: null, alert: action.payload };
    case GET_USER:
      return { ...state, user: action.payload };
    default:
      return state;
  }
};

export default AuthReducer;
