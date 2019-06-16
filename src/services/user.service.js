import React from "react";
export const userService = {
  login,
  logout,
  register,
  isLoading,
  alertUser
};

function login(username, password) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password })
  };

  // call `/users/authenticate` with requestOptions to authenticate the login process
  return fetch("/users/authenticate", requestOptions);
}

function logout() {
  // remove user from local storage to log user out
}

function register(user) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user)
  };

  return fetch("/users/register", requestOptions).then(handleResponse);
}

function handleResponse(response) {
  if (!response.ok) {
    return Promise.reject(response.statusText);
  }

  return response.json();
}

function alertUser(message, type) {
  let alertType = type === "success" ? "alert-success" : "alert-danger";
  if (!message || !type) return null;
  return (
    <div className={`alert ${alertType}`} role="alert">
      {message}
    </div>
  );
}

function isLoading(loading) {
  if (loading) {
    return (
      <img
        src="../../spinner.gif"
        style={{ width: "20px", marginLeft: "12px" }}
      />
    );
  }
  return null;
}
