"use client";
import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  RotateCw,
  Globe,
  ArrowLeft,
  Loader2,
  AlertCircle,
  Map as MapIcon,
} from "lucide-react";
import { GEOGRAPHY_CONFIG } from "@/constants/lessonDataGeo"; // Газарзүйн дата

function CardContentGeo() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pageId = searchParams.get("pageId") || "planet"; // Default утга

  const [cards, setCards] = useState([]);
  const [idx, setIdx] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCards = async () => {
      setLoading(true);
      try {
        // 1. Статик датаг авах (Газарзүйн конфигоос)
        const staticCards = GEOGRAPHY_CONFIG[pageId]?.cards || [];

        // 2. MongoDB-ээс динамик датаг авах (Хэрэв байгаа бол)
        const res = await fetch(`/api/cardGeo?pageId=${pageId}`);
        let dbCards = [];
        if (res.ok) {
          dbCards = await res.json();
        }

        // 3. Хоёр датаг нэгтгэх
        const combined = [...dbCards.reverse(), ...staticCards];
        setCards(combined);
      } catch (err) {
        console.error("Газарзүйн карт ачаалахад алдаа гарлаа:", err);
      } finally {
        setLoading(false);
      }
    };

    loadCards();
  }, [pageId]);

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC]">
        <Loader2 className="animate-spin text-[#312C85]" size={40} />
      </div>
    );

  if (cards.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#F8FAFC] p-6 text-center">
        <div className="bg-white p-12 rounded-[3rem] shadow-xl border border-slate-100 max-w-md">
          <AlertCircle className="mx-auto mb-4 text-[#312C85]" size={48} />
          <h2 className="text-xl font-black text-slate-800 mb-2 uppercase">
            Карт одоогоор алга
          </h2>
          <p className="text-slate-500 font-medium mb-8">
            Энэ газарзүйн сэдэвт цээжлэх карт хараахан ороогүй байна.
          </p>
          <button
            onClick={() => router.back()}
            className="w-full py-4 bg-[#312C85] text-white rounded-2xl font-black uppercase tracking-widest text-xs"
          >
            БУЦАХ
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Чимэглэлийн арын дүрс (Background Decoration) */}
      <div className="absolute -bottom-20 -right-20 opacity-[0.03] text-[#312C85] -rotate-12 pointer-events-none">
        <Globe size={400} />
      </div>

      {/* Буцах товч */}
      <button
        onClick={() => router.back()}
        className="absolute top-8 left-8 p-4 bg-white text-[#312C85] rounded-2xl shadow-sm border border-slate-100 hover:bg-[#312C85]/5 transition-all active:scale-90 z-20"
      >
        <ArrowLeft size={20} strokeWidth={3} />
      </button>

      {/* Картны хэсэг */}
      <div
        className="w-full max-w-md aspect-[3/4] cursor-pointer z-10"
        style={{ perspective: "2000px" }}
        onClick={() => setFlipped(!flipped)}
      >
        <motion.div
          animate={{ rotateY: flipped ? 180 : 0 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
          className="relative w-full h-full"
          style={{ transformStyle: "preserve-3d" }}
        >
          {/* Урд тал (Асуулт / Нэршил) */}
          <div
            className="absolute inset-0 bg-white rounded-[3.5rem] border-2 border-slate-50 shadow-2xl p-10 flex flex-col items-center justify-center text-center"
            style={{ backfaceVisibility: "hidden" }}
          >
            <div className="p-5 bg-blue-50 text-[#312C85] rounded-[2rem] mb-8">
              <MapIcon size={40} />
            </div>
            <p className="text-[10px] font-black text-slate-300 uppercase tracking-[0.3em] mb-4">
              АСУУЛТ
            </p>
            <h3 className="text-2xl md:text-3xl font-black text-slate-800 italic leading-tight px-2">
              "{cards[idx]?.question}"
            </h3>
            <div className="mt-12 flex items-center gap-3 text-slate-400 font-black text-[9px] uppercase tracking-[0.2em] bg-slate-50 px-4 py-2 rounded-full">
              <RotateCw size={12} className="animate-spin-slow" /> Эргүүлж харах
            </div>
          </div>

          {/* Ар тал (Хариулт / Тайлбар) */}
          <div
            className="absolute inset-0 bg-[#312C85] rounded-[3.5rem] p-10 flex flex-col items-center justify-center text-center text-white shadow-2xl"
            style={{
              backfaceVisibility: "hidden",
              transform: "rotateY(180deg)",
            }}
          >
            <div className="absolute top-10 opacity-20">
              <Globe size={60} />
            </div>
            <p className="text-[10px] font-black text-white/40 uppercase tracking-[0.5em] mb-8">
              ТАЙЛБАР
            </p>
            <h3 className="text-xl md:text-2xl font-bold leading-relaxed px-4">
              {cards[idx]?.answer}
            </h3>
            <div className="mt-10 p-3 bg-white/10 rounded-full border border-white/10">
              <RotateCw size={20} className="text-white/50" />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Навигаци */}
      <div className="flex items-center gap-10 mt-12 bg-white/80 backdrop-blur-md px-10 py-5 rounded-[2.5rem] shadow-xl border border-white z-10">
        <button
          disabled={idx === 0}
          onClick={(e) => {
            e.stopPropagation();
            setIdx(idx - 1);
            setFlipped(false);
          }}
          className="p-2 text-[#312C85] disabled:opacity-20 hover:scale-125 transition-transform"
        >
          <ChevronLeft size={32} strokeWidth={4} />
        </button>

        <div className="flex flex-col items-center min-w-[80px]">
          <span className="font-black text-[#312C85] text-xl tracking-tighter">
            {idx + 1} / {cards.length}
          </span>
          <div className="w-16 h-1.5 bg-slate-100 rounded-full mt-2 overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${((idx + 1) / cards.length) * 100}%` }}
              className="h-full bg-[#312C85] rounded-full"
            />
          </div>
        </div>

        <button
          disabled={idx === cards.length - 1}
          onClick={(e) => {
            e.stopPropagation();
            setIdx(idx + 1);
            setFlipped(false);
          }}
          className="p-2 text-[#312C85] disabled:opacity-20 hover:scale-125 transition-transform"
        >
          <ChevronRight size={32} strokeWidth={4} />
        </button>
      </div>
    </div>
  );
}

export default function CardGeography() {
  return (
    <Suspense
      fallback={
        <div className="h-screen flex items-center justify-center">
          <Loader2 className="animate-spin text-[#312C85]" />
        </div>
      }
    >
      <CardContentGeo />
    </Suspense>
  );
}
