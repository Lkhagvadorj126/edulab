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
import { useAuth } from "@/context/AuthContext"; // Хэрэглэгчийн мэдээлэл авах

function CardContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { user } = useAuth();

  const pageId = searchParams.get("pageId") || "molecular";
  const userClassCode = user?.classCode || "";

  const [cards, setCards] = useState([]);
  const [idx, setIdx] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Хэрэв ангийн код байхгүй бол хүлээх (Auth ачаалж дуустал)
    if (!userClassCode && loading) return;

    const fetchCards = async () => {
      try {
        const res = await fetch(
          `/api/card?pageId=${pageId}&classCode=${userClassCode}`,
        );
        if (res.ok) {
          const data = await res.json();
          setCards(data || []);
        }
      } catch (err) {
        console.error("Cards fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCards();
  }, [pageId, userClassCode]);

  // Ачаалж буй төлөв
  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-[#F8FAFC]">
        <Loader2 className="animate-spin text-[#312C85]" size={40} />
        <p className="font-black text-slate-400 uppercase tracking-widest text-[10px]">
          Картуудыг ачаалж байна...
        </p>
      </div>
    );
  }

  // Карт байхгүй үеийн төлөв
  if (!cards || cards.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-6 bg-[#F8FAFC]">
        <div className="p-8 bg-white rounded-[2rem] shadow-sm border border-slate-100 text-center">
          <Layers className="mx-auto text-slate-200 mb-4" size={48} />
          <p className="font-black text-slate-400 uppercase tracking-widest text-sm">
            Энэ ангид карт олдсонгүй
          </p>
          <p className="text-[10px] text-slate-300 font-bold mt-1 uppercase tracking-tighter">
            Анги: {userClassCode}
          </p>
        </div>
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 px-8 py-3 bg-[#312C85] text-white font-black rounded-2xl hover:bg-black transition-all shadow-lg"
        >
          <ArrowLeft size={18} /> БУЦАХ
        </button>
      </div>
    );
  }

  const currentCard = cards[idx];

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-[-5%] left-[-5%] w-72 h-72 bg-[#312C85]/5 rounded-full blur-3xl" />
      <div className="absolute bottom-[-5%] right-[-5%] w-72 h-72 bg-indigo-500/5 rounded-full blur-3xl" />

      <button
        onClick={() => router.back()}
        className="absolute top-6 left-6 p-4 bg-white text-[#312C85] rounded-2xl shadow-sm border border-slate-100 active:scale-90 transition-all z-20"
      >
        <ArrowLeft size={24} />
      </button>

      {/* Card Container */}
      <div
        className="w-full max-w-[360px] md:max-w-md aspect-[3/4] cursor-pointer relative z-10"
        style={{ perspective: "1200px" }}
        onClick={() => setFlipped(!flipped)}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={idx} // Индекс өөрчлөгдөхөд карт солигдох эффект
            initial={{ opacity: 0, x: 20 }}
            animate={{
              opacity: 1,
              x: 0,
              rotateY: flipped ? 180 : 0,
            }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ type: "spring", stiffness: 260, damping: 25 }}
            className="relative w-full h-full"
            style={{ transformStyle: "preserve-3d" }}
          >
            {/* Front Side (Асуулт) */}
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
                <RotateCw
                  size={12}
                  className="animate-spin"
                  style={{ animationDuration: "4s" }}
                />
                Дарж хариултыг хар
              </div>
            </div>

            {/* Back Side (Хариулт) */}
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

      {/* Navigation Controls */}
      <div className="flex items-center gap-10 mt-14 bg-white/80 backdrop-blur-md px-8 py-4 rounded-[2rem] shadow-xl border border-white relative z-20">
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
          className="p-2 text-[#312C85] disabled:opacity-20 active:scale-90 hover:bg-slate-50 rounded-xl transition-all"
        >
          <ChevronRight size={32} />
        </button>
      </div>
    </div>
  );
}

export default function CardPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-white">
          <Loader2 className="animate-spin text-[#312C85]" size={32} />
        </div>
      }
    >
      <CardContent />
    </Suspense>
  );
}
