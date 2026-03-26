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
      desc: "Биетүүдийн байрлал хугацааны явцад өөрчлөгдөх зүй тогтол.",
      icon: <MoveRight />,
      href: "/motion",
      iconBg: "bg-[#312C85]/5",
    },
    {
      title: "Дуу ба долгион",
      desc: "Орчинд тархах механик долгион. Давтамж, долгионы урт.",
      icon: <Wind />,
      href: "/sound",
      iconBg: "bg-[#312C85]/5",
    },
    {
      title: "Дулаан",
      desc: "Энергийн шилжилт ба температурын өөрчлөлт.",
      icon: <Thermometer />,
      href: "/heat",
      iconBg: "bg-[#312C85]/5",
    },
    {
      title: "Квантын үзэгдэл",
      desc: "Атом ба электроны бичил ертөнц. Квант физикийн үндэс.",
      icon: <Atom />,
      href: "/quantum",
      iconBg: "bg-[#312C85]/5",
    },
    {
      title: "Гэрэл ба цацраг",
      desc: "Цахилгаан соронзон долгионы шинж чанар. Оптик үзэгдлүүд.",
      icon: <Sun />,
      href: "/light",
      iconBg: "bg-[#312C85]/5",
    },
    {
      title: "Цахилгаан ба Соронз",
      desc: "Цахилгаан хэлхээ, гүйдэл, хүчдэл болон Омын хууль.",
      icon: <Zap />,
      href: "/energy",
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

      <section className="max-w-7xl mx-auto px-5 md:px-8 pt-24 md:pt-32 pb-20 relative z-20">
        {/* Header Section */}
        <div className="flex flex-col gap-6 mb-12">
          {/* Энэ контейнер дэлгэцийн өргөнийг дүүргэж, доторх элементүүдээ зөв хуваарилна */}
          <div className="flex items-center justify-between w-full gap-4">
            {/* Зүүн тал: Буцах товч болон Гарчиг */}
            <div className="flex items-center gap-3 md:gap-4 min-w-0">
              <Link
                href="/dashboard"
                className="group p-2.5 md:p-3 rounded-2xl bg-white border border-slate-100 shadow-sm hover:bg-[#312C85]/5 transition-all active:scale-95 shrink-0"
              >
                <ChevronLeft className="w-5 h-5 md:w-6 md:h-6 text-[#312C85] group-hover:-translate-x-1 transition-transform" />
              </Link>
              <div className="min-w-0">
                <h2 className="text-[9px] md:text-sm font-black text-[#312C85] uppercase tracking-[0.2em] mb-0.5 md:mb-1 truncate">
                  {isTeacher ? "Багшийн хяналт" : "Сургалтын хөтөлбөр"}
                </h2>
                <h1 className="text-xl md:text-3xl font-black text-slate-900 tracking-tight truncate">
                  Физик
                </h1>
                <div className="h-0.5 md:h-1 w-8 md:w-12 bg-[#312C85] rounded-full mt-1" />
              </div>
            </div>

            {/* Баруун тал: Navbar (Хөтөлбөр) эсвэл Багшийн товч */}
            <div className="flex-shrink-0">
              {!isTeacher ? (
                <Navbar />
              ) : (
                <Link
                  href="/students-progress"
                  className="bg-[#312C85] text-white px-4 py-2.5 md:px-5 md:py-3 rounded-2xl font-bold text-[9px] md:text-[11px] uppercase tracking-wider shadow-lg shadow-[#312C85]/20 hover:bg-[#312C85]/90 transition-all flex items-center gap-2 active:scale-95"
                >
                  <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></span>
                  <span className="hidden xs:inline">Зэрэглэл</span>
                  <span className="inline xs:hidden">Оноо</span>
                </Link>
              )}
            </div>
          </div>
        </div>

        {/* Topics Grid - Better spacing for mobile */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-8">
          {topics.map((topic, index) => (
            <Link
              key={index}
              href={topic.href}
              className="group bg-white p-7 md:p-10 rounded-[32px] md:rounded-[40px] shadow-sm border-2 border-slate-100 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:border-[#312C85]/20"
            >
              <div
                className={`mb-6 p-4 md:p-5 ${topic.iconBg} rounded-[20px] md:rounded-[24px] w-fit group-hover:rotate-6 transition-all duration-500`}
              >
                {React.cloneElement(topic.icon, {
                  className: "w-7 h-7 md:w-9 md:h-9 text-[#312C85]",
                  strokeWidth: 2.5,
                })}
              </div>
              <h2 className="text-xl md:text-2xl font-black text-slate-900 mb-3 group-hover:text-[#312C85] transition-colors tracking-tight">
                {topic.title}
              </h2>
              <p className="text-slate-500 text-sm md:text-base leading-relaxed mb-6 font-medium">
                {topic.desc}
              </p>
              <div className="flex items-center text-sm font-bold text-[#312C85] md:opacity-0 group-hover:opacity-100 transition-all duration-300 md:-translate-x-2 group-hover:translate-x-0">
                {isTeacher ? "Агуулга засах" : "Хичээл үзэх"}
                <ArrowRightCircle className="ml-2 w-4 h-4 md:w-5 md:h-5" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Decorative Background - Hidden on small screens to boost performance */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none -z-10 opacity-20 hidden sm:block">
        <div className="absolute top-[10%] left-[-5%] w-[35%] h-[35%] bg-[#312C85]/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[10%] right-[-5%] w-[30%] h-[30%] bg-[#312C85]/10 rounded-full blur-[100px]" />
      </div>
    </main>
  );
}
