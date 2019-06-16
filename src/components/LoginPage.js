import React from "react";
import { Component } from "react";
import { Link } from "react-router-dom";
import { history } from "../helpers/history";
import { connect } from "react-redux";
import { userActions } from "../actions";
import { userService } from "../services";

class LoginPage extends Component {
  constructor(props) {
    super(props);

    // reset login status

    this.state = {
      username: "",
      password: "",
      submitted: false
    };
  }

  handleChange = e => {
    const { name, value } = e.target;
    this.setState(() => ({ [name]: value, submitted: false }));
  };

  handleSubmit = e => {
    e.preventDefault();
    const { username, password } = this.state;
    const { login } = this.props;

    if (username && password) {
      login(username, password);
    }
    this.setState(() => ({ submitted: true }));
  };

  render() {
    const { username, password, submitted } = this.state;
    const { loggingIn } = this.props;
    return (
      <div className="col-md-6 col-md-offset-3">
        <h2>Login</h2>
        <form name="form" onSubmit={this.handleSubmit}>
          <div
            className={
              "form-group" + (submitted && !username ? " has-error" : "")
            }
          >
            <label htmlFor="username">Username</label>
            <input
              type="text"
              className="form-control username"
              onChange={this.handleChange}
              name="username"
            />
            {submitted && !username && (
              <div className="help-block">Username is required</div>
            )}
          </div>
          <div
            className={
              "form-group" + (submitted && !password ? " has-error" : "")
            }
          >
            <label htmlFor="password">Password</label>
            <input
              type="password"
              className="form-control"
              name="password"
              onChange={this.handleChange}
            />
            {submitted && !password && (
              <div className="help-block">Password is required</div>
            )}
          </div>
          <div className="form-group">
            <button className="btn btn-primary">Login</button>
            {userService.isLoading(loggingIn)}
            <Link to="/register" className="btn btn-link">
              Register
            </Link>
          </div>
        </form>
      </div>
    );
  }
}

function mapStateToProps(state) {
  console.log({ state });
  const { loggedIn, loggingIn, error, success } = state.authentication;
  return {
    user: state.user,
    success,
    loggedIn,
    loggingIn,
    error
  };
}

const mapDispatchToProps = dispatch => {
  return {
    login: (username, password) =>
      dispatch(userActions.login(username, password))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginPage);
export { LoginPage as TestLoginPage };
