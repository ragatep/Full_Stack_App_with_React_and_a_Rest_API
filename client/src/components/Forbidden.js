import React from 'react';
import { Link } from "react-router-dom";

const Forbidden = () => (
  <div className="bounds">
    <h2 className="message--detail--title">403 Forbidden</h2>
      <p>
        {" "}
        <strong>Oh oh! You don't have permission to access this page.</strong>
      </p>
      <Link to="/" className="button button-secondary">
        Return to List
      </Link>
  </div>
);

export default Forbidden;