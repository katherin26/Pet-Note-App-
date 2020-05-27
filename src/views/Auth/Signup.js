import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { createAccount } from "../../services/auth";
import { withRouter, Link } from "react-router-dom";
import {
  REQUEST_SENT,
  REQUEST_FINISHED,
  NOTIFY_USER,
} from "../../store/actions";

class Signup extends React.Component {
  state = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  async handleSubmitClick(e) {
    e.preventDefault();
    const { history, dispatch } = this.props;

    if (this.state.password !== this.state.confirmPassword)
      return dispatch({
        type: NOTIFY_USER,
        notification: { type: "error", message: "Passwords do not match" },
      });

    try {
      dispatch({ type: REQUEST_SENT });
      await createAccount(
        this.state.email,
        this.state.password,
        this.state.firstName,
        this.state.lastName,
        "avatar1.jpg"
      );

      history.replace(`/confirm-signup?email=${this.state.email}`);
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
      <div className="flex justify-center items-center w-full h-full">
        <form
          className="bg-white bg-opacity-50 shadow-md rounded px-8 pt-6 pb-8 mb-4 lg:w-1/4 md:w-1/3 sm:w-1/2 "
          onSubmit={this.handleSubmitClick.bind(this)}
        >
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label
                className="block uppercase tracking-wide text-teal-800 text-sm font-bold mb-2"
                htmlFor="firstName"
              >
                First Name
              </label>
              <input
                className="shadow appearance-none block w-full text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                type="text"
                name="firstName"
                value={this.state.firstName}
                onChange={this.handleInputChange.bind(this)}
                placeholder="Jane"
                required
              />
            </div>
            <div className="w-full md:w-1/2 px-3">
              <label
                className="block uppercase tracking-wide text-teal-800 text-sm font-bold mb-2"
                htmlFor="lastName"
              >
                Last Name
              </label>
              <input
                className="shadow appearance-none block w-full text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                type="text"
                name="lastName"
                value={this.state.lastName}
                onChange={this.handleInputChange.bind(this)}
                placeholder="Doe"
                required
              />
            </div>
          </div>
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full px-3">
              <label
                className="block uppercase tracking-wide text-teal-800 text-sm font-bold mb-2"
                htmlFor="email"
              >
                Email
              </label>
              <input
                className="shadow appearance-none block w-full text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                type="email"
                name="email"
                value={this.state.email}
                onChange={this.handleInputChange.bind(this)}
                placeholder="e.g@gmail.com"
                required
              />
            </div>
          </div>
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full px-3">
              <label
                className="block uppercase tracking-wide text-teal-800 text-sm font-bold mb-2"
                htmlFor="password"
              >
                Password
              </label>
              <input
                className="shadow appearance-none block w-full text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                type="password"
                name="password"
                value={this.state.password}
                onChange={this.handleInputChange.bind(this)}
                placeholder="Enter password"
                required
              />
            </div>
          </div>
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full px-3">
              <label
                className="block uppercase tracking-wide text-teal-800 text-sm font-bold mb-2"
                htmlFor="confirmPassword"
              >
                Confirm Password
              </label>
              <input
                className="shadow appearance-none block w-full text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                type="password"
                name="confirmPassword"
                value={this.state.confirmPassword}
                onChange={this.handleInputChange.bind(this)}
                placeholder="Confirm password"
                required
              />
            </div>
          </div>

          <div className="flex items-center justify-start">
            <button
              className=" tooltip mt-2 mr-2 bg-teal-400 hover:bg-teal-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              disabled={loading}
              type="submit"
            >
              <span className="tooltiptext">Submit</span>
              <i className="fas fa-check-double" />
            </button>
            <Link
              className="tooltip mt-2 bg-red-400 hover:bg-red-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline "
              to="/"
            >
              <span className="tooltiptext">Cancel</span>
              <i className="fas fa-times" />
            </Link>
          </div>
        </form>
      </div>
    );
  }
}

Signup.propTypes = {
  dispatch: PropTypes.func.isRequired,
  loading: PropTypes.bool,
  location: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  const { loading } = state.app;
  return { loading };
}

export default connect(mapStateToProps)(withRouter(Signup));
