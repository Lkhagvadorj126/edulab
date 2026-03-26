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
} from "lucide-react";
import NavAll from "./NavAll";
import Nav from "./Nav";
import { useAuth } from "@/context/AuthContext";

const INITIAL_DATA = {
  page: {
    title: "Гэрэл ба цацраг",
    subtitle: "Физикийн цахим хичээл",
    videoUrl: "https://www.youtube.com/embed/pj_ya0e20vE?si=2HavDUTSIcjtzCqy",
  },
  slider: [
    { image: "https://physic-dmts.vercel.app/pre1.png", alt: "Light 1" },
    { image: "https://physic-dmts.vercel.app/pre2.png", alt: "Light 2" },
  ],
  experiments: [
    {
      title: "Геометрийн оптик",
      href: "https://phet.colorado.edu/sims/html/geometric-optics/latest/geometric-optics_all.html",
      img: "https://phet.colorado.edu/sims/html/geometric-optics/latest/geometric-optics-420.png",
    },
    {
      title: "Өнгөний хараа",
      href: "https://phet.colorado.edu/sims/html/color-vision/latest/color-vision_all.html",
      img: "https://phet.colorado.edu/sims/html/color-vision/latest/color-vision-420.png",
    },
    {
      title: "Молекулын моторууд",
      href: "https://phet.colorado.edu/sims/cheerpj/optical-tweezers/latest/optical-tweezers.html?simulation=molecular-motors",
      img: "https://phet.colorado.edu/sims/optical-tweezers/molecular-motors-420.png",
    },
  ],
  theory: [
    {
      title: "Гэрлийн ойлтын хууль",
      content: [
        "Тусгалын өнцөг (α) нь ойлтын өнцөгтэй (β) үргэлж тэнцүү байна.",
        "Томьёо: α = β.",
        "Тусгал, ойлт ба туссан цэгт босгосон перпендикуляр нэг хавтгайд оршино.",
      ],
    },
    {
      title: "Гэрлийн хугарлын хууль",
      content: [
        "Гэрэл нэг орчноос нөгөөд шилжихдээ чиглэлээ өөрчлөх үзэгдэл.",
        "Снеллиусын хууль: n₁ · sinα = n₂ · sinβ.",
        "Хугарлын өнцөг нь орчны нягтаас хамаарч өөр өөр байна.",
      ],
    },
    {
      title: "Орчны хугарлын илтгэгч",
      content: [
        "Үнэмлэхүй хугарлын илтгэгч: n = c/v.",
        "Орчин нягт байх тусам гэрлийн тархалтын хурд (v) бага байна.",
        "Вакуум орчны хугарлын илтгэгч n = 1 байна.",
      ],
    },
    {
      title: "Бүрэн дотоод ойлт",
      content: [
        "Гэрэл нягт орчноос сийрэг орчин руу тусах үед үүсэх үзэгдэл.",
        "Хязгаарын өнцөгөөс их өнцөгөөр тусвал гэрэл хугарахгүй, бүрэн буцаж ойно.",
        "Энэ зарчим шилэн кабелийн технологид ашиглагддаг.",
      ],
    },
    {
      title: "Нимгэн линзний томьёо",
      content: [
        "Фокусын зайн хамаарал: 1/F = 1/d + 1/f.",
        "Линзний оптик хүч: D = 1/F (нэгж: Диоптр).",
        "Цуглуулагч линзэд F > 0, сарниулагч линзэд F < 0 байна.",
      ],
    },
    {
      title: "Линзний томсголт",
      content: [
        "Дүрсийн өндрийг биеийн өндөрт харьцуулсан харьцаа: k = H/h.",
        "Мөн зайгаар тодорхойлбол: k = f/d.",
        "Дүрсийн шинж чанар (бодит/хуурмаг, шууд/урвуу) нь d ба F-ээс хамаарна.",
      ],
    },
    {
      title: "Гэрлийн дисперс",
      content: [
        "Цагаан гэрэл призмээр дамжихдаа өнгөөр задрах үзэгдэл.",
        "Энэ нь хугарлын илтгэгч долгионы уртаас хамаардагтай холбоотой.",
        "Солонго үүсэх нь байгаль дээрх гэрлийн дисперсийн жишээ юм.",
      ],
    },
  ],
};

