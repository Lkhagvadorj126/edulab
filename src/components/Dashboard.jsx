"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  FaFlask,
  FaAtom,
  FaGlobeAmericas,
  FaDna,
  FaPlusCircle,
  FaSignInAlt,
  FaTimes,
  FaCopy,
  FaUsers,
  FaTrophy,
  FaTrash, // Энд FaTrash2-ыг FaTrash болгож засав
} from "react-icons/fa";
import { useAuth } from "@/context/AuthContext";
import NavAll from "./NavAll";
import Link from "next/link";

const courses = [
  {
    title: "Физик",
    href: "/indexP",
    desc: "Механик, Квант физик",
    icon: FaAtom,
    iconColor: "text-slate-600",
    bgColor: "bg-slate-50",
    translateY: "lg:translate-y-0",
  },
  {
    title: "Хими",
    href: "/indexH",
    desc: "Атом, Химийн урвал",
    icon: FaFlask,
    iconColor: "text-slate-600",
    bgColor: "bg-slate-50",
    translateY: "lg:translate-y-12",
  },
  {
    title: "Биологи",
    href: "/biology",
    desc: "Генетик, Амьд ертөнц",
    icon: FaDna,
    iconColor: "text-[#312C85]",
    bgColor: "bg-[#312C85]/5",
    translateY: "lg:-translate-y-4",
  },
  {
    title: "Газарзүй",
    href: "/indexGeo",
    desc: "Интерактив атлас",
    icon: FaGlobeAmericas,
    iconColor: "text-[#312C85]",
    bgColor: "bg-[#312C85]/5",
    translateY: "lg:translate-y-8",
  },
];

