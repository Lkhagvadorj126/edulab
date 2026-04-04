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
import { useAuth } from "@/context/AuthContext";
import Navbar from "@/components/Navbar";

const pageConfig = {
  topics: [
    {
      title: "Хөдөлгөөн",
      desc: "Биетүүдийн байрлал хугацааны явцад өөрчлөгдөг зүй тогтол.",
      icon: <MoveRight />,
      href: "/physics/motion",
      iconBg: "bg-[#312C85]/5",
    },
    {
      title: "Дуу ба долгион",
      desc: "Орчинд тархах механик долгион. Давтамж, долгионы урт.",
      icon: <Wind />,
      href: "/physics/sound",
      iconBg: "bg-[#312C85]/5",
    },
    {
      title: "Дулаан",
      desc: "Энергийн шилжилт ба температурын өөрчлөлт.",
      icon: <Thermometer />,
      href: "/physics/heat",
      iconBg: "bg-[#312C85]/5",
    },
    {
      title: "Квантын үзэгдэл",
      desc: "Атом ба электроны бичил ертөнц. Квант физикийн үндэс.",
      icon: <Atom />,
      href: "/physics/quantum",
      iconBg: "bg-[#312C85]/5",
    },
    {
      title: "Гэрэл ба цацраг",
      desc: "Цахилгаан соронзон долгионы шинж чанар. Оптик үзэгдлүүд.",
      icon: <Sun />,
      href: "/physics/light",
      iconBg: "bg-[#312C85]/5",
    },
    {
      title: "Цахилгаан ба Соронз",
      desc: "Цахилгаан хэлхээ, гүйдэл, хүчдэл болон Омын хууль.",
      icon: <Zap />,
      href: "/physics/energy",
      iconBg: "bg-[#312C85]/5",
    },
  ],
};

export default function PhysicsPage() {
  const { user } = useAuth();
  const isTeacher = user?.role === "teacher";

  return (
    <main className="min-h-screen bg-[#F8FAFC]">
      <NavAll />

      <section className="max-w-7xl mx-auto px-4 sm:px-6 pt-20 md:pt-32 pb-16 relative z-20">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 mb-10 md:mb-16">
          <div className="flex items-start sm:items-center gap-4">
            <Link
              href="/dashboard"
              className="p-3 rounded-xl md:rounded-2xl bg-white border border-slate-100 shadow-sm hover:bg-[#312C85]/5 transition-all active:scale-95 text-[#312C85]"
            >
              <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
            </Link>
            <div>
              <h2 className="text-[10px] md:text-xs font-black text-[#312C85] uppercase tracking-[0.2em] mb-1">
                {isTeacher ? "Багшийн хяналт" : "Физикийн Хөтөлбөр"}
              </h2>
              <h1 className="text-2xl md:text-4xl font-black text-slate-900 tracking-tight">
                Физик
              </h1>
              <div className="h-1 w-10 md:w-12 bg-[#312C85] rounded-full mt-1" />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            {/* Navbar-ыг багш болон сурагч хоёуланд нь харуулна */}
            <div className="w-full sm:w-auto">
              <Navbar />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-8">
          {pageConfig.topics.map((topic, index) => (
            <Link
              key={index}
              href={topic.href}
              className="group bg-white p-6 md:p-10 rounded-[30px] md:rounded-[40px] shadow-sm border-2 border-slate-100 transition-all duration-500 hover:-translate-y-1.5 md:hover:-translate-y-2 hover:shadow-xl hover:border-[#312C85]/20"
            >
              <div
                className={`mb-5 md:mb-6 p-4 md:p-5 ${topic.iconBg} rounded-[20px] md:rounded-[24px] w-fit group-hover:rotate-[12deg] transition-all duration-500`}
              >
                {React.cloneElement(topic.icon, {
                  size: 28,
                  className: "text-[#312C85] md:w-8 md:h-8",
                  strokeWidth: 2.5,
                })}
              </div>
              <h2 className="text-xl md:text-2xl font-black text-slate-900 mb-2 md:mb-3 group-hover:text-[#312C85] transition-colors">
                {topic.title}
              </h2>
              <p className="text-slate-500 text-xs md:text-sm leading-relaxed mb-4 md:mb-6 font-medium">
                {topic.desc}
              </p>
              <div className="flex items-center text-[10px] md:text-sm font-bold text-[#312C85] opacity-0 group-hover:opacity-100 translate-x-[-10px] group-hover:translate-x-0 transition-all">
                {isTeacher ? "Агуулга засах" : "Хичээл үзэх"}
                <ArrowRightCircle className="ml-2 w-4 h-4 md:w-5 md:h-5" />
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
