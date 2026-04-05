"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
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
  AlertCircle,
  HelpCircle,
  Layers,
} from "lucide-react";

// Components
import Slider from "./Slider";
import NavAll from "./NavAll";
import NavH from "./NavH";
import { useAuth } from "@/context/AuthContext";

export default function LessonTemplate({ pageId, config }) {
  const { user } = useAuth();
  const isTeacher = user?.role === "teacher";
  const userClassCode = user?.classCode || "10B";

  // --- ҮНДСЭН STATE-ҮҮД ---
  const [displayUrl, setDisplayUrl] = useState("");
  const [videoUrl, setVideoUrl] = useState(config?.page?.videoUrl || "");
  const [dbExperiments, setDbExperiments] = useState([]);
  const [dynamicLessons, setDynamicLessons] = useState([]);
  const [dbTests, setDbTests] = useState([]);
  const [dbCards, setDbCards] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showAll, setShowAll] = useState(false);
  const [loading, setLoading] = useState(true);

  // --- МЭДЭГДЛИЙН (STATUS MODAL) ---
  const [statusModal, setStatusModal] = useState({
    show: false,
    message: "",
    type: "success",
  });

  // --- УСТГАХ БАТАЛГААЖУУЛАХ (CONFIRM MODAL) ---
  const [confirmModal, setConfirmModal] = useState({
    show: false,
    type: "",
    id: null,
  });

  // --- ADMIN PANEL STATE-ҮҮД ---
  const [activePanel, setActivePanel] = useState(null);
  const [videoInput, setVideoInput] = useState("");
  const [canvaInput, setCanvaInput] = useState("");

  const [newExp, setNewExp] = useState({ title: "", href: "", img: "" });
  const [newCard, setNewCard] = useState({ question: "", answer: "" });
  const [newTheory, setNewTheory] = useState({ title: "", content: "" });

  // Тестийн answer-ийг индексээр (0, 1, 2) хадгална
  const [newTest, setNewTest] = useState({
    question: "",
    options: ["", "", ""],
    answer: null,
  });

  const [editIds, setEditIds] = useState({
    test: null,
    card: null,
    exp: null,
    theory: null,
  });

  // --- ТУСЛАХ ФУНКЦУУД ---
  const closeStatus = () => setStatusModal({ ...statusModal, show: false });
  const closeConfirm = () =>
    setConfirmModal({ show: false, type: "", id: null });

  const showStatus = (message, type = "success") => {
    setStatusModal({ show: true, message, type });
  };

  // --- ӨГӨГДӨЛ ТАТАХ ---
  const fetchData = useCallback(async () => {
    if (!pageId || !userClassCode) return;
    setLoading(true);
    try {
      const query = `?pageId=${pageId}&classCode=${userClassCode}`;
      const [canvaRes, expRes, lessonRes, testRes, cardRes, videoRes] =
        await Promise.all([
          fetch(`/api/presentation${query}`),
          fetch(`/api/experiment${query}`),
          fetch(`/api/lessons${query}`),
          fetch(`/api/test${query}`),
          fetch(`/api/card${query}`),
          fetch(`/api/video${query}`),
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
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  }, [pageId, userClassCode, config?.page?.videoUrl]);

  useEffect(() => {
    fetchData();
    setShowAll(false);
    setActivePanel(null);
  }, [fetchData]);

  // --- ХАДГАЛАХ ЛОГИК ---
  const handleSave = async (type, data, editId = null) => {
    let dataToSave = { ...data };

    // ТЕСТ ЗАСВАР: Индексийг утга руу хөрвүүлж хадгалах
    if (type === "test") {
      if (data.answer === null) {
        showStatus("Зөв хариултыг сонгоно уу!", "error");
        return;
      }
      const selectedValue = data.options[data.answer];
      if (!selectedValue || selectedValue.trim() === "") {
        showStatus("Сонгосон хариулт хоосон байна!", "error");
        return;
      }
      dataToSave.answer = selectedValue;
    }

    let finalData = { ...dataToSave, classCode: userClassCode, pageId: pageId };

    // YouTube URL
    if (type === "video" && data.url) {
      let videoId = "";
      if (data.url.includes("v="))
        videoId = data.url.split("v=")[1].split("&")[0];
      else if (data.url.includes("youtu.be/"))
        videoId = data.url.split("youtu.be/")[1].split("?")[0];
      if (videoId) finalData.url = `https://www.youtube.com/embed/${videoId}`;
    }

    // Canva Embed
    if (type === "presentation" && data.url?.includes("<iframe")) {
      const srcMatch = data.url.match(/src="([^"]+)"/);
      if (srcMatch && srcMatch[1]) finalData.url = srcMatch[1];
    }

    let apiPath =
      type === "cards"
        ? "card"
        : type === "theory"
          ? "lessons"
          : type === "exp"
            ? "experiment"
            : type;

    try {
      const res = await fetch(`/api/${apiPath}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editId ? { ...finalData, id: editId } : finalData),
      });

      if (res.ok) {
        showStatus(
          editId ? "Мэдээллийг шинэчиллээ!" : "Амжилттай хадгалагдлаа!",
        );
        fetchData();
        resetForm(type);
      } else {
        showStatus("Хадгалахад алдаа гарлаа.", "error");
      }
    } catch (err) {
      showStatus("Сервертэй холбогдож чадсангүй.", "error");
    }
  };

  const resetForm = (type) => {
    setActivePanel(null);
    setEditIds({ test: null, card: null, exp: null, theory: null });
    if (type === "test")
      setNewTest({ question: "", options: ["", "", ""], answer: null });
    if (type === "cards") setNewCard({ question: "", answer: "" });
    if (type === "exp") setNewExp({ title: "", href: "", img: "" });
    if (type === "theory") setNewTheory({ title: "", content: "" });
    if (type === "video") setVideoInput("");
  };

  // --- УСТГАХ ЛОГИК ---
  const handleDeleteConfirm = (type, id) => {
    setConfirmModal({ show: true, type, id });
  };

  const executeDelete = async () => {
    const { type, id } = confirmModal;
    closeConfirm();
    let apiPath =
      type === "cards" ? "card" : type === "exp" ? "experiment" : type;

    try {
      const res = await fetch(`/api/${apiPath}?id=${id}`, { method: "DELETE" });
      if (res.ok) {
        showStatus("Мэдээлэл амжилттай устлаа.");
        fetchData();
      } else {
        showStatus("Устгахад алдаа гарлаа.", "error");
      }
    } catch (err) {
      showStatus("Алдаа гарлаа.", "error");
    }
  };

  // --- ЗАСАХ ЛОГИК ---
  const handleEdit = (type, item) => {
    setActivePanel(type);
    if (type === "test") {
      setEditIds((p) => ({ ...p, test: item._id }));
      // Буцаагаад индексийг нь олж тогтоох
      const foundIndex = item.options.indexOf(item.answer);
      setNewTest({
        question: item.question,
        options: item.options,
        answer: foundIndex !== -1 ? foundIndex : null,
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

  if (!config || !config.page)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="animate-spin text-[#312C85]" size={48} />
      </div>
    );

  return (
    <div className="min-h-screen px-4 md:px-8 pb-16 bg-[#F8FAFC]">
      <NavAll />

      {/* HEADER */}
      <section className="pt-24 md:pt-28">
        <div className="flex flex-col xl:flex-row bg-white py-4 px-5 rounded-2xl shadow-sm justify-between items-center border border-slate-200 mb-6 gap-4">
          <div className="flex items-center w-full xl:w-auto">
            <Link
              href="/indexGeo"
              className="mr-4 p-2 hover:bg-slate-100 rounded-xl transition-all"
            >
              <ArrowLeft className="text-[#312C85]" size={24} />
            </Link>
            <div className="w-1.5 h-10 bg-[#312C85] rounded-full mr-4"></div>
            <div>
              <h1 className="text-xl md:text-2xl font-black text-slate-900 uppercase leading-none">
                {config.page.title}
              </h1>
              <p className="text-slate-400 text-[10px] md:text-xs font-black flex items-center gap-1 uppercase mt-1">
                <Users size={12} /> {config.page.subtitle} | {userClassCode}{" "}
                АНГИ
              </p>
            </div>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-3 w-full xl:w-auto">
            <Link
              href={`/testMolecular?pageId=${pageId}`}
              className="bg-[#312C85] text-white px-6 py-2.5 rounded-xl font-black shadow-md text-xs flex items-center gap-2 hover:bg-black transition-all"
            >
              <Award size={16} /> ТЕСТ ӨГӨХ
            </Link>
            <Link
              href={`/cartMolecular?pageId=${pageId}`}
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

      <div className="max-w-[1400px] mx-auto mt-6">
        {isTeacher && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
            {/* Video Panel */}
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
                <div className="flex gap-1 animate-in slide-in-from-top-1">
                  <input
                    className="flex-1 p-2 rounded-lg border text-xs"
                    value={videoInput}
                    onChange={(e) => setVideoInput(e.target.value)}
                    placeholder="URL..."
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

            {/* Test Panel - ЗӨВ ХАРИУЛТЫН ЛОГИК ЗАСВАРТАЙ */}
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
                  Удирдах
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
                        type="button"
                        onClick={() => setNewTest({ ...newTest, answer: idx })}
                        className={`p-1.5 rounded-md border transition-all ${newTest.answer === idx ? "bg-[#312C85] text-white" : "bg-white text-slate-300"}`}
                      >
                        <Check size={14} />
                      </button>
                    </div>
                  ))}
                  <button
                    onClick={() => handleSave("test", newTest, editIds.test)}
                    className="w-full bg-[#312C85] text-white py-2 rounded-lg text-[10px] font-black uppercase tracking-widest"
                  >
                    {editIds.test ? "Засах" : "Нэмэх"}
                  </button>
                </div>
              )}
              <div className="mt-2 max-h-32 overflow-y-auto border-t pt-2 space-y-1">
                {dbTests.map((t) => (
                  <div
                    key={t._id}
                    className="flex justify-between items-center bg-slate-50 p-1 rounded"
                  >
                    <span className="text-[9px] truncate w-24 font-bold">
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
                        onClick={() => handleDeleteConfirm("test", t._id)}
                        className="text-red-500"
                      >
                        <Trash2 size={10} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Card Panel */}
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
                    className="w-full bg-slate-800 text-white py-2 rounded-lg text-[10px] font-black uppercase tracking-widest"
                  >
                    {editIds.card ? "Засах" : "Нэмэх"}
                  </button>
                </div>
              )}
              <div className="mt-2 max-h-32 overflow-y-auto border-t pt-2 space-y-1">
                {dbCards.map((c) => (
                  <div
                    key={c._id}
                    className="flex justify-between items-center bg-slate-50 p-1 rounded"
                  >
                    <span className="text-[9px] truncate w-24 font-bold">
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
                        onClick={() => handleDeleteConfirm("cards", c._id)}
                        className="text-red-500"
                      >
                        <Trash2 size={10} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Experiment Panel */}
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
                    placeholder="Link..."
                    value={newExp.href}
                    onChange={(e) =>
                      setNewExp({ ...newExp, href: e.target.value })
                    }
                  />
                  <input
                    className="w-full p-1.5 rounded border text-[10px]"
                    placeholder="Зураг..."
                    value={newExp.img}
                    onChange={(e) =>
                      setNewExp({ ...newExp, img: e.target.value })
                    }
                  />
                  <button
                    onClick={() => handleSave("exp", newExp, editIds.exp)}
                    className="w-full bg-[#312C85] text-white py-2 rounded text-[10px] font-black uppercase tracking-widest"
                  >
                    Хадгалах
                  </button>
                </div>
              )}
            </div>

            {/* Theory Panel */}
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
                    className="w-full bg-slate-800 text-white py-2 rounded text-[10px] font-black uppercase tracking-widest"
                  >
                    Хадгалах
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* MAIN DISPLAY */}
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="w-full lg:w-[75%] space-y-4">
            <div className="bg-white rounded-[2.5rem] overflow-hidden shadow-sm border border-slate-200 aspect-video relative">
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
                <div className="p-3 bg-[#312C85]/5 rounded-xl text-[#312C85]">
                  <Layers size={20} />
                </div>
                <input
                  className="flex-1 p-3 rounded-xl border-none bg-slate-50 text-xs font-bold outline-none"
                  value={canvaInput}
                  onChange={(e) => setCanvaInput(e.target.value)}
                  placeholder="Canva Embed холбоос..."
                />
                <button
                  onClick={() =>
                    handleSave("presentation", { url: canvaInput })
                  }
                  className="bg-[#312C85] text-white px-8 py-3 rounded-xl font-black text-xs hover:bg-black transition-all shadow-lg"
                >
                  <Save size={18} /> ХАДГАЛАХ
                </button>
              </div>
            )}
          </div>

          {/* Side Experiments */}
          <div className="w-full lg:w-[25%] flex flex-col gap-4">
            <h3 className="font-black text-slate-800 text-[10px] uppercase tracking-[0.2em] flex items-center gap-2 px-1">
              <Beaker size={14} className="text-[#312C85]" /> ТУРШИЛТУУД
            </h3>
            <div className="grid grid-cols-1 gap-4">
              {[...dbExperiments]
                .reverse()
                .concat(config.experiments || [])
                .slice(0, 3)
                .map((exp, idx) => (
                  <div
                    key={idx}
                    className="relative bg-white rounded-2xl p-2 border border-slate-100 shadow-sm group hover:border-[#312C85]/30 transition-all hover:-translate-y-1"
                  >
                    {isTeacher && exp._id && (
                      <div className="absolute top-3 left-3 z-10 flex gap-1">
                        <button
                          onClick={() => handleEdit("exp", exp)}
                          className="p-1.5 bg-white/90 rounded-lg text-[#312C85]"
                        >
                          <Edit2 size={12} />
                        </button>
                        <button
                          onClick={() => handleDeleteConfirm("exp", exp._id)}
                          className="p-1.5 bg-white/90 rounded-lg text-red-500"
                        >
                          <Trash2 size={12} />
                        </button>
                      </div>
                    )}
                    <Link href={exp.href || "#"} target="_blank">
                      <div className="h-32 rounded-xl bg-slate-50 overflow-hidden relative">
                        <img
                          src={exp.img || "https://via.placeholder.com/400x300"}
                          className="w-full h-full object-cover group-hover:scale-110 transition-duration-500"
                        />
                        <div className="absolute top-2 right-2 p-2 bg-white/90 rounded-xl">
                          <ExternalLink size={14} className="text-[#312C85]" />
                        </div>
                      </div>
                      <div className="py-3 px-1 font-black text-[11px] text-slate-700 truncate uppercase">
                        {exp.title}
                      </div>
                    </Link>
                  </div>
                ))}
            </div>
          </div>
        </div>

        {/* Theory Section */}
        <section className="bg-white rounded-[3rem] p-6 md:p-12 shadow-sm border border-slate-100 mt-12 relative overflow-hidden">
          <h2 className="text-center text-xl md:text-4xl font-black uppercase mb-12 text-[#312C85] tracking-tight">
            Онолын Мэдээлэл
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 relative z-10">
            {[...dynamicLessons]
              .reverse()
              .concat(config.theory || [])
              .slice(0, showAll ? 99 : 4)
              .map((item, i) => (
                <div
                  key={i}
                  className="relative bg-white rounded-[2rem] p-8 border border-slate-50 shadow-sm border-b-4 border-b-[#312C85]/10"
                >
                  <div className="flex justify-between items-start mb-6">
                    <h3 className="text-lg font-black text-[#312C85] flex items-center gap-4">
                      <span className="min-w-[40px] h-10 rounded-2xl bg-[#312C85] text-white flex items-center justify-center text-sm font-black shadow-lg shadow-[#312C85]/20">
                        {i + 1}
                      </span>
                      {item.title}
                    </h3>
                    {isTeacher && item._id && (
                      <div className="flex gap-1">
                        <button
                          onClick={() => handleEdit("theory", item)}
                          className="p-2 text-[#312C85] bg-slate-50 rounded-xl hover:bg-white"
                        >
                          <Edit2 size={16} />
                        </button>
                        <button
                          onClick={() =>
                            handleDeleteConfirm("lessons", item._id)
                          }
                          className="p-2 text-red-500 bg-slate-50 rounded-xl hover:bg-white"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    )}
                  </div>
                  <div className="space-y-3">
                    {(Array.isArray(item.content)
                      ? item.content
                      : [item.content]
                    ).map((text, j) => (
                      <p
                        key={j}
                        className="text-sm text-slate-600 border-l-4 border-[#312C85]/5 pl-5 leading-relaxed font-bold"
                      >
                        {text}
                      </p>
                    ))}
                  </div>
                </div>
              ))}
          </div>
          <div className="flex justify-center mt-16">
            <button
              onClick={() => setShowAll(!showAll)}
              className="flex flex-col items-center gap-2 group"
            >
              <div className="bg-white border-2 border-[#312C85]/20 text-[#312C85] px-12 py-3 rounded-full text-[11px] font-black uppercase group-hover:bg-[#312C85] group-hover:text-white transition-all shadow-md group-hover:-translate-y-1">
                {showAll ? "Хураах" : "Дэлгэрэнгүй үзэх"}
              </div>
              {showAll ? (
                <ChevronUp size={24} className="text-[#312C85] opacity-50" />
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

      {/* VIDEO MODAL */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-[1000] flex items-center justify-center p-4 bg-slate-900/90 backdrop-blur-md animate-in fade-in duration-300"
          onClick={() => setIsModalOpen(false)}
        >
          <div
            className="relative w-full max-w-5xl aspect-video bg-black rounded-[2.5rem] overflow-hidden shadow-2xl animate-in zoom-in-95"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-6 right-6 z-10 p-3 bg-white/10 hover:bg-red-500 text-white rounded-full transition-all"
            >
              <X size={28} />
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

      {/* CONFIRM DELETE MODAL */}
      {confirmModal.show && (
        <div className="fixed inset-0 z-[2000] flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div
            className="absolute inset-0 bg-slate-950/70 backdrop-blur-sm"
            onClick={closeConfirm}
          ></div>
          <div className="relative bg-white rounded-[3rem] p-10 shadow-2xl max-w-sm w-full text-center animate-in zoom-in-95">
            <div className="mx-auto w-24 h-24 rounded-full bg-red-50 text-red-500 flex items-center justify-center mb-6">
              <HelpCircle size={48} strokeWidth={2.5} />
            </div>
            <h3 className="text-2xl font-black text-slate-900 mb-2 uppercase tracking-tight">
              Устгах уу?
            </h3>
            <p className="text-slate-500 text-sm font-bold mb-8 leading-relaxed">
              Системээс бүрмөсөн устгахдаа итгэлтэй байна уу?
            </p>
            <div className="flex gap-4">
              <button
                onClick={closeConfirm}
                className="flex-1 bg-slate-100 text-slate-600 py-4 rounded-3xl font-black text-xs hover:bg-slate-200 transition-all uppercase tracking-widest"
              >
                БОЛИХ
              </button>
              <button
                onClick={executeDelete}
                className="flex-1 bg-red-500 text-white py-4 rounded-3xl font-black text-xs hover:bg-red-600 transition-all shadow-lg uppercase tracking-widest"
              >
                УСТГАХ
              </button>
            </div>
          </div>
        </div>
      )}

      {/* STATUS RESULT MODAL (SUCCESS/ERROR) */}
      {statusModal.show && (
        <div className="fixed inset-0 z-[3000] flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div
            className="absolute inset-0 bg-slate-950/70 backdrop-blur-sm"
            onClick={closeStatus}
          ></div>
          <div className="relative bg-white rounded-[3rem] p-10 shadow-2xl border border-slate-100 max-w-sm w-full text-center animate-in zoom-in-95">
            <div
              className={`mx-auto w-24 h-24 rounded-full flex items-center justify-center mb-6 shadow-lg ${statusModal.type === "success" ? "bg-green-50 text-green-500 shadow-green-100" : "bg-red-50 text-red-500 shadow-red-100"}`}
            >
              {statusModal.type === "success" ? (
                <Check size={48} strokeWidth={3} />
              ) : (
                <AlertCircle size={48} strokeWidth={3} />
              )}
            </div>
            <h3 className="text-2xl font-black text-slate-900 mb-2 uppercase tracking-tight">
              {statusModal.type === "success" ? "Амжилттай" : "Алдаа гарлаа"}
            </h3>
            <p className="text-slate-500 text-sm font-bold mb-10 leading-relaxed px-2">
              {statusModal.message}
            </p>
            <button
              onClick={closeStatus}
              className={`w-full py-5 rounded-[2rem] font-black text-xs text-white transition-all shadow-xl active:scale-95 uppercase tracking-[0.2em] ${statusModal.type === "success" ? "bg-green-500 hover:bg-green-600 shadow-green-200" : "bg-red-500 hover:bg-red-600 shadow-red-200"}`}
            >
              ОК
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
