"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Shuffle,
  RotateCcw,
  ChevronLeft,
  ChevronRight,
  Zap,
  Rotate3D,
  Globe,
} from "lucide-react";

const ALL_GEOGRAPHY_DATA = [
  // --- ЭХ ГАЗАР БА ДАЛАЙ ---
  {
    question: "Дэлхийн хамгийн гүн цэг аль вэ?",
    answer: "Номхон далайн Марианы хотгор (11,022 метр).",
    topic: "Эх газар ба далай",
  },
  {
    question: "Пангей гэж юу вэ?",
    answer: "Одоогоос 200-300 сая жилийн өмнө оршин байсан супер тив.",
    topic: "Эх газар ба далай",
  },
  {
    question: "Дэлхийн хамгийн том арал аль вэ?",
    answer: "Гренланд арал.",
    topic: "Эх газар ба далай",
  },
  {
    question: "Цунами ихэвчлэн юунаас болж үүсдэг вэ?",
    answer: "Далайн ёроолын газар хөдлөлт ба галт уулын дэлбэрэлт.",
    topic: "Эх газар ба далай",
  },
  {
    question: "Дэлхийн гадаргуугийн хэдэн хувийг ус эзэлдэг вэ?",
    answer: "Ойролцоогоор 71 хувийг.",
    topic: "Эх газар ба далай",
  },
  // --- УУР АМЬСГАЛ ---
  {
    question: "Агаар мандлын хамгийн доод давхарга?",
    answer: "Тропосфер (Бүх цаг уурын үзэгдэл энд явагддаг).",
    topic: "Уур амьсгал",
  },
  {
    question: "Агаарын даралтыг ямар багажаар хэмждэг вэ?",
    answer: "Барометр багажаар.",
    topic: "Уур амьсгал",
  },
  {
    question: "Муссон салхи гэж юу вэ?",
    answer: "Улирлаар чиглэлээ солин үлээдэг салхи.",
    topic: "Уур амьсгал",
  },
  {
    question: "Озоны давхарга ямар ач холбогдолтой вэ?",
    answer: "Нарны хортой хэт ягаан туяанаас дэлхийг хамгаалдаг.",
    topic: "Уур амьсгал",
  },
  {
    question: "Хүлэмжийн үзэгдэл гэж юу вэ?",
    answer: "Агаар мандал дахь хийнүүд дулааныг барьж дэлхийг халаах үйл явц.",
    topic: "Уур амьсгал",
  },
  // --- ХҮН АМ БА СУУРЬШИЛ ---
  {
    question: "Урбанизаци гэж юу вэ?",
    answer: "Хотын хүн ам өсөх, хотжих үйл явц.",
    topic: "Хүн ам",
  },
  {
    question: "Дэлхийн хамгийн их хүн амтай тив?",
    answer: "Ази тив.",
    topic: "Хүн ам",
  },
  {
    question: "Миграци (Шилжих хөдөлгөөн) гэж юу вэ?",
    answer: "Хүмүүс нэг газраас нөгөө рүү байнга оршин суухаар нүүх хөдөлгөөн.",
    topic: "Хүн ам",
  },
  {
    question: "Мегалополис гэж юу вэ?",
    answer: "Олон том хотууд нэгдэж үүсгэсэн асар том хотын бөөгнөрөл.",
    topic: "Хүн ам",
  },
  {
    question: "Антропоген хүчин зүйл гэж юу вэ?",
    answer: "Хүний үйл ажиллагаанаас үүдэлтэй байгаль орчны өөрчлөлт.",
    topic: "Хүн ам",
  },
  // --- ЭДИЙН ЗАСГИЙН ГАЗАРЗҮЙ ---
  {
    question: "Дэлхийн эдийн засгийн үндсэн 3 салбар?",
    answer: "Хөдөө аж ахуй, аж үйлдвэр, үйлчилгээний салбар.",
    topic: "Эдийн засаг",
  },
  {
    question: "Дэлхийн хамгийн том экспортлогч улс?",
    answer: "БНХАУ (Хятад улс).",
    topic: "Эдийн засаг",
  },
  {
    question: "Сэргээгдэх эрчим хүчний эх үүсвэрүүд?",
    answer: "Нар, салхи, ус, газрын гүний дулаан.",
    topic: "Эдийн засаг",
  },
  {
    question: "Глобалчлал гэж юу вэ?",
    answer:
      "Улс орнуудын эдийн засаг, соёл, улс төр харилцан хамааралтай болох.",
    topic: "Эдийн засаг",
  },
  {
    question: "ДНБ (Дотоодын нийт бүтээгдэхүүн) гэж юу вэ?",
    answer: "Улсын нутаг дэвсгэрт нэг жилийн хугацаанд бүтээсэн нийт өртөг.",
    topic: "Эдийн засаг",
  },
  // --- САНСАР БА ДЭЛХИЙ ---
  {
    question: "Дэлхий тэнхлэгээ бүтэн эргэх хугацаа?",
    answer: "23 цаг 56 минут 4 секунд (Ойролцоогоор 24 цаг).",
    topic: "Сансар",
  },
  {
    question: "Нарны аймгийн хамгийн том гараг?",
    answer: "Бархасбадь (Jupiter).",
    topic: "Сансар",
  },
  {
    question: "Дэлхийн хэлбэрийг шинжлэх ухаанд юу гэж нэрлэдэг вэ?",
    answer: "Геоид (Туйл хэсгээрээ хавтгайрсан бөмбөрцөг).",
    topic: "Сансар",
  },
  {
    question: "Зун, өвлийн туйл болох өдрүүд?",
    answer: "6-р сарын 22 (Зун) ба 12-р сарын 22 (Өвөл).",
    topic: "Сансар",
  },
  {
    question: "Гринвичийн меридиан (0 градус) хаана байдаг вэ?",
    answer: "Лондон хотын Гринвич дүүрэгт.",
    topic: "Сансар",
  },
];

