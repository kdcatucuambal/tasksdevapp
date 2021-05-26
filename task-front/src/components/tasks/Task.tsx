import { useContext } from "react";
import { TaskI } from "../../models/task.model";
import taskContext from "../../context/tasks/taskContext";
interface Props {
  task: TaskI;
}

const Task = ({ task }: Props) => {
  const { deleteTaskFn, getTaskByProjectFn, changeTaskStateFn, selectTaskFn } =
    useContext(taskContext);

  const handleDeleteTask = (taskId: string) => {
    const res = window.confirm("Are you sure to delete the task?");
    if (res) {
      deleteTaskFn(taskId);
      getTaskByProjectFn(task.project);
    }
  };

  const handleChangeState = (task: TaskI) => {
    if (task.state) {
      task.state = false;
    } else {
      task.state = true;
    }

    changeTaskStateFn(task);
  };

  const selectTask = (task: TaskI) => {
    selectTaskFn(task);
  };

  return (
    <li className="tarea sombra">
      <p>{task.name}</p>
      <div className="estado">
        {task.state ? (
          <button
            onClick={() => handleChangeState(task)}
            type="button"
            className="completo"
          >
            Complete
          </button>
        ) : (
          <button
            onClick={() => handleChangeState(task)}
            type="button"
            className="incompleto"
          >
            Incomplete
          </button>
        )}
      </div>
      <div className="acciones">
        <button
          type="button"
          className="btn btn-primario"
          onClick={() => selectTask(task)}
        >
          Edit
        </button>
        <button
          onClick={() => handleDeleteTask(task._id)}
          type="button"
          className="btn btn-secundario"
        >
          Delete
        </button>
      </div>
    </li>
  );
};

export default Task;
