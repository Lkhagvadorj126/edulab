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
} from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

function ResultContentManager() {
  const searchParams = useSearchParams();
  const { user, refreshUser } = useAuth();

  const score = parseInt(searchParams.get("score") || "0");
  const total = parseInt(searchParams.get("total") || "10");
  const type = searchParams.get("type") || "all";
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
      {/* Үндсэн онооны карт */}
      <div className="bg-white rounded-[3.5rem] shadow-2xl border border-slate-100 overflow-hidden mb-10 relative">
        <div className="absolute top-0 right-0 p-10 opacity-5 text-[#312C85]">
          <Trophy size={120} />
        </div>

        <div className="p-12 text-center relative z-10">
          <div className="w-24 h-24 bg-gradient-to-br from-yellow-300 to-amber-500 rounded-[2.5rem] flex items-center justify-center mx-auto mb-8 shadow-2xl shadow-yellow-200 text-white animate-bounce-slow">
            <Trophy size={48} />
          </div>

          <h1 className="text-4xl font-black uppercase tracking-tighter text-slate-800 italic">
            {user?.name || "СУРАГЧ"}
          </h1>
          <div className="mt-2 inline-flex items-center gap-2 px-4 py-1.5 bg-[#312C85]/5 rounded-full">
            <Star size={12} className="text-[#312C85] fill-current" />
            <span className="text-[10px] font-black text-[#312C85] uppercase tracking-widest">
              Тест амжилттай дууслаа
            </span>
          </div>

          <div className="flex justify-center gap-6 mt-12">
            <div className="flex-1 bg-slate-50 p-6 rounded-[2.5rem] border border-slate-100">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">
                Авсан XP
              </p>
              <p className="text-3xl font-black text-[#312C85]">+{score}</p>
            </div>
            <div className="flex-1 bg-[#312C85] p-6 rounded-[2.5rem] shadow-xl shadow-[#312C85]/20">
              <p className="text-[10px] font-black text-white/50 uppercase tracking-widest mb-1">
                Нийт оноо
              </p>
              <p className="text-3xl font-black text-white">
                {user?.totalXp || score}
              </p>
            </div>
          </div>
        </div>

        {/* Үйлдлийн товчнууд */}
        <div className="p-8 bg-slate-50/80 backdrop-blur-sm flex gap-4 border-t border-slate-100">
          <Link
            href={`/quiz?topic=${type}`}
            className="flex-1 bg-white border-2 border-slate-200 text-slate-600 py-5 rounded-[1.8rem] font-black text-[10px] uppercase tracking-widest text-center flex items-center justify-center gap-3 hover:bg-slate-100 transition-all active:scale-95"
          >
            <RefreshCw size={18} /> Дахин эхлэх
          </Link>
          <Link
            href="/dashboard"
            className="flex-1 bg-[#312C85] text-white py-5 rounded-[1.8rem] font-black text-[10px] uppercase tracking-widest text-center flex items-center justify-center gap-3 hover:shadow-lg hover:shadow-[#312C85]/30 transition-all active:scale-95"
          >
            <Home size={18} /> Нүүр хуудас
          </Link>
        </div>
      </div>

      {/* Хариултын дэлгэрэнгүй */}
      <div className="space-y-4">
        <h3 className="text-xs font-black text-slate-400 uppercase tracking-[0.3em] mb-6 px-4">
          Хариултын дэлгэрэнгүй
        </h3>
        {answers.map((ans, i) => (
          <div
            key={i}
            className="bg-white p-8 rounded-[2.5rem] border border-slate-100 flex gap-6 items-start shadow-sm transition-all hover:shadow-md"
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
                    Таны сонголт
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
                      Зөв хариулт
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

// Үндсэн ResultContent компонент
export default function ResultContent() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-20 pt-24">
      <Suspense
        fallback={
          <div className="flex items-center justify-center h-64 font-black text-[#312C85] animate-pulse">
            УНШИЖ БАЙНА...
          </div>
        }
      >
        <ResultContentManager />
      </Suspense>
    </div>
  );
}
