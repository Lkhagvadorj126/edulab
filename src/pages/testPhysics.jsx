"use client";
import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ChevronLeft, Award, RefreshCcw, Loader2 } from "lucide-react";
import { PHYSICS_CONFIG } from "@/constants/lessonDataP";

function TestContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pageId = searchParams.get("pageId") || "motion";

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
        // 1. Үндсэн статик дата
        const configData = PHYSICS_CONFIG[pageId]?.tests || [];
        // 2. Багшийн нэмсэн дата
        const res = await fetch(`/api/test?pageId=${pageId}`);
        const dbData = res.ok ? await res.json() : [];

        setQuestions([...dbData, ...configData]);
      } catch (err) {
        console.error("Test load error:", err);
      } finally {
        setLoading(false);
      }
    };
    loadTests();
  }, [pageId]);

  const handleAnswer = (idx) => {
    if (selected !== null) return;
    setSelected(idx);
    const isCorrect =
      questions[current].options[idx] === questions[current].answer;
    if (isCorrect) setScore(score + 1);

    setTimeout(() => {
      if (current + 1 < questions.length) {
        setCurrent(current + 1);
        setSelected(null);
      } else {
        setFinished(true);
      }
    }, 1000);
  };

  if (loading)
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#F8FAFC]">
        <Loader2 className="animate-spin text-[#312C85]" size={40} />
        <p className="font-black text-slate-400 mt-4 uppercase text-xs">
          Ачаалж байна...
        </p>
      </div>
    );

  if (questions.length === 0)
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#F8FAFC]">
        <p className="font-bold text-slate-400 mb-4">
          Энэ сэдэвт тест байхгүй байна.
        </p>
        <button
          onClick={() => router.back()}
          className="text-[#312C85] font-black underline"
        >
          БУЦАХ
        </button>
      </div>
    );

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-6 flex flex-col items-center justify-center">
      <button
        onClick={() => router.back()}
        className="absolute top-6 left-6 p-4 bg-white rounded-2xl shadow-sm text-slate-400 hover:text-[#312C85] transition-all"
      >
        <ChevronLeft size={24} />
      </button>
      {!finished ? (
        <motion.div
          key={current}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="w-full max-w-2xl bg-white rounded-[3rem] p-8 md:p-12 shadow-xl border border-slate-100"
        >
          <div className="mb-8 flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-slate-400">
            <span className="bg-slate-100 px-4 py-2 rounded-full">
              Асуулт {current + 1} / {questions.length}
            </span>
            <span className="text-[#312C85]">Зөв: {score}</span>
          </div>
          <h2 className="text-xl md:text-2xl font-black text-slate-800 mb-10">
            {questions[current].question}
          </h2>
          <div className="grid gap-4">
            {questions[current].options.map((opt, i) => (
              <button
                key={i}
                disabled={selected !== null}
                onClick={() => handleAnswer(i)}
                className={`p-5 rounded-2xl border-2 text-left font-bold transition-all flex items-center gap-4 
                ${selected === i ? (opt === questions[current].answer ? "border-green-500 bg-green-50" : "border-red-500 bg-red-50") : "border-slate-100 bg-slate-50 hover:border-[#312C85]/20"}`}
              >
                <span className="w-8 h-8 rounded-lg bg-white flex items-center justify-center text-xs font-black shadow-sm">
                  {String.fromCharCode(65 + i)}
                </span>
                {opt}
              </button>
            ))}
          </div>
        </motion.div>
      ) : (
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white p-12 rounded-[3.5rem] shadow-2xl text-center max-w-sm w-full border border-slate-50"
        >
          <Award className="mx-auto mb-6 text-amber-500" size={60} />
          <h2 className="text-2xl font-black mb-2 text-slate-800 uppercase italic">
            Амжилттай!
          </h2>
          <p className="text-slate-500 font-bold mb-8">
            Нийт {questions.length} асуултаас{" "}
            <span className="text-[#312C85] text-3xl font-black block">
              {score}
            </span>{" "}
            зөв бөглөлөө.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="w-full py-4 bg-[#312C85] text-white rounded-2xl font-black uppercase tracking-widest flex items-center justify-center gap-3"
          >
            <RefreshCcw size={18} /> ДАХИН ОРОЛДОХ
          </button>
        </motion.div>
      )}
    </div>
  );
}

export default function TestPhysics() {
  return (
    <Suspense fallback={null}>
      <TestContent />
    </Suspense>
  );
}
