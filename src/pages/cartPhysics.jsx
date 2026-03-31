import React, { useState, useEffect, Suspense } from "react";
import { useRouter } from "next/router"; // Pages router дээр next/router ашиглах нь найдвартай
import { motion } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  RotateCw,
  Layers,
  ArrowLeft,
  Loader2,
} from "lucide-react";
import { PHYSICS_CONFIG } from "@/constants/lessonDataP";

function CardContent() {
  const router = useRouter();
  const { pageId } = router.query; // Query-г шууд router-ээс авна

  const [cards, setCards] = useState([]);
  const [idx, setIdx] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!router.isReady) return;

    const fetchCards = async () => {
      const activePage = pageId || "motion";
      setLoading(true);
      try {
        // 1. Статик дата
        const configCards = PHYSICS_CONFIG[activePage]?.cards || [];

        // 2. Багшийн дата
        const response = await fetch(`/api/card?pageId=${activePage}`);
        const dbCards = response.ok ? await response.json() : [];

        setCards([...dbCards, ...configCards]);
      } catch (error) {
        console.error("Дата татахад алдаа:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCards();
  }, [router.isReady, pageId]);

  if (!router.isReady || loading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC]">
        <Loader2 className="animate-spin text-[#312C85]" size={40} />
      </div>
    );

  if (cards.length === 0)
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <p className="font-bold text-slate-400 mb-4">
          Карт олдсонгүй (pageId: {pageId})
        </p>
        <button
          onClick={() => router.back()}
          className="text-[#312C85] underline"
        >
          БУЦАХ
        </button>
      </div>
    );

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col items-center justify-center p-6">
      <button
        onClick={() => router.back()}
        className="absolute top-8 left-8 p-3 bg-white text-[#312C85] rounded-2xl shadow-sm border border-slate-100"
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
          {/* Front */}
          <div
            className="absolute inset-0 bg-white rounded-[3rem] shadow-xl border border-slate-100 p-10 flex flex-col items-center justify-center text-center"
            style={{ backfaceVisibility: "hidden" }}
          >
            <div className="p-4 bg-slate-50 text-[#312C85] rounded-2xl mb-8">
              <Layers size={36} />
            </div>
            <h3 className="text-2xl font-black text-slate-800 uppercase">
              {cards[idx].question}
            </h3>
            <div className="mt-12 flex items-center gap-2 text-slate-300 font-bold text-[10px] uppercase tracking-widest">
              <RotateCw size={12} /> Дарж эргүүл
            </div>
          </div>
          {/* Back */}
          <div
            className="absolute inset-0 bg-[#312C85] rounded-[3rem] shadow-xl p-10 flex flex-col items-center justify-center text-center text-white"
            style={{
              backfaceVisibility: "hidden",
              transform: "rotateY(180deg)",
            }}
          >
            <p className="text-[10px] font-black opacity-30 uppercase tracking-[0.4em] mb-8">
              ХАРИУЛТ
            </p>
            <h3 className="text-xl font-bold italic">"{cards[idx].answer}"</h3>
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
          className="text-[#312C85] disabled:opacity-20"
        >
          <ChevronLeft size={36} />
        </button>
        <span className="font-black text-[#312C85]">
          {idx + 1} / {cards.length}
        </span>
        <button
          disabled={idx === cards.length - 1}
          onClick={() => {
            setIdx(idx + 1);
            setFlipped(false);
          }}
          className="text-[#312C85] disabled:opacity-20"
        >
          <ChevronRight size={36} />
        </button>
      </div>
    </div>
  );
}

export default function CardPhysics() {
  return <CardContent />;
}
