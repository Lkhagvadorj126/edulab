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
  CheckCircle2,
  XCircle,
  Globe,
} from "lucide-react";
import { GEOGRAPHY_CONFIG } from "@/constants/lessonDataGeo";
import { useAuth } from "@/context/AuthContext";

function TestContentGeo() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { user } = useAuth();

  const pageId = searchParams.get("pageId") || "eh_gazar";
  const userClassCode = user?.classCode || "10B";

  const [questions, setQuestions] = useState([]);
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadTests = useCallback(async () => {
    if (!pageId) return;
    setLoading(true);

    try {
      // 1. Config файлаас тухайн сэдвийн 5 тестыг авна
      const staticData = GEOGRAPHY_CONFIG[pageId]?.tests || [];
      console.log("Статик тестүүд:", staticData.length); // Шалгах: 5 байх ёстой

      // 2. Баазаас багшийн нэмсэн тестүүдийг татна
      const res = await fetch(
        `/api/test?pageId=${pageId}&classCode=${userClassCode}&subject=geography`,
      );

      let dbData = [];
      if (res.ok) {
        dbData = await res.json();
        console.log("Баазын тестүүд:", dbData.length); // Шалгах: Багшийн нэмсэн тоо
      }

      // 3. ХАМГИЙН ЧУХАЛ ХЭСЭГ: Хоёр өгөгдлийг шууд нийлүүлнэ (Давхардал шалгахгүй)
      // Ингэснээр багшийн нэмсэн + статик 5 тест нийлээд харагдана
      const allQuestions = [...dbData, ...staticData];

      setQuestions(allQuestions);
    } catch (err) {
      console.error("Тест ачаалахад алдаа гарлаа:", err);
    } finally {
      setLoading(false);
    }
  }, [pageId, userClassCode]);
  useEffect(() => {
    loadTests();
  }, [loadTests]);

  const handleAnswer = (index) => {
    if (selected !== null || !questions[current]) return;
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
        <p className="font-black text-slate-400 uppercase text-[10px] tracking-widest">
          Ачаалж байна...
        </p>
      </div>
    );

  if (questions.length === 0)
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-6 bg-[#F8FAFC]">
        <AlertCircle className="text-slate-200" size={80} />
        <h2 className="font-black text-slate-800 text-xl uppercase">
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
      <div className="absolute -bottom-20 -right-20 opacity-[0.05] text-[#312C85] -rotate-12 pointer-events-none">
        <Globe size={400} />
      </div>

      <button
        onClick={() => router.back()}
        className="absolute top-6 left-6 p-4 bg-white rounded-2xl shadow-sm text-slate-400 hover:text-[#312C85] z-20 transition-all"
      >
        <ChevronLeft size={24} />
      </button>

      <AnimatePresence mode="wait">
        {!finished ? (
          <motion.div
            key={current}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="w-full max-w-2xl bg-white rounded-[2.5rem] p-8 md:p-12 shadow-2xl border border-slate-100 z-10"
          >
            <div className="mb-10 flex justify-between items-center text-[10px] font-black uppercase tracking-widest">
              <span className="bg-slate-100 text-slate-500 px-5 py-2 rounded-full border border-slate-200">
                Асуулт {current + 1} / {questions.length}
              </span>
              <span className="text-blue-600 bg-blue-50 px-5 py-2 rounded-full border border-blue-100">
                Зөв: {score}
              </span>
            </div>

            <h2 className="text-xl md:text-2xl font-black text-slate-800 mb-10 leading-snug">
              {currentQ.question}
            </h2>

            <div className="grid gap-4">
              {currentQ.options?.map((opt, i) => (
                <button
                  key={i}
                  disabled={selected !== null}
                  onClick={() => handleAnswer(i)}
                  className={`p-5 rounded-2xl border-2 text-left font-bold transition-all flex items-center gap-4 ${
                    selected === null
                      ? "border-slate-100 bg-slate-50 hover:border-blue-200"
                      : opt === currentQ.answer
                        ? "border-green-500 bg-green-50 text-green-700"
                        : selected === i
                          ? "border-red-500 bg-red-50 text-red-700"
                          : "opacity-40 border-slate-100 bg-slate-50"
                  }`}
                >
                  <span
                    className={`w-10 h-10 rounded-xl flex items-center justify-center text-xs font-black shadow-sm ${selected === i ? "bg-white" : "bg-slate-200"}`}
                  >
                    {String.fromCharCode(65 + i)}
                  </span>
                  <span className="flex-1">{opt}</span>
                  {selected !== null && opt === currentQ.answer && (
                    <CheckCircle2 size={20} className="text-green-500" />
                  )}
                  {selected === i && opt !== currentQ.answer && (
                    <XCircle size={20} className="text-red-500" />
                  )}
                </button>
              ))}
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white p-12 rounded-[3.5rem] shadow-2xl text-center max-w-md w-full border border-blue-50 z-10"
          >
            <div className="w-24 h-24 bg-blue-50 text-[#312C85] rounded-full flex items-center justify-center mx-auto mb-8 shadow-inner">
              <Award size={48} />
            </div>
            <h2 className="text-3xl font-black mb-2 text-slate-800 uppercase tracking-tighter">
              ДУУСЛАА!
            </h2>
            <div className="bg-slate-50 rounded-3xl p-8 mb-10 border border-slate-100">
              <p className="text-slate-500 text-xs font-black mb-2 uppercase tracking-widest">
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
                className="flex-[2] py-4 bg-[#312C85] text-white rounded-2xl font-black text-[10px] uppercase flex items-center justify-center gap-3 shadow-xl shadow-blue-100"
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

export default function TestGeography() {
  return (
    <Suspense
      fallback={
        <div className="h-screen flex items-center justify-center bg-[#F8FAFC]">
          <Loader2 className="animate-spin text-[#312C85]" size={32} />
        </div>
      }
    >
      <TestContentGeo />
    </Suspense>
  );
}
