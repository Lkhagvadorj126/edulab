"use client";

import React, { useState, useEffect, Suspense, useCallback } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  RotateCcw,
  Dna,
  Leaf,
  Loader2,
  AlertCircle,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { BIOLOGY_CONFIG } from "@/constants/lessonDataBio";

function CardContentBio() {
  const { user } = useAuth();
  const searchParams = useSearchParams();
  const router = useRouter();

  const pageId = searchParams.get("pageId") || "default";
  const subject = searchParams.get("subject") || "biology"; // Default нь biology
  const userClassCode = user?.classCode || "10B";

  const [cards, setCards] = useState([]);
  const [current, setCurrent] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [loading, setLoading] = useState(true);

  // Дата ачаалах функцийг useCallback-аар гаргав
  const loadData = useCallback(async () => {
    setLoading(true);
    try {
      // 1. Статик өгөгдөл (BIOLOGY_CONFIG-оос авах)
      const configData =
        BIOLOGY_CONFIG[pageId]?.cards || BIOLOGY_CONFIG[pageId]?.tests || [];

      // 2. Дата баазаас татах
      const query = `?pageId=${pageId}&classCode=${userClassCode}&subject=${subject}&t=${Date.now()}`;
      const res = await fetch(`/api/card${query}`);

      let dbData = [];
      if (res.ok) {
        dbData = await res.json();
      }

      // 3. Нэгтгэх (Баазынх эхэнд, дараа нь статик)
      setCards([...dbData, ...configData]);
    } catch (err) {
      console.error("Биологийн картуудыг ачаалахад алдаа гарлаа:", err);
    } finally {
      setLoading(false);
    }
  }, [pageId, subject, userClassCode]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  if (loading)
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#F8FAFC] gap-4">
        <Loader2 className="animate-spin text-[#312C85]" size={40} />
        <p className="text-[10px] font-black text-[#312C85] uppercase tracking-widest animate-pulse">
          Биологийн карт ачаалж байна...
        </p>
      </div>
    );

  if (cards.length === 0)
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#F8FAFC] gap-6 p-6 text-center">
        <AlertCircle className="text-slate-200" size={80} />
        <h2 className="font-black text-slate-800 text-xl uppercase tracking-tighter">
          Биологийн карт олдсонгүй
        </h2>
        <button
          onClick={() => router.back()}
          className="px-10 py-4 bg-[#312C85] text-white rounded-2xl font-black text-[10px] uppercase shadow-lg transition-transform hover:scale-105"
        >
          Буцах
        </button>
      </div>
    );

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-6 flex flex-col items-center justify-center relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute -bottom-20 -right-20 opacity-[0.04] text-[#312C85] -rotate-12 pointer-events-none">
        <Dna size={400} />
      </div>

      <button
        onClick={() => router.back()}
        className="absolute top-6 left-6 p-4 bg-white rounded-2xl shadow-sm text-slate-400 hover:text-[#312C85] z-20 border border-slate-50 transition-all active:scale-90"
      >
        <ChevronLeft size={24} strokeWidth={3} />
      </button>

      {/* Progress Header */}
      <div className="w-full max-w-2xl text-center mb-10 z-10">
        <div className="inline-block px-4 py-1.5 bg-green-50 rounded-full mb-4 border border-green-100">
          <p className="text-[10px] font-black text-green-600 uppercase tracking-[0.2em]">
            Биологи • Карт {current + 1} / {cards.length}
          </p>
        </div>
        <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden shadow-inner border border-white">
          <motion.div
            className="bg-[#312C85] h-full"
            initial={{ width: 0 }}
            animate={{ width: `${((current + 1) / cards.length) * 100}%` }}
            transition={{ type: "spring", stiffness: 50 }}
          />
        </div>
      </div>

      {/* 3D Card Area */}
      <div className="relative w-full max-w-2xl h-[450px] [perspective:2000px] z-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
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
              className="w-full h-full relative"
              style={{ transformStyle: "preserve-3d" }}
            >
              {/* FRONT (Question) */}
              <div
                className="absolute inset-0 bg-white rounded-[4rem] p-12 shadow-[0_30px_60px_rgba(0,0,0,0.06)] border border-white flex flex-col items-center justify-center"
                style={{ backfaceVisibility: "hidden" }}
              >
                <div className="w-16 h-16 bg-green-50 text-green-600 rounded-[1.5rem] flex items-center justify-center mb-8 shadow-inner">
                  <Leaf size={32} />
                </div>
                <h2 className="text-2xl md:text-3xl font-black text-slate-800 text-center leading-tight tracking-tight">
                  {cards[current]?.question}
                </h2>
                <div className="absolute bottom-12 flex items-center gap-2 text-slate-300 font-black text-[9px] uppercase tracking-[0.2em]">
                  <RotateCcw
                    size={12}
                    strokeWidth={3}
                    className="animate-spin-slow"
                  />
                  Дарж хариултыг үзнэ үү
                </div>
              </div>

              {/* BACK (Answer) */}
              <div
                className="absolute inset-0 bg-[#312C85] text-white rounded-[4rem] p-12 shadow-2xl flex flex-col items-center justify-center"
                style={{
                  backfaceVisibility: "hidden",
                  transform: "rotateY(180deg)",
                }}
              >
                <span className="text-[10px] font-black opacity-40 uppercase tracking-[0.4em] mb-12">
                  ЗӨВ ХАРИУЛТ
                </span>
                <h2 className="text-2xl md:text-4xl font-black text-center leading-snug px-4">
                  {cards[current]?.answer}
                </h2>
                <div className="absolute bottom-12 text-white/20 font-black text-[9px] uppercase tracking-widest border border-white/10 px-6 py-2 rounded-full">
                  Эргүүлэх
                </div>
              </div>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Controls */}
      <div className="flex items-center gap-6 mt-14 z-10 w-full max-w-md">
        <button
          onClick={(e) => {
            e.stopPropagation();
            setCurrent((prev) => Math.max(0, prev - 1));
            setIsFlipped(false);
          }}
          className={`p-6 rounded-3xl bg-white shadow-lg border border-slate-50 text-[#312C85] transition-all ${current === 0 ? "opacity-20 cursor-not-allowed" : "hover:-translate-x-1 active:scale-90"}`}
          disabled={current === 0}
        >
          <ChevronLeft size={28} strokeWidth={3} />
        </button>

        <button
          onClick={(e) => {
            e.stopPropagation();
            setIsFlipped(!isFlipped);
          }}
          className="flex-1 py-6 bg-white shadow-lg border border-slate-50 text-[#312C85] rounded-3xl font-black text-[10px] uppercase tracking-[0.2em] flex items-center justify-center gap-3 transition-all hover:-translate-y-1 active:scale-95"
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
          className="p-6 rounded-3xl bg-[#312C85] shadow-[0_15px_30px_rgba(49,44,133,0.3)] text-white hover:bg-black transition-all hover:translate-x-1 active:scale-90"
        >
          <ChevronRight size={28} strokeWidth={3} />
        </button>
      </div>
    </div>
  );
}

export default function CardBiology() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC]">
          <Loader2 className="animate-spin text-[#312C85]" size={40} />
        </div>
      }
    >
      <CardContentBio />
    </Suspense>
  );
}
