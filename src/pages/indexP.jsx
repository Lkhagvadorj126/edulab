"use client";
import React from "react";
import Link from "next/link";
import {
  MoveRight,
  Wind,
  Thermometer,
  Atom,
  Sun,
  Zap,
  ArrowRightCircle,
  ChevronLeft,
} from "lucide-react";
import NavAll from "../components/NavAll";
import Navbar from "../components/Navbar";
import { useAuth } from "@/context/AuthContext";

const pageConfig = {
  topics: [
    {
      title: "Хөдөлгөөн",
      desc: "Биетүүдийн байрлал хугацааны явцад өөрчлөгдөх зүй тогтол. Хурд, хурдатгал болон Ньютоны хуулиуд.",
      icon: <MoveRight className="w-9 h-9 text-[#312C85]" strokeWidth={2.5} />,
      href: "/motion",
      color: "hover:border-[#312C85]/40 hover:shadow-[#312C85]/10",
      iconBg: "bg-[#312C85]/5",
    },
    {
      title: "Дуу ба долгион",
      desc: "Орчинд тархах механик долгион. Давтамж, долгионы урт болон дууны физик шинж чанарууд.",
      icon: <Wind className="w-9 h-9 text-[#312C85]" strokeWidth={2.5} />,
      href: "/sound",
      color: "hover:border-[#312C85]/40 hover:shadow-[#312C85]/10",
      iconBg: "bg-[#312C85]/5",
    },
    {
      title: "Дулаан",
      desc: "Энергийн шилжилт ба температурын өөрчлөлт. Дулаан дамжуулалт, багтаамж ба термодинамик.",
      icon: (
        <Thermometer className="w-9 h-9 text-[#312C85]" strokeWidth={2.5} />
      ),
      href: "/heat",
      color: "hover:border-[#312C85]/40 hover:shadow-[#312C85]/10",
      iconBg: "bg-[#312C85]/5",
    },
    {
      title: "Квантын үзэгдэл",
      desc: "Атом ба электроны бичил ертөнц. Фотоэффект, энергийн түвшин болон квант физикийн үндэс.",
      icon: <Atom className="w-9 h-9 text-[#312C85]" strokeWidth={2.5} />,
      href: "/quantum",
      color: "hover:border-[#312C85]/40 hover:shadow-[#312C85]/10",
      iconBg: "bg-[#312C85]/5",
    },
    {
      title: "Гэрэл ба цацраг",
      desc: "Цахилгаан соронзон долгионы шинж чанар. Ойлт, хугарал, линз болон оптик үзэгдлүүд.",
      icon: <Sun className="w-9 h-9 text-[#312C85]" strokeWidth={2.5} />,
      href: "/light",
      color: "hover:border-[#312C85]/40 hover:shadow-[#312C85]/10",
      iconBg: "bg-[#312C85]/5",
    },
    {
      title: "Цахилгаан ба Соронз",
      desc: "Цахилгаан хэлхээ, гүйдэл, хүчдэл болон соронзон орны харилцан үйлчлэл, Омын хууль.",
      icon: <Zap className="w-9 h-9 text-[#312C85]" strokeWidth={2.5} />,
      href: "/energy",
      color: "hover:border-[#312C85]/40 hover:shadow-[#312C85]/10",
      iconBg: "bg-[#312C85]/5",
    },
  ],
};

export default function PhysicsPage() {
  const { user } = useAuth();
  const isTeacher = user?.role === "teacher";
  const { topics } = pageConfig;

  return (
    <main className="min-h-screen bg-[#F8FAFC]">
      <NavAll />

      <section className="max-w-7xl mx-auto px-4 md:px-8 pt-32 pb-20 relative z-20">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div className="flex items-center gap-4">
            <Link
              href="/dashboard"
              className="group p-3 rounded-2xl bg-white border border-slate-100 shadow-sm hover:bg-[#312C85]/5 transition-all duration-300 text-[#312C85] active:scale-95"
            >
              <ChevronLeft className="w-6 h-6 group-hover:-translate-x-1 transition-transform" />
            </Link>
            <div>
              <h2 className="text-sm font-black text-[#312C85] uppercase tracking-[0.3em] mb-1">
                {isTeacher ? "Багшийн хяналт" : "Сургалтын хөтөлбөр"}
              </h2>
              <h1 className="text-3xl font-black text-slate-900 tracking-tight">
                Физик
              </h1>
              <div className="h-1 w-12 bg-[#312C85] rounded-full" />
            </div>
          </div>

          {/* Багш биш үед Navbar-ыг баруун талд харуулна */}
          {!isTeacher && (
            <div className="flex justify-start md:justify-end">
              <Navbar />
            </div>
          )}

          {/* Багшид зориулсан товч */}
          {isTeacher && (
            <Link
              href="/students-progress"
              className="bg-[#312C85] text-white px-6 py-3.5 rounded-2xl font-bold text-sm shadow-lg shadow-[#312C85]/20 hover:bg-[#312C85]/90 transition-all flex items-center gap-2 active:scale-95"
            >
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
              Сурагчдын зэрэглэл харах
            </Link>
          )}
        </div>

        {/* Topics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {topics.map((topic, index) => (
            <Link
              key={index}
              href={topic.href}
              className={`group bg-white p-8 md:p-10 rounded-[40px] shadow-sm border-2 border-slate-100 transition-all duration-500 transform hover:-translate-y-3 hover:shadow-2xl ${topic.color}`}
            >
              <div
                className={`mb-8 p-5 ${topic.iconBg} rounded-[24px] w-fit group-hover:rotate-6 transition-all duration-500 shadow-sm`}
              >
                {topic.icon}
              </div>
              <h2 className="text-2xl font-black text-slate-900 mb-4 group-hover:text-[#312C85] transition-colors tracking-tight">
                {topic.title}
              </h2>
              <p className="text-slate-500 leading-relaxed mb-8 font-medium">
                {topic.desc}
              </p>
              <div className="flex items-center text-[15px] font-bold text-[#312C85] opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-[-10px] group-hover:translate-x-0">
                {isTeacher ? "Агуулга засах" : "Хичээл үзэх"}
                <ArrowRightCircle className="ml-2 w-5 h-5" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Decorative Background */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none -z-10 opacity-30">
        <div className="absolute top-[10%] left-[-5%] w-[35%] h-[35%] bg-[#312C85]/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[10%] right-[-5%] w-[30%] h-[30%] bg-[#312C85]/10 rounded-full blur-[100px]" />
      </div>
    </main>
  );
}
