import React from 'react';
import { Link } from "react-router-dom";

const NotFound = () => (
  <div className="bounds">
    <h2 className="message--detail--title">404 Page Not Found</h2>
    <p>
      {" "}
      <strong>Sorry! We couldn't find the page you're looking for.</strong>
    </p>
    <Link to="/" className="button button-secondary">
        Return to List
    </Link>
  </div>
);

export default NotFound;