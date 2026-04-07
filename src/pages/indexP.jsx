"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  MoveRight,
  Wind,
  Thermometer,
  ArrowRightCircle,
  ChevronLeft,
  Plus,
  X,
  Loader2,
  Pencil,
  Trash2,
  Zap,
  ThermometerSnowflake,
} from "lucide-react";
import NavAll from "../components/NavAll";
import { useAuth } from "@/context/AuthContext";
import Navbar from "@/components/Navbar";

// 1. Үндсэн 3 тогтмол хичээл (Статик)
const mainTopics = [
  {
    _id: "mechanics-001",
    title: "Уурших ба хайлах",
    desc: "Бодисын төлөв шилжих үзэгдэл: талст бие хайлах, шингэн уурших процесс ба энерги шингээлт.",
    icon: <ThermometerSnowflake />, // Эсвэл <FlameKindle />
    href: "/physics/motion",
    iconBg: "bg-[#312C85]/5",
    isStatic: true,
  },
  {
    _id: "sound-001",
    title: "Дуу ба долгион",
    desc: "Орчинд тархах механик долгион. Давтамж, долгионы урт болон цуурай.",
    icon: <Wind />,
    href: "/physics/sound",
    iconBg: "bg-[#312C85]/5",
    isStatic: true,
  },
  {
    _id: "heat-001",
    title: "Орбитын хөдөлгөөн",
    desc: "Гариг эрхсийн хөдөлгөөний Кеплерийн хуулиуд, хиймэл дагуул ба сансрын биетүүдийн тойрог зам дахь хөдөлгөөний зүй тогтол.",
    icon: <Thermometer />,
    href: "/physics/heat",
    iconBg: "bg-[#312C85]/5",
    isStatic: true,
  },
];

