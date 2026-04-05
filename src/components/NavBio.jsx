"use client";
import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { BIOLOGY_CONFIG } from "@/constants/lessonDataBio";

export default function NavBio() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const baseClass =
    "px-4 py-3 rounded-xl transition-all duration-300 font-black text-[12px] lg:text-[13px] text-center uppercase tracking-wider whitespace-nowrap";
  const activeClass =
    "bg-[#312C85] text-white shadow-lg shadow-[#312C85]/20 scale-[1.02]";
  const normalClass =
    "text-slate-500 hover:bg-[#312C85]/5 hover:text-[#312C85]";

  const dynamicLinks = Object.keys(BIOLOGY_CONFIG).map((key) => ({
    href: `/biology/${key}`,
    label: BIOLOGY_CONFIG[key].page.title.split(" ")[0],
  }));

  const links = [{ href: "/biology", label: "Нүүр" }, ...dynamicLinks];

  return (
    <nav className="w-full mb-10 relative z-50">
      <div className="bg-white border border-slate-100 rounded-[1.5rem] p-2 shadow-sm flex items-center justify-between w-full">
        <div className="md:hidden pl-4 font-black text-[#312C85] uppercase">
          Биологи
        </div>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-3 text-[#312C85]"
        >
          {isOpen ? (
            <X size={22} strokeWidth={3} />
          ) : (
            <Menu size={22} strokeWidth={3} />
          )}
        </button>
        <div className="hidden md:flex items-center justify-between w-full gap-1">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`${baseClass} flex-1 ${pathname === link.href ? activeClass : normalClass}`}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-3 p-3 bg-white border border-slate-100 rounded-[2rem] shadow-2xl md:hidden flex flex-col z-[60]">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className={`${baseClass} w-full mb-1 ${pathname === link.href ? activeClass : normalClass}`}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
