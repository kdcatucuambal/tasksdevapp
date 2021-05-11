import { Fragment } from "react";
import { TaskI } from "../../models/task.model";
import { useContext } from "react";

import projectContext from "../../context/projects/projectContext";
import { ProjectI } from "../../models/task.model";
import Task from "./Task";
const TaskList = () => {
  const projectsContext = useContext(projectContext);
  const { project, deleteProjectFn } = projectsContext;

  const tasks: TaskI[] = [
    { id: "T1", name: "Select platform", state: false },
    { id: "T2", name: "Deploy test", state: true },
    { id: "T3", name: "Check database", state: true },
    { id: "T4", name: "Select hosting", state: false },
  ];

  if (!project) {
    return <h2>Select a project</h2>;
  }

  return (
    <Fragment>
      <h2>Project: {project.name}</h2>
      <ul className="listado-tareas">
        {tasks.length === 0 ? (
          <li className="tarea">
            <p>There are no tasks</p>
          </li>
        ) : (
          tasks.map((task) => <Task key={task.id} task={task}></Task>)
        )}
      </ul>
      <button
        type="button"
        className="btn btn-eliminar"
        onClick={() => deleteProjectFn(project.id)}
      >
        Delete project
      </button>
    </Fragment>
  );
};

export default TaskList;
