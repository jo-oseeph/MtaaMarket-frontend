import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api",
});

// Attach Supabase token on every request
api.interceptors.request.use(async (config) => {
  const session = JSON.parse(
    localStorage.getItem("supabase-session")
  );

  const token = session?.access_token;

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default api;