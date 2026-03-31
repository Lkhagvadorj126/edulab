"use client";
import React from "react";
import Link from "next/link";
import {
  Globe,
  Compass,
  Mountain,
  CloudRain,
  Navigation,
  Map,
  LayoutGrid,
  ChevronLeft,
  ArrowRightCircle,
  Waves,
} from "lucide-react";
import NavAll from "@/components/NavAll";
import NavbarH from "@/components/NavbarH"; // Navbar-г NavbarH болгов
import { useAuth } from "@/context/AuthContext";
import NavGeo from "@/components/NavGeo";
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
      <div className="absolute top-0 right-0 w-1/2 h-full opacity-[0.02] pointer-events-none overflow-hidden z-10">
        <Compass size={600} className="translate-x-1/3 -translate-y-1/4" />
      </div>

      <section className="max-w-7xl mx-auto px-5 pt-24 md:pt-32 pb-20 relative z-20">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div className="flex items-center gap-4">
            <Link
              href="/dashboard"
              className="p-3 rounded-2xl bg-white border border-slate-100 shadow-sm hover:bg-[#312C85]/5 transition-all active:scale-95 text-[#312C85]"
            >
              <ChevronLeft className="w-6 h-6" />
            </Link>
            <div>
              <h2 className="text-sm font-black text-[#312C85] uppercase tracking-[0.2em] mb-1">
                {isTeacher ? "Багшийн хяналт" : "Газарзүйн Хөтөлбөр"}
              </h2>
              <h1 className="text-3xl font-black text-slate-900 tracking-tight">
                Газарзүй
              </h1>
              <div className="h-1 w-12 bg-[#312C85] rounded-full mt-1" />
            </div>
          </div>

          <div className="flex justify-start md:justify-end">
            {!isTeacher ? (
              <NavbarGeo />
            ) : (
              <Link
                href="/students-progress"
                className="bg-[#312C85] text-white px-6 py-3.5 rounded-2xl font-bold text-sm shadow-lg shadow-[#312C85]/20 hover:bg-[#312C85]/90 transition-all flex items-center gap-2"
              >
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                Сурагчдын зэрэглэл харах
              </Link>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {geoPageConfig.topics.map((topic, index) => (
            <Link
              key={index}
              href={topic.href}
              className="group bg-white p-10 rounded-[40px] shadow-sm border-2 border-slate-100 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:border-[#312C85]/20"
            >
              <div
                className={`mb-6 p-5 ${topic.iconBg} rounded-[24px] w-fit group-hover:rotate-[15deg] transition-all duration-500`}
              >
                {React.cloneElement(topic.icon, {
                  size: 32,
                  className: "text-[#312C85]",
                  strokeWidth: 2.5,
                })}
              </div>
              <h2 className="text-2xl font-black text-slate-900 mb-3 group-hover:text-[#312C85] transition-colors">
                {topic.title}
              </h2>
              <p className="text-slate-500 text-sm leading-relaxed mb-6 font-medium">
                {topic.desc}
              </p>
              <div className="flex items-center text-sm font-bold text-[#312C85] opacity-0 group-hover:opacity-100 translate-x-[-10px] group-hover:translate-x-0 transition-all">
                {isTeacher ? "Агуулга засах" : "Хичээл үзэх"}{" "}
                <ArrowRightCircle className="ml-2 w-5 h-5" />
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
