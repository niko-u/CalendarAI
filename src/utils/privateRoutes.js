import React, { useContext } from 'react';
import { Route, Navigate } from 'react-router-dom';
import { UserContext } from '../contexts/userContext';

function PrivateRoute({ component: Component, ...rest }) {
  const { user } = useContext(UserContext);

  return (
    <Route
      {...rest}
      element={user ? <Component /> : <Navigate to="/signin" replace />}
    />
  );
}

export default PrivateRoute;
