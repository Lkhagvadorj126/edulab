"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import {
  Users,
  Play,
  X,
  Trash2,
  ExternalLink,
  Save,
  Edit2,
  Video,
  Beaker,
  ArrowLeft,
  FileText,
  Award,
  BookOpen,
  PlusCircle,
  Loader2,
  BarChart3,
  Globe,
  ChevronUp,
  ChevronDown,
  Check,
  AlertCircle,
  HelpCircle,
} from "lucide-react";

// Components
import NavAll from "./NavAll";
import { useAuth } from "@/context/AuthContext";

export default function LessonTemplate({
  pageId,
  config,
  subject = "physics",
}) {
  const { user } = useAuth();

  // Багшийн эрхийг шалгах
  const isTeacher =
    user?.role?.toString().toLowerCase().trim() === "teacher" ||
    user?.role?.toString().toLowerCase().trim() === "багш";

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

  // Status & Confirmation Modals
  const [statusModal, setStatusModal] = useState({
    show: false,
    message: "",
    type: "success",
  });
  const [confirmModal, setConfirmModal] = useState({
    show: false,
    type: "",
    id: null,
  });

  // Admin Input States
  const [activePanel, setActivePanel] = useState(null);
  const [videoInput, setVideoInput] = useState("");
  const [canvaInput, setCanvaInput] = useState("");

  const [newExp, setNewExp] = useState({ title: "", href: "", img: "" });
  const [newCard, setNewCard] = useState({ question: "", answer: "" });
  const [newTheory, setNewTheory] = useState({ title: "", content: "" });

  // 3 сонголттой тест, answer нь индексийг хадгална
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

  const finalDisplayUrl = displayUrl || config?.page?.presentationUrl;

  // --- ТУСЛАХ ФУНКЦУУД ---
  const showStatus = (message, type = "success") => {
    setStatusModal({ show: true, message, type });
    if (type === "success") {
      setTimeout(() => setStatusModal((p) => ({ ...p, show: false })), 3000);
    }
  };

  const closeStatus = () => setStatusModal((p) => ({ ...p, show: false }));
  const closeConfirm = () =>
    setConfirmModal({ show: false, type: "", id: null });

  // АЛДАА ГАРГАЖ БАЙСАН ФУНКЦ:
  const askDelete = (type, id) => {
    setConfirmModal({ show: true, type, id });
  };

  // --- ӨГӨГДӨЛ ТАТАХ ---
  // --- ӨГӨГДӨЛ ТАТАХ (ЗАСАР) ---
  const fetchData = useCallback(async () => {
    if (!pageId || !userClassCode) return;
    setLoading(true);
    try {
      // ХӨТӨЧ ЦЭВЭРЛЭХ (Cache-аас сэргийлэх)
      const query = `?pageId=${pageId}&classCode=${userClassCode}&subject=${subject}&t=${Date.now()}`;

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
        const data = await canvaRes.json();
        if (data.length > 0) setDisplayUrl(data[0].url);
      }

      // Spread operator ашиглан шинэ массив болгож state-ийг шинэчлэх
      if (expRes.ok) setDbExperiments([...(await expRes.json())]);
      if (lessonRes.ok) setDynamicLessons([...(await lessonRes.json())]);
      if (testRes.ok) setDbTests([...(await testRes.json())]); // ЗАСАР: Шинэ массив
      if (cardRes.ok) setDbCards([...(await cardRes.json())]);

      if (videoRes.ok) {
        const data = await videoRes.json();
        if (data.length > 0) setVideoUrl(data[0].url);
      }
    } catch (err) {
      console.error("Data fetch error:", err);
    } finally {
      setLoading(false);
    }
  }, [pageId, userClassCode, subject]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // --- CRUD ҮЙЛДЛҮҮД ---
  const handleSave = async (type, data, editId = null) => {
    let dataToSave = { ...data };

    if (type === "test") {
      if (data.answer === null) {
        showStatus("Зөв хариултыг сонгоно уу!", "error");
        return;
      }
      // Индексийг утга болгож хөрвүүлэх
      dataToSave.answer = data.options[data.answer];
    }

    let finalData = {
      ...dataToSave,
      classCode: userClassCode,
      pageId: pageId,
      subject: subject,
    };

    let apiPath =
      type === "cards"
        ? "card"
        : type === "exp"
          ? "experiment"
          : type === "theory"
            ? "lessons"
            : type;

    try {
      const res = await fetch(`/api/${apiPath}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editId ? { ...finalData, id: editId } : finalData),
      });

      if (res.ok) {
        showStatus("Амжилттай хадгалагдлаа!");
        fetchData();
        resetForm(type);
      } else {
        showStatus("Хадгалахад алдаа гарлаа.", "error");
      }
    } catch (err) {
      showStatus("Сервертэй холбогдож чадсангүй.", "error");
    }
  };

  const executeDelete = async () => {
    const { type, id } = confirmModal;
    closeConfirm();
    let apiPath =
      type === "test"
        ? "test"
        : type === "cards"
          ? "card"
          : type === "exp"
            ? "experiment"
            : "lessons";

    try {
      const res = await fetch(`/api/${apiPath}?id=${id}`, { method: "DELETE" });
      if (res.ok) {
        showStatus("Амжилттай устлаа.");
        fetchData();
      }
    } catch (err) {
      showStatus("Устгахад алдаа гарлаа.", "error");
    }
  };

  const handleEdit = (type, item) => {
    // Төрлийг нэгтгэх (cards -> card)
    const normalizedType = type === "cards" ? "card" : type;
    setActivePanel(normalizedType);

    if (normalizedType === "test") {
      setEditIds((p) => ({ ...p, test: item._id }));
      setNewTest({
        question: item.question,
        options: [...item.options],
        answer: item.answer,
      });
    } else if (normalizedType === "card" || normalizedType === "cards") {
      setEditIds((p) => ({ ...p, card: item._id }));
      setNewCard({ question: item.question, answer: item.answer });
    } else if (normalizedType === "exp" || normalizedType === "experiment") {
      setEditIds((p) => ({ ...p, exp: item._id }));
      setNewExp({ title: item.title, href: item.href, img: item.img });
    } else if (normalizedType === "theory" || normalizedType === "lessons") {
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

  const resetForm = (type) => {
    setActivePanel(null);
    setEditIds({ test: null, card: null, exp: null, theory: null });

    if (type === "test")
      setNewTest({ question: "", options: ["", "", ""], answer: null });
    if (type === "card" || type === "cards")
      setNewCard({ question: "", answer: "" }); // Олон/Ганц тоог аль алийг нь шалгана
    if (type === "exp" || type === "experiment")
      setNewExp({ title: "", href: "", img: "" });
    if (type === "theory" || type === "lessons")
      setNewTheory({ title: "", content: "" });
  };

  if (loading && !config?.page) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <Loader2 className="animate-spin text-[#312C85]" size={40} />
      </div>
    );
  }
  return (
    <div className="min-h-screen px-4 md:px-8 pb-16 bg-[#F8FAFC]">
      <NavAll />

      {/* --- HEADER --- */}
      <section className="pt-24 md:pt-28">
        <div className="flex flex-col xl:flex-row bg-white py-4 px-5 rounded-2xl shadow-sm justify-between items-center border border-slate-200 mb-6 gap-4 font-black">
          <div className="flex items-center w-full xl:w-auto">
            <Link
              href="/indexH"
              className="mr-4 p-2 hover:bg-slate-100 rounded-xl transition-all"
            >
              <ArrowLeft className="text-[#312C85]" size={24} />
            </Link>
            <div className="w-1.5 h-10 bg-[#312C85] rounded-full mr-4"></div>
            <div>
              <h1 className="text-xl md:text-2xl text-slate-900 uppercase leading-none">
                {config.page.title}
              </h1>
              <p className="text-slate-400 text-[10px] md:text-xs flex items-center gap-1 uppercase mt-1 tracking-tighter">
                <Users size={12} /> {config.page.subtitle} | {userClassCode}{" "}
                АНГИ
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 w-full xl:w-auto">
            {isTeacher ? (
              <Link
                href={`/stats?pageId=${pageId}&classCode=${userClassCode}&subject=${(subject = "chemistry")}`}
                className="bg-[#312C85] text-white px-6 py-2.5 rounded-xl text-xs flex items-center gap-2 hover:bg-[#1e1a5a] transition-all shadow-lg font-black uppercase"
              >
                <BarChart3 size={16} /> СУРАГЧДЫН ДҮН
              </Link>
            ) : (
              <Link
                href={`/testMolecular?pageId=${pageId}&subject=${(subject = "chemistry")}`}
                className="bg-[#312C85] text-white px-6 py-2.5 rounded-xl text-xs flex items-center gap-2 hover:bg-black transition-all shadow-lg font-black uppercase"
              >
                <Award size={16} /> ТЕСТ ӨГӨХ
              </Link>
            )}
            <Link
              href={`/cartMolecular?pageId=${pageId}&subject=${(subject = "chemistry")}`}
              className="bg-[#312C85] text-white px-6 py-2.5 rounded-xl text-xs flex items-center gap-2 hover:bg-black transition-all shadow-lg font-black uppercase"
            >
              <BookOpen size={16} /> КАРТ ҮЗЭХ
            </Link>
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-[#312C85] text-white px-6 py-2.5 rounded-xl text-xs flex items-center gap-2 hover:bg-black transition-all shadow-lg font-black uppercase"
            >
              <Play size={16} fill="currentColor" /> ВИДЕО ҮЗЭХ
            </button>
          </div>
        </div>
      </section>

      <div className="max-w-[1400px] mx-auto">
        {/* --- TEACHER ADMIN PANELS --- */}
        {isTeacher && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8 animate-in fade-in slide-in-from-top-4 duration-500">
            {/* Video Admin */}
            <div className="bg-white p-4 rounded-2xl border border-[#312C85]/20 shadow-sm">
              <p className="text-[11px] font-black text-[#312C85] uppercase mb-2 flex items-center gap-2">
                <Video size={16} /> Видео
              </p>
              <div className="flex gap-1">
                <input
                  className="flex-1 p-2 rounded-lg border text-[10px]"
                  value={videoInput}
                  onChange={(e) => setVideoInput(e.target.value)}
                  placeholder="YouTube URL..."
                />
                <button
                  onClick={() => handleSave("video", { url: videoInput })}
                  className="bg-[#312C85] text-white p-2 rounded-lg"
                >
                  <Save size={14} />
                </button>
              </div>
            </div>
            {/* Test Admin */}
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
                          setNewTest({
                            ...newTest,
                            options: ops,
                            answer:
                              newTest.answer === newTest.options[idx]
                                ? e.target.value
                                : newTest.answer,
                          });
                        }}
                      />
                      <button
                        type="button"
                        onClick={() => setNewTest({ ...newTest, answer: opt })}
                        className={`p-1.5 rounded-md border transition-all ${newTest.answer === opt && opt !== "" ? "bg-[#312C85] text-white border-[#312C85]" : "bg-white text-slate-300 border-slate-200"}`}
                      >
                        <Check size={14} />
                      </button>
                    </div>
                  ))}
                  <button
                    onClick={() => handleSave("test", newTest, editIds.test)}
                    className="w-full bg-[#312C85] text-white py-2 rounded-lg text-[10px] font-black uppercase tracking-widest"
                  >
                    {editIds.test ? "ШИНЭЧЛЭХ" : "ТЕСТ НЭМЭХ"}
                  </button>
                </div>
              )}
              {/* Test List for Admin */}
              <div className="mt-3 max-h-32 overflow-y-auto border-t pt-2 space-y-1">
                {dbTests.map((t) => (
                  <div
                    key={t._id}
                    className="flex justify-between items-center bg-slate-50 p-1.5 rounded-lg border border-slate-100"
                  >
                    <span className="text-[9px] font-bold truncate w-32">
                      {t.question}
                    </span>
                    <div className="flex gap-1">
                      <button
                        onClick={() => handleEdit("test", t)}
                        className="text-[#312C85] hover:bg-white p-1 rounded transition-colors"
                      >
                        <Edit2 size={10} />
                      </button>
                      <button
                        onClick={() => askDelete("test", t._id)}
                        className="text-red-500 hover:bg-white p-1 rounded transition-colors"
                      >
                        <Trash2 size={10} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Card Admin */}
            <div className="bg-white p-4 rounded-2xl border border-[#312C85]/20 shadow-sm">
              {/* ГАРЧИГ БОЛОН ТОВЧ */}
              <div className="flex justify-between items-center mb-2">
                <p className="text-[11px] font-black text-[#312C85] uppercase flex items-center gap-2">
                  <PlusCircle size={16} /> Карт{" "}
                  {editIds.card ? "(ЗАСАЖ БАЙНА)" : ""}
                </p>
                <button
                  onClick={() => {
                    if (activePanel === "card") {
                      resetForm("cards"); // Формыг цэвэрлэх (Edit ID-г устгах)
                    }
                    setActivePanel(activePanel === "card" ? null : "card");
                  }}
                  className="text-[10px] font-bold border border-[#312C85]/30 text-[#312C85] px-2 py-1 rounded-md transition-colors hover:bg-slate-50"
                >
                  {activePanel === "card" ? "ХААХ" : "НЭМЭХ"}
                </button>
              </div>

              {/* НЭМЭХ / ЗАСАХ ТАЛБАР */}
              {activePanel === "card" && (
                <div className="space-y-2 animate-in slide-in-from-top-1 mb-3">
                  <input
                    className="w-full p-2 rounded-lg border text-xs font-bold outline-none focus:border-[#312C85] border-slate-200"
                    placeholder="Асуулт..."
                    value={newCard.question}
                    onChange={(e) =>
                      setNewCard({ ...newCard, question: e.target.value })
                    }
                  />
                  <textarea
                    className="w-full p-2 rounded-lg border text-xs h-16 font-medium outline-none focus:border-[#312C85] border-slate-200 resize-none"
                    placeholder="Хариулт..."
                    value={newCard.answer}
                    onChange={(e) =>
                      setNewCard({ ...newCard, answer: e.target.value })
                    }
                  />
                  <button
                    onClick={() => handleSave("cards", newCard, editIds.card)}
                    className="w-full bg-[#312C85] text-white py-2 rounded-lg text-[10px] font-black uppercase hover:bg-black transition-all shadow-md active:scale-95"
                  >
                    {editIds.card ? "ШИНЭЧЛЭЛТИЙГ ХАДГАЛАХ" : "ХАДГАЛАХ"}
                  </button>
                </div>
              )}

              {/* ЖАГСААЛТ ХАРАГДАХ ХЭСЭГ */}
              <div className="mt-2 max-h-40 overflow-y-auto border-t pt-2 space-y-1 custom-scrollbar">
                {dbCards && dbCards.length > 0 ? (
                  dbCards.map((c) => (
                    <div
                      key={c._id}
                      className="flex justify-between items-center bg-slate-50 p-2 rounded-lg border border-slate-100 group hover:border-[#312C85]/30 transition-all"
                    >
                      <div className="flex flex-col truncate pr-2">
                        <span className="text-[9px] truncate font-black text-slate-700 w-32 md:w-40">
                          {c.question}
                        </span>
                        <span className="text-[8px] truncate text-slate-400 font-medium">
                          {c.answer}
                        </span>
                      </div>
                      <div className="flex gap-1">
                        <button
                          onClick={() => handleEdit("card", c)} // 'card' төрлийг handleEdit функц дээрээ шалгаарай
                          className="text-[#312C85] p-1.5 hover:bg-white rounded-md transition-all border border-transparent hover:border-slate-200 shadow-sm"
                        >
                          <Edit2 size={10} />
                        </button>
                        <button
                          onClick={() => askDelete("cards", c._id)} // handleSave-тэй ижил 'cards' гэж бичлээ
                          className="text-red-500 p-1.5 hover:bg-white rounded-md transition-all border border-transparent hover:border-slate-200 shadow-sm"
                        >
                          <Trash2 size={10} />
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="flex flex-col items-center py-4 opacity-40">
                    <FileText size={20} className="text-slate-300 mb-1" />
                    <p className="text-[9px] text-slate-400 italic">
                      Одоогоор карт нэмэгдээгүй байна.
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Experiment Admin */}
            <div className="bg-white p-4 rounded-2xl border border-[#312C85]/20 shadow-sm">
              <div className="flex justify-between items-center mb-2">
                <p className="text-[11px] font-black text-[#312C85] uppercase flex items-center gap-2">
                  <Beaker size={16} /> Туршилт
                </p>
                <button
                  onClick={() =>
                    setActivePanel(activePanel === "exp" ? null : "exp")
                  }
                  className="text-[10px] font-bold border border-[#312C85]/30 px-2 py-0.5 rounded-md"
                >
                  Нэмэх
                </button>
              </div>
              {activePanel === "exp" && (
                <div className="space-y-2 animate-in zoom-in-95">
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
                    placeholder="Link (URL)..."
                    value={newExp.href}
                    onChange={(e) =>
                      setNewExp({ ...newExp, href: e.target.value })
                    }
                  />
                  <input
                    className="w-full p-1.5 rounded border text-[10px]"
                    placeholder="Зураг (URL)..."
                    value={newExp.img}
                    onChange={(e) =>
                      setNewExp({ ...newExp, img: e.target.value })
                    }
                  />
                  <button
                    onClick={() => handleSave("exp", newExp, editIds.exp)}
                    className="w-full bg-[#312C85] text-white py-1.5 rounded text-[10px] font-black uppercase"
                  >
                    Хадгалах
                  </button>
                </div>
              )}
            </div>

            {/* Theory Admin */}
            <div className="bg-white p-4 rounded-2xl border border-[#312C85]/20 shadow-sm">
              <div className="flex justify-between items-center mb-2">
                <p className="text-[11px] font-black text-[#312C85] uppercase flex items-center gap-2">
                  <BookOpen size={16} /> Онол
                </p>
                <button
                  onClick={() =>
                    setActivePanel(activePanel === "theory" ? null : "theory")
                  }
                  className="text-[10px] font-bold border border-[#312C85]/30 px-2 py-0.5 rounded-md"
                >
                  Нэмэх
                </button>
              </div>
              {activePanel === "theory" && (
                <div className="space-y-2 animate-in zoom-in-95">
                  <input
                    className="w-full p-1.5 rounded border text-[10px]"
                    placeholder="Гарчиг..."
                    value={newTheory.title}
                    onChange={(e) =>
                      setNewTheory({ ...newTheory, title: e.target.value })
                    }
                  />
                  <textarea
                    className="w-full p-1.5 rounded border text-[10px] h-16"
                    placeholder="Агуулга (Шинэ мөр = Шинэ параграф)..."
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
                    className="w-full bg-slate-800 text-white py-1.5 rounded text-[10px] font-black uppercase"
                  >
                    Хадгалах
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* --- MAIN VISUAL CONTENT --- */}
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="w-full lg:w-[75%] space-y-4">
            <div className="bg-white rounded-[2rem] overflow-hidden shadow-sm border border-slate-200 aspect-video relative group">
              {finalDisplayUrl ? (
                <iframe
                  src={finalDisplayUrl}
                  className="w-full h-full border-none"
                  allowFullScreen
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-[#1e1a5a] to-[#312C85] text-white p-10 text-center">
                  <div className="w-20 h-20 bg-white/10 rounded-3xl flex items-center justify-center mb-6 backdrop-blur-md border border-white/20">
                    <Globe size={40} />
                  </div>
                  <h2 className="text-2xl md:text-4xl font-black uppercase mb-4 tracking-tighter">
                    Интерактив хичээл
                  </h2>
                  <p className="text-white/60 max-w-md text-sm md:text-base font-medium mb-8 leading-relaxed">
                    Уучлаарай, энэ сэдвийн интерактив презентаци хараахан
                    ороогүй байна.
                  </p>
                  <button
                    onClick={() => setIsModalOpen(true)}
                    className="bg-white text-[#312C85] px-8 py-4 rounded-2xl font-black text-sm uppercase transition-all hover:bg-emerald-400 hover:text-white shadow-xl flex items-center gap-2"
                  >
                    <Play size={20} fill="currentColor" /> Видео хичээл үзэх
                  </button>
                </div>
              )}
            </div>
            {isTeacher && (
              <div className="bg-white p-4 rounded-2xl border border-[#312C85]/20 flex gap-2 shadow-sm items-center">
                <input
                  className="flex-1 p-3 rounded-xl border bg-slate-50 text-xs font-bold outline-none focus:border-[#312C85]"
                  value={canvaInput}
                  onChange={(e) => setCanvaInput(e.target.value)}
                  placeholder="Canva Embed Link..."
                />
                <button
                  onClick={() =>
                    handleSave("presentation", { url: canvaInput })
                  }
                  className="bg-[#312C85] text-white px-6 py-3 rounded-xl font-black flex items-center gap-2 hover:bg-black transition-all shadow-lg text-xs"
                >
                  <Save size={18} /> ХАДГАЛАХ
                </button>
              </div>
            )}
          </div>

          {/* Right Sidebar: Experiments */}
          <div className="w-full lg:w-[25%] flex flex-col gap-4">
            <h3 className="font-black text-slate-800 text-[10px] uppercase tracking-widest opacity-60 flex items-center gap-2 px-1">
              <Beaker size={14} /> ТУРШИЛТУУД
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
                          className="p-1 bg-white/90 rounded text-[#312C85] shadow-sm"
                        >
                          <Edit2 size={10} />
                        </button>
                        <button
                          onClick={() =>
                            handleDeleteConfirm("experiment", exp._id)
                          }
                          className="p-1 bg-white/90 rounded text-red-500 shadow-sm"
                        >
                          <Trash2 size={10} />
                        </button>
                      </div>
                    )}
                    <Link href={exp.href || "#"} target="_blank">
                      <div className="h-28 rounded-xl bg-slate-50 overflow-hidden relative">
                        <img
                          src={exp.img || "/placeholder.png"}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          alt={exp.title}
                        />
                        <div className="absolute top-2 right-2 p-1.5 bg-white/90 rounded-lg">
                          <ExternalLink size={14} className="text-[#312C85]" />
                        </div>
                      </div>
                      <div className="py-2 px-1 font-black text-[12px] text-slate-700 truncate uppercase">
                        {exp.title}
                      </div>
                    </Link>
                  </div>
                ))}
            </div>
          </div>
        </div>

        {/* --- THEORY SECTION --- */}
        <section className="bg-white rounded-[2.5rem] p-6 md:p-12 shadow-sm border border-slate-100 mt-12 relative overflow-hidden font-black">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#312C85]/5 rounded-bl-full" />
          <h2 className="text-center text-xl md:text-3xl font-black uppercase mb-12 text-[#312C85] tracking-tighter">
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
                  className="relative bg-white rounded-3xl p-6 border border-slate-50 shadow-sm hover:shadow-md transition-all"
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
                          className="p-1.5 text-[#312C85] bg-slate-50 rounded-lg transition-colors hover:bg-slate-100"
                        >
                          <Edit2 size={14} />
                        </button>
                        <button
                          onClick={() =>
                            handleDeleteConfirm("lessons", item._id)
                          }
                          className="p-1.5 text-red-500 bg-slate-50 rounded-lg transition-colors hover:bg-red-50"
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
                        className="text-sm text-slate-600 border-l-2 border-[#312C85]/10 pl-4 leading-relaxed font-bold"
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
              <div className="bg-white border border-[#312C85]/30 text-[#312C85] px-10 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest group-hover:bg-[#312C85] group-hover:text-white transition-all">
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

      {/* --- MODALS --- */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-[1000] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md"
          onClick={() => setIsModalOpen(false)}
        >
          <div
            className="relative w-full max-w-5xl aspect-video bg-black rounded-3xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 z-10 p-3 bg-white/10 hover:bg-red-500 text-white rounded-full transition-all"
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

      {statusModal.show && (
        <div className="fixed bottom-10 right-10 z-[3000] animate-in slide-in-from-right-10 duration-300">
          <div
            className={`flex items-center gap-3 p-4 rounded-2xl shadow-2xl border ${statusModal.type === "success" ? "bg-emerald-50 border-emerald-200 text-emerald-700" : "bg-red-50 border-red-200 text-red-700"}`}
          >
            {statusModal.type === "success" ? (
              <Check size={20} />
            ) : (
              <AlertCircle size={20} />
            )}
            <p className="font-bold text-sm">{statusModal.message}</p>
            <button
              onClick={closeStatus}
              className="ml-4 opacity-50 hover:opacity-100"
            >
              <X size={16} />
            </button>
          </div>
        </div>
      )}

      {confirmModal.show && (
        <div className="fixed inset-0 z-[2000] flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            onClick={closeConfirm}
          ></div>
          <div className="relative bg-white rounded-[2.5rem] p-8 shadow-2xl border border-slate-100 max-w-sm w-full text-center animate-in zoom-in-95">
            <div className="mx-auto w-20 h-20 rounded-full bg-amber-50 text-amber-500 flex items-center justify-center mb-6">
              <HelpCircle size={40} />
            </div>
            <h3 className="text-xl font-black text-slate-900 mb-2 uppercase">
              Устгах уу?
            </h3>
            <p className="text-slate-500 text-sm mb-8 font-bold">
              Энэ үйлдлийг буцаах боломжгүй.
            </p>
            <div className="flex gap-3">
              <button
                onClick={closeConfirm}
                className="flex-1 py-4 rounded-2xl bg-slate-100 text-slate-600 font-black uppercase text-xs hover:bg-slate-200 transition-colors"
              >
                Болих
              </button>
              <button
                onClick={executeDelete}
                className="flex-1 py-4 rounded-2xl bg-red-500 text-white font-black uppercase text-xs shadow-lg shadow-red-200 hover:bg-red-600 transition-colors"
              >
                Тийм, устга
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
