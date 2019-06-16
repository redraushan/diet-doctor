import React from "react";
import { connect } from "react-redux";
function AlertComponent(props) {
  const { type, message } = props;
  if (!message) return null;
  return (
    <div className={`alert ${type}`} role="alert">
      {message}
    </div>
  );
}
function mapStateToProps({ alert }) {
  const { type, message } = alert;
  return {
    type,
    message
  };
}
export default connect(mapStateToProps)(AlertComponent);
