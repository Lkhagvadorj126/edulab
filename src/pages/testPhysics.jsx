"use client";
import React, { useState, useEffect, Suspense } from "react";
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
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { GEOGRAPHY_CONFIG } from "@/constants/lessonDataGeo";
import { BIOLOGY_CONFIG } from "@/constants/lessonDataBio";
import { LESSONS_CONFIG } from "@/constants/lessonsData";
import { PHYSICS_CONFIG } from "@/constants/lessonDataP";

function TestContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { user } = useAuth();

  const pageId = searchParams.get("pageId") || "default";
  const subject = searchParams.get("subject") || "physics";
  const userClassCode = user?.classCode || "10B";

  const [questions, setQuestions] = useState([]);
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadTests = async () => {
      setLoading(true);
      try {
        let configSource;
        if (subject === "geography") configSource = GEOGRAPHY_CONFIG;
        else if (subject === "biology") configSource = BIOLOGY_CONFIG;
        else if (subject === "chemistry") configSource = LESSONS_CONFIG;
        else configSource = PHYSICS_CONFIG;

        const configData = configSource[pageId]?.tests || [];
        setQuestions(configData);
      } catch (err) {
        console.error("Асуулт ачаалахад алдаа:", err);
      } finally {
        setLoading(false);
      }
    };
    loadTests();
  }, [pageId, subject]);

  const handleAnswer = (index) => {
    if (selected !== null) return;
    setSelected(index);

    const isCorrect =
      questions[current].options[index] === questions[current].answer;
    const nextScore = isCorrect ? score + 1 : score;
    if (isCorrect) setScore(nextScore);

    setTimeout(async () => {
      if (current + 1 < questions.length) {
        setCurrent((prev) => prev + 1);
        setSelected(null);
      } else {
        const finalPercent = Math.round((nextScore / questions.length) * 100);

        // 1. Өмнөх дүнг нь шалгах
        const checkRes = await fetch(
          `/api/test-results?userName=${user?.name}&pageId=${pageId}&subject=${subject}&classCode=${userClassCode}`,
        );
        const checkData = await checkRes.json();

        // 2. Хэрэв баазад энэ сурагчийн дүн байхгүй бол (count === 0) хадгална
        if (checkData.count === 0) {
          await fetch("/api/test-results", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              userName: user?.name || "Зочин",
              classCode: userClassCode,
              pageId: pageId,
              subject: subject,
              score: nextScore,
              totalQuestions: questions.length,
              percentage: finalPercent,
            }),
          });
        }
        setFinished(true);
      }
    }, 1000);
  };

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="animate-spin text-[#312C85]" size={40} />
      </div>
    );
  if (questions.length === 0)
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <AlertCircle size={80} className="text-slate-200 mb-4" />
        <button
          onClick={() => router.back()}
          className="px-8 py-3 bg-white border rounded-xl font-bold"
        >
          БУЦАХ
        </button>
      </div>
    );

  const currentQ = questions[current];

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-6 flex flex-col items-center justify-center relative">
      <button
        onClick={() => router.back()}
        className="absolute top-6 left-6 p-4 bg-white rounded-2xl shadow-sm text-slate-400"
      >
        <ChevronLeft size={24} />
      </button>

      <AnimatePresence mode="wait">
        {!finished ? (
          <motion.div
            key={current}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="w-full max-w-2xl bg-white rounded-[2.5rem] p-8 md:p-12 shadow-2xl border border-slate-100"
          >
            <div className="mb-10 flex justify-between items-center text-[10px] font-black uppercase tracking-widest">
              <span className="bg-slate-100 text-slate-500 px-5 py-2 rounded-full">
                {subject} | {current + 1}/{questions.length}
              </span>
              <span className="text-indigo-600 bg-indigo-50 px-5 py-2 rounded-full">
                Зөв: {score}
              </span>
            </div>
            <h2 className="text-xl md:text-2xl font-black text-slate-800 mb-10">
              {currentQ.question}
            </h2>
            <div className="grid gap-4">
              {currentQ.options?.map((opt, i) => (
                <button
                  key={i}
                  disabled={selected !== null}
                  onClick={() => handleAnswer(i)}
                  className={`p-5 rounded-2xl border-2 text-left font-bold transition-all flex items-center gap-4 ${selected !== null ? (opt === currentQ.answer ? "border-green-500 bg-green-50" : selected === i ? "border-red-500 bg-red-50" : "opacity-40") : "border-slate-100 bg-slate-50"}`}
                >
                  <span className="w-10 h-10 rounded-xl flex items-center justify-center text-xs font-black bg-slate-200">
                    {String.fromCharCode(65 + i)}
                  </span>
                  <span className="flex-1">{opt}</span>
                </button>
              ))}
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white p-12 rounded-[3.5rem] shadow-2xl text-center max-w-md w-full border"
          >
            <Award size={64} className="mx-auto mb-6 text-amber-500" />
            <h2 className="text-3xl font-black mb-6">АМЖИЛТТАЙ!</h2>
            <div className="bg-slate-50 rounded-3xl p-8 mb-8">
              <span className="text-6xl font-black text-[#312C85]">
                {Math.round((score / questions.length) * 100)}%
              </span>
              <p className="text-slate-400 font-bold mt-2">
                Зөв: {score} / {questions.length}
              </p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => router.back()}
                className="flex-1 py-4 bg-slate-100 rounded-2xl font-black uppercase text-[10px]"
              >
                Гарах
              </button>
              <button
                onClick={() => window.location.reload()}
                className="flex-[2] py-4 bg-[#312C85] text-white rounded-2xl font-black uppercase text-[10px] flex items-center justify-center gap-2"
              >
                <RefreshCcw size={16} /> Дахин эхлэх
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function UnifiedTest() {
  return (
    <Suspense fallback={null}>
      <TestContent />
    </Suspense>
  );
}
