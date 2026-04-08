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
import { PHYSICS_CONFIG } from "@/constants/lessonDataP";

function TestContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { user } = useAuth();

  const pageId = searchParams.get("pageId") || "motion";
  const userClassCode = user?.classCode || "";

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
        const configData = PHYSICS_CONFIG[pageId]?.tests || [];
        const res = await fetch(
          `/api/test?pageId=${pageId}&classCode=${userClassCode}`,
        );
        const dbData = res.ok ? await res.json() : [];
        // Өгөгдлийн сангийн асуултуудыг локал дататай нэгтгэх
        setQuestions([...dbData, ...configData]);
      } catch (err) {
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    };
    loadTests();
  }, [pageId, userClassCode]);

  const handleAnswer = (index) => {
    if (selected !== null) return;
    setSelected(index);

    const isCorrect =
      questions[current].options[index] === questions[current].answer;
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
        <p className="font-bold text-slate-400 uppercase tracking-widest text-xs">
          Ачаалж байна...
        </p>
      </div>
    );

  if (questions.length === 0)
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-6 bg-[#F8FAFC]">
        <AlertCircle className="text-slate-200" size={80} />
        <h2 className="font-black text-slate-800 text-xl uppercase tracking-tighter">
          Тест олдсонгүй
        </h2>
        <button
          onClick={() => router.back()}
          className="px-10 py-3 bg-white border border-slate-200 rounded-2xl text-[#312C85] font-black text-xs"
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
        className="absolute top-6 left-6 p-4 bg-white rounded-2xl shadow-sm text-slate-400 hover:text-[#312C85] z-20"
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
                Асуулт {current + 1} / {questions.length}
              </span>
              <span className="text-indigo-600 bg-indigo-50 px-5 py-2 rounded-full">
                Зөв: {score}
              </span>
            </div>

            <h2 className="text-xl md:text-2xl font-black text-slate-800 mb-10 leading-snug">
              {currentQ.question}
            </h2>

            <div className="grid gap-4">
              {currentQ.options?.map((opt, i) => {
                const isSelected = selected === i;
                const isCorrectAnswer = opt === currentQ.answer;

                let btnStyle = "border-slate-100 bg-slate-50";
                if (selected !== null) {
                  if (isCorrectAnswer)
                    btnStyle = "border-green-500 bg-green-50 text-green-700";
                  else if (isSelected)
                    btnStyle = "border-red-500 bg-red-50 text-red-700";
                  else btnStyle = "opacity-40 border-slate-100 bg-slate-50";
                }

                return (
                  <button
                    key={i}
                    disabled={selected !== null}
                    onClick={() => handleAnswer(i)}
                    className={`p-5 rounded-2xl border-2 text-left font-bold transition-all flex items-center gap-4 ${btnStyle}`}
                  >
                    <span
                      className={`w-10 h-10 rounded-xl flex items-center justify-center text-xs font-black shadow-sm ${isSelected ? "bg-white" : "bg-slate-200"}`}
                    >
                      {String.fromCharCode(65 + i)}
                    </span>
                    <span className="flex-1">{opt}</span>
                    {selected !== null && isCorrectAnswer && (
                      <CheckCircle2 size={20} className="text-green-500" />
                    )}
                    {isSelected && !isCorrectAnswer && (
                      <XCircle size={20} className="text-red-500" />
                    )}
                  </button>
                );
              })}
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white p-12 rounded-[3.5rem] shadow-2xl text-center max-w-md w-full border border-indigo-50"
          >
            <div className="w-24 h-24 bg-amber-50 text-amber-500 rounded-full flex items-center justify-center mx-auto mb-8 shadow-inner">
              <Award size={48} />
            </div>
            <h2 className="text-3xl font-black mb-2 text-slate-800 uppercase">
              ДУУСЛАА!
            </h2>
            <div className="bg-slate-50 rounded-3xl p-8 mb-10 border border-slate-100">
              <p className="text-slate-500 text-xs font-black mb-2 uppercase">
                Таны амжилт
              </p>
              <div className="flex items-end justify-center gap-1">
                <span className="text-5xl font-black text-[#312C85]">
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
                className="flex-1 py-4 bg-slate-100 text-slate-600 rounded-2xl font-black text-[10px] uppercase"
              >
                Буцах
              </button>
              <button
                onClick={() => window.location.reload()}
                className="flex-[2] py-4 bg-[#312C85] text-white rounded-2xl font-black text-[10px] uppercase flex items-center justify-center gap-3"
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

export default function TestPhysics() {
  return (
    <Suspense fallback={null}>
      <TestContent />
    </Suspense>
  );
}
