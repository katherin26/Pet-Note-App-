import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logIn } from "../../services/auth";
import { withRouter, Link } from "react-router-dom";
import {
  LOGIN,
  REQUEST_SENT,
  REQUEST_FINISHED,
  NOTIFY_USER,
} from "../../store/actions";

class Login extends React.Component {
  state = {
    email: "",
    password: "",
  };

  async handleLoginClick(e) {
    e.preventDefault();
    const { history, location, dispatch } = this.props;
    const { from } = location.state || { from: { pathname: "/dashboard" } };

    try {
      dispatch({ type: REQUEST_SENT });
      const user = await logIn(this.state.email, this.state.password);
      dispatch({ type: LOGIN, user });
      history.replace(from);
    } catch (e) {
      if (e.code === "UserNotConfirmedException")
        history.replace(`/confirm-signup?email=${this.state.email}`);
      else
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
      <div className="flex justify-center items-center w-full h-full">
        <form
          className="bg-white bg-opacity-50 shadow-md rounded px-8 pt-6 pb-8 mb-4 lg:w-1/4 md:w-1/3 sm:w-1/2"
          onSubmit={this.handleLoginClick.bind(this)}
        >
          <div className="mb-4">
            <label
              className="block text-teal-800 text-sm font-bold mb-2"
              htmlFor="email"
            >
              EMAIL
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              name="email"
              type="email"
              value={this.state.email}
              onChange={this.handleInputChange.bind(this)}
              placeholder="e.g@gmail.com"
              required
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-teal-800 text-sm font-bold mb-2"
              htmlFor="password"
            >
              PASSWORD
            </label>
            <input
              className="shadow appearance-none  border rounded w-full py-3 px-4 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              name="password"
              type="password"
              value={this.state.password}
              onChange={this.handleInputChange.bind(this)}
              placeholder="Enter your password"
              required
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              className="tooltip mt-2 mr-2 bg-teal-400 hover:bg-teal-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              disabled={loading}
              type="submit"
            >
              <span className="tooltiptext">Submit</span>
              <i className="fas fa-check-double" />
            </button>

            <Link
              className="inline-block align-baseline font-bold text-sm  text-red-700 hover:text-white "
              to="/forgot-password"
            >
              Forgot Password?
            </Link>
          </div>
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
  loading: PropTypes.bool,
  location: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  const { loading } = state.app;
  return { loading };
}

export default connect(mapStateToProps)(withRouter(Login));
