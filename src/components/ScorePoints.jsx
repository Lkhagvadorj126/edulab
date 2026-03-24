"use client";
import { useState, useEffect } from "react";
import NavAll from "./NavAll";
import Navbar from "./Navbar";
import { Trophy, Star, ChevronRight, UserCircle } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export default function ScorePoints() {
  const { user: currentUser } = useAuth(); // Нэвтэрсэн хэрэглэгчийн мэдээлэл
  const [leaders, setLeaders] = useState([]);
  const [loading, setLoading] = useState(true);

  // Багш эсэхийг шалгах
  const isTeacher = currentUser?.role === "teacher";

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch("/api/users");
        if (res.ok) {
          const data = await res.json();

          // Зөвхөн сурагчдыг (role: 'student') шүүж аваад XP-ээр нь эрэмбэлэх
          const onlyStudents = data
            .filter((u) => u.role === "student")
            .sort((a, b) => (b.totalXp || 0) - (a.totalXp || 0));

          setLeaders(onlyStudents);
        }
      } catch (error) {
        console.error("Дата татахад алдаа гарлаа:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center text-[#312C85] font-black uppercase tracking-[0.3em] animate-pulse">
        Уншиж байна...
      </div>
    );

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-20 font-sans">
      <NavAll />

      <header className="pt-28 flex flex-col gap-8">
        {/* БАГШ БИШ ҮЕД Л NAVBAR (Хичээлийн цэс) ХАРАГДАНА */}
        {!isTeacher && <Navbar />}

        <div className="max-w-[800px] mx-auto w-full px-6 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-black text-[#312C85] tracking-tight uppercase italic">
              {isTeacher ? "Сурагчдын явц" : "Шилдэг сурагчид"}
            </h1>
            <p className="text-slate-400 font-bold text-[10px] uppercase tracking-[0.2em] mt-1 ml-1">
              {isTeacher ? "Нийт бүртгэлтэй сурагчид" : "Зэрэглэлийн жагсаалт"}
            </p>
          </div>
          <div className="bg-[#312C85] text-white px-5 py-2.5 rounded-2xl font-black text-[11px] uppercase tracking-widest flex items-center gap-2 shadow-lg shadow-indigo-900/10">
            <Trophy size={14} className="text-amber-400" />
            {leaders.length} сурагч
          </div>
        </div>
      </header>

      {/* Жагсаалт */}
      <main className="max-w-[800px] mx-auto mt-10 px-6 space-y-3">
        {leaders.length > 0 ? (
          leaders.map((user, index) => {
            // Context-оос ирж буй ID-тай тулгах
            const isMe =
              user._id === currentUser?.id || user._id === currentUser?._id;
            const name = user.email.split("@")[0];

            return (
              <div
                key={user._id}
                className={`flex justify-between items-center p-5 rounded-[2rem] transition-all duration-300 border ${
                  isMe
                    ? "bg-white border-[#312C85] shadow-xl shadow-indigo-900/5 ring-2 ring-[#312C85]/10 scale-[1.02]"
                    : "bg-white border-slate-100 hover:border-slate-300 hover:shadow-md"
                }`}
              >
                <div className="flex items-center gap-5">
                  <div
                    className={`w-12 h-12 flex items-center justify-center rounded-2xl font-black text-sm shadow-inner ${
                      isMe
                        ? "bg-[#312C85] text-white"
                        : index === 0
                          ? "bg-amber-100 text-amber-600"
                          : "bg-slate-50 text-slate-400"
                    }`}
                  >
                    {index + 1}
                  </div>
                  <div className="flex items-center gap-3">
                    <UserCircle
                      className={`w-6 h-6 ${isMe ? "text-[#312C85]" : "text-slate-300"}`}
                    />
                    <div className="flex items-center gap-2">
                      <p
                        className={`font-black text-sm uppercase tracking-tight ${isMe ? "text-[#312C85]" : "text-slate-700"}`}
                      >
                        {name}
                      </p>
                      {isMe && (
                        <div className="bg-[#312C85]/10 px-2 py-0.5 rounded-md flex items-center gap-1">
                          <Star
                            size={10}
                            className="text-[#312C85] fill-[#312C85]"
                          />
                          <span className="text-[9px] font-black text-[#312C85] uppercase">
                            Би
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-6">
                  <div className="text-right">
                    <p
                      className={`font-black text-xl leading-none ${isMe ? "text-[#312C85]" : "text-slate-800"}`}
                    >
                      {user.totalXp || 0}
                    </p>
                    <span className="text-[9px] text-slate-300 font-black uppercase tracking-widest">
                      Оноо / XP
                    </span>
                  </div>
                  <ChevronRight
                    size={18}
                    className={isMe ? "text-[#312C85]" : "text-slate-200"}
                  />
                </div>
              </div>
            );
          })
        ) : (
          <div className="text-center py-20 bg-white rounded-[2rem] border-2 border-dashed border-slate-100">
            <p className="text-slate-400 font-bold uppercase tracking-widest text-sm">
              Одоогоор сурагч бүртгэгдээгүй байна
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
