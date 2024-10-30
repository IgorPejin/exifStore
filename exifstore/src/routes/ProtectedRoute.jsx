import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  // todo: token encryption and cookie storage
  const user = true;
  return user ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
