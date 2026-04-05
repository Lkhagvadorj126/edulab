"use client";
import React, { useState, useEffect, useCallback, Suspense } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  RotateCw,
  Globe,
  ArrowLeft,
  Loader2,
  MapPin,
  Coins,
  Languages,
  Phone,
  Hash,
} from "lucide-react";

import { RAW_COUNTRIES } from "@/constants/geoData";
import NavAll from "@/components/NavAll";

function CardContentGeo() {
  const router = useRouter();
  const [cards, setCards] = useState([]);
  const [idx, setIdx] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [loading, setLoading] = useState(true);

  const generateRandomCards = useCallback(() => {
    setLoading(true);
    const shuffled = [...RAW_COUNTRIES].sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, 20).map((country) => ({
      name: country.name,
      capital: country.capital,
      flag: country.flag,
      region: country.region,
      currency: country.currency,
      language: country.language,
      dialCode: country.dialling_code,
      iso: country.isoCode,
    }));
    setCards(selected);
    setLoading(false);
  }, []);

  useEffect(() => {
    generateRandomCards();
  }, [generateRandomCards]);

  const handleNext = (e) => {
    e.stopPropagation();
    if (idx < cards.length - 1) {
      setIdx(idx + 1);
      setFlipped(false);
    }
  };

  const handlePrev = (e) => {
    e.stopPropagation();
    if (idx > 0) {
      setIdx(idx - 1);
      setFlipped(false);
    }
  };

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC]">
        <Loader2 className="animate-spin text-[#312C85]" size={40} />
      </div>
    );

  const current = cards[idx];

  return (
    // pt-24 нэмж NavAll-аас зай авсан
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col items-center justify-center p-6 pt-24 relative overflow-hidden">
      <NavAll />

      <div className="absolute -bottom-20 -right-20 opacity-[0.03] text-[#312C85] -rotate-12 pointer-events-none">
        <Globe size={400} />
      </div>

      {/* top-28 болгож NavAll-ийн доор харагдуулна */}
      <button
        onClick={() => router.back()}
        className="absolute top-24 left-8 p-4 bg-white text-[#312C85] rounded-2xl shadow-sm border border-slate-100 z-20 active:scale-90 transition-transform hidden md:flex"
      >
        <ArrowLeft size={20} strokeWidth={3} />
      </button>

      <div
        className="w-full max-w-md aspect-[3/4.5] cursor-pointer z-10 mt-8"
        style={{ perspective: "2000px" }}
        onClick={() => setFlipped(!flipped)}
      >
        <motion.div
          animate={{ rotateY: flipped ? 180 : 0 }}
          transition={{ type: "spring", stiffness: 260, damping: 25 }}
          className="relative w-full h-full"
          style={{ transformStyle: "preserve-3d" }}
        >
          {/* FRONT */}
          <div
            className="absolute inset-0 bg-white rounded-[3.5rem] border-2 border-slate-50 shadow-2xl p-10 flex flex-col items-center justify-center text-center"
            style={{ backfaceVisibility: "hidden" }}
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              className="mb-8 overflow-hidden rounded-2xl shadow-lg border border-slate-100 w-40"
            >
              <img
                src={current?.flag}
                alt="Flag"
                className="w-full h-auto object-cover"
                onError={(e) =>
                  (e.target.src =
                    "https://via.placeholder.com/150?text=No+Flag")
                }
              />
            </motion.div>
            <p className="text-[10px] font-black text-slate-300 uppercase tracking-[0.2em] mb-4">
              УЛСЫН МЭДЭЭЛЭЛ
            </p>
            <h3 className="text-3xl font-black text-slate-800 leading-tight">
              {current?.name}
            </h3>
            <div className="mt-12 flex items-center gap-3 text-slate-400 font-black text-[9px] uppercase tracking-widest bg-slate-50 px-5 py-3 rounded-full">
              <RotateCw size={14} className="animate-pulse" /> Эргүүлж
              дэлгэрэнгүй
            </div>
          </div>

          {/* BACK */}
          <div
            className="absolute inset-0 bg-[#312C85] rounded-[3.5rem] p-8 flex flex-col items-center justify-center text-white shadow-2xl"
            style={{
              backfaceVisibility: "hidden",
              transform: "rotateY(180deg)",
            }}
          >
            <h2 className="text-xl font-black mb-8 border-b border-white/20 pb-2 w-full text-center">
              {current?.name}
            </h2>
            <div className="w-full space-y-3">
              <DetailRow
                icon={<MapPin size={16} />}
                label="Нийслэл"
                value={current?.capital}
              />
              <DetailRow
                icon={<Globe size={16} />}
                label="Бүс"
                value={current?.region}
              />
              <DetailRow
                icon={<Coins size={16} />}
                label="Валют"
                value={`${current?.currency.name}`}
              />
              <DetailRow
                icon={<Languages size={16} />}
                label="Хэл"
                value={current?.language.name}
              />
              <DetailRow
                icon={<Phone size={16} />}
                label="Код"
                value={current?.dialCode}
              />
            </div>
            <div className="mt-8 p-3 bg-white/10 rounded-full">
              <RotateCw size={20} className="text-white/50" />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Navigation */}
      <div className="flex items-center gap-10 mt-10 bg-white/90 backdrop-blur-md px-10 py-5 rounded-[2.5rem] shadow-xl border border-white z-10">
        <button
          disabled={idx === 0}
          onClick={handlePrev}
          className="p-2 text-[#312C85] disabled:opacity-20 hover:scale-125 transition-transform"
        >
          <ChevronLeft size={32} strokeWidth={4} />
        </button>
        <div className="flex flex-col items-center min-w-[80px]">
          <span className="font-black text-[#312C85] text-xl">
            {idx + 1} / {cards.length}
          </span>
          <div className="w-20 h-2 bg-slate-100 rounded-full mt-2 overflow-hidden">
            <motion.div
              animate={{ width: `${((idx + 1) / cards.length) * 100}%` }}
              className="h-full bg-[#312C85]"
            />
          </div>
        </div>
        <button
          disabled={idx === cards.length - 1}
          onClick={handleNext}
          className="p-2 text-[#312C85] disabled:opacity-20 hover:scale-125 transition-transform"
        >
          <ChevronRight size={32} strokeWidth={4} />
        </button>
      </div>

      <button
        onClick={() => {
          setIdx(0);
          generateRandomCards();
        }}
        className="my-8 text-[#312C85] font-black text-[10px] uppercase tracking-[0.2em] border-b-2 border-[#312C85] pb-1 hover:opacity-60 transition-opacity"
      >
        Өөр 20 улс сонгох
      </button>
    </div>
  );
}

function DetailRow({ icon, label, value }) {
  return (
    <div className="flex items-center gap-4 bg-white/5 p-3 rounded-2xl border border-white/5 hover:bg-white/10 transition-colors">
      <div className="text-white/60">{icon}</div>
      <div className="text-left">
        <p className="text-[9px] font-bold text-white/40 uppercase tracking-wider">
          {label}
        </p>
        <p className="text-sm font-bold text-white/95 truncate max-w-[200px]">
          {value || "Мэдээлэлгүй"}
        </p>
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
