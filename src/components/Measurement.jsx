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
  FileText,
} from "lucide-react";
import NavAll from "./NavAll";
import NavH from "./NavH"; // Хэмжилт хэсэгт NavH ашиглах нь тохиромжтой
import { useAuth } from "@/context/AuthContext";

const PAGE_ID = "measurement";

const INITIAL_DATA = {
  page: {
    title: "Квантын хэмжилт",
    subtitle: "Физикийн цахим хичээл",
    videoUrl: "https://www.youtube.com/embed/5eW6u_kS9r4",
  },
  slider: [
    { image: "https://physic-dmts.vercel.app/laser1.png", alt: "Molecular 1" },
    { image: "https://physic-dmts.vercel.app/laser2.png", alt: "Molecular 2" },
  ],
  experiments: [
    {
      title: "Нэгж шилжүүлэх",
      href: "https://phet.colorado.edu/sims/html/unit-rates/latest/unit-rates_all.html",
      img: "https://phet.colorado.edu/sims/html/unit-rates/latest/unit-rates-600.png",
    },
    {
      title: "Хэмжилтийн нарийвчлал",
      href: "https://phet.colorado.edu/sims/html/estimation/latest/estimation_all.html",
      img: "https://phet.colorado.edu/sims/html/estimation/latest/estimation-600.png",
    },
    {
      title: "Масс ба Эзэлхүүн",
      href: "https://phet.colorado.edu/sims/html/density/latest/density_all.html",
      img: "https://phet.colorado.edu/sims/html/density/latest/density-600.png",
    },
  ],
  theory: [
    {
      title: " Хэмжигдэхүүн",
      content: [
        "Биеийн болон үзэгдлийн шинж чанарыг тоогоор илэрхийлэхийг хэлнэ.",
        "Үндсэн хэмжигдэхүүн: Урт (l), Хугацаа (t), Масс (m), Гүйдэл (I).",
        "Хэмжих нэгжийн олон улсын систем (SI)-ийг ашигладаг.",
      ],
    },
    {
      title: "Хэмжилтийн алдаа",
      content: [
        "Үнэмлэхүй алдаа (Δa): Хэмжсэн утга ба бодит утгын зөрүү.",
        "Харьцангуй алдаа (ε): Үнэмлэхүй алдааг бодит утгад харьцуулсан хувь.",
        "Хэмжилтийн үр дүнг x = x_avg ± Δx хэлбэрээр бичнэ.",
      ],
    },
    {
      title: "Шууд ба Шууд бус хэмжилт",
      content: [
        "Шууд хэмжилт: Багажаар шууд унших (Шугам, Термометр, Амперметр).",
        "Шууд бус хэмжилт: Томьёо ашиглан тооцоолох (Хурд v = s/t, Талбай A = a · b).",
        "Шууд бус хэмжилтийн алдааг тухайн томьёоны дагуу тооцно.",
      ],
    },
    {
      title: "Багажийн нарийвчлал",
      content: [
        "Хуваарийн утга (C): Хоёр зураасны хоорондох хамгийн бага зай.",
        "Багажийн алдаа: Ихэвчлэн хуваарийн утгын хагастай тэнцүү (Δa = C/2).",
        "Нарийн хэмжилтэд штангенциркуль, микрометр ашигладаг.",
      ],
    },
    {
      title: "Системчилсэн ба Санамсаргүй алдаа",
      content: [
        "Системчилсэн: Багажийн эвдрэл эсвэл буруу тохируулгаас үүсэх тогтмол алдаа.",
        "Санамсаргүй: Гадаад орчин, хүний сонор сэрэмжээс шалтгаалах хувьсах алдаа.",
        "Санамсаргүй алдааг олон дахин хэмжилт хийж, дунджийг олж багасгана.",
      ],
    },
    {
      title: "Скаляр ба Вектор хэмжигдэхүүн",
      content: [
        "Скаляр: Зөвхөн тоон утгаар тодорхойлогдох (Масс, Хугацаа, Энерги).",
        "Вектор: Тоон утгаас гадна чиглэлтэй хэмжигдэхүүн (Хүч, Хурд, Шилжилт).",
        "Векторуудыг нэмэхэд параллелограммын эсвэл гурвалжны дүрмийг ашиглана.",
      ],
    },
    {
      title: "График байгуулах ба Шинжилгээ",
      content: [
        "Хэмжилтийн үр дүнг графикаар дүрслэх нь хамаарлыг харахад тустай.",
        "Шууд пропорциональ хамаарал: y = kx (координатын эхээс гарсан шулуун).",
        "Графикийн налуу (slope) нь тухайн хэмжигдэхүүний харьцааг заана.",
      ],
    },
  ],
};

