import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import "./Stars.css";

function Stars({ user }) {
  return !user ? (
    <React.Fragment>
      <div className="stars"></div>
      <div className="stars2"></div>
      <div className="stars3"></div>
      <div className="stars4"></div>
    </React.Fragment>
  ) : (
    ""
  );
}

Stars.propTypes = {
  user: PropTypes.object,
};

function mapStateToProps(state) {
  const { user } = state.app;
  return { user };
}

export default connect(mapStateToProps)(Stars);
