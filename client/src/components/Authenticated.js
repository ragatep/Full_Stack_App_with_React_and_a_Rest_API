import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';

const Authenticated =  ({ context  }) => {
  const authUser = context.authenticatedUser;
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 4500);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="bounds">
        <div className="grid-100">
          <h2>Hello {authUser.user.firstName} {authUser.user.lastName}.</h2>
          <hr></hr>
          {" "}
          <p>You are being redirected to the Courses page. Please wait ...</p>
        </div>
      </div>
      );
  }

  return (
    <Redirect to="/" />
  );

};

export default Authenticated;