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
  Trash2,
  ExternalLink,
  Save,
  Edit2,
  Check,
  Video,
  Beaker,
  ArrowLeft,
  FileText,
  Award,
  BookOpen,
  PlusCircle,
  Loader2,
} from "lucide-react";
import NavAll from "./NavAll";
import Nav from "./Nav";
import { useAuth } from "@/context/AuthContext";

export default function LessonTemplateP({ pageId, config }) {
  const { user } = useAuth();
  const isTeacher = user?.role === "teacher";
  const userClassCode = user?.classCode || "";

  // --- States ---
  const [displayUrl, setDisplayUrl] = useState("");
  const [videoUrl, setVideoUrl] = useState(config?.page?.videoUrl || "");
  const [dbExperiments, setDbExperiments] = useState([]);
  const [dynamicLessons, setDynamicLessons] = useState([]);
  const [dbTests, setDbTests] = useState([]);
  const [dbCards, setDbCards] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showAll, setShowAll] = useState(false);
  const [loading, setLoading] = useState(true);

  // --- Admin States ---
  const [activePanel, setActivePanel] = useState(null);
  const [videoInput, setVideoInput] = useState("");
  const [canvaInput, setCanvaInput] = useState("");
  const [newExp, setNewExp] = useState({ title: "", href: "", img: "" });
  const [newCard, setNewCard] = useState({ question: "", answer: "" });
  const [newTheory, setNewTheory] = useState({ title: "", content: "" });
  const [newTest, setNewTest] = useState({
    question: "",
    options: ["", "", ""],
    answer: "",
  });

  const [editIds, setEditIds] = useState({
    test: null,
    card: null,
    exp: null,
    theory: null,
  });

  // --- Data Fetching ---
  const fetchData = async () => {
    if (!pageId || !userClassCode) return;
    setLoading(true);
    try {
      // Анги болон Хичээлийн ID-аар шүүнэ
      const query = `?pageId=${pageId}&classCode=${userClassCode}`;

      const [canvaRes, expRes, lessonRes, videoRes, testRes, cardRes] =
        await Promise.all([
          fetch(`/api/presentation${query}`),
          fetch(`/api/experiment${query}`),
          fetch(`/api/lessons${query}`),
          fetch(`/api/video${query}`),
          fetch(`/api/test${query}`),
          fetch(`/api/card${query}`),
        ]);

      if (canvaRes.ok) {
        const d = await canvaRes.json();
        setDisplayUrl(d?.url || "");
        setCanvaInput(d?.url || "");
      }
      if (videoRes.ok) {
        const d = await videoRes.json();
        setVideoUrl(d?.url || config?.page?.videoUrl || "");
        setVideoInput(d?.url || "");
      }
      if (expRes.ok) setDbExperiments(await expRes.json());
      if (lessonRes.ok) setDynamicLessons(await lessonRes.json());
      if (testRes.ok) setDbTests(await testRes.json());
      if (cardRes.ok) setDbCards(await cardRes.json());
    } catch (err) {
      console.error("Data fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    setShowAll(false);
    setActivePanel(null);
  }, [pageId, userClassCode]);

  // --- Action Handlers ---
  const handleSave = async (type, data, editId = null) => {
    // 1. Ангийн код заавал байх ёстой
    let finalData = { ...data, classCode: userClassCode, pageId: pageId };

    // 2. Canva Link цэвэрлэх
    if (type === "presentation" && data.url && data.url.includes("<iframe")) {
      const srcMatch = data.url.match(/src="([^"]+)"/);
      if (srcMatch && srcMatch[1]) {
        finalData.url = srcMatch[1];
      }
    }

    // 3. API замыг тодорхойлох
    let apiPath = type;
    if (type === "cards") apiPath = "card";
    if (type === "exp") apiPath = "experiment";
    if (type === "theory") apiPath = "lessons";

    try {
      const body = editId ? { ...finalData, id: editId } : finalData;

      const res = await fetch(`/api/${apiPath}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (res.ok) {
        alert("Амжилттай хадгалагдлаа!");
        fetchData();
        resetForm(type);
      } else {
        alert("Хадгалахад алдаа гарлаа");
      }
    } catch (err) {
      alert("Сервертэй холбогдож чадсангүй");
    }
  };

  const resetForm = (type) => {
    setActivePanel(null);
    setEditIds((prev) => ({ ...prev, [type]: null }));
    if (type === "test")
      setNewTest({ question: "", options: ["", "", ""], answer: "" });
    if (type === "cards" || type === "card")
      setNewCard({ question: "", answer: "" });
    if (type === "experiment" || type === "exp")
      setNewExp({ title: "", href: "", img: "" });
    if (type === "lessons" || type === "theory")
      setNewTheory({ title: "", content: "" });
  };

  const deleteItem = async (type, id) => {
    if (!confirm("Устгах уу?")) return;
    let apiPath = type;
    if (type === "cards") apiPath = "card";

    const res = await fetch(`/api/${apiPath}?id=${id}`, { method: "DELETE" });
    if (res.ok) fetchData();
  };

  const handleEdit = (type, item) => {
    setActivePanel(type);
    if (type === "test") {
      setEditIds((p) => ({ ...p, test: item._id }));
      setNewTest({
        question: item.question,
        options: item.options,
        answer: item.answer,
      });
    } else if (type === "card") {
      setEditIds((p) => ({ ...p, card: item._id }));
      setNewCard({ question: item.question, answer: item.answer });
    } else if (type === "exp") {
      setEditIds((p) => ({ ...p, exp: item._id }));
      setNewExp({ title: item.title, href: item.href, img: item.img });
    } else if (type === "theory") {
      setEditIds((p) => ({ ...p, theory: item._id }));
      setNewTheory({
        title: item.title,
        content: Array.isArray(item.content)
          ? item.content.join("\n")
          : item.content,
      });
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (!config || !config.page) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC]">
        <Loader2 className="animate-spin text-[#312C85]" size={40} />
      </div>
    );
  }

  return (
    <div className="min-h-screen px-4 md:px-8 pb-16 bg-[#F8FAFC]">
      <NavAll />

      {/* --- Header Section --- */}
      <section className="pt-24 md:pt-28">
        <div className="flex flex-col xl:flex-row bg-white py-4 px-5 rounded-2xl shadow-sm justify-between items-center border border-slate-200 mb-6 gap-4">
          <div className="flex items-center w-full xl:w-auto">
            <Link
              href="/indexP"
              className="mr-4 p-2 hover:bg-slate-100 rounded-xl transition-all"
            >
              <ArrowLeft className="text-[#312C85]" size={24} />
            </Link>
            <div className="w-1.5 h-10 bg-[#312C85] rounded-full mr-4"></div>
            <div>
              <h1 className="text-xl md:text-2xl font-black text-slate-900 uppercase leading-none">
                {config.page.title}
              </h1>
              <p className="text-slate-400 text-[10px] md:text-xs font-black flex items-center gap-1 uppercase tracking-tighter mt-1">
                <Users size={12} /> {config.page.subtitle} | {userClassCode}{" "}
                АНГИ
              </p>
            </div>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-3 w-full xl:w-auto">
            <Link
              href={`/testPhysics?pageId=${pageId}`}
              className="bg-[#312C85] text-white px-6 py-2.5 rounded-xl font-black shadow-md text-xs flex items-center gap-2 hover:bg-black transition-all"
            >
              <Award size={16} /> ТЕСТ ӨГӨХ
            </Link>
            <Link
              href={`/cartPhysics?pageId=${pageId}`}
              className="bg-[#312C85] text-white px-6 py-2.5 rounded-xl font-black shadow-md text-xs flex items-center gap-2 hover:bg-black transition-all"
            >
              <BookOpen size={16} /> КАРТ ҮЗЭХ
            </Link>
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-[#312C85] text-white px-6 py-2.5 rounded-xl font-black shadow-md text-xs flex items-center gap-2 hover:bg-black transition-all"
            >
              <Play size={16} fill="currentColor" /> ҮЗЭХ
            </button>
          </div>
        </div>
      </section>

      <Nav />

      {/* --- Main Content --- */}
      <div className="max-w-[1400px] mx-auto mt-6">
        {/* --- Teacher Admin Panels --- */}
        {isTeacher && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
            {/* Видео удирдах */}
            <div className="bg-white p-4 rounded-2xl border border-[#312C85]/20 shadow-sm">
              <div className="flex justify-between items-center mb-2">
                <p className="text-[11px] font-black text-[#312C85] uppercase flex items-center gap-2">
                  <Video size={16} /> Видео
                </p>
                <button
                  onClick={() =>
                    setActivePanel(activePanel === "video" ? null : "video")
                  }
                  className="text-[10px] font-bold border border-[#312C85]/30 text-[#312C85] px-2 py-1 rounded-md"
                >
                  Засах
                </button>
              </div>
              {activePanel === "video" && (
                <div className="flex gap-1 animate-in slide-in-from-top-1 duration-200">
                  <input
                    className="flex-1 p-2 rounded-lg border text-xs"
                    value={videoInput}
                    onChange={(e) => setVideoInput(e.target.value)}
                    placeholder="Youtube URL..."
                  />
                  <button
                    onClick={() => handleSave("video", { url: videoInput })}
                    className="bg-[#312C85] text-white p-2 rounded-lg"
                  >
                    <Save size={16} />
                  </button>
                </div>
              )}
            </div>

            {/* Тест удирдах */}
            <div className="bg-white p-4 rounded-2xl border border-[#312C85]/20 shadow-sm">
              <div className="flex justify-between items-center mb-2">
                <p className="text-[11px] font-black text-[#312C85] uppercase flex items-center gap-2">
                  <FileText size={16} /> Тест
                </p>
                <button
                  onClick={() =>
                    setActivePanel(activePanel === "test" ? null : "test")
                  }
                  className="text-[10px] font-bold border border-[#312C85]/30 text-[#312C85] px-2 py-1 rounded-md"
                >
                  Нэмэх
                </button>
              </div>
              {activePanel === "test" && (
                <div className="space-y-2 animate-in slide-in-from-top-1">
                  <input
                    className="w-full p-2 rounded-lg border text-xs"
                    placeholder="Асуулт..."
                    value={newTest.question}
                    onChange={(e) =>
                      setNewTest({ ...newTest, question: e.target.value })
                    }
                  />
                  {newTest.options.map((opt, idx) => (
                    <div key={idx} className="flex gap-1">
                      <input
                        className="flex-1 p-1.5 rounded-md border text-[10px]"
                        placeholder={`Хувилбар ${idx + 1}`}
                        value={opt}
                        onChange={(e) => {
                          const ops = [...newTest.options];
                          ops[idx] = e.target.value;
                          setNewTest({ ...newTest, options: ops });
                        }}
                      />
                      <button
                        onClick={() => setNewTest({ ...newTest, answer: opt })}
                        className={`p-1.5 rounded-md border ${newTest.answer === opt && opt !== "" ? "bg-[#312C85] text-white" : "bg-white text-slate-300"}`}
                      >
                        <Check size={14} />
                      </button>
                    </div>
                  ))}
                  <button
                    onClick={() => handleSave("test", newTest, editIds.test)}
                    className="w-full bg-[#312C85] text-white py-2 rounded-lg text-[10px] font-black uppercase"
                  >
                    Хадгалах
                  </button>
                </div>
              )}
              <div className="mt-2 max-h-32 overflow-y-auto border-t pt-2 space-y-1 custom-scrollbar">
                {dbTests.map((t) => (
                  <div
                    key={t._id}
                    className="flex justify-between items-center bg-slate-50 p-1.5 rounded-lg border border-slate-100"
                  >
                    <span className="text-[9px] truncate w-24 font-bold text-slate-600">
                      {t.question}
                    </span>
                    <div className="flex gap-1">
                      <button
                        onClick={() => handleEdit("test", t)}
                        className="text-[#312C85]"
                      >
                        <Edit2 size={10} />
                      </button>
                      <button
                        onClick={() => deleteItem("test", t._id)}
                        className="text-red-500"
                      >
                        <Trash2 size={10} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Карт удирдах */}
            <div className="bg-white p-4 rounded-2xl border border-[#312C85]/20 shadow-sm">
              <div className="flex justify-between items-center mb-2">
                <p className="text-[11px] font-black text-[#312C85] uppercase flex items-center gap-2">
                  <PlusCircle size={16} /> Карт
                </p>
                <button
                  onClick={() =>
                    setActivePanel(activePanel === "card" ? null : "card")
                  }
                  className="text-[10px] font-bold border border-[#312C85]/30 text-[#312C85] px-2 py-1 rounded-md"
                >
                  Нэмэх
                </button>
              </div>
              {activePanel === "card" && (
                <div className="space-y-2 animate-in slide-in-from-top-1">
                  <input
                    className="w-full p-2 rounded-lg border text-xs"
                    placeholder="Асуулт..."
                    value={newCard.question}
                    onChange={(e) =>
                      setNewCard({ ...newCard, question: e.target.value })
                    }
                  />
                  <textarea
                    className="w-full p-2 rounded-lg border text-xs h-12"
                    placeholder="Хариулт..."
                    value={newCard.answer}
                    onChange={(e) =>
                      setNewCard({ ...newCard, answer: e.target.value })
                    }
                  />
                  <button
                    onClick={() => handleSave("cards", newCard, editIds.card)}
                    className="w-full bg-slate-800 text-white py-2 rounded-lg text-[10px] font-black uppercase"
                  >
                    Хадгалах
                  </button>
                </div>
              )}
              <div className="mt-2 max-h-32 overflow-y-auto border-t pt-2 space-y-1 custom-scrollbar">
                {dbCards.map((c) => (
                  <div
                    key={c._id}
                    className="flex justify-between items-center bg-slate-50 p-1.5 rounded-lg border border-slate-100"
                  >
                    <span className="text-[9px] truncate w-24 font-bold text-slate-600">
                      {c.question}
                    </span>
                    <div className="flex gap-1">
                      <button
                        onClick={() => handleEdit("card", c)}
                        className="text-[#312C85]"
                      >
                        <Edit2 size={10} />
                      </button>
                      <button
                        onClick={() => deleteItem("cards", c._id)}
                        className="text-red-500"
                      >
                        <Trash2 size={10} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Туршилт удирдах */}
            <div className="bg-white p-4 rounded-2xl border border-[#312C85]/20 shadow-sm">
              <div className="flex justify-between items-center mb-2">
                <p className="text-[11px] font-black text-[#312C85] uppercase flex items-center gap-2">
                  <Beaker size={16} /> Туршилт
                </p>
                <button
                  onClick={() =>
                    setActivePanel(activePanel === "exp" ? null : "exp")
                  }
                  className="text-[10px] font-bold border border-[#312C85]/30 text-[#312C85] px-2 py-1 rounded-md"
                >
                  Нэмэх
                </button>
              </div>
              {activePanel === "exp" && (
                <div className="space-y-2 animate-in slide-in-from-top-1">
                  <input
                    className="w-full p-1.5 rounded border text-[10px]"
                    placeholder="Нэр..."
                    value={newExp.title}
                    onChange={(e) =>
                      setNewExp({ ...newExp, title: e.target.value })
                    }
                  />
                  <input
                    className="w-full p-1.5 rounded border text-[10px]"
                    placeholder="URL..."
                    value={newExp.href}
                    onChange={(e) =>
                      setNewExp({ ...newExp, href: e.target.value })
                    }
                  />
                  <input
                    className="w-full p-1.5 rounded border text-[10px]"
                    placeholder="Зураг URL..."
                    value={newExp.img}
                    onChange={(e) =>
                      setNewExp({ ...newExp, img: e.target.value })
                    }
                  />
                  <button
                    onClick={() => handleSave("exp", newExp, editIds.exp)}
                    className="w-full bg-[#312C85] text-white py-2 rounded text-[10px] font-black uppercase"
                  >
                    Хадгалах
                  </button>
                </div>
              )}
            </div>

            {/* Онол удирдах */}
            <div className="bg-white p-4 rounded-2xl border border-[#312C85]/20 shadow-sm">
              <div className="flex justify-between items-center mb-2">
                <p className="text-[11px] font-black text-[#312C85] uppercase flex items-center gap-2">
                  <BookOpen size={16} /> Онол
                </p>
                <button
                  onClick={() =>
                    setActivePanel(activePanel === "theory" ? null : "theory")
                  }
                  className="text-[10px] font-bold border border-[#312C85]/30 text-[#312C85] px-2 py-1 rounded-md"
                >
                  Нэмэх
                </button>
              </div>
              {activePanel === "theory" && (
                <div className="space-y-2 animate-in slide-in-from-top-1">
                  <input
                    className="w-full p-1.5 rounded border text-[10px]"
                    placeholder="Гарчиг..."
                    value={newTheory.title}
                    onChange={(e) =>
                      setNewTheory({ ...newTheory, title: e.target.value })
                    }
                  />
                  <textarea
                    className="w-full p-1.5 rounded border text-[10px] h-12"
                    placeholder="Агуулга..."
                    value={newTheory.content}
                    onChange={(e) =>
                      setNewTheory({ ...newTheory, content: e.target.value })
                    }
                  />
                  <button
                    onClick={() =>
                      handleSave(
                        "theory",
                        {
                          title: newTheory.title,
                          content: newTheory.content.split("\n"),
                        },
                        editIds.theory,
                      )
                    }
                    className="w-full bg-slate-800 text-white py-2 rounded text-[10px] font-black uppercase"
                  >
                    Хадгалах
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* --- Presentation & Experiments Row --- */}
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="w-full lg:w-[75%] space-y-4">
            <div className="bg-white rounded-[2rem] overflow-hidden shadow-sm border border-slate-200 aspect-video relative group">
              {displayUrl ? (
                <iframe
                  src={displayUrl}
                  className="w-full h-full border-none"
                  allowFullScreen
                />
              ) : (
                <Slider slides={config.slider} />
              )}
            </div>
            {isTeacher && (
              <div className="bg-white p-4 rounded-2xl border border-[#312C85]/20 flex gap-2 shadow-sm items-center">
                <input
                  className="flex-1 p-3 rounded-xl border bg-slate-50 text-xs outline-none focus:border-[#312C85]"
                  value={canvaInput}
                  onChange={(e) => setCanvaInput(e.target.value)}
                  placeholder="Canva HTML эсвэл Link хуулна уу..."
                />
                <button
                  onClick={() =>
                    handleSave("presentation", { url: canvaInput })
                  }
                  className="bg-[#312C85] text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-black transition-all"
                >
                  <Save size={18} /> Хадгалах
                </button>
              </div>
            )}
          </div>

          {/* Experiments Sidebar */}
          <div className="w-full lg:w-[25%] flex flex-col gap-4">
            <h3 className="font-black text-slate-800 text-[10px] uppercase tracking-widest opacity-60 flex items-center gap-2 px-1">
              <Beaker size={14} /> Туршилтууд
            </h3>
            <div className="grid grid-cols-1 gap-4">
              {[...dbExperiments]
                .reverse()
                .concat(config.experiments)
                .slice(0, 3)
                .map((exp, idx) => (
                  <div
                    key={idx}
                    className="relative bg-white rounded-2xl p-2 border border-slate-100 shadow-sm group hover:border-[#312C85]/30 transition-all"
                  >
                    {isTeacher && exp._id && (
                      <div className="absolute top-2 left-2 z-10 flex gap-1">
                        <button
                          onClick={() => handleEdit("exp", exp)}
                          className="p-1 bg-white/90 rounded shadow-sm text-[#312C85] hover:bg-white"
                        >
                          <Edit2 size={10} />
                        </button>
                        <button
                          onClick={() => deleteItem("experiment", exp._id)}
                          className="p-1 bg-white/90 rounded shadow-sm text-red-500 hover:bg-white"
                        >
                          <Trash2 size={10} />
                        </button>
                      </div>
                    )}
                    <Link href={exp.href} target="_blank">
                      <div className="h-28 rounded-xl bg-slate-50 overflow-hidden relative">
                        <img
                          src={exp.img}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                          alt={exp.title}
                        />
                        <div className="absolute top-2 right-2 p-1.5 bg-white/90 rounded-lg">
                          <ExternalLink size={14} className="text-[#312C85]" />
                        </div>
                      </div>
                      <div className="py-2 px-1 font-bold text-[12px] text-slate-700 truncate">
                        {exp.title}
                      </div>
                    </Link>
                  </div>
                ))}
            </div>
          </div>
        </div>

        {/* --- Theory Section --- */}
        <section className="bg-white rounded-[2.5rem] p-6 md:p-12 shadow-sm border border-slate-100 mt-12 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#312C85]/5 rounded-bl-full" />
          <h2 className="text-center text-xl md:text-3xl font-black uppercase mb-12 text-[#312C85] tracking-tighter">
            Онолын Мэдээлэл
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 relative z-10">
            {[...dynamicLessons]
              .reverse()
              .concat(config.theory)
              .slice(0, showAll ? 99 : 4)
              .map((item, i) => (
                <div
                  key={i}
                  className="relative bg-white rounded-3xl p-6 border border-slate-50 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-base font-black text-[#312C85] flex items-center gap-3">
                      <span className="min-w-[32px] h-8 rounded-xl bg-[#312C85] text-white flex items-center justify-center text-xs font-black">
                        {i + 1}
                      </span>
                      {item.title}
                    </h3>
                    {isTeacher && item._id && (
                      <div className="flex gap-1">
                        <button
                          onClick={() => handleEdit("theory", item)}
                          className="p-1.5 text-[#312C85] bg-slate-50 rounded-lg hover:bg-white"
                        >
                          <Edit2 size={14} />
                        </button>
                        <button
                          onClick={() => deleteItem("lessons", item._id)}
                          className="p-1.5 text-red-500 bg-slate-50 rounded-lg hover:bg-white"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    )}
                  </div>
                  <div className="space-y-2">
                    {(Array.isArray(item.content)
                      ? item.content
                      : [item.content]
                    ).map((text, j) => (
                      <p
                        key={j}
                        className="text-sm text-slate-600 border-l-2 border-[#312C85]/10 pl-4 leading-relaxed font-medium"
                      >
                        {text}
                      </p>
                    ))}
                  </div>
                </div>
              ))}
          </div>
          <div className="flex justify-center mt-12">
            <button
              onClick={() => setShowAll(!showAll)}
              className="flex flex-col items-center gap-1 group"
            >
              <div className="bg-white border border-[#312C85]/30 text-[#312C85] px-10 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest group-hover:bg-[#312C85] group-hover:text-white transition-all shadow-sm">
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

      {/* --- Video Modal --- */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-[1000] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md"
          onClick={() => setIsModalOpen(false)}
        >
          <div
            className="relative w-full max-w-5xl aspect-video bg-black rounded-3xl overflow-hidden shadow-2xl border border-white/10"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 z-10 p-3 bg-white/10 hover:bg-red-500 text-white rounded-full border border-white/20 transition-all active:scale-90"
            >
              <X size={24} />
            </button>
            <iframe
              className="w-full h-full"
              src={videoUrl}
              allowFullScreen
              allow="autoplay; encrypted-media"
            />
          </div>
        </div>
      )}
    </div>
  );
}
