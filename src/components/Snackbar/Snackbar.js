import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import "./Snackbar.css";
import { CLEAR_NOTIFICATION } from "../../store/actions";

class Snackbar extends React.Component {
  timeoutId = null;

  componentWillUpdate(nextProps) {
    const { dispatch } = this.props;
    if (nextProps.notification) {
      if (this.timeoutId) clearTimeout(this.timeoutId);

      this.timeoutId = setTimeout(() => {
        dispatch({ type: CLEAR_NOTIFICATION });
        clearTimeout(this.timeoutId);
      }, 5500);
    }
  }
  render() {
    const { notification } = this.props;
    return (
      <div id="snackbar" className={notification ? "show" : ""}>
        {notification ? notification.message : ""}
      </div>
    );
  }
}

Snackbar.propTypes = {
  dispatch: PropTypes.func.isRequired,
  notification: PropTypes.object,
};

function mapStateToProps(state) {
  const { notification } = state.app;
  return { notification };
}

export default connect(mapStateToProps)(Snackbar);
