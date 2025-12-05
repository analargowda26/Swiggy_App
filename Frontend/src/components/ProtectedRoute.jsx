import React from "react";
import { Navigate } from "react-router-dom";
import { useUser } from "../context/UserContext";

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useUser();

  if (loading) {
    return (
      <div className="loading-spinner">
        <div className="spinner"></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;