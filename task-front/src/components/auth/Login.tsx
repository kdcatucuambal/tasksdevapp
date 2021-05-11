import React, { useState } from "react";
import { LoginUserI } from "../../models/task.model";
import { Link } from "react-router-dom";

const Login = () => {
  //state login
  const [user, setUser] = useState<LoginUserI>({ email: "", password: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(user);
  };

  return (
    <div className="form-usuario">
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
        </Link>
      </div>
    </div>
  );
};

export default Login;
