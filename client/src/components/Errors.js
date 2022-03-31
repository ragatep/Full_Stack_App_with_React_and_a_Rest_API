import React from "react";
import { Link } from "react-router-dom";

function Errors() {
  return (
    <div className="wrap">
      <h2 className="message--detail--title">Error</h2>
      <p>
        {" "}
        <strong>Sorry! We just encountered an unexpected error.</strong>
      </p>
      <Link to="/" className="button button-secondary">
        Return to List
      </Link>
    </div>
  );
}

export default Errors;