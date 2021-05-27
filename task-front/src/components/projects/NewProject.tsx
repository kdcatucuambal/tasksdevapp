import React, { Fragment, useState } from "react";
import { useContext } from "react";
import projectContext from "../../context/projects/projectContext";

const NewProject = () => {
  const projectsContext = useContext(projectContext);
  const { form, errorForm, showFormFn, addProjectFn, showErrorFn } =
    projectsContext;

  //State
  const [project, setProject] = useState<{ name: string }>({
    name: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProject({ ...project, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    //Validate
    if (project.name === "") {
      showErrorFn();
      return null;
    }
    //Add state
    addProjectFn(project);

    //Reset form
    setProject({
      name: "",
    });
  };

  return (
    <Fragment>
      <button
        type="button"
        className="btn btn-block btn-primario"
        onClick={() => {
          showFormFn();
        }}
      >
        New project
      </button>
      {form ? (
        <form onSubmit={handleSubmit} className="formulario-nuevo-proyecto">
          <input
            type="text"
            className="input-text"
            placeholder="Name project"
            name="name"
            onChange={handleChange}
            value={project.name}
          />
          <input
            type="submit"
            className="btn btn-primario btn-block"
            value="Add Project"
          />
        </form>
      ) : null}

      {errorForm ? <p className="mensaje error">Name is required!</p> : null}
    </Fragment>
  );
};

export default NewProject;
