"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Slider from "./Slider";
import {
  Users,
  ChevronDown,
  ChevronUp,
  Play,
  X,
  Plus,
  Trash2,
  ExternalLink,
  Save,
  Loader2,
  Settings,
  Edit2,
  Check,
  Video,
  ArrowLeft,
} from "lucide-react";
import NavAll from "./NavAll";
import Nav from "./Nav";
import { useAuth } from "@/context/AuthContext";

const PAGE_ID = "motion";

const INITIAL_DATA = {
  page: {
    title: "Хөдөлгөөн",
    subtitle: "Физикийн цахим хичээл",
    videoUrl: "https://www.youtube.com/embed/2IMfnXlD1O4",
  },
  slider: [
    {
      image: "https://physic-dmts.vercel.app/hudulguun1.png",
      alt: "Projectile",
    },
    { image: "https://physic-dmts.vercel.app/hudulguun2.png", alt: "Force" },
  ],
  experiments: [
    {
      title: "Хөвөх чадвар",
      href: "https://phet.colorado.edu/sims/html/buoyancy/latest/buoyancy_all.html",
      img: "https://phet.colorado.edu/sims/html/buoyancy/latest/buoyancy-600.png",
    },
    {
      title: "Шидэлт",
      href: "https://phet.colorado.edu/sims/html/projectile-motion/latest/projectile-motion_all.html",
      img: "https://phet.colorado.edu/sims/html/projectile-motion/latest/projectile-motion-600.png",
    },
    {
      title: "Кеплерийн хууль",
      href: "https://phet.colorado.edu/sims/html/keplers-laws/latest/keplers-laws_all.html",
      img: "https://phet.colorado.edu/sims/html/keplers-laws/latest/keplers-laws-600.png",
    },
  ],
  theory: [
    {
      title: "Үндсэн ойлголтууд",
      content: [
        "Лавлах систем: Биеийн хөдөлгөөнийг ажиглах цэг ба координат.",
        "Зам (s): Скаляр хэмжигдэхүүн буюу туулах зай.",
        "Шилжилт (Δr): Вектор хэмжигдэхүүн буюу эх ба эцсийн цэгийн зай.",
      ],
    },
    {
      title: "Хурд ба Хурдатгал",
      content: [
        "Хурд: v = s/t (нэгж: м/с).",
        "Хурдатгал: Хурд өөрчлөгдөх хурдац a = (v − v₀)/t.",
        "Дундаж хурд: Нийт замыг нийт хугацаанд харьцуулсан харьцаа.",
      ],
    },
    {
      title: "Шулуун жигд хөдөлгөөн",
      content: [
        "Хурд тогтмол байх хөдөлгөөн (v = const).",
        "Замын томьёо: s = v · t.",
        "Хурдатгал тэгтэй тэнцүү байна (a = 0).",
      ],
    },
    {
      title: "Шулуун жигд хувьсах хөдөлгөөн",
      content: [
        "Хурдсах: v = v₀ + at.",
        "Зам: s = v₀t + at²/2.",
        "Хурдны квадрат: v² − v₀² = 2as.",
      ],
    },
    {
      title: "Чөлөөт уналт",
      content: [
        "Агаарын эсэргүүцэлгүй унах хөдөлгөөн.",
        "Чөлөөт уналтын хурдатгал: g ≈ 9.8 м/с².",
        "Өндөр: h = gt²/2 (тайван байдлаас унах үед).",
      ],
    },
    {
      title: "Эгц дээш шидэгдсэн бие",
      content: [
        "Дээш шидэх хурд: v = v₀ − gt.",
        "Максимум өндөр: Hmax = v₀²/(2g).",
        "Дээшлэх хугацаа буух хугацаатай тэнцүү байна.",
      ],
    },
    {
      title: "Тойргоор эргэх хөдөлгөөн",
      content: [
        "Төвд тэмүүлэх хурдатгал: a_c = v²/R.",
        "Үелэх хугацаа (T): Нэг бүтэн эргэх хугацаа.",
        "Давтамж (ν): Нэг секундэд эргэх тоо.",
      ],
    },
    {
      title: "Нумралт ба шидэлт",
      content: [
        "Хэвтээ чигт шидэх: x = v₀t, y = gt²/2.",
        "Алслалт: R = (v₀² sin 2θ)/g.",
        "Хамгийн хол шидэх өнцөг бол 45° юм.",
      ],
    },
    {
      title: "Динамикийн үндэс",
      content: [
        "Ньютоны 1-р хууль: Инерцийн хууль.",
        "Ньютоны 2-р хууль: F = m · a.",
        "Ньютоны 3-р хууль: Үйлчлэл ба эсрэг үйлчлэл.",
      ],
    },
  ],
};

