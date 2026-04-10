"use client";

import React, { useState, useEffect, useCallback, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  RotateCw,
  Layers,
  ArrowLeft,
  Loader2,
  AlertCircle,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";

// Дата конфигуудыг бүгдийг нь import хийх (Хичээл бүрээр солигдоно)
import { LESSONS_CONFIG } from "@/constants/lessonsData"; // Chemistry
import { PHYSICS_CONFIG } from "@/constants/lessonDataP"; // Physics
import { BIOLOGY_CONFIG } from "@/constants/lessonDataBio";
import { GEOGRAPHY_CONFIG } from "@/constants/lessonDataGeo";

function CardContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { user } = useAuth();

  const pageId = searchParams.get("pageId") || "default";
  const subject = searchParams.get("subject") || "physics";
  const userClassCode = user?.classCode || "10B";

  const [cards, setCards] = useState([]);
  const [idx, setIdx] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [loading, setLoading] = useState(true);

  // Дата ачаалах функцийг useCallback-аар тогтворжуулах
  const loadCards = useCallback(async () => {
    setLoading(true);
    try {
      // 1. Хичээлийн дагуу статик датаг сонгох
      let configSource;
      if (subject === "chemistry") configSource = LESSONS_CONFIG;
      else if (subject === "biology") configSource = BIOLOGY_CONFIG;
      else if (subject === "geography") configSource = GEOGRAPHY_CONFIG;
      else configSource = PHYSICS_CONFIG;

      const staticCards =
        configSource[pageId]?.cards || configSource[pageId]?.tests || [];

      // 2. Бэкэндээс (DB) дата татах
      const query = `?pageId=${pageId}&classCode=${userClassCode}&subject=${subject}&t=${Date.now()}`;
      const res = await fetch(`/api/card${query}`);

      let dbData = [];
      if (res.ok) {
        dbData = await res.json();
      }

      // 3. Нэгтгэх
      setCards([...dbData, ...staticCards]);
    } catch (err) {
      console.error("Дата татахад алдаа гарлаа:", err);
    } finally {
      setLoading(false);
    }
  }, [pageId, subject, userClassCode]);

  useEffect(() => {
    loadCards();
  }, [loadCards]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-[#F8FAFC]">
        <Loader2 className="animate-spin text-[#312C85]" size={40} />
        <p className="font-black text-[#312C85] uppercase tracking-widest text-[10px] animate-pulse">
          Картуудыг ачаалж байна...
        </p>
      </div>
    );
  }

  if (cards.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-6 bg-[#F8FAFC] p-6 text-center">
        <AlertCircle className="text-slate-200" size={80} />
        <h2 className="font-black text-slate-800 text-xl uppercase tracking-tighter">
          Дата олдсонгүй
        </h2>
        <button
          onClick={() => router.back()}
          className="px-10 py-4 bg-[#312C85] text-white rounded-2xl font-black text-[10px] uppercase shadow-lg transition-transform hover:scale-105"
        >
          БУЦАХ
        </button>
      </div>
    );
  }

  const currentCard = cards[idx];

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Чимэглэл */}
      <div className="absolute top-[-5%] left-[-5%] w-72 h-72 bg-[#312C85]/5 rounded-full blur-3xl" />

      <button
        onClick={() => router.back()}
        className="absolute top-6 left-6 p-4 bg-white text-[#312C85] rounded-2xl shadow-sm border border-slate-50 z-20 hover:bg-slate-50 transition-all active:scale-90"
      >
        <ArrowLeft size={24} strokeWidth={3} />
      </button>

      {/* Карт */}
      <div
        className="w-full max-w-[360px] md:max-w-md aspect-[3/4] cursor-pointer relative z-10"
        style={{ perspective: "2000px" }}
        onClick={() => setFlipped(!flipped)}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="w-full h-full"
          >
            <motion.div
              animate={{ rotateY: flipped ? 180 : 0 }}
              transition={{
                duration: 0.7,
                type: "spring",
                stiffness: 200,
                damping: 25,
              }}
              className="relative w-full h-full shadow-[0_30px_60px_rgba(0,0,0,0.08)]"
              style={{ transformStyle: "preserve-3d" }}
            >
              {/* Front (Асуулт) */}
              <div
                className="absolute inset-0 bg-white rounded-[3.5rem] border border-white p-12 flex flex-col items-center justify-center text-center"
                style={{ backfaceVisibility: "hidden" }}
              >
                <div className="p-5 bg-indigo-50 text-[#312C85] rounded-3xl mb-10">
                  <Layers size={32} strokeWidth={2.5} />
                </div>
                <h3 className="text-2xl md:text-3xl font-black text-slate-800 leading-tight">
                  {currentCard?.question}
                </h3>
                <div className="mt-14 flex items-center gap-3 text-slate-300 font-black text-[9px] uppercase tracking-[0.2em]">
                  <RotateCw
                    size={12}
                    strokeWidth={3}
                    className="animate-spin-slow"
                  />
                  Дарж хариултыг хар
                </div>
              </div>

              {/* Back (Хариулт) */}
              <div
                className="absolute inset-0 bg-[#312C85] rounded-[3.5rem] p-12 flex flex-col items-center justify-center text-center text-white shadow-inner"
                style={{
                  backfaceVisibility: "hidden",
                  transform: "rotateY(180deg)",
                }}
              >
                <p className="text-[10px] font-black opacity-40 uppercase tracking-[0.4em] mb-12">
                  ХАРИУЛТ
                </p>
                <h3 className="text-2xl md:text-3xl font-bold leading-snug px-4">
                  {currentCard?.answer}
                </h3>
                <div className="mt-14 text-[9px] font-black opacity-30 uppercase tracking-widest border border-white/20 px-6 py-2 rounded-full">
                  Буцаж эргүүлэх
                </div>
              </div>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Удирдлага */}
      <div className="flex items-center gap-10 mt-16 bg-white shadow-2xl px-10 py-6 rounded-[2.5rem] border border-white relative z-20 transition-all hover:translate-y-[-4px]">
        <button
          disabled={idx === 0}
          onClick={(e) => {
            e.stopPropagation();
            setIdx(idx - 1);
            setFlipped(false);
          }}
          className="p-3 text-[#312C85] disabled:opacity-20 hover:bg-indigo-50 rounded-2xl transition-all active:scale-90"
        >
          <ChevronLeft size={36} strokeWidth={3} />
        </button>

        <div className="flex flex-col items-center min-w-[70px]">
          <span className="font-black text-[#312C85] text-2xl tabular-nums leading-none">
            {idx + 1}
          </span>
          <div className="w-10 h-1.5 bg-indigo-100 rounded-full my-2" />
          <span className="font-bold text-slate-300 text-[11px] tracking-widest">
            {cards.length}
          </span>
        </div>

        <button
          disabled={idx === cards.length - 1}
          onClick={(e) => {
            e.stopPropagation();
            setIdx(idx + 1);
            setFlipped(false);
          }}
          className="p-3 text-[#312C85] disabled:opacity-20 hover:bg-indigo-50 rounded-2xl transition-all active:scale-90"
        >
          <ChevronRight size={36} strokeWidth={3} />
        </button>
      </div>
    </div>
  );
}

export default function CardPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC]">
          <Loader2 className="animate-spin text-[#312C85]" size={40} />
        </div>
      }
    >
      <CardContent />
    </Suspense>
  );
}
