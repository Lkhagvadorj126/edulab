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
import { BIOLOGY_CONFIG } from "@/constants/lessonDataBio";

function CardContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pageId = searchParams.get("pageId") || "hoollolt";

  const [cards, setCards] = useState([]);
  const [idx, setIdx] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCards = async () => {
      setLoading(true);
      try {
        // 1. Статик датаг авах
        const staticCards = BIOLOGY_CONFIG[pageId]?.cards || [];

        // 2. MongoDB-ээс динамик датаг авах
        const res = await fetch(`/api/card?pageId=${pageId}`);
        let dbCards = [];
        if (res.ok) {
          dbCards = await res.json();
        }

        // 3. Хоёр датаг нэгтгэх (Шинэ картууд эхэнд харагдана)
        const combined = [...dbCards.reverse(), ...staticCards];
        setCards(combined);
      } catch (err) {
        console.error("Карт ачаалахад алдаа гарлаа:", err);
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
            Энэ сэдэвт цээжлэх карт хараахан ороогүй байна.
          </p>
          <button
            onClick={() => router.back()}
            className="w-full py-4 bg-[#312C85] text-white rounded-2xl font-black"
          >
            БУЦАХ
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col items-center justify-center p-6 relative">
      {/* Буцах товч */}
      <button
        onClick={() => router.back()}
        className="absolute top-8 left-8 p-3 bg-white text-[#312C85] rounded-2xl shadow-sm border border-slate-100 hover:bg-[#312C85]/5 transition-all"
      >
        <ArrowLeft size={24} />
      </button>

      {/* Картны хэсэг */}
      <div
        className="w-full max-w-md aspect-[3/4] cursor-pointer"
        style={{ perspective: "1500px" }}
        onClick={() => setFlipped(!flipped)}
      >
        <motion.div
          animate={{ rotateY: flipped ? 180 : 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          className="relative w-full h-full shadow-2xl rounded-[3rem]"
          style={{ transformStyle: "preserve-3d" }}
        >
          {/* Урд тал (Асуулт) */}
          <div
            className="absolute inset-0 bg-white rounded-[3rem] border border-slate-100 p-10 flex flex-col items-center justify-center text-center"
            style={{ backfaceVisibility: "hidden" }}
          >
            <div className="p-4 bg-indigo-50 text-[#312C85] rounded-2xl mb-8">
              <Layers size={36} />
            </div>
            <h3 className="text-xl md:text-2xl font-black text-slate-800 uppercase leading-snug">
              {cards[idx]?.question}
            </h3>
            <div className="mt-12 flex items-center gap-2 text-slate-300 font-black text-[10px] uppercase tracking-[0.2em]">
              <RotateCw size={14} className="animate-spin-slow" /> Дарж эргүүл
            </div>
          </div>

          {/* Ар тал (Хариулт) */}
          <div
            className="absolute inset-0 bg-[#312C85] rounded-[3rem] p-10 flex flex-col items-center justify-center text-center text-white"
            style={{
              backfaceVisibility: "hidden",
              transform: "rotateY(180deg)",
            }}
          >
            <p className="text-[10px] font-black opacity-40 uppercase tracking-[0.5em] mb-8">
              ХАРИУЛТ
            </p>
            <h3 className="text-xl md:text-2xl font-bold leading-relaxed">
              {cards[idx]?.answer}
            </h3>
            <div className="mt-10 p-2 bg-white/10 rounded-full">
              <RotateCw size={20} className="opacity-50" />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Навигаци */}
      <div className="flex items-center gap-10 mt-12 bg-white px-8 py-4 rounded-3xl shadow-lg border border-slate-100">
        <button
          disabled={idx === 0}
          onClick={(e) => {
            e.stopPropagation();
            setIdx(idx - 1);
            setFlipped(false);
          }}
          className="text-[#312C85] disabled:opacity-20 hover:scale-110 transition-transform"
        >
          <ChevronLeft size={40} strokeWidth={3} />
        </button>

        <div className="flex flex-col items-center">
          <span className="font-black text-[#312C85] text-lg">
            {idx + 1} / {cards.length}
          </span>
          <div className="w-12 h-1 bg-slate-100 rounded-full mt-1">
            <div
              className="h-full bg-[#312C85] rounded-full transition-all duration-300"
              style={{ width: `${((idx + 1) / cards.length) * 100}%` }}
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
          className="text-[#312C85] disabled:opacity-20 hover:scale-110 transition-transform"
        >
          <ChevronRight size={40} strokeWidth={3} />
        </button>
      </div>
    </div>
  );
}

export default function CardBiology() {
  return (
    <Suspense fallback={null}>
      <CardContent />
    </Suspense>
  );
}
