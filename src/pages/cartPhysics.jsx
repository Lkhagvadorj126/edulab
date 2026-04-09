"use client";
import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  Loader2,
  AlertCircle,
  BookOpen,
  RotateCcw,
} from "lucide-react";
import { PHYSICS_CONFIG } from "@/constants/lessonDataP";

function CartContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pageId = searchParams.get("pageId") || "motion";

  const [cards, setCards] = useState([]);
  const [current, setCurrent] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const configData = PHYSICS_CONFIG[pageId]?.tests || []; // Тестийн өгөгдлийг карт болгож ашиглах
    setCards(configData);
    setLoading(false);
  }, [pageId]);

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC]">
        <Loader2 className="animate-spin text-[#312C85]" size={40} />
      </div>
    );

  if (cards.length === 0)
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#F8FAFC]">
        <AlertCircle className="text-slate-200 mb-4" size={80} />
        <button
          onClick={() => router.back()}
          className="px-10 py-3 bg-white border rounded-2xl font-black text-xs uppercase"
        >
          Буцах
        </button>
      </div>
    );

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-6 flex flex-col items-center justify-center relative overflow-hidden">
      <button
        onClick={() => router.back()}
        className="absolute top-6 left-6 p-4 bg-white rounded-2xl shadow-sm text-slate-400 hover:text-[#312C85] z-20"
      >
        <ChevronLeft size={24} />
      </button>

      <div className="w-full max-w-2xl text-center mb-8">
        <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2">
          КАРТ {current + 1} / {cards.length}
        </p>
        <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
          <motion.div
            className="bg-[#312C85] h-full"
            initial={{ width: 0 }}
            animate={{ width: `${((current + 1) / cards.length) * 100}%` }}
          />
        </div>
      </div>

      <div className="relative w-full max-w-2xl h-[400px] [perspective:1000px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            onClick={() => setIsFlipped(!isFlipped)}
            className="w-full h-full cursor-pointer"
          >
            <motion.div
              animate={{ rotateY: isFlipped ? 180 : 0 }}
              transition={{
                duration: 0.6,
                type: "spring",
                stiffness: 260,
                damping: 20,
              }}
              className="w-full h-full relative [transform-style:preserve-3d]"
            >
              {/* Нүүр тал (Асуулт) */}
              <div className="absolute inset-0 bg-white rounded-[3rem] p-12 shadow-2xl border border-slate-100 flex flex-col items-center justify-center [backface-visibility:hidden]">
                <div className="w-14 h-14 bg-indigo-50 text-[#312C85] rounded-2xl flex items-center justify-center mb-6">
                  <BookOpen size={28} />
                </div>
                <h2 className="text-xl md:text-2xl font-black text-slate-800 text-center leading-relaxed">
                  {cards[current].question}
                </h2>
                <p className="mt-8 text-[10px] font-bold text-slate-300 uppercase tracking-widest">
                  Карт дээр дарж хариултыг үзнэ үү
                </p>
              </div>

              {/* Ар тал (Хариулт) */}
              <div className="absolute inset-0 bg-[#312C85] text-white rounded-[3rem] p-12 shadow-2xl flex flex-col items-center justify-center [transform:rotateY(180deg)] [backface-visibility:hidden]">
                <p className="text-[10px] font-black opacity-50 uppercase tracking-widest mb-4">
                  Зөв хариулт
                </p>
                <h2 className="text-2xl md:text-4xl font-black text-center leading-tight text-white">
                  {cards[current].answer}
                </h2>
              </div>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Control Buttons */}
      <div className="flex gap-4 mt-12">
        <button
          onClick={() => {
            setCurrent((prev) => Math.max(0, prev - 1));
            setIsFlipped(false);
          }}
          className={`p-5 rounded-2xl bg-white shadow-sm border border-slate-100 text-[#312C85] transition-all ${current === 0 ? "opacity-30" : "hover:shadow-md active:scale-90"}`}
          disabled={current === 0}
        >
          <ChevronLeft size={24} />
        </button>

        <button
          onClick={() => setIsFlipped(!isFlipped)}
          className="px-10 py-5 bg-white shadow-sm border border-slate-100 text-[#312C85] rounded-2xl font-black text-xs uppercase tracking-widest hover:shadow-md active:scale-95 flex items-center gap-2"
        >
          <RotateCcw size={18} /> Эргүүлэх
        </button>

        <button
          onClick={() => {
            if (current + 1 < cards.length) {
              setCurrent((prev) => prev + 1);
              setIsFlipped(false);
            } else {
              router.back();
            }
          }}
          className="p-5 rounded-2xl bg-[#312C85] shadow-lg text-white hover:bg-black transition-all active:scale-90"
        >
          <ChevronRight size={24} />
        </button>
      </div>
    </div>
  );
}

export default function CartPhysics() {
  return (
    <Suspense fallback={null}>
      <CartContent />
    </Suspense>
  );
}
