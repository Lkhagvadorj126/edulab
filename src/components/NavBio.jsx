"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

export default function NavBio() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  // Класс тодорхойлолт (Физикийн загвартай ижилхэн #312C85 өнгө ба загвар)
  const baseClass =
    "px-4 py-3 rounded-xl transition-all duration-300 font-black text-[12px] lg:text-[13px] text-center uppercase tracking-wider";
  const desktopClass = "flex-1 mx-0.5";
  const mobileClass = "w-full mb-1 text-left px-6";

  // Идэвхтэй болон идэвхгүй үеийн өнгө (#312C85)
  const activeClass =
    "bg-[#312C85] text-white shadow-lg shadow-[#312C85]/20 scale-[1.02]";
  const normalClass =
    "text-slate-500 hover:bg-[#312C85]/5 hover:text-[#312C85]";

  const links = [
    { href: "/biology", label: "Нүүр" },
    { href: "/urgamal", label: "Ургамал" },
    { href: "/angilal", label: "Амьтны ангилал" },
    { href: "/hoollolt", label: "Хүний Хооллолт" },
    { href: "/zohitsuulga", label: "Зохицуулга ба хяналт" },
    { href: "/amisgal", label: "Амьсгал ба зөөвөрлөлт" },
    { href: "/es", label: "Эсийн бүтэц" },
  ];

  return (
    <nav className="w-full mb-10 relative z-50">
      <div className="bg-white border border-slate-100 rounded-[1.5rem] p-2 shadow-sm flex items-center justify-between w-full">
        {/* Mobile Logo / Title */}
        <div className="md:hidden pl-4 font-black text-[#312C85] tracking-tighter uppercase">
          Биологи
        </div>

        {/* Hamburger Button (Mobile Only) */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-3 rounded-xl hover:bg-slate-50 text-[#312C85] transition-colors"
        >
          {isOpen ? (
            <X size={22} strokeWidth={3} />
          ) : (
            <Menu size={22} strokeWidth={3} />
          )}
        </button>

        {/* Desktop Links (Hidden on Mobile) */}
        <div className="hidden md:flex items-center justify-between w-full">
          {links.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`${baseClass} ${desktopClass} ${isActive ? activeClass : normalClass}`}
              >
                {link.label}
              </Link>
            );
          })}
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-3 p-3 bg-white border border-slate-100 rounded-[2rem] shadow-2xl md:hidden flex flex-col animate-in fade-in slide-in-from-top-4 duration-300">
          {links.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`${baseClass} ${mobileClass} ${isActive ? activeClass : normalClass}`}
              >
                {link.label}
              </Link>
            );
          })}
        </div>
      )}
    </nav>
  );
}
