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
  Beaker,
} from "lucide-react";
import NavAll from "./NavAll";
import NavH from "./NavH";
import { useAuth } from "@/context/AuthContext";

const PAGE_ID = "molecular";

const INITIAL_DATA = {
  page: {
    title: "Молекулын туйлшрал",
    subtitle: "Физикийн цахим хичээл",
    videoUrl: "https://www.youtube.com/embed/PVL24HAesnc",
  },
  slider: [
    { image: "https://physic-dmts.vercel.app/laser1.png", alt: "Molecular 1" },
    { image: "https://physic-dmts.vercel.app/laser2.png", alt: "Molecular 2" },
  ],
  experiments: [
    {
      title: "Молекулын туйлшрал",
      href: "https://phet.colorado.edu/sims/html/molecule-polarity/latest/molecule-polarity_all.html",
      img: "https://phet.colorado.edu/sims/html/molecule-polarity/latest/molecule-polarity-600.png",
    },
    {
      title: "Молекулын хэлбэрүүд",
      href: "https://phet.colorado.edu/sims/html/molecule-shapes/latest/molecule-shapes_all.html",
      img: "https://phet.colorado.edu/sims/html/molecule-shapes/latest/molecule-shapes-600.png",
    },
    {
      title: "Атомын харилцан үйлчлэл",
      href: "https://phet.colorado.edu/sims/html/atomic-interactions/latest/atomic-interactions_all.html",
      img: "https://phet.colorado.edu/sims/html/atomic-interactions/latest/atomic-interactions-600.png",
    },
  ],
  theory: [
    {
      title: "Молекулын туйлшрал",
      content: [
        "Гадаад цахилгаан орны нөлөөгөөр молекул дахь цэнэгийн төвүүд шилжиж, диполь үүсэх үзэгдэл.",
        "Электронт туйлшрал: Электрон үүлний шилжилтээр үүснэ.",
        "Ионт туйлшрал: Кристалл торон дахь ионуудын шилжилтээр үүснэ.",
      ],
    },
    {
      title: "Цахилгаан диполь момент",
      content: [
        "Молекулын туйлшралыг тодорхойлох вектор хэмжигдэхүүн.",
        "Томьёо: p = q · l (q — цэнэг, l — цэнэг хоорондын зай).",
        "Нэгж: Кл·м (Кулон·метр) эсвэл Дебай (D).",
      ],
    },
    {
      title: "Туйлтай ба Туйлгүй молекул",
      content: [
        "Туйлтай: Цэнэгийн төвүүд нь давхцдаггүй молекул (Ус H₂O, Аммиак NH₃).",
        "Туйлгүй: Цэнэгийн төвүүд нь давхцдаг молекул (O₂, N₂, CH₄).",
        "Туйлтай молекулууд гадаад оронд чиглэгдэх шинж чанартай.",
      ],
    },
    {
      title: "Диэлектрик нэвтрүүлэлт",
      content: [
        "Орчин дахь цахилгаан харилцан үйлчлэлийн хүч вакуумынхаас хэд дахин сулрахыг заана.",
        "Томьёо: ε = F₀ / F.",
        "Усны диэлектрик нэвтрүүлэлт маш өндөр (ε ≈ 81) байдаг.",
      ],
    },
    {
      title: "Конденсатор ба Диэлектрик",
      content: [
        "Ялтсуудын хооронд диэлектрик оруулахад багтаамж ε дахин нэмэгдэнэ.",
        "Томьёо: C = ε · C₀ = ε (ε₀ · S / d).",
        "Энэ нь цэнэгийг илүү ихээр хуримтлуулах боломж олгодог.",
      ],
    },
    {
      title: "Химийн холбооны туйлшрал",
      content: [
        "Электроны сөрөг чанарын зөрүү их байх тусам холбоо илүү туйлтай байна.",
        "Ковалентын туйлтай холбоо: Электрон үүл нэг атом руугаа илүү шилжсэн холбоо.",
        "Ионт холбоо: Электрон бүрэн шилжсэн туйлшралын туйлшлын хэлбэр.",
      ],
    },
    {
      title: "Диэлектрик доторх орон",
      content: [
        "Диэлектрик туйлшрах үед түүний дотор эсрэг чиглэсэн цахилгаан орон үүснэ.",
        "Үр дүнд нь нийлбэр цахилгаан орны хүчлэг буурдаг: E = E₀ / ε.",
        "Энэ үзэгдлийг техник болон электроникт өргөн ашигладаг.",
      ],
    },
  ],
};

