import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { NewUserI } from "../../models/task.model";
import { UtilTask } from "../../util/util.task";

const NewAccount = () => {
  const [newUser, setNewUser] = useState<NewUserI>({
    confirm: "",
    email: "",
    name: "",
    password: "",
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    //Validate fields

    //Password minium 6 characters and validate
    const validPassword = UtilTask.arePasswordsValidated(
      newUser.password,
      newUser.confirm
    );

    //Pass to action
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
  };

  return (
    <div className="form-usuario">
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
              placeholder="Put a password"
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
