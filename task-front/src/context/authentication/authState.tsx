import { ProviderProps, useReducer } from "react";
import authContext from "./authContext";

import tokenAuth from "../../config/token.config";
import {
  REGISTER_ERROR,
  REGISTER_SUCCESS,
  GET_USER,
  LOGIN_ERROR,
  LOGIN_SUCCESS,
  LOGOUT,
} from "../../types";
import AuthReducer from "./authReducer";
import axiosCustomer from "../../config/axios.config";
import { LoginUserI, NewUserI, UserLog } from "../../models/task.model";
import { ContextAuthI } from "../../models/task.context";

const AuthState = (props: ProviderProps<any>) => {
  const initialState: ContextAuthI = {
    token: localStorage.getItem("token"),
    authenticated: null,
    user: null,
    alert: null,
    loading: true,
    registerUserFn: () => {},
    loginUserFn: () => {},
    userLoggedFn: () => {},
    logoutFn: () => {},
  };

  //useReducer, Pass reducer implementation and init values of state
  const [state, dispatch] = useReducer(AuthReducer, initialState);

  //Function to register new user in the database
  const registerUserFn = async (data: NewUserI) => {
    try {
      const response = await axiosCustomer.post("/users", data);
      const userLogg: UserLog = response.data;
      dispatch({
        type: REGISTER_SUCCESS,
        payload: userLogg,
      });
      //Get user registered
      userLoggedFn();
    } catch (error) {
      const errorAlert = {
        message: "Registration data not available",
        category: "alerta-error",
      };
      dispatch({
        type: REGISTER_ERROR,
        payload: errorAlert,
      });
    }
  };

  //Function to return user registered
  const userLoggedFn = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      tokenAuth(token);
    } else {
      dispatch({
        type: LOGIN_ERROR,
      });
      return;
    }
    try {
      const response = await axiosCustomer.get("/users/logged");
      dispatch({
        type: GET_USER,
        payload: response.data,
      });
    } catch (error) {
      dispatch({
        type: LOGIN_ERROR,
      });
    }
  };

  //When user init session
  const loginUserFn = async (data: LoginUserI) => {
    try {
      const response = await axiosCustomer.post("/auth/login", data);
      const userLogg: UserLog = response.data;
      dispatch({
        type: LOGIN_SUCCESS,
        payload: userLogg,
      });
      userLoggedFn();
    } catch (error) {
      const errorAlert = {
        message: "User not found",
        category: "alerta-error",
      };
      dispatch({
        type: LOGIN_ERROR,
        payload: errorAlert,
      });
    }
  };

  //Close session
  const logoutFn = () => {
    dispatch({
      type: LOGOUT,
    });
  };

  return (
    <authContext.Provider
      value={{
        token: state.token,
        authenticated: state.authenticated,
        user: state.user,
        alert: state.alert,
        loading: state.loading,
        registerUserFn,
        loginUserFn,
        userLoggedFn,
        logoutFn,
      }}
    >
      {props.children}
    </authContext.Provider>
  );
};

export default AuthState;
