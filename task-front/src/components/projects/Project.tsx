import { ProjectI } from "../../models/task.model";
import projectContext from "../../context/projects/projectContext";
import { useContext } from "react";
interface Props {
  project: ProjectI;
}

const Project = ({ project }: Props) => {
  const projectsContext = useContext(projectContext);
  const { currentProjectFn } = projectsContext;
  return (
    <li>
      <button
        type="button"
        className="btn btn-blank"
        onClick={() => currentProjectFn(project.id)}
      >
        {project.name}
      </button>
    </li>
  );
};

export default Project;
