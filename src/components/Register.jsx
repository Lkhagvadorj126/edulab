"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import {
  FaFlask,
  FaAtom,
  FaGlobeAmericas,
  FaDna,
  FaUserGraduate,
  FaChalkboardTeacher,
  FaUser,
  FaSchool,
  FaLayerGroup,
} from "react-icons/fa";
import { Eye, EyeOff, ShieldCheck } from "lucide-react";

export default function Register() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    school: "",
    grade: "",
    email: "",
    password: "",
    confirmPassword: "",
    teacherCode: "",
    role: "student",
  });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const items = [
    { name: "Хими", icon: FaFlask },
    { name: "Физик", icon: FaAtom },
    { name: "Газарзүй", icon: FaGlobeAmericas },
    { name: "Биологи", icon: FaDna },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Нууц үгүүд хоорондоо таарахгүй байна!");
      return;
    }

    // БАГШИЙН КОД ШАЛГАЛТ - Хэрэв багш бол заавал зөв код нэхнэ
    if (formData.role === "teacher" && formData.teacherCode !== "teacher2026") {
      alert(
        "Багшийн баталгаажуулах код буруу байна. Эрх бүхий багштай холбогдоно уу.",
      );
      return;
    }

    setLoading(true);

    const submissionData = {
      name: formData.name,
      email: formData.email,
      password: formData.password,
      role: formData.role,
      teacherCode: formData.teacherCode,
      school: formData.role === "teacher" ? "Захиргаа / Багш" : formData.school,
      grade: formData.role === "teacher" ? "Teacher" : formData.grade,
    };

    try {
      const res = await fetch("/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(submissionData),
      });

      const data = await res.json();
      if (res.ok) {
        alert("Амжилттай бүртгэгдлээ!");
        router.push("/");
      } else {
        alert(data.message || "Бүртгэл амжилтгүй. Дахин оролдоно уу.");
      }
    } catch (err) {
      alert("Сервертэй холбогдоход алдаа гарлаа");
    } finally {
      setLoading(false);
    }
  };

  const inputStyle =
    "w-full px-5 py-3.5 rounded-2xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-4 focus:ring-[#312C85]/5 focus:border-[#312C85] transition-all outline-none text-sm";
  const labelStyle =
    "text-[10px] font-black uppercase tracking-wider text-slate-400 ml-1 mb-1 block";

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-slate-50 text-slate-900 font-sans">
      <div className="w-full max-w-6xl flex flex-col md:flex-row overflow-hidden rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-white bg-white">
        {/* Зүүн тал */}
        <div className="hidden md:flex w-5/12 flex-col justify-center items-start p-12 bg-[#312C85] text-white relative overflow-hidden">
          <div className="absolute -top-10 -right-10 text-white/10 pointer-events-none">
            <FaAtom size={280} className="animate-spin-slow opacity-10" />
          </div>
          <h1 className="text-4xl font-black mb-6 italic uppercase tracking-tighter">
            Edulab <br /> Science
          </h1>
          <div className="grid grid-cols-2 gap-4 w-full z-10">
            {items.map((item, index) => (
              <div
                key={index}
                className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm"
              >
                <item.icon className="w-5 h-5 mb-2 text-blue-300" />
                <h3 className="font-bold text-xs">{item.name}</h3>
              </div>
            ))}
          </div>
        </div>

        {/* Баруун тал */}
        <div className="w-full md:w-7/12 p-8 md:p-16 flex flex-col justify-center bg-white">
          <div className="max-w-md mx-auto w-full">
            <h2 className="text-3xl font-black text-slate-900 mb-6 uppercase italic">
              Бүртгүүлэх
            </h2>

            {/* Role Switcher */}
            <div className="flex p-1.5 bg-slate-100 rounded-2xl mb-8">
              <button
                type="button"
                onClick={() => setFormData({ ...formData, role: "student" })}
                className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-black text-xs uppercase transition-all ${
                  formData.role === "student"
                    ? "bg-white text-[#312C85] shadow-sm"
                    : "text-slate-400"
                }`}
              >
                <FaUserGraduate size={14} /> Сурагч
              </button>
              <button
                type="button"
                onClick={() => setFormData({ ...formData, role: "teacher" })}
                className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-black text-xs uppercase transition-all ${
                  formData.role === "teacher"
                    ? "bg-white text-[#312C85] shadow-sm"
                    : "text-slate-400"
                }`}
              >
                <FaChalkboardTeacher size={14} /> Багш
              </button>
            </div>

            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="space-y-1">
                <label className={labelStyle}>Овог нэр</label>
                <div className="relative">
                  <FaUser
                    className="absolute left-4 top-4 text-slate-300"
                    size={12}
                  />
                  <input
                    type="text"
                    required
                    className={`${inputStyle} pl-10`}
                    placeholder="Нэрээ оруулна уу"
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                  />
                </div>
              </div>

              {formData.role === "student" ? (
                <div className="grid grid-cols-2 gap-4 animate-in fade-in slide-in-from-top-2 duration-500">
                  <div className="space-y-1">
                    <label className={labelStyle}>Сургууль</label>
                    <input
                      type="text"
                      required
                      className={inputStyle}
                      placeholder="Сургуулийн нэр"
                      onChange={(e) =>
                        setFormData({ ...formData, school: e.target.value })
                      }
                    />
                  </div>
                  <div className="space-y-1">
                    <label className={labelStyle}>Анги</label>
                    <input
                      type="text"
                      required
                      className={inputStyle}
                      placeholder="Жишээ: 10B"
                      onChange={(e) =>
                        setFormData({ ...formData, grade: e.target.value })
                      }
                    />
                  </div>
                </div>
              ) : (
                /* БАГШИЙН КОД - Нууцлагдсан */
                <div className="space-y-1 animate-in slide-in-from-left-2 duration-300">
                  <label className={labelStyle}>
                    Багшийн баталгаажуулах код
                  </label>
                  <div className="relative">
                    <ShieldCheck
                      className="absolute left-4 top-3.5 text-[#312C85]"
                      size={18}
                    />
                    <input
                      type="password" // Нууц үг шиг харагдана
                      required
                      className={`${inputStyle} pl-12 border-blue-100 focus:border-[#312C85]`}
                      placeholder="Нууц кодыг оруулна уу"
                      value={formData.teacherCode}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          teacherCode: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
              )}

              <div className="space-y-1">
                <label className={labelStyle}>И-мэйл хаяг</label>
                <input
                  type="email"
                  required
                  className={inputStyle}
                  placeholder="example@science.mn"
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1 relative">
                  <label className={labelStyle}>Нууц үг</label>
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    className={inputStyle}
                    placeholder="••••"
                    onChange={(e) =>
                      setFormData({ ...formData, password: e.target.value })
                    }
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-9 text-slate-400"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
                <div className="space-y-1 relative">
                  <label className={labelStyle}>Баталгаажуулах</label>
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    required
                    className={`${inputStyle} ${formData.confirmPassword && formData.password !== formData.confirmPassword ? "border-red-400" : ""}`}
                    placeholder="••••"
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        confirmPassword: e.target.value,
                      })
                    }
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-4 top-9 text-slate-400"
                  >
                    {showConfirmPassword ? (
                      <EyeOff size={16} />
                    ) : (
                      <Eye size={16} />
                    )}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className={`w-full py-4 rounded-2xl font-black text-white shadow-lg transition-all active:scale-95 uppercase tracking-widest text-xs mt-4 ${
                  loading ? "bg-slate-400" : "bg-[#312C85] hover:bg-[#28246d]"
                }`}
              >
                {loading ? "Түр хүлээнэ үү..." : "Бүртгэл үүсгэх"}
              </button>
            </form>
            <p className="mt-8 text-center text-xs text-slate-500 font-bold uppercase tracking-wider">
              Бүртгэлтэй юу?
              <Link href="/" className="text-[#312C85] hover:underline ml-1">
                Нэвтрэх
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
