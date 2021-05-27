import { useContext, useEffect } from "react";
import { Route, Redirect } from "react-router-dom";
import AuthContext from "../../context/authentication/authContext";

const PrivateRoute = ({ component: Component, ...props }) => {
  const { authenticated, userLoggedFn, loading } = useContext(AuthContext);

  useEffect(() => {
    userLoggedFn();
    // eslint-disable-next-line
  }, []);
  return (
    <Route
      {...props}
      render={(props) =>
        !authenticated && !loading ? (
          <Redirect to="/"></Redirect>
        ) : (
          <Component {...props}></Component>
        )
      }
    ></Route>
  );
};

export default PrivateRoute;
