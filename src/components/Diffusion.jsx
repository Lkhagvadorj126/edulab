"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Slider from "../components/Slider"; // Замыг өөрийн бүтцээр шалгаарай
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
} from "lucide-react"; // lucide-react-аас import-оо шалгаарай
import NavAll from "../components/NavAll";
import NavH from "../components/NavH";
import { useAuth } from "@/context/AuthContext";

const PAGE_ID = "diffusion";

const INITIAL_DATA = {
  page: {
    title: "Диффуз",
    subtitle: "Физикийн цахим хичээл",
    videoUrl: "https://www.youtube.com/embed/c_IYK8sy0QA",
  },
  slider: [
    { image: "https://physic-dmts.vercel.app/pre1.png", alt: "Diffusion 1" },
    { image: "https://physic-dmts.vercel.app/pre2.png", alt: "Diffusion 2" },
  ],
  experiments: [
    {
      title: "Диффуз",
      href: "https://phet.colorado.edu/sims/html/diffusion/latest/diffusion_all.html",
      img: "https://phet.colorado.edu/sims/html/diffusion/latest/diffusion-420.png",
    },
    {
      title: "Хийн танилцуулга",
      href: "https://phet.colorado.edu/sims/html/gases-intro/latest/gases-intro_all.html",
      img: "https://phet.colorado.edu/sims/html/gases-intro/latest/gases-intro-420.png",
    },
    {
      title: "Хийн шинж чанар",
      href: "https://phet.colorado.edu/sims/html/gas-properties/latest/gas-properties_all.html",
      img: "https://phet.colorado.edu/sims/html/gas-properties/latest/gas-properties-420.png",
    },
  ],
  theory: [
    {
      title: " Диффуз гэж юу вэ?",
      content: [
        "Бодисын молекулууд өөрөө аяндаа холилдож, концентраци ихтэй хэсгээс багатай хэсэг рүү шилжих үзэгдэл.",
        "Энэ нь молекулуудын эмх замбараагүй дулааны хөдөлгөөний үр дүн юм.",
      ],
    },
    {
      title: " Броуны хөдөлгөөн",
      content: [
        "Шингэн эсвэл хий доторх жижиг хэсгүүдийн зогсолтгүй, замбараагүй хөдөлгөөн.",
        "Диффуз явагдах үндсэн шалтгаан буюу молекул байгааг батлах шууд бус баримт.",
      ],
    },
    {
      title: " Температурын хамаарал",
      content: [
        "Температур нэмэгдэхэд молекулуудын хөдөлгөөний кинетик энерги ихэсдэг.",
        "Үүний үр дүнд молекулууд хурдан хөдөлж, диффуз явагдах хугацаа богиносоно.",
      ],
    },
    {
      title: " Бодисын төлөв ба Диффуз",
      content: [
        "Хий: Молекул хоорондын зай их тул хамгийн хурдан явагдана.",
        "Шингэн: Дунд зэргийн хурдтай.",
        "Хатуу бие: Молекул хоорондын холбоос чанга тул маш удаан (хэдэн жилээр) явагдана.",
      ],
    },
    {
      title: " Фикийн нэгдүгээр хууль",
      content: [
        "Диффузын урсгал нь концентрацийн градиентад шууд пропорциональ байна.",
        "Томьёо: J = -D * (dc/dx) [D - диффузын коэффициент].",
      ],
    },
    {
      title: " Молекул Кинетик Онол (МКО)",
      content: [
        "1. Бодис молекулаас тогтоно. 2. Молекул зогсолтгүй хөдөлнө. 3. Молекулууд хоорондоо харилцан үйлчлэлцэнэ.",
      ],
    },
    {
      title: " Молекулын дундаж кинетик энерги",
      content: [
        "Температур бол молекулуудын хөдөлгөөний эрчмийг илэрхийлэгч хэмжигдэхүүн юм.",
        "Томьёо: Eₖ = (3/2)kT [k - Больцманы тогтмол].",
      ],
    },
  ],
};

