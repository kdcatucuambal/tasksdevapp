import { useReducer } from "react";
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
import { NewUserI, UserLog } from "../../models/task.model";
import { ContextAuthI } from "../../models/task.context";

const AuthState = (props) => {
  const initialState: ContextAuthI = {
    token: localStorage.getItem("token"),
    authenticated: null,
    user: null,
    alert: null,
    registerUser: () => {},
  };

  const [state, dispatch] = useReducer(AuthReducer, initialState);

  const registerUser = async (data: NewUserI) => {
    try {
      const response = await axiosCustomer.post("/users", data);
      const userLogg: UserLog = response.data;
      dispatch({
        type: REGISTER_SUCCESS,
        payload: userLogg,
      });
      //Get user registered
      userLogged();
    } catch (error) {
      console.log(error.response.data);
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

  //Return user logged
  const userLogged = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      tokenAuth(token);
    }

    try {
      const response = await axiosCustomer.get("/users/logged");
     dispatch({
       type: GET_USER,
       payload: response.data
     })
      
    } catch (error) {
      dispatch({
        type: LOGIN_ERROR,
      });
    }
  };

  return (
    <authContext.Provider
      value={{
        token: state.token,
        authenticated: state.authenticated,
        user: state.user,
        alert: state.alert,
        registerUser,
      }}
    >
      {props.children}
    </authContext.Provider>
  );
};

export default AuthState;
