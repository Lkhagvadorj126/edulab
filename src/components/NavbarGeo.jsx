"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Map, Trophy, NotebookPen, Home, Globe } from "lucide-react";

export default function NavbarGeo() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  // Газарзүйн хэсгийн цэсний линкүүд
  const links = [
    { href: "/cardGeo", label: "Карт", icon: Map },
    { href: "/scorePoints", label: "Зэрэглэл", icon: Trophy },
    { href: "/quizContentGeo", label: "Тест", icon: NotebookPen },
    { href: "/geography", label: "Улсууд", icon: Globe },
  ];

  return (
    <nav className="relative z-50">
      {/* --- DESKTOP MENU --- */}
      <div className="bg-white/80 backdrop-blur-md border border-slate-100 rounded-[1.8rem] p-1.5 hidden md:flex items-center shadow-sm">
        {links.map((link) => {
          const isActive = pathname === link.href;
          const Icon = link.icon;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`px-6 py-3 rounded-[1.4rem] transition-all duration-300 font-black text-[10px] uppercase tracking-[0.15em] flex items-center gap-2.5 ${
                isActive
                  ? "bg-[#312C85] text-white shadow-lg shadow-[#312C85]/20 translate-y-[-1px]"
                  : "text-slate-400 hover:text-[#312C85] hover:bg-slate-50"
              }`}
            >
              <Icon size={14} strokeWidth={2.5} />
              {link.label}
            </Link>
          );
        })}
      </div>

      {/* --- MOBILE TOGGLE --- */}
      <div className="md:hidden flex justify-end">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`p-3.5 rounded-2xl shadow-xl transition-all active:scale-90 border ${
            isOpen
              ? "bg-[#312C85] text-white border-[#312C85]"
              : "bg-white text-[#312C85] border-slate-100"
          }`}
        >
          {isOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* --- MOBILE DROPDOWN --- */}
      {isOpen && (
        <div className="absolute top-full right-0 mt-4 w-56 p-2.5 bg-white/95 backdrop-blur-xl border border-slate-100 rounded-[2rem] shadow-2xl md:hidden flex flex-col gap-1.5 animate-in fade-in zoom-in duration-200 origin-top-right">
          {/* Нүүр хуудас руу буцах (Эхлэл) */}
          <Link
            href="/"
            onClick={() => setIsOpen(false)}
            className="p-4 rounded-2xl font-black text-[10px] uppercase tracking-widest flex items-center gap-3 text-slate-400 hover:bg-slate-50"
          >
            <Home size={16} />
            Нүүр хуудас
          </Link>

          <div className="h-px bg-slate-100 mx-4 my-1" />

          {/* Газарзүйн цэсүүд */}
          {links.map((link) => {
            const isActive = pathname === link.href;
            const Icon = link.icon;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`p-4 rounded-2xl font-black text-[10px] uppercase tracking-widest flex items-center gap-4 transition-all ${
                  isActive
                    ? "bg-[#312C85] text-white shadow-inner"
                    : "text-slate-500 hover:bg-slate-100/50"
                }`}
              >
                <Icon size={16} strokeWidth={isActive ? 3 : 2} />
                {link.label}
              </Link>
            );
          })}

          {/* Чимэглэл дүрс (Нэмэлт) */}
          <div className="mt-2 flex justify-center opacity-10">
            <Globe size={40} />
          </div>
        </div>
      )}
    </nav>
  );
}
