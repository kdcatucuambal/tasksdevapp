import React, { useContext, useEffect, useState } from "react";
import { LoginUserI } from "../../models/task.model";
import { Link, RouterProps } from "react-router-dom";
import AlertContext from "../../context/alerts/alertContext";
import AuthContext from "../../context/authentication/authContext";
import { UtilTask } from "../../util/util.task";


const Login = (props: RouterProps) => {
  //extract context values for alerts
  const { alert, showAlert } = useContext(AlertContext);

  const { alert: alertR, authenticated, loginUserFn } = useContext(AuthContext);


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

  //state login
  const [user, setUser] = useState<LoginUserI>({ email: "", password: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!UtilTask.isFieldsLoginValid(user)) {
      showAlert("User and password are required", "alerta-error");
      return;
    }

    loginUserFn(user);
  };

  return (
    <div className="form-usuario">
      {alert ? (
        <div className={`alerta ${alert.category}`}>{alert.message}</div>
      ) : null}
      <div className="contenedor-form sombra-dark">
        <h1>Sign In</h1>
        <form onSubmit={handleSubmit}>
          <div className="campo-form">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Put your email"
              onChange={handleChange}
              value={user.email}
            />
          </div>
          <div className="campo-form">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Put your password"
              onChange={handleChange}
              value={user.password}
            />
          </div>
          <div className="campo-form">
            <input
              type="submit"
              className="btn btn-primario btn-block"
              value="Sign In"
            />
          </div>
        </form>
        <Link to="/new-account" className="enlace-cuenta">
          Sign Up!
          {console.log("Render login")}
        </Link>
      </div>
    </div>
  );
};

export default Login;
