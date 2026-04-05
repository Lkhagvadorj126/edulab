"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Apple,
  Wind,
  TreePine,
  Dna,
  Activity,
  LayoutGrid,
  ChevronLeft,
  Plus,
  X,
  Loader2,
  Pencil,
  Trash2,
  ArrowRightCircle,
} from "lucide-react";
import NavAll from "@/components/NavAll";
import { useAuth } from "@/context/AuthContext";
import NavbarBio from "./NavbarBio";

// Өгөгдөлгүй үед харагдах жишээ хичээлүүд
const biologyPlaceholders = [
  {
    _id: "b1",
    title: "Эсийн бүтэц",
    desc: "Амьд биеийн үндсэн нэгж эсийн онол ба эрхтэнцэрүүд.",
    icon: <Dna />,
    isExample: true,
  },
  {
    _id: "b2",
    title: "Фотосинтез",
    desc: "Ургамал нарны гэрлийг ашиглан шим тэжээл үйлдвэрлэх процесс.",
    icon: <TreePine />,
    isExample: true,
  },
  {
    _id: "b3",
    title: "Генетик",
    desc: "Удамшил ба хувьсал, ДНХ-ийн молекулын бүтэц.",
    icon: <Activity />,
    isExample: true,
  },
];

export default function BiologyPage() {
  const { user } = useAuth();
  const isTeacher = user?.role === "teacher";

  const [dynamicTopics, setDynamicTopics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({ title: "", desc: "" });

  // 1. Биологийн хичээлүүдийг татах
  const fetchTopics = async () => {
    setLoading(true);
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

  // 2. Сэдэв нэмэх болон засах
  const handleSubmit = async (e) => {
    e.preventDefault();
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
        closeModal();
        fetchTopics();
      }
    } catch (error) {
      alert("Алдаа гарлаа.");
    }
  };

  // 3. Сэдэв устгах
  const handleDelete = async (id) => {
    if (!confirm("Устгах уу?")) return;
    try {
      const res = await fetch(`/api/physics-topics?id=${id}`, {
        method: "DELETE",
      });
      if (res.ok) setDynamicTopics((prev) => prev.filter((t) => t._id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingId(null);
    setFormData({ title: "", desc: "" });
  };

  // Дата байгаа эсэхийг шалгаад жишээ датаг залгах
  const displayTopics =
    dynamicTopics.length > 0 ? dynamicTopics : biologyPlaceholders;

  return (
    <main className="min-h-screen bg-[#F8FAFC]">
      <NavAll />

      <section className="max-w-7xl mx-auto px-4 sm:px-6 pt-20 md:pt-32 pb-16 relative z-20">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 mb-10 md:mb-16 text-left">
          <div className="flex items-start sm:items-center gap-4 text-[#312C85]">
            <Link
              href="/dashboard"
              className="p-3 rounded-xl md:rounded-2xl bg-white border border-slate-100 shadow-sm hover:bg-[#312C85]/5 transition-all"
            >
              <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
            </Link>
            <div>
              <h2 className="text-[10px] md:text-xs font-black uppercase tracking-[0.2em] mb-1 opacity-70">
                {isTeacher ? "Багшийн хяналт" : "Биологийн Хөтөлбөр"}
              </h2>
              <h1 className="text-2xl md:text-4xl font-black text-slate-900 tracking-tight">
                Биологи
              </h1>
              <div className="h-1 w-10 md:w-12 bg-[#312C85] rounded-full mt-1" />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <NavbarBio />
            {isTeacher && (
              <button
                onClick={() => setIsModalOpen(true)}
                className="bg-[#312C85] text-white px-6 py-4 rounded-2xl font-black flex items-center gap-2 shadow-lg hover:scale-105 active:scale-95 transition-all text-sm"
              >
                <Plus size={18} /> Сэдэв нэмэх
              </button>
            )}
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-8">
          {loading ? (
            <div className="col-span-full flex justify-center py-20">
              <Loader2 className="animate-spin text-[#312C85]" size={40} />
            </div>
          ) : (
            displayTopics.map((topic) => (
              <div key={topic._id} className="relative group h-full text-left">
                <Link
                  href={topic.isExample ? "#" : `/lesson/${topic._id}`}
                  className={`block h-full bg-white p-6 md:p-10 rounded-[30px] md:rounded-[40px] border-2 transition-all duration-500 hover:-translate-y-1.5 md:hover:-translate-y-2 hover:shadow-xl ${
                    topic.isExample
                      ? "border-dashed border-slate-200 opacity-80"
                      : "border-slate-100 shadow-sm hover:border-[#312C85]/20"
                  }`}
                >
                  <div className="mb-5 md:mb-6 p-4 md:p-5 bg-[#312C85]/5 rounded-[20px] md:rounded-[24px] w-fit group-hover:rotate-[12deg] transition-all duration-500 text-[#312C85]">
                    {topic.icon ? (
                      React.cloneElement(topic.icon, {
                        size: 28,
                        strokeWidth: 2.5,
                      })
                    ) : (
                      <Dna size={28} strokeWidth={2.5} />
                    )}
                  </div>

                  {topic.isExample && (
                    <span className="text-[10px] font-black bg-slate-100 text-slate-400 px-2 py-0.5 rounded-full mb-2 inline-block uppercase">
                      Жишээ
                    </span>
                  )}

                  <h2 className="text-xl md:text-2xl font-black text-slate-900 mb-2 md:mb-3 group-hover:text-[#312C85]">
                    {topic.title}
                  </h2>
                  <p className="text-slate-500 text-xs md:text-sm leading-relaxed mb-4 md:mb-6 font-medium line-clamp-2">
                    {topic.desc}
                  </p>

                  <div className="flex items-center text-[10px] md:text-sm font-bold text-[#312C85] translate-x-[-10px] group-hover:translate-x-0 opacity-0 group-hover:opacity-100 transition-all">
                    {topic.isExample ? "Удахгүй нэмэгдэнэ" : "Хичээл үзэх"}
                    <ArrowRightCircle className="ml-2 w-4 h-4 md:w-5 md:h-5" />
                  </div>
                </Link>

                {/* Teacher Actions */}
                {isTeacher && !topic.isExample && (
                  <div className="absolute bottom-8 right-8 flex gap-2 z-30">
                    <button
                      onClick={() => {
                        setEditingId(topic._id);
                        setFormData({ title: topic.title, desc: topic.desc });
                        setIsModalOpen(true);
                      }}
                      className="p-2.5 bg-slate-50 text-[#312C85] rounded-xl hover:bg-[#312C85] hover:text-white transition-all border shadow-sm"
                    >
                      <Pencil size={16} />
                    </button>
                    <button
                      onClick={() => handleDelete(topic._id)}
                      className="p-2.5 bg-red-50 text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-all border shadow-sm"
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

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-[#312C85]/30 backdrop-blur-md flex items-center justify-center z-[100] p-6 text-left">
          <div className="bg-white rounded-[40px] p-8 md:p-10 w-full max-w-lg shadow-2xl relative animate-in zoom-in-95 duration-300 text-left">
            <button
              onClick={closeModal}
              className="absolute top-8 right-8 text-slate-400 hover:text-red-500 transition-colors"
            >
              <X size={24} />
            </button>
            <h2 className="text-2xl font-black text-[#312C85] mb-8 uppercase tracking-tighter">
              {editingId ? "Сэдэв засах" : "Шинэ сэдэв нэмэх"}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                required
                className="w-full p-5 rounded-2xl border-2 border-slate-50 bg-slate-50 outline-none focus:border-[#312C85] font-bold"
                placeholder="Сэдвийн нэр..."
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
              />
              <textarea
                required
                className="w-full p-5 rounded-2xl border-2 border-slate-50 bg-slate-50 outline-none h-32 focus:border-[#312C85] resize-none font-medium"
                placeholder="Тайлбар..."
                value={formData.desc}
                onChange={(e) =>
                  setFormData({ ...formData, desc: e.target.value })
                }
              />
              <button className="w-full bg-[#312C85] text-white py-5 rounded-2xl font-black uppercase shadow-xl hover:bg-[#252166] active:scale-95 transition-all">
                {editingId ? "Хадгалах" : "Үүсгэх"}
              </button>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}
