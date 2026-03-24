import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import {
  FaFlask,
  FaAtom,
  FaGlobeAmericas,
  FaDna,
  FaUserGraduate, // Зассан нэр
  FaChalkboardTeacher,
} from "react-icons/fa";

export default function Register() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("student"); // 'student' эсвэл 'teacher'
  const [loading, setLoading] = useState(false);

  const items = [
    { name: "Хими", icon: FaFlask, desc: "Молекул, урвал" },
    { name: "Физик", icon: FaAtom, desc: "Хүч, энерги" },
    { name: "Газарзүй", icon: FaGlobeAmericas, desc: "Эх дэлхий" },
    { name: "Биологи", icon: FaDna, desc: "Амьд бие, эс" },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, role }), // Role-ийг илгээнэ
      });
      const data = await res.json();
      if (res.ok) {
        alert(
          `${role === "teacher" ? "Багшийн" : "Сурагчийн"} бүртгэл амжилттай!`,
        );
        router.push("/");
      } else {
        alert(data.message);
      }
    } catch (err) {
      alert("Алдаа гарлаа");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-slate-50 text-slate-900 font-sans">
      <div className="w-full max-w-6xl flex flex-col md:flex-row overflow-hidden rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-white bg-white">
        {/* Зүүн тал - Дизайн */}
        <div className="hidden md:flex w-5/12 flex-col justify-center items-start p-12 bg-[#312C85] text-white relative overflow-hidden">
          <div className="absolute -top-10 -right-10 text-white/10 pointer-events-none">
            <FaFlask size={280} className="animate-pulse" />
          </div>

          <h1 className="text-4xl font-black leading-tight mb-6 tracking-tight">
            Байгалийн <br />
            <span className="opacity-80">Ухаан</span>
          </h1>
          <p className="mb-12 text-blue-100/70 leading-relaxed max-w-xs z-10">
            Шинэ бүртгэл үүсгэж, шинжлэх ухааны сонирхолтой аялалдаа гараарай.
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

        {/* Баруун тал - Форм */}
        <div className="w-full md:w-7/12 p-8 md:p-20 flex flex-col justify-center">
          <div className="max-w-md mx-auto w-full">
            <div className="mb-8">
              <h2 className="text-3xl font-black text-slate-900 mb-2">
                Бүртгүүлэх
              </h2>
              <p className="text-slate-500">
                Системд нэвтрэх эрхээ сонгоно уу.
              </p>
            </div>

            {/* Role Selector (Сурагч / Багш сонголт) */}
            <div className="flex p-1.5 bg-slate-100 rounded-2xl mb-8">
              <button
                onClick={() => setRole("student")}
                className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-bold transition-all ${
                  role === "student"
                    ? "bg-white text-[#312C85] shadow-sm"
                    : "text-slate-500 hover:text-slate-700"
                }`}
              >
                <FaUserGraduate /> {/* Энд FaUserGraduate болгож өөрчлөв */}
                Сурагч
              </button>
              <button
                onClick={() => setRole("teacher")}
                className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-bold transition-all ${
                  role === "teacher"
                    ? "bg-white text-[#312C85] shadow-sm"
                    : "text-slate-500 hover:text-slate-700"
                }`}
              >
                <FaChalkboardTeacher /> Багш
              </button>
            </div>

            <form className="space-y-5" onSubmit={handleSubmit}>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-400 ml-1">
                  И-мэйл хаяг
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-5 py-4 rounded-2xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-4 focus:ring-[#312C85]/5 focus:border-[#312C85] transition-all outline-none"
                  placeholder="name@science.mn"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-400 ml-1">
                  Нууц үг
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full px-5 py-4 rounded-2xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-4 focus:ring-[#312C85]/5 focus:border-[#312C85] transition-all outline-none"
                  placeholder="••••••••"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className={`w-full py-5 rounded-2xl font-bold text-white shadow-lg transition-all active:scale-[0.98] uppercase tracking-widest text-sm mt-4 ${
                  loading
                    ? "bg-slate-400"
                    : "bg-[#312C85] hover:bg-[#28246d] shadow-[#312C85]/20"
                }`}
              >
                {loading
                  ? "Түр хүлээнэ үү..."
                  : role === "teacher"
                    ? "Багшаар бүртгүүлэх"
                    : "Бүртгэл үүсгэх"}
              </button>
            </form>

            <p className="mt-8 text-center text-sm text-slate-500">
              Өмнө нь бүртгүүлсэн үү?{" "}
              <Link
                href="/"
                className="text-[#312C85] font-bold hover:underline ml-1"
              >
                Нэвтрэх
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
