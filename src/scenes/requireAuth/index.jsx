import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
const RequireAuth: React.FC = ({ children }) => {
  const isLoggedIn_localstorage = Boolean(localStorage.getItem("isLoggedIn"));
  const { isLoggedIn: isLoggedInRedux } = useSelector((state) => state.login);
  const isLoggedIn = isLoggedInRedux || isLoggedIn_localstorage;
  return isLoggedIn ? children : <Navigate to="/login" replace />;
};

export default RequireAuth;
