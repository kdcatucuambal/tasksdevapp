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
    case LOGIN_SUCCESS:
      localStorage.setItem("token", action.payload.token);
      return {
        ...state,
        authenticated: true,
        alert: null,
        loading: false,
      };
    case LOGOUT:
    case LOGIN_ERROR:
    case REGISTER_ERROR:
      localStorage.removeItem("token");
      return {
        ...state,
        token: null,
        alert: action.payload,
        user: null,
        authenticated: null,
        loading: false,
      };
    case GET_USER:
      return {
        ...state,
        user: action.payload,
        authenticated: true,
        loading: false,
      };
    default:
      return state;
  }
};

export default AuthReducer;
