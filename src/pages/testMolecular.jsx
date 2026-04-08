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
// PHYSICS_CONFIG-оос локал тестүүдийг унших (Хэрэв танай файлын зам өөр бол солиорой)
import { LESSONS_CONFIG } from "@/constants/lessonsData";

function TestContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { user } = useAuth();

  const pageId = searchParams.get("pageId") || "molecular";
  const userClassCode = user?.classCode || "";

  const [questions, setQuestions] = useState([]);
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadTests = async () => {
      // Auth ачаалж дуустал түр хүлээх
      if (!userClassCode && loading && !user) return;

      setLoading(true);
      try {
        // 1. LESSONS_CONFIG-оос локал асуултуудыг авах
        const localTests = LESSONS_CONFIG[pageId]?.tests || [];

        // 2. Өгөгдлийн сангаас багшийн оруулсан асуултуудыг авах
        const res = await fetch(
          `/api/test?pageId=${pageId}&classCode=${userClassCode}`,
        );
        const dbData = res.ok ? await res.json() : [];

        // 3. Хоёр датаг нэгтгэх
        setQuestions([...dbData, ...localTests]);
      } catch (err) {
        console.error("Дата уншихад алдаа гарлаа:", err);
      } finally {
        setLoading(false);
      }
    };
    loadTests();
  }, [pageId, userClassCode]);

  const handleAnswer = (idx) => {
    if (selected !== null || !questions[current]) return;

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
    }, 1200); // Жаахан илүү хугацаа өгснөөр хэрэглэгч зөв/бурууг харж амжина
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-[#F8FAFC]">
        <Loader2 className="animate-spin text-[#312C85]" size={40} />
        <p className="font-bold text-slate-400 uppercase tracking-widest text-[10px]">
          Тест ачаалж байна...
        </p>
      </div>
    );
  }

  if (questions.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-6 bg-[#F8FAFC]">
        <AlertCircle className="text-slate-200" size={80} />
        <div className="text-center">
          <h2 className="font-black text-slate-800 text-xl uppercase tracking-tighter">
            Тест олдсонгүй
          </h2>
          <p className="text-slate-400 text-sm font-medium italic mt-1">
            Энэ хичээлд одоогоор тест ороогүй байна.
          </p>
        </div>
        <button
          onClick={() => router.back()}
          className="bg-white border border-slate-200 px-10 py-3 rounded-2xl text-[#312C85] font-black text-xs hover:shadow-lg transition-all"
        >
          БУЦАХ
        </button>
      </div>
    );
  }

  const currentQ = questions[current];

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-6 flex flex-col items-center justify-center relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-[-10%] right-[-10%] w-96 h-96 bg-[#312C85]/5 rounded-full blur-3xl" />
      <div className="absolute bottom-[-10%] left-[-10%] w-96 h-96 bg-indigo-500/5 rounded-full blur-3xl" />

      <button
        onClick={() => router.back()}
        className="absolute top-6 left-6 p-4 bg-white rounded-2xl shadow-sm text-slate-400 hover:text-[#312C85] transition-all z-20"
      >
        <ChevronLeft size={24} />
      </button>

      <AnimatePresence mode="wait">
        {!finished && currentQ ? (
          <motion.div
            key={current}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.4 }}
            className="w-full max-w-2xl bg-white rounded-[2.5rem] p-8 md:p-12 shadow-2xl border border-slate-100 relative z-10"
          >
            <div className="mb-10 flex justify-between items-center text-[10px] font-black uppercase tracking-widest">
              <span className="bg-slate-100 text-slate-500 px-5 py-2 rounded-full border border-slate-200">
                Асуулт {current + 1} / {questions.length}
              </span>
              <span className="text-indigo-600 bg-indigo-50 px-5 py-2 rounded-full border border-indigo-100">
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

                let btnStyle =
                  "border-slate-100 bg-slate-50 hover:border-indigo-200 hover:bg-indigo-50/50";

                if (selected !== null) {
                  if (isCorrectAnswer) {
                    btnStyle =
                      "border-green-500 bg-green-50 text-green-700 shadow-lg scale-[1.02]";
                  } else if (isSelected) {
                    btnStyle =
                      "border-red-500 bg-red-50 text-red-700 shadow-lg scale-[1.02]";
                  } else {
                    btnStyle = "opacity-40 border-slate-100 bg-slate-50";
                  }
                }

                return (
                  <button
                    key={i}
                    disabled={selected !== null}
                    onClick={() => handleAnswer(i)}
                    className={`p-5 rounded-2xl border-2 text-left font-bold transition-all flex items-center gap-4 group ${btnStyle}`}
                  >
                    <span
                      className={`w-10 h-10 rounded-xl flex items-center justify-center text-xs font-black shadow-sm transition-colors ${isSelected ? "bg-white" : "bg-white group-hover:bg-[#312C85] group-hover:text-white"}`}
                    >
                      {String.fromCharCode(65 + i)}
                    </span>
                    <span className="flex-1">{opt}</span>

                    {/* Хариултын Icon-ууд */}
                    <AnimatePresence>
                      {selected !== null && isCorrectAnswer && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                        >
                          <CheckCircle2 size={24} className="text-green-500" />
                        </motion.div>
                      )}
                      {isSelected && !isCorrectAnswer && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                        >
                          <XCircle size={24} className="text-red-500" />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </button>
                );
              })}
            </div>
          </motion.div>
        ) : (
          finished && (
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-white p-12 rounded-[3.5rem] shadow-2xl text-center max-w-md w-full border border-indigo-50 relative z-10"
            >
              <div className="w-24 h-24 bg-amber-50 text-amber-500 rounded-full flex items-center justify-center mx-auto mb-8 shadow-inner">
                <Award size={48} />
              </div>
              <h2 className="text-3xl font-black mb-2 text-slate-800 uppercase tracking-tighter">
                ДУУСЛАА!
              </h2>
              <p className="text-slate-400 font-bold mb-10 text-sm uppercase tracking-widest">
                Тест амжилттай дууслаа
              </p>

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
                  className="flex-1 py-4 bg-slate-100 text-slate-600 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-slate-200 transition-all"
                >
                  Буцах
                </button>
                <button
                  onClick={() => window.location.reload()}
                  className="flex-[2] py-4 bg-[#312C85] text-white rounded-2xl font-black text-[10px] uppercase tracking-widest flex items-center justify-center gap-3 shadow-xl shadow-indigo-200 hover:bg-black transition-all"
                >
                  <RefreshCcw size={16} /> Дахин эхлэх
                </button>
              </div>
            </motion.div>
          )
        )}
      </AnimatePresence>
    </div>
  );
}

export default function TestPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-white">
          <Loader2 className="animate-spin text-[#312C85]" size={32} />
        </div>
      }
    >
      <TestContent />
    </Suspense>
  );
}
