"use client";
import React, { Suspense, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import {
  Trophy,
  RefreshCw,
  Home,
  CheckCircle2,
  XCircle,
  Star,
  Dna,
  Leaf,
  Microscope,
} from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

function ResultContentManagerBio() {
  const searchParams = useSearchParams();
  const { user, refreshUser } = useAuth();

  const score = parseInt(searchParams.get("score") || "0");
  const total = parseInt(searchParams.get("total") || "10");
  const type = searchParams.get("topic") || "all";
  const answersRaw = searchParams.get("answers");

  let answers = [];
  try {
    answers = answersRaw ? JSON.parse(decodeURIComponent(answersRaw)) : [];
  } catch (e) {
    console.error("Parse error:", e);
  }

  useEffect(() => {
    if (refreshUser) refreshUser();
  }, []);

  return (
    <div className="max-w-3xl mx-auto py-10 px-6">
      {/* --- ҮНДСЭН ОНООНЫ КАРТ (BIOLOGY THEME) --- */}
      <div className="bg-white rounded-[3.5rem] shadow-2xl border border-slate-100 overflow-hidden mb-10 relative">
        {/* Чимэглэлийн дүрсүүд */}
        <div className="absolute top-0 right-0 p-10 opacity-5 text-[#10B981] rotate-12">
          <Dna size={120} />
        </div>
        <div className="absolute bottom-0 left-0 p-8 opacity-5 text-[#312C85] -rotate-12">
          <Microscope size={80} />
        </div>

        <div className="p-12 text-center relative z-10">
          <div className="w-24 h-24 bg-gradient-to-br from-emerald-400 to-[#10B981] rounded-[2.5rem] flex items-center justify-center mx-auto mb-8 shadow-2xl shadow-emerald-200 text-white animate-bounce-slow">
            <Trophy size={48} />
          </div>

          <h1 className="text-4xl font-black uppercase tracking-tighter text-slate-800 italic">
            {user?.name || "БИОЛОГИЧ"}
          </h1>

          <div className="mt-2 inline-flex items-center gap-2 px-4 py-1.5 bg-emerald-50 rounded-full">
            <Leaf size={12} className="text-emerald-500 fill-current" />
            <span className="text-[10px] font-black text-emerald-600 uppercase tracking-widest">
              Биологийн сорил амжилттай
            </span>
          </div>

          <div className="flex justify-center gap-6 mt-12">
            <div className="flex-1 bg-slate-50 p-6 rounded-[2.5rem] border border-slate-100 group transition-all hover:bg-emerald-50">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 group-hover:text-emerald-400">
                Авсан XP
              </p>
              <p className="text-3xl font-black text-[#10B981]">+{score}</p>
            </div>
            <div className="flex-1 bg-[#312C85] p-6 rounded-[2.5rem] shadow-xl shadow-[#312C85]/20 group">
              <p className="text-[10px] font-black text-white/50 uppercase tracking-widest mb-1 group-hover:text-white/80">
                Нийт оноо
              </p>
              <p className="text-3xl font-black text-white">
                {user?.totalXp || score}
              </p>
            </div>
          </div>
        </div>

        {/* --- ҮЙЛДЛИЙН ТОВЧНУУД --- */}
        <div className="p-8 bg-slate-50/80 backdrop-blur-sm flex flex-col sm:flex-row gap-4 border-t border-slate-100">
          <Link
            href={`/quizContentBio?topic=${type}`}
            className="flex-1 bg-white border-2 border-slate-200 text-slate-600 py-5 rounded-[1.8rem] font-black text-[10px] uppercase tracking-widest text-center flex items-center justify-center gap-3 hover:bg-slate-100 hover:border-[#10B981] hover:text-[#10B981] transition-all active:scale-95"
          >
            <RefreshCw size={18} /> Дахин оролцох
          </Link>
          <Link
            href="/dashboard"
            className="flex-1 bg-[#312C85] text-white py-5 rounded-[1.8rem] font-black text-[10px] uppercase tracking-widest text-center flex items-center justify-center gap-3 hover:shadow-lg hover:shadow-[#312C85]/30 transition-all active:scale-95"
          >
            <Home size={18} /> Нүүр хуудас
          </Link>
        </div>
      </div>

      {/* --- ХАРИУЛТЫН ДЭЛГЭРЭНГҮЙ --- */}
      <div className="space-y-4">
        <div className="flex items-center justify-between px-4 mb-6">
          <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">
            Асуултуудын задаргаа
          </h3>
          <span className="text-[10px] font-black text-emerald-500 uppercase">
            Зөв: {score}/{total}
          </span>
        </div>

        {answers.map((ans, i) => (
          <div
            key={i}
            className="bg-white p-8 rounded-[2.5rem] border border-slate-100 flex gap-6 items-start shadow-sm transition-all hover:shadow-md hover:border-emerald-100"
          >
            <div
              className={
                ans.isCorrect
                  ? "p-3 bg-emerald-50 text-emerald-500 rounded-2xl"
                  : "p-3 bg-red-50 text-red-500 rounded-2xl"
              }
            >
              {ans.isCorrect ? (
                <CheckCircle2 size={24} />
              ) : (
                <XCircle size={24} />
              )}
            </div>
            <div className="flex-1">
              <p className="text-slate-800 font-bold text-lg mb-4 italic leading-snug">
                "{ans.question}"
              </p>
              <div className="flex flex-wrap gap-8">
                <div className="flex flex-col">
                  <span className="text-[9px] font-black text-slate-300 uppercase tracking-widest mb-1">
                    Сонгосон хариулт
                  </span>
                  <span
                    className={`text-xs font-black uppercase ${ans.isCorrect ? "text-emerald-600" : "text-red-500"}`}
                  >
                    {ans.selected}
                  </span>
                </div>
                {!ans.isCorrect && (
                  <div className="flex flex-col border-l border-slate-100 pl-8">
                    <span className="text-[9px] font-black text-slate-300 uppercase tracking-widest mb-1">
                      Зөв байх ёстой
                    </span>
                    <span className="text-xs font-black uppercase text-emerald-600">
                      {ans.correct}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function ResultContentBio() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-20 pt-24">
      <Suspense
        fallback={
          <div className="flex items-center justify-center h-64 font-black text-[#10B981] animate-pulse uppercase tracking-[0.3em]">
            Биологийн үр дүнг боловсруулж байна...
          </div>
        }
      >
        <ResultContentManagerBio />
      </Suspense>
    </div>
  );
}
