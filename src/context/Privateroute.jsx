import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

const PrivateRoute = ({ children }) => {
  const { currentUsr } = useAuth();
  return currentUsr ? children : <Navigate to="/login" />;  
};

export default PrivateRoute;


