"use client";
import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, LayoutGrid, Trophy, NotebookPen, Atom } from "lucide-react";

export default function NavbarH() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const links = [
    { href: "/cartH", label: "Карт", icon: LayoutGrid },
    { href: "/scorePoints", label: "Зэрэглэл", icon: Trophy },
    { href: "/quizContentH", label: "Тест", icon: NotebookPen },
    { href: "/chemistryTable", label: "Үелэх хүснэгт", icon: Atom },
  ];

  return (
    <nav className="relative z-[100]">
      {/* Desktop Menu - Том дэлгэцэнд харагдана */}
      <div className="bg-white border border-slate-100 rounded-[1.5rem] p-1 hidden lg:flex items-center shadow-sm flex-wrap">
        {links.map((link) => {
          const isActive = pathname === link.href;
          const Icon = link.icon;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`px-4 py-2.5 rounded-[1.2rem] transition-all duration-300 font-black text-[9px] uppercase tracking-widest flex items-center gap-2 ${
                isActive
                  ? "bg-[#312C85] text-white shadow-md shadow-[#312C85]/20"
                  : "text-slate-400 hover:text-[#312C85] hover:bg-slate-50"
              }`}
            >
              <Icon size={14} strokeWidth={2.5} />
              {link.label}
            </Link>
          );
        })}
      </div>

      {/* Mobile Toggle - Гар утас болон таблет дээр харагдана */}
      <div className="lg:hidden flex justify-end">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-3 bg-white border border-slate-100 rounded-2xl text-[#312C85] shadow-sm active:scale-95 transition-all flex items-center gap-2 font-bold text-[10px] uppercase tracking-wider"
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
          <span className="md:inline hidden">Цэс</span>
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <>
          {/* Цэсний гадна дарахад хаагдах хэсэг */}
          <div
            className="fixed inset-0 z-[-1] bg-black/5 backdrop-blur-[2px]"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute top-full right-0 mt-3 w-56 p-2 bg-white border border-slate-100 rounded-[2rem] shadow-2xl lg:hidden flex flex-col gap-1 animate-in fade-in slide-in-from-top-2 duration-200">
            {links.map((link) => {
              const isActive = pathname === link.href;
              const Icon = link.icon;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`p-4 rounded-2xl font-black text-[10px] uppercase tracking-widest flex items-center gap-3 transition-all ${
                    isActive
                      ? "bg-[#312C85] text-white"
                      : "text-slate-500 hover:bg-slate-50"
                  }`}
                >
                  <Icon size={16} strokeWidth={2.5} />
                  {link.label}
                </Link>
              );
            })}
          </div>
        </>
      )}
    </nav>
  );
}
