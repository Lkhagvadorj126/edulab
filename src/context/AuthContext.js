"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (e) {
        console.error("User parse error", e);
      }
    }
    setLoading(false);
  }, []);

  const refreshUser = async () => {
    const userId = localStorage.getItem("userId");
    if (!userId) return;

    try {
      const res = await fetch(`/api/users?userId=${userId}`);
      if (res.ok) {
        const updatedData = await res.json();
        // Бүрэн объектыг хадгалах (email, role, totalXp бүгдийг)
        localStorage.setItem("user", JSON.stringify(updatedData));
        setUser(updatedData);
      }
    } catch (err) {
      console.error("User refresh failed:", err);
    }
  };

  const login = (userData) => {
    // MongoDB-ийн _id-г userId болгож хадгалах
    const id = userData._id || userData.id;
    if (id) localStorage.setItem("userId", id);

    localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);
  };

  const logout = () => {
    localStorage.clear();
    setUser(null);
    router.push("/");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading, refreshUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