export default function PhysicsPage() {
  const { user } = useAuth();
  const isTeacher = user?.role === "teacher";

  // State-үүд
  const [dynamicTopics, setDynamicTopics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingId, setEditingId] = useState(null);

  // Form State
  const [formData, setFormData] = useState({
    title: "",
    desc: "",
  });

  // Мэдээллийн сангаас сэдвүүд татах
  const fetchTopics = async () => {
    try {
      const res = await fetch(
        `/api/physics-topics?category=physics&t=${Date.now()}`,
      );
      if (res.ok) {
        const data = await res.json();
        setDynamicTopics(data);
      }
    } catch (error) {
      console.error("Дата татахад алдаа гарлаа:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTopics();
  }, []);

  // Сэдэв хадгалах (Нэмэх болон Засах)
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title || !formData.desc)
      return alert("Бүх талбарыг бөглөнө үү!");

    setIsSubmitting(true);
    try {
      const url = editingId
        ? `/api/physics-topics?id=${editingId}`
        : "/api/physics-topics";

      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          category: "physics",
        }),
      });

      if (res.ok) {
        await fetchTopics();
        closeModal();
      } else {
        alert("Хадгалахад алдаа гарлаа.");
      }
    } catch (error) {
      alert("Сервертэй холбогдоход алдаа гарлаа.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Сэдэв устгах
  const handleDelete = async (id) => {
    if (!confirm("Энэ сэдвийг устгахдаа итгэлтэй байна уу?")) return;
    try {
      const res = await fetch(`/api/physics-topics?id=${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        fetchTopics();
      }
    } catch (error) {
      console.error("Delete error:", error);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingId(null);
    setFormData({ title: "", desc: "" });
  };

  // ЭРЭМБЭ: Динамик (Багшийн нэмсэн) эхэнд, Статик ард нь
  const allTopics = [...dynamicTopics, ...mainTopics];

  return (
    <main className="min-h-screen bg-[#F8FAFC] relative overflow-x-hidden">
      <NavAll />

      <section className="max-w-7xl mx-auto px-4 sm:px-6 pt-24 md:pt-32 pb-16 relative z-20">
        {/* Header Section - Responsive Засагдсан */}
        <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-6 mb-12">
          <div className="flex items-center gap-4 text-[#312C85]">
            <Link
              href="/dashboard"
              className="p-3 rounded-xl md:rounded-2xl bg-white border border-slate-100 shadow-sm hover:bg-[#312C85]/5 transition-all active:scale-95"
            >
              <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
            </Link>
            <div className="text-left">
              <h2 className="text-[10px] md:text-xs font-black uppercase tracking-[0.2em] opacity-70">
                {isTeacher ? "Багшийн хяналт" : "Физикийн Хөтөлбөр"}
              </h2>
              <h1 className="text-2xl md:text-4xl font-black text-slate-900 tracking-tight">
                Физик
              </h1>
              <div className="h-1 w-10 md:w-12 bg-[#312C85] rounded-full mt-1" />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-end sm:items-center gap-3 relative z-50 self-end xl:self-auto w-full xl:w-auto">
            <Navbar />
            {isTeacher && (
              <button
                onClick={() => setIsModalOpen(true)}
                className="bg-[#312C85] text-white px-5 py-3.5 md:px-6 md:py-4 rounded-2xl font-black flex items-center justify-center gap-2 shadow-lg hover:bg-[#252166] active:scale-95 transition-all text-xs md:text-sm whitespace-nowrap"
              >
                <Plus size={18} /> Сэдэв нэмэх
              </button>
            )}
          </div>
        </div>

        {/* Topics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {loading && dynamicTopics.length === 0 ? (
            <div className="col-span-full flex flex-col items-center justify-center py-20">
              <Loader2 className="animate-spin text-[#312C85]" size={48} />
            </div>
          ) : (
            allTopics.map((topic, index) => (
              <div key={topic._id || index} className="relative group h-full">
                <div
                  className={`block h-full bg-white p-8 md:p-10 rounded-[35px] md:rounded-[40px] shadow-sm border-2 transition-all duration-500 hover:-translate-y-2 hover:shadow-xl text-left ${
                    topic.isStatic
                      ? "border-slate-100"
                      : "border-[#312C85]/20 bg-gradient-to-br from-white to-indigo-50/10"
                  } hover:border-[#312C85]/40`}
                >
                  <Link
                    href={topic.href || `/lesson/${topic._id}`}
                    className="block h-full"
                  >
                    {!topic.isStatic && (
                      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#312C85] text-white text-[9px] font-black uppercase tracking-wider mb-5">
                        <Zap size={10} fill="currentColor" />
                        Багшийн нэмсэн
                      </div>
                    )}

                    <div
                      className={`mb-6 p-5 ${topic.iconBg || "bg-[#312C85]/5"} rounded-3xl w-fit text-[#312C85] group-hover:rotate-[12deg] transition-transform duration-500`}
                    >
                      {topic.icon ? (
                        React.cloneElement(topic.icon, {
                          size: 28,
                          strokeWidth: 2.5,
                        })
                      ) : (
                        <Zap size={28} strokeWidth={2.5} />
                      )}
                    </div>

                    <h2 className="text-xl md:text-2xl font-black text-slate-900 mb-3 group-hover:text-[#312C85] transition-colors">
                      {topic.title}
                    </h2>
                    <p className="text-slate-500 text-sm mb-6 line-clamp-2 leading-relaxed font-medium">
                      {topic.desc}
                    </p>

                    <div className="flex items-center text-sm font-bold text-[#312C85] opacity-0 group-hover:opacity-100 translate-x-[-10px] group-hover:translate-x-0 transition-all">
                      {isTeacher && !topic.isStatic
                        ? "Агуулга засах"
                        : "Хичээл үзэх"}
                      <ArrowRightCircle className="ml-2 w-5 h-5" />
                    </div>
                  </Link>

                  {/* Багшийн үйлдэл - Зөвхөн динамик сэдвүүд дээр */}
                  {isTeacher && !topic.isStatic && (
                    <div className="absolute bottom-8 right-8 flex gap-2 z-30">
                      <button
                        onClick={() => {
                          setEditingId(topic._id);
                          setFormData({ title: topic.title, desc: topic.desc });
                          setIsModalOpen(true);
                        }}
                        className="p-3 bg-white text-[#312C85] rounded-xl border shadow-sm hover:bg-[#312C85] hover:text-white transition-all active:scale-90"
                      >
                        <Pencil size={16} />
                      </button>
                      <button
                        onClick={() => handleDelete(topic._id)}
                        className="p-3 bg-white text-red-500 rounded-xl border shadow-sm hover:bg-red-500 hover:text-white transition-all active:scale-90"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </section>

      {/* Modal - Сэдэв нэмэх / Засах */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-[#312C85]/40 backdrop-blur-md flex items-center justify-center z-[100] p-4">
          <div className="bg-white rounded-[40px] p-8 md:p-10 w-full max-w-lg shadow-2xl relative animate-in zoom-in-95 duration-200 border border-white/20">
            <button
              onClick={closeModal}
              className="absolute top-8 right-8 text-slate-400 hover:text-red-500 transition-colors"
            >
              <X size={24} />
            </button>

            <h2 className="text-2xl font-black text-[#312C85] mb-8 uppercase tracking-tighter text-left">
              {editingId ? "Сэдэв засах" : "Шинэ сэдэв нэмэх"}
            </h2>

            <form className="space-y-5 text-left" onSubmit={handleSubmit}>
              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 ml-2">
                  Сэдвийн гарчиг
                </label>
                <input
                  className="w-full p-5 rounded-2xl border-2 border-slate-50 bg-slate-50 outline-none focus:border-[#312C85] font-bold transition-all text-slate-900"
                  placeholder="Жишээ: Цахилгаан хэлхээ..."
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  required
                />
              </div>

              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 ml-2">
                  Богино тайлбар
                </label>
                <textarea
                  className="w-full p-5 rounded-2xl border-2 border-slate-50 bg-slate-50 outline-none h-32 focus:border-[#312C85] resize-none font-medium transition-all text-slate-900"
                  placeholder="Сэдвийн талаарх товч мэдээлэл..."
                  value={formData.desc}
                  onChange={(e) =>
                    setFormData({ ...formData, desc: e.target.value })
                  }
                  required
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#312C85] text-white py-5 rounded-2xl font-black uppercase shadow-xl hover:bg-[#252166] active:scale-95 transition-all disabled:opacity-50 flex justify-center items-center gap-2"
              >
                {isSubmitting ? (
                  <Loader2 className="animate-spin" size={20} />
                ) : editingId ? (
                  "Хадгалах"
                ) : (
                  "Сэдэв үүсгэх"
                )}
              </button>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}