export default function CartGeo() {
  const [cards, setCards] = useState([]);
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);

  const generateRandomSet = () => {
    const shuffled = [...ALL_GEOGRAPHY_DATA].sort(() => 0.5 - Math.random());
    setCards(shuffled.slice(0, 10));
    setIndex(0);
    setFlipped(false);
  };

  useEffect(() => {
    generateRandomSet();
  }, []);

  const next = () => {
    setFlipped(false);
    setTimeout(() => setIndex((p) => (p + 1) % cards.length), 150);
  };

  const prev = () => {
    setFlipped(false);
    setTimeout(
      () => setIndex((p) => (p - 1 + cards.length) % cards.length),
      150,
    );
  };

  if (!cards.length) return null;
  const current = cards[index];

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-20 font-sans">
      <section className="max-w-7xl mx-auto px-4 md:px-8 pt-10">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div className="flex items-center gap-4">
            <Link
              href="/geography"
              className="p-3 rounded-2xl bg-white border border-slate-100 shadow-sm text-[#312C85] hover:bg-slate-50 transition-all"
            >
              <ChevronLeft />
            </Link>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Globe size={16} className="text-[#312C85]" />
                <h2 className="text-sm font-black text-[#312C85] uppercase tracking-[0.3em]">
                  Газарзүй Флаш Карт
                </h2>
              </div>
              <div className="h-1 w-20 bg-[#312C85] rounded-full" />
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={generateRandomSet}
              className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-white border border-slate-100 shadow-sm text-slate-600 font-black text-[10px] uppercase tracking-widest hover:text-[#312C85] hover:border-[#312C85]/20 transition-all active:scale-95"
            >
              <Shuffle size={14} /> Шинэ 10 асуулт
            </button>
          </div>
        </div>

        <div className="max-w-[700px] mx-auto">
          <div className="mb-10 px-2">
            <div className="flex justify-between items-end mb-4">
              <div className="space-y-1">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                  Одоогийн сэдэв
                </p>
                <p className="text-xs font-bold text-[#312C85] bg-[#312C85]/5 px-3 py-1 rounded-lg inline-block">
                  {current.topic}
                </p>
              </div>
              <p className="text-2xl font-black text-[#312C85]">
                {index + 1}{" "}
                <span className="text-slate-300 text-sm font-bold">
                  / {cards.length}
                </span>
              </p>
            </div>
            <div className="w-full h-3 bg-slate-200/50 rounded-full overflow-hidden shadow-inner">
              <div
                className="h-full bg-[#312C85] transition-all duration-700 ease-out"
                style={{ width: `${((index + 1) / cards.length) * 100}%` }}
              />
            </div>
          </div>

          <div className="relative" style={{ perspective: "2500px" }}>
            <div className="absolute inset-0 translate-y-8 scale-[0.92] bg-[#312C85]/10 rounded-[4rem] -z-10 blur-md" />
            <div
              onClick={() => setFlipped(!flipped)}
              className="relative w-full h-[450px] cursor-pointer"
              style={{
                transformStyle: "preserve-3d",
                transition: "transform 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)",
                transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
              }}
            >
              {/* Нүүр тал (Асуулт) */}
              <div
                className="absolute inset-0 bg-white border border-slate-100 rounded-[4rem] shadow-2xl flex flex-col items-center justify-center p-14 text-center"
                style={{ backfaceVisibility: "hidden" }}
              >
                <div className="absolute top-12 left-12 w-16 h-16 bg-[#312C85]/5 rounded-3xl flex items-center justify-center">
                  <Zap
                    className="text-[#312C85]"
                    size={32}
                    fill="currentColor"
                  />
                </div>
                <span className="text-[11px] font-black text-slate-300 uppercase tracking-[0.5em] mb-8">
                  АСУУЛТ
                </span>
                <h2 className="text-2xl md:text-4xl font-black text-slate-800 leading-[1.3] uppercase italic tracking-tight">
                  {current.question}
                </h2>
                <div className="mt-14 flex flex-col items-center gap-4">
                  <div className="p-3 rounded-full bg-slate-50 animate-bounce">
                    <Rotate3D size={20} className="text-[#312C85]" />
                  </div>
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
                    Картыг эргүүлж хариултыг хар
                  </span>
                </div>
              </div>

              {/* Ар тал (Хариулт) */}
              <div
                className="absolute inset-0 bg-[#312C85] rounded-[4rem] shadow-2xl flex flex-col items-center justify-center p-14 text-center text-white"
                style={{
                  transform: "rotateY(180deg)",
                  backfaceVisibility: "hidden",
                }}
              >
                <span className="text-[11px] font-black text-white/30 uppercase tracking-[0.5em] mb-8">
                  ХАРИУЛТ
                </span>
                <p className="text-2xl md:text-4xl font-black italic leading-tight leading-relaxed">
                  {current.answer}
                </p>
                <div className="mt-12 flex flex-col items-center gap-3">
                  <div className="w-12 h-1 bg-white/20 rounded-full" />
                  <RotateCcw className="text-white/40" size={24} />
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-between items-center mt-20 gap-8">
            <button
              onClick={prev}
              className="flex-1 flex items-center justify-center gap-4 py-7 rounded-[2.5rem] bg-white border border-slate-100 text-[#312C85] font-black uppercase text-xs tracking-widest hover:bg-slate-50 transition-all active:scale-95 shadow-sm"
            >
              <ChevronLeft size={20} /> Өмнөх
            </button>
            <button
              onClick={next}
              className="flex-1 flex items-center justify-center gap-4 py-7 rounded-[2.5rem] bg-[#312C85] text-white font-black uppercase text-xs tracking-widest hover:bg-[#28246d] transition-all active:scale-95 shadow-2xl shadow-[#312C85]/30"
            >
              Дараах <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
