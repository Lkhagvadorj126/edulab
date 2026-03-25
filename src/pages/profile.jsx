"use client";
import React from "react";
import NavAll from "../components/NavAll";
import {
  FaUserCircle,
  FaSchool,
  FaLayerGroup,
  FaEnvelope,
  FaTrophy,
  FaEdit,
  FaCheckCircle,
} from "react-icons/fa";
import { useAuth } from "@/context/AuthContext";

export default function Profile() {
  const { user } = useAuth();

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center font-black text-[#312C85] animate-pulse uppercase tracking-widest">
        Уншиж байна...
      </div>
    );
  }

  const isTeacher = user.role === "teacher";
  const primaryColor = "#312C85";

  // Нийтлэг стиль
  const infoCardStyle =
    "p-8 flex items-center gap-6 bg-white border-b border-slate-100 last:border-0";
  const iconBoxStyle =
    "w-12 h-12 rounded-2xl flex items-center justify-center bg-[#312C85]/5 text-[#312C85]";
  const labelStyle =
    "text-[10px] font-black text-slate-400 uppercase tracking-[0.15em] mb-1";
  const valueStyle = "font-bold text-slate-800 text-base";

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-20 font-sans">
      <NavAll />

      <main className="max-w-3xl mx-auto pt-32 px-6">
        {/* Profile Card */}
        <div className="bg-white rounded-[2.5rem] shadow-[0_30px_60px_-15px_rgba(49,44,133,0.1)] border border-slate-100 overflow-hidden">
          {/* Top Section */}
          <div className="relative pt-16 pb-12 px-10 flex flex-col items-center bg-gradient-to-b from-[#312C85]/5 to-transparent">
            {/* Avatar */}
            <div className="relative group">
              <div className="w-36 h-36 bg-white rounded-[3rem] p-1.5 shadow-2xl shadow-[#312C85]/20 ring-1 ring-slate-100">
                <div className="w-full h-full bg-slate-50 rounded-[2.7rem] flex items-center justify-center text-slate-200">
                  <FaUserCircle size={100} />
                </div>
              </div>
            </div>

            {/* Name & Badge */}
            <div className="text-center mt-8">
              <h1 className="text-3xl font-black text-slate-900 uppercase tracking-tight italic">
                {user.name || "Хэрэглэгч"}
              </h1>
              <div className="inline-flex items-center gap-2 mt-3 px-5 py-2 bg-[#312C85] text-white rounded-full">
                <span className="text-[10px] font-black uppercase tracking-widest">
                  {isTeacher
                    ? "Мэргэжлийн Багш"
                    : `${user.grade || "10B"} Ангийн Сурагч`}
                </span>
              </div>
            </div>

            {/* XP Section (Clean version) */}
            {!isTeacher && (
              <div className="mt-10 w-full max-w-xs bg-white border border-slate-100 p-5 rounded-[2rem] flex items-center justify-between shadow-sm">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-amber-400 rounded-xl flex items-center justify-center text-white shadow-lg shadow-amber-200">
                    <FaTrophy size={16} />
                  </div>
                  <span className="text-xs font-black text-slate-400 uppercase tracking-wider">
                    Нийт оноо
                  </span>
                </div>
                <span className="text-2xl font-black text-[#312C85]">
                  {user.totalXp || 0}{" "}
                  <span className="text-xs text-slate-400">XP</span>
                </span>
              </div>
            )}
          </div>

          {/* Info Details List */}
          <div className="border-t border-slate-50">
            {/* И-мэйл */}
            <div className={infoCardStyle}>
              <div className={iconBoxStyle}>
                <FaEnvelope size={18} />
              </div>
              <div>
                <p className={labelStyle}>И-мэйл хаяг</p>
                <p className={valueStyle}>{user.email}</p>
              </div>
            </div>

            {/* Сургууль */}
            <div className={infoCardStyle}>
              <div className={iconBoxStyle}>
                <FaSchool size={18} />
              </div>
              <div>
                <p className={labelStyle}>Сургууль / Байгууллага</p>
                <p className={valueStyle}>{user.school || "Тодорхойгүй"}</p>
              </div>
            </div>

            {/* Анги (Зөвхөн сурагч) */}
            {!isTeacher && (
              <div className={infoCardStyle}>
                <div className={iconBoxStyle}>
                  <FaLayerGroup size={18} />
                </div>
                <div>
                  <p className={labelStyle}>Анги / Бүлэг</p>
                  <p className={valueStyle}>{user.grade || "10B"}</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Logout эсвэл Буцах товч нэмж болох хэсэг */}
        <div className="mt-10 text-center">
          <p className="text-slate-400 text-[10px] font-bold uppercase tracking-[0.2em]">
            Science Digital Platform © 2024
          </p>
        </div>
      </main>
    </div>
  );
}
