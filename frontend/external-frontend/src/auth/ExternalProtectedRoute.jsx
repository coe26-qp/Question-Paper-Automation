import { Navigate } from "react-router-dom";

export default function ExternalProtectedRoute({ children }) {
  const token = localStorage.getItem("externalToken");

  if (!token) {
    return <Navigate to="/" replace />;
  }

  return children;
}
