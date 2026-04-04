"use client";
import React from "react";
import Link from "next/link";
import {
  Globe,
  Compass,
  Mountain,
  CloudRain,
  Navigation,
  LayoutGrid,
  ChevronLeft,
  ArrowRightCircle,
  Waves,
  Flag,
} from "lucide-react";
import NavAll from "@/components/NavAll";
import { useAuth } from "@/context/AuthContext";
import NavbarGeo from "@/components/NavbarGeo";

const geoPageConfig = {
  topics: [
    {
      title: "Эх газар ба Далай",
      desc: "Дэлхийн царцдас, плитийн хөдөлгөөн, далайн ёроолын бүтэц",
      icon: <Globe />,
      href: "/geography/eh_gazar",
      iconBg: "bg-[#312C85]/5",
    },
    {
      title: "Уур амьсгал",
      desc: "Агаар мандлын бүтэц, салхи, даралт, уур амьсгалын өөрчлөлт",
      icon: <CloudRain />,
      href: "/geography/uur_amisgal",
      iconBg: "bg-[#312C85]/5",
    },
    {
      title: "Хүн ам ба Суурьшил",
      desc: "Хүн амын өсөлт, нягтшил, хотжилт, миграци",
      icon: <Navigation />,
      href: "/geography/hun_am",
      iconBg: "bg-[#312C85]/5",
    },
    {
      title: "Байгалийн бүс",
      desc: "Өргөргийн бүс, Өндрийн бүслүүр, Экосистем",
      icon: <Mountain />,
      href: "/geography/baigaliin_bus",
      iconBg: "bg-[#312C85]/5",
    },
    {
      title: "Эдийн засаг",
      desc: "Дэлхийн аж ахуй, аж үйлдвэр, хөдөө аж ахуй, тээвэр",
      icon: <LayoutGrid />,
      href: "/geography/economy",
      iconBg: "bg-[#312C85]/5",
    },
    {
      title: "Экологи",
      desc: "Нөөцийн ангилал, экологийн тулгамдсан асуудлууд",
      icon: <Waves />,
      href: "/geography/ecology",
      iconBg: "bg-[#312C85]/5",
    },
  ],
};

export default function Geography() {
  const { user } = useAuth();
  const isTeacher = user?.role === "teacher";

  return (
    <main className="min-h-screen bg-[#F8FAFC]">
      <NavAll />

      <div className="absolute top-0 right-0 w-full md:w-1/2 h-full opacity-[0.02] pointer-events-none overflow-hidden z-10">
        <Compass
          size={300}
          className="md:size-[600px] translate-x-1/4 -translate-y-1/4"
        />
      </div>

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
                {isTeacher ? "Багшийн хяналт" : "Газарзүйн Хөтөлбөр"}
              </h2>
              <h1 className="text-2xl md:text-4xl font-black text-slate-900 tracking-tight">
                Газарзүй
              </h1>
              <div className="h-1 w-10 md:w-12 bg-[#312C85] rounded-full mt-1" />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            {/* NavbarGeo-г бүх хэрэглэгчид (багш, сурагч) харуулна */}
            <div className="w-full sm:w-auto">
              <NavbarGeo />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-8">
          {geoPageConfig.topics.map((topic, index) => (
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
