import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Switch, Route } from "react-router-dom";
import PrivateRoute from "./components/Router/PrivateRoute";
import PublicRoute from "./components/Router/PublicRoute";
import "./App.css";

import Header from "./components/Header/Header";
import Footer from "./components/Footer/Foooter";
import Home from "./views/Home/Home";
import Stars from "./components/Stars/Stars";
import Login from "./views/Auth/Login";
import Signup from "./views/Auth/Signup";
import Dashboard from "./views/Dashboard/Dashboard";

function App({ dispatch, user, loading, notification }) {
  const appClasses = user ? "App" : "home-background";
  return (
    <div className={appClasses}>
      <Stars />
      <Header />
      <div className="app_page">
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/login">
            <Login />
          </Route>
          <Route exact path="/signup">
            <Signup />
          </Route>
          <Route exact path="/dashboard">
            <Dashboard />
          </Route>
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
