"use client";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
// NavAll болон Navbar нь таны төсөлд ашиглагдаж байгаа бол нэмж болно.
// Энд зөвхөн CartH-ийг өөрөө бие даасан байдлаар бэлдлээ.
// import NavAll from "../components/NavAll";
// import Navbar from "../components/Navbar";
import {
  Shuffle,
  RotateCcw,
  ChevronLeft,
  ChevronRight,
  Zap,
  Rotate3D,
} from "lucide-react";

const ALL_CHEMISTRY_DATA = [
  // --- ХИМИЙН ДИФФУЗ ---
  {
    question: "Диффуз гэж юу вэ?",
    answer:
      "Бөөмс өндөр концентрацитай хэсгээс бага руу бие даан шилжих үзэгдэл.",
    topic: "Диффуз",
  },
  {
    question: "Грэхэмийн хууль юуг илэрхийлдэг вэ?",
    answer:
      "Хийн диффузийн хурд нь түүний молекул массын язгуураас урвуу хамааралтай.",
    topic: "Диффуз",
  },
  {
    question: "Температур нэмэгдэхэд диффузийн хурд яах вэ?",
    answer: "Бөөмсийн кинетик энерги нэмэгдсэнээр хурдасна.",
    topic: "Диффуз",
  },
  {
    question: "Шингэн ба хийн аль нь илүү хурдан диффузлэгддэг вэ?",
    answer: "Хий (Бөөмс хоорондын зай их тул).",
    topic: "Диффуз",
  },
  {
    question: "Осмос гэж юу вэ?",
    answer: "Хагас нэвтрүүлэгч мембранаар уусгагч шилжих тусгай диффуз.",
    topic: "Диффуз",
  },
  // --- МОЛЕКУЛЫН ТУЙЛШРАЛ ---
  {
    question: "Туйлт холбоо гэж юу вэ?",
    answer: "Электрон сөрөг чанар өөр өөр атомуудын хоорондох холбоо.",
    topic: "Туйлшрал",
  },
  {
    question: "Диполийн момент гэж юу вэ?",
    answer:
      "Цэнэгийн ялгарал ба зайны үржвэрээр тодорхойлогдох вектор хэмжигдэхүүн.",
    topic: "Туйлшрал",
  },
  {
    question: "Усны молекул (H2O) туйлт уу?",
    answer: "Тийм (Хэлбэр нь өнцөг үүсгэдэг тул диполь нь устдаггүй).",
    topic: "Туйлшрал",
  },
  {
    question: "Метан (CH4) яагаад туйлгүй вэ?",
    answer: "Тэгш хэмт бүтэцтэй тул диполийн моментууд нь бие биенээ устгадаг.",
    topic: "Туйлшрал",
  },
  {
    question: "Ван-дер-Ваальсын хүчний нэг хэлбэр нь юу вэ?",
    answer: "Диполь-диполийн харилцан үйлчлэл.",
    topic: "Туйлшрал",
  },
  // --- КВАНТ ХЭМЖИЛТ ---
  {
    question: "Шредингерийн муур туршилтын гол утга нь юу вэ?",
    answer:
      "Квант суперпозици ба хэмжилт хийх хүртэлх төлөвийн тодорхойгүй байдал.",
    topic: "Квант",
  },
  {
    question: "Гейзенбергийн тодорхойгүйн зарчим?",
    answer:
      "Бөөмийн байршил ба импульсийг нэгэн зэрэг нарийн тодорхойлох боломжгүй.",
    topic: "Квант",
  },
  {
    question: "Квант тоо (n) юуг заадаг вэ?",
    answer: "Электроны үндсэн энергийн түвшин.",
    topic: "Квант",
  },
  {
    question: "Pauli-ийн зарчим?",
    answer: "Нэг орбитальд ижил квант төлөвтэй хоёр электрон байж болохгүй.",
    topic: "Квант",
  },
  {
    question: "Долгион-бөөмийн хоёрлол гэж юу вэ?",
    answer: "Матери долгионы болон бөөмийн шинж чанарыг зэрэг үзүүлэх.",
    topic: "Квант",
  },
  // --- НЯГТРАЛ ---
  {
    question: "Нягтралын томьёо?",
    answer: "ρ = m / V (Масс хуваах нь эзлэхүүн).",
    topic: "Нягтрал",
  },
  {
    question: "Нягтралын СИ систем дэх нэгж?",
    answer: "кг/м³ (Килограмм хуваах нь метр куб).",
    topic: "Нягтрал",
  },
  {
    question: "Усны нягтрал хэд вэ?",
    answer: "Ойролцоогоор 1000 кг/м³ эсвэл 1 г/см³.",
    topic: "Нягтрал",
  },
  {
    question: "Яагаад мөс усан дээр хөвдөг вэ?",
    answer: "Мөсний нягтрал усны нягтралаас бага байдаг тул.",
    topic: "Нягтрал",
  },
  {
    question: "Түрхэц буюу флотаци юунаас хамаардаг вэ?",
    answer: "Биеийн нягтрал ба шингэний нягтралын харьцаанаас.",
    topic: "Нягтрал",
  },
  // --- ЛАЗЕР ---
  {
    question: "ЛАЗЕР гэдэг үг юу гэсэн утгатай вэ?",
    answer: "Light Amplification by Stimulated Emission of Radiation.",
    topic: "Лазер",
  },
  {
    question: "Лазерын гэрлийн гол онцлог?",
    answer: "Монохромат, когерент ба чиглэлт.",
    topic: "Лазер",
  },
  {
    question: "Фотоны албадмал цацаргалт гэж юу вэ?",
    answer: "Өдөөгдсөн электрон ижил энергитэй фотоны нөлөөгөөр доош шилжих.",
    topic: "Лазер",
  },
  {
    question: "Лазерын идэвхтэй орчинд юу байж болох вэ?",
    answer: "Хий, шингэн, хатуу биет.",
    topic: "Лазер",
  },
  {
    question: "Лазерын гэрэл яагаад өндөр энергитэй байдаг вэ?",
    answer: "Маш бага талбайд асар их фотоныг төвлөрүүлдэг тул.",
    topic: "Лазер",
  },
];

