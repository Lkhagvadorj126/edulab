import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/"); // Нэвтрээгүй бол нүүр хуудас руу шилжүүлнэ
    }
  }, [user, loading, router]);

  if (loading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="w-12 h-12 border-4 border-[#312C85] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return children;
}
