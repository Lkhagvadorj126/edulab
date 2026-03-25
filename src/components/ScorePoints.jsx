"use client";
import React, { useState, useEffect } from "react";
import NavAll from "../components/NavAll";
import Navbar from "../components/Navbar";
import {
  Trophy,
  UserCircle,
  ChevronRight,
  ChevronLeft,
  Star,
} from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

export default function ScorePoints() {
  const { user: currentUser } = useAuth();
  const [leaders, setLeaders] = useState([]);
  const [loading, setLoading] = useState(true);
  const isTeacher = currentUser?.role === "teacher";

  useEffect(() => {
    fetch("/api/users")
      .then((res) => res.json())
      .then((data) => {
        // Дата заавал Array байгаа эсэхийг шалгах
        setLeaders(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(() => {
        setLeaders([]);
        setLoading(false);
      });
  }, []);

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center font-black text-[#312C85] animate-pulse">
        УНШИЖ БАЙНА...
      </div>
    );

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-20">
      <NavAll />
      <section className="max-w-7xl mx-auto px-4 md:px-8 pt-32">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div className="flex items-center gap-4">
            <Link
              href="/dashboard"
              className="p-3 rounded-2xl bg-white border border-slate-100 shadow-sm text-[#312C85]"
            >
              <ChevronLeft />
            </Link>
            <div>
              <h2 className="text-sm font-black text-[#312C85] uppercase tracking-[0.3em]">
                {isTeacher ? "Сурагчдын явц" : "Шилдэг сурагчид"}
              </h2>
              <div className="h-1 w-12 bg-[#312C85] rounded-full" />
            </div>
          </div>
          {!isTeacher && <Navbar />}
        </div>

        <div className="max-w-[850px] mx-auto space-y-4">
          {leaders.map((user, index) => {
            const isMe =
              user._id === currentUser?.id || user._id === currentUser?._id;
            return (
              <div
                key={user._id}
                className={`flex justify-between items-center p-6 rounded-[2.5rem] bg-white border transition-all duration-500 ${isMe ? "border-[#312C85] shadow-2xl ring-4 ring-[#312C85]/5 scale-[1.02]" : "border-slate-100 shadow-sm hover:shadow-md"}`}
              >
                <div className="flex items-center gap-6">
                  <div
                    className={`w-14 h-14 flex items-center justify-center rounded-2xl font-black text-lg ${isMe ? "bg-[#312C85] text-white" : "bg-slate-50 text-slate-400"}`}
                  >
                    {index + 1}
                  </div>
                  <div className="flex items-center gap-4">
                    <div
                      className={`p-3 rounded-full ${isMe ? "bg-[#312C85]/10" : "bg-slate-50"}`}
                    >
                      <UserCircle
                        className={isMe ? "text-[#312C85]" : "text-slate-300"}
                        size={28}
                      />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <p
                          className={`font-black text-base uppercase ${isMe ? "text-[#312C85]" : "text-slate-800"}`}
                        >
                          {user.name}
                        </p>
                        {isMe && (
                          <span className="bg-[#312C85] text-white text-[8px] px-2 py-0.5 rounded-full font-black flex items-center gap-1">
                            <Star size={8} fill="white" /> БИ
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-[10px] font-bold text-slate-400 bg-slate-100 px-2 py-0.5 rounded-md uppercase tracking-wider">
                          {user.school}
                        </span>
                        <span className="text-[10px] font-black text-[#312C85] bg-[#312C85]/5 px-2 py-0.5 rounded-md">
                          {user.grade}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <div className="text-right">
                    <p
                      className={`font-black text-2xl ${isMe ? "text-[#312C85]" : "text-slate-900"}`}
                    >
                      {user.totalXp || 0}
                    </p>
                    <p className="text-[9px] text-slate-300 font-black uppercase tracking-widest">
                      Нийт XP
                    </p>
                  </div>
                  <ChevronRight
                    className={isMe ? "text-[#312C85]" : "text-slate-200"}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