export default function Diffusion() {
  const { user } = useAuth();
  const isTeacher = user?.role === "teacher";

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
        const d = await canvaRes.json();
        if (d.url) {
          setDisplayUrl(d.url);
          setCanvaInput(d.url);
        }
      }
      if (videoRes.ok) {
        const d = await videoRes.json();
        if (d.url) {
          setVideoUrl(d.url);
          setVideoInput(d.url);
        }
      }
      if (expRes.ok) setDbExperiments(await expRes.json());
      if (lessonRes.ok) setDynamicLessons(await lessonRes.json());
    } catch (err) {
      console.error("Data fetch error:", err);
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
      alert("Хадгалагдлаа!");
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
    if (!newCard.title || !newCard.content)
      return alert("Гарчиг болон агуулга хоосон байна!");
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

  const deleteItem = async (type, id) => {
    if (!confirm("Устгахдаа итгэлтэй байна уу?")) return;
    await fetch(`/api/${type}?id=${id}`, { method: "DELETE" });
    fetchData();
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
        <div className="flex bg-white py-4 px-5 rounded-2xl shadow-sm justify-between items-center border border-slate-200 mb-6">
          <div className="flex items-center">
            <Link
              href="/indexH"
              className="mr-4 p-2 hover:bg-slate-100 rounded-xl transition-all"
            >
              <ArrowLeft className="text-[#312C85]" size={24} />
            </Link>
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
            className="flex items-center gap-2 bg-[#312C85] text-white px-4 py-2 rounded-xl font-bold shadow-md hover:bg-indigo-700 transition-all"
          >
            <Play size={16} fill="currentColor" />{" "}
            <span className="hidden sm:inline">Видео үзэх</span>
          </button>
        </div>
      </section>

      <NavH />

      <div className="max-w-[1400px] mx-auto mt-6">
        {isTeacher && (
          <div className="mb-6 bg-indigo-50/30 p-4 rounded-2xl border border-indigo-100 flex flex-col gap-3">
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
              <div className="flex gap-2">
                <input
                  className="flex-1 p-3 rounded-xl border bg-white text-sm outline-none focus:ring-2 focus:ring-indigo-500"
                  value={videoInput}
                  onChange={(e) => setVideoInput(e.target.value)}
                  placeholder="Youtube линк..."
                />
                <button
                  onClick={saveVideo}
                  disabled={loading}
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
                <p className="text-xs font-bold text-[#312C85] flex items-center gap-2 uppercase tracking-wider">
                  <Settings size={14} /> Презентейшн солих:
                </p>
                <div className="flex gap-2">
                  <input
                    className="flex-1 p-3 rounded-xl border bg-white text-sm outline-none focus:ring-2 focus:ring-indigo-500"
                    value={canvaInput}
                    onChange={(e) => setCanvaInput(e.target.value)}
                    placeholder="Embed код эсвэл линк..."
                  />
                  <button
                    onClick={saveCanva}
                    disabled={loading}
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
              <h3 className="font-bold text-slate-800 text-xs uppercase tracking-widest opacity-60">
                Виртуал лаборатори
              </h3>
              {isTeacher && (
                <button
                  onClick={() => {
                    setEditingExp(null);
                    setNewExp({ title: "", href: "", img: "" });
                    setShowExpForm(!showExpForm);
                  }}
                  className="p-1.5 bg-[#312C85] text-white rounded-lg transition-transform active:scale-95"
                >
                  {showExpForm ? <X size={16} /> : <Plus size={16} />}
                </button>
              )}
            </div>

            {showExpForm && isTeacher && (
              <div className="bg-white p-4 rounded-2xl border-2 border-dashed border-indigo-200 flex flex-col gap-3 animate-in fade-in zoom-in duration-200">
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
                  placeholder="Зураг (Link)..."
                  value={newExp.img}
                  onChange={(e) =>
                    setNewExp({ ...newExp, img: e.target.value })
                  }
                />
                <button
                  onClick={handleAddOrUpdateExp}
                  disabled={loading}
                  className="bg-[#312C85] text-white py-2 rounded-xl text-sm font-bold active:scale-95 transition-all"
                >
                  {editingExp ? "Засах" : "Нэмэх"}
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
                          "https://phet.colorado.edu/sims/html/diffusion/latest/diffusion-420.png"
                        }
                        className="w-full h-full object-cover group-hover:scale-105 transition-all duration-500"
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
                    <div className="absolute top-4 right-4 flex gap-1 lg:opacity-0 lg:group-hover:opacity-100 transition-all">
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

        {/* Theory Section */}
        <section className="bg-white rounded-3xl p-6 md:p-10 shadow-sm border border-slate-200 mt-12">
          <div className="flex flex-col items-center mb-10">
            <h2 className="text-2xl md:text-3xl text-slate-900 font-black uppercase">
              Онолын мэдээлэл
            </h2>
            <div className="w-16 h-1 bg-[#312C85] rounded-full mt-2"></div>
          </div>

          {isTeacher && (
            <div className="mb-10 p-6 bg-indigo-50/30 rounded-2xl border-2 border-dashed border-indigo-200 flex flex-col gap-4">
              <h4 className="text-xs font-bold text-[#312C85] uppercase tracking-widest">
                Шинэ карт нэмэх
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  className="p-3 rounded-xl border bg-white outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Гарчиг..."
                  value={newCard.title}
                  onChange={(e) =>
                    setNewCard({ ...newCard, title: e.target.value })
                  }
                />
                <textarea
                  className="p-3 rounded-xl border bg-white outline-none focus:ring-2 focus:ring-indigo-500 min-h-[100px]"
                  placeholder="Агуулга (Мөр бүрийг шинэ догол болгоно)..."
                  value={newCard.content}
                  onChange={(e) =>
                    setNewCard({ ...newCard, content: e.target.value })
                  }
                />
              </div>
              <button
                onClick={handleAddLesson}
                disabled={loading}
                className="bg-[#312C85] text-white py-3 rounded-xl font-bold flex justify-center gap-2 active:scale-[0.98] transition-all"
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
                className="relative group bg-white rounded-2xl p-6 border border-slate-100 hover:border-indigo-200 transition-all shadow-sm"
              >
                {editingCardId === item._id ? (
                  <div className="space-y-4 animate-in fade-in duration-300">
                    <input
                      className="w-full p-2 font-bold border-b focus:border-indigo-500 outline-none"
                      value={tempEditData.title}
                      onChange={(e) =>
                        setTempEditData({
                          ...tempEditData,
                          title: e.target.value,
                        })
                      }
                    />
                    <textarea
                      className="w-full p-2 text-sm border rounded-lg min-h-[120px]"
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
                        className="flex-1 bg-green-500 text-white py-2 rounded-lg font-bold flex items-center justify-center gap-2"
                      >
                        <Check size={16} /> Хадгалах
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
                    <h3 className="text-lg font-bold text-[#312C85] mb-4 pr-16 flex items-center gap-3">
                      <span className="min-w-[32px] h-8 rounded-lg bg-indigo-50 flex items-center justify-center text-sm font-bold text-[#312C85]">
                        {i + 1}
                      </span>
                      {item.title}
                    </h3>
                    <div className="space-y-3">
                      {item.content.map((text, j) => (
                        <p
                          key={j}
                          className="text-sm text-slate-600 border-l-2 border-indigo-100 pl-3 leading-relaxed"
                        >
                          {text}
                        </p>
                      ))}
                    </div>
                    {isTeacher && item._id && (
                      <div className="absolute top-4 right-4 flex gap-1 lg:opacity-0 lg:group-hover:opacity-100 transition-all">
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
              className="flex flex-col items-center gap-2 group"
            >
              <div className="bg-slate-100 text-slate-600 px-8 py-2 rounded-full text-xs font-bold uppercase tracking-widest group-hover:bg-[#312C85] group-hover:text-white transition-all">
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
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-300">
          <div className="relative w-full max-w-4xl aspect-video bg-black rounded-3xl overflow-hidden shadow-2xl">
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
              title="Video Lesson"
            />
          </div>
        </div>
      )}
    </div>
  );
}
