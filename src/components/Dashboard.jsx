"use client";
import React, { useEffect, useState, useCallback } from "react";
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
  FaTrash,
  FaQrcode,
  FaListUl,
  FaCamera,
} from "react-icons/fa";
import { QRCodeSVG } from "qrcode.react";
import { Html5QrcodeScanner } from "html5-qrcode";
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
  const [isChangingClass, setIsChangingClass] = useState(false);
  const [showQr, setShowQr] = useState(false);
  const [showScanner, setShowScanner] = useState(false);
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

  const hasClass = user?.classCode && user.classCode !== "NO_CLASS";

  const fetchMembers = useCallback(async () => {
    if (hasClass) {
      try {
        const res = await fetch(`/api/classes?classCode=${user.classCode}`);
        const data = await res.json();
        setClassMembers(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Fetch members error:", err);
      }
    }
  }, [user?.classCode, hasClass]);

  useEffect(() => {
    if (user) fetchMembers();
  }, [user, fetchMembers]);

  useEffect(() => {
    if (!loading && !user) router.push("/");
  }, [user, loading, router]);

  // QR Scanner logic - Зөвхөн сурагч дээр ажиллана
  useEffect(() => {
    let scanner;
    if (showScanner && isModalOpen && user?.role === "student") {
      scanner = new Html5QrcodeScanner("reader", {
        fps: 10,
        qrbox: { width: 250, height: 250 },
        aspectRatio: 1.0,
      });

      scanner.render(
        (decodedText) => {
          setStudentCode(decodedText.toUpperCase());
          setShowScanner(false);
          scanner.clear();
        },
        (error) => {
          // Scanning...
        },
      );
    }

    return () => {
      if (scanner) {
        scanner
          .clear()
          .catch((error) => console.error("Failed to clear scanner", error));
      }
    };
  }, [showScanner, isModalOpen, user?.role]);

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
        if (user.role === "teacher") {
          setGeneratedCode(data.code);
        } else {
          window.location.reload();
        }
      } else {
        alert(data.message || "Алдаа гарлаа");
      }
    } catch (err) {
      alert("Сервертэй холбогдоход алдаа гарлаа");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRemoveMember = async (memberId, memberName) => {
    if (!confirm(`${memberName}-г хасахдаа итгэлтэй байна уу?`)) return;
    try {
      const res = await fetch("/api/classes", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "remove_member",
          memberId,
          classCode: user.classCode,
        }),
      });
      const data = await res.json();
      if (data.success) fetchMembers();
    } catch (err) {
      alert("Устгахад алдаа гарлаа");
    }
  };

  if (loading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="w-12 h-12 border-4 border-[#312C85] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-white font-sans antialiased relative">
      <NavAll />

      {/* Modal Section */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            onClick={() => {
              setIsModalOpen(false);
              setIsChangingClass(false);
              setShowQr(false);
              setShowScanner(false);
            }}
          />
          <div className="bg-white w-full max-w-lg rounded-[2.5rem] p-10 shadow-2xl relative z-10 animate-in fade-in zoom-in duration-300 overflow-hidden">
            <button
              onClick={() => {
                setIsModalOpen(false);
                setGeneratedCode("");
                setIsChangingClass(false);
                setShowQr(false);
                setShowScanner(false);
              }}
              className="absolute top-6 right-6 text-slate-400 hover:text-slate-900 z-20"
            >
              <FaTimes size={20} />
            </button>

            {hasClass && !isChangingClass ? (
              <div className="space-y-6">
                <div className="text-center relative">
                  {/* Багшийн зүгээс QR харуулах товчлуур */}
                  <button
                    onClick={() => setShowQr(!showQr)}
                    className="absolute left-0 top-0 p-2 bg-slate-50 rounded-xl text-[#312C85] hover:bg-slate-100 transition-colors"
                  >
                    {showQr ? <FaListUl size={16} /> : <FaQrcode size={16} />}
                  </button>

                  <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tighter flex items-center justify-center gap-3">
                    {showQr ? "Ангийн QR код" : "Ангийнхан"}
                  </h2>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">
                    КОД: {user.classCode}
                  </p>
                </div>

                {showQr ? (
                  <div className="flex flex-col items-center justify-center py-6 space-y-6 animate-in fade-in slide-in-from-bottom-4">
                    <div className="p-6 bg-white border-2 border-slate-100 rounded-[2rem] shadow-sm">
                      <QRCodeSVG
                        value={user.classCode}
                        size={200}
                        fgColor="#312C85"
                        level="H"
                      />
                    </div>
                    <p className="text-slate-500 text-sm font-medium text-center px-4">
                      Сурагчид энэхүү QR кодыг уншуулж ангидаа нэгдэнэ.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                    {classMembers.map((member, i) => (
                      <div
                        key={i}
                        className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100"
                      >
                        <div className="flex items-center gap-4">
                          <div
                            className={`w-10 h-10 rounded-xl flex items-center justify-center font-black text-sm ${member.role === "teacher" ? "bg-amber-100 text-amber-600" : "bg-indigo-100 text-[#312C85]"}`}
                          >
                            {member.name?.charAt(0)}
                          </div>
                          <div>
                            <p className="text-sm font-black text-slate-800">
                              {member.name}
                              {member.role === "teacher" && (
                                <span className="text-[8px] bg-amber-500 text-white px-1 py-0.5 rounded ml-1">
                                  БАГШ
                                </span>
                              )}
                            </p>
                            <p className="text-[10px] text-slate-400 font-bold uppercase">
                              {member.email?.split("@")[0]}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="flex items-center gap-1.5">
                            <span className="text-xs font-black text-[#312C85]">
                              {member.totalXp || 0}
                            </span>
                            <FaTrophy className="text-amber-400" size={10} />
                          </div>
                          {user.role === "teacher" &&
                            member._id !== user._id && (
                              <button
                                onClick={() =>
                                  handleRemoveMember(member._id, member.name)
                                }
                                className="p-2 text-slate-300 hover:text-red-500 transition-colors"
                              >
                                <FaTrash size={12} />
                              </button>
                            )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                <button
                  onClick={() => setIsChangingClass(true)}
                  className="w-full py-3 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] hover:text-[#312C85] mt-4"
                >
                  Анги солих / Шинээр үүсгэх
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="text-center">
                  <h2 className="text-3xl font-black text-slate-900 mb-2">
                    {user.role === "teacher" ? "Анги үүсгэх" : "Ангид нэгдэх"}
                  </h2>
                  <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest">
                    Мэдээллээ оруулна уу
                  </p>
                </div>

                {generatedCode ? (
                  /* Багшийн зүгээс үүсгэсэн код болон QR шууд харагдах хэсэг */
                  <div className="space-y-6 text-center">
                    <div className="bg-[#312C85]/5 border-2 border-dashed border-[#312C85]/30 rounded-3xl p-10 flex flex-col items-center gap-6">
                      <div className="text-5xl font-black text-[#312C85] tracking-widest">
                        {generatedCode}
                      </div>
                      <div className="bg-white p-4 rounded-2xl shadow-sm">
                        <QRCodeSVG
                          value={generatedCode}
                          size={140}
                          fgColor="#312C85"
                        />
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
                      /* Багш мэдээлэл оруулах хэсэг */
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
                              setFormData({
                                ...formData,
                                district: e.target.value,
                              })
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
                          placeholder="Ангийн нэр (Жишээ нь: 10Б)"
                          className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-4 py-3 outline-none focus:border-[#312C85] font-bold text-sm"
                          value={formData.className}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              className: e.target.value,
                            })
                          }
                        />
                      </>
                    ) : (
                      /* Сурагч код оруулах болон QR уншуулах хэсэг */
                      <div className="space-y-4">
                        {showScanner ? (
                          <div className="space-y-4">
                            <div
                              id="reader"
                              className="overflow-hidden rounded-3xl border-2 border-slate-100 bg-slate-50"
                            ></div>
                            <button
                              onClick={() => setShowScanner(false)}
                              className="w-full py-3 bg-red-50 text-red-500 rounded-2xl font-bold text-sm"
                            >
                              Камер хаах
                            </button>
                          </div>
                        ) : (
                          <div className="relative">
                            <input
                              type="text"
                              maxLength={6}
                              placeholder="АНГИЙН КОД"
                              className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-6 py-5 outline-none focus:border-[#312C85] font-black text-3xl text-center uppercase"
                              value={studentCode}
                              onChange={(e) =>
                                setStudentCode(e.target.value.toUpperCase())
                              }
                            />
                            {/* QR SVG дүрс дээр дарахад камер нээгдэнэ */}
                            <button
                              onClick={() => setShowScanner(true)}
                              className="absolute right-3 top-1/2 -translate-y-1/2 p-4 bg-white shadow-xl rounded-xl text-[#312C85] hover:scale-105 transition-transform"
                              title="QR уншуулах"
                            >
                              <FaQrcode size={24} />
                            </button>
                          </div>
                        )}
                      </div>
                    )}
                    <button
                      onClick={handleAction}
                      disabled={isSubmitting || showScanner}
                      className="w-full bg-[#312C85] text-white py-4 rounded-2xl font-black active:scale-95 transition-all disabled:opacity-50 disabled:active:scale-100"
                    >
                      {isSubmitting ? "Уншиж байна..." : "БАТАЛГААЖУУЛАХ"}
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section className="py-24 lg:py-40 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-10">
              <div className="inline-flex items-center gap-2 bg-[#312C85]/5 text-[#312C85] px-5 py-2 rounded-full text-[11px] font-black uppercase tracking-widest border border-[#312C85]/10">
                {user.role === "teacher" ? "БАГШ" : "СУРАГЧ"}: {user.name}{" "}
                {hasClass && `| ${user.classCode}`}
              </div>
              <div className="space-y-6">
                <h1 className="text-7xl lg:text-8xl font-black text-slate-900 leading-[0.9] tracking-tighter">
                  EDU <span className="text-[#312C85]">LAB</span>
                </h1>
                <p className="text-slate-500 text-lg font-medium leading-relaxed max-w-lg">
                  Шинжлэх ухааныг интерактив хэлбэрээр судалж, мэдлэгээ
                  тэлээрэй. Бид танд хамгийн сонирхолтой туршилтуудыг санал
                  болгож байна.
                </p>
              </div>
              <button
                onClick={() => setIsModalOpen(true)}
                className={`flex items-center gap-4 px-10 py-5 rounded-[2rem] font-black uppercase text-xs tracking-widest transition-all shadow-2xl shadow-indigo-100 active:scale-95 ${hasClass ? "bg-white border-2 border-slate-100 text-[#312C85]" : "bg-[#312C85] text-white"}`}
              >
                {hasClass ? (
                  <>
                    <FaUsers size={18} /> <span>Ангийнхан харах</span>
                  </>
                ) : (
                  <>
                    {user.role === "teacher" ? (
                      <FaPlusCircle size={18} />
                    ) : (
                      <FaSignInAlt size={18} />
                    )}
                    <span>
                      {user.role === "teacher" ? "Анги үүсгэх" : "Ангид нэгдэх"}
                    </span>
                  </>
                )}
              </button>
            </div>

            {/* Course Grid */}
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
                  <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">
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
