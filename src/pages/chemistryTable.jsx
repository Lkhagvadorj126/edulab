"use client";
import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  ChevronDown,
  RotateCcw,
  List,
  Grid,
  Layout,
  X,
  ChevronLeft,
} from "lucide-react";
import Link from "next/link";
import { chemistryData } from "@/constants/chemistryData";
import NavAll from "@/components/NavAll";

const CATEGORY_COLORS = {
  "diatomic nonmetal": "bg-blue-50 border-blue-200 text-blue-700",
  "noble gas": "bg-purple-50 border-purple-200 text-purple-700",
  "alkali metal": "bg-red-50 border-red-200 text-red-700",
  "alkaline earth metal": "bg-orange-50 border-orange-200 text-orange-700",
  metalloid: "bg-teal-50 border-teal-200 text-teal-700",
  "polyatomic nonmetal": "bg-emerald-50 border-emerald-200 text-emerald-700",
  "post-transition metal": "bg-slate-100 border-slate-300 text-slate-700",
  "transition metal": "bg-indigo-50 border-indigo-200 text-indigo-700",
  lanthanide: "bg-pink-50 border-pink-200 text-pink-700",
  actinide: "bg-rose-50 border-rose-200 text-rose-700",
  unknown: "bg-gray-50 border-gray-200 text-gray-700",
};

const categoryTranslation = {
  "transition metal": "Шилжилтийн металл",
  "noble gas": "Идэвхгүй хий",
  "alkali metal": "Шүлтлэг металл",
  "alkaline earth metal": "Шүлтлэг газрын металл",
  metalloid: "Бичилметалл",
  "post-transition metal": "Бусад металл",
  nonmetal: "Металл биш",
  "diatomic nonmetal": "2-атомын металл биш",
  "polyatomic nonmetal": "Олон-атомын металл биш",
  halogen: "Галоген",
  lanthanide: "Лантанид",
  actinide: "Актинид",
};

