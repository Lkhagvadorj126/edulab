"use client";
import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ChevronLeft, Award, RefreshCcw, Loader2 } from "lucide-react";

function TestContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pageId = searchParams.get("pageId") || "molecular";

  const [questions, setQuestions] = useState([]);
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/test?pageId=${pageId}`)
      .then((res) => res.json())
      .then((data) => {
        setQuestions(data);
        setLoading(false);
      });
  }, [pageId]);

  const handleAnswer = (idx) => {
    if (selected !== null) return;
    setSelected(idx);

    // Зөв хариултын тексттэй тулгах
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
    }, 1200);
  };

  if (loading)
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <Loader2 className="animate-spin text-[#312C85]" size={40} />
        <p className="font-bold text-slate-400 uppercase tracking-widest text-xs">
          Асуулт ачаалж байна...
        </p>
      </div>
    );

  if (questions.length === 0)
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-6">
        <p className="font-bold text-slate-400">Одоогоор тест ороогүй байна.</p>
        <button
          onClick={() => router.back()}
          className="text-[#312C85] font-bold underline"
        >
          Буцах
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
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-2xl bg-white rounded-[3rem] p-8 md:p-12 shadow-xl border border-slate-100"
        >
          <div className="mb-8 flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-slate-400">
            <span className="bg-slate-100 px-4 py-2 rounded-full">
              Асуулт {current + 1} / {questions.length}
            </span>
            <span className="text-indigo-600">Зөв: {score}</span>
          </div>

          <h2 className="text-xl md:text-2xl font-black text-slate-800 mb-10 leading-snug">
            {questions[current].question}
          </h2>

          <div className="grid gap-4">
            {questions[current].options.map((opt, i) => {
              const isSelected = selected === i;
              const isCorrect = opt === questions[current].answer;

              let style =
                "border-slate-100 bg-slate-50 hover:border-indigo-200 hover:bg-indigo-50/30";
              if (isSelected) {
                style = isCorrect
                  ? "border-green-500 bg-green-50 text-green-700 shadow-md"
                  : "border-red-500 bg-red-50 text-red-700 shadow-md";
              }

              return (
                <button
                  key={i}
                  disabled={selected !== null}
                  onClick={() => handleAnswer(i)}
                  className={`p-5 rounded-2xl border-2 text-left font-bold transition-all flex items-center gap-4 ${style}`}
                >
                  <span
                    className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-black shadow-sm ${isSelected ? "bg-white" : "bg-white"}`}
                  >
                    {String.fromCharCode(65 + i)}
                  </span>
                  {opt}
                </button>
              );
            })}
          </div>
        </motion.div>
      ) : (
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white p-12 rounded-[3.5rem] shadow-2xl text-center max-w-sm w-full border border-indigo-50"
        >
          <div className="w-20 h-20 bg-amber-50 text-amber-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <Award size={40} />
          </div>
          <h2 className="text-2xl font-black mb-2 text-slate-800 uppercase italic">
            Амжилттай!
          </h2>
          <p className="text-slate-500 font-bold mb-8">
            Нийт {questions.length} асуултаас <br />
            <span className="text-indigo-600 text-3xl font-black">
              {score}
            </span>{" "}
            -ыг зөв бөглөлөө.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="w-full py-4 bg-[#312C85] text-white rounded-2xl font-black uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-black transition-all"
          >
            <RefreshCcw size={18} /> Дахин оролдох
          </button>
        </motion.div>
      )}
    </div>
  );
}

export default function TestPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <TestContent />
    </Suspense>
  );
}
