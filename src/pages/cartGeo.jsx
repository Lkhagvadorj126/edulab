"use client";

import React, { useState, useEffect, useCallback, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeft,
  Loader2,
  AlertCircle,
  Globe,
  RotateCw,
  ChevronRight,
  Award,
} from "lucide-react";

// Бүх хичээлийн конфиг
import { GEOGRAPHY_CONFIG } from "@/constants/lessonDataGeo";
import { PHYSICS_CONFIG } from "@/constants/lessonDataP";
import { BIOLOGY_CONFIG } from "@/constants/lessonDataBio";
import { LESSONS_CONFIG } from "@/constants/lessonsData";
import { useAuth } from "@/context/AuthContext";

function CartContentGeo() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { user } = useAuth();

  const pageId = searchParams.get("pageId") || "default";
  const subject = searchParams.get("subject") || "geography"; // Default нь geography
  const userClassCode = user?.classCode || "10B";

  const [cards, setCards] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [loading, setLoading] = useState(true);

  // Дата ачаалах функц
  const loadData = useCallback(async () => {
    setLoading(true);
    try {
      // 1. Хичээлийн дагуу статик датаг сонгох
      let configSource;
      if (subject === "geography") configSource = GEOGRAPHY_CONFIG;
      else if (subject === "physics") configSource = PHYSICS_CONFIG;
      else if (subject === "biology") configSource = BIOLOGY_CONFIG;
      else if (subject === "chemistry") configSource = LESSONS_CONFIG;
      else configSource = GEOGRAPHY_CONFIG;

      const staticCards =
        configSource[pageId]?.cards || configSource[pageId]?.tests || [];

      // 2. Дата баазаас (DB) татах
      const query = `?pageId=${pageId}&classCode=${userClassCode}&subject=${subject}&t=${Date.now()}`;
      const res = await fetch(`/api/card${query}`);

      let dbData = [];
      if (res.ok) {
        dbData = await res.json();
      }

      // 3. Нэгтгэх
      setCards([...dbData, ...staticCards]);
    } catch (err) {
      console.error("Картуудыг ачаалахад алдаа гарлаа:", err);
    } finally {
      setLoading(false);
    }
  }, [pageId, subject, userClassCode]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const handleNext = () => {
    setIsFlipped(false);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % cards.length);
    }, 150);
  };

  const handlePrev = () => {
    setIsFlipped(false);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev - 1 + cards.length) % cards.length);
    }, 150);
  };

  if (loading)
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-[#F8FAFC]">
        <Loader2 className="animate-spin text-[#312C85]" size={40} />
        <p className="font-black text-[#312C85] uppercase text-[10px] tracking-widest animate-pulse">
          Картуудыг ачаалж байна...
        </p>
      </div>
    );

  if (cards.length === 0)
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-6 bg-[#F8FAFC] p-6 text-center">
        <AlertCircle className="text-slate-200" size={80} />
        <h2 className="font-black text-slate-800 text-xl uppercase tracking-tighter">
          Карт олдсонгүй
        </h2>
        <button
          onClick={() => router.back()}
          className="px-10 py-4 bg-[#312C85] text-white rounded-2xl font-black text-[10px] uppercase shadow-xl hover:scale-105 transition-transform"
        >
          БУЦАХ
        </button>
      </div>
    );

  const currentCard = cards[currentIndex];

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-6 flex flex-col items-center justify-center relative overflow-hidden">
      <div className="absolute -bottom-20 -right-20 opacity-[0.03] text-[#312C85] -rotate-12 pointer-events-none">
        <Globe size={400} />
      </div>

      <button
        onClick={() => router.back()}
        className="absolute top-6 left-6 p-4 bg-white rounded-2xl shadow-sm text-slate-400 hover:text-[#312C85] z-20 transition-all border border-slate-50"
      >
        <ChevronLeft size={24} strokeWidth={3} />
      </button>

      <div className="w-full max-w-md z-10" style={{ perspective: "2000px" }}>
        <div className="mb-10 text-center">
          <span className="bg-indigo-50 text-[#312C85] px-6 py-2.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] border border-indigo-100 shadow-sm">
            Карт {currentIndex + 1} / {cards.length}
          </span>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, scale: 0.9, x: 20 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            exit={{ opacity: 0, scale: 0.9, x: -20 }}
            className="relative w-full h-[480px] cursor-pointer"
            onClick={() => setIsFlipped(!isFlipped)}
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
              {/* Нүүр тал (Асуулт) */}
              <div
                className="absolute inset-0 w-full h-full bg-white rounded-[4rem] shadow-[0_30px_60px_rgba(0,0,0,0.05)] border border-white flex flex-col items-center justify-center p-12"
                style={{ backfaceVisibility: "hidden" }}
              >
                <div className="w-16 h-16 bg-blue-50 rounded-[1.5rem] flex items-center justify-center mb-10 shadow-inner">
                  <Globe className="text-[#312C85]" size={32} />
                </div>
                <h3 className="text-2xl md:text-3xl font-black text-center text-slate-800 leading-tight">
                  {currentCard?.question}
                </h3>
                <div className="absolute bottom-12 flex items-center gap-2 text-slate-300 font-black text-[9px] uppercase tracking-[0.2em]">
                  <RotateCw size={12} strokeWidth={3} />
                  Дарж хариултыг харна уу
                </div>
              </div>

              {/* Ар тал (Хариулт) */}
              <div
                className="absolute inset-0 w-full h-full bg-[#312C85] rounded-[4rem] shadow-2xl flex flex-col items-center justify-center p-12 text-white"
                style={{
                  backfaceVisibility: "hidden",
                  transform: "rotateY(180deg)",
                }}
              >
                <div className="w-16 h-16 bg-white/10 rounded-[1.5rem] flex items-center justify-center mb-10">
                  <Award className="text-white" size={32} />
                </div>
                <p className="text-2xl md:text-4xl font-black text-center leading-tight tracking-tight">
                  {currentCard?.answer}
                </p>
                <div className="absolute bottom-12 text-white/30 font-black text-[9px] uppercase tracking-[0.3em]">
                  Зөв хариулт
                </div>
              </div>
            </motion.div>
          </motion.div>
        </AnimatePresence>

        {/* Удирдах товчлуурууд */}
        <div className="mt-12 flex items-center justify-between gap-5">
          <button
            onClick={(e) => {
              e.stopPropagation();
              handlePrev();
            }}
            className="p-6 bg-white shadow-lg rounded-3xl text-slate-400 hover:text-[#312C85] transition-all active:scale-90 border border-slate-50"
          >
            <ChevronLeft size={28} strokeWidth={3} />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsFlipped(!isFlipped);
            }}
            className="flex-1 py-6 bg-white shadow-lg rounded-3xl font-black text-[#312C85] text-[10px] uppercase tracking-[0.2em] flex items-center justify-center gap-3 border border-slate-50 hover:-translate-y-1 transition-all active:scale-95"
          >
            <RotateCw size={16} strokeWidth={3} /> Эргүүлэх
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              handleNext();
            }}
            className="p-6 bg-[#312C85] shadow-lg rounded-3xl text-white hover:bg-black transition-all active:scale-90"
          >
            <ChevronRight size={28} strokeWidth={3} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default function CartGeography() {
  return (
    <Suspense
      fallback={
        <div className="h-screen flex items-center justify-center bg-[#F8FAFC]">
          <Loader2 className="animate-spin text-[#312C85]" size={40} />
        </div>
      }
    >
      <CartContentGeo />
    </Suspense>
  );
}
