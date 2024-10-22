import React from "react";
import { Navigate } from "react-router-dom";
import { useMyContext } from "../store/ContextApi";

const ProtectedRoute = ({ children }) => {
  // Access the token and isAdmin state by using the useMyContext hook from the ContextProvider
  const { token } = useMyContext();

  // Navigate to login page if the user is unauthenticated
  if (!token) {
    return <Navigate to="/login" />;
  }

  // Navigate to access-denied page if a user tries to access an admin page


  return children; // Render children if authenticated and authorized
};

export default ProtectedRoute;
