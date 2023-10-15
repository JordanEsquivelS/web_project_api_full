import { Navigate } from "react-router-dom";

function ProtectedRoute({ element, loggedIn }) {
  return loggedIn ? element : <Navigate to="/signup" replace />;
}

export default ProtectedRoute;
