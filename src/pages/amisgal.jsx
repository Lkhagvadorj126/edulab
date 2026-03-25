"use client";

import React from "react";
import {
  BookOpen,
  ArrowLeft,
  ListChecks,
  Wind,
  Lungs, // Хэрэв lungs байхгүй бол Wind ашиглана
  Activity,
} from "lucide-react";
import Link from "next/link";
import NavAll from "@/components/NavAll";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#F8FAFC] relative overflow-hidden pb-20">
      <NavAll />

      {/* Гол агуулга */}
      <section className="max-w-5xl mx-auto px-4 md:px-8 pt-32 relative z-20">
        {/* Header & Back Button */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
          <div className="flex items-center gap-5">
            <Link
              href="/biology"
              className="group p-4 rounded-2xl bg-white border border-slate-100 shadow-sm hover:bg-[#312C85]/5 transition-all duration-300 text-[#312C85] active:scale-95"
            >
              <ArrowLeft className="w-6 h-6 group-hover:-translate-x-1 transition-transform" />
            </Link>
            <div>
              <h2 className="text-xs font-black text-[#312C85] uppercase tracking-[0.3em] mb-1">
                Хичээлийн агуулга
              </h2>
              <h1 className="text-3xl font-black text-slate-900 tracking-tight">
                Амьсгал ба зөөвөрлөлт
              </h1>
            </div>
          </div>
        </div>

        {/* Үндсэн Карт */}
        <div className="bg-white rounded-[40px] shadow-sm border-2 border-slate-100 overflow-hidden">
          {/* Header Icon Section */}
          <div className="bg-slate-50/50 border-b border-slate-50 p-8 flex items-center gap-4">
            <div className="p-3 bg-[#312C85] rounded-2xl text-white shadow-lg shadow-[#312C85]/20">
              <Wind size={24} />
            </div>
            <div>
              <h3 className="font-black text-slate-800 uppercase tracking-widest text-sm">
                Онолын хэсэг
              </h3>
              <p className="text-xs text-slate-400 font-bold uppercase mt-1">
                Хийн солилцоо ба Цусны эргэлт
              </p>
            </div>
          </div>

          <div className="p-8 md:p-12">
            <div className="prose prose-slate max-w-none">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-2 h-8 bg-[#312C85] rounded-full" />
                <h2 className="text-2xl font-black text-slate-800 m-0">
                  Амьсгалын эрхтэн тогтолцоо
                </h2>
              </div>

              <p className="text-lg text-slate-600 leading-relaxed mb-10 font-medium">
                Амьсгалын эрхтэн тогтолцоо нь бие махбодыг хүчилтөрөгчөөр
                хангаж, нүүрсхүчлийн хийг гадагшлуулах үндсэн үүрэгтэй. Энэхүү
                процесс нь амьдралыг тэтгэгч хамгийн чухал үйл ажиллагаа юм.
              </p>

              {/* Үндсэн 5 алхам - Картууд */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
                {[
                  {
                    title: "Эрхтэн тогтолцоо",
                    desc: "Хамар, залгиур, мөгөөрсөн хоолой, уушги.",
                  },
                  {
                    title: "2 үе шат",
                    desc: "Гадаад амьсгал ба эсийн түвшний дотоод амьсгал.",
                  },
                  {
                    title: "Хийн солилцоо",
                    desc: "Цус ба уушгины цулцан хоорондын хийн шилжилт.",
                  },
                  {
                    title: "Зөөвөрлөлт",
                    desc: "Гемоглобин хүчилтөрөгчийг эд эсэд хүргэнэ.",
                  },
                  {
                    title: "Зохицуулга",
                    desc: "Тархины амьсгалын төвөөр хяналт тавигдана.",
                  },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="bg-slate-50 border border-slate-100 p-5 rounded-3xl transition-all hover:border-[#312C85]/30 group"
                  >
                    <span className="text-[10px] font-black text-[#312C85] bg-[#312C85]/10 px-2 py-1 rounded-lg uppercase">
                      0{i + 1}
                    </span>
                    <h4 className="font-black text-slate-800 mt-3 mb-1">
                      {item.title}
                    </h4>
                    <p className="text-sm text-slate-500 font-medium">
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>

              {/* Гол ойлголтууд - Highlight Box */}
              <div className="bg-[#312C85]/5 rounded-[35px] p-8 md:p-10 border border-[#312C85]/10">
                <div className="flex items-center gap-3 mb-8">
                  <ListChecks className="text-[#312C85]" />
                  <h3 className="text-xl font-black text-[#312C85] m-0">
                    Мэдэх ёстой ойлголтууд
                  </h3>
                </div>

                <ul className="space-y-6 m-0 p-0 list-none">
                  {[
                    {
                      title: "Амьсгалын эрхтэн",
                      desc: "Агаарыг шүүх, чийгшүүлэх, уушгинд хүргэх үүрэг бүхий иж бүрдэл эрхтнүүд.",
                    },
                    {
                      title: "Гемоглобин",
                      desc: "Цусны улаан эсэд агуулагдах хүчилтөрөгчийг холбон зөөвөрлөгч уураг.",
                    },
                    {
                      title: "Амьсгалын зохицуулга",
                      desc: "Цусан дахь CO2-ийн хэмжээнээс хамаарч тархинаас өгөх автомат удирдлага.",
                    },
                  ].map((point, idx) => (
                    <li key={idx} className="flex gap-5 items-start">
                      <div className="mt-1.5 w-2 h-2 rounded-full bg-[#312C85] shrink-0 shadow-[0_0_10px_rgba(49,44,133,0.3)]" />
                      <div>
                        <span className="font-black text-slate-800 block mb-1 text-lg">
                          {point.title}
                        </span>
                        <span className="text-slate-600 font-medium leading-relaxed">
                          {point.desc}
                        </span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Буцах товч */}
            <div className="mt-12">
              <Link
                href="/biology"
                className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-slate-100 text-slate-600 font-bold hover:bg-[#312C85] hover:text-white transition-all duration-300 group shadow-sm"
              >
                <ArrowLeft
                  size={18}
                  className="group-hover:-translate-x-1 transition-transform"
                />
                Хичээлүүд рүү буцах
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Чимэглэл */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none -z-10 opacity-30">
        <div className="absolute top-[-10%] right-[-5%] w-[40%] h-[40%] bg-[#312C85]/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[35%] h-[35%] bg-[#312C85]/10 rounded-full blur-[100px]" />
      </div>
    </main>
  );
}
