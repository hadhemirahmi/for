import { useSelector } from "react-redux";
import { Navigate } from "react-router";

const ProtectedRoutes = ({ children, allowedRoles }) => {
  // ['admin']
  const { user } = useSelector((state) => state.auth);
  if (!user) {
    return <Navigate to={"/"} replace />;
  }
  if (!allowedRoles.includes(user.role)) {
    return <Navigate to="/Unauthorized" replace />;
  }
  return children;
};

export default ProtectedRoutes;
