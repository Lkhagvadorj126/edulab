"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  FaAtom,
  FaSignOutAlt,
  FaBars,
  FaTimes,
  FaUserCircle,
  FaChevronRight,
} from "react-icons/fa";
import { useAuth } from "@/context/AuthContext";

const navLinks = [
  { name: "Физик", href: "/indexP" },
  { name: "Хими", href: "/indexH" },
  { name: "Биологи", href: "/biology" },
  { name: "Газар зүй", href: "/indexGeo" },
];

export default function NavAll() {
  const { user, logout, refreshUser } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    if (user && refreshUser) {
      refreshUser();
    }
  }, []);

  if (!user) return null;

  const displayName =
    user.name || (user.email ? user.email.split("@")[0] : "Хэрэглэгч");

  return (
    <header className="fixed top-0 left-0 w-full bg-white/80 backdrop-blur-xl z-[100] border-b border-slate-100 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-10">
          <Link
            href="/dashboard"
            className="flex items-center gap-3 font-black text-2xl text-[#312C85] tracking-tighter hover:scale-105 transition-transform"
          >
            <div className="w-10 h-10 bg-[#312C85] rounded-xl flex items-center justify-center text-white shadow-lg shadow-indigo-200">
              <FaAtom size={20} className="animate-spin-slow" />
            </div>
            <span className="hidden sm:block uppercase">EDULAB</span>
          </Link>

          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-[11px] font-black text-slate-400 hover:text-[#312C85] uppercase tracking-[0.2em] transition-all"
              >
                {link.name}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-3">
          {/* Desktop Logout Button */}
          <button
            onClick={logout}
            className="hidden md:flex items-center gap-2 bg-slate-50 text-slate-400 px-4 py-2 rounded-xl hover:bg-red-50 hover:text-red-500 transition-all active:scale-95"
          >
            <FaSignOutAlt size={14} />
            <span className="text-[11px] font-black uppercase tracking-wider">
              Гарах
            </span>
          </button>

          {/* Desktop Profile Icon */}
          <Link href="/profile" className="hidden md:block">
            <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center text-slate-400 hover:text-[#312C85] transition-colors border border-slate-200">
              <FaUserCircle size={24} />
            </div>
          </Link>

          {/* Mobile Toggle Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-3 bg-slate-50 rounded-2xl text-[#312C85] hover:bg-slate-100 transition-colors"
          >
            {isMenuOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-[73px] bg-white border-t border-slate-100 shadow-2xl animate-in slide-in-from-top duration-300 h-screen overflow-y-auto pb-20">
          <div className="p-6 space-y-6">
            {/* 1. Profile Section in Mobile Menu */}
            <Link
              href="/profile"
              onClick={() => setIsMenuOpen(false)}
              className="flex items-center justify-between p-4 bg-[#312C85]/5 rounded-[2rem] border border-[#312C85]/10 group active:scale-95 transition-all"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-[#312C85] rounded-2xl flex items-center justify-center text-white font-black shadow-lg shadow-indigo-100">
                  {displayName.charAt(0).toUpperCase()}
                </div>
                <div>
                  <p className="font-black text-[#312C85] uppercase text-xs tracking-tight">
                    {displayName}
                  </p>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                    Профайл үзэх
                  </p>
                </div>
              </div>
              <FaChevronRight className="text-slate-300 group-hover:translate-x-1 transition-transform" />
            </Link>

            {/* 2. Navigation Links */}
            <div className="grid grid-cols-1 gap-2">
              <p className="px-4 text-[10px] font-black text-slate-300 uppercase tracking-[0.2em] mb-2">
                Хичээлүүд
              </p>
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="px-6 py-4 font-black text-slate-600 uppercase text-xs tracking-[0.15em] hover:bg-slate-50 rounded-2xl transition-colors flex items-center justify-between"
                >
                  {link.name}
                  <div className="w-1.5 h-1.5 rounded-full bg-slate-200"></div>
                </Link>
              ))}
            </div>

            {/* 3. Logout Button in Mobile Menu */}
            <div className="pt-4 border-t border-slate-50">
              <button
                onClick={() => {
                  setIsMenuOpen(false);
                  logout();
                }}
                className="w-full flex items-center justify-center gap-3 py-4 bg-red-50 text-red-500 rounded-2xl font-black uppercase text-xs tracking-widest hover:bg-red-100 transition-colors active:scale-95"
              >
                <FaSignOutAlt size={16} />
                Системээс гарах
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
