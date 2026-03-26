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
    <nav className="relative">
      {" "}
      {/* z-index-ийг энд заавал заахгүй, dropdown дээрээ барьсан нь дээр */}
      {/* Desktop Menu */}
      <div className="bg-white border border-slate-100 rounded-[1.5rem] p-1 hidden md:flex items-center shadow-sm">
        {links.map((link) => {
          const isActive = pathname === link.href;
          const Icon = link.icon;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`px-5 py-2.5 rounded-[1.2rem] transition-all duration-300 font-bold text-[10px] uppercase tracking-widest flex items-center gap-2 ${
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
      {/* Mobile Toggle */}
      <div className="md:hidden flex justify-end">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-100 rounded-2xl text-[#312C85] shadow-sm active:scale-95 transition-all font-bold text-[10px] uppercase tracking-widest"
        >
          {isOpen ? <X size={18} /> : <Menu size={18} />}
          <span>Цэс</span>
        </button>
      </div>
      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <>
          {/* Overlay: Дэлгэцийн хаана ч дарсан цэс хаагдана */}
          <div
            className="fixed inset-0 z-[70] bg-black/5 backdrop-blur-[2px]"
            onClick={() => setIsOpen(false)}
          />
          {/* Dropdown Container: right-0 болон w-full-оос сэргийлсэн */}
          <div className="absolute top-full right-0 mt-3 w-[200px] p-2 bg-white border border-slate-100 rounded-[1.8rem] shadow-2xl md:hidden flex flex-col gap-1 animate-in fade-in slide-in-from-top-2 duration-200 z-[80]">
            {links.map((link) => {
              const isActive = pathname === link.href;
              const Icon = link.icon;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`p-4 rounded-2xl font-bold text-[10px] uppercase tracking-widest flex items-center gap-3 transition-all ${
                    isActive
                      ? "bg-[#312C85] text-white shadow-lg shadow-indigo-100"
                      : "text-slate-500 hover:bg-slate-50"
                  }`}
                >
                  <Icon size={16} />
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
