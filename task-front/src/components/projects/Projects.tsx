import Sidebar from "../layout/Sidebar";
import Bar from "../layout/Bar";
import TaskForm from "./../tasks/TaskForm";
import TaskList from "./../tasks/TaskList";
import AuthContext from "../../context/authentication/authContext";
import { useContext, useEffect } from "react";

const Projects = () => {
  //Extract info user
  const { userLoggedFn } = useContext(AuthContext);

  useEffect(() => {
    userLoggedFn();

    // eslint-disable-next-line
  }, []);

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
