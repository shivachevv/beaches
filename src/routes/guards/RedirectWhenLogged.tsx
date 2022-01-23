import React from "react";
import { Navigate } from "react-router-dom";

import { useAppSelector } from "../../store/hooks";

const RedirectWhenLogged = ({ children }: { children: any }) => {
  const { isAuthenticated } = useAppSelector((state) => state.auth);

  return isAuthenticated ? <Navigate to="/" /> : children;
};

export default RedirectWhenLogged;
