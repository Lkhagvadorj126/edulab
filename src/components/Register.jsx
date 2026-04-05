"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  FaFlask,
  FaAtom,
  FaGlobeAmericas,
  FaDna,
  FaUserGraduate,
  FaChalkboardTeacher,
  FaUser,
} from "react-icons/fa";
import {
  Eye,
  EyeOff,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Loader2,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export default function Register() {
  const router = useRouter();
  const { login } = useAuth();

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

  const [modal, setModal] = useState({
    show: false,
    type: "success",
    title: "",
    message: "",
  });

  const items = [
    { name: "Хими", icon: FaFlask, desc: "Молекул, урвал" },
    { name: "Физик", icon: FaAtom, desc: "Хүч, энерги" },
    { name: "Газарзүй", icon: FaGlobeAmericas, desc: "Эх дэлхий" },
    { name: "Биологи", icon: FaDna, desc: "Амьд бие, эс" },
  ];

  const showAlert = (type, title, message) => {
    setModal({ show: true, type, title, message });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      showAlert("error", "Алдаа", "Нууц үгүүд хоорондоо таарахгүй байна!");
      return;
    }

    if (formData.role === "teacher" && formData.teacherCode !== "teacher2026") {
      showAlert("error", "Хандалт татгалзлаа", "Багшийн код буруу байна.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          role: formData.role,
          school: formData.role === "teacher" ? "Захиргаа" : formData.school,
          grade: formData.role === "teacher" ? "Teacher" : formData.grade,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        if (data.user) {
          await login(data.user);
          localStorage.setItem("userId", data.user.id || data.user._id);
          localStorage.setItem("userRole", data.user.role);

          showAlert(
            "success",
            "Баяр хүргэе!",
            "Бүртгэл амжилттай. Систем рүү нэвтэрч байна...",
          );

          setTimeout(() => {
            router.push("/dashboard");
            router.refresh();
          }, 1500);
        } else {
          router.push("/");
        }
      } else {
        showAlert(
          "error",
          "Бүртгэл амжилтгүй",
          data.message || "Мэдээллээ шалгана уу.",
        );
      }
    } catch (err) {
      console.error("Register Error:", err);
      showAlert("error", "Алдаа гарлаа", "Сервертэй холбогдож чадсангүй.");
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
              onClick={() => {
                setModal({ ...modal, show: false });
                if (modal.type === "success") router.push("/dashboard");
              }}
              className="w-full py-4 rounded-2xl font-black text-xs uppercase tracking-widest bg-[#312C85] text-white"
            >
              Ойлголоо
            </button>
          </div>
        </div>
      )}

      <div className="w-full max-w-6xl flex flex-col md:flex-row overflow-hidden rounded-[2.5rem] shadow-xl border border-white bg-white">
        <div className="hidden md:flex w-5/12 flex-col justify-center p-12 bg-[#312C85] text-white relative">
          <div className="absolute -top-10 -right-10 text-white/10 pointer-events-none">
            <FaAtom size={280} className="animate-spin-slow opacity-20" />
          </div>
          <h1 className="text-4xl font-black italic uppercase mb-6 leading-tight">
            Edulab <br />
            <span className="opacity-80">Science</span>
          </h1>
          <p className="mb-12 text-blue-100/70 text-sm max-w-xs z-10">
            Шинжлэх ухааны интерактив ертөнцөд нэгдэж, мэдлэгээ
            баталгаажуулаарай.
          </p>
          <div className="grid grid-cols-2 gap-4 w-full z-10">
            {items.map((item, index) => (
              <div
                key={index}
                className="p-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm"
              >
                <item.icon className="w-5 h-5 mb-3 text-blue-300" />
                <h3 className="font-bold text-sm">{item.name}</h3>
                <p className="text-[10px] text-blue-200/50 uppercase tracking-widest">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="w-full md:w-7/12 p-8 md:p-16 flex flex-col justify-center bg-white">
          <div className="max-w-md mx-auto w-full">
            <h2 className="text-3xl font-black text-slate-900 mb-6 uppercase italic">
              Бүртгүүлэх
            </h2>
            <div className="flex p-1.5 bg-slate-100 rounded-2xl mb-8">
              {["student", "teacher"].map((r) => (
                <button
                  key={r}
                  type="button"
                  onClick={() => setFormData({ ...formData, role: r })}
                  className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-black text-xs uppercase transition-all ${formData.role === r ? "bg-white text-[#312C85] shadow-sm" : "text-slate-400"}`}
                >
                  {r === "student" ? (
                    <FaUserGraduate size={14} />
                  ) : (
                    <FaChalkboardTeacher size={14} />
                  )}
                  {r === "student" ? "Сурагч" : "Багш"}
                </button>
              ))}
            </div>

            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="space-y-1">
                <label className={labelStyle}>Овог нэр</label>
                <div className="relative">
                  <FaUser
                    className="absolute left-5 top-[18px] text-slate-300"
                    size={14}
                  />
                  <input
                    required
                    className={`${inputStyle} pl-12`}
                    placeholder="Нэрээ оруулна уу"
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className="space-y-1">
                <label className={labelStyle}>И-мэйл хаяг</label>
                <input
                  type="email"
                  required
                  className={inputStyle}
                  placeholder="name@science.mn"
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
              </div>

              {formData.role === "student" && (
                <div className="grid grid-cols-2 gap-4 animate-in fade-in slide-in-from-top-2">
                  <div className="space-y-1">
                    <label className={labelStyle}>Сургууль</label>
                    <input
                      required
                      className={inputStyle}
                      placeholder="Сургууль"
                      onChange={(e) =>
                        setFormData({ ...formData, school: e.target.value })
                      }
                    />
                  </div>
                  <div className="space-y-1">
                    <label className={labelStyle}>Анги</label>
                    <input
                      required
                      className={inputStyle}
                      placeholder="10B"
                      onChange={(e) =>
                        setFormData({ ...formData, grade: e.target.value })
                      }
                    />
                  </div>
                </div>
              )}

              {formData.role === "teacher" && (
                <div className="space-y-1 animate-in slide-in-from-left-2">
                  <label className={labelStyle}>Багшийн код</label>
                  <div className="relative">
                    <ShieldCheck
                      className="absolute left-5 top-[18px] text-[#312C85]"
                      size={18}
                    />
                    <input
                      type="password"
                      required
                      className={`${inputStyle} pl-12 border-blue-100`}
                      placeholder="Нууц код"
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

              <div className="grid grid-cols-2 gap-4">
                <div className="relative">
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
                    className="absolute right-5 top-[42px] text-slate-400"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
                <div className="relative">
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
                    className="absolute right-5 top-[42px] text-slate-400"
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
                disabled={loading}
                className="w-full py-5 rounded-2xl font-black text-white bg-[#312C85] shadow-lg active:scale-[0.98] transition-all uppercase tracking-widest text-xs mt-4 flex items-center justify-center gap-2"
              >
                {loading ? (
                  <Loader2 className="animate-spin" size={18} />
                ) : (
                  "Бүртгэл үүсгэх"
                )}
              </button>
            </form>
            <p className="mt-8 text-center text-xs text-slate-500 font-bold uppercase tracking-wider">
              Бүртгэлтэй юу?{" "}
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