const PAGE_ID = "light"; // Энэ хуудасны ID

export default function Light() {
  const { user } = useAuth();
  const isTeacher = user?.role === "teacher";

  // States
  const [displayUrl, setDisplayUrl] = useState("");
  const [videoUrl, setVideoUrl] = useState(INITIAL_DATA.page.videoUrl);
  const [dbExperiments, setDbExperiments] = useState([]);
  const [dynamicLessons, setDynamicLessons] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showAll, setShowAll] = useState(false);

  // Edit States
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
      console.error("Алдаа гарлаа:", err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // --- ACTIONS ---
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
      alert("Презентейшн хадгалагдлаа!");
    }
    setLoading(false);
  };

  const saveVideo = async () => {
    setLoading(true);
    const res = await fetch("/api/video", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url: videoInput, pageId: PAGE_ID }),
    });
    if (res.ok) {
      const data = await res.json();
      setVideoUrl(data.url);
      setShowVideoEdit(false);
      alert("Видео шинэчлэгдлээ!");
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
    if (!confirm("Устгах уу?")) return;
    const res = await fetch(`/api/${type}?id=${id}`, { method: "DELETE" });
    if (res.ok) fetchData();
  };
  // --- EXPERIMENT ACTIONS ---
  const handleAddOrUpdateExp = async () => {
    // Хоосон утга шалгах
    if (!newExp.title || !newExp.href) {
      return alert("Гарчиг болон линкийг заавал бөглөнө үү!");
    }

    setLoading(true);
    try {
      // Хэрэв editingExp (ID) байгаа бол PUT (засах), байхгүй бол POST (нэмэх)
      const method = editingExp ? "PUT" : "POST";
      const url = editingExp
        ? `/api/experiment?id=${editingExp}`
        : "/api/experiment";

      const res = await fetch(url, {
        method: method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...newExp,
          pageId: PAGE_ID, // "light" гэж очих ёстой
        }),
      });

      if (res.ok) {
        // Амжилттай болбол утгуудыг цэвэрлээд, датаг дахин татна
        setNewExp({ title: "", href: "", img: "" });
        setEditingExp(null);
        setShowExpForm(false);
        fetchData(); // Жагсаалтыг шинэчлэх
        alert(editingExp ? "Туршилт засагдлаа!" : "Шинэ туршилт нэмэгдлээ!");
      } else {
        const errorData = await res.json();
        alert("Алдаа гарлаа: " + errorData.message);
      }
    } catch (err) {
      console.error("Experiment handle error:", err);
      alert("Сервертэй холбогдоход алдаа гарлаа.");
    } finally {
      setLoading(false);
    }
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

  // Data Merging
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
            <div className="w-1.5 h-10 bg-[#312C85] rounded-full mr-4"></div>
            <div>
              <h1 className="text-xl md:text-2xl font-black text-slate-900 uppercase">
                {INITIAL_DATA.page.title}
              </h1>
              <p className="text-slate-500 text-xs flex items-center gap-1">
                <Users size={12} /> {INITIAL_DATA.page.subtitle}
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 bg-[#312C85] text-white px-4 py-2 rounded-xl font-bold"
          >
            <Play size={16} fill="currentColor" />{" "}
            <span className="hidden sm:inline">Видео үзэх</span>
          </button>
        </div>
      </section>

      <Nav />

      <div className="max-w-[1400px] mx-auto mt-6">
        {isTeacher && (
          <div className="mb-6 bg-indigo-50/30 p-4 rounded-2xl border border-indigo-100 flex flex-col gap-3">
            <div className="flex justify-between items-center">
              <p className="text-xs font-bold text-[#312C85] flex items-center gap-2 uppercase tracking-wider">
                <Video size={16} /> Видео хичээл удирдах:
              </p>
              <button
                onClick={() => setShowVideoEdit(!showVideoEdit)}
                className="text-[10px] font-black bg-white border border-indigo-200 px-3 py-1 rounded-lg uppercase text-indigo-600"
              >
                {showVideoEdit ? "Хаах" : "Линк солих"}
              </button>
            </div>
            {showVideoEdit && (
              <div className="flex gap-2">
                <input
                  className="flex-1 p-3 rounded-xl border bg-white text-sm outline-none"
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
            <div className="bg-white rounded-3xl overflow-hidden shadow-sm border border-slate-200 aspect-video lg:h-[550px]">
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
                <p className="text-xs font-bold text-[#312C85] flex items-center gap-2 uppercase tracking-wider">
                  <Settings size={14} /> Презентейшн солих:
                </p>
                <div className="flex gap-2">
                  <input
                    className="flex-1 p-3 rounded-xl border bg-white text-sm outline-none"
                    value={canvaInput}
                    onChange={(e) => setCanvaInput(e.target.value)}
                    placeholder="Canva embed код энд хуулна уу..."
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

          {/* Experiments Section - Энийг хуулаад өмнөх Туршилтын хэсэг дээр дарж бичнэ үү */}
          <div className="lg:w-[25%] flex flex-col gap-4">
            <div className="flex justify-between items-center px-1">
              <h3 className="font-bold text-slate-800 text-xs uppercase tracking-widest opacity-60">
                Виртуал лаборатори
              </h3>
              {/* БАГШ БОЛ НЭМЭХ ТОВЧ ХАРАГДАНА */}
              {isTeacher && (
                <button
                  onClick={() => {
                    setEditingExp(null);
                    setNewExp({ title: "", href: "", img: "" });
                    setShowExpForm(!showExpForm);
                  }}
                  className="p-1.5 bg-[#312C85] text-white rounded-lg hover:bg-indigo-700 transition-colors"
                >
                  {showExpForm ? <X size={16} /> : <Plus size={16} />}
                </button>
              )}
            </div>

            {/* ТУРШИЛТ НЭМЭХ ФОРМ */}
            {showExpForm && isTeacher && (
              <div className="bg-white p-4 rounded-2xl border-2 border-dashed border-indigo-200 flex flex-col gap-3 shadow-inner">
                <input
                  className="text-sm p-2 border rounded-xl outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Туршилтын нэр..."
                  value={newExp.title}
                  onChange={(e) =>
                    setNewExp({ ...newExp, title: e.target.value })
                  }
                />
                <input
                  className="text-sm p-2 border rounded-xl outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="PhET эсвэл Лаб линк (URL)..."
                  value={newExp.href}
                  onChange={(e) =>
                    setNewExp({ ...newExp, href: e.target.value })
                  }
                />
                <input
                  className="text-sm p-2 border rounded-xl outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Зургийн линк (Image URL)..."
                  value={newExp.img}
                  onChange={(e) =>
                    setNewExp({ ...newExp, img: e.target.value })
                  }
                />
                <button
                  onClick={handleAddOrUpdateExp}
                  disabled={loading}
                  className="bg-[#312C85] text-white py-2 rounded-xl text-sm font-bold flex justify-center items-center gap-2"
                >
                  {loading ? (
                    <Loader2 className="animate-spin" size={16} />
                  ) : (
                    <Save size={16} />
                  )}
                  {editingExp ? "Засах" : "Хадгалах"}
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
                          "https://phet.colorado.edu/sims/html/projectile-motion/latest/projectile-motion-600.png"
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

                  {/* БАГШ БОЛ УСТГАХ/ЗАСАХ ТОВЧ ХАРАГДАНА */}
                  {isTeacher && exp._id && (
                    <div className="absolute top-4 right-4 flex gap-1 opacity-0 group-hover:opacity-100 transition-all">
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
                        className="p-2 bg-blue-500 text-white rounded-full shadow-lg"
                      >
                        <Edit2 size={10} />
                      </button>
                      <button
                        onClick={() => deleteItem("experiment", exp._id)}
                        className="p-2 bg-red-500 text-white rounded-full shadow-lg"
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

        <section className="bg-white rounded-3xl p-6 md:p-10 shadow-sm border border-slate-200 mt-12">
          <div className="flex flex-col items-center mb-10">
            <h2 className="text-2xl md:text-3xl text-slate-900 font-black uppercase">
              Онолын мэдээлэл
            </h2>
            <div className="w-16 h-1 bg-[#312C85] rounded-full mt-2"></div>
          </div>

          {isTeacher && (
            <div className="mb-10 p-6 bg-indigo-50/30 rounded-2xl border-2 border-dashed border-indigo-200 flex flex-col gap-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  className="p-3 rounded-xl border bg-white"
                  placeholder="Гарчиг..."
                  value={newCard.title}
                  onChange={(e) =>
                    setNewCard({ ...newCard, title: e.target.value })
                  }
                />
                <textarea
                  className="p-3 rounded-xl border bg-white"
                  placeholder="Агуулга..."
                  value={newCard.content}
                  onChange={(e) =>
                    setNewCard({ ...newCard, content: e.target.value })
                  }
                />
              </div>
              <button
                onClick={handleAddLesson}
                className="bg-[#312C85] text-white py-3 rounded-xl font-bold flex justify-center gap-2"
              >
                {loading ? (
                  <Loader2 className="animate-spin" size={20} />
                ) : (
                  <Plus size={20} />
                )}{" "}
                Нэмэх
              </button>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8">
            {visibleTheory.map((item, i) => (
              <div
                key={item._id || i}
                className="relative group bg-white rounded-2xl p-6 border border-slate-100 hover:border-indigo-200 shadow-sm"
              >
                {editingCardId === item._id ? (
                  <div className="space-y-4">
                    <input
                      className="w-full p-2 font-bold border-b"
                      value={tempEditData.title}
                      onChange={(e) =>
                        setTempEditData({
                          ...tempEditData,
                          title: e.target.value,
                        })
                      }
                    />
                    <textarea
                      className="w-full p-2 text-sm border rounded-lg"
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
                        <Check size={16} /> Хадгалах
                      </button>
                      <button
                        onClick={() => setEditingCardId(null)}
                        className="flex-1 bg-slate-200 py-2 rounded-lg font-bold"
                      >
                        Болих
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <h3 className="text-lg font-bold text-[#312C85] mb-4 flex items-center gap-3">
                      <span className="min-w-[32px] h-8 rounded-lg bg-indigo-50 flex items-center justify-center text-sm">
                        {i + 1}
                      </span>
                      {item.title}
                    </h3>
                    <div className="space-y-2">
                      {item.content.map((text, j) => (
                        <p
                          key={j}
                          className="text-sm text-slate-600 border-l-2 border-indigo-50 pl-3"
                        >
                          {text}
                        </p>
                      ))}
                    </div>
                    {isTeacher && item._id && (
                      <div className="absolute top-4 right-4 flex gap-1 opacity-0 group-hover:opacity-100 transition-all">
                        <button
                          onClick={() => {
                            setEditingCardId(item._id);
                            setTempEditData({
                              title: item.title,
                              content: item.content.join("\n"),
                            });
                          }}
                          className="p-2 bg-blue-50 text-blue-600 rounded-lg"
                        >
                          <Edit2 size={16} />
                        </button>
                        <button
                          onClick={() => deleteItem("lessons", item._id)}
                          className="p-2 bg-red-50 text-red-500 rounded-lg"
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
              <div className="bg-slate-100 text-slate-600 px-8 py-2 rounded-full text-xs font-bold uppercase">
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

      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="relative w-full max-w-4xl aspect-video bg-black rounded-3xl overflow-hidden shadow-2xl">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 z-10 p-2 bg-white/20 hover:bg-red-500 text-white rounded-full"
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
