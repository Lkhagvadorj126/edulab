"use client";
import React, { useState } from "react";
import Link from "next/link";
import {
  FaAtom,
  FaSignOutAlt,
  FaTrophy,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import { useAuth } from "@/context/AuthContext";

const navLinks = [
  { name: "Физик", href: "/indexP" },
  { name: "Хими", href: "/indexH" },
  { name: "Биологи", href: "#" },
  { name: "Газар зүй", href: "#" },
];

export default function NavAll() {
  const { user, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  if (!user) return null;
  const isTeacher = user.role === "teacher";
  // И-мэйлээс нэрийг салгаж авах (жишээ нь: bat@gmail.com -> Bat)
  const userName = user.email ? user.email.split("@")[0] : "User";

  return (
    <header className="fixed top-0 left-0 w-full bg-white/90 backdrop-blur-md z-[100] border-b border-slate-100 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-10">
          <Link
            href="/dashboard"
            className="flex items-center gap-3 font-black text-2xl text-[#312C85] tracking-tighter"
          >
            <div className="w-10 h-10 bg-[#312C85] rounded-xl flex items-center justify-center text-white">
              <FaAtom size={18} />
            </div>
            <span>SCIENCE</span>
          </Link>

          <nav className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-[12px] font-extrabold text-slate-500 hover:text-[#312C85] uppercase tracking-widest transition-all"
              >
                {link.name}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-4">
          {!isTeacher && (
            <div className="flex items-center gap-2 bg-slate-50 px-3 py-2 rounded-xl border border-slate-100">
              <FaTrophy className="text-amber-500 text-xs" />
              <span className="text-sm font-black text-slate-700">
                {user.totalXp || 0}{" "}
                <span className="text-[10px] text-slate-400 uppercase">XP</span>
              </span>
            </div>
          )}

          <div className="hidden md:flex flex-col items-end">
            <span className="text-[11px] font-black text-[#312C85] uppercase tracking-wider">
              {isTeacher ? "БАГШ" : "СУРАГЧ"}
            </span>
            <span className="text-xs font-bold text-slate-500 lowercase">
              {userName}
            </span>
          </div>

          <button
            onClick={logout}
            className="bg-red-50 text-red-500 p-3 rounded-xl hover:bg-red-500 hover:text-white transition-all"
          >
            <FaSignOutAlt />
          </button>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-3 bg-slate-100 rounded-xl"
          >
            {isMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden bg-white border-t p-4 flex flex-col gap-2 shadow-inner">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setIsMenuOpen(false)}
              className="p-4 font-black text-slate-600 uppercase text-xs tracking-widest hover:bg-slate-50 rounded-xl"
            >
              {link.name}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
