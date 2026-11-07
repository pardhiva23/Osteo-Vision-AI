import axios from "axios";

export const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:8000";

const TOKEN_KEY = "osteovision_token";

export const getToken = () => localStorage.getItem(TOKEN_KEY);

export const setToken = (token) => localStorage.setItem(TOKEN_KEY, token);

export const clearToken = () => localStorage.removeItem(TOKEN_KEY);

/** Turn a backend image path (e.g. /media/predictions/..) into a full URL. */
export const mediaUrl = (path) =>
  !path ? null : path.startsWith("http") ? path : `${API_URL}${path}`;

/** Pull a readable message out of an axios error. */
export const getErrorMessage = (error, fallback = "Something went wrong.") => {
  const detail = error?.response?.data?.detail;

  if (typeof detail === "string") return detail;

  // FastAPI validation errors come back as a list.
  if (Array.isArray(detail) && detail.length > 0) {
    return detail.map((d) => d.msg).join(", ");
  }

  if (error?.code === "ERR_NETWORK") {
    return "Cannot reach the server. Make sure the backend is running.";
  }

  return fallback;
};

const api = axios.create({
  baseURL: API_URL,
});

// Attach the JWT to every request.
api.interceptors.request.use((config) => {
  const token = getToken();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// If the token is rejected, clear it and send the user to the login page.
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const url = error?.config?.url || "";
    const isAuthCall = url.startsWith("/auth/");

    if (error?.response?.status === 401 && !isAuthCall) {
      clearToken();

      if (window.location.pathname !== "/login") {
        window.location.href = "/login";
      }
    }

    return Promise.reject(error);
  }
);

export default api;
