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
  BookOpen,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { BIOLOGY_CONFIG } from "@/constants/lessonDataBio";

function CardContentBio() {
  const { user } = useAuth();
  const searchParams = useSearchParams();
  const router = useRouter();

  const pageId = searchParams.get("pageId") || "default";
  const userClassCode = user?.classCode || "10B";

  const [cards, setCards] = useState([]);
  const [current, setCurrent] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [loading, setLoading] = useState(true);

  const loadCards = useCallback(async () => {
    setLoading(true);
    try {
      // 1. Статик дата (Биологийн конфигурацаас авах)
      const staticData =
        BIOLOGY_CONFIG[pageId]?.cards || BIOLOGY_CONFIG[pageId]?.tests || [];

      // 2. Датабаазаас Биологийн картуудыг татах
      const res = await fetch(
        `/api/card?pageId=${pageId}&classCode=${userClassCode}&subject=biology`,
        { cache: "no-store" },
      );

      let dbCards = [];
      if (res.ok) {
        dbCards = await res.json();
      }

      // 3. Датаг нэгтгэх
      const combined = [...dbCards].reverse().concat(staticData);
      setCards(combined);
    } catch (err) {
      console.error("Биологийн дата ачаалахад алдаа:", err);
    } finally {
      setLoading(false);
    }
  }, [pageId, userClassCode]);

  useEffect(() => {
    loadCards();
  }, [loadCards]);

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC]">
        <Loader2 className="animate-spin text-[#312C85]" size={40} />
      </div>
    );

  if (cards.length === 0)
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#F8FAFC] gap-6">
        <AlertCircle className="text-slate-200" size={80} />
        <h2 className="font-black text-slate-800 text-xl uppercase tracking-tighter">
          Биологийн карт олдсонгүй
        </h2>
        <button
          onClick={() => router.back()}
          className="px-10 py-3 bg-white border border-slate-200 rounded-2xl text-[#312C85] font-black text-xs uppercase"
        >
          Буцах
        </button>
      </div>
    );

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-6 flex flex-col items-center justify-center relative overflow-hidden">
      {/* Чимэглэлийн ДНХ икон */}
      <div className="absolute -bottom-20 -right-20 opacity-[0.03] text-[#312C85] -rotate-12 pointer-events-none">
        <Dna size={400} />
      </div>

      <button
        onClick={() => router.back()}
        className="absolute top-6 left-6 p-4 bg-white rounded-2xl shadow-sm text-slate-400 hover:text-[#312C85] z-20 border border-slate-100"
      >
        <ChevronLeft size={24} />
      </button>

      {/* Progress Header */}
      <div className="w-full max-w-2xl text-center mb-8">
        <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2">
          БИОЛОГИ: КАРТ {current + 1} / {cards.length}
        </p>
        <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
          <motion.div
            className="bg-[#312C85] h-full"
            initial={{ width: 0 }}
            animate={{ width: `${((current + 1) / cards.length) * 100}%` }}
          />
        </div>
      </div>

      {/* 3D Card Area */}
      <div className="relative w-full max-w-2xl h-[400px] [perspective:1000px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            onClick={() => setIsFlipped(!isFlipped)}
            className="w-full h-full cursor-pointer"
          >
            <motion.div
              animate={{ rotateY: isFlipped ? 180 : 0 }}
              transition={{
                duration: 0.6,
                type: "spring",
                stiffness: 260,
                damping: 20,
              }}
              className="w-full h-full relative [transform-style:preserve-3d]"
            >
              {/* FRONT (Question) */}
              <div className="absolute inset-0 bg-white rounded-[3rem] p-12 shadow-2xl border border-slate-100 flex flex-col items-center justify-center [backface-visibility:hidden]">
                <div className="w-14 h-14 bg-green-50 text-green-600 rounded-2xl flex items-center justify-center mb-6">
                  <Leaf size={28} />
                </div>
                <h2 className="text-xl md:text-2xl font-black text-slate-800 text-center leading-relaxed">
                  {cards[current]?.question}
                </h2>
                <p className="mt-8 text-[10px] font-bold text-slate-300 uppercase tracking-widest">
                  Карт дээр дарж хариултыг үзнэ үү
                </p>
              </div>

              {/* BACK (Answer) */}
              <div className="absolute inset-0 bg-[#312C85] text-white rounded-[3rem] p-12 shadow-2xl flex flex-col items-center justify-center [transform:rotateY(180deg)] [backface-visibility:hidden]">
                <span className="text-[10px] font-black opacity-40 uppercase tracking-[0.3em] mb-4">
                  ХАРИУЛТ
                </span>
                <h2 className="text-2xl md:text-3xl font-black text-center leading-tight px-6">
                  {cards[current]?.answer}
                </h2>
              </div>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Controls */}
      <div className="flex gap-4 mt-12 w-full max-w-md">
        <button
          onClick={(e) => {
            e.stopPropagation();
            setCurrent((prev) => Math.max(0, prev - 1));
            setIsFlipped(false);
          }}
          className={`p-5 rounded-2xl bg-white shadow-sm border border-slate-100 text-[#312C85] transition-all ${current === 0 ? "opacity-30" : "hover:shadow-md active:scale-90"}`}
          disabled={current === 0}
        >
          <ChevronLeft size={24} />
        </button>

        <button
          onClick={(e) => {
            e.stopPropagation();
            setIsFlipped(!isFlipped);
          }}
          className="flex-1 px-8 py-5 bg-white shadow-sm border border-slate-100 text-[#312C85] rounded-2xl font-black text-xs uppercase flex items-center justify-center gap-2 transition-all hover:bg-slate-50"
        >
          <RotateCcw size={18} /> Эргүүлэх
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
          className="p-5 rounded-2xl bg-[#312C85] shadow-lg text-white hover:bg-black transition-all active:scale-90"
        >
          <ChevronRight size={24} />
        </button>
      </div>
    </div>
  );
}

export default function CardBiology() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <Loader2 className="animate-spin text-[#312C85]" size={40} />
        </div>
      }
    >
      <CardContentBio />
    </Suspense>
  );
}
