import { BrowserRouter as Router, Switch } from "react-router-dom";
import Projects from "./components/projects/Projects";
import Login from "./components/auth/Login";
import NewAccount from "./components/auth/NewAccount";

import ProjectState from "./context/projects/projectState";
import TaskState from "./context/tasks/taskState";
import AlertState from "./context/alerts/alertState";
import AuthState from "./context/authentication/authState";
import tokenAuth from "./config/token.config";
import PrivateRoute from "./components/routes/PrivateRoute";
import LoginRoute from "./components/routes/LoginRoute";
//check token
const token = localStorage.getItem("token");
if (token) {
  tokenAuth(token);
}

function App() {
  return (
    <ProjectState>
      <TaskState>
        <AlertState>
          <AuthState value={null}>
            <Router>
              <Switch>
                <LoginRoute exact path="/" component={Login}></LoginRoute>
                <LoginRoute
                  exact
                  path="/new-account"
                  component={NewAccount}
                ></LoginRoute>
                <PrivateRoute
                  exact
                  path="/projects"
                  component={Projects}
                ></PrivateRoute>
              </Switch>
            </Router>
          </AuthState>
        </AlertState>
      </TaskState>
    </ProjectState>
  );
}

export default App;
