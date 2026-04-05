"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  FaFlask,
  FaAtom,
  FaGlobeAmericas,
  FaDna,
  FaUserGraduate,
  FaChalkboardTeacher,
} from "react-icons/fa";
import { useAuth } from "@/context/AuthContext";
import { Eye, EyeOff, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";

export default function Login() {
  const router = useRouter();
  const { login, user } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("student");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [modal, setModal] = useState({
    show: false,
    type: "success",
    title: "",
    message: "",
  });

  useEffect(() => {
    if (user) router.push("/dashboard");
  }, [user, router]);

  const showAlert = (type, title, message) => {
    setModal({ show: true, type, title, message });
  };

  const items = [
    { name: "Хими", icon: FaFlask, desc: "Молекул, урвал" },
    { name: "Физик", icon: FaAtom, desc: "Хүч, энерги" },
    { name: "Газарзүй", icon: FaGlobeAmericas, desc: "Эх дэлхий" },
    { name: "Биологи", icon: FaDna, desc: "Амьд бие, эс" },
  ];

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, role }),
      });
      const data = await res.json();

      if (res.ok) {
        await login(data.user);
        localStorage.setItem("userId", data.user.id || data.user._id);
        localStorage.setItem("userEmail", data.user.email);
        localStorage.setItem("userRole", data.user.role);

        showAlert(
          "success",
          "Амжилттай",
          "Тавтай морил! Dashboard руу шилжиж байна...",
        );

        setTimeout(() => {
          router.push("/dashboard");
          router.refresh();
        }, 1200);
      } else {
        showAlert("error", "Алдаа", data.message || "Мэдээлэл буруу байна");
      }
    } catch (err) {
      showAlert("error", "Алдаа", "Сервертэй холбогдоход алдаа гарлаа");
    } finally {
      setLoading(false);
    }
  };

  const labelStyle =
    "text-[10px] font-black uppercase tracking-wider text-slate-400 ml-1 mb-1 block";
  const inputStyle =
    "w-full px-5 py-4 rounded-2xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-4 focus:ring-[#312C85]/5 focus:border-[#312C85] transition-all outline-none text-sm";

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-slate-50 text-slate-900 font-sans relative">
      {modal.show && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
          <div className="bg-white rounded-[32px] p-8 max-w-sm w-full shadow-2xl text-center animate-in zoom-in-95 duration-200">
            <div
              className={`mx-auto w-16 h-16 rounded-2xl flex items-center justify-center mb-6 ${modal.type === "success" ? "bg-green-50 text-green-500" : "bg-red-50 text-red-500"}`}
            >
              {modal.type === "success" ? (
                <CheckCircle2 size={32} />
              ) : (
                <AlertCircle size={32} />
              )}
            </div>
            <h3 className="text-xl font-black mb-2">{modal.title}</h3>
            <p className="text-slate-500 text-sm mb-8 leading-relaxed">
              {modal.message}
            </p>
            <button
              onClick={() => setModal({ ...modal, show: false })}
              className="w-full py-4 rounded-2xl font-black text-xs uppercase tracking-widest bg-[#312C85] text-white"
            >
              Ойлголоо
            </button>
          </div>
        </div>
      )}

      <div className="w-full max-w-6xl flex flex-col md:flex-row overflow-hidden rounded-[2.5rem] shadow-xl border border-white bg-white">
        <div className="hidden md:flex w-5/12 flex-col justify-center items-start p-12 bg-[#312C85] text-white relative overflow-hidden">
          <div className="absolute -top-10 -right-10 text-white/10 pointer-events-none">
            <FaAtom size={280} className="animate-spin-slow opacity-20" />
          </div>
          <h1 className="text-4xl font-black leading-tight mb-6 tracking-tight italic uppercase">
            Edulab <br />
            <span className="opacity-80">Science</span>
          </h1>
          <p className="mb-12 text-blue-100/70 leading-relaxed max-w-xs z-10 text-sm">
            Тавтай морил! Өөрийн аккаунтаар нэвтэрч шинжлэх ухааны аяллаа
            үргэлжлүүлнэ үү.
          </p>
          <div className="grid grid-cols-2 gap-4 w-full z-10">
            {items.map((item, index) => (
              <div
                key={index}
                className="flex flex-col items-start p-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm"
              >
                <item.icon className="w-5 h-5 mb-3 text-blue-300" />
                <h3 className="font-bold text-sm text-white">{item.name}</h3>
                <p className="text-[10px] text-blue-200/50 uppercase tracking-widest mt-1">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="w-full md:w-7/12 p-8 md:p-20 flex flex-col justify-center">
          <div className="max-w-md mx-auto w-full">
            <div className="mb-8 text-center md:text-left">
              <h2 className="text-3xl font-black text-slate-900 mb-2 uppercase italic">
                Нэвтрэх
              </h2>
              <p className="text-slate-500 text-sm">
                Системд нэвтрэх төрлөө сонгоно уу.
              </p>
            </div>

            <div className="flex p-1.5 bg-slate-100 rounded-2xl mb-8">
              <button
                type="button"
                onClick={() => setRole("student")}
                className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-black text-xs uppercase transition-all ${role === "student" ? "bg-white text-[#312C85] shadow-sm" : "text-slate-400"}`}
              >
                <FaUserGraduate size={14} /> Сурагч
              </button>
              <button
                type="button"
                onClick={() => setRole("teacher")}
                className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-black text-xs uppercase transition-all ${role === "teacher" ? "bg-white text-[#312C85] shadow-sm" : "text-slate-400"}`}
              >
                <FaChalkboardTeacher size={14} /> Багш
              </button>
            </div>

            <form className="space-y-5" onSubmit={handleLogin}>
              <div className="space-y-1">
                <label className={labelStyle}>И-мэйл хаяг</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className={inputStyle}
                  placeholder="name@science.mn"
                />
              </div>
              <div className="space-y-1">
                <label className={labelStyle}>Нууц үг</label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className={inputStyle}
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-5 top-4 text-slate-400 hover:text-slate-600 transition-colors"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>
              <button
                type="submit"
                disabled={loading}
                className={`w-full py-5 rounded-2xl font-black text-white shadow-lg transition-all active:scale-[0.98] uppercase tracking-widest text-xs mt-4 ${loading ? "bg-slate-400" : "bg-[#312C85] hover:bg-[#28246d] shadow-[#312C85]/20"}`}
              >
                {loading ? (
                  <Loader2 className="animate-spin inline mr-2" size={16} />
                ) : role === "teacher" ? (
                  "Багшаар нэвтрэх"
                ) : (
                  "Нэвтрэх"
                )}
              </button>
            </form>

            <p className="mt-8 text-center text-xs text-slate-500 font-bold uppercase tracking-wider">
              Шинэ хэрэглэгч үү?{" "}
              <Link
                href="/register"
                className="text-[#312C85] hover:underline ml-1"
              >
                Бүртгэл үүсгэх
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
