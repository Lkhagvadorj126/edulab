"use client";
import React, { useState, useEffect, Suspense, useCallback } from "react";
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
import { BIOLOGY_CONFIG } from "@/constants/lessonDataBio";
import { useAuth } from "@/context/AuthContext";

function CardContent() {
  const { user } = useAuth();
  const searchParams = useSearchParams();
  const router = useRouter();

  const pageId = searchParams.get("pageId") || "hoollolt";
  const userClassCode = user?.classCode || "10B";

  const [cards, setCards] = useState([]);
  const [idx, setIdx] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [loading, setLoading] = useState(true);

  const loadCards = useCallback(async () => {
    setLoading(true);
    try {
      const staticCards = BIOLOGY_CONFIG[pageId]?.cards || [];

      // Ангийн кодоор шүүж авах
      const res = await fetch(
        `/api/card?pageId=${pageId}&classCode=${userClassCode}`,
      );
      let dbCards = [];
      if (res.ok) {
        dbCards = await res.json();
      }

      // Динамик картуудыг (Багшийн нэмсэн) эхэнд нь харуулах
      const combined = [...dbCards].reverse().concat(staticCards);
      setCards(combined);
    } catch (err) {
      console.error("Карт ачаалахад алдаа гарлаа:", err);
      setCards(BIOLOGY_CONFIG[pageId]?.cards || []);
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
        <p className="font-black text-slate-400 uppercase tracking-widest text-[10px]">
          Картуудыг ачаалж байна...
        </p>
      </div>
    );

  if (cards.length === 0)
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-6 bg-[#F8FAFC]">
        <div className="p-10 bg-white rounded-[2.5rem] shadow-sm border border-slate-100 text-center">
          <AlertCircle className="mx-auto text-slate-200 mb-4" size={50} />
          <p className="font-black text-slate-400 uppercase tracking-widest text-sm mb-2">
            Карт олдсонгүй
          </p>
          <p className="text-[10px] font-bold text-slate-300 uppercase">
            {userClassCode} АНГИ
          </p>
        </div>
        <button
          onClick={() => router.back()}
          className="px-10 py-3 bg-[#312C85] text-white font-black rounded-2xl shadow-lg hover:opacity-90 transition-all"
        >
          БУЦАХ
        </button>
      </div>
    );

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-[#312C85]/5 rounded-full blur-[100px]" />

      <button
        onClick={() => router.back()}
        className="absolute top-8 left-8 p-4 bg-white text-[#312C85] rounded-2xl shadow-sm border border-slate-100 hover:bg-slate-50 transition-all z-20"
      >
        <ArrowLeft size={24} />
      </button>

      <div className="mb-8 text-center relative z-10">
        <span className="bg-white px-4 py-1.5 rounded-full border border-slate-100 text-[10px] font-black text-[#312C85] uppercase tracking-widest shadow-sm">
          {userClassCode} АНГИЙН САНТАКС
        </span>
      </div>

      <div
        className="w-full max-w-[360px] md:max-w-md aspect-[3/4] cursor-pointer relative z-10"
        style={{ perspective: "2000px" }}
        onClick={() => setFlipped(!flipped)}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={idx}
            initial={{ opacity: 0, x: 50, rotateY: 0 }}
            animate={{
              opacity: 1,
              x: 0,
              rotateY: flipped ? 180 : 0,
            }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="relative w-full h-full shadow-2xl rounded-[3.5rem]"
            style={{ transformStyle: "preserve-3d" }}
          >
            {/* FRONT SIDE */}
            <div
              className="absolute inset-0 bg-white rounded-[3.5rem] border border-slate-100 p-10 flex flex-col items-center justify-center text-center shadow-inner"
              style={{ backfaceVisibility: "hidden" }}
            >
              <div className="p-4 bg-indigo-50 text-[#312C85] rounded-2xl mb-8 border border-indigo-100">
                <Layers size={36} />
              </div>
              <h3 className="text-xl md:text-2xl font-black text-slate-800 uppercase leading-snug tracking-tighter">
                {cards[idx]?.question}
              </h3>
              <div className="mt-12 flex items-center gap-2 text-slate-300 font-black text-[9px] uppercase tracking-[0.2em] animate-pulse">
                <RotateCw size={12} /> ДАРЖ ЭРГҮҮЛ
              </div>
            </div>

            {/* BACK SIDE */}
            <div
              className="absolute inset-0 bg-[#312C85] rounded-[3.5rem] p-10 flex flex-col items-center justify-center text-center text-white"
              style={{
                backfaceVisibility: "hidden",
                transform: "rotateY(180deg)",
              }}
            >
              <p className="text-[10px] font-black opacity-40 uppercase tracking-[0.5em] mb-10">
                ХАРИУЛТ / ТАЙЛБАР
              </p>
              <h3 className="text-xl md:text-2xl font-bold leading-relaxed italic px-4">
                "{cards[idx]?.answer}"
              </h3>
              <div className="mt-12 text-[9px] font-black opacity-30 uppercase tracking-widest border border-white/20 px-5 py-2 rounded-full">
                БУЦАЖ ЭРГҮҮЛЭХ
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* CONTROLS */}
      <div className="flex items-center gap-10 mt-14 bg-white/90 backdrop-blur-md px-8 py-5 rounded-[2.5rem] shadow-xl border border-white relative z-20">
        <button
          disabled={idx === 0}
          onClick={(e) => {
            e.stopPropagation();
            setIdx(idx - 1);
            setFlipped(false);
          }}
          className="p-2 text-[#312C85] disabled:opacity-20 active:scale-90 hover:bg-slate-50 rounded-xl transition-all"
        >
          <ChevronLeft size={36} strokeWidth={3} />
        </button>

        <div className="flex flex-col items-center min-w-[80px]">
          <span className="font-black text-[#312C85] text-xl tabular-nums leading-none">
            {idx + 1}
          </span>
          <div className="w-12 h-1 bg-slate-100 rounded-full my-2 overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${((idx + 1) / cards.length) * 100}%` }}
              className="h-full bg-[#312C85]"
            />
          </div>
          <span className="font-bold text-slate-300 text-[10px]">
            НИЙТ {cards.length}
          </span>
        </div>

        <button
          disabled={idx === cards.length - 1}
          onClick={(e) => {
            e.stopPropagation();
            setIdx(idx + 1);
            setFlipped(false);
          }}
          className="p-2 text-[#312C85] disabled:opacity-20 active:scale-90 hover:bg-slate-50 rounded-xl transition-all"
        >
          <ChevronRight size={36} strokeWidth={3} />
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
      <CardContent />
    </Suspense>
  );
}