export default function Dashboard() {
  const { user, loading } = useAuth();
  const router = useRouter();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [generatedCode, setGeneratedCode] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [studentCode, setStudentCode] = useState("");
  const [classMembers, setClassMembers] = useState([]);
  const [formData, setFormData] = useState({
    city: "",
    district: "",
    school: "",
    className: "",
  });

  // Сурагчдын жагсаалтыг татах функц
  const fetchMembers = async () => {
    if (user?.classCode && user.classCode !== "NO_CLASS") {
      try {
        const res = await fetch(`/api/classes?classCode=${user.classCode}`);
        const data = await res.json();
        setClassMembers(data);
      } catch (err) {
        console.error("Гишүүдийг татахад алдаа гарлаа");
      }
    }
  };

  useEffect(() => {
    if (user) fetchMembers();
  }, [user]);

  useEffect(() => {
    if (!loading && !user) router.push("/");
  }, [user, loading, router]);

  // --- СУРАГЧ ХАСАХ ФУНКЦ ---
  const handleRemoveMember = async (memberId, memberName) => {
    if (!confirm(`${memberName} сурагчийг ангиас хасахдаа итгэлтэй байна уу?`))
      return;

    try {
      const res = await fetch("/api/classes", {
        method: "PATCH", // Эсвэл танай API-аас хамаарч POST/PUT
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "remove_member",
          memberId: memberId,
          classCode: user.classCode,
        }),
      });

      const data = await res.json();
      if (data.success) {
        // Жагсаалтыг шинэчлэх
        fetchMembers();
      } else {
        alert(data.message || "Хасахад алдаа гарлаа");
      }
    } catch (err) {
      alert("Сервертэй холбогдоход алдаа гарлаа");
    }
  };

  const handleAction = async () => {
    if (!user?._id) return;
    setIsSubmitting(true);
    const body =
      user.role === "teacher"
        ? {
            action: "create",
            userId: user._id,
            location: { city: formData.city, district: formData.district },
            school: formData.school,
            className: formData.className,
          }
        : { action: "join", userId: user._id, classCode: studentCode };

    try {
      const res = await fetch("/api/classes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = await res.json();
      if (data.success) {
        if (user.role === "teacher") setGeneratedCode(data.code);
        else window.location.reload();
      } else alert(data.message);
    } catch (err) {
      alert("Алдаа гарлаа");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading || !user)
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="w-12 h-12 border-4 border-[#312C85] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );

  const hasClass = user.classCode && user.classCode !== "NO_CLASS";

  return (
    <main className="min-h-screen bg-white font-sans antialiased relative">
      <NavAll />

      {/* --- MODAL WINDOW (Анги үүсгэх/солих) --- */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            onClick={() => setIsModalOpen(false)}
          />
          <div className="bg-white w-full max-w-lg rounded-[2.5rem] p-10 shadow-2xl relative z-10 animate-in fade-in zoom-in duration-300">
            <button
              onClick={() => {
                setIsModalOpen(false);
                setGeneratedCode("");
              }}
              className="absolute top-6 right-6 text-slate-400 hover:text-slate-900"
            >
              <FaTimes size={20} />
            </button>
            <div className="text-center mb-8">
              <h2 className="text-3xl font-black text-slate-900 mb-2">
                {user.role === "teacher"
                  ? "Шинэ анги үүсгэх"
                  : "Өөр ангид нэгдэх"}
              </h2>
              <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest">
                Одоогийн код: {user.classCode}
              </p>
            </div>

            {generatedCode ? (
              <div className="space-y-6 text-center">
                <div className="bg-[#312C85]/5 border-2 border-dashed border-[#312C85]/30 rounded-3xl p-10">
                  <div className="text-5xl font-black text-[#312C85] tracking-widest">
                    {generatedCode}
                  </div>
                </div>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(generatedCode);
                    alert("Код хуулагдлаа!");
                  }}
                  className="flex items-center justify-center gap-2 w-full text-[#312C85] font-bold underline"
                >
                  <FaCopy /> Код хуулах
                </button>
                <button
                  onClick={() => window.location.reload()}
                  className="w-full bg-slate-900 text-white py-4 rounded-2xl font-black"
                >
                  Дуусгах
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {user.role === "teacher" ? (
                  <>
                    <div className="grid grid-cols-2 gap-4">
                      <input
                        placeholder="Аймаг/Хот"
                        className="bg-slate-50 border-2 border-slate-100 rounded-2xl px-4 py-3 outline-none focus:border-[#312C85] font-bold text-sm"
                        value={formData.city}
                        onChange={(e) =>
                          setFormData({ ...formData, city: e.target.value })
                        }
                      />
                      <input
                        placeholder="Сум/Дүүрэг"
                        className="bg-slate-50 border-2 border-slate-100 rounded-2xl px-4 py-3 outline-none focus:border-[#312C85] font-bold text-sm"
                        value={formData.district}
                        onChange={(e) =>
                          setFormData({ ...formData, district: e.target.value })
                        }
                      />
                    </div>
                    <input
                      placeholder="Сургуулийн нэр"
                      className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-4 py-3 outline-none focus:border-[#312C85] font-bold text-sm"
                      value={formData.school}
                      onChange={(e) =>
                        setFormData({ ...formData, school: e.target.value })
                      }
                    />
                    <input
                      placeholder="Ангийн нэр (10Б...)"
                      className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-4 py-3 outline-none focus:border-[#312C85] font-bold text-sm"
                      value={formData.className}
                      onChange={(e) =>
                        setFormData({ ...formData, className: e.target.value })
                      }
                    />
                  </>
                ) : (
                  <input
                    type="text"
                    maxLength={6}
                    placeholder="КОД"
                    className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-6 py-5 outline-none focus:border-[#312C85] font-black text-3xl text-center"
                    value={studentCode}
                    onChange={(e) =>
                      setStudentCode(e.target.value.toUpperCase())
                    }
                  />
                )}
                <button
                  onClick={handleAction}
                  disabled={isSubmitting}
                  className="w-full bg-[#312C85] text-white py-4 rounded-2xl font-black"
                >
                  {isSubmitting ? "Уншиж байна..." : "БАТАЛГААЖУУЛАХ"}
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* --- DASHBOARD CONTENT --- */}
      <section className="py-20 lg:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-20 items-start">
            <div className="space-y-10">
              <div className="inline-flex items-center gap-2 bg-[#312C85]/5 text-[#312C85] px-5 py-2 rounded-full text-[11px] font-black uppercase tracking-widest border border-[#312C85]/10">
                {user.role === "teacher" ? "БАГШ" : "СУРАГЧ"}: {user.name} |{" "}
                {user.classCode}
              </div>

              {hasClass ? (
                <div className="bg-white border border-slate-100 rounded-[2.5rem] p-8 shadow-sm space-y-6">
                  <div className="flex justify-between items-center">
                    <h2 className="text-xl font-black text-slate-900 flex items-center gap-3 uppercase tracking-tighter">
                      <FaUsers className="text-[#312C85]" /> Ангийнхан (
                      {classMembers.length})
                    </h2>
                    <button
                      onClick={() => setIsModalOpen(true)}
                      className="text-[10px] font-black text-slate-400 hover:text-[#312C85] uppercase tracking-widest"
                    >
                      {user.role === "teacher" ? "Шинэ анги" : "Анги солих"}
                    </button>
                  </div>

                  <div className="space-y-3 max-h-[350px] overflow-y-auto pr-2 custom-scrollbar">
                    {classMembers.map((member, i) => (
                      <div
                        key={i}
                        className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100 group hover:bg-white hover:border-[#312C85]/20 transition-all"
                      >
                        <div className="flex items-center gap-4">
                          <div
                            className={`w-10 h-10 rounded-xl flex items-center justify-center font-black text-sm ${member.role === "teacher" ? "bg-amber-100 text-amber-600" : "bg-indigo-100 text-[#312C85]"}`}
                          >
                            {member.name.charAt(0)}
                          </div>
                          <div>
                            <p className="text-sm font-black text-slate-800">
                              {member.name}{" "}
                              {member.role === "teacher" && (
                                <span className="text-[9px] bg-amber-500 text-white px-1.5 py-0.5 rounded ml-1">
                                  БАГШ
                                </span>
                              )}
                            </p>
                            <p className="text-[10px] text-slate-400 font-bold uppercase">
                              {member.email.split("@")[0]}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-black text-[#312C85]">
                              {member.totalXp.toLocaleString()}
                            </span>
                            <FaTrophy className="text-amber-400" size={12} />
                          </div>

                          {/* ХАСАХ ТОВЧ: Зөвхөн багш өөрөө биш, бусад сурагчдыг хасах боломжтой */}
                          {user.role === "teacher" &&
                            member._id !== user._id && (
                              <button
                                onClick={() =>
                                  handleRemoveMember(member._id, member.name)
                                }
                                className="p-2 text-slate-300 hover:text-red-500 transition-colors"
                                title="Ангиас хасах"
                              >
                                <FaTrash size={14} />
                              </button>
                            )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <>
                  <h1 className="text-7xl lg:text-8xl font-black text-slate-900 leading-[0.9] tracking-tighter">
                    EDU <span className="text-[#312C85]">LAB</span>
                  </h1>
                  <p className="text-slate-500 text-lg font-medium leading-relaxed max-w-lg">
                    Шинжлэх ухааныг интерактив хэлбэрээр судалж, мэдлэгээ
                    тэлээрэй.
                  </p>
                  <button
                    onClick={() => setIsModalOpen(true)}
                    className={`flex items-center gap-3 px-8 py-4 rounded-2xl font-bold transition-all shadow-lg ${user.role === "teacher" ? "bg-[#312C85] text-white" : "bg-slate-900 text-white"}`}
                  >
                    {user.role === "teacher" ? (
                      <>
                        <FaPlusCircle /> <span>Анги үүсгэх</span>
                      </>
                    ) : (
                      <>
                        <FaSignInAlt /> <span>Ангид нэгдэх</span>
                      </>
                    )}
                  </button>
                </>
              )}
            </div>

            {/* ХИЧЭЭЛҮҮД */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {courses.map((course, idx) => (
                <Link
                  key={idx}
                  href={course.href}
                  className={`${course.translateY} group block bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-2xl transition-all duration-500 min-h-[200px]`}
                >
                  <div
                    className={`w-12 h-12 ${course.bgColor} ${course.iconColor} rounded-xl mb-6 flex items-center justify-center text-xl group-hover:scale-110 transition-all`}
                  >
                    <course.icon />
                  </div>
                  <h3 className="text-lg font-black text-slate-800 mb-1 group-hover:text-[#312C85]">
                    {course.title}
                  </h3>
                  <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">
                    {course.desc}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
