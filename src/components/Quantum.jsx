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

const PAGE_ID = "quantum";

const INITIAL_DATA = {
  page: {
    title: "Квантын үзэгдэл",
    subtitle: "Физикийн цахим хичээл",
    videoUrl: "https://www.youtube.com/embed/Usu9xZfabPM?si=TeWhH4pCOcshvmnA",
  },
  slider: [
    { image: "https://physic-dmts.vercel.app/pre1.png", alt: "Quantum 1" },
    { image: "https://physic-dmts.vercel.app/pre2.png", alt: "Quantum 2" },
  ],
  experiments: [
    {
      title: "Квант хэмжилт",
      href: "https://phet.colorado.edu/sims/html/quantum-measurement/latest/quantum-measurement_all.html",
      img: "https://phet.colorado.edu/sims/html/quantum-measurement/latest/quantum-measurement-420.png",
    },
    {
      title: "Хар биеийн спектр",
      href: "https://phet.colorado.edu/sims/html/blackbody-spectrum/latest/blackbody-spectrum_all.html",
      img: "https://phet.colorado.edu/sims/html/blackbody-spectrum/latest/blackbody-spectrum-420.png",
    },
    {
      title: "Квант төлөвүүд",
      href: "https://phet.colorado.edu/sims/cheerpj/bound-states/latest/bound-states.html?simulation=bound-states",
      img: "https://phet.colorado.edu/sims/bound-states/bound-states-420.png",
    },
  ],
  theory: [
    {
      title: "Квантын гипотез",
      content: [
        "Энерги нь тасралтгүй биш, харин тодорхой порц буюу квант-аар цацагддаг.",
        "Үндсэн томьёо: E = h · f.",
        "Планкийн тогтмол: h = 6.626 × 10⁻³⁴ Ж·с.",
      ],
    },
    {
      title: "Фотоэффектийн үзэгдэл",
      content: [
        "Гэрэл металлын гадаргад тусах үед электронууд сугаран гарах үзэгдэл.",
        "Эйнштейний тэгшитгэл: h · f = A_out + E_k.",
        "Гарах ажил (A_out) нь металлын төрлөөс хамаарна.",
      ],
    },
    {
      title: "Фотоны импульс",
      content: [
        "Фотон амгалан массгүй боловч импульстэй байна.",
        "Импульс: p = h/λ = E/c.",
        "Энэ үзэгдэл нь гэрлийн бөөмлөг чанарыг (корпускул) баталдаг.",
      ],
    },
    {
      title: "Де Бройлийн долгион",
      content: [
        "Микро биетүүд (электрон г.м) нь бөөм болон долгионы хоёрдогч чанартай.",
        "Долгионы урт: λ = h/p = h/(m · v).",
        "Долгион-бөөмийн дуализм нь квант механикын үндэс юм.",
      ],
    },
    {
      title: "Гэрлийн даралт",
      content: [
        "Гэрэл гадаргуу дээр тусахдаа түүнд хүчээр үйлчилж даралт учруулна.",
        "П.Н.Лебедев гэрлийн даралтыг анх туршилтаар баталсан.",
        "Ойлгогч гадаргуу дээрх даралт нь шингээгч гадаргуугийнхаас 2 дахин их байна.",
      ],
    },
    {
      title: "Фотоны энерги",
      content: [
        "Гэрлийн давтамж (f) ихсэх тусам фотоны энерги нэмэгдэнэ.",
        "Энерги нь долгионы урттай (λ) урвуу хамааралтай: E = (h · c) / λ.",
        "Фотон нь вакуумд үргэлж c = 3 × 10⁸ м/с хурдтай хөдөлнө.",
      ],
    },
    {
      title: "Комптон эффект",
      content: [
        "Рентген туяа электроноос ойхдоо долгионы урт нь ихсэх үзэгдэл.",
        "Энэ нь фотон ба электрон хоорондын мөргөлдөөний үр дүн юм.",
        "Гэрлийн бөөмлөг шинж чанарыг батлах чухал туршилт юм.",
      ],
    },
  ],
};
export default function Quantum() {
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
      console.error("Fetch error:", err);
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
      alert("Презентейшн шинэчлэгдлээ!");
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
      alert("Видео амжилттай солигдлоо!");
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

  const handleAddOrUpdateExp = async () => {
    if (!newExp.title || !newExp.href) return alert("Мэдээлэл дутуу байна!");
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
              className="mr-4 p-2 hover:bg-slate-50 rounded-xl transition-all"
            >
              <ArrowLeft size={20} className="text-[#312C85]" />
            </Link>
            <div className="w-1.5 h-10 bg-[#312C85] rounded-full mr-4"></div>
            <div>
              <h1 className="text-xl md:text-2xl font-black text-slate-900 uppercase tracking-tight">
                {INITIAL_DATA.page.title}
              </h1>
              <p className="text-slate-500 text-[10px] md:text-xs flex items-center gap-1 font-bold uppercase tracking-wider">
                <Users size={12} /> {INITIAL_DATA.page.subtitle}
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 bg-[#312C85] text-white px-4 py-2.5 rounded-xl font-bold shadow-lg shadow-indigo-100 hover:bg-black transition-all"
          >
            <Play size={16} fill="currentColor" />{" "}
            <span className="hidden sm:inline text-sm">Хичээл үзэх</span>
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
              <div className="flex gap-2 animate-in fade-in zoom-in-95 duration-300">
                <input
                  className="flex-1 p-3 rounded-xl border bg-white text-sm outline-none focus:ring-2 focus:ring-indigo-500"
                  value={videoInput}
                  onChange={(e) => setVideoInput(e.target.value)}
                  placeholder="Youtube Embed URL..."
                />
                <button
                  onClick={saveVideo}
                  className="bg-[#312C85] text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 shadow-md"
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
            <div className="bg-white rounded-[2.5rem] overflow-hidden shadow-sm border border-slate-200 aspect-video lg:h-[550px] relative">
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
                  <Settings size={14} /> Презентейшн тохиргоо (Canva Embed)
                </p>
                <div className="flex gap-2">
                  <input
                    className="flex-1 p-3 rounded-xl border bg-white text-sm outline-none focus:ring-2 focus:ring-indigo-500"
                    value={canvaInput}
                    onChange={(e) => setCanvaInput(e.target.value)}
                    placeholder="Canva 'Embed' код..."
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
            <div className="flex justify-between items-center px-2">
              <h3 className="font-black text-slate-800 text-[10px] uppercase tracking-[0.2em] opacity-60">
                Лаборатори
              </h3>
              {isTeacher && (
                <button
                  onClick={() => {
                    setEditingExp(null);
                    setNewExp({ title: "", href: "", img: "" });
                    setShowExpForm(!showExpForm);
                  }}
                  className="p-1.5 bg-[#312C85] text-white rounded-lg hover:rotate-90 transition-transform"
                >
                  {showExpForm ? <X size={16} /> : <Plus size={16} />}
                </button>
              )}
            </div>

            {showExpForm && (
              <div className="bg-white p-4 rounded-2xl border-2 border-dashed border-indigo-200 flex flex-col gap-3 shadow-inner animate-in slide-in-from-top-2">
                <input
                  className="text-sm p-2 border rounded-xl outline-none"
                  placeholder="Туршилтын нэр..."
                  value={newExp.title}
                  onChange={(e) =>
                    setNewExp({ ...newExp, title: e.target.value })
                  }
                />
                <input
                  className="text-sm p-2 border rounded-xl outline-none"
                  placeholder="PhET Линк..."
                  value={newExp.href}
                  onChange={(e) =>
                    setNewExp({ ...newExp, href: e.target.value })
                  }
                />
                <input
                  className="text-sm p-2 border rounded-xl outline-none"
                  placeholder="Зургийн URL..."
                  value={newExp.img}
                  onChange={(e) =>
                    setNewExp({ ...newExp, img: e.target.value })
                  }
                />
                <button
                  onClick={handleAddOrUpdateExp}
                  className="bg-[#312C85] text-white py-2.5 rounded-xl text-sm font-bold flex justify-center items-center gap-2"
                >
                  {loading ? (
                    <Loader2 className="animate-spin" size={16} />
                  ) : (
                    <Save size={16} />
                  )}{" "}
                  Хадгалах
                </button>
              </div>
            )}

            <div className="space-y-4">
              {finalExperiments.map((exp, idx) => (
                <div key={idx} className="relative group">
                  <Link
                    href={exp.href}
                    target="_blank"
                    className="block bg-white rounded-3xl p-2 border border-slate-200 hover:border-[#312C85]/30 hover:shadow-xl transition-all duration-500"
                  >
                    <div className="h-32 rounded-[1.5rem] bg-slate-100 overflow-hidden relative">
                      <img
                        src={
                          exp.img ||
                          "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=400"
                        }
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        alt={exp.title}
                      />
                      <div className="absolute top-3 right-3 p-1.5 bg-white/90 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity">
                        <ExternalLink size={14} />
                      </div>
                    </div>
                    <div className="py-3 px-2 font-black text-sm text-slate-700 truncate group-hover:text-[#312C85]">
                      {exp.title}
                    </div>
                  </Link>
                  {isTeacher && exp._id && (
                    <div className="absolute top-5 right-5 flex gap-1 opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-all">
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
                        className="p-2 bg-blue-500 text-white rounded-xl shadow-lg hover:scale-110"
                      >
                        <Edit2 size={12} />
                      </button>
                      <button
                        onClick={() => deleteItem("experiment", exp._id)}
                        className="p-2 bg-red-500 text-white rounded-xl shadow-lg hover:scale-110"
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

        <section className="bg-white rounded-[3rem] p-8 md:p-12 shadow-sm border border-slate-200 mt-16">
          <div className="flex flex-col items-center mb-12">
            <h2 className="text-3xl md:text-4xl text-slate-900 font-black uppercase tracking-tight text-center">
              Квант Физикийн <span className="text-[#312C85]">Онол</span>
            </h2>
            <div className="w-16 h-1.5 bg-[#312C85] rounded-full mt-4"></div>
          </div>

          {isTeacher && (
            <div className="mb-12 p-8 bg-[#312C85]/5 rounded-[2rem] border-2 border-dashed border-[#312C85]/20 flex flex-col gap-5 max-w-4xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <input
                  className="p-4 rounded-2xl border bg-white font-bold outline-none focus:ring-2 focus:ring-[#312C85]/20"
                  placeholder="Сэдвийн гарчиг..."
                  value={newCard.title}
                  onChange={(e) =>
                    setNewCard({ ...newCard, title: e.target.value })
                  }
                />
                <textarea
                  className="p-4 rounded-2xl border bg-white font-medium outline-none focus:ring-2 focus:ring-[#312C85]/20"
                  placeholder="Агуулга (Шинэ мөрөөр)..."
                  value={newCard.content}
                  onChange={(e) =>
                    setNewCard({ ...newCard, content: e.target.value })
                  }
                />
              </div>
              <button
                onClick={handleAddLesson}
                className="bg-[#312C85] text-white py-4 rounded-2xl font-black uppercase tracking-widest flex justify-center gap-3 hover:bg-black transition-all shadow-lg"
              >
                {loading ? (
                  <Loader2 className="animate-spin" size={20} />
                ) : (
                  <Plus size={20} strokeWidth={3} />
                )}{" "}
                Шинэ онол нэмэх
              </button>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {visibleTheory.map((item, i) => (
              <div
                key={item._id || i}
                className="group relative bg-white rounded-[2.5rem] p-8 md:p-10 border border-slate-100 hover:border-[#312C85]/20 hover:bg-[#312C85]/5 shadow-sm transition-all duration-500"
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
                      className="w-full p-3 text-sm border rounded-2xl outline-none focus:ring-2 focus:ring-indigo-200"
                      rows={5}
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
                        className="flex-1 bg-green-500 text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2"
                      >
                        <Check size={18} strokeWidth={3} /> Хадгалах
                      </button>
                      <button
                        onClick={() => setEditingCardId(null)}
                        className="flex-1 bg-slate-100 py-3 rounded-xl font-bold text-slate-600"
                      >
                        Болих
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <h3 className="text-xl font-black text-[#312C85] mb-6 flex items-center gap-4">
                      <span className="flex items-center justify-center w-10 h-10 rounded-2xl bg-[#312C85] text-white text-sm font-black shadow-lg">
                        {i + 1}
                      </span>
                      {item.title}
                    </h3>
                    <div className="space-y-4">
                      {item.content.map((text, j) => (
                        <p
                          key={j}
                          className="text-slate-600 leading-relaxed border-l-4 border-indigo-50 pl-5 font-medium"
                        >
                          {text}
                        </p>
                      ))}
                    </div>
                    {isTeacher && item._id && (
                      <div className="absolute top-6 right-6 flex gap-2 opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-all">
                        <button
                          onClick={() => {
                            setEditingCardId(item._id);
                            setTempEditData({
                              title: item.title,
                              content: item.content.join("\n"),
                            });
                          }}
                          className="p-2.5 bg-white text-blue-600 rounded-xl shadow-md border border-slate-100 hover:scale-110"
                        >
                          <Edit2 size={18} />
                        </button>
                        <button
                          onClick={() => deleteItem("lessons", item._id)}
                          className="p-2.5 bg-white text-red-500 rounded-xl shadow-md border border-slate-100 hover:bg-red-50 hover:scale-110"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    )}
                  </>
                )}
              </div>
            ))}
          </div>

          <div className="flex justify-center mt-16">
            <button
              onClick={() => setShowAll(!showAll)}
              className="group flex flex-col items-center gap-4 transition-all"
            >
              <div className="bg-slate-100 text-[#312C85] px-10 py-3 rounded-2xl text-[11px] font-black uppercase tracking-[0.2em] group-hover:bg-[#312C85] group-hover:text-white transition-all shadow-sm">
                {showAll ? "Хураах" : "Дэлгэрэнгүй үзэх"}
              </div>
              {showAll ? (
                <ChevronUp size={24} className="text-[#312C85]" />
              ) : (
                <ChevronDown
                  size={24}
                  className="text-[#312C85] animate-bounce"
                />
              )}
            </button>
          </div>
        </section>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 bg-slate-900/95 backdrop-blur-sm">
          <div className="relative w-full max-w-5xl aspect-video bg-black rounded-[2rem] overflow-hidden shadow-2xl border border-white/10">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-6 right-6 z-10 p-3 bg-white/10 hover:bg-red-500 rounded-full text-white transition-all"
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
