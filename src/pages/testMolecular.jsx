"use client";
import React, { useState, useEffect, useCallback, Suspense } from "react";
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

// Тохиргооны файлууд
import { LESSONS_CONFIG } from "@/constants/lessonsData";
import { PHYSICS_CONFIG } from "@/constants/lessonDataP";
import { BIOLOGY_CONFIG } from "@/constants/lessonDataBio";
import { GEOGRAPHY_CONFIG } from "@/constants/lessonDataGeo";

function TestContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { user } = useAuth();

  const pageId = searchParams.get("pageId") || "default";
  const subject = searchParams.get("subject") || "chemistry"; // Химийн хичээл үндсэн утга
  const userClassCode = user?.classCode || "10B";

  const [questions, setQuestions] = useState([]);
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(true);

  // Асуулт ачаалах логик
  const loadTests = useCallback(async () => {
    setLoading(true);
    try {
      let configSource;
      if (subject === "geography") configSource = GEOGRAPHY_CONFIG;
      else if (subject === "biology") configSource = BIOLOGY_CONFIG;
      else if (subject === "chemistry") configSource = LESSONS_CONFIG;
      else configSource = PHYSICS_CONFIG;

      const localTests = configSource[pageId]?.tests || [];

      // API-аас нэмэлт асуулт татах
      const res = await fetch(
        `/api/test?pageId=${pageId}&classCode=${userClassCode}&subject=${subject}`,
      );
      const dbData = res.ok ? await res.json() : [];

      setQuestions([...dbData, ...localTests]);
    } catch (err) {
      console.error("Дата уншихад алдаа гарлаа:", err);
    } finally {
      setLoading(false);
    }
  }, [pageId, userClassCode, subject]);

  useEffect(() => {
    loadTests();
  }, [loadTests]);

  const handleAnswer = (idx) => {
    if (selected !== null || !questions[current]) return;
    setSelected(idx);

    const isCorrect =
      questions[current].options[idx] === questions[current].answer;
    const nextScore = isCorrect ? score + 1 : score;
    if (isCorrect) setScore(nextScore);

    setTimeout(async () => {
      if (current + 1 < questions.length) {
        setCurrent((prev) => prev + 1);
        setSelected(null);
      } else {
        const total = questions.length;
        const finalPercent = Math.round((nextScore / total) * 100);

        try {
          // Дүн хадгалахын өмнө шалгах
          const checkRes = await fetch(
            `/api/test-results?userName=${encodeURIComponent(user?.name || "Зочин")}&subject=${subject}&pageId=${pageId}&classCode=${userClassCode}`,
          );

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
                score: nextScore,
                totalQuestions: total,
                percentage: finalPercent,
              }),
            });
          }
        } catch (err) {
          console.error("Дүн хадгалахад алдаа:", err);
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
        <h2 className="font-black text-slate-400 mb-6 uppercase">
          Тест олдсонгүй
        </h2>
        <button
          onClick={() => router.back()}
          className="px-8 py-3 bg-white border rounded-xl font-bold shadow-sm"
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
        className="absolute top-6 left-6 p-4 bg-white rounded-2xl shadow-sm text-slate-400 hover:text-[#312C85] transition-colors"
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
                {subject} • {current + 1}/{questions.length}
              </span>
              <span className="text-indigo-600 bg-indigo-50 px-5 py-2 rounded-full">
                Зөв: {score}
              </span>
            </div>

            <h2 className="text-xl md:text-2xl font-black text-slate-800 mb-10 leading-relaxed">
              {currentQ?.question}
            </h2>

            <div className="grid gap-4">
              {currentQ?.options?.map((opt, i) => (
                <button
                  key={i}
                  disabled={selected !== null}
                  onClick={() => handleAnswer(i)}
                  className={`p-5 rounded-2xl border-2 text-left font-bold transition-all flex items-center gap-4 ${
                    selected !== null
                      ? opt === currentQ.answer
                        ? "border-green-500 bg-green-50 text-green-700"
                        : selected === i
                          ? "border-red-500 bg-red-50 text-red-700"
                          : "opacity-40 border-slate-100"
                      : "border-slate-100 bg-slate-50 hover:border-indigo-200"
                  }`}
                >
                  <span
                    className={`w-10 h-10 rounded-xl flex items-center justify-center text-xs font-black transition-colors ${
                      selected !== null && opt === currentQ.answer
                        ? "bg-green-500 text-white"
                        : "bg-slate-200 text-slate-500"
                    }`}
                  >
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
            className="bg-white p-12 rounded-[3.5rem] shadow-2xl text-center max-w-md w-full border border-slate-100"
          >
            <Award size={64} className="mx-auto mb-6 text-amber-500" />
            <h2 className="text-3xl font-black mb-6 text-slate-800 uppercase">
              Дууслаа!
            </h2>

            <div className="bg-slate-50 rounded-3xl p-8 mb-8 border border-slate-100">
              <span className="text-6xl font-black text-[#312C85]">
                {Math.round((score / questions.length) * 100)}%
              </span>
              <p className="text-slate-400 font-bold mt-2 uppercase text-xs tracking-widest">
                Зөв: {score} / {questions.length}
              </p>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => router.back()}
                className="flex-1 py-4 bg-slate-100 text-slate-600 rounded-2xl font-black uppercase text-[10px]"
              >
                Гарах
              </button>
              <button
                onClick={() => window.location.reload()}
                className="flex-[2] py-4 bg-[#312C85] text-white rounded-2xl font-black uppercase text-[10px] flex items-center justify-center gap-2 hover:bg-[#252166] transition-all shadow-lg shadow-indigo-200"
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

export default function UnifiedMolecularTest() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <Loader2 className="animate-spin" />
        </div>
      }
    >
      <TestContent />
    </Suspense>
  );
}
