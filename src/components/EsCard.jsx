"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import NavAll from "../components/NavAll";
import Navbar from "../components/Navbar";
import {
  Shuffle,
  RotateCcw,
  ChevronLeft,
  ChevronRight,
  Zap,
  Rotate3D,
} from "lucide-react";

const ALL_PHYSICS_DATA = [
  { question: "Хурдны томьёо?", answer: "v = s / t", topic: "Механик" },
  { question: "Хурдатгалын томьёо?", answer: "a = Δv / t", topic: "Механик" },
  { question: "Ньютоны 2-р хууль?", answer: "F = m * a", topic: "Механик" },
  {
    question: "Хүндрэлийн хүчний томьёо?",
    answer: "F = m * g",
    topic: "Механик",
  },
  { question: "Гуйлтын үрэлтийн хүч?", answer: "F = μ * N", topic: "Механик" },
  { question: "Кинетик энерги?", answer: "Ek = ½mv²", topic: "Механик" },
  { question: "Потенциал энерги?", answer: "Ep = mgh", topic: "Механик" },
  { question: "Механик ажил?", answer: "A = F * s * cosα", topic: "Механик" },
  { question: "Механик чадал?", answer: "P = A / t", topic: "Механик" },
  { question: "Импульс?", answer: "p = m * v", topic: "Механик" },
  { question: "Даралтын томьёо?", answer: "p = F / S", topic: "Механик" },
  { question: "Архимедийн хүч?", answer: "Fa = ρ * g * V", topic: "Механик" },
  { question: "Гукийн хууль?", answer: "F = k * |Δx|", topic: "Механик" },
  {
    question: "Төвд тэмүүлэх хурдатгал?",
    answer: "a = v² / r",
    topic: "Механик",
  },
  { question: "Өнцөг хурд?", answer: "ω = φ / t = 2π / T", topic: "Механик" },
  {
    question: "Цельсийг Кельвин рүү шилжүүлэх?",
    answer: "T = t + 273.15",
    topic: "Дулаан",
  },
  {
    question: "Дулааны хэмжээ (Халаах)?",
    answer: "Q = c * m * Δt",
    topic: "Дулаан",
  },
  { question: "Хайлахын хувийн дулаан?", answer: "Q = λ * m", topic: "Дулаан" },
  { question: "Шаталтын хувийн дулаан?", answer: "Q = q * m", topic: "Дулаан" },
  { question: "Ууршихын хувийн дулаан?", answer: "Q = L * m", topic: "Дулаан" },
  {
    question: "Идеал хийн төлөвийн тэгшитгэл?",
    answer: "P * V = n * R * T",
    topic: "Дулаан",
  },
  {
    question: "Бойль-Мариоттын хууль?",
    answer: "P1 * V1 = P2 * V2",
    topic: "Дулаан",
  },
  {
    question: "Гей-Люссакийн хууль?",
    answer: "V / T = const",
    topic: "Дулаан",
  },
  { question: "Шарлийн хууль?", answer: "P / T = const", topic: "Дулаан" },
  {
    question: "Термодинамикийн 1-р хууль?",
    answer: "Q = ΔU + A",
    topic: "Дулаан",
  },
  {
    question: "Кулоны хууль?",
    answer: "F = k * |q1*q2| / r²",
    topic: "Цахилгаан",
  },
  {
    question: "Цахилгаан орны хүчлэг?",
    answer: "E = F / q",
    topic: "Цахилгаан",
  },
  { question: "Омын хууль?", answer: "I = U / R", topic: "Цахилгаан" },
  {
    question: "Цахилгаан эсэргүүцэл?",
    answer: "R = ρ * l / S",
    topic: "Цахилгаан",
  },
  {
    question: "Жоуль-Ленцийн хууль?",
    answer: "Q = I² * R * t",
    topic: "Цахилгаан",
  },
  { question: "Цахилгаан чадал?", answer: "P = U * I", topic: "Цахилгаан" },
  {
    question: "Конденсаторын багтаамж?",
    answer: "C = q / U",
    topic: "Цахилгаан",
  },
  {
    question: "Амперийн хүч?",
    answer: "Fa = B * I * L * sinα",
    topic: "Соронзон",
  },
  {
    question: "Лоренцын хүч?",
    answer: "Fl = q * v * B * sinα",
    topic: "Соронзон",
  },
  {
    question: "Соронзон урсгал?",
    answer: "Φ = B * S * cosα",
    topic: "Соронзон",
  },
  {
    question: "Гэрлийн хугарлын хууль?",
    answer: "n1*sinα = n2*sinβ",
    topic: "Оптик",
  },
  { question: "Линзний томьёо?", answer: "1/F = 1/d + 1/f", topic: "Оптик" },
  { question: "Линзний оптик хүч?", answer: "D = 1 / F", topic: "Оптик" },
  { question: "Фотоны энерги?", answer: "E = h * f", topic: "Квант" },
  {
    question: "Фотоэффектийн тэгшитгэл?",
    answer: "h*f = A + Ek",
    topic: "Квант",
  },
  {
    question: "Энерги ба массын холбоо?",
    answer: "E = m * c²",
    topic: "Квант",
  },
  { question: "Долгионы урт?", answer: "λ = v / f", topic: "Долгион" },
  { question: "Давтамжийн нэгж?", answer: "Герц (Гц)", topic: "Нэгж" },
  { question: "Индукцлэлийн нэгж?", answer: "Генри (Гн)", topic: "Нэгж" },
  { question: "Соронзон индукцийн нэгж?", answer: "Тесла (Тл)", topic: "Нэгж" },
  { question: "Цахилгаан цэнэгийн нэгж?", answer: "Кулон (Кл)", topic: "Нэгж" },
  { question: "Ажлын нэгж?", answer: "Жоуль (Ж)", topic: "Нэгж" },
  { question: "Чадал нэгж?", answer: "Ватт (Вт)", topic: "Нэгж" },
  { question: "Гэрлийн хүчний нэгж?", answer: "Кандела (кд)", topic: "Нэгж" },
  { question: "Хүчний момент?", answer: "M = F * d", topic: "Механик" },
];

export default function EsCard() {
  const [cards, setCards] = useState([]);
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);

  const generateRandomSet = () => {
    const shuffled = [...ALL_PHYSICS_DATA].sort(() => 0.5 - Math.random());
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
      <NavAll />
      <section className="max-w-7xl mx-auto px-4 md:px-8 pt-32">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div className="flex items-center gap-4">
            <Link
              href="/indexP"
              className="p-3 rounded-2xl bg-white border border-slate-100 shadow-sm text-[#312C85] hover:bg-slate-50 transition-all"
            >
              <ChevronLeft />
            </Link>
            <div>
              <h2 className="text-sm font-black text-[#312C85] uppercase tracking-[0.3em]">
                Физик Флаш Карт (Random 10)
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
            <Navbar />
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
