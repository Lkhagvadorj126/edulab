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
  BarChart3,
} from "lucide-react";

// Тохиргооны файлууд
import { LESSONS_CONFIG } from "@/constants/lessonsData"; // Chemistry
import { PHYSICS_CONFIG } from "@/constants/lessonDataP";
import { BIOLOGY_CONFIG } from "@/constants/lessonDataBio";
import { GEOGRAPHY_CONFIG } from "@/constants/lessonDataGeo";
import { useAuth } from "@/context/AuthContext";

function TestContent() {
  const { user } = useAuth();
  const searchParams = useSearchParams();
  const router = useRouter();

  const pageId = searchParams.get("pageId") || "default";
  const subject = searchParams.get("subject") || "biology"; // Default нь биологи
  const userClassCode = user?.classCode || "10B";

  const [questions, setQuestions] = useState([]);
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(true);

  // 1. Тестүүдийг ачаалах (Статик + Динамик нийлүүлэлт)
  const loadTests = useCallback(async () => {
    setLoading(true);
    try {
      // Хичээлийн төрлөөс хамаарч дата эх сурвалжийг сонгох
      let configSource;
      if (subject === "biology") configSource = BIOLOGY_CONFIG;
      else if (subject === "chemistry") configSource = LESSONS_CONFIG;
      else if (subject === "physics") configSource = PHYSICS_CONFIG;
      else if (subject === "geography") configSource = GEOGRAPHY_CONFIG;
      else configSource = BIOLOGY_CONFIG;

      const staticData = configSource[pageId]?.tests || [];

      // Датабаазаас багшийн нэмсэн тестүүдийг авах
      const res = await fetch(
        `/api/test?pageId=${pageId}&classCode=${userClassCode}&subject=${subject}`,
      );
      let dbData = [];
      if (res.ok) {
        dbData = await res.json();
      }

      // Хоёр датаг нэгтгэх (Багшийн нэмснийг эхэнд нь)
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

  // 2. Дүн хадгалах функц
  const saveResult = async (finalScore) => {
    try {
      const total = questions.length;
      const percent = Math.round((finalScore / total) * 100);

      await fetch("/api/test-results", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userName: user?.name || "Зочин",
          classCode: userClassCode,
          pageId: pageId,
          subject: subject,
          score: finalScore,
          totalQuestions: total,
          percentage: percent,
        }),
      });
    } catch (err) {
      console.error("Дүн хадгалахад алдаа гарлаа:", err);
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
        saveResult(newScore); // Тест дуусахад дүн хадгалах
      }
    }, 800);
  };

  if (loading)
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#F8FAFC]">
        <Loader2 className="animate-spin text-[#312C85] mb-4" size={48} />
        <p className="text-slate-400 font-black text-xs uppercase tracking-widest">
          Ачаалж байна...
        </p>
      </div>
    );

  if (questions.length === 0)
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-6 bg-[#F8FAFC] p-6 text-center">
        <AlertCircle className="text-slate-200" size={80} />
        <h2 className="font-black text-slate-800 text-xl uppercase tracking-tighter">
          Тест олдсонгүй
        </h2>
        <button
          onClick={() => router.back()}
          className="px-10 py-3 bg-[#312C85] text-white rounded-2xl font-black text-xs uppercase"
        >
          Буцах
        </button>
      </div>
    );

  const currentQ = questions[current];

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-6 flex flex-col items-center justify-center relative overflow-hidden">
      <button
        onClick={() => router.back()}
        className="absolute top-6 left-6 p-4 bg-white rounded-2xl shadow-sm text-slate-400 z-20 hover:text-[#312C85] transition-all border border-slate-100"
      >
        <ChevronLeft size={24} />
      </button>

      <AnimatePresence mode="wait">
        {!finished ? (
          <motion.div
            key={current}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="w-full max-w-2xl bg-white rounded-[2.5rem] p-8 md:p-12 shadow-2xl border border-slate-100 relative z-10"
          >
            <div className="mb-10 flex justify-between items-center text-[10px] font-black uppercase tracking-widest">
              <span className="bg-slate-100 text-slate-500 px-5 py-2 rounded-full italic">
                {subject} • {current + 1}/{questions.length}
              </span>
              <span className="text-emerald-600 bg-emerald-50 px-5 py-2 rounded-full">
                Зөв: {score}
              </span>
            </div>

            <h2 className="text-xl md:text-2xl font-black text-slate-800 mb-10 leading-snug">
              {currentQ.question}
            </h2>

            <div className="grid gap-4">
              {currentQ.options?.map((opt, i) => (
                <button
                  key={i}
                  disabled={selected !== null}
                  onClick={() => handleAnswer(i)}
                  className={`p-5 rounded-2xl border-2 text-left font-bold transition-all flex items-center gap-4 ${
                    selected === null
                      ? "border-slate-50 bg-slate-50 hover:border-indigo-200 hover:bg-white"
                      : opt === currentQ.answer
                        ? "border-emerald-500 bg-emerald-50 text-emerald-700"
                        : selected === i
                          ? "border-red-500 bg-red-50 text-red-700"
                          : "opacity-40 border-slate-100"
                  }`}
                >
                  <span
                    className={`w-10 h-10 rounded-xl flex items-center justify-center text-xs font-black shadow-sm ${selected === i ? "bg-white" : "bg-white border"}`}
                  >
                    {String.fromCharCode(65 + i)}
                  </span>
                  <span className="flex-1 text-sm md:text-base">{opt}</span>
                </button>
              ))}
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white p-12 rounded-[3.5rem] shadow-2xl text-center max-w-md w-full border border-indigo-50 z-10"
          >
            <div className="w-24 h-24 bg-amber-50 text-amber-500 rounded-full flex items-center justify-center mx-auto mb-8 shadow-inner border border-amber-100">
              <Award size={48} />
            </div>
            <h2 className="text-3xl font-black mb-2 text-slate-800 uppercase tracking-tighter">
              ДУУСЛАА!
            </h2>

            <div className="bg-slate-50 rounded-3xl p-8 mb-10 border border-slate-100">
              <div className="flex items-end justify-center gap-1">
                <span className="text-6xl font-black text-[#312C85]">
                  {Math.round((score / questions.length) * 100)}%
                </span>
              </div>
              <p className="text-slate-400 font-bold mt-3 text-xs uppercase tracking-widest">
                Зөв: {score} / {questions.length}
              </p>
            </div>

            <div className="flex flex-col gap-3">
              <button
                onClick={() => window.location.reload()}
                className="w-full py-4 bg-slate-100 text-slate-600 rounded-2xl font-black text-[10px] uppercase flex items-center justify-center gap-2"
              >
                <RefreshCcw size={16} /> ДАХИН ЭХЛЭХ
              </button>
              <button
                onClick={() => router.back()}
                className="flex-1 py-4 bg-slate-100 text-slate-600 rounded-2xl font-black text-[10px] uppercase"
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
        <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC]">
          <Loader2 className="animate-spin text-[#312C85]" size={40} />
        </div>
      }
    >
      <TestContent />
    </Suspense>
  );
}
