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

  // Солигдох төлөвүүд
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [generatedCode, setGeneratedCode] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!loading && !user) router.push("/");
  }, [user, loading, router]);

  const handleAction = async () => {
    setIsSubmitting(true);
    const actionType = user.role === "teacher" ? "create" : "join";

    try {
      const res = await fetch("/api/classes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: actionType,
          className: user.role === "teacher" ? inputValue : null,
          classCode: user.role === "student" ? inputValue : null,
        }),
      });

      const data = await res.json();

      if (data.success) {
        if (user.role === "teacher") {
          setGeneratedCode(data.code);
        } else {
          alert("Ангид амжилттай нэгдлээ!");
          setIsModalOpen(false);
          // router.push("/my-class"); // Шаардлагатай бол шилжүүлнэ
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

  if (loading || !user)
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="w-12 h-12 border-4 border-[#312C85] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );

  return (
    <main className="min-h-screen bg-white font-sans antialiased relative">
      <NavAll />

      {/* --- MODAL WINDOW --- */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            onClick={() => setIsModalOpen(false)}
          />

          <div className="bg-white w-full max-w-md rounded-[2.5rem] p-10 shadow-2xl relative z-10 animate-in fade-in zoom-in duration-200">
            <button
              onClick={() => {
                setIsModalOpen(false);
                setGeneratedCode("");
                setInputValue("");
              }}
              className="absolute top-6 right-6 text-slate-400 hover:text-slate-900 transition-colors"
            >
              <FaTimes size={20} />
            </button>

            <div className="text-center mb-8">
              <h2 className="text-3xl font-black text-slate-900 mb-2">
                {user.role === "teacher" ? "Анги үүсгэх" : "Ангид нэгдэх"}
              </h2>
              <p className="text-slate-500 font-medium text-sm px-4">
                {user.role === "teacher"
                  ? "Шинэ ангийн нэр оруулснаар сурагчид нэвтрэх код үүснэ."
                  : "Багшаас авсан 6 оронтой нууц кодыг оруулна уу."}
              </p>
            </div>

            {generatedCode ? (
              <div className="space-y-6">
                <div className="bg-[#312C85]/5 border-2 border-dashed border-[#312C85]/30 rounded-3xl p-8 text-center group relative">
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#312C85]/60 block mb-3">
                    Таны ангийн код
                  </span>
                  <div className="text-5xl font-black text-[#312C85] tracking-widest">
                    {generatedCode}
                  </div>
                </div>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(generatedCode);
                    alert("Код хуулагдлаа!");
                  }}
                  className="w-full flex items-center justify-center gap-2 text-[#312C85] font-bold text-sm hover:underline"
                >
                  <FaCopy /> Кодыг хуулах
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                <input
                  type="text"
                  maxLength={user.role === "teacher" ? 20 : 6}
                  placeholder={
                    user.role === "teacher"
                      ? "Ангийн нэр (Жишээ нь: 10Б)"
                      : "Код оруулна уу..."
                  }
                  className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-6 py-4 outline-none focus:border-[#312C85] transition-all font-bold text-lg text-center"
                  value={inputValue}
                  onChange={(e) =>
                    setInputValue(
                      user.role === "teacher"
                        ? e.target.value
                        : e.target.value.toUpperCase(),
                    )
                  }
                />
                <button
                  onClick={handleAction}
                  disabled={isSubmitting || !inputValue}
                  className="w-full bg-[#312C85] text-white py-4 rounded-2xl font-black hover:bg-[#252166] transition-all shadow-lg shadow-[#312C85]/20 disabled:opacity-50"
                >
                  {isSubmitting
                    ? "Уншиж байна..."
                    : user.role === "teacher"
                      ? "Код үүсгэх"
                      : "Нэгдэх"}
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* --- DASHBOARD BODY --- */}
      <section className="py-20 lg:py-32 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-10">
              <div className="inline-flex items-center gap-2 bg-[#312C85]/5 text-[#312C85] px-5 py-2 rounded-full text-[11px] font-black uppercase tracking-widest border border-[#312C85]/10 shadow-sm">
                ({user.role === "teacher" ? "Багш" : "Сурагч"}:{" "}
                {user.email?.split("@")[0]})
              </div>

              <h1 className="text-7xl lg:text-8xl font-black text-slate-900 leading-[0.9] tracking-tighter">
                EDU <span className="text-[#312C85]">LAB</span>
              </h1>

              <p className="text-slate-500 text-lg font-medium leading-relaxed max-w-lg">
                Шинжлэх ухааныг хамгийн сонирхолтой, интерактив хэлбэрээр
                судалж, мэдлэгээ тэлээрэй.
              </p>

              <div className="pt-4 flex flex-wrap gap-4">
                <button
                  onClick={() => setIsModalOpen(true)}
                  className={`flex items-center gap-3 px-8 py-4 rounded-2xl font-bold transition-all shadow-lg group ${
                    user.role === "teacher"
                      ? "bg-[#312C85] text-white hover:bg-[#252166] shadow-[#312C85]/20"
                      : "bg-slate-900 text-white hover:bg-black shadow-slate-900/20"
                  }`}
                >
                  {user.role === "teacher" ? (
                    <>
                      <FaPlusCircle className="text-xl group-hover:rotate-90 transition-transform duration-300" />{" "}
                      <span>Анги үүсгэх</span>
                    </>
                  ) : (
                    <>
                      <FaSignInAlt className="text-xl group-hover:translate-x-1 transition-transform" />{" "}
                      <span>Ангид нэгдэх</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {courses.map((course, idx) => {
                const Icon = course.icon;
                return (
                  <Link
                    key={idx}
                    href={course.href}
                    className={`${course.translateY} group block bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 flex flex-col min-h-[220px]`}
                  >
                    <div
                      className={`w-14 h-14 ${course.bgColor} ${course.iconColor} rounded-2xl mb-8 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform`}
                    >
                      <Icon />
                    </div>
                    <h3 className="text-xl font-black text-slate-800 mb-2 group-hover:text-[#312C85]">
                      {course.title}
                    </h3>
                    <p className="text-slate-400 text-sm font-bold">
                      {course.desc}
                    </p>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
