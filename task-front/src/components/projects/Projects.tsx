import Sidebar from "../layout/Sidebar";
import Bar from "../layout/Bar";
import TaskForm from "./../tasks/TaskForm";
import TaskList from "./../tasks/TaskList";

const Projects = () => {
  return (
    <div className="contenedor-app">
      <Sidebar></Sidebar>
      <div className="seccion-principal">
        <Bar></Bar>
        <main>
          <TaskForm />
          <div className="contenedor-tareas">
            <TaskList />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Projects;