export default function CartH() {
  const [cards, setCards] = useState([]);
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);

  const generateRandomSet = () => {
    const shuffled = [...ALL_CHEMISTRY_DATA].sort(() => 0.5 - Math.random());
    setCards(shuffled.slice(0, 10)); // Зөвхөн 10-ыг сонгоно
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
      {/* Шаардлагатай бол NavAll болон Navbar нэмж болно */}
      {/* <NavAll /> */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 pt-10">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div className="flex items-center gap-4">
            <Link
              href="/indexH"
              className="p-3 rounded-2xl bg-white border border-slate-100 shadow-sm text-[#312C85] hover:bg-slate-50 transition-all"
            >
              <ChevronLeft />
            </Link>
            <div>
              <h2 className="text-sm font-black text-[#312C85] uppercase tracking-[0.3em]">
                Хими Флаш Карт
              </h2>
              <div className="h-1 w-12 bg-[#312C85] rounded-full" />
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={generateRandomSet}
              className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-white border border-slate-100 shadow-sm text-slate-600 font-bold text-xs uppercase tracking-wider hover:text-[#312C85] transition-all"
            >
              <Shuffle size={16} /> Шинэ 10 карт
            </button>
            {/* Шаардлагатай бол Navbar нэмж болно */}
            {/* <Navbar /> */}
          </div>
        </div>

        <div className="max-w-[700px] mx-auto">
          <div className="mb-10 px-2">
            <div className="flex justify-between items-end mb-3">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                {current.topic}
              </p>
              <p className="text-lg font-black text-[#312C85]">
                {index + 1}{" "}
                <span className="text-slate-300 text-sm">/ {cards.length}</span>
              </p>
            </div>
            <div className="w-full h-2.5 bg-slate-200/50 rounded-full overflow-hidden">
              <div
                className="h-full bg-[#312C85] transition-all duration-700 ease-out"
                style={{ width: `${((index + 1) / cards.length) * 100}%` }}
              />
            </div>
          </div>

          <div className="relative" style={{ perspective: "2000px" }}>
            <div className="absolute inset-0 translate-y-6 scale-[0.9] bg-[#312C85]/5 rounded-[3.5rem] -z-10 blur-sm" />
            <div
              onClick={() => setFlipped(!flipped)}
              className="relative w-full h-[400px] cursor-pointer"
              style={{
                transformStyle: "preserve-3d",
                transition: "transform 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)",
                transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
              }}
            >
              {/* Front Side */}
              <div
                className="absolute inset-0 bg-white border border-slate-100 rounded-[3.5rem] shadow-2xl flex flex-col items-center justify-center p-12 text-center"
                style={{ backfaceVisibility: "hidden" }}
              >
                <Zap
                  className="absolute top-10 left-10 text-[#312C85]/10"
                  size={40}
                  fill="currentColor"
                />
                <span className="text-[10px] font-black text-slate-300 uppercase tracking-[0.4em] mb-6">
                  Асуулт
                </span>
                <h2 className="text-2xl md:text-3xl font-black text-slate-800 leading-tight uppercase italic">
                  {current.question}
                </h2>
                <div className="mt-12 flex items-center gap-3 text-slate-400">
                  <Rotate3D size={18} className="animate-spin-slow" />
                  <span className="text-[10px] font-bold uppercase tracking-widest">
                    Дарж хариултыг хар
                  </span>
                </div>
              </div>
              {/* Back Side */}
              <div
                className="absolute inset-0 bg-[#312C85] rounded-[3.5rem] shadow-2xl flex flex-col items-center justify-center p-12 text-center text-white"
                style={{
                  transform: "rotateY(180deg)",
                  backfaceVisibility: "hidden",
                }}
              >
                <span className="text-[10px] font-black text-white/40 uppercase tracking-[0.4em] mb-6">
                  Хариулт
                </span>
                <p className="text-2xl md:text-4xl font-black italic">
                  "{current.answer}"
                </p>
                <RotateCcw className="mt-8 text-white/20" size={24} />
              </div>
            </div>
          </div>

          <div className="flex justify-between items-center mt-16 gap-6">
            <button
              onClick={prev}
              className="flex-1 flex items-center justify-center gap-4 py-6 rounded-[2.5rem] bg-white border border-slate-100 text-[#312C85] font-black uppercase text-xs hover:bg-slate-50 transition-all active:scale-95 shadow-sm"
            >
              <ChevronLeft /> Өмнөх
            </button>
            <button
              onClick={next}
              className="flex-1 flex items-center justify-center gap-4 py-6 rounded-[2.5rem] bg-[#312C85] text-white font-black uppercase text-xs hover:bg-[#28246d] transition-all active:scale-95 shadow-xl shadow-[#312C85]/20"
            >
              Дараах <ChevronRight />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
