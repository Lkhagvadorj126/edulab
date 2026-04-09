"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/router";
import {
  BarChart3,
  Users,
  Trash2,
  Search,
  ArrowLeft,
  GraduationCap,
  TrendingUp,
  AlertCircle,
} from "lucide-react";
import NavAll from "@/components/NavAll";

export default function StatsPage() {
  const router = useRouter();
  const [data, setData] = useState({ average: 0, count: 0, results: [] });
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchData = useCallback(async () => {
    if (!router.isReady) return;

    const { pageId, classCode, subject } = router.query;

    try {
      setLoading(true);
      // URL-аас ирэх утгуудыг найдвартай болгох
      const pId = pageId || "";
      const cCode = classCode || "";
      const sub = subject || "";

      const res = await fetch(
        `/api/test-results?pageId=${pId}&classCode=${cCode}&subject=${sub}`,
      );
      const val = await res.json();

      if (val.success) {
        setData({
          average: val.average || 0,
          count: val.count || 0,
          results: val.results || [],
        });
      }
    } catch (err) {
      console.error("Fetch error:", err);
    } finally {
      // Хэрэв дата ирсэн бол эсвэл fetch дууссан бол loading-ийг заавал зогсооно
      setLoading(false);
    }
  }, [router.isReady, router.query]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleDelete = async (userName) => {
    if (!window.confirm(`${userName}-ийн дүнг устгах уу?`)) return;
    const { pageId, classCode, subject } = router.query;

    try {
      const res = await fetch(
        `/api/test-results?userName=${encodeURIComponent(userName)}&pageId=${pageId || ""}&classCode=${classCode || ""}&subject=${subject || ""}`,
        { method: "DELETE" },
      );
      if (res.ok) fetchData();
    } catch (err) {
      alert("Устгах үед алдаа гарлаа.");
    }
  };

  const getSubjectName = (sub) => {
    const names = {
      geography: "Газарзүй",
      biology: "Биологи",
      chemistry: "Хими",
      physics: "Физик",
    };
    return names[sub] || sub || "СТАТИСТИК";
  };

  const filteredResults =
    data.results?.filter((res) =>
      res.userName?.toLowerCase().includes(searchTerm.toLowerCase()),
    ) || [];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FDFEFF]">
        <div className="flex flex-col items-center gap-3">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-indigo-100 border-b-[#312C85]"></div>
          <p className="text-[10px] font-bold text-[#312C85] animate-pulse uppercase tracking-widest">
            Ачаалж байна...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-44 font-sans text-slate-900">
      <nav className="bg-white/70 backdrop-blur-xl border-b border-white/20 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-5 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => router.back()}
              className="p-2.5 bg-white border border-slate-100 text-slate-600 hover:text-[#312C85] rounded-xl shadow-sm transition-all active:scale-95"
            >
              <ArrowLeft size={20} strokeWidth={2.5} />
            </button>
            <div>
              <h1 className="text-sm font-black text-[#312C85] uppercase tracking-tight flex items-center gap-2">
                <GraduationCap size={18} />{" "}
                {getSubjectName(router.query.subject)}
              </h1>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                {router.query.classCode || "БҮХ"} АНГИ |{" "}
                {router.query.pageId || "БҮХ СЭДЭВ"}
              </p>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-6 mt-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          <div className="bg-gradient-to-br from-[#312C85] to-[#4F46E5] p-8 rounded-[2.5rem] shadow-xl text-white relative overflow-hidden group">
            <TrendingUp size={16} className="mb-4 text-indigo-200 opacity-60" />
            <h2 className="text-5xl font-black mb-1">{data.average}%</h2>
            <p className="text-[10px] font-bold uppercase tracking-widest opacity-70">
              Дундаж амжилт
            </p>
            <BarChart3
              className="absolute -right-6 -bottom-6 opacity-10 group-hover:scale-110 transition-transform duration-500"
              size={140}
            />
          </div>

          <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm flex flex-col justify-between">
            <div className="w-12 h-12 bg-indigo-50 rounded-2xl flex items-center justify-center text-[#312C85] mb-4">
              <Users size={24} />
            </div>
            <h2 className="text-4xl font-black text-slate-800">{data.count}</h2>
            <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
              Тест өгсөн
            </p>
          </div>

          <div className="lg:col-span-2 bg-white p-4 rounded-[2.5rem] border border-slate-100 shadow-sm flex items-center px-8 focus-within:ring-4 focus-within:ring-indigo-50 transition-all">
            <Search size={22} className="text-slate-300" />
            <input
              placeholder="СУРАГЧИЙН НЭР..."
              className="bg-transparent border-none text-xs font-bold w-full focus:ring-0 text-[#312C85] ml-4 uppercase outline-none"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="bg-white rounded-[3rem] shadow-xl border border-white overflow-hidden">
          <table className="w-full text-left">
            <thead>
              <tr className="text-[10px] font-black text-slate-300 uppercase tracking-widest border-b border-slate-50">
                <th className="px-10 py-8">Сурагч</th>
                <th className="px-10 py-8 text-center">Гүйцэтгэл</th>
                <th className="px-10 py-8 text-center">Оноо</th>
                <th className="px-10 py-8 text-right">Устгах</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filteredResults.length > 0 ? (
                filteredResults.map((res, i) => (
                  <tr key={i} className="hover:bg-indigo-50/20 transition-all">
                    <td className="px-10 py-6">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-slate-100 text-[#312C85] rounded-xl flex items-center justify-center font-black text-xs uppercase italic">
                          {res.userName?.substring(0, 1)}
                        </div>
                        <span className="font-bold text-slate-700 uppercase text-[11px]">
                          {res.userName}
                        </span>
                      </div>
                    </td>
                    <td className="px-10 py-6 text-center">
                      <span
                        className={`px-4 py-1.5 rounded-full font-black text-[10px] ${res.percentage >= 80 ? "bg-emerald-50 text-emerald-600" : "bg-amber-50 text-amber-600"}`}
                      >
                        {res.percentage}%
                      </span>
                    </td>
                    <td className="px-10 py-6 text-center text-[11px] font-black text-slate-400">
                      <span className="text-slate-800">{res.score}</span> /{" "}
                      {res.totalQuestions}
                    </td>
                    <td className="px-10 py-6 text-right">
                      <button
                        onClick={() => handleDelete(res.userName)}
                        className="p-3 text-slate-200 hover:text-rose-500 transition-all"
                      >
                        <Trash2 size={18} strokeWidth={2.5} />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="4"
                    className="py-32 text-center flex flex-col items-center opacity-20"
                  >
                    <AlertCircle size={48} className="mb-2" />
                    <p className="font-black text-[10px] uppercase">
                      Дата олдсонгүй
                    </p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      <NavAll />
    </div>
  );
}
