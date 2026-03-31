"use client";
import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  RotateCw,
  Layers,
  ArrowLeft,
} from "lucide-react";

function CardContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pageId = searchParams.get("pageId") || "molecular";
  const [cards, setCards] = useState([]);
  const [idx, setIdx] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // API замыг /api/card болгож зассан
    fetch(`/api/card?pageId=${pageId}`)
      .then((res) => res.json())
      .then((data) => {
        setCards(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [pageId]);

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center font-black text-[#312C85] uppercase tracking-widest">
        Ачаалж байна...
      </div>
    );

  if (!cards.length)
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-6">
        <p className="font-black text-slate-400 uppercase tracking-widest">
          Карт олдсонгүй
        </p>
        <button
          onClick={() => router.back()}
          className="px-6 py-2 border-2 border-[#312C85] text-[#312C85] font-black rounded-xl hover:bg-[#312C85] hover:text-white transition-all"
        >
          БУЦАХ
        </button>
      </div>
    );

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col items-center justify-center p-6">
      <button
        onClick={() => router.back()}
        className="absolute top-6 left-6 p-3 bg-white text-[#312C85] rounded-2xl shadow-sm border border-slate-100 active:scale-90 transition-all"
      >
        <ArrowLeft size={24} />
      </button>

      <div
        className="w-full max-w-md aspect-[3/4] cursor-pointer"
        style={{ perspective: "1000px" }}
        onClick={() => setFlipped(!flipped)}
      >
        <motion.div
          animate={{ rotateY: flipped ? 180 : 0 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
          className="relative w-full h-full"
          style={{ transformStyle: "preserve-3d" }}
        >
          {/* Front Side */}
          <div
            className="absolute inset-0 bg-white rounded-[3rem] shadow-xl border border-slate-100 p-10 flex flex-col items-center justify-center text-center"
            style={{ backfaceVisibility: "hidden" }}
          >
            <div className="p-4 bg-slate-50 text-[#312C85] rounded-2xl mb-8">
              <Layers size={36} />
            </div>
            <h3 className="text-2xl md:text-3xl font-black text-slate-800 uppercase leading-tight">
              {cards[idx].question}
            </h3>
            <div className="mt-12 flex items-center gap-2 text-slate-300 font-bold text-[10px] uppercase tracking-[0.2em]">
              <RotateCw size={12} className="animate-spin-slow" /> Дарж эргүүл
            </div>
          </div>

          {/* Back Side */}
          <div
            className="absolute inset-0 bg-[#312C85] rounded-[3rem] shadow-xl p-10 flex flex-col items-center justify-center text-center text-white"
            style={{
              backfaceVisibility: "hidden",
              transform: "rotateY(180deg)",
            }}
          >
            <p className="text-[10px] font-black opacity-30 uppercase tracking-[0.4em] mb-8 text-white">
              ТАЙЛБАР
            </p>
            <h3 className="text-xl md:text-2xl font-bold leading-relaxed italic">
              "{cards[idx].answer}"
            </h3>
          </div>
        </motion.div>
      </div>

      <div className="flex items-center gap-10 mt-14 bg-white px-8 py-4 rounded-full shadow-md border border-slate-100">
        <button
          disabled={idx === 0}
          onClick={() => {
            setIdx(idx - 1);
            setFlipped(false);
          }}
          className="text-[#312C85] disabled:opacity-20 active:scale-90 transition-all"
        >
          <ChevronLeft size={36} />
        </button>
        <span className="font-black text-[#312C85] text-lg tabular-nums">
          {idx + 1} <span className="text-slate-300 mx-1">/</span>{" "}
          {cards.length}
        </span>
        <button
          disabled={idx === cards.length - 1}
          onClick={() => {
            setIdx(idx + 1);
            setFlipped(false);
          }}
          className="text-[#312C85] disabled:opacity-20 active:scale-90 transition-all"
        >
          <ChevronRight size={36} />
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