export default function Motion() {
  const { user } = useAuth();
  const isTeacher = user?.role === "teacher";

  const [displayUrl, setDisplayUrl] = useState("");
  const [videoUrl, setVideoUrl] = useState(INITIAL_DATA.page.videoUrl);
  const [dbExperiments, setDbExperiments] = useState([]);
  const [dynamicLessons, setDynamicLessons] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showAll, setShowAll] = useState(false);

  const [canvaInput, setCanvaInput] = useState("");
  const [videoInput, setVideoInput] = useState("");
  const [showVideoEdit, setShowVideoEdit] = useState(false);
  const [showExpForm, setShowExpForm] = useState(false);
  const [editingExp, setEditingExp] = useState(null);
  const [newExp, setNewExp] = useState({ title: "", href: "", img: "" });
  const [newCard, setNewCard] = useState({ title: "", content: "" });
  const [editingCardId, setEditingCardId] = useState(null);
  const [tempEditData, setTempEditData] = useState({ title: "", content: "" });

  const fetchData = async () => {
    try {
      const [canvaRes, expRes, lessonRes, videoRes] = await Promise.all([
        fetch(`/api/presentation?pageId=${PAGE_ID}`),
        fetch(`/api/experiment?pageId=${PAGE_ID}`),
        fetch(`/api/lessons?pageId=${PAGE_ID}`),
        fetch(`/api/video?pageId=${PAGE_ID}`),
      ]);

      if (canvaRes.ok) {
        const data = await canvaRes.json();
        if (data.url) {
          setDisplayUrl(data.url);
          setCanvaInput(data.url);
        }
      }
      if (videoRes.ok) {
        const data = await videoRes.json();
        if (data.url) {
          setVideoUrl(data.url);
          setVideoInput(data.url);
        }
      }
      if (expRes.ok) setDbExperiments(await expRes.json());
      if (lessonRes.ok) setDynamicLessons(await lessonRes.json());
    } catch (err) {
      console.error("Дата татахад алдаа гарлаа:", err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const saveCanva = async () => {
    setLoading(true);
    let url = canvaInput.trim();
    if (url.includes("<iframe")) {
      const match = url.match(/src="([^"]+)"/);
      if (match && match[1]) url = match[1];
    }
    const res = await fetch(`/api/presentation?pageId=${PAGE_ID}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url, pageId: PAGE_ID }),
    });
    if (res.ok) {
      setDisplayUrl(url);
      alert("Презентейшн амжилттай хадгалагдлаа!");
    }
    setLoading(false);
  };

  const saveVideo = async () => {
    if (!videoInput.trim()) return;
    setLoading(true);
    const res = await fetch("/api/video", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url: videoInput.trim(), pageId: PAGE_ID }),
    });
    if (res.ok) {
      const data = await res.json();
      setVideoUrl(data.url);
      setShowVideoEdit(false);
      alert("Видео хичээл шинэчлэгдлээ!");
    }
    setLoading(false);
  };

  const handleAddOrUpdateExp = async () => {
    if (!newExp.title || !newExp.href) return alert("Бөглөнө үү!");
    setLoading(true);
    const method = editingExp ? "PUT" : "POST";
    const apiUrl = editingExp
      ? `/api/experiment?id=${editingExp}`
      : "/api/experiment";
    const res = await fetch(apiUrl, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...newExp, pageId: PAGE_ID }),
    });
    if (res.ok) {
      setNewExp({ title: "", href: "", img: "" });
      setEditingExp(null);
      setShowExpForm(false);
      fetchData();
    }
    setLoading(false);
  };

  const handleAddLesson = async (e) => {
    e.preventDefault();
    if (!newCard.title || !newCard.content) return alert("Бөглөнө үү!");
    setLoading(true);
    const res = await fetch("/api/lessons", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: newCard.title,
        content: newCard.content.split("\n").filter((c) => c.trim() !== ""),
        pageId: PAGE_ID,
      }),
    });
    if (res.ok) {
      setNewCard({ title: "", content: "" });
      fetchData();
    }
    setLoading(false);
  };

  const deleteItem = async (type, id) => {
    if (!confirm("Та устгахдаа итгэлтэй байна уу?")) return;
    const res = await fetch(`/api/${type}?id=${id}`, { method: "DELETE" });
    if (res.ok) fetchData();
  };

  const handleInlineSave = async (id) => {
    setLoading(true);
    const res = await fetch("/api/lessons", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id,
        title: tempEditData.title,
        content: tempEditData.content
          .split("\n")
          .filter((c) => c.trim() !== ""),
      }),
    });
    if (res.ok) {
      setEditingCardId(null);
      fetchData();
    }
    setLoading(false);
  };

  const finalExperiments = [
    ...dbExperiments,
    ...INITIAL_DATA.experiments,
  ].slice(0, 3);
  const allTheory = [
    ...dynamicLessons.slice().reverse(),
    ...INITIAL_DATA.theory,
  ];
  const visibleTheory = showAll ? allTheory : allTheory.slice(0, 4);

  return (
    <div className="min-h-screen px-4 md:px-8 pb-16 bg-[#F8FAFC]">
      <NavAll />
      <section className="pt-24 md:pt-28">
        <div className="flex bg-white py-4 px-5 rounded-2xl shadow-sm justify-between items-center border border-slate-200 mb-6">
          <div className="flex items-center">
            <Link
              href="/indexP"
              className="mr-4 p-2 hover:bg-slate-100 rounded-xl transition-all"
            >
              <ArrowLeft className="text-[#312C85]" size={24} />
            </Link>
            <div className="w-1.5 h-10 bg-[#312C85] rounded-full mr-4"></div>
            <div>
              <h1 className="text-xl md:text-2xl font-black text-slate-900 uppercase">
                {INITIAL_DATA.page.title}
              </h1>
              <p className="text-slate-500 text-[10px] md:text-xs flex items-center gap-1 font-bold">
                <Users size={12} /> {INITIAL_DATA.page.subtitle}
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 bg-[#312C85] text-white px-4 py-2.5 rounded-xl font-bold shadow-lg shadow-indigo-50 hover:bg-black transition-all"
          >
            <Play size={16} fill="currentColor" />{" "}
            <span className="hidden sm:inline text-sm">Видео үзэх</span>
          </button>
        </div>
      </section>

      <Nav />

      <div className="max-w-[1400px] mx-auto mt-6">
        {isTeacher && (
          <div className="mb-6 bg-indigo-50/40 p-4 rounded-2xl border border-indigo-100 flex flex-col gap-3">
            <div className="flex justify-between items-center px-1">
              <p className="text-[11px] font-black text-[#312C85] flex items-center gap-2 uppercase tracking-widest">
                <Video size={16} /> Видео хичээл удирдах
              </p>
              <button
                onClick={() => setShowVideoEdit(!showVideoEdit)}
                className="text-[10px] font-black bg-white border border-indigo-200 px-3 py-1 rounded-lg uppercase text-indigo-600"
              >
                {showVideoEdit ? "Хаах" : "Линк солих"}
              </button>
            </div>
            {showVideoEdit && (
              <div className="flex gap-2 animate-in fade-in zoom-in-95">
                <input
                  className="flex-1 p-3 rounded-xl border text-sm outline-none focus:ring-2 focus:ring-indigo-500"
                  value={videoInput}
                  onChange={(e) => setVideoInput(e.target.value)}
                  placeholder="Youtube линк..."
                />
                <button
                  onClick={saveVideo}
                  className="bg-[#312C85] text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2"
                >
                  {loading ? (
                    <Loader2 className="animate-spin" size={18} />
                  ) : (
                    <Save size={18} />
                  )}{" "}
                  Хадгалах
                </button>
              </div>
            )}
          </div>
        )}

        <div className="flex flex-col lg:flex-row gap-6">
          <div className="lg:w-[75%] space-y-4">
            <div className="bg-white rounded-3xl overflow-hidden shadow-sm border border-slate-200 aspect-video lg:h-[550px] relative">
              {displayUrl ? (
                <iframe
                  src={displayUrl}
                  className="w-full h-full border-none"
                  allowFullScreen
                ></iframe>
              ) : (
                <Slider slides={INITIAL_DATA.slider} />
              )}
            </div>
            {isTeacher && (
              <div className="bg-indigo-50/50 p-4 rounded-2xl border border-indigo-100 flex flex-col gap-3">
                <p className="text-[11px] font-black text-[#312C85] flex items-center gap-2 uppercase tracking-widest">
                  <Settings size={14} /> Презентейшн солих
                </p>
                <div className="flex gap-2">
                  <input
                    className="flex-1 p-3 rounded-xl border text-sm outline-none"
                    value={canvaInput}
                    onChange={(e) => setCanvaInput(e.target.value)}
                    placeholder="Canva код..."
                  />
                  <button
                    onClick={saveCanva}
                    className="bg-[#312C85] text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2"
                  >
                    {loading ? (
                      <Loader2 className="animate-spin" size={18} />
                    ) : (
                      <Save size={18} />
                    )}{" "}
                    Хадгалах
                  </button>
                </div>
              </div>
            )}
          </div>

          <div className="lg:w-[25%] flex flex-col gap-4">
            <div className="flex justify-between items-center px-1">
              <h3 className="font-bold text-slate-800 text-[10px] uppercase tracking-widest opacity-60">
                Виртуал лаборатори
              </h3>
              {isTeacher && (
                <button
                  onClick={() => {
                    setEditingExp(null);
                    setNewExp({ title: "", href: "", img: "" });
                    setShowExpForm(!showExpForm);
                  }}
                  className="p-1.5 bg-[#312C85] text-white rounded-lg"
                >
                  {showExpForm ? <X size={16} /> : <Plus size={16} />}
                </button>
              )}
            </div>

            {showExpForm && isTeacher && (
              <div className="bg-white p-4 rounded-2xl border-2 border-dashed border-indigo-200 flex flex-col gap-3 animate-in slide-in-from-top-2">
                <input
                  className="text-sm p-2 border rounded-xl"
                  placeholder="Нэр..."
                  value={newExp.title}
                  onChange={(e) =>
                    setNewExp({ ...newExp, title: e.target.value })
                  }
                />
                <input
                  className="text-sm p-2 border rounded-xl"
                  placeholder="URL..."
                  value={newExp.href}
                  onChange={(e) =>
                    setNewExp({ ...newExp, href: e.target.value })
                  }
                />
                <input
                  className="text-sm p-2 border rounded-xl"
                  placeholder="Зургийн линк..."
                  value={newExp.img}
                  onChange={(e) =>
                    setNewExp({ ...newExp, img: e.target.value })
                  }
                />
                <button
                  onClick={handleAddOrUpdateExp}
                  className="bg-[#312C85] text-white py-2 rounded-xl text-sm font-bold"
                >
                  Хадгалах
                </button>
              </div>
            )}

            <div className="space-y-4">
              {finalExperiments.map((exp, idx) => (
                <div key={exp._id || idx} className="relative group">
                  <Link
                    href={exp.href}
                    target="_blank"
                    className="block bg-white rounded-2xl p-2 border border-slate-200 hover:border-[#312C85] transition-all shadow-sm"
                  >
                    <div className="h-28 rounded-xl bg-slate-100 overflow-hidden relative">
                      <img
                        src={
                          exp.img ||
                          "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=400"
                        }
                        className="w-full h-full object-cover group-hover:scale-105 transition-all"
                        alt={exp.title}
                      />
                      <div className="absolute top-2 right-2 p-1.5 bg-white/90 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity">
                        <ExternalLink size={14} />
                      </div>
                    </div>
                    <div className="py-2.5 px-1 font-bold text-sm text-slate-700 truncate">
                      {exp.title}
                    </div>
                  </Link>
                  {isTeacher && exp._id && (
                    <div className="absolute top-4 right-4 flex gap-1 lg:opacity-0 group-hover:opacity-100 transition-all">
                      <button
                        onClick={() => {
                          setEditingExp(exp._id);
                          setNewExp({
                            title: exp.title,
                            href: exp.href,
                            img: exp.img,
                          });
                          setShowExpForm(true);
                        }}
                        className="p-2 bg-blue-500 text-white rounded-lg shadow-md hover:scale-110 transition-transform"
                      >
                        <Edit2 size={10} />
                      </button>
                      <button
                        onClick={() => deleteItem("experiment", exp._id)}
                        className="p-2 bg-red-500 text-white rounded-lg shadow-md hover:scale-110 transition-transform"
                      >
                        <Trash2 size={10} />
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        <section className="bg-white rounded-3xl p-6 md:p-12 shadow-sm border border-slate-200 mt-16">
          <div className="flex flex-col items-center mb-12">
            <h2 className="text-2xl md:text-3xl text-slate-900 font-black uppercase tracking-tight">
              Онолын мэдээлэл
            </h2>
            <div className="w-16 h-1 bg-[#312C85] rounded-full mt-3"></div>
          </div>

          {isTeacher && (
            <div className="mb-12 p-8 bg-indigo-50/20 rounded-2xl border-2 border-dashed border-indigo-200 flex flex-col gap-5 max-w-4xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <input
                  className="p-4 rounded-xl border bg-white font-bold outline-none"
                  placeholder="Гарчиг..."
                  value={newCard.title}
                  onChange={(e) =>
                    setNewCard({ ...newCard, title: e.target.value })
                  }
                />
                <textarea
                  className="p-4 rounded-xl border bg-white outline-none"
                  placeholder="Агуулга (Шинэ мөрөөр)..."
                  value={newCard.content}
                  onChange={(e) =>
                    setNewCard({ ...newCard, content: e.target.value })
                  }
                />
              </div>
              <button
                onClick={handleAddLesson}
                className="bg-[#312C85] text-white py-4 rounded-xl font-bold flex justify-center gap-2 hover:bg-black transition-all"
              >
                {loading ? (
                  <Loader2 className="animate-spin" size={20} />
                ) : (
                  <Plus size={20} />
                )}{" "}
                Карт нэмэх
              </button>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {visibleTheory.map((item, i) => (
              <div
                key={item._id || i}
                className="relative group bg-white rounded-2xl p-8 border border-slate-100 hover:border-[#312C85]/20 hover:bg-[#312C85]/5 transition-all shadow-sm"
              >
                {editingCardId === item._id ? (
                  <div className="space-y-4">
                    <input
                      className="w-full p-2 font-bold border-b-2 border-[#312C85] outline-none bg-transparent"
                      value={tempEditData.title}
                      onChange={(e) =>
                        setTempEditData({
                          ...tempEditData,
                          title: e.target.value,
                        })
                      }
                    />
                    <textarea
                      className="w-full p-2 text-sm border rounded-xl"
                      rows={4}
                      value={tempEditData.content}
                      onChange={(e) =>
                        setTempEditData({
                          ...tempEditData,
                          content: e.target.value,
                        })
                      }
                    />
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleInlineSave(item._id)}
                        className="flex-1 bg-green-500 text-white py-2 rounded-lg font-bold"
                      >
                        Хадгалах
                      </button>
                      <button
                        onClick={() => setEditingCardId(null)}
                        className="flex-1 bg-slate-100 py-2 rounded-lg"
                      >
                        Болих
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <h3 className="text-lg font-bold text-[#312C85] mb-5 flex items-center gap-4">
                      <span className="min-w-[36px] h-9 rounded-xl bg-[#312C85] text-white flex items-center justify-center text-sm shadow-md">
                        {i + 1}
                      </span>
                      {item.title}
                    </h3>
                    <div className="space-y-3">
                      {item.content.map((text, j) => (
                        <p
                          key={j}
                          className="text-sm text-slate-600 border-l-3 border-indigo-100 pl-4 leading-relaxed font-medium"
                        >
                          {text}
                        </p>
                      ))}
                    </div>
                    {isTeacher && item._id && (
                      <div className="absolute top-6 right-6 flex gap-2 lg:opacity-0 group-hover:opacity-100 transition-all">
                        <button
                          onClick={() => {
                            setEditingCardId(item._id);
                            setTempEditData({
                              title: item.title,
                              content: item.content.join("\n"),
                            });
                          }}
                          className="p-2 bg-white text-blue-600 rounded-lg shadow-sm border border-slate-100 hover:scale-110 transition-transform"
                        >
                          <Edit2 size={16} />
                        </button>
                        <button
                          onClick={() => deleteItem("lessons", item._id)}
                          className="p-2 bg-white text-red-500 rounded-lg shadow-sm border border-slate-100 hover:scale-110 transition-transform"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    )}
                  </>
                )}
              </div>
            ))}
          </div>

          <div className="flex justify-center mt-12">
            <button
              onClick={() => setShowAll(!showAll)}
              className="flex flex-col items-center gap-2 group"
            >
              <div className="bg-slate-100 text-slate-600 px-8 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest group-hover:bg-[#312C85] group-hover:text-white transition-all">
                {showAll ? "Хураах" : "Дэлгэрэнгүй"}
              </div>
              {showAll ? (
                <ChevronUp size={20} className="text-[#312C85]" />
              ) : (
                <ChevronDown
                  size={20}
                  className="text-[#312C85] animate-bounce"
                />
              )}
            </button>
          </div>
        </section>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md">
          <div className="relative w-full max-w-5xl aspect-video bg-black rounded-[2rem] overflow-hidden shadow-2xl border border-white/10">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-6 right-6 z-10 p-3 bg-white/10 hover:bg-red-500 text-white rounded-full transition-all"
            >
              <X size={24} />
            </button>
            <iframe className="w-full h-full" src={videoUrl} allowFullScreen />
          </div>
        </div>
      )}
    </div>
  );
}
