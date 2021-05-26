import { useContext, useEffect } from "react";
import Project from "./Project";
import projectContext from "../../context/projects/projectContext";
import AlertContext from "../../context/alerts/alertContext";

const ProjectList = () => {
  //Extract projects from init state
  const projectsContext = useContext(projectContext);
  const { projects, getProjectsFn, alert } = projectsContext;

  const { alert: alertR, showAlert } = useContext(AlertContext);
  useEffect(() => {
    if (alert) {
      showAlert(alert.message, alert.category);
    }

    getProjectsFn();
    // eslint-disable-next-line
  }, [alert]);

  if (projects.length === 0) {
    return <p>There are no projects!</p>;
  }

  return (
    <ul className="listado-proyecto">
      {alertR ? (
        <div className={`alerta ${alertR.category}`}>{alertR.message}</div>
      ) : null}
      {projects.map((project) => (
        <Project key={project._id} project={project} />
      ))}
    </ul>
  );
};

export default ProjectList;
