"use client";
import React, { useState, useEffect, Suspense, useCallback } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  ChevronLeft,
  Award,
  RefreshCcw,
  Loader2,
  AlertCircle,
} from "lucide-react";
import { BIOLOGY_CONFIG } from "@/constants/lessonDataBio";
import { useAuth } from "@/context/AuthContext";

function TestContent() {
  const { user } = useAuth();
  const searchParams = useSearchParams();
  const router = useRouter();

  const pageId = searchParams.get("pageId") || "hoollolt";
  const userClassCode = user?.classCode || "10B"; // Хэрэглэгчийн ангийн код

  const [questions, setQuestions] = useState([]);
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadTests = useCallback(async () => {
    setLoading(true);
    try {
      // 1. Статик датаг авах
      const staticData = BIOLOGY_CONFIG[pageId]?.tests || [];

      // 2. Датабаазаас динамик датаг ангийн кодоор шүүж авах
      const res = await fetch(
        `/api/test?pageId=${pageId}&classCode=${userClassCode}`,
      );
      let dbData = [];
      if (res.ok) {
        dbData = await res.json();
      }

      // 3. Хоёр датаг нэгтгэх
      const combined = [...dbData].reverse().concat(staticData);
      setQuestions(combined);
    } catch (err) {
      console.error("Дата ачаалахад алдаа гарлаа:", err);
      setQuestions(BIOLOGY_CONFIG[pageId]?.tests || []);
    } finally {
      setLoading(false);
    }
  }, [pageId, userClassCode]);

  useEffect(() => {
    loadTests();
  }, [loadTests]);

  const handleAnswer = (idx) => {
    if (selected !== null) return;
    setSelected(idx);

    const isCorrect =
      questions[current].options[idx] === questions[current].answer;
    if (isCorrect) setScore((prev) => prev + 1);

    setTimeout(() => {
      if (current + 1 < questions.length) {
        setCurrent((prev) => prev + 1);
        setSelected(null);
      } else {
        setFinished(true);
      }
    }, 1000);
  };

  if (loading)
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-[#F8FAFC]">
        <Loader2 className="animate-spin text-[#312C85]" size={40} />
        <p className="font-black text-slate-400 uppercase tracking-widest text-[10px]">
          Тест ачаалж байна...
        </p>
      </div>
    );

  if (questions.length === 0)
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-6 bg-[#F8FAFC]">
        <AlertCircle className="text-slate-200" size={80} />
        <h2 className="font-black text-slate-800 text-xl uppercase tracking-tighter">
          Тест олдсонгүй ({userClassCode} анги)
        </h2>
        <button
          onClick={() => router.back()}
          className="px-10 py-3 bg-white border border-slate-200 rounded-2xl text-[#312C85] font-black text-xs shadow-sm hover:bg-slate-50 transition-all"
        >
          БУЦАХ
        </button>
      </div>
    );

  const currentQ = questions[current];

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-6 flex flex-col items-center justify-center relative overflow-hidden">
      <button
        onClick={() => router.back()}
        className="absolute top-6 left-6 p-4 bg-white rounded-2xl shadow-sm text-slate-400 hover:text-[#312C85] z-20 transition-all border border-slate-100"
      >
        <ChevronLeft size={24} />
      </button>

      {!finished && currentQ ? (
        <motion.div
          key={current}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-2xl bg-white rounded-[2.5rem] p-8 md:p-12 shadow-2xl border border-slate-100 relative z-10"
        >
          <div className="mb-10 flex justify-between items-center text-[10px] font-black uppercase tracking-widest">
            <span className="bg-slate-100 text-slate-500 px-5 py-2 rounded-full border border-slate-200">
              {userClassCode} АНГИ | {current + 1} / {questions.length}
            </span>
            <span className="text-indigo-600 bg-indigo-50 px-5 py-2 rounded-full border border-indigo-100">
              ОНОО: {score}
            </span>
          </div>

          <h2 className="text-xl md:text-2xl font-black text-slate-800 mb-10 leading-snug">
            {currentQ.question}
          </h2>

          <div className="grid gap-4">
            {currentQ.options?.map((opt, i) => {
              const isSelected = selected === i;
              const isCorrectAnswer = opt === currentQ.answer;

              let style =
                "border-slate-100 bg-slate-50 hover:border-indigo-200";
              if (selected !== null) {
                if (isSelected)
                  style = isCorrectAnswer
                    ? "border-green-500 bg-green-50 text-green-700 shadow-md scale-[1.02]"
                    : "border-red-500 bg-red-50 text-red-700 shadow-md scale-[1.02]";
                else if (isCorrectAnswer)
                  style =
                    "border-green-500 bg-green-50 opacity-80 text-green-700";
                else style = "border-slate-100 bg-slate-50 opacity-40";
              }

              return (
                <button
                  key={i}
                  disabled={selected !== null}
                  onClick={() => handleAnswer(i)}
                  className={`p-5 rounded-2xl border-2 text-left font-bold transition-all flex items-center gap-4 group ${style}`}
                >
                  <span
                    className={`w-10 h-10 rounded-xl flex items-center justify-center text-xs font-black shadow-sm transition-all ${isSelected ? "bg-white" : "bg-white group-hover:bg-[#312C85] group-hover:text-white"}`}
                  >
                    {String.fromCharCode(65 + i)}
                  </span>
                  <span className="flex-1">{opt}</span>
                </button>
              );
            })}
          </div>
        </motion.div>
      ) : (
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white p-12 rounded-[3.5rem] shadow-2xl text-center max-w-md w-full border border-indigo-50 relative z-10"
        >
          <div className="w-24 h-24 bg-amber-50 text-amber-500 rounded-full flex items-center justify-center mx-auto mb-8 shadow-inner border border-amber-100">
            <Award size={48} />
          </div>
          <h2 className="text-3xl font-black mb-2 text-slate-800 uppercase tracking-tighter">
            АМЖИЛТТАЙ!
          </h2>
          <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest mb-6">
            {userClassCode} АНГИЙН ТЕСТ
          </p>

          <div className="bg-slate-50 rounded-3xl p-8 mb-10 border border-slate-100">
            <p className="text-slate-500 text-xs font-black mb-2 uppercase tracking-widest">
              Таны зөв хариулт
            </p>
            <div className="flex items-end justify-center gap-1">
              <span className="text-6xl font-black text-[#312C85]">
                {score}
              </span>
              <span className="text-slate-300 text-xl font-bold mb-1">
                / {questions.length}
              </span>
            </div>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => router.back()}
              className="flex-1 py-4 bg-slate-100 text-slate-600 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-slate-200 transition-colors"
            >
              БУЦАХ
            </button>
            <button
              onClick={() => window.location.reload()}
              className="flex-[2] py-4 bg-[#312C85] text-white rounded-2xl font-black text-[10px] uppercase tracking-widest flex items-center justify-center gap-3 shadow-xl shadow-indigo-100 hover:opacity-90 transition-all"
            >
              <RefreshCcw size={16} /> ДАХИН ЭХЛЭХ
            </button>
          </div>
        </motion.div>
      )}
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
