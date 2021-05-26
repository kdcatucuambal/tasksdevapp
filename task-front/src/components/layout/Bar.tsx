import { useContext, useEffect } from "react";
import AuthContext from "../../context/authentication/authContext";
import ProjectContext from "../../context/projects/projectContext";
import TaskContext from "../../context/tasks/taskContext";
const Bar = () => {
  const { userLoggedFn, logoutFn, user } = useContext(AuthContext);
  const { currentProjectFn } = useContext(ProjectContext);
  const { getTaskByProjectFn } = useContext(TaskContext);
  useEffect(() => {
    userLoggedFn();
    // eslint-disable-next-line
  }, []);

  const logout = () => {
    currentProjectFn(null);
    getTaskByProjectFn(null);
    logoutFn();
  };

  return (
    <header className="app-header">
      {user ? (
        <p className="nombre-usuario">
          Hello <span>{user.name}</span>
        </p>
      ) : null}

      <nav className="nav-principal">
        <button className="btn btn-blank cerrar-sesion" onClick={logout}>
          Logout
        </button>
      </nav>
    </header>
  );
};

export default Bar;
