import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { LoadingSpinner } from "./LoadingSpinner";

export const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <LoadingSpinner size="lg" text="Verifying student authentication..." />
      </div>
    );
  }

  if (!isAuthenticated) {
    // Redirect to login page and preserve requested path
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};
