import React from "react";
import { Navigate } from "react-router-dom";

import { useAppSelector } from "../../store/hooks";

const PrivateRoute = ({ children }: { children: any }) => {
  const { isAuthenticated } = useAppSelector((state) => state.auth);

  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
