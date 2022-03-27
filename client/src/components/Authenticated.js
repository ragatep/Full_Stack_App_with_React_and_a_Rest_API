import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';

const Authenticated =  ({ context  }) => {
  console.log(context.authenticatedUser);
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
          <h1>Hello {authUser.user.firstName} {authUser.user.lastName}.</h1>
          <h3>You are being redirected to the Courses page. Please wait ...</h3>
        </div>
      </div>
      );
  }

  return (
    <Redirect to="/" />
  );

};

export default Authenticated;