import React from "react";
import { Route, Redirect } from "react-router-dom";

const AuthRoute = ({
  component: Component,
  condition,
  to = "/404",
  ...rest
}) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        condition ? (
          <Component {...props} />
        ) : (
          <Redirect to={to} />
        )
      }
    />
  );
};

export default AuthRoute