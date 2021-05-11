import { useContext } from "react";
import projectContext from "../../context/projects/projectContext";

const TaskForm = () => {
  const projectsContext = useContext(projectContext);
  const { project } = projectsContext;

  if (!project) {
    return null;
  }
  return (
    <div className="formulario">
      <form>
        <div className="contenedor-input">
          <input
            type="text"
            className="input-text"
            placeholder="Task name ..."
            name="name"
          />
        </div>
        <div className="contenedor-input">
          <input
            type="submit"
            className="btn btn-primario btn-submit btn-block"
            value="Add task"
          />
        </div>
      </form>
    </div>
  );
};

export default TaskForm;
