"use client";
import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const refreshUser = async (userId = user?.id || user?._id) => {
    const idToFetch = userId || localStorage.getItem("userId");
    if (!idToFetch) {
      setLoading(false);
      return;
    }

    try {
      const res = await fetch(`/api/users?userId=${idToFetch}`);

      if (res.ok) {
        const fullUserData = await res.json();

        // Check if fullUserData actually contains data
        if (fullUserData && (fullUserData._id || fullUserData.id)) {
          setUser({ ...fullUserData, id: fullUserData._id || fullUserData.id });
        } else {
          // If data is null/empty, the session might be invalid
          console.warn("User data not found in database, logging out...");
          logout();
        }
      }
    } catch (err) {
      console.error("User refresh failed:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const savedUserId = localStorage.getItem("userId");
    if (savedUserId) {
      refreshUser(savedUserId);
    } else {
      setLoading(false);
    }
  }, []);

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem("userId", userData.id || userData._id);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("userId");
    window.location.href = "/";
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, refreshUser, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
