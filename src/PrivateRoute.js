/* eslint-disable react/prop-types */
/* eslint-disable no-constant-condition */
import React from "react";
import PropTypes from "prop-types";

import { Route, Redirect } from "react-router-dom";

function PrivateRoute({ children, isAuth, ...props }) {
  return (
    <Route
      {...props}
      render={({ location }) =>
        isAuth ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/auth",
              state: { from: location }
            }}
          />
        )
      }
    />
  );
}

PrivateRoute.propTypes = {
  children: PropTypes.any.isRequired,
  isAuth: PropTypes.bool.isRequired
};

export default PrivateRoute;
