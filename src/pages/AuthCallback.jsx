import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import supabase from "../services/supabaseClient";
import api from "../services/api";

export default function AuthCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    const handleAuth = async () => {
      const { data: { session } } =
        await supabase.auth.getSession();

      if (!session) {
        navigate("/login");
        return;
      }

      try {
        const { data } = await api.post("/auth/sync-user");

        const role = data?.role;

        if (role === "admin") {
          navigate("/admin");
        } else {
          navigate("/dashboard");
        }
      } catch (err) {
        console.error(err);
        navigate("/login");
      }
    };

    handleAuth();
  }, []);

  return <h2>Signing you in...</h2>;
}