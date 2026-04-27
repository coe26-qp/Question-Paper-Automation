import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const token = localStorage.getItem("examCellToken");
  // return token ? children : <Navigate to="/" />;
  if (!token) {
    return <Navigate to="/" />;
  }

  return children;   // ⭐ REQUIRED
}
