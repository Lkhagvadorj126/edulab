"use client";
import React from "react";
import Link from "next/link";
import {
  MoveHorizontal,
  Zap,
  Target,
  Layers,
  ZapOff,
  ArrowRightCircle,
  ChevronLeft,
} from "lucide-react";
import NavAll from "../components/NavAll";
import { useAuth } from "@/context/AuthContext";
import NavbarH from "@/components/NavbarH";

const pageConfig = {
  topics: [
    {
      title: "Диффуз",
      desc: "Бодисын молекулууд өөрөө аяндаа холилдож, концентраци тэнцвэржих үзэгдэл. Хий болон шингэн дэх молекул хөдөлгөөн.",
      icon: (
        <MoveHorizontal className="w-9 h-9 text-[#312C85]" strokeWidth={2.5} />
      ),
      href: "/chemistry/diffusion", // ЗАСАВ: /chemistry/ нэмсэн
      color: "hover:border-[#312C85]/40 hover:shadow-[#312C85]/10",
      iconBg: "bg-[#312C85]/5",
    },
    {
      title: "Молекулын туйлшрал",
      desc: "Гадаад цахилгаан орны нөлөөгөөр молекул доторх цэнэгийн төвүүд шилжих үзэгдэл. Диполь момент ба диэлектрик шинж чанар.",
      icon: <Zap className="w-9 h-9 text-[#312C85]" strokeWidth={2.5} />,
      href: "/chemistry/molecular", // ЗАСАВ: /chemistry/ нэмсэн
      color: "hover:border-[#312C85]/40 hover:shadow-[#312C85]/10",
      iconBg: "bg-[#312C85]/5",
    },
    {
      title: "Квант хэмжилт",
      desc: "Бичил бөөмсийн төлөв байдлыг тодорхойлох процесс. Гейзенбергийн тодорхойгүйн зарчим ба долгионы функцийн нуралт.",
      icon: <Target className="w-9 h-9 text-[#312C85]" strokeWidth={2.5} />,
      href: "/chemistry/measurement", // ЗАСАВ: /chemistry/ нэмсэн
      color: "hover:border-[#312C85]/40 hover:shadow-[#312C85]/10",
      iconBg: "bg-[#312C85]/5",
    },
    {
      title: "Нягтрал",
      desc: "Нэгж эзэлхүүнд ногдох бодисын масс. Хатуу, шингэн, хийн төлөв байдлын молекул бүтцийн нягт ба Архимедийн хүч.",
      icon: <Layers className="w-9 h-9 text-[#312C85]" strokeWidth={2.5} />,
      href: "/chemistry/density", // ЗАСАВ: /chemistry/ нэмсэн
      color: "hover:border-[#312C85]/40 hover:shadow-[#312C85]/10",
      iconBg: "bg-[#312C85]/5",
    },
    {
      title: "Лазер",
      desc: "Албадмал цацрагаар гэрлийг хүчтэй болгох төхөөрөмж. Когерент чанар, монохромат гэрэл ба фотоны бөөгнөрөл.",
      icon: <ZapOff className="w-9 h-9 text-[#312C85]" strokeWidth={2.5} />,
      href: "/chemistry/laser", // ЗАСАВ: /chemistry/ нэмсэн
      color: "hover:border-[#312C85]/40 hover:shadow-[#312C85]/10",
      iconBg: "bg-[#312C85]/5",
    },
  ],
};

export default function ChemistryPage() {
  const { user } = useAuth();
  const isTeacher = user?.role === "teacher";
  const { topics } = pageConfig;

  return (
    <main className="min-h-screen bg-[#F8FAFC]">
      <NavAll />
      <section className="max-w-7xl mx-auto px-4 md:px-8 pt-32 pb-20 relative z-20">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div className="flex items-center gap-4">
            <Link
              href="/dashboard"
              className="group p-3 rounded-2xl bg-white border border-slate-100 shadow-sm hover:bg-[#312C85]/5 transition-all duration-300 text-[#312C85]"
            >
              <ChevronLeft className="w-6 h-6 group-hover:-translate-x-1 transition-transform" />
            </Link>
            <div>
              <h2 className="text-sm font-black text-[#312C85] uppercase tracking-[0.3em] mb-1">
                {isTeacher ? "Багшийн хяналт" : "Сургалтын хөтөлбөр"}
              </h2>
              <h1 className="text-3xl font-black text-slate-900 tracking-tight">
                Хими
              </h1>
              <div className="h-1 w-12 bg-[#312C85] rounded-full" />
            </div>
          </div>

          {!isTeacher && (
            <div className="flex justify-start md:justify-end">
              <NavbarH />
            </div>
          )}

          {isTeacher && (
            <Link
              href="/students-progress"
              className="bg-[#312C85] text-white px-6 py-3.5 rounded-2xl font-bold text-sm shadow-lg shadow-[#312C85]/20 hover:bg-[#312C85]/90 transition-all flex items-center gap-2"
            >
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
              Сурагчдын зэрэглэл харах
            </Link>
          )}
        </div>

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
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none -z-10 opacity-30">
        <div className="absolute top-[10%] left-[-5%] w-[35%] h-[35%] bg-[#312C85]/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[10%] right-[-5%] w-[30%] h-[30%] bg-[#312C85]/10 rounded-full blur-[100px]" />
      </div>
    </main>
  );
}
