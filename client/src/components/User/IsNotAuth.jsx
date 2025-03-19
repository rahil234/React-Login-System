import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const IsNotAuth = ({ children }) => {
  const isAuthenticated = useSelector((state) => !!state.auth.user);

  return !isAuthenticated ? children : <Navigate to="/" />;
};

export default IsNotAuth;