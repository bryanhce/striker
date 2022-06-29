import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  let user = JSON.parse(localStorage.getItem("currentUser"));
  if (!user) {
    return <Navigate to="/login" />;
  }
  return children;
};

export default ProtectedRoute;
