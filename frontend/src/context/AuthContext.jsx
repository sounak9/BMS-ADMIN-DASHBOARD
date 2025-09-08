import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();
const API_URL = import.meta.env.VITE_API_URL;

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  // Restore from localStorage on refresh
  useEffect(() => {
    const token = localStorage.getItem("admin_token");
    const username = localStorage.getItem("admin_username");
    if (token && username) {
      setUser({ username });
    }
  }, []);

  // Login
  const login = async (username, password) => {
    try {
      const res = await axios.post(`${API_URL}/admin/login`, {
        username,
        password,
      });
      localStorage.setItem("admin_token", res.data.access_token);
      localStorage.setItem("admin_username", res.data.username);
      setUser({ username: res.data.username, role: res.data.role });
    } catch (err) {
      throw err.response?.data?.error || "Login failed";
    }
  };

  // Logout
  const logout = () => {
    localStorage.removeItem("admin_token");
    localStorage.removeItem("admin_username");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// Hook to use auth context
export const useAuth = () => useContext(AuthContext);
