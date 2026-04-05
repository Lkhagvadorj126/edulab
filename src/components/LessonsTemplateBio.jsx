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
} from "lucide-react";

// Components
import Slider from "./Slider";
import NavAll from "./NavAll";
import { useAuth } from "@/context/AuthContext";
import NavBio from "./NavBio";

export default function LessonTemplateB({ pageId, config }) {
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
  const [loading, setLoading] = useState(false);

  // --- МЭДЭГДЛИЙН (Status Modal) STATES ---
  const [statusModal, setStatusModal] = useState({
    show: false,
    message: "",
    type: "success",
  });

  // --- УСТГАХ БАТАЛГААЖУУЛАХ (Confirm Modal) STATES ---
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

  // Тест нэмэх хэсгийн state
  const [newTest, setNewTest] = useState({
    question: "",
    options: ["", "", ""],
    answer: "", // Энд зөв хариултын ТЕКСТ-ийг хадгална
  });

  const [editIds, setEditIds] = useState({
    test: null,
    card: null,
    exp: null,
    theory: null,
  });

  const closeStatus = () => setStatusModal({ ...statusModal, show: false });
  const closeConfirm = () =>
    setConfirmModal({ show: false, type: "", id: null });

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
        setVideoUrl(d?.url || config?.page?.videoUrl);
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
  }, [pageId, userClassCode, config?.page?.videoUrl]);

  useEffect(() => {
    fetchData();
    setShowAll(false);
    setActivePanel(null);
  }, [fetchData]);

  // --- ХАДГАЛАХ ЛОГИК ---
  const handleSave = async (type, data, editId = null) => {
    // Тест хадгалах үед зөв хариулт сонгосон эсэхийг шалгах
    if (type === "test" && (!data.answer || data.answer.trim() === "")) {
      setStatusModal({
        show: true,
        message: "Зөв хариултыг сонгоно уу!",
        type: "error",
      });
      return;
    }

    let finalData = { ...data, classCode: userClassCode, pageId: pageId };

    if (type === "video" && data.url) {
      let videoId = "";
      if (data.url.includes("v="))
        videoId = data.url.split("v=")[1].split("&")[0];
      else if (data.url.includes("youtu.be/"))
        videoId = data.url.split("youtu.be/")[1].split("?")[0];
      if (videoId) finalData.url = `https://www.youtube.com/embed/${videoId}`;
    }

    if (type === "presentation" && data.url?.includes("<iframe")) {
      const srcMatch = data.url.match(/src="([^"]+)"/);
      if (srcMatch && srcMatch[1]) finalData.url = srcMatch[1];
    }

    let apiPath = type;
    if (type === "cards") apiPath = "card";
    if (type === "theory") apiPath = "lessons";

    try {
      const res = await fetch(`/api/${apiPath}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editId ? { ...finalData, id: editId } : finalData),
      });

      if (res.ok) {
        setStatusModal({
          show: true,
          message: "Амжилттай хадгалагдлаа!",
          type: "success",
        });
        fetchData();
        resetForm(type);
      } else {
        setStatusModal({
          show: true,
          message: "Хадгалахад алдаа гарлаа.",
          type: "error",
        });
      }
    } catch (err) {
      setStatusModal({
        show: true,
        message: "Сервертэй холбогдож чадсангүй.",
        type: "error",
      });
    }
  };

  const resetForm = (type) => {
    setActivePanel(null);
    setEditIds({ test: null, card: null, exp: null, theory: null });
    if (type === "test")
      setNewTest({ question: "", options: ["", "", ""], answer: "" });
    if (type === "cards") setNewCard({ question: "", answer: "" });
    if (type === "experiment") setNewExp({ title: "", href: "", img: "" });
    if (type === "theory") setNewTheory({ title: "", content: "" });
  };

  // --- УСТГАХ ЛОГИК ---
  const handleDeleteConfirm = (type, id) => {
    setConfirmModal({ show: true, type, id });
  };

  const executeDelete = async () => {
    const { type, id } = confirmModal;
    closeConfirm();
    const apiPath = type === "cards" ? "card" : type;
    try {
      const res = await fetch(`/api/${apiPath}?id=${id}`, { method: "DELETE" });
      if (res.ok) {
        setStatusModal({
          show: true,
          message: "Амжилттай устгагдлаа.",
          type: "success",
        });
        fetchData();
      } else {
        setStatusModal({
          show: true,
          message: "Устгахад алдаа гарлаа.",
          type: "error",
        });
      }
    } catch (err) {
      setStatusModal({
        show: true,
        message: "Хүсэлт илгээхэд алдаа гарлаа.",
        type: "error",
      });
    }
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

      {/* Header */}
      <section className="pt-24 md:pt-28">
        <div className="flex flex-col xl:flex-row bg-white py-4 px-5 rounded-2xl shadow-sm justify-between items-center border border-slate-200 mb-6 gap-4">
          <div className="flex items-center w-full xl:w-auto">
            <Link
              href="/indexBio"
              className="mr-4 p-2 hover:bg-slate-100 rounded-xl transition-all"
            >
              <ArrowLeft className="text-[#312C85]" size={24} />
            </Link>
            <div className="w-1.5 h-10 bg-[#312C85] rounded-full mr-4"></div>
            <div>
              <h1 className="text-xl md:text-2xl font-black text-slate-900 uppercase">
                {config.page.title}
              </h1>
              <p className="text-slate-500 text-[10px] md:text-xs font-bold flex items-center gap-1 uppercase tracking-tighter">
                <Users size={12} /> {userClassCode} АНГИ |{" "}
                {config.page.subtitle}
              </p>
            </div>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-3 w-full xl:w-auto">
            <Link
              href={`/testMolecular?pageId=${pageId}`}
              className="bg-[#312C85] text-white px-6 py-2.5 rounded-xl font-black shadow-md text-xs flex items-center gap-2 hover:opacity-90"
            >
              <Award size={16} /> ТЕСТ ӨГӨХ
            </Link>
            <Link
              href={`/cartMolecular?pageId=${pageId}`}
              className="bg-[#312C85] text-white px-6 py-2.5 rounded-xl font-black shadow-md text-xs flex items-center gap-2 hover:opacity-90"
            >
              <BookOpen size={16} /> КАРТ ҮЗЭХ
            </Link>
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-[#312C85] text-white px-6 py-2.5 rounded-xl font-black shadow-md text-xs flex items-center gap-2 hover:opacity-90"
            >
              <Play size={16} fill="currentColor" /> ҮЗЭХ
            </button>
          </div>
        </div>
      </section>

      <NavBio />

      <div className="max-w-[1400px] mx-auto mt-6">
        {/* Admin Panels */}
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

            {/* Test Panel - АЛДААГ ЗАССАН ХЭСЭГ */}
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
                          // Хэрэв өөрчилж буй текст нь зөв хариулт байсан бол хамт шинэчлэх
                          const isOldAnswer =
                            newTest.answer === newTest.options[idx];
                          setNewTest({
                            ...newTest,
                            options: ops,
                            answer: isOldAnswer
                              ? e.target.value
                              : newTest.answer,
                          });
                        }}
                      />
                      <button
                        type="button"
                        onClick={() => setNewTest({ ...newTest, answer: opt })}
                        className={`p-1.5 rounded-md border transition-all ${
                          newTest.answer === opt && opt !== ""
                            ? "bg-[#312C85] text-white border-[#312C85]"
                            : "bg-white text-slate-300 border-slate-200"
                        }`}
                      >
                        <Check size={14} />
                      </button>
                    </div>
                  ))}
                  <button
                    onClick={() => handleSave("test", newTest, editIds.test)}
                    className="w-full bg-[#312C85] text-white py-2 rounded-lg text-[10px] font-black"
                  >
                    {editIds.test ? "ШИНЭЧЛЭХ" : "НЭМЭХ"}
                  </button>
                </div>
              )}
              <div className="mt-2 max-h-32 overflow-y-auto border-t pt-2 space-y-1">
                {dbTests.map((t) => (
                  <div
                    key={t._id}
                    className="flex justify-between items-center bg-slate-50 p-1 rounded"
                  >
                    <span className="text-[9px] truncate w-24">
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
                    className="w-full bg-slate-800 text-white py-2 rounded-lg text-[10px] font-black"
                  >
                    {editIds.card ? "ШИНЭЧЛЭХ" : "НЭМЭХ"}
                  </button>
                </div>
              )}
              <div className="mt-2 max-h-32 overflow-y-auto border-t pt-2 space-y-1">
                {dbCards.map((c) => (
                  <div
                    key={c._id}
                    className="flex justify-between items-center bg-slate-50 p-1 rounded"
                  >
                    <span className="text-[9px] truncate w-24">
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
                    placeholder="Зураг URL..."
                    value={newExp.img}
                    onChange={(e) =>
                      setNewExp({ ...newExp, img: e.target.value })
                    }
                  />
                  <button
                    onClick={() =>
                      handleSave("experiment", newExp, editIds.exp)
                    }
                    className="w-full bg-[#312C85] text-white py-2 rounded text-[10px] font-black uppercase"
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
                    className="w-full bg-slate-800 text-white py-2 rounded text-[10px] font-black uppercase"
                  >
                    Хадгалах
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Main Content */}
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="w-full lg:w-[75%] space-y-4">
            <div className="bg-white rounded-[2rem] overflow-hidden shadow-sm border border-slate-200 aspect-video relative">
              {displayUrl ? (
                <iframe
                  src={displayUrl}
                  className="w-full h-full border-none"
                  allowFullScreen
                  title="Presentation"
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
                  placeholder="Canva Embed Link..."
                />
                <button
                  onClick={() =>
                    handleSave("presentation", { url: canvaInput })
                  }
                  className="bg-[#312C85] text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2"
                >
                  <Save size={18} /> Хадгалах
                </button>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="w-full lg:w-[25%] flex flex-col gap-4">
            <h3 className="font-bold text-slate-800 text-[10px] uppercase tracking-widest opacity-60 flex items-center gap-2 px-1">
              <Beaker size={14} /> Туршилтууд
            </h3>
            <div className="grid grid-cols-1 gap-4">
              {[...dbExperiments]
                .reverse()
                .concat(config.experiments || [])
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
                          className="p-1 bg-white rounded shadow-sm text-[#312C85]"
                        >
                          <Edit2 size={10} />
                        </button>
                        <button
                          onClick={() =>
                            handleDeleteConfirm("experiment", exp._id)
                          }
                          className="p-1 bg-white rounded shadow-sm text-red-500"
                        >
                          <Trash2 size={10} />
                        </button>
                      </div>
                    )}
                    <Link href={exp.href || "#"} target="_blank">
                      <div className="h-28 rounded-xl bg-slate-50 overflow-hidden relative">
                        <img
                          src={exp.img || ""}
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

        {/* Theory Section */}
        <section className="bg-white rounded-[2rem] p-6 md:p-12 shadow-sm border border-slate-100 mt-12">
          <h2 className="text-center text-xl md:text-3xl font-black uppercase mb-12 text-[#312C85]">
            Онолын Мэдээлэл
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {[...dynamicLessons]
              .reverse()
              .concat(config.theory || [])
              .slice(0, showAll ? 99 : 4)
              .map((item, i) => (
                <div
                  key={i}
                  className="relative bg-white rounded-2xl p-6 border border-slate-50 shadow-sm"
                >
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-base font-bold text-[#312C85] flex items-center gap-3">
                      <span className="min-w-[32px] h-8 rounded-lg bg-[#312C85] text-white flex items-center justify-center text-xs font-bold">
                        {i + 1}
                      </span>
                      {item.title}
                    </h3>
                    {isTeacher && item._id && (
                      <div className="flex gap-1">
                        <button
                          onClick={() => handleEdit("theory", item)}
                          className="p-1 text-[#312C85] bg-slate-50 rounded"
                        >
                          <Edit2 size={14} />
                        </button>
                        <button
                          onClick={() =>
                            handleDeleteConfirm("lessons", item._id)
                          }
                          className="p-1 text-red-500 bg-slate-50 rounded"
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
                        className="text-sm text-slate-600 border-l-2 border-[#312C85]/10 pl-4 leading-relaxed"
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
              className="flex flex-col items-center gap-1"
            >
              <div className="bg-white border border-[#312C85]/30 text-[#312C85] px-8 py-2 rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-[#312C85] hover:text-white transition-colors">
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
        <div
          className="fixed inset-0 z-[1000] flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm"
          onClick={() => setIsModalOpen(false)}
        >
          <div
            className="relative w-full max-w-5xl aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 z-10 p-2 bg-white/10 hover:bg-red-500 text-white rounded-full border border-white/20 transition-colors"
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

      {/* Confirm Delete Modal */}
      {confirmModal.show && (
        <div className="fixed inset-0 z-[2000] flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            onClick={closeConfirm}
          ></div>
          <div className="relative bg-white rounded-[2.5rem] p-8 shadow-2xl border border-slate-100 max-w-sm w-full text-center animate-in zoom-in-95 duration-200">
            <div className="mx-auto w-20 h-20 rounded-full bg-amber-50 text-amber-500 flex items-center justify-center mb-6">
              <HelpCircle size={40} strokeWidth={3} />
            </div>
            <h3 className="text-xl font-black text-slate-900 mb-2 uppercase tracking-tight">
              Устгах уу?
            </h3>
            <p className="text-slate-500 text-sm font-bold mb-8 leading-relaxed">
              Устгасан тохиолдолд мэдээллийг сэргээх боломжгүй.
            </p>
            <div className="flex gap-3">
              <button
                onClick={closeConfirm}
                className="flex-1 py-4 rounded-2xl font-black text-slate-500 bg-slate-100 hover:bg-slate-200 transition-all uppercase text-xs"
              >
                Болих
              </button>
              <button
                onClick={executeDelete}
                className="flex-1 py-4 rounded-2xl font-black text-white bg-red-500 hover:bg-red-600 shadow-lg shadow-red-200 transition-all uppercase text-xs"
              >
                Устгах
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Status Message Modal */}
      {statusModal.show && (
        <div className="fixed inset-0 z-[2000] flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            onClick={closeStatus}
          ></div>
          <div className="relative bg-white rounded-[2.5rem] p-8 shadow-2xl border border-slate-100 max-w-sm w-full text-center animate-in zoom-in-95 duration-200">
            <div
              className={`mx-auto w-20 h-20 rounded-full flex items-center justify-center mb-6 ${statusModal.type === "success" ? "bg-green-50 text-green-500" : "bg-red-50 text-red-500"}`}
            >
              {statusModal.type === "success" ? (
                <Check size={40} strokeWidth={3} />
              ) : (
                <AlertCircle size={40} strokeWidth={3} />
              )}
            </div>
            <h3 className="text-xl font-black text-slate-900 mb-2 uppercase tracking-tight">
              {statusModal.type === "success" ? "Амжилттай" : "Алдаа гарлаа"}
            </h3>
            <p className="text-slate-500 text-sm font-bold mb-8">
              {statusModal.message}
            </p>
            <button
              onClick={closeStatus}
              className={`w-full py-4 rounded-2xl font-black text-white transition-all shadow-lg ${statusModal.type === "success" ? "bg-green-500 hover:bg-green-600 shadow-green-200" : "bg-red-500 hover:bg-red-600 shadow-red-200"}`}
            >
              ОК
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
