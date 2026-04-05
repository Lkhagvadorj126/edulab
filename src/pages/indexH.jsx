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
  Beaker,
} from "lucide-react";
import NavAll from "@/components/NavAll";
import { useAuth } from "@/context/AuthContext";
import Navbar from "@/components/Navbar";

const chemistryPlaceholders = [
  {
    _id: "c1",
    title: "Атомын бүтэц",
    desc: "Протон, нейтрон, электроны тухай үндсэн ойлголт.",
    isExample: true,
  },
  {
    _id: "c2",
    title: "Химийн холбоо",
    desc: "Ионы, ковалентын болон металлын холбооны шинж чанар.",
    isExample: true,
  },
  {
    _id: "c3",
    title: "Үелэх систем",
    desc: "Элементүүдийн шинж чанар үе болон бүлгийн дагуу өөрчлөгдөх нь.",
    isExample: true,
  },
];

export default function ChemistryPage() {
  const { user } = useAuth();
  const isTeacher = user?.role === "teacher";
  const [dynamicTopics, setDynamicTopics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({ title: "", desc: "" });

  const fetchTopics = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        `/api/physics-topics?category=chemistry&t=${Date.now()}`,
      );
      if (res.ok) {
        const data = await res.json();
        setDynamicTopics(data);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTopics();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = editingId
      ? `/api/physics-topics?id=${editingId}`
      : "/api/physics-topics";
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...formData, category: "chemistry" }),
    });
    if (res.ok) {
      closeModal();
      fetchTopics();
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Устгах уу?")) return;
    const res = await fetch(`/api/physics-topics?id=${id}`, {
      method: "DELETE",
    });
    if (res.ok) setDynamicTopics((prev) => prev.filter((t) => t._id !== id));
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingId(null);
    setFormData({ title: "", desc: "" });
  };

  const displayTopics =
    dynamicTopics.length > 0 ? dynamicTopics : chemistryPlaceholders;

  return (
    <main className="min-h-screen bg-[#F8FAFC]">
      <NavAll />
      <section className="max-w-7xl mx-auto px-4 sm:px-6 pt-20 md:pt-32 pb-16 relative z-20">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 mb-16">
          <div className="flex items-start sm:items-center gap-4 text-[#312C85]">
            <Link
              href="/dashboard"
              className="p-3 rounded-2xl bg-white border border-slate-100 shadow-sm hover:bg-[#312C85]/5 transition-all"
            >
              <ChevronLeft />
            </Link>
            <div>
              <h2 className="text-[10px] font-black uppercase tracking-[0.2em] opacity-70">
                Химийн Хөтөлбөр
              </h2>
              <h1 className="text-4xl font-black text-slate-900 tracking-tight">
                Хими
              </h1>
              <div className="h-1 w-12 bg-[#312C85] rounded-full mt-1" />
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Navbar />
            {isTeacher && (
              <button
                onClick={() => setIsModalOpen(true)}
                className="bg-[#312C85] text-white px-6 py-4 rounded-2xl font-black flex items-center gap-2 shadow-lg hover:scale-105 active:scale-95 transition-all"
              >
                <Plus size={18} /> Сэдэв нэмэх
              </button>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {loading ? (
            <div className="col-span-full flex justify-center py-20">
              <Loader2 className="animate-spin text-[#312C85]" size={40} />
            </div>
          ) : (
            displayTopics.map((topic) => (
              <div key={topic._id} className="relative group h-full text-left">
                <Link
                  href={topic.isExample ? "#" : `/lesson/${topic._id}`}
                  className={`block h-full bg-white p-10 rounded-[40px] border-2 transition-all duration-500 hover:-translate-y-2 hover:shadow-xl ${topic.isExample ? "border-dashed border-slate-200 opacity-80" : "border-slate-100 shadow-sm hover:border-[#312C85]/20"}`}
                >
                  <div className="mb-6 p-5 bg-[#312C85]/5 rounded-3xl w-fit group-hover:rotate-[12deg] transition-all duration-500 text-[#312C85]">
                    <Beaker size={28} strokeWidth={2.5} />
                  </div>
                  {topic.isExample && (
                    <span className="text-[10px] font-black bg-slate-100 text-slate-400 px-2 py-0.5 rounded-full mb-2 inline-block uppercase">
                      Жишээ
                    </span>
                  )}
                  <h2 className="text-2xl font-black text-slate-900 mb-3 group-hover:text-[#312C85] transition-colors">
                    {topic.title}
                  </h2>
                  <p className="text-slate-500 text-sm mb-6 line-clamp-2 leading-relaxed">
                    {topic.desc}
                  </p>
                  <div className="flex items-center text-sm font-bold text-[#312C85] translate-x-[-10px] group-hover:translate-x-0 transition-all opacity-0 group-hover:opacity-100">
                    Хичээл үзэх <ArrowRightCircle className="ml-2" size={18} />
                  </div>
                </Link>
                {isTeacher && !topic.isExample && (
                  <div className="absolute bottom-10 right-10 flex gap-2 z-30">
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

      {isModalOpen && (
        <div className="fixed inset-0 bg-[#312C85]/30 backdrop-blur-md flex items-center justify-center z-[100] p-6 text-left">
          <div className="bg-white rounded-[40px] p-10 w-full max-w-lg shadow-2xl relative animate-in zoom-in-95 duration-300">
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
              <button className="w-full bg-[#312C85] text-white py-5 rounded-2xl font-black uppercase shadow-xl hover:bg-[#252166] active:scale-95 transition-all mt-4">
                {editingId ? "Хадгалах" : "Үүсгэх"}
              </button>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}
