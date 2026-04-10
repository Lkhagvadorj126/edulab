"use client";

import React, { useState, useEffect, Suspense, useCallback } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  Loader2,
  AlertCircle,
  BookOpen,
  RotateCcw,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";

// Config файлууд
import { PHYSICS_CONFIG } from "@/constants/lessonDataP";
import { BIOLOGY_CONFIG } from "@/constants/lessonDataBio";
import { GEOGRAPHY_CONFIG } from "@/constants/lessonDataGeo";
import { LESSONS_CONFIG } from "@/constants/lessonsData";

function CartContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { user } = useAuth(); // Хэрэглэгчийн эрх болон ангийг авах

  const pageId = searchParams.get("pageId") || "default";
  const subject = searchParams.get("subject") || "physics";
  const userClassCode = user?.classCode || "10B";

  const [cards, setCards] = useState([]);
  const [current, setCurrent] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [loading, setLoading] = useState(true);

  const loadData = useCallback(async () => {
    setLoading(true);
    try {
      // 1. Статик дата сонгох
      let configSource;
      if (subject === "biology") configSource = BIOLOGY_CONFIG;
      else if (subject === "geography") configSource = GEOGRAPHY_CONFIG;
      else if (subject === "chemistry") configSource = LESSONS_CONFIG;
      else configSource = PHYSICS_CONFIG;

      const staticCards =
        configSource[pageId]?.cards || configSource[pageId]?.tests || [];

      // 2. Бэкэндээс (DB) дата татах
      // t=${Date.now()} нь cache-лахаас сэргийлж үргэлж шинэ дата авчирна
      const query = `?pageId=${pageId}&classCode=${userClassCode}&subject=${subject}&t=${Date.now()}`;
      const res = await fetch(`/api/card${query}`);

      let dbData = [];
      if (res.ok) {
        dbData = await res.json();
      }

      // 3. Нэгтгэх (Баазын датаг эхэнд нь, дараа нь статик датаг)
      const combinedCards = [...dbData, ...staticCards];
      setCards(combinedCards);
    } catch (err) {
      console.error("Дата ачаалахад алдаа гарлаа:", err);
    } finally {
      setLoading(false);
    }
  }, [pageId, subject, userClassCode]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC]">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="animate-spin text-[#312C85]" size={40} />
          <p className="text-[#312C85] font-black text-[10px] uppercase tracking-widest animate-pulse">
            Ачаалж байна...
          </p>
        </div>
      </div>
    );

  if (cards.length === 0)
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#F8FAFC] p-6 text-center">
        <AlertCircle className="text-slate-200 mb-6" size={80} />
        <h2 className="text-xl font-black text-slate-800 mb-4 uppercase">
          Карт олдсонгүй
        </h2>
        <button
          onClick={() => router.back()}
          className="px-10 py-4 bg-[#312C85] text-white rounded-2xl font-black text-[10px] uppercase shadow-lg hover:scale-105 transition-transform"
        >
          Буцах
        </button>
      </div>
    );

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-6 flex flex-col items-center justify-center relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full opacity-[0.02] pointer-events-none">
        <div className="absolute top-10 right-10">
          <BookOpen size={300} />
        </div>
      </div>

      <button
        onClick={() => router.back()}
        className="absolute top-6 left-6 p-4 bg-white rounded-2xl shadow-sm text-slate-400 hover:text-[#312C85] transition-all border border-slate-50 z-20"
      >
        <ChevronLeft size={24} strokeWidth={3} />
      </button>

      <div className="w-full max-w-2xl text-center mb-8 z-10">
        <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-3">
          КАРТ {current + 1} / {cards.length}
        </p>
        <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden border border-white shadow-sm">
          <motion.div
            className="bg-[#312C85] h-full"
            initial={{ width: 0 }}
            animate={{ width: `${((current + 1) / cards.length) * 100}%` }}
            transition={{ type: "spring", stiffness: 50 }}
          />
        </div>
      </div>

      <div className="relative w-full max-w-2xl h-[450px] [perspective:2000px] z-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, x: 100, rotateY: -10 }}
            animate={{ opacity: 1, x: 0, rotateY: 0 }}
            exit={{ opacity: 0, x: -100, rotateY: 10 }}
            onClick={() => setIsFlipped(!isFlipped)}
            className="w-full h-full cursor-pointer"
          >
            <motion.div
              animate={{ rotateY: isFlipped ? 180 : 0 }}
              transition={{
                duration: 0.7,
                type: "spring",
                stiffness: 200,
                damping: 25,
              }}
              className="w-full h-full relative [transform-style:preserve-3d]"
            >
              {/* Нүүр тал (Асуулт) */}
              <div className="absolute inset-0 bg-white rounded-[4rem] p-12 shadow-[0_30px_60px_rgba(0,0,0,0.06)] border border-white flex flex-col items-center justify-center [backface-visibility:hidden]">
                <div className="w-16 h-16 bg-indigo-50 text-[#312C85] rounded-[1.5rem] flex items-center justify-center mb-8 shadow-inner">
                  <BookOpen size={32} />
                </div>
                <h2 className="text-2xl md:text-3xl font-black text-slate-800 text-center leading-[1.4]">
                  {cards[current].question}
                </h2>
                <div className="mt-12 px-6 py-2 bg-slate-50 rounded-full border border-slate-100">
                  <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">
                    Карт дээр дарж хариултыг үзнэ үү
                  </p>
                </div>
              </div>

              {/* Ар тал (Хариулт) */}
              <div className="absolute inset-0 bg-[#312C85] text-white rounded-[4rem] p-12 shadow-2xl flex flex-col items-center justify-center [transform:rotateY(180deg)] [backface-visibility:hidden]">
                <div className="absolute top-12 flex flex-col items-center">
                  <div className="w-1 h-8 bg-white/20 rounded-full mb-4" />
                  <p className="text-[10px] font-black opacity-50 uppercase tracking-[0.2em]">
                    Зөв хариулт
                  </p>
                </div>
                <h2 className="text-3xl md:text-5xl font-black text-center leading-tight text-white tracking-tight px-4">
                  {cards[current].answer}
                </h2>
              </div>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Control Buttons */}
      <div className="flex items-center gap-6 mt-14 z-10">
        <button
          onClick={(e) => {
            e.stopPropagation();
            setCurrent((prev) => Math.max(0, prev - 1));
            setIsFlipped(false);
          }}
          className={`p-6 rounded-[2rem] bg-white shadow-sm border border-slate-100 text-[#312C85] transition-all ${current === 0 ? "opacity-20 cursor-not-allowed" : "hover:shadow-xl hover:-translate-x-1 active:scale-90"}`}
          disabled={current === 0}
        >
          <ChevronLeft size={28} strokeWidth={3} />
        </button>

        <button
          onClick={() => setIsFlipped(!isFlipped)}
          className="px-12 py-6 bg-white shadow-sm border border-slate-100 text-[#312C85] rounded-[2rem] font-black text-[10px] uppercase tracking-[0.2em] hover:shadow-xl hover:-translate-y-1 active:scale-95 flex items-center gap-3 transition-all"
        >
          <RotateCcw size={18} strokeWidth={3} /> Эргүүлэх
        </button>

        <button
          onClick={(e) => {
            e.stopPropagation();
            if (current + 1 < cards.length) {
              setCurrent((prev) => prev + 1);
              setIsFlipped(false);
            } else {
              router.back();
            }
          }}
          className="p-6 rounded-[2rem] bg-[#312C85] shadow-[0_15px_30px_rgba(49,44,133,0.3)] text-white hover:bg-black hover:shadow-black/20 hover:translate-x-1 transition-all active:scale-90"
        >
          <ChevronRight size={28} strokeWidth={3} />
        </button>
      </div>
    </div>
  );
}

export default function CartPhysics() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC]">
          <Loader2 className="animate-spin text-[#312C85]" size={40} />
        </div>
      }
    >
      <CartContent />
    </Suspense>
  );
}
