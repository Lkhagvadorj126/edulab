"use client";
import React, { useState, useMemo, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Search,
  Grid,
  List,
  RotateCcw,
  ChevronDown,
  Layout,
  ChevronLeft,
  ChevronRight,
  Zap,
  Rotate3d,
} from "lucide-react";
import Link from "next/link";
import { chemistryData } from "@/constants/chemistryData";
import NavAll from "@/components/NavAll";

const categoryTranslation = {
  "alkali metal": "Шүлтлэг металл",
  "alkaline earth metal": "Шүлтлэг газрын металл",
  "transition metal": "Шилжилтийн металл",
  "post-transition metal": "Бусад металл",
  metalloid: "Бичилметалл",
  "diatomic nonmetal": "2-атомын металл биш",
  "polyatomic nonmetal": "Олон-атомын металл биш",
  "noble gas": "Идэвхгүй хий",
  lanthanide: "Лантанид",
  actinide: "Актинид",
};

export default function ChemistryCards() {
  const [cards, setCards] = useState([]);
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterCat, setFilterCat] = useState("all");
  const [refreshKey, setRefreshKey] = useState(0); // Санамсаргүй байдлыг дахин ачаалах түлхүүр

  const allElements = useMemo(() => chemistryData.elements || [], []);

  // Өгөгдлийг шүүх, холих болон 20-ийг сонгох
  useEffect(() => {
    const filtered = allElements.filter((el) => {
      const matchesSearch =
        el.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        el.symbol.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCat =
        filterCat === "all" ||
        el.category.toLowerCase().includes(filterCat.toLowerCase());
      return matchesSearch && matchesCat;
    });

    // Fisher-Yates shuffle алгоритмаар холих
    const shuffled = [...filtered].sort(() => Math.random() - 0.5);

    // Зөвхөн эхний 20-ийг авна
    setCards(shuffled.slice(0, 20));
    setIndex(0);
    setFlipped(false);
  }, [allElements, searchQuery, filterCat, refreshKey]);

  const next = () => {
    setFlipped(false);
    setTimeout(() => setIndex((p) => (p + 1) % cards.length), 150);
  };

  const prev = () => {
    setFlipped(false);
    setTimeout(
      () => setIndex((p) => (p - 1 + cards.length) % cards.length),
      150,
    );
  };

  const handleRefresh = () => {
    setRefreshKey((prev) => prev + 1); // Энэ нь useEffect-ийг дахин ажиллуулж шинэ 20 карт гаргана
  };

  if (!cards.length)
    return (
      <div className="pt-40 text-center font-bold text-slate-400">
        Элемент олдсонгүй...
      </div>
    );

  const current = cards[index];

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans text-slate-900">
      <NavAll />

      <main className="max-w-[1300px] mx-auto px-4 pt-32 pb-20">
        {/* Navigation Tabs */}
        <div className="flex items-center justify-between border-b border-slate-200 mb-10 overflow-x-auto no-scrollbar">
          <div className="flex items-center">
            {/* Буцах товч - Цэснүүдээс тусад нь, зүүн талд */}
            <Link
              href="/indexH"
              className="mr-6 p-2 text-slate-400 hover:text-[#312C85] hover:bg-slate-50 rounded-xl transition-all active:scale-90"
              title="Буцах"
            >
              <ChevronLeft size={24} />
            </Link>

            {/* Үндсэн цэсүүд */}
            <div className="flex items-center gap-2 lg:gap-6">
              <Link
                href="/chemistryTable"
                className="px-4 py-3 text-slate-400 hover:text-[#312C85] font-black text-[10px] lg:text-xs uppercase tracking-widest flex items-center gap-2 transition-all whitespace-nowrap"
              >
                <Grid size={16} /> Хүснэгт
              </Link>

              <Link
                href="/chemistryList"
                className="px-4 py-3 text-slate-400 hover:text-[#312C85] font-black text-[10px] lg:text-xs uppercase tracking-widest flex items-center gap-2 transition-all whitespace-nowrap"
              >
                <List size={16} /> Жагсаалт
              </Link>

              <button className="px-4 py-3 border-b-2 border-[#312C85] text-[#312C85] font-black text-[10px] lg:text-xs uppercase tracking-widest flex items-center gap-2 whitespace-nowrap">
                <Layout size={16} /> Карт
              </button>
            </div>
          </div>

          {/* Хэрэв баруун талд ямар нэгэн нэмэлт товч эсвэл статус байх бол энд нэмж болно */}
        </div>

        {/* Progress bar */}
        <div className="mb-10 px-2">
          <div className="flex justify-between items-end mb-3">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
              {categoryTranslation[current.category.toLowerCase()] ||
                current.category}
            </p>
            <p className="text-lg font-black text-[#312C85]">
              {index + 1}{" "}
              <span className="text-slate-300 text-sm">/ {cards.length}</span>
            </p>
          </div>
          <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${((index + 1) / cards.length) * 100}%` }}
              className="h-full bg-[#312C85]"
            />
          </div>
        </div>

        {/* Flipping Card (Энэ хэсэг хэвээрээ) */}
        <div
          className="relative h-[450px] w-full"
          style={{ perspective: "2000px" }}
        >
          <motion.div
            className="w-full h-full relative"
            initial={false}
            animate={{ rotateY: flipped ? 180 : 0 }}
            transition={{
              duration: 0.7,
              type: "spring",
              stiffness: 260,
              damping: 20,
            }}
            style={{ transformStyle: "preserve-3d" }}
            onClick={() => setFlipped(!flipped)}
          >
            {/* FRONT Side */}
            <div
              className="absolute inset-0 bg-white border border-slate-100 rounded-[3rem] shadow-2xl flex flex-col items-center justify-center p-12 cursor-pointer"
              style={{ backfaceVisibility: "hidden" }}
            >
              <Zap
                className="absolute top-10 left-10 text-[#312C85]/5"
                size={60}
                fill="currentColor"
              />
              <span className="text-[10px] font-black text-slate-300 uppercase tracking-[0.4em] mb-4 text-center">
                Элементийн тэмдэг
              </span>
              <h2 className="text-8xl font-black text-[#312C85] tracking-tighter mb-4">
                {current.symbol}
              </h2>
              <h3 className="text-2xl font-bold text-slate-800 uppercase tracking-widest italic">
                {current.name}
              </h3>
              <div className="mt-12 flex items-center gap-3 text-slate-300">
                <Rotate3d size={20} className="animate-spin-slow" />
                <span className="text-[10px] font-bold uppercase tracking-widest">
                  Дарж хариуг хар
                </span>
              </div>
            </div>

            {/* BACK Side */}
            <div
              className="absolute inset-0 bg-[#312C85] rounded-[3rem] shadow-2xl flex flex-col items-center justify-center p-10 text-white cursor-pointer"
              style={{
                transform: "rotateY(180deg)",
                backfaceVisibility: "hidden",
              }}
            >
              <span className="text-[10px] font-black text-white/30 uppercase tracking-[0.4em] mb-8">
                Дэлгэрэнгүй
              </span>
              <div className="w-full space-y-4">
                <CardDetail label="Атомын дугаар" value={current.number} />
                <CardDetail
                  label="Атомын масс"
                  value={`${current.atomic_mass} u`}
                />
                <CardDetail label="Төлөв" value={current.phase} />
                <CardDetail
                  label="Электрон бүтэц"
                  value={current.electron_configuration}
                  isMono
                />
                <CardDetail
                  label="Нээсэн"
                  value={current.discovered_by || "Тодорхойгүй"}
                />
              </div>
              <RotateCcw className="mt-10 text-white/20" size={24} />
            </div>
          </motion.div>
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between items-center mt-12 gap-4">
          <button
            onClick={prev}
            className="flex-1 flex items-center justify-center gap-3 py-5 rounded-3xl bg-white border border-slate-200 text-[#312C85] font-black uppercase text-xs hover:bg-slate-50 transition-all active:scale-95 shadow-sm"
          >
            <ChevronLeft size={18} /> Өмнөх
          </button>
          <button
            onClick={next}
            className="flex-1 flex items-center justify-center gap-3 py-5 rounded-3xl bg-[#312C85] text-white font-black uppercase text-xs hover:bg-[#252166] transition-all active:scale-95 shadow-xl shadow-[#312C85]/20"
          >
            Дараах <ChevronRight size={18} />
          </button>
        </div>
      </main>
    </div>
  );
}

function CardDetail({ label, value, isMono = false }) {
  return (
    <div className="flex justify-between items-center border-b border-white/10 pb-2">
      <span className="text-[10px] font-bold text-white/50 uppercase tracking-widest">
        {label}
      </span>
      <span
        className={`font-black text-sm ${isMono ? "font-mono text-xs" : ""}`}
      >
        {value}
      </span>
    </div>
  );
}
