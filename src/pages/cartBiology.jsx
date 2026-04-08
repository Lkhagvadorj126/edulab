"use client";

import React, { useState, useEffect, Suspense, useCallback } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  RotateCw,
  Globe,
  Loader2,
  AlertCircle,
  RefreshCcw,
} from "lucide-react";
import { GEOGRAPHY_CONFIG } from "@/constants/lessonDataGeo";
import { useAuth } from "@/context/AuthContext";

function CardContentGeo() {
  const { user } = useAuth();
  const searchParams = useSearchParams();
  const router = useRouter();

  const pageId = searchParams.get("pageId") || "eh_gazar";
  const userClassCode = user?.classCode || "10B";

  const [cards, setCards] = useState([]);
  const [idx, setIdx] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [loading, setLoading] = useState(true);

  const loadCards = useCallback(async () => {
    setLoading(true);
    try {
      const staticCards = GEOGRAPHY_CONFIG[pageId]?.cards || [];
      const res = await fetch(
        `/api/card?pageId=${pageId}&classCode=${userClassCode}&subject=geography`,
      );

      let dbCards = [];
      if (res.ok) {
        dbCards = await res.json();
      }

      // Баазаас ирсэн датаг эхэнд нь, статик датаг араас нь оруулна
      const combined = [...dbCards].reverse().concat(staticCards);
      setCards(combined);
    } catch (err) {
      console.error("Карт ачаалахад алдаа гарлаа:", err);
      setCards(GEOGRAPHY_CONFIG[pageId]?.cards || []);
    } finally {
      setLoading(false);
    }
  }, [pageId, userClassCode]);

  useEffect(() => {
    loadCards();
  }, [loadCards]);

  if (loading)
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-[#F8FAFC]">
        <Loader2 className="animate-spin text-[#312C85]" size={40} />
        <p className="font-bold text-slate-400 uppercase tracking-widest text-xs">
          Ачаалж байна...
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
          className="px-10 py-3 bg-white border border-slate-200 rounded-2xl text-[#312C85] font-black text-xs shadow-sm hover:bg-slate-50 transition-all"
        >
          БУЦАХ
        </button>
      </div>
    );

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-6 flex flex-col items-center justify-center relative overflow-hidden">
      {/* Чимэглэлийн дэвсгэр икон */}
      <div className="absolute -bottom-20 -right-20 opacity-[0.03] text-[#312C85] -rotate-12 pointer-events-none">
        <Globe size={400} />
      </div>

      {/* Back Button */}
      <button
        onClick={() => router.back()}
        className="absolute top-6 left-6 p-4 bg-white rounded-2xl shadow-sm text-slate-400 hover:text-[#312C85] z-20 transition-all border border-slate-100"
      >
        <ChevronLeft size={24} />
      </button>

      <AnimatePresence mode="wait">
        <motion.div
          key={idx}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="w-full max-w-2xl flex flex-col items-center"
        >
          {/* Progress Header */}
          <div className="w-full mb-10 flex justify-between items-center text-[10px] font-black uppercase tracking-widest">
            <span className="bg-slate-100 text-slate-500 px-5 py-2 rounded-full border border-slate-200">
              Карт {idx + 1} / {cards.length}
            </span>
            <span className="text-blue-600 bg-blue-50 px-5 py-2 rounded-full border border-blue-100 uppercase">
              Газарзүй
            </span>
          </div>

          {/* Flashcard Component */}
          <div
            className="w-full aspect-[4/3] md:aspect-[16/10] cursor-pointer relative"
            style={{ perspective: "2000px" }}
            onClick={() => setFlipped(!flipped)}
          >
            <motion.div
              animate={{ rotateY: flipped ? 180 : 0 }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
              className="w-full h-full relative"
              style={{ transformStyle: "preserve-3d" }}
            >
              {/* FRONT SIDE */}
              <div
                className="absolute inset-0 bg-white rounded-[2.5rem] p-8 md:p-12 shadow-2xl border border-slate-100 flex flex-col items-center justify-center text-center"
                style={{ backfaceVisibility: "hidden" }}
              >
                <div className="p-4 bg-blue-50 text-[#312C85] rounded-2xl mb-6">
                  <Globe size={32} />
                </div>
                <h2 className="text-xl md:text-3xl font-black text-slate-800 leading-tight">
                  {cards[idx]?.question}
                </h2>
                <p className="mt-8 text-[10px] font-black text-slate-300 uppercase tracking-widest flex items-center gap-2">
                  <RotateCw size={12} className="animate-pulse" /> Дарж
                  хариултыг үзэх
                </p>
              </div>

              {/* BACK SIDE */}
              <div
                className="absolute inset-0 bg-[#312C85] rounded-[2.5rem] p-8 md:p-12 shadow-2xl flex flex-col items-center justify-center text-center text-white"
                style={{
                  backfaceVisibility: "hidden",
                  transform: "rotateY(180deg)",
                }}
              >
                <div className="mb-6 opacity-20">
                  <Globe size={60} />
                </div>
                <span className="text-[10px] font-black opacity-40 uppercase tracking-[0.3em] mb-4">
                  ХАРИУЛТ
                </span>
                <h2 className="text-xl md:text-2xl font-bold leading-relaxed px-4">
                  {cards[idx]?.answer}
                </h2>
                <div className="mt-10 py-2 px-5 rounded-full border border-white/20 text-[9px] font-black uppercase tracking-widest opacity-50">
                  Буцаж эргүүлэх
                </div>
              </div>
            </motion.div>
          </div>

          {/* Controls Footer */}
          <div className="flex gap-4 mt-12 w-full max-w-lg">
            <button
              disabled={idx === 0}
              onClick={(e) => {
                e.stopPropagation();
                setIdx(idx - 1);
                setFlipped(false);
              }}
              className="flex-1 py-4 bg-white border border-slate-200 text-slate-600 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-slate-50 disabled:opacity-30 transition-all flex items-center justify-center gap-2 shadow-sm"
            >
              <ChevronLeft size={18} /> Өмнөх
            </button>

            {idx === cards.length - 1 ? (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIdx(0);
                  setFlipped(false);
                }}
                className="flex-[2] py-4 bg-[#312C85] text-white rounded-2xl font-black text-[10px] uppercase tracking-widest flex items-center justify-center gap-3 shadow-xl shadow-blue-100 hover:opacity-95 transition-all"
              >
                <RefreshCcw size={16} /> Дахин эхлэх
              </button>
            ) : (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIdx(idx + 1);
                  setFlipped(false);
                }}
                className="flex-[2] py-4 bg-[#312C85] text-white rounded-2xl font-black text-[10px] uppercase tracking-widest flex items-center justify-center gap-3 shadow-xl shadow-blue-100 hover:opacity-95 transition-all"
              >
                Дараах <ChevronRight size={18} />
              </button>
            )}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export default function CardGeography() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <Loader2 className="animate-spin text-[#312C85]" />
        </div>
      }
    >
      <CardContentGeo />
    </Suspense>
  );
}
