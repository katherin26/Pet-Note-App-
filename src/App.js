import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Switch, Route } from "react-router-dom";
import PrivateRoute from "./components/Router/PrivateRoute";
import PublicRoute from "./components/Router/PublicRoute";
import "./App.css";

import Header from "./components/Header/Header";
import Footer from "./components/Footer/Foooter";
import Snackbar from "./components/Snackbar/Snackbar";
import Stars from "./components/Stars/Stars";

import Home from "./views/Home/Home";
import Login from "./views/Auth/Login";
import ForgotPassword from "./views/Auth/ForgotPassword";
import ResetPassword from "./views/Auth/ResetPassword";
import Signup from "./views/Auth/Signup";
import ConfirmSignup from "./views/Auth/ConfirmSignup";
import Dashboard from "./views/Dashboard/Dashboard";
import User from "./views/Profile/User";

function App({ dispatch, user, loading, notification }) {
  const appClasses = user ? "App" : "home-background";
  return (
    <div className={appClasses}>
      <Stars />
      <Snackbar />
      <Header />
      <div className="app_page">
        <Switch>
          <PublicRoute exact path="/">
            <Home />
          </PublicRoute>
          <PublicRoute exact path="/login">
            <Login />
          </PublicRoute>
          <PublicRoute exact path="/forgot-password">
            <ForgotPassword />
          </PublicRoute>
          <PublicRoute exact path="/reset-password">
            <ResetPassword />
          </PublicRoute>
          <PublicRoute exact path="/signup">
            <Signup />
          </PublicRoute>
          <PublicRoute exact path="/confirm-signup">
            <ConfirmSignup />
          </PublicRoute>
          <PrivateRoute exact path="/dashboard">
            <Dashboard />
          </PrivateRoute>
          <PrivateRoute path="/profile">
            <User />
          </PrivateRoute>
        </Switch>
      </div>
      <Footer />
    </div>
  );
}

App.propTypes = {
  dispatch: PropTypes.func.isRequired,
  user: PropTypes.object,
  notification: PropTypes.object,
  loading: PropTypes.bool,
};

function mapStateToProps(state) {
  const { user, notification, loading } = state.app;
  return { user, notification, loading };
}

export default connect(mapStateToProps)(App);