export default function PeriodicTable() {
  const [selectedElement, setSelectedElement] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterCat, setFilterCat] = useState("all");

  const elements = useMemo(() => chemistryData.elements || [], []);

  const filteredElements = useMemo(() => {
    return elements.filter((el) => {
      const matchesSearch =
        el.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        el.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
        el.number.toString() === searchQuery;
      const matchesCat =
        filterCat === "all" ||
        (el.category &&
          el.category.toLowerCase().includes(filterCat.toLowerCase()));
      return matchesSearch && matchesCat;
    });
  }, [elements, searchQuery, filterCat]);

  const getCategoryStyle = (category) => {
    const key = category?.toLowerCase() || "";
    const styleKey =
      Object.keys(CATEGORY_COLORS).find((k) => key.includes(k)) || "unknown";
    return CATEGORY_COLORS[styleKey];
  };

  return (
    <div className="min-h-screen bg-[#FDFDFD] font-sans text-slate-900 overflow-x-hidden">
      <NavAll />

      {/* Main Container */}
      <main className="container mx-auto px-2 lg:px-4 pt-32 pb-12 max-w-[1300px]">
        {/* Search & Filter Controls */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-center bg-white p-3 rounded-2xl border border-slate-200 shadow-sm mb-12">
          {/* Буцах товч - 1 багана */}
          <div className="lg:col-span-1">
            <Link
              href="/indexH"
              className="flex items-center justify-center w-full py-3 bg-slate-50 rounded-xl text-[#312C85] hover:bg-slate-100 transition-all active:scale-95 border border-transparent hover:border-slate-200 shadow-sm"
              title="Буцах"
            >
              <ChevronLeft size={20} />
            </Link>
          </div>

          {/* Хайлт - 4 багана */}
          <div className="lg:col-span-4 relative">
            <Search
              className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300"
              size={18}
            />
            <input
              type="text"
              placeholder="Элемент хайх..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-6 py-3 bg-slate-50 rounded-xl border-none focus:ring-2 focus:ring-[#312C85]/20 outline-none font-bold text-sm transition-all"
            />
          </div>

          {/* Ангилал - 4 багана */}
          <div className="lg:col-span-4 relative">
            <select
              value={filterCat}
              onChange={(e) => setFilterCat(e.target.value)}
              className="w-full appearance-none pl-6 pr-10 py-3 bg-slate-50 rounded-xl border-none outline-none font-black text-xs text-slate-600 uppercase tracking-tighter cursor-pointer"
            >
              <option value="all">Бүх ангилал</option>
              {Object.entries(categoryTranslation).map(([key, label]) => (
                <option key={key} value={key}>
                  {label}
                </option>
              ))}
            </select>
            <ChevronDown
              className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300 pointer-events-none"
              size={16}
            />
          </div>

          {/* Шинэчлэх товч - 3 багана */}
          <button
            onClick={() => {
              setSearchQuery("");
              setFilterCat("all");
            }}
            className="lg:col-span-3 py-3 bg-[#312C85] text-white rounded-xl text-xs font-black uppercase tracking-widest hover:bg-[#252166] transition-all flex items-center justify-center gap-2 shadow-sm active:scale-95"
          >
            <RotateCcw size={14} /> Бүх ангилал
          </button>
        </div>
        {/* Navigation Tabs */}
        <div className="flex items-center gap-6 border-b border-slate-200 mb-10 overflow-x-auto no-scrollbar">
          <button className="px-4 py-3 border-b-2 border-[#312C85] text-[#312C85] font-black text-xs uppercase tracking-widest flex items-center gap-2 whitespace-nowrap">
            <Grid size={16} /> Хүснэгт
          </button>
          <Link
            href="/chemistryList"
            className="px-4 py-3 text-slate-400 hover:text-[#312C85] font-black text-xs uppercase tracking-widest flex items-center gap-2 transition-all whitespace-nowrap"
          >
            <List size={16} /> Жагсаалт
          </Link>
          <Link
            href="/chemistryCards"
            className="px-4 py-3 text-slate-400 hover:text-[#312C85] font-black text-xs uppercase tracking-widest flex items-center gap-2 transition-all whitespace-nowrap"
          >
            <Layout size={16} /> Карт
          </Link>
        </div>

        {/* Periodic Table Section */}
        <div className="w-full overflow-x-auto lg:overflow-visible pb-10 custom-scrollbar">
          {/* Main Grid */}
          <div
            className="grid gap-1 min-w-[1000px] lg:min-w-full"
            style={{ gridTemplateColumns: "repeat(18, minmax(0, 1fr))" }}
          >
            {elements
              .filter((el) => el.period <= 7 && el.ypos <= 7)
              .map((el) => {
                const isMatch = filteredElements.some(
                  (f) => f.number === el.number,
                );
                return (
                  <motion.div
                    key={el.number}
                    layoutId={`el-${el.number}`}
                    onClick={() => setSelectedElement(el)}
                    className={`relative flex flex-col items-center justify-center rounded-md border aspect-square transition-all cursor-pointer ${
                      isMatch
                        ? `${getCategoryStyle(el.category)} hover:shadow-lg hover:z-10 hover:scale-110 hover:border-[#312C85]`
                        : "opacity-5 grayscale pointer-events-none"
                    }`}
                    style={{ gridColumn: el.xpos, gridRow: el.ypos }}
                  >
                    <span className="absolute top-0.5 left-1 text-[7px] lg:text-[9px] font-bold opacity-60">
                      {el.number}
                    </span>
                    <span className="text-sm lg:text-lg font-black tracking-tighter">
                      {el.symbol}
                    </span>
                    <span className="hidden lg:block text-[6px] font-bold uppercase truncate w-full text-center px-0.5 opacity-70">
                      {el.name}
                    </span>
                  </motion.div>
                );
              })}
          </div>

          {/* Lanthanides & Actinides (F-Block) */}
          <div className="mt-8 space-y-1 ml-[11.11%]">
            {[9, 10].map((yCoord) => (
              <div
                key={yCoord}
                className="grid gap-1 min-w-[1000px] lg:min-w-full"
                style={{ gridTemplateColumns: "repeat(18, minmax(0, 1fr))" }}
              >
                {elements
                  .filter((el) => el.ypos === yCoord)
                  .map((el) => {
                    const isMatch = filteredElements.some(
                      (f) => f.number === el.number,
                    );
                    return (
                      <motion.div
                        key={el.number}
                        onClick={() => setSelectedElement(el)}
                        className={`relative flex flex-col items-center justify-center rounded-md border aspect-square transition-all cursor-pointer ${
                          isMatch
                            ? `${getCategoryStyle(el.category)} hover:scale-110 hover:shadow-md hover:border-[#312C85]`
                            : "opacity-5"
                        }`}
                        style={{ gridColumn: el.xpos }}
                      >
                        <span className="absolute top-0.5 left-1 text-[7px] lg:text-[9px] font-bold opacity-60">
                          {el.number}
                        </span>
                        <span className="text-sm lg:text-lg font-black tracking-tighter">
                          {el.symbol}
                        </span>
                      </motion.div>
                    );
                  })}
              </div>
            ))}
          </div>
        </div>

        {/* Info Modal */}
        <AnimatePresence>
          {selectedElement && (
            <div className="fixed inset-0 flex items-center justify-center z-[2000] p-4">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedElement(null)}
                className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
              />
              <motion.div
                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: 20 }}
                className="relative w-full max-w-md bg-white rounded-[2.5rem] shadow-2xl overflow-hidden p-8 border border-slate-100"
              >
                <button
                  onClick={() => setSelectedElement(null)}
                  className="absolute top-6 right-6 p-2 rounded-full hover:bg-slate-50 text-slate-400 transition-colors"
                >
                  <X size={20} />
                </button>

                <div className="flex flex-col items-center text-center space-y-5">
                  <div
                    className={`w-24 h-24 border-2 rounded-3xl flex flex-col items-center justify-center ${getCategoryStyle(selectedElement.category)}`}
                  >
                    <span className="text-sm font-bold opacity-60">
                      {selectedElement.number}
                    </span>
                    <span className="text-4xl font-black">
                      {selectedElement.symbol}
                    </span>
                  </div>

                  <div>
                    <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tight">
                      {selectedElement.name}
                    </h2>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mt-1">
                      {categoryTranslation[
                        selectedElement.category.toLowerCase()
                      ] || selectedElement.category}
                    </p>
                  </div>

                  <div className="w-full space-y-1 pt-4">
                    <ModalRow
                      label="Атомын масс"
                      value={`${selectedElement.atomic_mass} u`}
                    />
                    <ModalRow label="Төлөв" value={selectedElement.phase} />
                    <ModalRow
                      label="Электрон бүтэц"
                      value={selectedElement.electron_configuration}
                      isMono
                    />
                    <ModalRow
                      label="Нээсэн"
                      value={selectedElement.discovered_by || "Тодорхойгүй"}
                    />
                  </div>

                  <button
                    onClick={() => setSelectedElement(null)}
                    className="w-full py-4 bg-[#312C85] text-white rounded-2xl font-black uppercase text-xs tracking-widest mt-6 hover:bg-[#252166] active:scale-95 transition-all shadow-lg shadow-[#312C85]/20"
                  >
                    Хаах
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}

function ModalRow({ label, value, isMono = false }) {
  return (
    <div className="flex justify-between items-center py-3 border-b border-slate-50">
      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
        {label}
      </span>
      <span
        className={`text-[#312C85] font-black text-sm ${isMono ? "font-mono text-xs" : ""}`}
      >
        {value}
      </span>
    </div>
  );
}
