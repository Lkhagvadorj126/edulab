"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  ChevronLeft,
  Plus,
  X,
  Loader2,
  Pencil,
  Trash2,
  ArrowRightCircle,
  Dna,
  TreePine,
  Zap,
  Leaf,
  LayoutGrid,
  Activity,
} from "lucide-react";
import NavAll from "@/components/NavAll";
import { useAuth } from "@/context/AuthContext";
import NavbarBio from "./NavbarBio";

// 1. Биологийн үндсэн тогтмол хичээлүүд (Статик)
const biologyPlaceholders = [
  {
    _id: "b1",
    title: "Бие махбодын зохицуулга",
    desc: "Дотоод орчны тогтмол байдал (гомеостаз) ба мэдрэл, шингэний зохицуулгын механизм.",
    icon: <Activity />, // Зохицуулга, тэнцвэрт байдлыг Activity эсвэл Shield икон илүү сайн илэрхийлнэ
    isStatic: true,
    href: "/biology/es", // Сэдэвтэйгээ нийцүүлэн замыг шинэчлэв
  },
  {
    _id: "b2",
    title: "Рекомбинант инсулин",
    desc: "Генетик инженерчлэлийн аргаар бактерийн эсэд хүний инсулин үйлдвэрлэх биотехнологийн процесс.",
    icon: <Dna />, // Инсулины сэдэвт ДНХ (Dna) эсвэл Тариур (Syringe) икон илүү тохиромжтой
    isStatic: true,
    href: "/biology/urgamal", // Өмнөх /urgamal замыг шинэ сэдэвтэй нь нийцүүлж өөрчлөв
  },
  {
    _id: "b3",
    title: "Ялгаруулах тогтолцоо",
    desc: "Хүний биеэс бодисын солилцооны эцсийн бүтээгдэхүүнийг гадагшлуулах эрхтнүүдийн бүтэц, үйл ажиллагаа болон бөөрний үүрэг.",
    icon: <LayoutGrid />,
    isStatic: true,
    href: "/biology/angilal",
  },
];

