import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { changePassword } from "../../services/auth";
import { withRouter, Link } from "react-router-dom";
import {
  REQUEST_SENT,
  REQUEST_FINISHED,
  NOTIFY_USER,
} from "../../store/actions";

class ChangePassword extends React.Component {
  state = {
    password: "",
    newPassword: "",
    confirmPassword: "",
  };

  async handleSubmitClick(e) {
    e.preventDefault();
    const { history, dispatch } = this.props;

    if (this.state.newPassword !== this.state.confirmPassword)
      dispatch({
        type: NOTIFY_USER,
        notification: { type: "error", message: "Passwords do not match" },
      });

    try {
      dispatch({ type: REQUEST_SENT });
      await changePassword(this.state.password, this.state.newPassword);
      dispatch({
        type: NOTIFY_USER,
        notification: {
          type: "success",
          message: "Password was successfully changed",
        },
      });
      history.replace("/profile");
    } catch (e) {
      dispatch({
        type: NOTIFY_USER,
        notification: { type: "error", message: e.message },
      });
    } finally {
      dispatch({ type: REQUEST_FINISHED });
    }
  }

  handleInputChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { loading } = this.props;
    return (
      <div className="flex justify-center items-center w-full h-full mt-8">
        <form
          className="bg-white shadow-lg rounded px-8 pt-6 pb-8 mb-4 lg:w-1/4 md:w-1/3 sm:w-1/2"
          onSubmit={this.handleSubmitClick.bind(this)}
        >
          <h1 className="block uppercase tracking-wide text-teal-800 font-bold text-center pb-2">
            RESET PASSWORD
          </h1>

          <div className="border-t-2 border-gray-300 pt-5">
            <div className="w-full ">
              <label
                className="block uppercase tracking-wide text-teal-800 text-xs font-bold mb-2"
                htmlFor="password"
              >
                Current Password
              </label>
              <input
                className="appearance-none block w-full bg-gray-100 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                name="password"
                value={this.state.password}
                onChange={this.handleInputChange.bind(this)}
                type="password"
                placeholder="**********"
                required
              />
            </div>

            <div className="w-full ">
              <label
                className="block uppercase tracking-wide text-teal-800 text-xs font-bold mb-2"
                htmlFor="newPassword"
              >
                New PassWord
              </label>
              <input
                className="appearance-none block w-full bg-gray-100 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                name="newPassword"
                value={this.state.newPassword}
                onChange={this.handleInputChange.bind(this)}
                type="password"
                placeholder="**********"
                required
              />
            </div>

            <div className="w-full ">
              <label
                className="block uppercase tracking-wide text-teal-800 text-xs font-bold mb-2"
                htmlFor="confirmPassword"
              >
                Confirm New Password
              </label>
              <input
                className="appearance-none block w-full bg-gray-100 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                name="confirmPassword"
                value={this.state.confirmPassword}
                onChange={this.handleInputChange.bind(this)}
                type="password"
                placeholder="**********"
                required
              />
            </div>

            <div className="flex items-center justify-start">
              <button
                className="tooltip mt-2 mr-2 bg-teal-400 hover:bg-teal-500 text-white font-bold py-1 px-3 rounded focus:outline-none focus:shadow-outline"
                type="submit"
                disabled={loading}
              >
                <span className="tooltiptext">Submit</span>
                <i className="fas fa-check-double"> </i>
              </button>
              <Link
                className="tooltip mt-2 bg-red-400 hover:bg-red-500 text-white font-bold py-1 px-3 rounded focus:outline-none focus:shadow-outline"
                type="button"
                to="/profile"
              >
                <span className="tooltiptext">Cancel</span>
                <i className="fas fa-times"></i>
              </Link>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

ChangePassword.propTypes = {
  dispatch: PropTypes.func.isRequired,
  loading: PropTypes.bool,
  user: PropTypes.object,
  location: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  const { loading, user } = state.app;
  return { loading, user };
}

export default connect(mapStateToProps)(withRouter(ChangePassword));
