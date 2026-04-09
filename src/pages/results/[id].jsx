import React, { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/router";
import { Users, ArrowLeft, Trash2 } from "lucide-react";

export default function ClassStats() {
  const router = useRouter();
  const { id: pageId, classCode } = router.query;
  const [data, setData] = useState(null);

  // 1. Өгөгдөл татах функц
  const fetchData = useCallback(async () => {
    if (router.isReady && pageId && classCode) {
      try {
        const res = await fetch(
          `/stats?pageId=${pageId}&classCode=${classCode}&subject=physics`,
        );
        const val = await res.json();
        setData(val);
      } catch (err) {
        console.error("Fetch error:", err);
      }
    }
  }, [router.isReady, pageId, classCode]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // 2. Устгах функц (Шууд дуудагдана)
  const handleDelete = async (userName) => {
    if (!window.confirm(`${userName}-ийн дүнг устгах уу?`)) return;

    try {
      const res = await fetch(
        `/api/test-results?userName=${userName}&pageId=${pageId}&classCode=${classCode}`,
        { method: "DELETE" },
      );

      if (res.ok) {
        fetchData(); // Жагсаалтыг шинэчлэх
      } else {
        alert("Устгаж чадсангүй.");
      }
    } catch (err) {
      alert("Сүлжээний алдаа гарлаа.");
    }
  };

  if (!data)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="font-bold text-slate-400 animate-pulse">УНШИЖ БАЙНА...</p>
      </div>
    );

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-8 pb-32">
      <div className="max-w-4xl mx-auto">
        <header className="mb-10 flex items-center gap-4">
          <button
            onClick={() => router.back()}
            className="p-2 bg-white rounded-lg shadow-sm border border-slate-100"
          >
            <ArrowLeft size={20} />
          </button>
          <div>
            <h1 className="text-3xl font-black text-slate-800 uppercase tracking-tighter">
              Ангийн статистик
            </h1>
            <p className="text-slate-400 font-bold uppercase text-[10px] tracking-widest">
              Хичээл: {pageId} | Анги: {classCode}
            </p>
          </div>
        </header>

        {/* Статистик картууд хэвээрээ */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100">
            <p className="text-slate-400 text-[10px] font-black uppercase mb-2 tracking-widest">
              Ангийн дундаж
            </p>
            <h2 className="text-6xl font-black text-indigo-600">
              {data.average}%
            </h2>
          </div>
          <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100 flex items-center gap-6">
            <div className="w-16 h-16 bg-emerald-50 text-emerald-500 rounded-2xl flex items-center justify-center">
              <Users size={32} />
            </div>
            <div>
              <p className="text-slate-400 text-[10px] font-black uppercase">
                Тест өгсөн
              </p>
              <h2 className="text-4xl font-black text-slate-800">
                {data.count}
              </h2>
            </div>
          </div>
        </div>

        {/* Хүснэгт - Устгах товчтой */}
        <div className="bg-white rounded-[2rem] shadow-xl border border-slate-100 overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-slate-50 border-b border-slate-100">
              <tr>
                <th className="p-6 text-[10px] font-black uppercase text-slate-400">
                  Сурагчийн нэр
                </th>
                <th className="p-6 text-[10px] font-black uppercase text-slate-400">
                  Гүйцэтгэл
                </th>
                <th className="p-6 text-[10px] font-black uppercase text-slate-400 text-right">
                  Үйлдэл
                </th>
              </tr>
            </thead>
            <tbody>
              {data.results.map((res, i) => (
                <tr
                  key={i}
                  className="border-t border-slate-50 hover:bg-slate-50 transition-colors"
                >
                  <td className="p-6 font-bold text-slate-700 uppercase">
                    {res.userName}
                  </td>
                  <td className="p-6 font-black text-indigo-500 text-xl">
                    {res.percentage}%
                  </td>
                  <button
                    onClick={() => handleDelete(res.userName)}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-rose-50 text-rose-600 hover:bg-rose-500 hover:text-white rounded-xl font-bold text-[10px] transition-all active:scale-95 group shadow-sm border border-rose-100"
                  >
                    <Trash2
                      size={14}
                      strokeWidth={2.5}
                      className="group-hover:animate-bounce"
                    />
                    УСТГАХ
                  </button>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
