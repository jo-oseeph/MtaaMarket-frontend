import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({
  children,
}) {
  const {
    session,
    loading,
  } = useAuth();

  if (loading) {
    return <h2>Loading...</h2>;
  }

  return session
    ? children
    : <Navigate to="/login" />;
}