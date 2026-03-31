"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Shuffle,
  RotateCcw,
  ChevronLeft,
  ChevronRight,
  Compass,
  MapPin,
  Globe,
} from "lucide-react";

const ALL_GEOGRAPHY_DATA = [
  // --- ЭХ ГАЗАР БА ДАЛАЙ ---
  {
    question: "Дэлхийн хамгийн том эх газар аль нь вэ?",
    answer: "Евразийн эх газар.",
    topic: "Эх газар",
  },
  {
    question: "Лиосфер гэж юу вэ?",
    answer:
      "Дэлхийн хамгийн гадна талын хатуу бүрхүүл буюу царцдас ба дээд мантийн хэсэг.",
    topic: "Эх газар",
  },
  {
    question: "Далайн ёроолын рельефийн үндсэн хэсгүүд?",
    answer: "Эх газрын шelf, налуу, далайн ёроолын тэгш тал, гүн суваг.",
    topic: "Эх газар",
  },
  {
    question: "Плитийн хөдөлгөөний онолыг хэн анх үндэслэсэн бэ?",
    answer: "Альфред Вегенер (Эх газрын шилжилтийн онол).",
    topic: "Эх газар",
  },
  // --- УУР АМЬСГАЛ ---
  {
    question: "Агаар мандлын хамгийн доод давхарга юу вэ?",
    answer: "Тропосфер (Бүх цаг уурын үзэгдэл энд явагддаг).",
    topic: "Уур амьсгал",
  },
  {
    question: "Циклон гэж юу вэ?",
    answer:
      "Төвдөө нам даралттай, агаар нь цагийн зүүний эсрэг эргэлдэх агаарын орчил.",
    topic: "Уур амьсгал",
  },
  {
    question: "Дэлхийн дулаарал ямар хийнээс голлон шалтгаалж байна вэ?",
    answer: "Нүүрсхүчлийн хий (CO2) болон метан.",
    topic: "Уур амьсгал",
  },
  {
    question: "Пассат салхи хаашаа чиглэж үлээдэг вэ?",
    answer: "Халуун бүсийн өндөр даралтаас экваторын нам даралт руу.",
    topic: "Уур амьсгал",
  },
  // --- ХҮН АМ БА СУУРЬШИЛ ---
  {
    question: "Хүн амын нягтшил гэж юу вэ?",
    answer: "Нэг км кв талбайд ногдож буй дундаж хүний тоо.",
    topic: "Хүн ам",
  },
  {
    question: "Урбанизаци (Хотжилт) гэж юу вэ?",
    answer:
      "Хотын хүн амын эзлэх хувь өсөх болон хотын амьдралын хэв маяг түгэх үйл явц.",
    topic: "Хүн ам",
  },
  {
    question: "Мегалополис гэж юу вэ?",
    answer:
      "Олон тооны том хотууд хоорондоо нэгдэж үүссэн асар том хотжсон бүс.",
    topic: "Хүн ам",
  },
  // --- ЭДИЙН ЗАСАГ БА ЭКОЛОГИ ---
  {
    question: "Дэлхийн хамгийн том нефть олборлогч бүс нутаг?",
    answer: "Ойрхи Дорнод (Персийн булангийн орнууд).",
    topic: "Эдийн засаг",
  },
  {
    question: "Сэргээгдэх эрчим хүчний эх үүсвэрүүд?",
    answer: "Нар, салхи, ус, газрын гүний дулаан.",
    topic: "Экологи",
  },
  {
    question: "Дэлхийн 'Хүчилтөрөгчийн үйлдвэр' гэгддэг ойн бүс?",
    answer: "Амазоны чийглэг халуун орны ой.",
    topic: "Экологи",
  },
  {
    question: "Озоны давхарга ямар үүрэгтэй вэ?",
    answer: "Нарны хортой хэт ягаан туяанаас (UV) дэлхийг хамгаалах.",
    topic: "Экологи",
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
    <div className="min-h-screen bg-[#F1F5F9] pb-20 font-sans">
      <section className="max-w-7xl mx-auto px-4 md:px-8 pt-10">
        {/* Толгой хэсэг */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div className="flex items-center gap-4">
            <Link
              href="/indexGeo"
              className="p-3 rounded-2xl bg-white border border-slate-200 shadow-sm text-[#0F172A] hover:bg-slate-50 transition-all"
            >
              <ChevronLeft />
            </Link>
            <div>
              <h2 className="text-sm font-black text-[#0F172A] uppercase tracking-[0.3em]">
                Газарзүйн Флаш Карт
              </h2>
              <div className="h-1 w-12 bg-[#312C85] rounded-full" />
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={generateRandomSet}
              className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-white border border-slate-200 shadow-sm text-slate-600 font-bold text-xs uppercase tracking-wider hover:text-[#312C85] transition-all"
            >
              <Shuffle size={16} /> Шинэ 10 асуулт
            </button>
          </div>
        </div>

        <div className="max-w-[700px] mx-auto">
          {/* Явцын мөр */}
          <div className="mb-10 px-2">
            <div className="flex justify-between items-end mb-3">
              <div className="flex items-center gap-2">
                <MapPin size={14} className="text-[#312C85]" />
                <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">
                  Сэдэв: {current.topic}
                </p>
              </div>
              <p className="text-lg font-black text-[#312C85]">
                {index + 1}{" "}
                <span className="text-slate-300 text-sm">/ {cards.length}</span>
              </p>
            </div>
            <div className="w-full h-2.5 bg-slate-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-[#312C85] transition-all duration-700 ease-out"
                style={{ width: `${((index + 1) / cards.length) * 100}%` }}
              />
            </div>
          </div>

          {/* Карт */}
          <div className="relative" style={{ perspective: "2000px" }}>
            <div className="absolute inset-0 translate-y-6 scale-[0.95] bg-slate-200 rounded-[3.5rem] -z-10 blur-sm" />
            <div
              onClick={() => setFlipped(!flipped)}
              className="relative w-full h-[450px] cursor-pointer"
              style={{
                transformStyle: "preserve-3d",
                transition: "transform 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)",
                transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
              }}
            >
              {/* Урд тал - Асуулт */}
              <div
                className="absolute inset-0 bg-white border-2 border-slate-50 rounded-[3.5rem] shadow-2xl flex flex-col items-center justify-center p-12 text-center"
                style={{ backfaceVisibility: "hidden" }}
              >
                <Globe
                  className="absolute top-10 right-10 text-[#312C85]/10"
                  size={60}
                />
                <span className="text-[10px] font-black text-[#312C85]/60 uppercase tracking-[0.4em] mb-6">
                  АСУУЛТ
                </span>
                <h2 className="text-2xl md:text-3xl font-black text-slate-800 leading-tight">
                  {current.question}
                </h2>
                <div className="mt-12 flex items-center gap-3 text-slate-400">
                  <Compass size={20} className="animate-spin-slow" />
                  <span className="text-[10px] font-bold uppercase tracking-widest">
                    Дарж эргүүлнэ үү
                  </span>
                </div>
              </div>

              {/* Ар тал - Хариулт */}
              <div
                className="absolute inset-0 bg-[#0F172A] rounded-[3.5rem] shadow-2xl flex flex-col items-center justify-center p-12 text-center text-white"
                style={{
                  transform: "rotateY(180deg)",
                  backfaceVisibility: "hidden",
                }}
              >
                <div className="mb-8 p-4 bg-white/5 rounded-full">
                  <MapPin className="text-white/40" size={30} />
                </div>
                <span className="text-[10px] font-black text-white/30 uppercase tracking-[0.4em] mb-6">
                  ХАРИУЛТ
                </span>
                <p className="text-2xl md:text-3xl font-bold leading-relaxed">
                  {current.answer}
                </p>
                <RotateCcw
                  className="absolute bottom-10 text-white/10"
                  size={30}
                />
              </div>
            </div>
          </div>

          {/* Удирдлага */}
          <div className="flex justify-between items-center mt-16 gap-6">
            <button
              onClick={prev}
              className="flex-1 flex items-center justify-center gap-4 py-6 rounded-[2.5rem] bg-white border border-slate-200 text-slate-800 font-black uppercase text-xs hover:bg-slate-50 transition-all active:scale-95 shadow-sm"
            >
              <ChevronLeft size={18} /> Өмнөх
            </button>
            <button
              onClick={next}
              className="flex-1 flex items-center justify-center gap-4 py-6 rounded-[2.5rem] bg-[#312C85] text-white font-black uppercase text-xs hover:bg-[#1e1a5a] transition-all active:scale-95 shadow-xl shadow-[#312C85]/20"
            >
              Дараах <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