export default function Measurement() {
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
        const d = await canvaRes.json();
        if (d && d.url) {
          setDisplayUrl(d.url);
          setCanvaInput(d.url);
        }
      }
      if (videoRes.ok) {
        const d = await videoRes.json();
        if (d && d.url) {
          setVideoUrl(d.url);
          setVideoInput(d.url);
        } else {
          setVideoUrl(INITIAL_DATA.page.videoUrl);
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

  const handleAddOrUpdateExp = async () => {
    if (!newExp.title || !newExp.href) return alert("Бөглөнө үү!");
    setLoading(true);
    const method = editingExp ? "PUT" : "POST";
    const res = await fetch(`/api/experiment?id=${editingExp || ""}`, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...newExp, pageId: PAGE_ID, id: editingExp }),
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
        userId: user?.id,
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

      <section className="pt-24 md:pt-28">
        <div className="flex bg-white py-4 px-5 rounded-2xl shadow-sm justify-between items-center border border-slate-200 mb-6 relative z-10">
          <div className="flex items-center">
            <div className="w-1.5 h-10 bg-[#312C85] rounded-full mr-4"></div>
            <div>
              <h1 className="text-xl md:text-2xl font-black text-slate-900 uppercase tracking-tight">
                {INITIAL_DATA.page.title}
              </h1>
              <p className="text-slate-500 text-xs flex items-center gap-1">
                <Users size={12} /> {INITIAL_DATA.page.subtitle}
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setIsModalOpen(true)}
              className="flex items-center gap-2 bg-[#312C85] text-white px-4 py-2 rounded-xl font-bold shadow-md hover:bg-indigo-700 transition-all active:scale-95"
            >
              <Play size={16} fill="currentColor" />{" "}
              <span className="hidden sm:inline">Видео үзэх</span>
            </button>
          </div>
        </div>
      </section>

      <NavH />

      <div className="max-w-[1400px] mx-auto mt-6">
        {isTeacher && (
          <div className="mb-6 bg-indigo-50/50 p-4 rounded-2xl border border-indigo-100 flex flex-col gap-3">
            <div className="flex justify-between items-center">
              <p className="text-xs font-bold text-[#312C85] flex items-center gap-2 uppercase tracking-wider">
                <Video size={16} /> Видео хичээл удирдах:
              </p>
              <button
                onClick={() => setShowVideoEdit(!showVideoEdit)}
                className="text-[10px] font-black bg-white border border-indigo-200 px-3 py-1 rounded-lg uppercase text-indigo-600 hover:bg-indigo-600 hover:text-white transition-all"
              >
                {showVideoEdit ? "Хаах" : "Линк солих"}
              </button>
            </div>
            {showVideoEdit && (
              <div className="flex gap-2 animate-in slide-in-from-top-1 duration-200">
                <input
                  className="flex-1 p-3 rounded-xl border bg-white text-sm outline-none focus:ring-2 focus:ring-indigo-500"
                  value={videoInput}
                  onChange={(e) => setVideoInput(e.target.value)}
                  placeholder="Youtube линк..."
                />
                <button
                  onClick={saveVideo}
                  disabled={loading}
                  className="bg-[#312C85] text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 transition-all hover:bg-indigo-700"
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
          <div className="lg:w-[78%] space-y-4">
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
              <div className="bg-indigo-50/30 p-4 rounded-2xl border border-indigo-100 flex flex-col gap-3">
                <p className="text-xs font-bold text-[#312C85] flex items-center gap-2 uppercase tracking-wider">
                  <Settings size={14} /> Презентейшн солих:
                </p>
                <div className="flex gap-2">
                  <input
                    className="flex-1 p-3 rounded-xl border bg-white text-sm outline-none focus:ring-2 focus:ring-indigo-500"
                    value={canvaInput}
                    onChange={(e) => setCanvaInput(e.target.value)}
                    placeholder="Canva embed код..."
                  />
                  <button
                    onClick={saveCanva}
                    disabled={loading}
                    className="bg-[#312C85] text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 transition-all hover:bg-indigo-700"
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

          <div className="lg:w-[22%] flex flex-col gap-4">
            <div className="flex justify-between items-center px-1">
              <h3 className="font-bold text-slate-800 text-xs uppercase tracking-widest opacity-60 flex items-center gap-2">
                Туршилтууд
              </h3>
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
            {showExpForm && isTeacher && (
              <div className="bg-white p-4 rounded-2xl border-2 border-dashed border-indigo-200 flex flex-col gap-3 animate-in zoom-in duration-200">
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
                  disabled={loading}
                  className="bg-[#312C85] text-white py-2 rounded-xl text-sm font-bold hover:bg-indigo-700 transition-colors"
                >
                  {editingExp ? "Засах" : "Нэмэх"}
                </button>
              </div>
            )}
            <div className="space-y-4">
              {finalExperiments.map((exp, idx) => (
                <div
                  key={exp._id || idx}
                  className="relative group bg-white rounded-2xl p-2 border border-slate-100 hover:border-indigo-300 transition-all shadow-sm"
                >
                  <Link href={exp.href} target="_blank">
                    <div className="h-28 rounded-xl bg-indigo-50/30 overflow-hidden relative">
                      <img
                        src={exp.img}
                        className="w-full h-full object-cover group-hover:scale-105 transition-all duration-300"
                        alt={exp.title}
                      />
                      <div className="absolute top-2 right-2 p-1.5 bg-white/90 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity">
                        <ExternalLink size={14} />
                      </div>
                    </div>
                    <div className="py-2.5 px-1 font-bold text-sm text-slate-700 truncate group-hover:text-[#312C85]">
                      {exp.title}
                    </div>
                  </Link>
                  {isTeacher && exp._id && (
                    <div className="absolute top-4 right-4 flex gap-1 opacity-0 group-hover:opacity-100 transition-all z-10">
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
                        className="p-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-600 hover:text-white transition-colors"
                      >
                        <Edit2 size={12} />
                      </button>
                      <button
                        onClick={() => deleteItem("experiment", exp._id)}
                        className="p-2 bg-red-50 text-red-500 rounded-lg hover:bg-red-500 hover:text-white transition-colors"
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

        <section className="bg-white rounded-3xl p-6 md:p-12 shadow-sm border border-slate-200 mt-12">
          <div className="flex flex-col items-center mb-10 text-center">
            <h2 className="text-2xl md:text-3xl text-slate-900 font-black uppercase tracking-tight">
              Онолын Үндэс
            </h2>
            <div className="w-16 h-1 bg-[#312C85] rounded-full mt-2"></div>
          </div>
          {isTeacher && (
            <div className="mb-10 p-6 bg-indigo-50/30 rounded-2xl border-2 border-dashed border-indigo-200 flex flex-col gap-4 animate-in slide-in-from-top duration-300">
              <h4 className="text-xs font-bold text-[#312C85] uppercase tracking-widest">
                Шинэ карт нэмэх
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  className="p-3 rounded-xl border bg-white outline-none focus:ring-1 focus:ring-indigo-500"
                  placeholder="Гарчиг..."
                  value={newCard.title}
                  onChange={(e) =>
                    setNewCard({ ...newCard, title: e.target.value })
                  }
                />
                <textarea
                  className="p-3 rounded-xl border bg-white outline-none focus:ring-1 focus:ring-indigo-500 min-h-[50px]"
                  placeholder="Агуулга (Мөр бүрийг шинэ мөрөөр)..."
                  value={newCard.content}
                  onChange={(e) =>
                    setNewCard({ ...newCard, content: e.target.value })
                  }
                />
              </div>
              <button
                onClick={handleAddLesson}
                disabled={loading}
                className="bg-[#312C85] text-white py-3 rounded-xl font-bold flex justify-center gap-2 hover:bg-indigo-700 transition-colors"
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
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-10">
            {visibleTheory.map((item, i) => (
              <div
                key={item._id || i}
                className="relative group bg-white rounded-3xl p-8 border border-slate-100 hover:border-indigo-200 transition-all shadow-sm"
              >
                {editingCardId === item._id ? (
                  <div className="space-y-4">
                    <input
                      className="w-full p-2 font-bold border-b outline-none focus:border-indigo-500"
                      value={tempEditData.title}
                      onChange={(e) =>
                        setTempEditData({
                          ...tempEditData,
                          title: e.target.value,
                        })
                      }
                    />
                    <textarea
                      className="w-full p-2 text-sm border rounded-lg h-32 outline-none focus:ring-1 focus:ring-indigo-500"
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
                        className="flex-1 bg-green-500 text-white py-2 rounded-lg font-bold flex items-center justify-center gap-2 hover:bg-green-600 transition-colors"
                      >
                        <Check size={16} /> Хадгалах
                      </button>
                      <button
                        onClick={() => setEditingCardId(null)}
                        className="flex-1 bg-slate-200 py-2 rounded-lg hover:bg-slate-300 transition-colors"
                      >
                        Болих
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <h3 className="text-lg font-bold text-[#312C85] mb-4 pr-16 flex items-center gap-3">
                      <span className="min-w-[32px] h-8 rounded-lg bg-indigo-50 flex items-center justify-center text-sm font-bold border border-indigo-100">
                        {i + 1}
                      </span>
                      {item.title}
                    </h3>
                    <div className="space-y-2">
                      {item.content.map((text, j) => (
                        <p
                          key={j}
                          className="text-sm text-slate-600 border-l-2 border-indigo-50 pl-3 leading-relaxed"
                        >
                          {text}
                        </p>
                      ))}
                    </div>
                    {isTeacher && item._id && (
                      <div className="absolute top-4 right-4 flex gap-1 opacity-0 group-hover:opacity-100 transition-all z-10">
                        <button
                          onClick={() => {
                            setEditingCardId(item._id);
                            setTempEditData({
                              title: item.title,
                              content: item.content.join("\n"),
                            });
                          }}
                          className="p-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-600 hover:text-white transition-colors"
                        >
                          <Edit2 size={16} />
                        </button>
                        <button
                          onClick={() => deleteItem("lessons", item._id)}
                          className="p-2 bg-red-50 text-red-500 rounded-lg hover:bg-red-500 hover:text-white transition-colors"
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
              className="flex flex-col items-center gap-2 group transition-all duration-300"
            >
              <div className="bg-indigo-50 text-[#312C85] px-8 py-2 rounded-full text-xs font-bold uppercase tracking-widest group-hover:bg-[#312C85] group-hover:text-white transition-all shadow-sm group-hover:scale-105">
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
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-300">
          <div className="relative w-full max-w-5xl aspect-video bg-black rounded-3xl overflow-hidden shadow-2xl">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 z-10 p-2 bg-white/20 hover:bg-red-500 text-white rounded-full transition-all"
            >
              <X size={24} />
            </button>
            <iframe
              className="w-full h-full"
              src={videoUrl}
              allowFullScreen
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            />
          </div>
        </div>
      )}
    </div>
  );
}
