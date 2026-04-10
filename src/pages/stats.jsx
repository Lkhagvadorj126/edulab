"use client";
import React, { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/router";
import {
  BarChart3,
  Users,
  Trash2,
  Search,
  ChevronLeft,
  GraduationCap,
  TrendingUp,
  AlertCircle,
  Loader2,
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
      const res = await fetch(
        `/api/test-results?pageId=${pageId || ""}&classCode=${classCode || ""}&subject=${subject || ""}`,
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
      const url = `/api/test-results?userName=${encodeURIComponent(userName)}&pageId=${pageId || ""}&classCode=${classCode || ""}&subject=${subject || ""}`;
      const res = await fetch(url, { method: "DELETE" });
      if (res.ok) fetchData();
    } catch (err) {
      alert("Алдаа гарлаа.");
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
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#F8FAFC]">
        <Loader2 className="animate-spin text-[#312C85] mb-4" size={48} />
        <p className="text-[#312C85] font-black text-[10px] uppercase tracking-widest">
          Ачаалж байна...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-44 font-sans text-slate-900">
      {/* 1. Үндсэн NavAll-ыг дуудна */}
      <NavAll />

      {/* 2. Stats-ийн навигацийн хэсэг. 
        NavAll нь 73px-80px орчим өндөртэй тул 'mt-[80px]' нэмж өгсөн.
      */}
      <div className="mt-[80px] w-full bg-white/40 backdrop-blur-md border-b border-slate-100">
        <div className="max-w-6xl mx-auto px-6 py-5 flex items-center justify-between">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 px-5 py-3 bg-white text-[#312C85] rounded-2xl border border-slate-200 shadow-sm transition-all active:scale-95 group hover:border-[#312C85]/30"
          >
            <ChevronLeft
              size={20}
              strokeWidth={3}
              className="group-hover:-translate-x-1 transition-transform"
            />
            <span className="text-[11px] font-black uppercase tracking-widest">
              Буцах
            </span>
          </button>

          <div className="text-right">
            <h1 className="text-sm font-black text-[#312C85] uppercase tracking-tight flex items-center justify-end gap-2">
              <GraduationCap size={18} className="text-indigo-400" />
              {getSubjectName(router.query.subject)}
            </h1>
            <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">
              {router.query.classCode || "10B"} • Статистик
            </p>
          </div>
        </div>
      </div>

      {/* --- ҮНДСЭН КОНТЕНТ --- */}
      <div className="max-w-6xl mx-auto px-6 mt-8">
        {/* Картууд */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <div className="bg-gradient-to-br from-[#312C85] to-[#4F46E5] p-8 rounded-[3rem] shadow-xl text-white relative overflow-hidden group">
            <TrendingUp size={16} className="mb-4 text-indigo-200 opacity-60" />
            <h2 className="text-5xl font-black mb-1">{data.average}%</h2>
            <p className="text-[10px] font-black uppercase tracking-widest opacity-70">
              Амжилт
            </p>
            <BarChart3
              className="absolute -right-10 -bottom-10 opacity-10 group-hover:scale-110 transition-transform"
              size={180}
            />
          </div>

          <div className="bg-white p-8 rounded-[3rem] border border-white shadow-xl shadow-slate-200/50 flex flex-col justify-between">
            <div className="w-12 h-12 bg-indigo-50 rounded-2xl flex items-center justify-center text-[#312C85] mb-4">
              <Users size={24} />
            </div>
            <div>
              <h2 className="text-4xl font-black text-slate-800 tracking-tighter">
                {data.count}
              </h2>
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                Оролцогч
              </p>
            </div>
          </div>

          <div className="lg:col-span-2 bg-white p-4 rounded-[3rem] border border-white shadow-xl flex items-center px-10 focus-within:ring-4 focus-within:ring-indigo-50 transition-all">
            <Search size={22} className="text-slate-300" />
            <input
              placeholder="СУРАГЧИЙН НЭРЭЭР ХАЙХ..."
              className="bg-transparent border-none text-[11px] font-black w-full focus:ring-0 text-[#312C85] ml-5 uppercase outline-none"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Хүснэгт */}
        <div className="bg-white rounded-[3.5rem] shadow-sm border border-white overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="text-[10px] font-black text-slate-300 uppercase tracking-widest border-b border-slate-50">
                  <th className="px-12 py-8">Сурагч</th>
                  <th className="px-10 py-8 text-center">Гүйцэтгэл</th>
                  <th className="px-10 py-8 text-center">Оноо</th>
                  <th className="px-12 py-8 text-right">Үйлдэл</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {filteredResults.length > 0 ? (
                  filteredResults.map((res, i) => (
                    <tr key={i} className="hover:bg-slate-50 transition-colors">
                      <td className="px-12 py-6 font-black text-slate-700 uppercase text-[11px]">
                        {res.userName}
                      </td>
                      <td className="px-10 py-6 text-center">
                        <span
                          className={`px-4 py-1.5 rounded-2xl font-black text-[10px] ${res.percentage >= 80 ? "bg-emerald-50 text-emerald-600" : "bg-amber-50 text-amber-600"}`}
                        >
                          {res.percentage}%
                        </span>
                      </td>
                      <td className="px-10 py-6 text-center text-[11px] font-black">
                        <span className="text-[#312C85]">{res.score}</span> /{" "}
                        {res.totalQuestions}
                      </td>
                      <td className="px-12 py-6 text-right">
                        <button
                          onClick={() => handleDelete(res.userName)}
                          className="p-3 text-slate-200 hover:text-rose-500 transition-all"
                        >
                          <Trash2 size={20} />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="py-32 text-center opacity-20">
                      <AlertCircle size={48} className="mx-auto mb-2" />
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
      </div>
    </div>
  );
}
