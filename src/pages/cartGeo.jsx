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
import { GEOGRAPHY_CONFIG } from "@/constants/lessonDataGeo";
import { useAuth } from "@/context/AuthContext";

function CartContentGeo() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { user } = useAuth();

  const pageId = searchParams.get("pageId") || "eh_gazar";
  const userClassCode = user?.classCode || "10B";

  const [cards, setCards] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [loading, setLoading] = useState(true);

  const loadCards = useCallback(async () => {
    setLoading(true);
    try {
      // 1. Статик картууд ( lessonDataGeo.js-ээс)
      const configCards = GEOGRAPHY_CONFIG[pageId]?.cards || [];

      // 2. Баазаас багшийн нэмсэн картууд (subject=geography)
      const res = await fetch(
        `/api/card?pageId=${pageId}&classCode=${userClassCode}&subject=geography`,
      );

      let dbData = [];
      if (res.ok) {
        dbData = await res.json();
      }

      // 3. Нэгтгэх
      setCards([...dbData, ...configCards]);
    } catch (err) {
      console.error("Cards fetch error:", err);
    } finally {
      setLoading(false);
    }
  }, [pageId, userClassCode]);

  useEffect(() => {
    loadCards();
  }, [loadCards]);

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
        <p className="font-bold text-slate-400 uppercase text-[10px] tracking-widest">
          Картуудыг ачаалж байна...
        </p>
      </div>
    );

  if (cards.length === 0)
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-6 bg-[#F8FAFC]">
        <AlertCircle className="text-slate-200" size={80} />
        <h2 className="font-black text-slate-800 text-xl uppercase tracking-tighter">
          Карт олдсонгүй
        </h2>
        <button
          onClick={() => router.back()}
          className="px-10 py-3 bg-white border border-slate-200 rounded-2xl text-[#312C85] font-black text-xs"
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
        className="absolute top-6 left-6 p-4 bg-white rounded-2xl shadow-sm text-slate-400 hover:text-[#312C85] z-20 transition-colors"
      >
        <ChevronLeft size={24} />
      </button>

      <div className="w-full max-w-md z-10" style={{ perspective: "1000px" }}>
        <div className="mb-8 text-center">
          <span className="bg-blue-50 text-[#312C85] px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest border border-blue-100 shadow-sm">
            Карт {currentIndex + 1} / {cards.length}
          </span>
        </div>

        {/* Карт эргэх хөдөлгөөнт хэсэг */}
        <motion.div
          className="relative w-full h-[450px] cursor-pointer"
          onClick={() => setIsFlipped(!isFlipped)}
          animate={{ rotateY: isFlipped ? 180 : 0 }}
          transition={{
            duration: 0.6,
            type: "spring",
            stiffness: 260,
            damping: 20,
          }}
          style={{ transformStyle: "preserve-3d" }}
        >
          {/* Нүүр тал (Асуулт) */}
          <div
            className="absolute inset-0 w-full h-full bg-white rounded-[3rem] shadow-2xl border border-slate-100 flex flex-col items-center justify-center p-10"
            style={{ backfaceVisibility: "hidden" }}
          >
            <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mb-8">
              <Globe className="text-[#312C85]" size={32} />
            </div>
            <h3 className="text-2xl font-black text-center text-slate-800 leading-snug">
              {currentCard?.question || currentCard?.front}
            </h3>
            <div className="absolute bottom-10 flex items-center gap-2 text-slate-300 font-black text-[10px] uppercase tracking-widest">
              <RotateCw size={12} />
              Дарж хариултыг харна уу
            </div>
          </div>

          {/* Ар тал (Хариулт) */}
          <div
            className="absolute inset-0 w-full h-full bg-[#312C85] rounded-[3rem] shadow-2xl flex flex-col items-center justify-center p-10"
            style={{
              backfaceVisibility: "hidden",
              transform: "rotateY(180deg)",
            }}
          >
            <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mb-8">
              <Award className="text-white" size={32} />
            </div>
            <p className="text-xl font-bold text-center text-white leading-relaxed">
              {currentCard?.answer || currentCard?.back}
            </p>
            <div className="absolute bottom-10 text-white/40 font-black text-[10px] uppercase tracking-widest">
              Зөв хариулт
            </div>
          </div>
        </motion.div>

        {/* Удирдах товчлуурууд */}
        <div className="mt-12 flex items-center justify-between gap-4">
          <button
            onClick={(e) => {
              e.stopPropagation();
              handlePrev();
            }}
            className="p-5 bg-white shadow-lg rounded-2xl text-slate-400 hover:text-[#312C85] transition-all active:scale-90"
          >
            <ChevronLeft size={24} />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsFlipped(!isFlipped);
            }}
            className="flex-1 py-5 bg-white shadow-lg rounded-2xl font-black text-[#312C85] text-xs uppercase tracking-widest flex items-center justify-center gap-2 border border-slate-50"
          >
            <RotateCw size={16} /> Эргүүлэх
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              handleNext();
            }}
            className="p-5 bg-white shadow-lg rounded-2xl text-slate-400 hover:text-[#312C85] transition-all active:scale-90"
          >
            <ChevronRight size={24} />
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
          <Loader2 className="animate-spin text-[#312C85]" size={32} />
        </div>
      }
    >
      <CartContentGeo />
    </Suspense>
  );
}
