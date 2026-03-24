"use client";
import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, LayoutGrid, Trophy, NotebookPen } from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const links = [
    { href: "/card", label: "Карт", icon: LayoutGrid },
    { href: "/scorePoints", label: "Зэрэглэл", icon: Trophy },
    { href: "/quizContent", label: "Тест", icon: NotebookPen },
  ];

  return (
    <nav className="w-full relative z-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="bg-white border border-slate-100 rounded-[2rem] p-1.5 flex items-center justify-between shadow-sm">
          <div className="hidden md:flex items-center gap-3 pl-6">
            <div className="w-1.5 h-1.5 rounded-full bg-[#312C85]" />
            <span className="font-black text-slate-400 uppercase tracking-[0.2em] text-[10px]">
              Хурдан цэс
            </span>
          </div>

          <div className="hidden md:flex items-center gap-1">
            {links.map((link) => {
              const isActive = pathname === link.href;
              const Icon = link.icon;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-8 py-3 rounded-[1.5rem] transition-all duration-300 font-black text-[11px] uppercase tracking-widest flex items-center gap-2.5 ${
                    isActive
                      ? "bg-white text-[#312C85] shadow-sm border border-slate-100"
                      : "text-slate-400 hover:text-[#312C85]"
                  }`}
                >
                  <Icon
                    size={14}
                    className={isActive ? "text-[#312C85]" : "text-slate-300"}
                  />
                  {link.label}
                </Link>
              );
            })}
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden w-full flex items-center justify-between p-4 rounded-2xl text-[#312C85] font-black text-xs uppercase tracking-widest"
          >
            <span>Цэс</span>
            {isOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>

        {isOpen && (
          <div className="absolute top-full left-6 right-6 mt-3 p-3 bg-white border border-slate-100 rounded-[2rem] shadow-2xl md:hidden flex flex-col gap-1 overflow-hidden transition-all">
            {links.map((link) => {
              const isActive = pathname === link.href;
              const Icon = link.icon;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`p-5 rounded-[1.5rem] font-black text-[11px] uppercase tracking-widest flex items-center gap-4 ${
                    isActive
                      ? "bg-[#312C85] text-white"
                      : "text-slate-500 bg-slate-50/50"
                  }`}
                >
                  <Icon size={16} />
                  {link.label}
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </nav>
  );
}
