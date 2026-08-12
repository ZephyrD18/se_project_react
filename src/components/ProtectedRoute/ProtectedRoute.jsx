import { Navigate } from "react-router-dom";

function ProtectedRoute({ isLoggedIn, isChecking, children }) {
  if (isChecking) return null;

  return isLoggedIn ? children : <Navigate to="/" replace />;
}

export default ProtectedRoute;
