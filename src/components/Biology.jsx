"use client";

import React from "react";
import Link from "next/link";
import {
  BookOpen,
  BrainCircuit,
  ChevronLeft,
  Zap,
  Wind,
  Dna,
  ArrowRightCircle,
} from "lucide-react";
import NavAll from "./NavAll";

const TOPICS = [
  {
    id: 1,
    href: "/urgamal",
    title: "Ургамал",
    desc: "Ургамлын төрөл зүйл, ангилал ба фотосинтезийн процесс.",
    icon: <Zap className="w-8 h-8 text-[#312C85]" strokeWidth={2.5} />,
    iconBg: "bg-[#312C85]/5",
  },
  {
    id: 2,
    href: "/angilal",
    title: "Амьтны ангилал",
    desc: "Амьтдын аймаг, овог, төрөл ба эволюцийн хөгжил.",
    icon: <BrainCircuit className="w-8 h-8 text-[#312C85]" strokeWidth={2.5} />,
    iconBg: "bg-[#312C85]/5",
  },
  {
    id: 3,
    href: "/hoollolt",
    title: "Хүний хооллолт",
    desc: "Эрүүл хооллолтын үндсэн зарчим, шим тэжээл ба боловсруулах эрхтэн.",
    icon: <BookOpen className="w-8 h-8 text-[#312C85]" strokeWidth={2.5} />,
    iconBg: "bg-[#312C85]/5",
  },
  {
    id: 4,
    href: "/zohitsuulga",
    title: "Зохицуулга ба хяналт",
    desc: "Гормон ба мэдрэлийн системийн харилцан үйлчлэл.",
    icon: <Zap className="w-8 h-8 text-[#312C85]" strokeWidth={2.5} />,
    iconBg: "bg-[#312C85]/5",
  },
  {
    id: 5,
    href: "/amisgal",
    title: "Амьсгал ба зөөвөрлөлт",
    desc: "Амьсгалын тогтолцоо, хий солилцоо ба цусны эргэлт.",
    icon: <Wind className="w-8 h-8 text-[#312C85]" strokeWidth={2.5} />,
    iconBg: "bg-[#312C85]/5",
  },
  {
    id: 6,
    href: "/es",
    title: "Эсийн бүтэц",
    desc: "Эсийн эрхтэнцрийн бүтэц, үүрэг ба хуваагдал.",
    icon: <Dna className="w-8 h-8 text-[#312C85]" strokeWidth={2.5} />,
    iconBg: "bg-[#312C85]/5",
  },
];

export default function BiologyPage() {
  return (
    <main className="min-h-screen bg-[#F8FAFC] relative overflow-hidden">
      <NavAll />

      <section className="max-w-7xl mx-auto px-4 md:px-8 pt-32 pb-20 relative z-20">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-16">
          <div className="flex items-center gap-5">
            <Link
              href="/dashboard"
              className="group p-4 rounded-2xl bg-white border border-slate-100 shadow-sm hover:bg-[#312C85]/5 transition-all duration-300 text-[#312C85] active:scale-95"
            >
              <ChevronLeft className="w-6 h-6 group-hover:-translate-x-1 transition-transform" />
            </Link>
            <div>
              <h2 className="text-xs font-black text-[#312C85] uppercase tracking-[0.3em] mb-1">
                Сургалтын хөтөлбөр
              </h2>
              <h1 className="text-3xl font-black text-slate-900 tracking-tight">
                Биологи
              </h1>
            </div>
          </div>
        </div>

        {/* Topics Grid - Карт бүр Link болсон */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
          {TOPICS.map((topic) => (
            <Link
              key={topic.id}
              href={topic.href}
              className="group bg-white p-8 md:p-10 rounded-[40px] shadow-sm border-2 border-slate-100 transition-all duration-500 transform hover:-translate-y-2 hover:shadow-2xl hover:border-[#312C85]/20 flex flex-col"
            >
              <div className="flex justify-between items-start mb-8">
                <div
                  className={`p-5 ${topic.iconBg} rounded-[24px] group-hover:rotate-6 transition-all duration-500`}
                >
                  {topic.icon}
                </div>
                <ArrowRightCircle className="text-slate-200 group-hover:text-[#312C85] transition-colors w-8 h-8 opacity-0 group-hover:opacity-100 translate-x-4 group-hover:translate-x-0 duration-300" />
              </div>

              <h2 className="text-2xl font-black text-slate-900 mb-3 group-hover:text-[#312C85] transition-colors tracking-tight">
                {topic.title}
              </h2>
              <p className="text-slate-500 leading-relaxed font-medium">
                {topic.desc}
              </p>

              <div className="mt-8 flex items-center gap-2 text-[#312C85] font-bold text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                Хичээл үзэх <ArrowRightCircle size={16} />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Background Decorative Elements */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none -z-10 opacity-40">
        <div className="absolute top-[-10%] right-[-5%] w-[40%] h-[40%] bg-[#312C85]/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[40%] h-[40%] bg-[#312C85]/10 rounded-full blur-[120px]" />
      </div>
    </main>
  );
}
