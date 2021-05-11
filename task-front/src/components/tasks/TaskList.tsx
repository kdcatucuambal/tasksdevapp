import { Fragment } from "react";
import { useContext } from "react";

import projectContext from "../../context/projects/projectContext";
import taskContext from "../../context/tasks/taskContext";

import { TransitionGroup, CSSTransition } from "react-transition-group";

import Task from "./Task";
const TaskList = () => {
  const projectsContext = useContext(projectContext);
  const { project, deleteProjectFn } = projectsContext;

  const { projectTasks } = useContext(taskContext);

  if (!project) {
    return <h2>Select a project</h2>;
  }

  return (
    <Fragment>
      <h2>Project: {project.name}</h2>
      <ul className="listado-tareas">
        {projectTasks.length === 0 ? (
          <li className="tarea">
            <p>There are no tasks</p>
          </li>
        ) : (
          <TransitionGroup>
            {projectTasks.map((task) => (
              <CSSTransition key={task.id} timeout={200} classNames="tarea">
                <Task task={task}></Task>
              </CSSTransition>
            ))}
          </TransitionGroup>
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
