"use client";
import React, { useState, useMemo } from "react";
import {
  Search,
  Grid,
  List,
  RotateCcw,
  ChevronDown,
  Layout,
  ChevronLeft,
} from "lucide-react";
import Link from "next/link";
import { chemistryData } from "@/constants/chemistryData";
import NavAll from "@/components/NavAll";

const CATEGORY_STYLES = {
  "diatomic nonmetal": "bg-blue-50 border-blue-100 text-blue-700",
  "noble gas": "bg-purple-50 border-purple-100 text-purple-700",
  "alkali metal": "bg-red-50 border-red-100 text-red-700",
  "alkaline earth metal": "bg-orange-50 border-orange-100 text-orange-700",
  metalloid: "bg-teal-50 border-teal-100 text-teal-700",
  "polyatomic nonmetal": "bg-emerald-50 border-emerald-100 text-emerald-700",
  "post-transition metal": "bg-slate-100 border-slate-200 text-slate-700",
  "transition metal": "bg-indigo-50 border-indigo-100 text-indigo-700",
  lanthanide: "bg-pink-50 border-pink-100 text-pink-700",
  actinide: "bg-rose-50 border-rose-100 text-rose-700",
  unknown: "bg-gray-50 border-gray-100 text-gray-700",
};

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

export default function ElementList() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterCat, setFilterCat] = useState("all");

  const elements = useMemo(() => chemistryData.elements || [], []);

  const filteredElements = useMemo(() => {
    return elements.filter((el) => {
      const matchesSearch =
        el.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        el.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
        el.number.toString().includes(searchQuery);

      const matchesCat =
        filterCat === "all" ||
        (el.category &&
          el.category.toLowerCase().includes(filterCat.toLowerCase()));

      return matchesSearch && matchesCat;
    });
  }, [elements, searchQuery, filterCat]);

  const getStyle = (category) => {
    const key = category?.toLowerCase() || "";
    const styleKey =
      Object.keys(CATEGORY_STYLES).find((k) => key.includes(k)) || "unknown";
    return CATEGORY_STYLES[styleKey];
  };

  return (
    <div className="min-h-screen bg-[#FDFDFD] font-sans text-slate-900">
      <NavAll />

      <main className="max-w-[1300px] mx-auto px-4 pt-32 pb-20">
        {/* Search & Filter Controls */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-center bg-white p-3 rounded-2xl border border-slate-200 shadow-sm mb-12">
          {/* Буцах товч - lg:col-span-1 */}
          <div className="lg:col-span-1">
            <Link
              href="/indexH"
              className="flex items-center justify-center w-full py-3 bg-slate-50 rounded-xl text-[#312C85] hover:bg-slate-100 transition-all active:scale-95 border border-transparent hover:border-slate-200 shadow-sm"
              title="Буцах"
            >
              <ChevronLeft size={20} />
            </Link>
          </div>

          {/* Хайлт - lg:col-span-4 (12-оос 1-ийг хасаад үлдсэн зайг хуваарилав) */}
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

          {/* Ангилал - lg:col-span-4 */}
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

          {/* Шинэчлэх товч - lg:col-span-3 */}
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
        <div className="flex items-center gap-6 border-b border-slate-200 mb-10">
          <Link
            href="/chemistryTable"
            className="px-4 py-3 text-slate-400 hover:text-[#312C85] font-black text-xs uppercase tracking-widest flex items-center gap-2 transition-all"
          >
            <Grid size={16} /> Хүснэгт
          </Link>
          <button className="px-4 py-3 border-b-2 border-[#312C85] text-[#312C85] font-black text-xs uppercase tracking-widest flex items-center gap-2">
            <List size={16} /> Жагсаалт
          </button>

          <Link
            href="/chemistryCards"
            className="px-4 py-3 text-slate-400 hover:text-[#312C85] font-black
          text-xs uppercase tracking-widest flex items-center gap-2
          transition-all"
          >
            <Layout size={16} /> Карт
          </Link>
        </div>

        {/* Elements List */}
        <div className="space-y-8">
          {filteredElements.length > 0 ? (
            filteredElements.map((el) => {
              const styleSet = getStyle(el.category);
              const [bgColor, , textColor] = styleSet.split(" ");

              return (
                <div
                  key={el.number}
                  className="group border border-slate-200 rounded-[32px] overflow-hidden hover:shadow-2xl hover:border-[#312C85]/20 transition-all duration-500 bg-white"
                >
                  <div className="flex flex-col md:flex-row">
                    {/* Visual Side */}
                    <div
                      className={`w-full md:w-[280px] p-10 flex flex-col items-center justify-center border-r border-slate-100 transition-colors ${bgColor}`}
                    >
                      <span className="text-xl font-bold opacity-30 mb-1">
                        {el.number}
                      </span>
                      <span
                        className={`text-7xl font-black tracking-tighter mb-3 ${textColor}`}
                      >
                        {el.symbol}
                      </span>
                      <h2 className="text-xl font-black text-slate-800 text-center">
                        {el.name}
                      </h2>
                      <div className="mt-5 px-4 py-1.5 bg-white/80 backdrop-blur-sm border border-black/5 rounded-full text-[9px] font-black uppercase tracking-wider text-slate-600 shadow-sm">
                        {categoryTranslation[el.category.toLowerCase()] ||
                          el.category}
                      </div>
                    </div>

                    {/* Content Side */}
                    <div className="flex-1 p-6 md:p-10">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12">
                        <table className="w-full text-sm">
                          <tbody className="divide-y divide-slate-50">
                            <ListRow
                              label="Атомын масс"
                              value={`${el.atomic_mass} u`}
                            />
                            <ListRow label="Стандарт төлөв" value={el.phase} />
                            <ListRow
                              label="Электрон бүтэц"
                              value={el.electron_configuration}
                              isMono
                            />
                          </tbody>
                        </table>
                        <table className="w-full text-sm">
                          <tbody className="divide-y divide-slate-50">
                            <ListRow label="Нээсэн" value={el.discovered_by} />
                            <ListRow
                              label="Цахилгаан сөрөг"
                              value={el.electronegativity_pauling}
                            />
                            <ListRow
                              label="Хайлах цэг"
                              value={el.melt ? `${el.melt} K` : "-"}
                            />
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="text-center py-32 bg-slate-50 rounded-[40px] border-2 border-dashed border-slate-200">
              <p className="text-slate-400 font-bold">Ийм элемент олдсонгүй.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

function ListRow({ label, value, isMono = false }) {
  return (
    <tr className="hover:bg-slate-50/50 transition-colors group/row">
      <td className="py-4 px-2 font-bold text-slate-400 text-[10px] uppercase tracking-wider w-1/2">
        {label}
      </td>
      <td
        className={`py-4 px-2 font-black text-[#312C85] ${isMono ? "font-mono text-[11px]" : "text-sm"}`}
      >
        {value || "-"}
      </td>
    </tr>
  );
}
