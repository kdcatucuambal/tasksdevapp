import React, { useContext, useEffect } from "react";
import { useState } from "react";
import { Link, RouterProps } from "react-router-dom";
import { NewUserI } from "../../models/task.model";
import { UtilTask } from "../../util/util.task";
import AlertContext from "../../context/alerts/alertContext";
import AuthContext from "../../context/authentication/authContext";

const NewAccount = (props: RouterProps) => {
  //extract context values for alerts
  const { alert, showAlert } = useContext(AlertContext);

  const {
    alert: alertR,
    authenticated,
    registerUserFn,
  } = useContext(AuthContext);

  //Usse efect
  useEffect(() => {
    if (authenticated) {
      props.history.push("/projects");
    }

    if (alertR) {
      showAlert(alertR.message, alertR.category);
    }
    // eslint-disable-next-line
  }, [alertR, authenticated, props.history]);

  const [newUser, setNewUser] = useState<NewUserI>({
    confirm: "",
    email: "",
    name: "",
    password: "",
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    //Validate fields
    if (!UtilTask.isFieldsValidated(newUser)) {
      showAlert("All fields are required!", "alerta-error");
      return;
    }

    //Password minium 6 characters and validate
    const validPassword = UtilTask.arePasswordsValidated(
      newUser.password,
      newUser.confirm
    );
    if (!validPassword) {
      showAlert("Passwords incorrects", "alerta-error");
      return;
    }

    //Pass to action
    registerUserFn(newUser);
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
  };

  return (
    <div className="form-usuario">
      {alert ? (
        <div className={`alerta ${alert.category}`}>{alert.message}</div>
      ) : null}
      <div className="contenedor-form sombra-dark">
        <h1>Sign Up!</h1>
        <form onSubmit={handleSubmit}>
          <div className="campo-form">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Put your name"
              onChange={handleChange}
              value={newUser.name}
            />
          </div>
          <div className="campo-form">
            <label htmlFor="name">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Put your email"
              onChange={handleChange}
              value={newUser.email}
            />
          </div>
          <div className="campo-form">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Put a password of 8 characters"
              onChange={handleChange}
              value={newUser.password}
            />
          </div>
          <div className="campo-form">
            <label htmlFor="confirm">Confirm</label>
            <input
              type="password"
              id="confirm"
              name="confirm"
              placeholder="Password confirmation"
              onChange={handleChange}
              value={newUser.confirm}
            />
          </div>
          <div className="campo-form">
            <input
              type="submit"
              className="btn btn-primario btn-block"
              value="Sign Up!"
            />
          </div>
        </form>
        <Link to="/" className="enlace-cuenta">
          Back Sign In!
        </Link>
      </div>
    </div>
  );
};

export default NewAccount;
