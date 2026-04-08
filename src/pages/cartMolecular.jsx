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
  AlertCircle,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
// Таны өгсөн дата файл (замыг нь зөв зааж өгөөрэй)
import { LESSONS_CONFIG } from "@/constants/lessonsData";

function CardContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { user } = useAuth();

  // Хэрэв pageId байхгүй бол density-г анхдагчаар авна
  const pageId = searchParams.get("pageId") || "density";
  const userClassCode = user?.classCode || "";

  const [cards, setCards] = useState([]);
  const [idx, setIdx] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCards = async () => {
      setLoading(true);
      try {
        // 1. LESSONS_CONFIG-оос тухайн pageId-д харгалзах датаг авах
        const localCards = LESSONS_CONFIG[pageId]?.cards || [];

        // 2. Өгөгдлийн сангаас (API) нэмэлт карт байгаа эсэхийг шалгах
        const res = await fetch(
          `/api/card?pageId=${pageId}&classCode=${userClassCode}`,
        );
        const dbData = res.ok ? await res.json() : [];

        // Хоёр датаг нэгтгэх
        const allCards = [...dbData, ...localCards];
        setCards(allCards);
      } catch (err) {
        console.error("Дата уншихад алдаа гарлаа:", err);
      } finally {
        setLoading(false);
      }
    };

    loadCards();
  }, [pageId, userClassCode]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-[#F8FAFC]">
        <Loader2 className="animate-spin text-[#312C85]" size={40} />
        <p className="font-bold text-slate-400 uppercase tracking-widest text-xs">
          Картуудыг ачаалж байна...
        </p>
      </div>
    );
  }

  if (cards.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-6 bg-[#F8FAFC]">
        <AlertCircle className="text-slate-200" size={80} />
        <h2 className="font-black text-slate-800 text-xl uppercase tracking-tighter">
          Дата олдсонгүй
        </h2>
        <p className="text-slate-400 -mt-4 uppercase text-[10px] font-bold">
          ID: {pageId}
        </p>
        <button
          onClick={() => router.back()}
          className="px-10 py-3 bg-white border border-slate-200 rounded-2xl text-[#312C85] font-black text-xs shadow-sm"
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
      <div className="absolute bottom-[-5%] right-[-5%] w-72 h-72 bg-indigo-500/5 rounded-full blur-3xl" />

      <button
        onClick={() => router.back()}
        className="absolute top-6 left-6 p-4 bg-white text-[#312C85] rounded-2xl shadow-sm border border-slate-100 z-20 hover:bg-slate-50 transition-all"
      >
        <ArrowLeft size={24} />
      </button>

      {/* Карт */}
      <div
        className="w-full max-w-[360px] md:max-w-md aspect-[3/4] cursor-pointer relative z-10"
        style={{ perspective: "1200px" }}
        onClick={() => setFlipped(!flipped)}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={idx}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{
              opacity: 1,
              scale: 1,
              rotateY: flipped ? 180 : 0,
            }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 260, damping: 25 }}
            className="relative w-full h-full"
            style={{ transformStyle: "preserve-3d" }}
          >
            {/* Front (Асуулт) */}
            <div
              className="absolute inset-0 bg-white rounded-[3rem] shadow-2xl border border-slate-100 p-10 flex flex-col items-center justify-center text-center"
              style={{ backfaceVisibility: "hidden" }}
            >
              <div className="p-4 bg-slate-50 text-[#312C85] rounded-2xl mb-8 border border-slate-100">
                <Layers size={32} />
              </div>
              <h3 className="text-2xl md:text-3xl font-black text-slate-800 uppercase leading-tight tracking-tighter">
                {currentCard?.question}
              </h3>
              <div className="mt-12 flex items-center gap-2 text-slate-300 font-black text-[9px] uppercase tracking-[0.2em]">
                <RotateCw size={12} className="animate-spin" />
                Дарж хариултыг хар
              </div>
            </div>

            {/* Back (Хариулт) */}
            <div
              className="absolute inset-0 bg-[#312C85] rounded-[3rem] shadow-2xl p-10 flex flex-col items-center justify-center text-center text-white"
              style={{
                backfaceVisibility: "hidden",
                transform: "rotateY(180deg)",
              }}
            >
              <p className="text-[10px] font-black opacity-40 uppercase tracking-[0.4em] mb-10">
                ХАРИУЛТ
              </p>
              <h3 className="text-xl md:text-2xl font-bold leading-relaxed italic px-4">
                "{currentCard?.answer}"
              </h3>
              <div className="mt-12 text-[9px] font-black opacity-30 uppercase tracking-widest border border-white/20 px-4 py-2 rounded-full">
                Эргүүлэх
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Удирдлага */}
      <div className="flex items-center gap-10 mt-14 bg-white/80 backdrop-blur-md px-8 py-4 rounded-[2rem] shadow-xl border border-white relative z-20">
        <button
          disabled={idx === 0}
          onClick={(e) => {
            e.stopPropagation();
            setIdx(idx - 1);
            setFlipped(false);
          }}
          className="p-2 text-[#312C85] disabled:opacity-20 hover:bg-slate-50 rounded-xl transition-all"
        >
          <ChevronLeft size={32} />
        </button>

        <div className="flex flex-col items-center min-w-[60px]">
          <span className="font-black text-[#312C85] text-xl tabular-nums leading-none">
            {idx + 1}
          </span>
          <div className="w-8 h-1 bg-slate-100 rounded-full my-1" />
          <span className="font-bold text-slate-300 text-[10px]">
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
          className="p-2 text-[#312C85] disabled:opacity-20 hover:bg-slate-50 rounded-xl transition-all"
        >
          <ChevronRight size={32} />
        </button>
      </div>
    </div>
  );
}

export default function CardPage() {
  return (
    <Suspense fallback={null}>
      <CardContent />
    </Suspense>
  );
}
