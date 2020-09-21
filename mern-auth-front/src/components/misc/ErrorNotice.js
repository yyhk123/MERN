import React from "react";

export default function ErrorNotice(props) {
  return (
    <div className="error-notice">
      <span>{props.message}</span>
      <button onClick={props.clearError} className="btn btn-danger">
        X
      </button>
    </div>
  );
}
