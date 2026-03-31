"use client";

import { useRouter } from "next/router";
import { GEOGRAPHY_CONFIG } from "@/constants/lessonDataGeo"; // Газарзүйн дата
import LessonTemplateGeo from "@/components/LessonTemplateGeo"; // Газарзүйн компонент
import Head from "next/head";

export default function GeographyDynamicPage() {
  const router = useRouter();
  const { id } = router.query;

  // Router бэлэн болохыг хүлээх
  if (!router.isReady || !id)
    return <div className="min-h-screen bg-[#F8FAFC]" />;

  const config = GEOGRAPHY_CONFIG[id];

  // Хэрэв тухайн ID-тай хичээл байхгүй бол 404 хуудас харуулах
  if (!config) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC]">
        <div className="text-center">
          <div className="w-20 h-20 bg-blue-50 rounded-3xl flex items-center justify-center mx-auto mb-6">
            <h1 className="text-4xl font-black text-[#312C85]">404</h1>
          </div>
          <p className="text-slate-500 font-black uppercase tracking-widest text-xs mb-6">
            Газарзүйн хичээл олдсонгүй
          </p>
          <button
            onClick={() => router.push("/dashboard")}
            className="bg-[#312C85] text-white px-8 py-3 rounded-2xl font-bold text-xs uppercase tracking-widest shadow-lg shadow-blue-900/20 hover:scale-105 transition-all active:scale-95"
          >
            Нүүр хуудас руу буцах
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>{config.page.title} | Газарзүй</title>
        <meta name="description" content={config.page.subtitle} />
      </Head>

      <main className="min-h-screen bg-[#F8FAFC]">
        {/* Газарзүйн хичээлийн загвар компонент */}
        <LessonTemplateGeo pageId={id} config={config} />
      </main>
    </>
  );
}
