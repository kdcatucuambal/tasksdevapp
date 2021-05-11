import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Projects from "./components/projects/Projects";
import Login from "./components/auth/Login";
import NewAccount from "./components/auth/NewAccount";

import ProjectState from "./context/projects/projectState";
import TaskState from "./context/tasks/taskState";

function App() {
  return (
    <ProjectState>
      <TaskState>
        <Router>
          <Switch>
            <Route exact path="/" component={Login}></Route>
            <Route exact path="/new-account" component={NewAccount}></Route>
            <Route exact path="/projects" component={Projects}></Route>
          </Switch>
        </Router>
      </TaskState>
    </ProjectState>
  );
}

export default App;
