import axios from "axios";

const baseURL =
  import.meta.env.VITE_API_URL || "https://mtaamarket.onrender.com/api";

const api = axios.create({
  baseURL,
});

// Attach Supabase token on every request
api.interceptors.request.use(async (config) => {
  const session = JSON.parse(localStorage.getItem("supabase-session"));

  const token = session?.access_token;

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default api;
