import { useContext, useEffect } from "react";
import { Route, Redirect } from "react-router-dom";
import AuthContext from "../../context/authentication/authContext";

const LoginRoute = ({ component: Component, ...props }) => {
  const { authenticated, userLoggedFn, loading } = useContext(AuthContext);

  useEffect(() => {
    userLoggedFn();
    // eslint-disable-next-line
  }, []);
  console.log("AUTHT: ", authenticated);

  return (
    <Route
      {...props}
      render={(props) =>
        authenticated ? (
          <Redirect to="/projects"></Redirect>
        ) : (
          <Component {...props}></Component>
        )
      }
    ></Route>
  );
};

export default LoginRoute;
