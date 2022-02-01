import React from "react";
import { isAuth } from '../../services/authHelpers'
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
  return isAuth() ? <Outlet /> : <Navigate to="/login" />;
};
  

export default PrivateRoute