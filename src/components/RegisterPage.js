import React from "react";
import { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { userActions } from "../actions";

class RegisterPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: {
        username: "",
        password: ""
      },
      submitted: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    // handle input change and dispatch register
    const { name, value } = event.target;
    this.setState(
      () => ({ user: { ...this.state.user, [name]: value, submitted: false } }),
      () => {
        console.log(this.state);
      }
    );
  }

  handleSubmit(event) {
    // handle button click and dispatch register
    event.preventDefault();
    const { username, password } = this.state.user;
    const { register } = this.props;

    if (username && password) {
      register(username, password);
    }
    this.setState(() => ({ submitted: true }));
  }

  render() {
    const { user, submitted } = this.state;
    return (
      <div className="col-md-6 col-md-offset-3">
        <h2>Register</h2>
        <form name="form" onSubmit={this.handleSubmit}>
          <div
            className={
              "form-group" + (submitted && !user.username ? " has-error" : "")
            }
          >
            <label htmlFor="username">Username</label>
            <input
              type="text"
              onChange={this.handleChange}
              className="form-control username"
              name="username"
            />
            {submitted && !user.username && (
              <div className="help-block">Username is required</div>
            )}
          </div>
          <div
            className={
              "form-group" + (submitted && !user.password ? " has-error" : "")
            }
          >
            <label htmlFor="password">Password</label>
            <input
              type="password"
              onChange={this.handleChange}
              className="form-control"
              name="password"
            />
            {submitted && !user.password && (
              <div className="help-block">Password is required</div>
            )}
          </div>
          <div className="form-group">
            <button className="btn btn-primary">Register</button>
            <Link to="/login" className="btn btn-link">
              Cancel
            </Link>
          </div>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    register: (username, password) =>
      dispatch(userActions.register({ username, password }))
  };
};
// complete the below function
function mapStateToProps(state) {}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RegisterPage);
export { RegisterPage as TestRegisterPage };
