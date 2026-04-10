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
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";

// Хичээлүүдийн асуултуудын дата (Config)
import { GEOGRAPHY_CONFIG } from "@/constants/lessonDataGeo";
import { BIOLOGY_CONFIG } from "@/constants/lessonDataBio";
import { LESSONS_CONFIG } from "@/constants/lessonsData"; // Chemistry
import { PHYSICS_CONFIG } from "@/constants/lessonDataP";

function TestContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { user } = useAuth();

  // URL-аас параметрүүдийг авах
  const pageId = searchParams.get("pageId") || "default";
  const subject = searchParams.get("subject") || "physics";
  const userClassCode = user?.classCode || "10B";

  const [questions, setQuestions] = useState([]);
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(true);

  // Хичээл болон сэдвийн дагуу асуултуудыг ачаалах
  // TestContent доторх useEffect-ийг ингэж засаарай:
  useEffect(() => {
    const loadTests = async () => {
      setLoading(true);
      try {
        let configSource;
        if (subject === "geography") configSource = GEOGRAPHY_CONFIG;
        else if (subject === "biology") configSource = BIOLOGY_CONFIG;
        else if (subject === "chemistry") configSource = LESSONS_CONFIG;
        else configSource = PHYSICS_CONFIG;

        // 1. Статик датаг авах
        const configData = configSource[pageId]?.tests || [];

        // 2. Дата баазаас (DB) нэмэлтээр татах
        const res = await fetch(
          `/api/test?pageId=${pageId}&classCode=${userClassCode}&subject=${subject}&t=${Date.now()}`,
        );

        let dbData = [];
        if (res.ok) {
          dbData = await res.json();
        }

        // 3. ХОЁР ДАТАГ НЭГТГЭХ (DB-ээс ирсэн нь хамгийн эхэнд харагдана)
        setQuestions([...dbData, ...configData]);
      } catch (err) {
        console.error("Асуулт ачаалахад алдаа гарлаа:", err);
      } finally {
        setLoading(false);
      }
    };
    loadTests();
  }, [pageId, subject, userClassCode]); // userClassCode-ийг хамаарал болгож нэмлээ

  const handleAnswer = (index) => {
    if (selected !== null || !questions[current]) return;
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

        try {
          // ДҮН ХАДГАЛАХ ХЭСЭГ - Нэг ч мөр орхилгүй бүрэн
          const resultData = {
            userName: user?.name || "Зочин",
            classCode: user?.classCode || userClassCode || "10B",
            pageId: pageId,
            subject: subject,
            score: nextScore,
            totalQuestions: questions.length,
            percentage: finalPercent,
            createdAt: new Date(),
          };

          const response = await fetch("/api/test-results", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(resultData),
          });

          const resJson = await response.json();

          if (!response.ok) {
            console.error(
              "Сервер дээр хадгалахад алдаа гарлаа:",
              resJson.message,
            );
          } else {
            console.log("Дүн амжилттай хадгалагдлаа:", resJson.data);
          }
        } catch (dbError) {
          console.error("DB холболтын алдаа:", dbError);
        }
        setFinished(true);
      }
    }, 1000);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC]">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="animate-spin text-[#312C85]" size={48} />
          <p className="font-black text-[10px] text-[#312C85] uppercase tracking-widest animate-pulse">
            Асуултуудыг бэлдэж байна...
          </p>
        </div>
      </div>
    );
  }

  if (questions.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#F8FAFC] p-6 text-center">
        <AlertCircle size={80} className="text-slate-200 mb-6" />
        <h2 className="text-xl font-black text-slate-800 mb-4 uppercase">
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
  }

  const currentQ = questions[current];

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-6 flex flex-col items-center justify-center relative font-sans">
      <button
        onClick={() => router.back()}
        className="absolute top-8 left-8 p-4 bg-white rounded-2xl shadow-sm text-slate-400 hover:text-[#312C85] transition-colors border border-slate-50"
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
            className="w-full max-w-2xl bg-white rounded-[3rem] p-8 md:p-12 shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-white"
          >
            <div className="mb-12 flex justify-between items-center text-[10px] font-black uppercase tracking-widest">
              <span className="bg-slate-100 text-slate-500 px-6 py-2.5 rounded-full">
                {subject} | {current + 1}/{questions.length}
              </span>
              <span className="text-[#312C85] bg-indigo-50 px-6 py-2.5 rounded-full">
                Оноо: {score}
              </span>
            </div>

            <h2 className="text-2xl md:text-3xl font-black text-slate-800 mb-12 leading-tight">
              {currentQ?.question}
            </h2>

            <div className="grid gap-4">
              {currentQ?.options?.map((opt, i) => (
                <button
                  key={i}
                  disabled={selected !== null}
                  onClick={() => handleAnswer(i)}
                  className={`p-6 rounded-3xl border-2 text-left font-bold transition-all flex items-center gap-5 group relative overflow-hidden ${
                    selected !== null
                      ? opt === currentQ.answer
                        ? "border-emerald-500 bg-emerald-50 text-emerald-700"
                        : selected === i
                          ? "border-rose-500 bg-rose-50 text-rose-700"
                          : "border-slate-50 opacity-40"
                      : "border-slate-50 bg-slate-50 hover:border-indigo-200 hover:bg-white text-slate-600"
                  }`}
                >
                  <span
                    className={`w-12 h-12 rounded-2xl flex items-center justify-center text-xs font-black shrink-0 transition-colors ${
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
            className="bg-white p-12 rounded-[4rem] shadow-2xl text-center max-w-md w-full border border-white"
          >
            <div className="w-24 h-24 bg-amber-50 text-amber-500 rounded-[2.5rem] flex items-center justify-center mx-auto mb-8 shadow-inner">
              <Award size={48} strokeWidth={2.5} />
            </div>

            <h2 className="text-3xl font-black text-slate-800 mb-2 uppercase tracking-tighter">
              Амжилттай дууслаа!
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

            <div className="flex gap-4">
              <button
                onClick={() => router.back()}
                className="flex-1 py-5 bg-slate-100 text-slate-600 rounded-3xl font-black uppercase text-[10px] tracking-widest hover:bg-slate-200 transition-colors"
              >
                Гарах
              </button>
              <button
                onClick={() => window.location.reload()}
                className="flex-[1.5] py-5 bg-[#312C85] text-white rounded-3xl font-black uppercase text-[10px] tracking-widest flex items-center justify-center gap-3 shadow-lg shadow-indigo-100 hover:scale-105 active:scale-95 transition-all"
              >
                <RefreshCcw size={16} strokeWidth={3} /> Дахин эхлэх
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
