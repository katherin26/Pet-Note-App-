import React from "react";
import { Switch, Route, useLocation } from "react-router-dom";
import "./App.css";

import Header from "./components/Header/Header";
import Footer from "./components/Footer/Foooter";
import Home from "./views/Home/Home";
import Stars from "./components/Stars/Stars";
import Login from "./views/Auth/Login";
import Signup from "./views/Auth/Signup";
import Dashboard from "./views/Dashboard/Dashboard";

function App() {
  const location = useLocation();
  const isPublicRoute = ["/", "/login", "/signup", "/about"].includes(
    location.pathname
  );
  const appClasses = isPublicRoute ? "home-background" : "App";
  return (
    <div className={appClasses}>
      {isPublicRoute ? <Stars /> : ""}
      <Header isPublicRoute={isPublicRoute} />
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
      <Footer isPublicRoute={isPublicRoute} />
    </div>
  );
}

export default App;
