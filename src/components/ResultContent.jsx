"use client";
import React, { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import {
  Trophy,
  RefreshCw,
  Home,
  CheckCircle2,
  XCircle,
  Zap,
} from "lucide-react";
import Link from "next/link";
import NavAll from "./NavAll";
import { useAuth } from "@/context/AuthContext";

function ResultsManager() {
  const searchParams = useSearchParams();
  const { user, refreshUser } = useAuth();
  const score = parseInt(searchParams.get("score") || "0");
  const type = searchParams.get("topic") || "all";
  const answersRaw = searchParams.get("answers");

  // URL-аас ирсэн хариултуудыг задлах
  let answers = [];
  try {
    answers = answersRaw ? JSON.parse(decodeURIComponent(answersRaw)) : [];
  } catch (e) {
    console.error("Answers parse error:", e);
  }

  useEffect(() => {
    // Үр дүнгийн хуудас ачаалагдахад оноог ДАХИН ХАДГАЛАХГҮЙ.
    // Зөвхөн QuizManager-д хадгалагдсан шинэ оноог серверээс татаж UI-г шинэчилнэ.
    if (refreshUser) {
      refreshUser();
    }
  }, []);

  const userName = user?.name || "Сурагч";

  return (
    <div className="min-h-screen bg-slate-50 pb-20 font-sans text-slate-900">
      <NavAll />
      <div className="max-w-3xl mx-auto pt-32 px-6">
        <div className="bg-white rounded-[3rem] shadow-2xl border border-slate-100 overflow-hidden mb-8">
          <div className="p-12 text-center">
            <div className="w-20 h-20 bg-yellow-400 rounded-[2rem] flex items-center justify-center mx-auto mb-6 shadow-xl text-white">
              <Trophy size={40} />
            </div>
            <h1 className="text-4xl font-black uppercase tracking-tighter">
              {userName}
            </h1>
            <p className="text-blue-500 font-bold mt-2">
              Баяр хүргэе! Тестээ дуусгалаа.
            </p>
            <div className="flex justify-center gap-4 mt-8">
              <div className="bg-slate-50 px-8 py-5 rounded-3xl border border-slate-100 text-center">
                <p className="text-[10px] font-black text-slate-400 uppercase">
                  Шинэ оноо
                </p>
                <p className="text-2xl font-black text-blue-600">+{score} XP</p>
              </div>
              <div className="bg-slate-50 px-8 py-5 rounded-3xl border border-slate-100 text-center">
                <p className="text-[10px] font-black text-slate-400 uppercase">
                  Нийт XP
                </p>
                <p className="text-2xl font-black text-slate-800">
                  {user?.totalXp || score}
                </p>
              </div>
            </div>
          </div>
          <div className="p-8 bg-slate-50/50 flex gap-3 border-t">
            <Link
              href={`/quizContent?topic=${type}`}
              className="flex-1 bg-slate-900 text-white py-5 rounded-2xl font-black text-xs uppercase text-center flex items-center justify-center gap-2"
            >
              <RefreshCw size={16} /> Дахин эхлэх
            </Link>
            <Link
              href="/dashboard"
              className="flex-1 bg-white text-slate-600 border border-slate-200 py-5 rounded-2xl font-black text-xs uppercase text-center flex items-center justify-center gap-2"
            >
              <Home size={16} /> Нүүр хуудас
            </Link>
          </div>
        </div>

        {/* Хариултын жагсаалт (answers.map) хэсэг хэвээрээ байна... */}
        <div className="space-y-4">
          {answers.map((ans, i) => (
            <div
              key={i}
              className="bg-white p-6 rounded-[2rem] border border-slate-100 flex gap-5 items-start shadow-sm"
            >
              <div
                className={ans.isCorrect ? "text-emerald-500" : "text-red-500"}
              >
                {ans.isCorrect ? (
                  <CheckCircle2 size={28} />
                ) : (
                  <XCircle size={28} />
                )}
              </div>
              <div className="flex-1">
                <p className="text-slate-800 font-bold mb-3">{ans.question}</p>
                <div className="flex gap-6 text-[11px] font-black uppercase">
                  <div className="flex flex-col">
                    <span className="text-slate-400 mb-1">Таны сонголт:</span>
                    <span
                      className={
                        ans.isCorrect ? "text-emerald-600" : "text-red-500"
                      }
                    >
                      {ans.selected}
                    </span>
                  </div>
                  {!ans.isCorrect && (
                    <div className="flex flex-col border-l pl-6">
                      <span className="text-slate-400 mb-1">Зөв хариулт:</span>
                      <span className="text-emerald-600">{ans.correct}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function FinalResults() {
  return (
    <Suspense>
      <ResultsManager />
    </Suspense>
  );
}
