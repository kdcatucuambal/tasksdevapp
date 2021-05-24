import { useReducer } from "react";
import { ContextAlertI } from "../../models/task.context";
import { HIDDEN_ALERT, SHOW_ALERT } from "../../types";
import alertContext from "./alertContext";
import alertReducer from "./alertReducer";

const AlertState = (props) => {
  const initialState: ContextAlertI = {
    alert: null,
    showAlert: () => {},
  };

  const [state, dispatch] = useReducer(alertReducer, initialState);

  //functions
  const showAlert = (message: string, category: string) => {
    dispatch({
      type: SHOW_ALERT,
      payload: {
        message,
        category,
      },
    });
    //Clear alert
    setTimeout(() => {
      dispatch({
        type: HIDDEN_ALERT,
      });
    }, 3500);
  };

  return (
    <alertContext.Provider
      value={{
        alert: state.alert,
        showAlert,
      }}
    >
      {props.children}
    </alertContext.Provider>
  );
};

export default AlertState;
