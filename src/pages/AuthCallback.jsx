// src/pages/AuthCallback.jsx
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import supabase from "../services/supabaseClient";
import { useAuth } from "../context/AuthContext";

export default function AuthCallback() {
  const navigate = useNavigate();
  const { syncUser } = useAuth();

  useEffect(() => {
    const handle = async () => {
      const { data: { session }, error } = await supabase.auth.getSession();

      if (error || !session) {
        navigate("/login");
        return;
      }

      const mongoUser = await syncUser();
      const role = mongoUser?.role;

      navigate(role === "admin" ? "/admin" : "/dashboard");
    };

    handle();
  }, [navigate, syncUser]);

  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <p>Signing you in….</p>
    </div>
  );
}