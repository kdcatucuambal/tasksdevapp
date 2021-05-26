import { ProjectI } from "../../models/task.model";
import projectContext from "../../context/projects/projectContext";
import taskContext from "../../context/tasks/taskContext";
import { useContext } from "react";
interface Props {
  project: ProjectI;
}

const Project = ({ project }: Props) => {
  // Get projects state
  const projectsContext = useContext(projectContext);
  const { currentProjectFn } = projectsContext;

  //Get project tasks
  const _taskContext = useContext(taskContext);
  const { getTaskByProjectFn, selectTaskFn } = _taskContext;
  //Function for add project
  const handleSelectProject = (id: string) => {
    currentProjectFn(id);
    selectTaskFn(null);
    getTaskByProjectFn(id); //Filter tasks
  };

  return (
    <li>
      <button
        type="button"
        className="btn btn-blank"
        onClick={() => handleSelectProject(project._id)}
      >
        {project.name}
      </button>
    </li>
  );
};

export default Project;
