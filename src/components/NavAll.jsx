"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  FaAtom,
  FaSignOutAlt,
  FaTrophy,
  FaBars,
  FaTimes,
  FaUserCircle,
} from "react-icons/fa";
import { useAuth } from "@/context/AuthContext";

const navLinks = [
  { name: "Физик", href: "/indexP" },
  { name: "Хими", href: "/indexH" },
  { name: "Биологи", href: "/biology" },
  { name: "Газар зүй", href: "/geography" },
];

export default function NavAll() {
  const { user, logout, refreshUser } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Хуудас ачаалагдах эсвэл user өөрчлөгдөх бүрт датаг шинэчлэх
  useEffect(() => {
    if (user && refreshUser) {
      refreshUser();
    }
  }, []);

  if (!user) return null;

  const isTeacher = user.role === "teacher";

  // Хэрэв нэр байвал нэрийг, байхгүй бол и-мэйлийн эхний хэсгийг харуулна
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
            <span className="hidden sm:block">EDULAB</span>
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
          {/* Гарах товч */}
          <button
            onClick={logout}
            title="Системээс гарах"
            className="ml-2 flex items-center justify-center gap-3  bg-slate-50 text-slate-400 p-3 rounded-2xl hover:bg-red-50 hover:text-red-500 transition-all active:scale-90"
          >
            <FaSignOutAlt size={16} />
            <h1>Гарах</h1>
          </button>
          {/* Хэрэглэгчийн мэдээлэл */}
          <Link href="/profile">
            <div className="hidden md:flex items-center gap-3 pl-4 border-l border-slate-100">
              <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center text-slate-400">
                <FaUserCircle size={24} />
              </div>
            </div>
          </Link>

          {/* Mobile Toggle */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-3 bg-slate-50 rounded-2xl text-[#312C85]"
          >
            {isMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden bg-white border-t p-6 flex flex-col gap-4 shadow-2xl animate-in slide-in-from-top duration-300">
          <div className="flex items-center gap-4 mb-4 p-4 bg-slate-50 rounded-3xl">
            <div className="w-12 h-12 bg-[#312C85] rounded-2xl flex items-center justify-center text-white font-black">
              {displayName.charAt(0).toUpperCase()}
            </div>
            <div>
              <p className="font-black text-[#312C85] uppercase text-xs">
                {displayName}
              </p>
              <p className="text-[10px] text-slate-400 font-bold uppercase">
                {user.school}
              </p>
            </div>
          </div>
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setIsMenuOpen(false)}
              className="px-4 py-2 font-black text-slate-500 uppercase text-xs tracking-[0.2em] hover:text-[#312C85] transition-colors"
            >
              {link.name}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
