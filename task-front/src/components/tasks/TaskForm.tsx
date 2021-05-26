import React, { useContext, useEffect, useState } from "react";
import projectContext from "../../context/projects/projectContext";
import taskContext from "../../context/tasks/taskContext";

const TaskForm = () => {
  //State project from context
  const projectsContext = useContext(projectContext);
  const { project } = projectsContext;

  //State tasks from context
  const {
    addNewTaskFn,
    showErrorTaskFn,
    errorTask,
    getTaskByProjectFn,
    taskSelected,
    updateTaskFn,
  } = useContext(taskContext);

  //State form local
  const [taskName, setTaskName] = useState("");

  //Effect for task selected
  useEffect(() => {
    if (taskSelected !== null) {
      setTaskName(taskSelected.name);
    } else {
      setTaskName("");
    }
  }, [taskSelected]);
  if (!project) {
    return null;
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTaskName(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    //Validate
    if (taskName.trim() === "") {
      showErrorTaskFn();
      return null;
    }

    //Edit or New
    if (taskSelected === null) {
      addNewTaskFn({
        name: taskName,
        project: project._id,
      });
    } else {
      //Update task

      updateTaskFn({ ...taskSelected, name: taskName });
    }

    //Reset form
    setTaskName("");
    getTaskByProjectFn(project._id);
  };

  return (
    <div className="formulario">
      <form onSubmit={handleSubmit}>
        <div className="contenedor-input">
          <input
            type="text"
            className="input-text"
            placeholder="Task name ..."
            name="name"
            onChange={handleChange}
            value={taskName}
          />
        </div>
        <div className="contenedor-input">
          <input
            type="submit"
            className="btn btn-primario btn-submit btn-block"
            value={taskSelected ? "Update task" : "Add task"}
          />
        </div>
      </form>
      {errorTask ? (
        <p className="mensaje error"> Task name is required!</p>
      ) : null}
    </div>
  );
};

export default TaskForm;
