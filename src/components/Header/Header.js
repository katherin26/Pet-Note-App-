import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logOut } from "../../services/auth";
import { Link, useHistory } from "react-router-dom";
import "./Header.css";
import {
  LOGOUT,
  REQUEST_SENT,
  REQUEST_FINISHED,
  NOTIFY_USER,
} from "../../store/actions";

function Header({ dispatch, user }) {
  const history = useHistory();
  let headerClasses = "flex items-center justify-between flex-wrap p-6 ";
  headerClasses += !user ? "bg-transparent" : "bg-teal-600";
  const logOutClickHandler = async () => {
    try {
      dispatch({ type: REQUEST_SENT });
      await logOut();
      dispatch({ type: LOGOUT });
      history.replace("/login");
    } catch (e) {
      dispatch({
        type: NOTIFY_USER,
        notification: { type: "error", message: e.message },
      });
    } finally {
      dispatch({ type: REQUEST_FINISHED });
    }
  };

  return (
    <nav className={headerClasses}>
      <div className="flex items-center flex-shrink-0 text-white mr-6">
        <img
          className="fill-current h-10 w-10 mr-2"
          src="https://austinbluffsanimalclinic.com/wp-content/uploads/2019/04/3289786-256.png"
          alt="Hello"
        ></img>
        <span className="font-semibold text-xl tracking-tight">Pet-Note</span>
      </div>
      <div className="block lg:hidden">
        <button className="flex items-center px-3 py-2 border rounded text-teal-200 border-teal-400 hover:text-white hover:border-white">
          <svg
            className="fill-current h-3 w-3"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>Menu</title>
            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
          </svg>
        </button>
      </div>
      <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
        <div className="text-sm lg:flex-grow">
          {!user ? (
            <Link
              className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white"
              to="/"
            >
              Home
            </Link>
          ) : (
            ""
          )}
        </div>
        {!user ? (
          <div className="mx-2">
            <Link
              className="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 lg:mt-0 font-semibold"
              to="/signup"
            >
              Sign up
            </Link>
          </div>
        ) : (
          ""
        )}
        {!user ? (
          <div className="mx-2">
            <Link
              className="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 lg:mt-0 font-semibold"
              to="/login"
            >
              Login
            </Link>
          </div>
        ) : (
          ""
        )}

        {user ? (
          <div className="mx-2">
            <Link
              className="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 lg:mt-0 font-semibold"
              to="/dashboard"
            >
              Dashboard
            </Link>
          </div>
        ) : (
          ""
        )}

        {user ? (
          <div className="mx-2">
            <Link
              className="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 lg:mt-0 font-semibold"
              to="/pets/add"
            >
              Add Pet
            </Link>
          </div>
        ) : (
          ""
        )}

        {user ? (
          <div className="mx-2">
            <Link
              className="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 lg:mt-0 font-semibold"
              to="/profile"
            >
              Profile
            </Link>
          </div>
        ) : (
          ""
        )}
        {user ? (
          <div className="mx-2">
            <button
              onClick={logOutClickHandler}
              className="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 lg:mt-0 font-semibold"
            >
              Logout
            </button>
          </div>
        ) : (
          ""
        )}
      </div>
    </nav>
  );
}

Header.propTypes = {
  dispatch: PropTypes.func.isRequired,
  user: PropTypes.object,
};

function mapStateToProps(state) {
  const { user } = state.app;
  return { user };
}

export default connect(mapStateToProps)(Header);
