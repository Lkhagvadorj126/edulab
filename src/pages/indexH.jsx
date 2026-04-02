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
  Table as TableIcon,
} from "lucide-react";
import NavAll from "../components/NavAll";
import { useAuth } from "@/context/AuthContext";
import NavbarH from "@/components/NavbarH";

const pageConfig = {
  topics: [
    {
      title: "Диффуз",
      desc: "Бодисын молекулууд өөрөө аяндаа холилдож, концентраци тэнцвэржих үзэгдэл.",
      icon: <MoveHorizontal />,
      href: "/chemistry/diffusion",
      iconBg: "bg-[#312C85]/5",
    },
    {
      title: "Молекулын туйлшрал",
      desc: "Гадаад цахилгаан орны нөлөөгөөр молекул доторх цэнэгийн төвүүд шилжих үзэгдэл.",
      icon: <Zap />,
      href: "/chemistry/molecular",
      iconBg: "bg-[#312C85]/5",
    },
    {
      title: "Квант хэмжилт",
      desc: "Бичил бөөмсийн төлөв байдлыг тодорхойлох процесс.",
      icon: <Target />,
      href: "/chemistry/measurement",
      iconBg: "bg-[#312C85]/5",
    },
    {
      title: "Нягтрал",
      desc: "Нэгж эзэлхүүнд ногдох бодисын масс.",
      icon: <Layers />,
      href: "/chemistry/density",
      iconBg: "bg-[#312C85]/5",
    },
    {
      title: "Лазер",
      desc: "Албадмал цацрагаар гэрлийг хүчтэй болгох төхөөрөмж.",
      icon: <ZapOff />,
      href: "/chemistry/laser",
      iconBg: "bg-[#312C85]/5",
    },
  ],
};

export default function ChemistryPage() {
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
              className="p-3 rounded-xl md:rounded-2xl bg-white border border-slate-100 shadow-sm hover:bg-[#312C85]/5 transition-all text-[#312C85]"
            >
              <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
            </Link>
            <div>
              <h2 className="text-[10px] md:text-xs font-black text-[#312C85] uppercase tracking-[0.2em] mb-1">
                {isTeacher ? "Багшийн хяналт" : "Химийн хөтөлбөр"}
              </h2>
              <h1 className="text-2xl md:text-4xl font-black text-slate-900 tracking-tight">
                Хими
              </h1>
              <div className="h-1 w-10 md:w-12 bg-[#312C85] rounded-full mt-1" />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            {!isTeacher ? (
              <div className="w-full sm:w-auto">
                <NavbarH />
              </div>
            ) : (
              <>
                <Link
                  href="/chemistryTable"
                  className="group relative flex items-center justify-center sm:justify-start gap-3 bg-white border-2 border-[#312C85]/10 hover:border-[#312C85] px-5 py-3 md:py-3.5 rounded-xl md:rounded-2xl transition-all shadow-sm"
                >
                  <div className="flex items-center justify-center w-7 h-7 rounded-lg bg-[#312C85]/5 group-hover:bg-[#312C85] transition-colors">
                    <TableIcon
                      className="w-3.5 h-3.5 text-[#312C85] group-hover:text-white"
                      strokeWidth={2.5}
                    />
                  </div>
                  <span className="font-black text-xs md:text-sm text-[#312C85] uppercase">
                    Үелэх систем
                  </span>
                </Link>
                <Link
                  href="/students-progress"
                  className="bg-[#312C85] text-white px-6 py-3.5 rounded-xl md:rounded-2xl font-bold text-xs md:text-sm shadow-lg hover:bg-[#312C85]/90 transition-all flex items-center justify-center gap-2"
                >
                  <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                  Сурагчдын зэрэглэл
                </Link>
              </>
            )}
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
              <h2 className="text-xl md:text-2xl font-black text-slate-900 mb-2 md:mb-3 group-hover:text-[#312C85]">
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
      {/* BACKGROUND DECOR */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none -z-10 opacity-30">
        <div className="absolute top-[10%] left-[-5%] w-[35%] h-[35%] bg-[#312C85]/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[10%] right-[-5%] w-[30%] h-[30%] bg-[#312C85]/10 rounded-full blur-[100px]" />
      </div>
    </main>
  );
}
