import { Navigate, Outlet } from "react-router";

export const PublicRoute = ({ authed }) => {
  return !authed ? <Outlet /> : <Navigate to="/profile" replace />;
};
