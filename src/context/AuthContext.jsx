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

      return data;
    } catch (err) {
      console.error("syncUser failed:", err);
      setUser(null);
      return null;
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

    if (result.error) {
      return {
        success: false,
        error: result.error,
      };
    }

    const mongoUser = await syncUser();

    return {
      success: true,
      user: mongoUser,
    };
  };

  // Google Login
  const loginWithGoogle = async () => {
    return await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: window.location.origin,
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
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession();

        setSession(session);

        if (session) {
          await syncUser();
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    initialize();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setSession(session);

        if (
          session &&
          (event === "SIGNED_IN" ||
            event === "TOKEN_REFRESHED")
        ) {
          await syncUser();
        }

        if (event === "SIGNED_OUT") {
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
        syncUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () =>
  useContext(AuthContext);