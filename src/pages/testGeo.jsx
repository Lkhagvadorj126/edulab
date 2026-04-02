"use client";
import React, { useState, useEffect, useCallback, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  ChevronLeft,
  Compass,
  RefreshCcw,
  Loader2,
  AlertCircle,
  Trophy,
} from "lucide-react";
import { GEOGRAPHY_CONFIG } from "@/constants/lessonDataGeo";

function TestContentGeo() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pageId = searchParams.get("pageId") || "planet";

  const [questions, setQuestions] = useState([]);
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadTests = useCallback(async () => {
    setLoading(true);
    try {
      const staticData = GEOGRAPHY_CONFIG[pageId]?.tests || [];
      const res = await fetch(`/api/testGeo?pageId=${pageId}`);

      let dbData = [];
      if (res.ok) {
        dbData = await res.json();
      }

      const combined = [...dbData.reverse(), ...staticData];
      const uniqueTests = Array.from(
        new Map(combined.map((item) => [item.question, item])).values(),
      );

      setQuestions(uniqueTests);
    } catch (err) {
      console.error("Tests fetch error:", err);
    } finally {
      setLoading(false);
    }
  }, [pageId]);

  useEffect(() => {
    loadTests();
  }, [loadTests]);

  const handleAnswer = (idx) => {
    if (selected !== null) return;
    setSelected(idx);

    if (questions[current].options[idx] === questions[current].answer) {
      setScore((prev) => prev + 1);
    }

    setTimeout(() => {
      if (current + 1 < questions.length) {
        setCurrent((prev) => prev + 1);
        setSelected(null);
      } else {
        setFinished(true);
      }
    }, 800);
  };

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC]">
        <Loader2 className="animate-spin text-[#312C85]" size={40} />
      </div>
    );

  if (!questions.length)
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#F8FAFC] p-6 text-center">
        <div className="bg-white p-12 rounded-[3rem] shadow-xl border border-slate-100 max-w-md">
          <AlertCircle className="mx-auto mb-4 text-[#312C85]" size={48} />
          <h2 className="text-xl font-black text-slate-800 mb-2 uppercase">
            Сорил одоогоор алга
          </h2>
          <button
            onClick={() => router.back()}
            className="w-full mt-6 py-4 bg-[#312C85] text-white rounded-2xl font-black uppercase text-xs"
          >
            БУЦАХ
          </button>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-6 flex flex-col items-center justify-center relative overflow-hidden">
      <div className="absolute top-0 right-0 p-20 opacity-[0.03] text-[#312C85] rotate-12 pointer-events-none">
        <Compass size={400} />
      </div>

      <button
        onClick={() => router.back()}
        className="absolute top-8 left-8 p-4 bg-white rounded-2xl shadow-sm text-slate-400 hover:text-[#312C85] z-20 transition-all"
      >
        <ChevronLeft size={24} strokeWidth={3} />
      </button>

      {!finished ? (
        <motion.div
          key={current}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-2xl bg-white rounded-[3.5rem] p-8 md:p-14 shadow-2xl z-10"
        >
          <div className="mb-10 flex justify-between items-center">
            <div className="flex flex-col">
              <span className="text-[10px] font-black uppercase text-slate-300 tracking-widest mb-1">
                Явц
              </span>
              <div className="flex items-center gap-2">
                <span className="text-lg font-black text-[#312C85]">
                  {current + 1}
                </span>
                <div className="w-24 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#312C85] transition-all"
                    style={{
                      width: `${((current + 1) / questions.length) * 100}%`,
                    }}
                  />
                </div>
                <span className="text-xs font-bold text-slate-400">
                  {questions.length}
                </span>
              </div>
            </div>
            <div className="bg-blue-50 px-5 py-2 rounded-2xl border border-blue-100">
              <span className="text-[10px] font-black text-[#312C85] uppercase">
                Оноо: {score}
              </span>
            </div>
          </div>

          <h2 className="text-2xl md:text-3xl font-black text-slate-800 mb-12 italic leading-tight">
            "{questions[current]?.question}"
          </h2>

          <div className="grid gap-4">
            {questions[current]?.options.map((opt, i) => (
              <button
                key={i}
                disabled={selected !== null}
                onClick={() => handleAnswer(i)}
                className={`p-6 rounded-[1.8rem] border-2 text-left font-bold transition-all flex items-center gap-5
                ${
                  selected === i
                    ? opt === questions[current].answer
                      ? "border-emerald-500 bg-emerald-50 text-emerald-700"
                      : "border-red-500 bg-red-50 text-red-700"
                    : selected !== null && opt === questions[current].answer
                      ? "border-emerald-500 bg-emerald-50"
                      : "border-slate-50 bg-slate-50 hover:border-[#312C85]/20"
                }
                `}
              >
                <span className="w-10 h-10 rounded-xl flex items-center justify-center text-sm font-black bg-white shadow-sm">
                  {String.fromCharCode(65 + i)}
                </span>
                <span className="text-sm md:text-base">{opt}</span>
              </button>
            ))}
          </div>
        </motion.div>
      ) : (
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white p-14 rounded-[4rem] shadow-2xl text-center max-w-md w-full border-4 border-blue-50"
        >
          <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-[#312C85] rounded-[2.5rem] flex items-center justify-center mx-auto mb-8 shadow-2xl shadow-blue-200">
            <Trophy className="text-white" size={48} />
          </div>
          <h2 className="text-3xl font-black mb-3 text-slate-800 uppercase">
            Амжилттай!
          </h2>
          <p className="text-slate-400 font-bold mb-10">
            Сорилд <span className="text-[#312C85]">{questions.length}</span>{" "}
            асуултаас
            <span className="text-[#312C85] text-5xl font-black block my-4">
              {score}
            </span>
            зөв хариуллаа.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="w-full py-5 bg-[#312C85] text-white rounded-[2rem] font-black flex items-center justify-center gap-3 shadow-xl uppercase text-xs"
          >
            <RefreshCcw size={18} /> Дахин оролцох
          </button>
        </motion.div>
      )}
    </div>
  );
}

export default function TestGeography() {
  return (
    <Suspense
      fallback={
        <div className="h-screen flex items-center justify-center">
          <Loader2 className="animate-spin text-[#312C85]" />
        </div>
      }
    >
      <TestContentGeo />
    </Suspense>
  );
}
