"use client";

import React from "react";
import Link from "next/link";
import Nav from "../components/Nav";
import {
  ArrowRightCircle,
  Layers,
  MoveHorizontal,
  Target,
  Zap,
  ZapOff,
} from "lucide-react";

// Өгөгдлийн бүтэц - Улаан өнгөний хослолууд
const pageConfig = {
  topics: [
    {
      title: "Диффуз",
      desc: "Бодисын молекулууд өөрөө аяндаа холилдож, концентраци тэнцвэржих үзэгдэл. Хий болон шингэн дэх молекул хөдөлгөөн.",
      icon: (
        <MoveHorizontal className="w-9 h-9 text-rose-600" strokeWidth={2.5} />
      ),
      href: "/diffusion",
      color: "hover:border-rose-500 hover:shadow-rose-500/10",
      iconBg: "bg-rose-50",
    },
    {
      title: "Молекулын туйлшрал",
      desc: "Гадаад цахилгаан орны нөлөөгөөр молекул доторх цэнэгийн төвүүд шилжих үзэгдэл. Диполь момент ба диэлектрик шинж чанар.",
      icon: <Zap className="w-9 h-9 text-red-600" strokeWidth={2.5} />,
      href: "/molecular",
      color: "hover:border-red-500 hover:shadow-red-500/10",
      iconBg: "bg-red-50",
    },
    {
      title: "Квант хэмжилт",
      desc: "Бичил бөөмсийн төлөв байдлыг тодорхойлох процесс. Гейзенбергийн тодорхойгүйн зарчим ба долгионы функцийн нуралт.",
      icon: <Target className="w-9 h-9 text-orange-600" strokeWidth={2.5} />,
      href: "/measurement",
      color: "hover:border-orange-500 hover:shadow-orange-500/10",
      iconBg: "bg-orange-50",
    },
    {
      title: "Нягтрал",
      desc: "Нэгж эзэлхүүнд ногдох бодисын масс. Хатуу, шингэн, хийн төлөв байдлын молекул бүтцийн нягт ба Архимедийн хүч.",
      icon: <Layers className="w-9 h-9 text-pink-600" strokeWidth={2.5} />,
      href: "/density",
      color: "hover:border-pink-500 hover:shadow-pink-500/10",
      iconBg: "bg-pink-50",
    },
    {
      title: "Лазер",
      desc: "Албадмал цацрагаар гэрлийг хүчтэй болгох төхөөрөмж. Когерент чанар, монохромат гэрэл ба фотоны бөөгнөрөл.",
      icon: <ZapOff className="w-9 h-9 text-rose-500" strokeWidth={2.5} />,
      href: "/laser",
      color: "hover:border-rose-400 hover:shadow-rose-400/10",
      iconBg: "bg-rose-50",
    },
  ],
};

export default function Home() {
  const { topics } = pageConfig;

  return (
    <main className="min-h-screen bg-[#FFF8F8]">
      <section className="max-w-7xl mx-auto px-4 md:px-8 py-12 md:py-20 relative z-20">
        {/* Хөтөлбөрийн гарчиг хэсэг */}
        <div className="flex items-center gap-4 mb-4">
          {/* Буцах товч (SVG) */}
          <Link
            href="/dashboard"
            className="p-2 rounded-full hover:bg-slate-100 transition-colors duration-300 text-rose-600"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m15 18-6-6 6-6" />
            </svg>
          </Link>

          <h2 className="text-sm font-black text-rose-600 uppercase tracking-[0.3em]">
            Сургалтын хөтөлбөр
          </h2>
        </div>
        {/* NAVIGATION */}
        <div className="m-3">
          <Nav />
        </div>

        {/* Grid Card-ууд */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {topics.map((topic, index) => (
            <Link
              key={index}
              href={topic.href}
              className={`group bg-white p-8 md:p-10 rounded-[40px] shadow-sm border-2 border-rose-50 transition-all duration-500 transform hover:-translate-y-3 hover:shadow-2xl ${topic.color}`}
            >
              {/* Icon Container */}
              <div
                className={`mb-8 p-5 ${topic.iconBg} rounded-[24px] w-fit group-hover:scale-110 transition-transform duration-500 shadow-sm`}
              >
                {topic.icon}
              </div>

              {/* Title */}
              <h2 className="text-2xl font-black text-slate-900 mb-4 group-hover:text-rose-600 transition-colors tracking-tight">
                {topic.title}
              </h2>

              {/* Description */}
              <p className="text-slate-500 leading-relaxed mb-8 font-medium">
                {topic.desc}
              </p>

              {/* CTA Button */}
              <div className="flex items-center text-[15px] font-bold text-rose-600 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-[-10px] group-hover:translate-x-0">
                Хичээл үзэх <ArrowRightCircle className="ml-2 w-5 h-5" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* BACKGROUND DECORATION */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none -z-10 opacity-40">
        <div className="absolute top-[10%] left-[-5%] w-[30%] h-[30%] bg-rose-100 rounded-full blur-[120px]" />
        <div className="absolute bottom-[10%] right-[-5%] w-[25%] h-[25%] bg-orange-100 rounded-full blur-[100px]" />
      </div>
    </main>
  );
}
