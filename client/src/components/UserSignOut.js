/**
 * Stateless Component.
 * Signs out the authenticate user and 
 * redirects to the default route.
 */
import React, { useEffect } from "react";
import { Redirect } from 'react-router-dom';

const UserSignOut = ({ context }) => {
  useEffect(() => {
    context.actions.signOut();
  }, [context]);
  return (
    <Redirect to="/" />
  );
};

export default UserSignOut;
