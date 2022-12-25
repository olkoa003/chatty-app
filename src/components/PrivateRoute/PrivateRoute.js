import { Navigate, Outlet } from "react-router";

export const PrivateRoute = ({ authed }) => {
  return authed ? <Outlet /> : <Navigate to="/" replace />;
};
