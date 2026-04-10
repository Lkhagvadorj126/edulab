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
  Dna,
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
  const subject = searchParams.get("subject") || "biology";
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

  // 2. Дүн хадгалах функц
  const saveResult = async (finalScore) => {
    try {
      const total = questions.length;
      const percent = Math.round((finalScore / total) * 100);

      // Өмнө нь хадгалагдсан эсэхийг шалгах
      const checkUrl = `/api/test-results?userName=${encodeURIComponent(user?.name || "Зочин")}&subject=${subject}&pageId=${pageId}&classCode=${userClassCode}`;
      const checkRes = await fetch(checkUrl);

      let canSave = true;
      if (checkRes.ok) {
        const checkData = await checkRes.json();
        if (checkData.count > 0) canSave = false;
      }

      if (canSave) {
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
      }
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
        saveResult(newScore);
      }
    }, 1000);
  };

  if (loading)
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#F8FAFC]">
        <Loader2 className="animate-spin text-[#312C85] mb-4" size={48} />
        <p className="text-[#312C85] font-black text-[10px] uppercase tracking-[0.2em] animate-pulse">
          Асуултуудыг бэлдэж байна...
        </p>
      </div>
    );

  if (questions.length === 0)
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#F8FAFC] p-6 text-center">
        <AlertCircle className="text-slate-200 mb-6" size={80} />
        <h2 className="font-black text-slate-800 text-xl uppercase tracking-tighter mb-6">
          Энэ сэдэвт одоогоор тест алга
        </h2>
        <button
          onClick={() => router.back()}
          className="px-10 py-4 bg-[#312C85] text-white rounded-2xl font-black text-[10px] uppercase shadow-xl hover:scale-105 transition-transform"
        >
          Буцах
        </button>
      </div>
    );

  const currentQ = questions[current];

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-6 flex flex-col items-center justify-center relative overflow-hidden font-sans">
      {/* Background Icon (Biology focus) */}
      <div className="absolute -bottom-20 -right-20 opacity-[0.03] text-[#312C85] rotate-12 pointer-events-none">
        <Dna size={450} />
      </div>

      <button
        onClick={() => router.back()}
        className="absolute top-8 left-8 p-4 bg-white rounded-2xl shadow-sm text-slate-400 z-20 hover:text-[#312C85] transition-all border border-slate-50"
      >
        <ChevronLeft size={24} strokeWidth={3} />
      </button>

      <AnimatePresence mode="wait">
        {!finished ? (
          <motion.div
            key={current}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="w-full max-w-2xl bg-white rounded-[3rem] p-8 md:p-12 shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-white relative z-10"
          >
            <div className="mb-12 flex justify-between items-center text-[10px] font-black uppercase tracking-widest">
              <span className="bg-slate-100 text-slate-500 px-6 py-2.5 rounded-full border border-slate-200">
                {subject} | {current + 1}/{questions.length}
              </span>
              <span className="text-[#312C85] bg-indigo-50 px-6 py-2.5 rounded-full border border-indigo-100">
                Оноо: {score}
              </span>
            </div>

            <h2 className="text-2xl md:text-3xl font-black text-slate-800 mb-12 leading-tight">
              {currentQ.question}
            </h2>

            <div className="grid gap-4">
              {currentQ.options?.map((opt, i) => (
                <button
                  key={i}
                  disabled={selected !== null}
                  onClick={() => handleAnswer(i)}
                  className={`p-6 rounded-3xl border-2 text-left font-bold transition-all flex items-center gap-5 group relative overflow-hidden ${
                    selected === null
                      ? "border-slate-50 bg-slate-50 hover:border-indigo-200 hover:bg-white text-slate-600"
                      : opt === currentQ.answer
                        ? "border-emerald-500 bg-emerald-50 text-emerald-700"
                        : selected === i
                          ? "border-rose-500 bg-rose-50 text-rose-700"
                          : "opacity-40 border-slate-50"
                  }`}
                >
                  <span
                    className={`w-12 h-12 rounded-2xl flex items-center justify-center text-xs font-black shrink-0 transition-colors shadow-sm ${
                      selected !== null && opt === currentQ.answer
                        ? "bg-emerald-500 text-white"
                        : "bg-white text-slate-400"
                    }`}
                  >
                    {String.fromCharCode(65 + i)}
                  </span>
                  <span className="flex-1 text-base md:text-lg">{opt}</span>
                </button>
              ))}
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white p-12 rounded-[4rem] shadow-2xl text-center max-w-md w-full border border-white z-10"
          >
            <div className="w-24 h-24 bg-amber-50 text-amber-500 rounded-[2.5rem] flex items-center justify-center mx-auto mb-8 shadow-inner border border-amber-100">
              <Award size={48} strokeWidth={2.5} />
            </div>

            <h2 className="text-3xl font-black mb-2 text-slate-800 uppercase tracking-tighter">
              ДУУСЛАА!
            </h2>
            <p className="text-slate-400 font-bold text-[10px] uppercase tracking-widest mb-10">
              Таны гүйцэтгэл
            </p>

            <div className="bg-[#F8FAFC] rounded-[3rem] p-10 mb-10 border border-slate-50">
              <span className="text-7xl font-black text-[#312C85] tracking-tighter">
                {Math.round((score / questions.length) * 100)}%
              </span>
              <div className="flex justify-center gap-4 mt-4 text-[10px] font-black uppercase tracking-widest text-slate-400">
                <span>
                  Зөв: <span className="text-emerald-500">{score}</span>
                </span>
                <span>•</span>
                <span>Нийт: {questions.length}</span>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <button
                onClick={() => window.location.reload()}
                className="w-full py-5 bg-[#312C85] text-white rounded-3xl font-black text-[10px] uppercase flex items-center justify-center gap-3 shadow-lg shadow-indigo-100 hover:scale-[1.02] active:scale-95 transition-all"
              >
                <RefreshCcw size={18} strokeWidth={3} /> ДАХИН ЭХЛЭХ
              </button>
              <button
                onClick={() => router.back()}
                className="w-full py-5 bg-slate-100 text-slate-600 rounded-3xl font-black text-[10px] uppercase hover:bg-slate-200 transition-colors"
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
