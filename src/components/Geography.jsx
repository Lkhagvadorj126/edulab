"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ChevronLeft,
  Search,
  Globe2,
  MapPin,
  Coins,
  Languages,
  X,
  Phone,
} from "lucide-react";

import { ALL_COUNTRIES, regionNames } from "@/constants/geoData";

export default function Geography() {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const [searchText, setSearchText] = useState("");
  // 1. Сонгосон тивийг хадгалах state ("All" гэвэл бүх улс)
  const [selectedRegion, setSelectedRegion] = useState("All");

  // 2. Хайлт болон Тивийг хамтад нь шүүх логик
  const filtered = ALL_COUNTRIES.filter((c) => {
    const matchesSearch =
      (c.name || "").toLowerCase().includes(searchText.toLowerCase()) ||
      (c.capital || "").toLowerCase().includes(searchText.toLowerCase());

    const matchesRegion =
      selectedRegion === "All" || c.region === selectedRegion;

    return matchesSearch && matchesRegion;
  });

  // Тивүүдийн жагсаалтыг 'regionNames'-ээс авч байна
  const regions = ["All", ...Object.keys(regionNames)];

  return (
    <main className="min-h-screen bg-[#F8FAFC] pt-32 pb-20 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col gap-8 mb-12">
          <div className="flex flex-col md:flex-row justify-between gap-6">
            <div className="flex items-center gap-4">
              <Link
                href="/indexGeo"
                className="p-3 rounded-2xl bg-white shadow-sm border border-slate-100 hover:bg-slate-50 transition-all"
              >
                <ChevronLeft className="w-6 h-6 text-[#312C85]" />
              </Link>
              <h1 className="text-3xl font-black text-slate-900">
                Дэлхийн улс орнууд
              </h1>
            </div>

            <div className="relative">
              <Search
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                size={20}
              />
              <input
                className="w-full md:w-96 pl-12 pr-4 py-4 rounded-2xl border-2 border-white focus:border-indigo-100 bg-white shadow-lg outline-none font-medium transition-all"
                placeholder="Улс, нийслэл хайх..."
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
              />
            </div>
          </div>

          {/* 3. Тив сонгох хэсэг (Tabs) */}
          <div className="flex flex-wrap gap-2">
            {regions.map((reg) => (
              <button
                key={reg}
                onClick={() => setSelectedRegion(reg)}
                className={`px-6 py-2.5 rounded-full text-xs font-black uppercase tracking-widest transition-all ${
                  selectedRegion === reg
                    ? "bg-[#312C85] text-white shadow-lg shadow-indigo-200 scale-105"
                    : "bg-white text-slate-400 hover:bg-slate-50 border border-slate-100"
                }`}
              >
                {reg === "All" ? "БҮГД" : regionNames[reg]}
              </button>
            ))}
          </div>
        </div>

        {/* Grid Display */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filtered.length > 0 ? (
            filtered.map((c) => (
              <div
                key={`${c.code}-${c.name}`}
                className="bg-white p-8 rounded-[35px] shadow-sm border border-slate-50 relative group hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 cursor-pointer overflow-hidden"
                onClick={() => {
                  setSelected(c);
                  setIsOpen(true);
                }}
              >
                <div className="flex flex-col items-center">
                  <div className="text-6xl mb-6 group-hover:scale-110 transition-transform duration-500">
                    {c.flag}
                  </div>
                  <h3 className="text-xl font-black text-slate-800 text-center mb-1">
                    {c.name}
                  </h3>
                  <p className="text-slate-400 text-[10px] mb-8 uppercase font-black tracking-widest text-center">
                    {c.capital}
                  </p>
                  <div className="w-full py-3 bg-slate-50 text-[#312C85] rounded-2xl font-black text-xs text-center group-hover:bg-[#312C85] group-hover:text-white transition-all">
                    ДЭЛГЭРЭНГҮЙ
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-20 text-slate-300 italic">
              Ийм улс олдсонгүй...
            </div>
          )}
        </div>
      </div>

      {/* Modal - Хэвээрээ */}
      {isOpen && selected && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md overflow-y-auto">
          <div className="bg-white max-w-lg w-full rounded-[45px] p-8 relative shadow-2xl my-auto">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-8 right-8 text-slate-400 hover:text-red-500 p-2 bg-slate-50 rounded-full transition-colors"
            >
              <X size={20} />
            </button>
            <div className="flex flex-col items-center">
              <div className="text-[120px] leading-none mb-8 drop-shadow-xl select-none">
                {selected.flag}
              </div>
              <h2 className="text-3xl font-black mb-1 text-slate-800 text-center">
                {selected.name}
              </h2>
              <div className="flex items-center gap-2 text-[#312C85] font-black mb-8 uppercase tracking-widest text-[10px] bg-indigo-50 px-5 py-2 rounded-full">
                <Globe2 size={14} />
                {regionNames[selected.region] || selected.region}
              </div>
              <div className="w-full space-y-3">
                <DetailRow
                  icon={<MapPin size={18} />}
                  label="Нийслэл"
                  value={selected.capital}
                />
                <DetailRow
                  icon={<Coins size={18} />}
                  label="Валют"
                  value={`${selected.currency?.name || "Мэдээлэлгүй"} (${selected.currency?.symbol || ""})`}
                />
                <DetailRow
                  icon={<Languages size={18} />}
                  label="Хэл"
                  value={selected.language?.name || "Мэдээлэлгүй"}
                />
                <DetailRow
                  icon={<Phone size={18} />}
                  label="Утасны код"
                  value={selected.dialling_code}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

function DetailRow({ icon, label, value }) {
  return (
    <div className="flex justify-between items-center p-5 bg-slate-50/50 rounded-[25px] border border-slate-100/50 hover:bg-white hover:border-indigo-100 hover:shadow-md transition-all group">
      <div className="flex gap-3 text-slate-400 font-black uppercase text-[10px] tracking-widest items-center">
        <span className="text-indigo-400 group-hover:text-[#312C85] transition-colors">
          {icon}
        </span>
        {label}
      </div>
      <span className="font-bold text-slate-700 text-sm">{value}</span>
    </div>
  );
}
