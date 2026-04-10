"use client";

import React, { useState, useEffect, Suspense, useCallback } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeft,
  Award,
  RefreshCcw,
  Loader2,
  AlertCircle,
  CheckCircle2,
  XCircle,
  Trophy,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";

// Тохиргооны файлууд
import { LESSONS_CONFIG } from "@/constants/lessonsData";
import { PHYSICS_CONFIG } from "@/constants/lessonDataP";
import { BIOLOGY_CONFIG } from "@/constants/lessonDataBio";
import { GEOGRAPHY_CONFIG } from "@/constants/lessonDataGeo";

function TestContent() {
  const { user } = useAuth();
  const searchParams = useSearchParams();
  const router = useRouter();

  const pageId = searchParams.get("pageId") || "default";
  const subject = searchParams.get("subject") || "physics";
  const userClassCode = user?.classCode || "10B";

  const [questions, setQuestions] = useState([]);
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadTests = useCallback(async () => {
    setLoading(true);
    try {
      let configSource;
      if (subject === "biology") configSource = BIOLOGY_CONFIG;
      else if (subject === "chemistry") configSource = LESSONS_CONFIG;
      else if (subject === "physics") configSource = PHYSICS_CONFIG;
      else if (subject === "geography") configSource = GEOGRAPHY_CONFIG;
      else configSource = BIOLOGY_CONFIG;

      // 1. Статик датаг шалгах
      const staticData = configSource[pageId]?.tests || [];
      console.log("Static Data found:", staticData); // Debug хийхэд хэрэгтэй

      // 2. Дата баазаас татах
      const res = await fetch(
        `/api/test?pageId=${pageId}&classCode=${userClassCode}&subject=${subject}&t=${Date.now()}`,
      );

      let dbData = [];
      if (res.ok) {
        dbData = await res.json();
        console.log("DB Data found:", dbData); // Debug хийхэд хэрэгтэй
      }

      // Хоёр датаг нэгтгэх
      const combined = [...dbData].reverse().concat(staticData);
      setQuestions(combined);
    } catch (err) {
      console.error("Дата ачаалахад алдаа гарлаа:", err);
    } finally {
      setLoading(false);
    }
  }, [pageId, userClassCode, subject]);

  useEffect(() => {
    loadTests();
  }, [loadTests]);

  const saveResult = async (finalScore) => {
    try {
      const total = questions.length;
      const percent = Math.round((finalScore / total) * 100);
      await fetch("/api/test-results", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userName: user?.name || "Зочин",
          classCode: user?.classCode || userClassCode,
          pageId,
          subject,
          score: finalScore,
          totalQuestions: total,
          percentage: percent,
          createdAt: new Date(),
        }),
      });
    } catch (err) {
      console.error(err);
    }
  };

  const handleAnswer = (idx) => {
    if (selected !== null) return;
    setSelected(idx);

    const isCorrect =
      questions[current].options[idx] === questions[current].answer;
    let newScore = score;
    if (isCorrect) {
      newScore = score + 1;
      setScore(newScore);
    }

    setTimeout(() => {
      if (current + 1 < questions.length) {
        setCurrent((prev) => prev + 1);
        setSelected(null);
      } else {
        setFinished(true);
        saveResult(newScore);
      }
    }, 800);
  };

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC]">
        <Loader2 className="animate-spin text-[#312C85]" size={48} />
      </div>
    );

  if (questions.length === 0)
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#F8FAFC] p-6 text-center">
        <AlertCircle size={80} className="text-slate-200 mb-6" />
        <h2 className="text-2xl font-black text-slate-800 mb-6 uppercase">
          Тест олдсонгүй
        </h2>
        <button
          onClick={() => router.back()}
          className="px-12 py-4 bg-[#312C85] text-white rounded-2xl font-bold shadow-xl"
        >
          БУЦАХ
        </button>
      </div>
    );

  const currentQ = questions[current];
  const progress = ((current + 1) / questions.length) * 100;

  return (
    <div className="min-h-screen bg-[#F9FAFB] text-slate-900 font-sans p-4 md:p-8 flex flex-col items-center justify-center relative overflow-hidden">
      {/* Decorative BG */}
      <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-[#312C85]/5 rounded-full blur-3xl" />

      {/* Top Bar */}
      <div className="fixed top-0 left-0 w-full p-6 md:p-10 flex items-center justify-between z-50">
        <button
          onClick={() => router.back()}
          className="p-4 bg-white hover:bg-slate-50 rounded-2xl shadow-sm border border-slate-100 transition-all active:scale-95"
        >
          <ChevronLeft size={24} className="text-[#312C85]" />
        </button>
        <div className="flex flex-col items-end">
          <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">
            Одоогийн оноо
          </span>
          <span className="text-xl font-black text-[#312C85] tabular-nums">
            {score}
          </span>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {!finished ? (
          <motion.div
            key={current}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="w-full max-w-2xl z-10"
          >
            {/* Progress Bar */}
            <div className="mb-8 px-2">
              <div className="flex justify-between items-end mb-3">
                <span className="text-[11px] font-black uppercase text-[#312C85]">
                  Асуулт {current + 1} / {questions.length}
                </span>
                <span className="text-[11px] font-black text-slate-400">
                  {Math.round(progress)}%
                </span>
              </div>
              <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  className="h-full bg-[#312C85] rounded-full"
                />
              </div>
            </div>

            <div className="bg-white rounded-[3rem] p-8 md:p-14 shadow-2xl shadow-slate-200/60 border border-white">
              <h2 className="text-2xl md:text-3xl font-black text-slate-800 mb-12 leading-tight tracking-tight">
                {currentQ?.question}
              </h2>

              <div className="grid gap-4">
                {currentQ?.options?.map((opt, i) => {
                  const isCorrect = opt === currentQ.answer;
                  const isSelected = selected === i;
                  let btnStyle =
                    "bg-slate-50 border-slate-50 hover:bg-white hover:border-slate-200";
                  if (selected !== null) {
                    if (isCorrect)
                      btnStyle =
                        "bg-emerald-50 border-emerald-500 text-emerald-700";
                    else if (isSelected)
                      btnStyle = "bg-rose-50 border-rose-500 text-rose-700";
                    else btnStyle = "bg-slate-50 border-slate-50 opacity-40";
                  }

                  return (
                    <button
                      key={i}
                      disabled={selected !== null}
                      onClick={() => handleAnswer(i)}
                      className={`group p-5 md:p-6 rounded-[2rem] border-2 text-left font-bold transition-all duration-300 flex items-center gap-5 relative overflow-hidden ${btnStyle}`}
                    >
                      <span
                        className={`w-12 h-12 rounded-2xl flex items-center justify-center text-xs font-black transition-all ${isSelected ? "bg-white shadow-md" : "bg-white shadow-sm"}`}
                      >
                        {String.fromCharCode(65 + i)}
                      </span>
                      <span className="flex-1 text-base md:text-lg">{opt}</span>
                      {selected !== null && isCorrect && (
                        <CheckCircle2 className="text-emerald-500" size={24} />
                      )}
                      {selected !== null && isSelected && !isCorrect && (
                        <XCircle className="text-rose-500" size={24} />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white p-10 md:p-16 rounded-[4rem] text-center max-w-md w-full shadow-2xl border border-white z-10"
          >
            <div className="w-24 h-24 bg-amber-50 rounded-[2.5rem] flex items-center justify-center mx-auto mb-8">
              <Trophy size={48} className="text-amber-500" />
            </div>
            <h2 className="text-3xl font-black text-slate-900 mb-2 uppercase tracking-tighter">
              Дууслаа!
            </h2>
            <p className="text-slate-400 font-bold uppercase text-[11px] tracking-widest mb-10">
              Гүйцэтгэл {Math.round((score / questions.length) * 100)}%
            </p>

            <div className="grid grid-cols-2 gap-8 mb-12 bg-slate-50 p-8 rounded-[2.5rem]">
              <div>
                <p className="text-3xl font-black text-[#312C85]">{score}</p>
                <p className="text-[10px] font-black uppercase text-slate-400">
                  Зөв
                </p>
              </div>
              <div>
                <p className="text-3xl font-black text-slate-800">
                  {questions.length}
                </p>
                <p className="text-[10px] font-black uppercase text-slate-400">
                  Нийт
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <button
                onClick={() => window.location.reload()}
                className="w-full py-5 bg-[#312C85] text-white rounded-[2rem] font-black text-xs uppercase tracking-widest shadow-xl hover:scale-[1.02] active:scale-95 transition-all"
              >
                <RefreshCcw size={16} className="inline mr-2" /> Дахин эхлэх
              </button>
              <button
                onClick={() => router.back()}
                className="w-full py-5 bg-slate-100 text-slate-400 rounded-[2rem] font-black text-xs uppercase tracking-widest hover:bg-slate-200 transition-all"
              >
                Буцах
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function TestBiology() {
  return (
    <Suspense
      fallback={
        <div className="h-screen flex items-center justify-center">
          <Loader2 className="animate-spin text-[#312C85]" size={40} />
        </div>
      }
    >
      <TestContent />
    </Suspense>
  );
}
