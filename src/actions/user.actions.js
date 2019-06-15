import { userConstants } from "../constants";
import { userService } from "../services";
import { alertActions } from "./";
import { history } from "../helpers";

export const userActions = {
  login,
  logout,
  register
};

function setUserToLocalStorage(user) {
  localStorage.setItem("user", JSON.stringify(user));
}

function login(username, password) {
  // return the promise using fetch which adds to localstorage on resolve
  return dispatch => {
    request({ username, password });
    userService.login(username, password).then(
      user => {
        const { ok } = user;
        dispatch(success(ok));
        setUserToLocalStorage(user);
        console.log({ ok });
      },
      error => {
        dispatch(failure(error));
        console.log({ error });
      }
    );
  };

  function request(user) {
    return { type: userConstants.LOGIN_REQUEST, user };
  }
  function success(user) {
    return { type: userConstants.LOGIN_SUCCESS, user };
  }
  function failure(error) {
    return { type: userConstants.LOGIN_FAILURE, error };
  }
}

function logout() {
  // complete this function
}

function register(user) {
  // return the promise using fetch which dispatches appropriately

  return dispatch => {
    request(user);
    userService.register(user).then(
      user => {
        dispatch(success(user));
        setUserToLocalStorage(user);
        console.log({ user });
      },
      error => {
        dispatch(failure(error));
        console.log({ error });
      }
    );
  };
  function request(user) {
    return { type: userConstants.REGISTER_REQUEST, user };
  }
  function success(user) {
    return { type: userConstants.REGISTER_SUCCESS, user };
  }
  function failure(error) {
    return { type: userConstants.REGISTER_FAILURE, error };
  }
}
