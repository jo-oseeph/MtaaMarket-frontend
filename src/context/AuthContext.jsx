import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import supabase from "../services/supabaseClient";
import api from "../services/api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [session, setSession] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Sync MongoDB user
 const syncUser = async () => {
  try {
    const { data } = await api.post("/auth/sync-user");
    setUser(data);
  } catch (err) {
    console.error("syncUser failed:", err);
    setUser(null); // prevent crash
  }
};
  // Register
  const register = async (
    fullname,
    email,
    password
  ) => {
    return await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullname,
        },
      },
    });
  };

  // Login
  const login = async (
    email,
    password
  ) => {
    const result =
      await supabase.auth.signInWithPassword({
        email,
        password,
      });

    if (!result.error) {
      await syncUser();
    }

    return result;
  };

  // Google Login
  const loginWithGoogle = async () => {
    return await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo:
          window.location.origin,
      },
    });
  };

  // Logout
  const logout = async () => {
    await supabase.auth.signOut();

    setUser(null);
    setSession(null);
  };

  // Restore session
  useEffect(() => {
    const initialize = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      setSession(session);

      if (session) {
        await syncUser();
      }

      setLoading(false);
    };

    initialize();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(
      async (_, session) => {
        setSession(session);

        if (session) {
          await syncUser();
        } else {
          setUser(null);
        }
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        loading,
        register,
        login,
        logout,
        loginWithGoogle,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () =>
  useContext(AuthContext);