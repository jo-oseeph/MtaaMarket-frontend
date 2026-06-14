import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function UserRoute({
  children,
}) {
  const {
    user,
    loading,
  } = useAuth();

  if (loading) {
    return <h2>Loading...</h2>;
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (user.role !== "user") {
    return <Navigate to="/admin" />;
  }

  return children;
}