"use client";
import React, { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FaFlask, FaAtom, FaGlobeAmericas, FaDna } from "react-icons/fa";
import { useAuth } from "@/context/AuthContext";
import NavAll from "./NavAll";

const courses = [
  {
    title: "Физик",
    href: "/indexP",
    desc: "Механик, Квант физик",
    icon: FaAtom,
    iconColor: "text-slate-600",
    bgColor: "bg-slate-50",
    translateY: "lg:translate-y-0",
  },
  {
    title: "Хими",
    href: "/indexH",
    desc: "Атом, Химийн урвал",
    icon: FaFlask,
    iconColor: "text-slate-600",
    bgColor: "bg-slate-50",
    translateY: "lg:translate-y-12",
  },
  {
    title: "Биологи",
    href: "/biology",
    desc: "Генетик, Амьд ертөнц",
    icon: FaDna,
    iconColor: "text-[#312C85]",
    bgColor: "bg-[#312C85]/5",
    translateY: "lg:-translate-y-4",
  },
  {
    title: "Газарзүй",
    href: "/geography",
    desc: "Интерактив атлас",
    icon: FaGlobeAmericas,
    iconColor: "text-[#312C85]",
    bgColor: "bg-[#312C85]/5",
    translateY: "lg:translate-y-8",
  },
];

export default function Dashboard() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) router.push("/");
  }, [user, loading, router]);

  if (loading || !user)
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="w-12 h-12 border-4 border-[#312C85] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );

  const displayName = user.email ? user.email.split("@")[0] : "User";
  const roleLabel = user.role === "teacher" ? "Багш" : "Сурагч";

  return (
    <main className="min-h-screen bg-white font-sans antialiased">
      <NavAll />
      <section className="py-20 lg:py-32 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-10">
              <div className="inline-flex items-center gap-2 bg-[#312C85]/5 text-[#312C85] px-5 py-2 rounded-full text-[11px] font-black uppercase tracking-widest border border-[#312C85]/10 shadow-sm">
                ({roleLabel}: {displayName})
              </div>
              <h1 className="text-7xl lg:text-8xl font-black text-slate-900 leading-[0.9] tracking-tighter">
                EDU <span className="text-[#312C85]">LAB</span>
              </h1>
              <p className="text-slate-500 text-lg font-medium leading-relaxed max-w-lg">
                Шинжлэх ухааныг хамгийн сонирхолтой, интерактив хэлбэрээр
                судалж, мэдлэгээ тэлээрэй.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {courses.map((course, idx) => {
                const Icon = course.icon;
                return (
                  <Link
                    key={idx}
                    href={course.href}
                    className={`${course.translateY} group block bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 flex flex-col min-h-[220px]`}
                  >
                    <div
                      className={`w-14 h-14 ${course.bgColor} ${course.iconColor} rounded-2xl mb-8 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform`}
                    >
                      <Icon />
                    </div>
                    <h3 className="text-xl font-black text-slate-800 mb-2 group-hover:text-[#312C85]">
                      {course.title}
                    </h3>
                    <p className="text-slate-400 text-sm font-bold">
                      {course.desc}
                    </p>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
