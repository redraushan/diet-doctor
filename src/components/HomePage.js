import React, { Component } from "react";
import { Link } from "react-router-dom";
import { userActions } from "../actions/user.actions";
export class HomePage extends Component {
  style = {
    textAlign: "center"
  };

  render() {
    return (
      <div className="col-md-6 col-md-offset-3" style={this.style}>
        <h2 align="center">Welcome! You have successfully logged in.</h2>
        <Link to="/login" onClick={userActions.logout} className="btn btn-link">
          Logout
        </Link>
      </div>
    );
  }
}
