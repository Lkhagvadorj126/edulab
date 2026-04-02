"use client";
import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  RotateCw,
  Layers,
  ArrowLeft,
  Loader2,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { PHYSICS_CONFIG } from "@/constants/lessonDataP";

function CardContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { user } = useAuth();
  const pageId = searchParams.get("pageId") || "motion";
  const userClassCode = user?.classCode || "";

  const [cards, setCards] = useState([]);
  const [idx, setIdx] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCards = async () => {
      setLoading(true);
      try {
        const configCards = PHYSICS_CONFIG[pageId]?.cards || [];
        const res = await fetch(
          `/api/card?pageId=${pageId}&classCode=${userClassCode}`,
        );
        const dbCards = res.ok ? await res.json() : [];
        setCards([...dbCards, ...configCards]);
      } catch (error) {
        console.error("Cards fetch error:", error);
      } finally {
        setLoading(false);
      }
    };
    if (userClassCode || !loading) fetchCards();
  }, [pageId, userClassCode]);

  if (loading)
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-[#F8FAFC]">
        <Loader2 className="animate-spin text-[#312C85]" size={40} />
        <p className="font-black text-slate-400 uppercase tracking-widest text-[10px]">
          Ачаалж байна...
        </p>
      </div>
    );

  if (cards.length === 0)
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-6 bg-[#F8FAFC]">
        <div className="p-10 bg-white rounded-[2.5rem] shadow-sm border border-slate-100 text-center">
          <Layers className="mx-auto text-slate-200 mb-4" size={50} />
          <p className="font-black text-slate-400 uppercase tracking-widest text-sm">
            Карт олдсонгүй
          </p>
        </div>
        <button
          onClick={() => router.back()}
          className="px-10 py-3 bg-[#312C85] text-white font-black rounded-2xl hover:bg-black transition-all shadow-lg"
        >
          <ArrowLeft size={18} className="inline mr-2" /> БУЦАХ
        </button>
      </div>
    );

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col items-center justify-center p-6 relative overflow-hidden">
      <button
        onClick={() => router.back()}
        className="absolute top-6 left-6 p-4 bg-white text-[#312C85] rounded-2xl shadow-sm border border-slate-100 active:scale-90 z-20 transition-all"
      >
        <ArrowLeft size={24} />
      </button>
      <div
        className="w-full max-w-[360px] md:max-w-md aspect-[3/4] cursor-pointer relative z-10"
        style={{ perspective: "1200px" }}
        onClick={() => setFlipped(!flipped)}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={idx}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0, rotateY: flipped ? 180 : 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 25 }}
            className="relative w-full h-full"
            style={{ transformStyle: "preserve-3d" }}
          >
            <div
              className="absolute inset-0 bg-white rounded-[3.5rem] shadow-2xl border border-slate-100 p-10 flex flex-col items-center justify-center text-center"
              style={{ backfaceVisibility: "hidden" }}
            >
              <div className="p-4 bg-slate-50 text-[#312C85] rounded-2xl mb-8 border border-slate-100 shadow-inner">
                <Layers size={32} />
              </div>
              <h3 className="text-2xl md:text-3xl font-black text-slate-800 uppercase leading-tight tracking-tighter">
                {cards[idx]?.question}
              </h3>
              <div className="mt-12 flex items-center gap-2 text-slate-300 font-black text-[9px] uppercase tracking-[0.2em]">
                <RotateCw size={12} className="animate-spin-slow" /> Дарж
                хариултыг хар
              </div>
            </div>
            <div
              className="absolute inset-0 bg-[#312C85] rounded-[3.5rem] shadow-2xl p-10 flex flex-col items-center justify-center text-center text-white"
              style={{
                backfaceVisibility: "hidden",
                transform: "rotateY(180deg)",
              }}
            >
              <p className="text-[10px] font-black opacity-40 uppercase tracking-[0.4em] mb-10 text-white">
                ХАРИУЛТ
              </p>
              <h3 className="text-xl md:text-2xl font-bold leading-relaxed italic px-4">
                "{cards[idx]?.answer}"
              </h3>
              <div className="mt-12 text-[9px] font-black opacity-30 uppercase tracking-widest border border-white/20 px-5 py-2 rounded-full">
                ЭРГҮҮЛЭХ
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
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
          <ChevronLeft size={32} />
        </button>
        <div className="flex flex-col items-center min-w-[60px] text-[#312C85] font-black">
          <span className="text-xl">{idx + 1}</span>
          <div className="w-8 h-1 bg-slate-100 rounded-full my-1" />
          <span className="text-slate-300 text-[10px]">{cards.length}</span>
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
          <ChevronRight size={32} />
        </button>
      </div>
    </div>
  );
}

export default function CardPhysics() {
  return (
    <Suspense fallback={null}>
      <CardContent />
    </Suspense>
  );
}
