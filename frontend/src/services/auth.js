import api, { setToken, clearToken, getToken } from "./api";

export async function registerUser({ username, email, password }) {
  const { data } = await api.post("/auth/register", {
    username,
    email,
    password,
  });

  return data;
}

export async function loginUser({ email, password }) {
  // FastAPI's OAuth2 form expects form-encoded "username" and "password".
  const body = new URLSearchParams();
  body.append("username", email);
  body.append("password", password);

  const { data } = await api.post("/auth/login", body, {
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
  });

  setToken(data.access_token);

  return data;
}

export async function getCurrentUser() {
  const { data } = await api.get("/users/me");

  return data;
}

export function logoutUser() {
  clearToken();
}

export const isLoggedIn = () => Boolean(getToken());