export default function Molecular() {
  const { user } = useAuth();
  const isTeacher = user?.role === "teacher";

  const [displayUrl, setDisplayUrl] = useState("");
  const [videoUrl, setVideoUrl] = useState(INITIAL_DATA.page.videoUrl);
  const [dbExperiments, setDbExperiments] = useState([]);
  const [dynamicLessons, setDynamicLessons] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showAll, setShowAll] = useState(false);

  // Editing States
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
        const d = await canvaRes.json();
        if (d?.url) {
          setDisplayUrl(d.url);
          setCanvaInput(d.url);
        }
      }
      if (videoRes.ok) {
        const d = await videoRes.json();
        if (d?.url) {
          setVideoUrl(d.url);
          setVideoInput(d.url);
        }
      }
      if (expRes.ok) setDbExperiments(await expRes.json());
      if (lessonRes.ok) setDynamicLessons(await lessonRes.json());
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // ... Save functions (saveCanva, saveVideo, handleAddOrUpdateExp, handleAddLesson, handleInlineSave, deleteItem) хэвээрээ ...
  const saveCanva = async () => {
    setLoading(true);
    let url = canvaInput.trim();
    if (url.includes("<iframe")) {
      const match = url.match(/src="([^"]+)"/);
      if (match) url = match[1];
    }
    const res = await fetch(`/api/presentation?pageId=${PAGE_ID}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url, pageId: PAGE_ID }),
    });
    if (res.ok) {
      setDisplayUrl(url);
      alert("Амжилттай хадгалагдлаа!");
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
      alert("Видео шинэчлэгдлээ!");
    }
    setLoading(false);
  };

  const handleAddOrUpdateExp = async () => {
    if (!newExp.title || !newExp.href) return alert("Бөглөнө үү!");
    setLoading(true);
    const method = editingExp ? "PUT" : "POST";
    const res = await fetch(`/api/experiment?id=${editingExp || ""}`, {
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
        content: newCard.content.split("\n").filter((c) => c.trim()),
        pageId: PAGE_ID,
      }),
    });
    if (res.ok) {
      setNewCard({ title: "", content: "" });
      fetchData();
    }
    setLoading(false);
  };

  const handleInlineSave = async (id) => {
    setLoading(true);
    const res = await fetch("/api/lessons", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id,
        title: tempEditData.title,
        content: tempEditData.content.split("\n").filter((c) => c.trim()),
      }),
    });
    if (res.ok) {
      setEditingCardId(null);
      fetchData();
    }
    setLoading(false);
  };

  const deleteItem = async (type, id) => {
    if (!confirm("Та устгахдаа итгэлтэй байна уу?")) return;
    await fetch(`/api/${type}?id=${id}`, { method: "DELETE" });
    fetchData();
  };

  const finalExperiments = [
    ...dbExperiments.slice().reverse(),
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

      {/* Header Section */}
      <section className="pt-24 md:pt-28">
        <div className="flex flex-col sm:flex-row bg-white py-4 px-5 rounded-2xl shadow-sm justify-between items-center border border-slate-200 mb-6 gap-4 relative z-10">
          <div className="flex items-center w-full sm:w-auto">
            <div className="w-1.5 h-10 bg-[#312C85] rounded-full mr-4"></div>
            <div>
              <h1 className="text-xl md:text-2xl font-black text-slate-900 uppercase tracking-tight">
                {INITIAL_DATA.page.title}
              </h1>
              <p className="text-slate-500 text-[10px] md:text-xs font-bold flex items-center gap-1 uppercase tracking-tighter">
                <Users size={12} /> {INITIAL_DATA.page.subtitle}
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="w-full sm:w-auto flex items-center justify-center gap-2 bg-[#312C85] text-white px-6 py-3 rounded-xl font-bold shadow-lg shadow-indigo-100 hover:bg-black transition-all active:scale-95"
          >
            <Play size={16} fill="currentColor" /> <span>Хичээл үзэх</span>
          </button>
        </div>
      </section>

      <NavH />

      <div className="max-w-[1400px] mx-auto mt-6">
        {/* Teacher Controls: Video */}
        {isTeacher && (
          <div className="mb-6 bg-indigo-50/50 p-4 rounded-2xl border border-indigo-100 flex flex-col gap-3">
            <div className="flex justify-between items-center">
              <p className="text-[11px] font-black text-[#312C85] flex items-center gap-2 uppercase tracking-widest">
                <Video size={16} /> Видео удирдлага
              </p>
              <button
                onClick={() => setShowVideoEdit(!showVideoEdit)}
                className="text-[10px] font-black bg-white border border-indigo-200 px-3 py-1 rounded-lg uppercase text-indigo-600"
              >
                {showVideoEdit ? "Хаах" : "Засах"}
              </button>
            </div>
            {showVideoEdit && (
              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  className="flex-1 p-3 rounded-xl border bg-white text-sm outline-none"
                  value={videoInput}
                  onChange={(e) => setVideoInput(e.target.value)}
                  placeholder="Youtube link..."
                />
                <button
                  onClick={saveVideo}
                  className="bg-[#312C85] text-white px-6 py-3 rounded-xl font-bold flex items-center justify-center gap-2"
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

        {/* Main Content: Presentation & Experiments */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Presentation Area */}
          <div className="w-full lg:w-[75%] space-y-4">
            <div className="bg-white rounded-[1.5rem] md:rounded-[2rem] overflow-hidden shadow-sm border border-slate-200 aspect-video relative">
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
              <div className="bg-white p-4 rounded-2xl border border-slate-200 flex flex-col gap-3 shadow-sm">
                <p className="text-[10px] font-black text-[#312C85] flex items-center gap-2 uppercase tracking-widest">
                  <Settings size={14} /> Презентейшн солих
                </p>
                <div className="flex flex-col sm:flex-row gap-2">
                  <input
                    className="flex-1 p-3 rounded-xl border bg-white text-sm outline-none"
                    value={canvaInput}
                    onChange={(e) => setCanvaInput(e.target.value)}
                    placeholder="Canva embed код..."
                  />
                  <button
                    onClick={saveCanva}
                    className="bg-[#312C85] text-white px-6 py-3 rounded-xl font-bold flex items-center justify-center"
                  >
                    {loading ? (
                      <Loader2 className="animate-spin" size={18} />
                    ) : (
                      <Save size={18} />
                    )}
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar Area: Experiments */}
          <div className="w-full lg:w-[25%] flex flex-col gap-4">
            <div className="flex justify-between items-center px-1">
              <h3 className="font-bold text-slate-800 text-[10px] uppercase tracking-widest opacity-60 flex items-center gap-2">
                <Beaker size={14} /> Лаборатори
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
            {showExpForm && (
              <div className="bg-white p-4 rounded-2xl border-2 border-dashed border-indigo-200 flex flex-col gap-3">
                <input
                  className="text-sm p-2 border rounded-xl outline-none"
                  placeholder="Нэр..."
                  value={newExp.title}
                  onChange={(e) =>
                    setNewExp({ ...newExp, title: e.target.value })
                  }
                />
                <input
                  className="text-sm p-2 border rounded-xl outline-none"
                  placeholder="PhET Link..."
                  value={newExp.href}
                  onChange={(e) =>
                    setNewExp({ ...newExp, href: e.target.value })
                  }
                />
                <input
                  className="text-sm p-2 border rounded-xl outline-none"
                  placeholder="Зураг URL..."
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
            <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-4">
              {finalExperiments.map((exp, idx) => (
                <div
                  key={exp._id || idx}
                  className="relative group bg-white rounded-2xl p-2 border border-slate-100 hover:border-indigo-300 transition-all shadow-sm"
                >
                  <Link href={exp.href} target="_blank">
                    <div className="h-32 sm:h-24 lg:h-28 rounded-xl bg-indigo-50/30 overflow-hidden relative">
                      <img
                        src={exp.img}
                        className="w-full h-full object-cover group-hover:scale-105 transition-all duration-500"
                        alt={exp.title}
                      />
                      <div className="absolute top-2 right-2 p-1.5 bg-white/90 rounded-lg opacity-100 lg:opacity-0 group-hover:opacity-100 transition-opacity">
                        <ExternalLink size={14} />
                      </div>
                    </div>
                    <div className="py-2.5 px-1 font-bold text-[12px] text-slate-700 truncate">
                      {exp.title}
                    </div>
                  </Link>
                  {isTeacher && exp._id && (
                    <div className="absolute top-4 right-4 flex gap-1 z-10">
                      <button
                        onClick={() => {
                          setEditingExp(exp._id);
                          setNewExp(exp);
                          setShowExpForm(true);
                        }}
                        className="p-2 bg-blue-500 text-white rounded-lg"
                      >
                        <Edit2 size={12} />
                      </button>
                      <button
                        onClick={() => deleteItem("experiment", exp._id)}
                        className="p-2 bg-red-500 text-white rounded-lg"
                      >
                        <Trash2 size={12} />
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Theory Section */}
        <section className="bg-white rounded-[1.5rem] md:rounded-[2.5rem] p-6 md:p-12 shadow-sm border border-slate-100 mt-12">
          <div className="flex flex-col items-center mb-8 md:mb-12 text-center">
            <h2 className="text-xl md:text-3xl text-slate-900 font-black uppercase tracking-tight">
              Онолын Үндэс
            </h2>
            <div className="w-16 h-1 bg-[#312C85] rounded-full mt-3"></div>
          </div>

          {/* Teacher Add Theory */}
          {isTeacher && (
            <div className="mb-10 p-4 md:p-6 bg-indigo-50/30 rounded-2xl border-2 border-dashed border-indigo-200 flex flex-col gap-4">
              <h4 className="text-[11px] font-black text-[#312C85] uppercase tracking-widest">
                Шинэ карт нэмэх
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  className="p-3 rounded-xl border bg-white outline-none"
                  placeholder="Гарчиг..."
                  value={newCard.title}
                  onChange={(e) =>
                    setNewCard({ ...newCard, title: e.target.value })
                  }
                />
                <textarea
                  className="p-3 rounded-xl border bg-white outline-none"
                  placeholder="Агуулга (Мөр бүрийг шинэ мөрөөр)..."
                  value={newCard.content}
                  onChange={(e) =>
                    setNewCard({ ...newCard, content: e.target.value })
                  }
                />
              </div>
              <button
                onClick={handleAddLesson}
                className="bg-[#312C85] text-white py-3 rounded-xl font-bold flex justify-center items-center gap-2"
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

          {/* Theory Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-12">
            {visibleTheory.map((item, i) => (
              <div
                key={item._id || i}
                className="relative group bg-white rounded-2xl md:rounded-3xl p-6 md:p-8 border border-slate-50 hover:bg-indigo-50/10 transition-all shadow-sm"
              >
                {editingCardId === item._id ? (
                  <div className="space-y-4">
                    <input
                      className="w-full p-2 font-bold border-b outline-none"
                      value={tempEditData.title}
                      onChange={(e) =>
                        setTempEditData({
                          ...tempEditData,
                          title: e.target.value,
                        })
                      }
                    />
                    <textarea
                      className="w-full p-2 text-sm border rounded-lg h-32 outline-none"
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
                        className="flex-1 bg-slate-200 py-2 rounded-lg"
                      >
                        Болих
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <h3 className="text-base md:text-lg font-bold text-[#312C85] mb-4 flex items-center gap-3">
                      <span className="min-w-[32px] h-8 rounded-lg bg-[#312C85] text-white flex items-center justify-center text-xs font-bold">
                        {i + 1}
                      </span>
                      {item.title}
                    </h3>
                    <div className="space-y-3">
                      {item.content.map((text, j) => (
                        <p
                          key={j}
                          className="text-sm text-slate-600 border-l-2 border-indigo-100 pl-4 leading-relaxed"
                        >
                          {text}
                        </p>
                      ))}
                    </div>
                    {isTeacher && item._id && (
                      <div className="absolute top-4 right-4 flex gap-2">
                        <button
                          onClick={() => {
                            setEditingCardId(item._id);
                            setTempEditData({
                              title: item.title,
                              content: item.content.join("\n"),
                            });
                          }}
                          className="p-2 bg-blue-100 text-blue-600 rounded-lg"
                        >
                          <Edit2 size={14} />
                        </button>
                        <button
                          onClick={() => deleteItem("lessons", item._id)}
                          className="p-2 bg-red-100 text-red-500 rounded-lg"
                        >
                          <Trash2 size={14} />
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
              <div className="bg-indigo-50 text-[#312C85] px-8 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest group-hover:bg-[#312C85] group-hover:text-white transition-all shadow-sm">
                {showAll ? "Хураах" : "Дэлгэрэнгүй үзэх"}
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

      {/* Video Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-2 md:p-4 bg-black/85 backdrop-blur-sm">
          <div className="relative w-full max-w-5xl aspect-video bg-black rounded-xl md:rounded-[2.5rem] overflow-hidden">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-2 right-2 md:top-6 md:right-6 z-10 p-2 md:p-3 bg-white/10 hover:bg-red-500 text-white rounded-full transition-all"
            >
              <X size={20} />
            </button>
            <iframe
              className="w-full h-full"
              src={videoUrl}
              allowFullScreen
              allow="autoplay"
            />
          </div>
        </div>
      )}
    </div>
  );
}