export default function BiologyPage() {
  const { user } = useAuth();
  const isTeacher = user?.role === "teacher";

  // State-үүд
  const [dynamicTopics, setDynamicTopics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({ title: "", desc: "" });

  // Мэдээлэл татах (Category: biology)
  const fetchTopics = async () => {
    try {
      const res = await fetch(
        `/api/physics-topics?category=biology&t=${Date.now()}`,
      );
      if (res.ok) {
        const data = await res.json();
        setDynamicTopics(data);
      }
    } catch (error) {
      console.error("Fetch error:", error);
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
    if (!formData.title || !formData.desc) return;

    setIsSubmitting(true);
    try {
      const url = editingId
        ? `/api/physics-topics?id=${editingId}`
        : "/api/physics-topics";
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, category: "biology" }),
      });

      if (res.ok) {
        await fetchTopics();
        closeModal();
      }
    } catch (error) {
      alert("Алдаа гарлаа.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Устгах үйлдэл
  const handleDelete = async (id) => {
    if (!confirm("Энэ сэдвийг устгахдаа итгэлтэй байна уу?")) return;
    try {
      const res = await fetch(`/api/physics-topics?id=${id}`, {
        method: "DELETE",
      });
      if (res.ok) fetchTopics();
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
  const displayTopics = [...dynamicTopics, ...biologyPlaceholders];

  return (
    <main className="min-h-screen bg-[#F8FAFC] relative overflow-x-hidden text-left">
      <NavAll />

      {/* Арын фонны чимэглэл */}
      <div className="absolute top-0 right-0 w-full md:w-1/2 h-full opacity-[0.03] pointer-events-none z-10">
        <Dna
          size={600}
          className="translate-x-1/4 -translate-y-1/4 text-[#312C85]"
        />
      </div>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 pt-24 md:pt-32 pb-16 relative z-20">
        {/* Header Section */}
        <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-8 mb-12">
          <div className="flex items-center gap-4 text-[#312C85]">
            <Link
              href="/dashboard"
              className="p-3 rounded-xl md:rounded-2xl bg-white border border-slate-100 shadow-sm hover:bg-[#312C85]/5 transition-all active:scale-95"
            >
              <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
            </Link>
            <div className="text-left">
              <h2 className="text-[10px] md:text-xs font-black uppercase tracking-[0.2em] opacity-70">
                {isTeacher ? "Багшийн хяналт" : "Биологийн Хөтөлбөр"}
              </h2>
              <h1 className="text-2xl md:text-4xl font-black text-slate-900 tracking-tight">
                Биологи
              </h1>
              <div className="h-1 w-10 md:w-12 bg-[#312C85] rounded-full mt-1" />
            </div>
          </div>

          {/* Баруун талын удирдлага (Responsive) */}
          <div className="flex flex-col sm:flex-row items-end sm:items-center gap-3 relative z-50 self-end xl:self-auto w-full xl:w-auto">
            <NavbarBio />
            {isTeacher && (
              <button
                onClick={() => setIsModalOpen(true)}
                className="bg-[#312C85] text-white px-5 py-3.5 md:px-6 md:py-4 rounded-2xl font-black flex items-center justify-center gap-2 shadow-lg hover:bg-[#252166] active:scale-95 transition-all text-xs md:text-sm whitespace-nowrap"
              >
                <Plus size={18} /> <span>Сэдэв нэмэх</span>
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
            displayTopics.map((topic, index) => (
              <div key={topic._id || index} className="relative group h-full">
                <Link
                  href={
                    topic.isStatic ? topic.href || "#" : `/lesson/${topic._id}`
                  }
                  className={`block h-full bg-white p-8 md:p-10 rounded-[35px] md:rounded-[40px] border-2 transition-all duration-500 hover:-translate-y-2 hover:shadow-xl text-left ${
                    topic.isStatic
                      ? "border-slate-100"
                      : "border-[#312C85]/20 bg-gradient-to-br from-white to-green-50/10 shadow-sm"
                  } hover:border-[#312C85]/40`}
                >
                  {/* Багшийн нэмсэн Badge */}
                  {!topic.isStatic && (
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#312C85] text-white text-[9px] font-black uppercase tracking-wider mb-5 shadow-sm">
                      <Zap size={10} fill="currentColor" />
                      Багшийн нэмсэн
                    </div>
                  )}

                  <div className="mb-6 p-5 bg-[#312C85]/5 rounded-3xl w-fit text-[#312C85] group-hover:rotate-[12deg] transition-transform duration-500">
                    {topic.icon ? (
                      React.cloneElement(topic.icon, {
                        size: 28,
                        strokeWidth: 2.5,
                      })
                    ) : (
                      <TreePine size={28} strokeWidth={2.5} />
                    )}
                  </div>

                  {topic.isStatic && (
                    <span className="text-[10px] font-black bg-slate-100 text-slate-500 px-3 py-1 rounded-full mb-3 inline-block uppercase tracking-wider">
                      Үндсэн хичээл
                    </span>
                  )}

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

                {/* Багшийн үйлдлүүд */}
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
            ))
          )}
        </div>
      </section>

      {/* Modal - Сэдэв нэмэх / Засах */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-[#312C85]/40 backdrop-blur-md flex items-center justify-center z-[100] p-4 text-left">
          <div className="bg-white rounded-[40px] p-8 md:p-10 w-full max-w-lg relative animate-in zoom-in-95 duration-200 border border-white/20 shadow-2xl">
            <button
              onClick={closeModal}
              className="absolute top-8 right-8 text-slate-400 hover:text-red-500 transition-colors"
            >
              <X size={24} />
            </button>
            <h2 className="text-2xl font-black text-[#312C85] mb-8 uppercase tracking-tighter">
              {editingId ? "Сэдэв засах" : "Шинэ сэдэв нэмэх"}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 ml-2">
                  Сэдвийн гарчиг
                </label>
                <input
                  required
                  className="w-full p-5 rounded-2xl bg-slate-50 border-2 border-transparent focus:border-[#312C85] outline-none font-bold transition-all text-slate-900"
                  placeholder="Гарчиг оруулах..."
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 ml-2">
                  Тайлбар
                </label>
                <textarea
                  required
                  className="w-full p-5 rounded-2xl bg-slate-50 border-2 border-transparent focus:border-[#312C85] outline-none h-32 resize-none font-medium transition-all text-slate-900"
                  placeholder="Товч тайлбар..."
                  value={formData.desc}
                  onChange={(e) =>
                    setFormData({ ...formData, desc: e.target.value })
                  }
                />
              </div>
              <button
                disabled={isSubmitting}
                className="w-full bg-[#312C85] text-white py-5 rounded-2xl font-black uppercase shadow-xl hover:bg-[#252166] active:scale-95 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <Loader2 className="animate-spin" size={20} />
                ) : editingId ? (
                  "Хадгалах"
                ) : (
                  "Үүсгэх"
                )}
              </button>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}
