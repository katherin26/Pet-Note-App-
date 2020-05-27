import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import "./Footer.css";

function Footer({ user }) {
  let footerClasses =
    "flex justify-center fixed bottom-0 left-0 w-full p-2 text-white ";
  footerClasses += !user ? "bg-transparent" : "bg-teal-600";
  return (
    <div className={footerClasses}>
      <div className="w-auto">
        <p>
          <strong>
            <i className="far fa-copyright"></i> <i className="fas fa-paw"></i>
            Pet-Note
          </strong>{" "}
          Created By <strong>Katherin Ochoa</strong> <strong>2020</strong>
        </p>
      </div>
    </div>
  );
}

Footer.propTypes = {
  user: PropTypes.object,
};

function mapStateToProps(state) {
  const { user } = state.app;
  return { user };
}

export default connect(mapStateToProps)(Footer);
