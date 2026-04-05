"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Globe } from "lucide-react";
// Газарзүйн дата константыг эндээс уншина гэж тооцов
import { GEOGRAPHY_CONFIG } from "@/constants/lessonDataGeo";

export default function NavGeo() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  // Дизайн загварын тогтмол утгууд
  const baseClass =
    "px-4 py-3 rounded-xl transition-all duration-300 font-black text-[11px] lg:text-[12px] text-center uppercase tracking-widest whitespace-nowrap flex items-center justify-center gap-2";
  const activeClass =
    "bg-[#312C85] text-white shadow-lg shadow-[#312C85]/20 scale-[1.02] translate-y-[-1px]";
  const normalClass =
    "text-slate-500 hover:bg-[#312C85]/5 hover:text-[#312C85]";

  // GEOGRAPHY_CONFIG-оос хичээлүүдийг динамикаар үүсгэх
  const dynamicLinks = Object.keys(GEOGRAPHY_CONFIG).map((key) => ({
    href: `/geography/${key}`,
    // Гарчгийн эхний үгийг цэсэнд харуулах (Жишээ нь: "Уур амьсгал")
    label: GEOGRAPHY_CONFIG[key].page.title.split(" ")[0],
  }));

  // Үндсэн цэс болон динамик линкүүдийг нэгтгэх
  const links = [{ href: "/indexGeo", label: "Нүүр" }, ...dynamicLinks];

  return (
    <nav className="w-full mb-10 relative z-50">
      {/* --- DESKTOP & MAIN BAR --- */}
      <div className="bg-white border border-slate-100 rounded-[1.8rem] p-2 shadow-sm flex items-center justify-between w-full">
        {/* Mobile Header Title */}
        <div className="md:hidden pl-4 font-black text-[#312C85] uppercase flex items-center gap-2 text-sm">
          <Globe size={18} /> Газарзүй
        </div>

        {/* Hamburger Menu Toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`md:hidden p-3 rounded-2xl transition-all ${
            isOpen ? "bg-[#312C85] text-white" : "text-[#312C85]"
          }`}
        >
          {isOpen ? (
            <X size={22} strokeWidth={3} />
          ) : (
            <Menu size={22} strokeWidth={3} />
          )}
        </button>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center justify-between w-full gap-1">
          {links.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`${baseClass} flex-1 ${isActive ? activeClass : normalClass}`}
              >
                {link.label}
              </Link>
            );
          })}
        </div>
      </div>

      {/* --- MOBILE DROPDOWN --- */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-3 p-4 bg-white/95 backdrop-blur-xl border border-slate-100 rounded-[2.2rem] shadow-2xl md:hidden flex flex-col gap-2 z-[60] animate-in fade-in slide-in-from-top-2 duration-300">
          {links.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`${baseClass} w-full py-4 ${isActive ? activeClass : "bg-slate-50/50 " + normalClass}`}
              >
                {isActive && <Globe size={14} className="animate-pulse" />}
                {link.label}
              </Link>
            );
          })}
        </div>
      )}
    </nav>
  );
}
