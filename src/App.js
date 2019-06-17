import React from "react";
import { Router, Route } from "react-router-dom";
import { PrivateRoute } from "./PrivateRoute.js";
import { history } from "./helpers";
import { HomePage } from "./components/HomePage";
import { LoginPage } from "./components/LoginPage";
import RegisterPage from "./components/RegisterPage";
import AlertComponent from "./components/AlertComponent.js";

export const App = () => {
  return (
    <div className="container">
      <AlertComponent />
      <Router history={history}>
        <div className="col-sm-8 col-sm-offset-2">
          <PrivateRoute exact path="/" component={HomePage} />
          <Route exact path="/login" component={LoginPage} />
          <Route exact path="/register" component={RegisterPage} />
        </div>
      </Router>
    </div>
  );
};
