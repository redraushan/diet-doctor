import { userConstants } from "../constants";
import { userService } from "../services";
import { alertActions } from "./";

export const userActions = {
  login,
  logout,
  register
};

function setUserToLocalStorage(user) {
  localStorage.setItem("user", JSON.stringify(user));
}

function login(username, password) {
  return dispatch => {
    dispatch(request({ username, password }));
    userService.login(username, password).then(
      user => {
        if (user.ok) {
          dispatch(success(user.json()));
          dispatch(alertActions.success());
          setUserToLocalStorage(user);
          history.push("/");
        }
      },
      error => {
        dispatch(failure(error));
        dispatch(alertActions.error(error));
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
  userService.logout();
  return { type: userConstants.LOGOUT };
}

function register(user) {
  return dispatch => {
    dispatch(request(user));
    userService.register(user).then(
      () => {
        dispatch(success(user));
        dispatch(alertActions.success("Registration successful!"));
        history.push("/login");
        setUserToLocalStorage(user);
      },
      error => {
        dispatch(failure(error));
        dispatch(alertActions.error(error));
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
