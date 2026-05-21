import { createContext, useContext, useState } from "react";
import { logout as apiLogout } from "../api/client";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(() => localStorage.getItem("ta_token") || null);
  const [user, setUser] = useState(() => {
    try { return JSON.parse(localStorage.getItem("ta_user")); } catch { return null; }
  });

  const login = (userData, tok) => {
    setToken(tok);
    setUser(userData);
    localStorage.setItem("ta_token", tok);
    localStorage.setItem("ta_user", JSON.stringify(userData));
  };

  const logout = async () => {
    try { await apiLogout(token); } catch (_) {}
    setToken(null);
    setUser(null);
    localStorage.removeItem("ta_token");
    localStorage.removeItem("ta_user");
  };

  const isAdmin = user?.role?.some((r) => r.name === "admin") ?? false;
  const isEditor = (user?.role?.some((r) => r.name === "editor") ?? false) || isAdmin;

  return (
    <AuthContext.Provider value={{ token, user, login, logout, isAdmin, isEditor }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
