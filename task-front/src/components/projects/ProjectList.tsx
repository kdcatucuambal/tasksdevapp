import React, { useContext, useEffect } from "react";
import { ProjectI } from "../../models/task.model";
import Project from "./Project";
import projectContext from "../../context/projects/projectContext";

const ProjectList = () => {
  //Extract projects from init state
  const projectsContext = useContext(projectContext);
  const { projects, getProjectsFn } = projectsContext;
  useEffect(() => {
    getProjectsFn();
  }, []);

  if (projects.length === 0) {
    return <p>There are no projects!</p>;
  }

  return (
    <ul className="listado-proyecto">
      {projects.map((project) => (
        <Project key={project.id} project={project} />
      ))}
    </ul>
  );
};

export default ProjectList;
