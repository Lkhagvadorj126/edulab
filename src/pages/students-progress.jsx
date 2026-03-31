"use client";
import React, { useEffect, useState } from "react";
import NavAll from "../components/NavAll";
import { FaTrophy, FaUserCircle, FaAward } from "react-icons/fa";

export default function StudentsProgress() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // API-аас сурагчдын датаг татах (жишээ)
    const fetchStudents = async () => {
      try {
        const res = await fetch("/api/users?role=student"); // Таны API зам өөр байж магадгүй
        if (res.ok) {
          const data = await res.json();
          // XP-гээр нь ихээс бага руу эрэмбэлэх
          const sorted = data.sort(
            (a, b) => (b.totalXp || 0) - (a.totalXp || 0),
          );
          setStudents(sorted);
        }
      } catch (err) {
        console.error("Алдаа гарлаа:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchStudents();
  }, []);

  // Зэрэглэл тогтоох функц
  const getRank = (xp) => {
    if (xp >= 1000)
      return { label: "Мастер", color: "text-purple-600", bg: "bg-purple-50" };
    if (xp >= 500)
      return { label: "Алтан", color: "text-amber-500", bg: "bg-amber-50" };
    if (xp >= 200)
      return { label: "Мөнгөн", color: "text-slate-400", bg: "bg-slate-50" };
    return {
      label: "Шинэ сурагч",
      color: "text-emerald-500",
      bg: "bg-emerald-50",
    };
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-20">
      <NavAll />
      <div className="max-w-5xl mx-auto pt-32 px-4">
        <div className="bg-white rounded-[32px] p-8 shadow-sm border border-slate-100">
          <div className="flex items-center gap-4 mb-8">
            <div className="p-4 bg-indigo-50 rounded-2xl text-[#312C85]">
              <FaAward size={32} />
            </div>
            <div>
              <h1 className="text-2xl font-black text-slate-900 uppercase">
                Сурагчдын зэрэглэл
              </h1>
              <p className="text-slate-500 text-sm font-medium">
                Нийт {students.length} сурагч бүртгэлтэй байна
              </p>
            </div>
          </div>

          <div className="overflow-hidden rounded-2xl border border-slate-100">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 text-slate-400 text-[11px] uppercase tracking-widest font-bold">
                  <th className="px-6 py-4">Байр</th>
                  <th className="px-6 py-4">Сурагч</th>
                  <th className="px-6 py-4">XP Оноо</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {loading ? (
                  <tr>
                    <td colSpan="4" className="p-10 text-center text-slate-400">
                      Уншиж байна...
                    </td>
                  </tr>
                ) : (
                  students.map((student, index) => {
                    const rank = getRank(student.totalXp || 0);
                    return (
                      <tr
                        key={student._id}
                        className="hover:bg-slate-50/50 transition-colors"
                      >
                        <td className="px-6 py-5">
                          <div
                            className={`w-8 h-8 rounded-lg flex items-center justify-center font-black text-sm ${index === 0 ? "bg-amber-400 text-white" : "bg-slate-100 text-slate-500"}`}
                          >
                            {index + 1}
                          </div>
                        </td>
                        <td className="px-6 py-5">
                          <div className="flex items-center gap-3">
                            <FaUserCircle
                              className="text-slate-300"
                              size={24}
                            />
                            <span className="font-bold text-slate-700">
                              {student.email}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-5">
                          <div className="flex items-center gap-2 font-black text-[#312C85]">
                            <FaTrophy className="text-amber-500" size={14} />
                            {student.totalXp || 0}
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
