import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Route, Redirect } from "react-router-dom";

function PublicRoute({ children, user, ...rest }) {
  return (
    <Route
      {...rest}
      render={({ location }) =>
        !user ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/dashboard",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
}

PublicRoute.propTypes = {
  user: PropTypes.object,
};

function mapStateToProps(state) {
  const { user } = state.app;
  return { user };
}

export default connect(mapStateToProps)(PublicRoute);
