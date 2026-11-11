/** @format */
import { Outlet, Navigate, useLocation } from "react-router-dom";

import useAuth from "../../hooks/useAuth";
import Spinner from "../../ui/Spinner";

function ProtectedRoute() {
  const { user, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return <Spinner />;
  }

  // Not authenticated → send to /login, remembering where they were headed
  // so they can be redirected back after signing in.
  if (!user) {
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }

  return <Outlet />;
}

export default ProtectedRoute;
