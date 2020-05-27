import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { confirmAccount, resendVerificationCode } from "../../services/auth";
import { withRouter } from "react-router-dom";
import queryString from "query-string";
import {
  REQUEST_SENT,
  REQUEST_FINISHED,
  NOTIFY_USER,
} from "../../store/actions";

class ConfirmSignup extends React.Component {
  constructor(props) {
    super(props);
    const { email } = queryString.parse(props.location.search);

    this.state = {
      email: email || "",
      code: "",
    };
  }

  async handleSubmitClick(e) {
    e.preventDefault();
    const { history, dispatch } = this.props;

    try {
      dispatch({ type: REQUEST_SENT });
      await confirmAccount(this.state.email, this.state.code);
      dispatch({
        type: NOTIFY_USER,
        notification: {
          type: "success",
          message:
            "Account successfully confirmed, please log into your account",
        },
      });
      history.replace("/login");
    } catch (e) {
      dispatch({
        type: NOTIFY_USER,
        notification: { type: "error", message: e.message },
      });
    } finally {
      dispatch({ type: REQUEST_FINISHED });
    }
  }

  async handleResendClick(e) {
    e.preventDefault();
    const { dispatch } = this.props;
    try {
      dispatch({ type: REQUEST_SENT });
      await resendVerificationCode(this.state.email);
      dispatch({
        type: NOTIFY_USER,
        notification: { type: "success", message: "Verification code sent" },
      });
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
        <form className="bg-white shadow-lg rounded px-8 pt-6 pb-8 mb-4 lg:w-1/4 md:w-1/3 sm:w-1/2">
          <h1 className="block uppercase tracking-wide text-teal-800 font-bold text-center pb-2">
            CONFIRM ACCOUNT
          </h1>

          <div className="border-t-2 border-gray-300 pt-5">
            <p className="mb-4">
              A verification code was sent to your email, please use it to
              confirm your account.
            </p>
            <div className="w-full ">
              <label
                className="block uppercase tracking-wide text-teal-800 text-xs font-bold mb-2"
                htmlFor="email"
              >
                Email
              </label>
              <input
                className="appearance-none block w-full bg-gray-100 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                type="email"
                name="email"
                value={this.state.email}
                onChange={this.handleInputChange.bind(this)}
                placeholder="Email"
              />
            </div>

            <div className="w-full ">
              <label
                className="block uppercase tracking-wide text-teal-800 text-xs font-bold mb-2"
                htmlFor="code"
              >
                Verification Code
              </label>
              <input
                className="appearance-none block w-full bg-gray-100 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                type="text"
                name="code"
                value={this.state.code}
                onChange={this.handleInputChange.bind(this)}
                placeholder="Enter verification code"
              />
            </div>

            <div className="flex items-center justify-start">
              <button
                className="tooltip mt-2 mr-2 bg-teal-400 hover:bg-teal-500 text-white font-bold py-1 px-3 rounded focus:outline-none focus:shadow-outline"
                type="button"
                onClick={this.handleSubmitClick.bind(this)}
                disabled={loading}
              >
                <span className="tooltiptext">Submit</span>
                <i className="fas fa-check-double"> </i>
              </button>
              <button
                className="tooltip mt-2 bg-pink-200 hover:bg-pink-300 text-white font-bold py-1 px-3 rounded focus:outline-none focus:shadow-outline"
                type="button"
                onClick={this.handleResendClick.bind(this)}
                disabled={loading}
              >
                <span className="tooltiptext">Resend</span>
                <i className="fas fa-share"></i>
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

ConfirmSignup.propTypes = {
  dispatch: PropTypes.func.isRequired,
  loading: PropTypes.bool,
  location: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  const { loading } = state.app;
  return { loading };
}

export default connect(mapStateToProps)(withRouter(ConfirmSignup));
