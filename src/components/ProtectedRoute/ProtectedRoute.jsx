import {React, useContext} from "react";
import { Navigate } from "react-router-dom";
import AuthContext from "../../context/auth-context";

const ProtectedRoute = ({ children }) => {
  const ctx = useContext(AuthContext);

  if (!ctx.isLoggedIn) {
    // user is not authenticated
    return <Navigate to="/" />;
  }
  return children;
};

export default ProtectedRoute;
