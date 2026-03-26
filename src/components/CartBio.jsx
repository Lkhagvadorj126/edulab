"use client";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  Shuffle,
  RotateCcw,
  ChevronLeft,
  ChevronRight,
  Zap,
  Rotate3D,
} from "lucide-react";

const ALL_BIOLOGY_DATA = [
  // --- ЭСИЙН БҮТЭЦ ---
  {
    question: "Эсийн мембраны үндсэн үүрэг юу вэ?",
    answer: "Эсийг гадаад орчноос тусгаарлаж, бодисын нэвтрэлтийг зохицуулах.",
    topic: "Эсийн бүтэц",
  },
  {
    question: "Гольджийн аппаратын үүрэг?",
    answer: "Уураг болон бусад бодисыг ангилах, савлах, тээвэрлэх.",
    topic: "Эсийн бүтэц",
  },
  {
    question: "Вакуоль ургамлын эсэд ямар үүрэгтэй вэ?",
    answer: "Ус, шим тэжээл хадгалах ба эсийн тургор даралтыг барих.",
    topic: "Эсийн бүтэц",
  },
  {
    question: "Эукариот эс прокариотоос юугаараа ялгаатай вэ?",
    answer: "Бөөм болон мембрант эрхтэнцэрүүдтэй байдгаараа ялгаатай.",
    topic: "Эсийн бүтэц",
  },
  {
    question: "Лизосомын үүрэг юу вэ?",
    answer: "Эсийн доторх хоол боловсруулах ба хэрэгцээгүй хэсгүүдийг задлах.",
    topic: "Эсийн бүтэц",
  },
  // --- АМЬСГАЛ БА ЗӨӨВӨРЛӨЛТ ---
  {
    question: "Аэроб амьсгал гэж юу вэ?",
    answer:
      "Хүчилтөрөгчийн оролцоотойгоор глюкозыг задлан эрчим хүч гаргах үйл явц.",
    topic: "Амьсгал",
  },
  {
    question: "Венийн судас ямар онцлогтой вэ?",
    answer:
      "Цусыг зүрх рүү буцааж зөөдөг, цусны урсгалыг нэг чиглэлд барих хавхлагтай.",
    topic: "Зөөвөрлөлт",
  },
  {
    question: "Капилляр (Хялгасан судас) ямар үүрэгтэй вэ?",
    answer: "Цус ба эдийн хооронд хий болон шим тэжээлийн солилцоо явуулах.",
    topic: "Зөөвөрлөлт",
  },
  {
    question: "Зүрхний зүүн ховдлын хана яагаад зузаан байдаг вэ?",
    answer: "Цусыг бүх биеэр тараахын тулд их хүчээр шахах шаардлагатай тул.",
    topic: "Зөөвөрлөлт",
  },
  {
    question: "Цусны сийвэнгийн үндсэн найрлага?",
    answer: "90% орчим ус, ууссан уургууд, эрдэс бодис, глюкоз.",
    topic: "Зөөвөрлөлт",
  },
  // --- ЗОХИЦУУЛГА БА ХЯНАЛТ ---
  {
    question: "Рефлекс гэж юу вэ?",
    answer: "Гадаад ба дотоод цочролд өгч буй бие махбодын хариу үйлдэл.",
    topic: "Зохицуулга",
  },
  {
    question: "Тархины багана ямар үүрэгтэй вэ?",
    answer:
      "Амьсгал, зүрхний цохилт зэрэг амьдралын чухал үйл ажиллагааг удирдах.",
    topic: "Зохицуулга",
  },
  {
    question: "Аксон гэж юу вэ?",
    answer: "Мэдрэлийн импульсийг эсийн биеэс холдуулж дамжуулдаг урт сэртэн.",
    topic: "Зохицуулга",
  },
  {
    question: "Эндокриний булчирхай гэж юу вэ?",
    answer: "Шүүрэл буюу даавраа шууд цусанд ялгаруулдаг булчирхай.",
    topic: "Зохицуулга",
  },
  {
    question: "Фоторецептор хаана байдаг вэ?",
    answer: "Нүдний торлог бүрхэвчинд (Савханцар ба лонхонцор эсүүд).",
    topic: "Зохицуулга",
  },
  // --- ХҮНИЙ ХООЛЛОЛТ ---
  {
    question: "Пепсин фермент хаана үйлчилдэг вэ?",
    answer: "Ходоодонд, уургийг задлах зорилгоор.",
    topic: "Хооллолт",
  },
  {
    question: "Липаза фермент юуг задладаг вэ?",
    answer: "Өөх тосыг глицерин ба өөхний хүчил болгож задлана.",
    topic: "Хооллолт",
  },
  {
    question: "Шүдний паалангийн үүрэг?",
    answer:
      "Шүдний зөөлц ба дентинийг гадны нөлөөнөөс хамгаалах хатуу бүрхүүл.",
    topic: "Хооллолт",
  },
  {
    question: "Бүдүүн гэдэсний үндсэн үүрэг?",
    answer: "Ус болон эрдэс бодисыг эргүүлэн шимж, ялгадсыг өтгөрүүлэх.",
    topic: "Хооллолт",
  },
  {
    question: "Витамин D ямар ач холбогдолтой вэ?",
    answer: "Ясны бэхжилт болон кальцийн шимэгдэлтийг дэмжих.",
    topic: "Хооллолт",
  },
  // --- УРГАМАЛ ЗҮЙ ---
  {
    question: "Флоэм (Шүүлтүүрт хоолой) юуг зөөвөрлөдөг вэ?",
    answer:
      "Навчинд үүссэн органик бодисыг (сахар) ургамлын бусад хэсэгт зөөх.",
    topic: "Ургамал",
  },
  {
    question: "Навчны амсрын эсүүд ямар үүрэгтэй вэ?",
    answer: "Хийн солилцоо болон усны ууршилтыг (транспираци) зохицуулах.",
    topic: "Ургамал",
  },
  {
    question: "Фотосинтезийн гэрлийн шат хаана явагддаг вэ?",
    answer: "Хлоропластын тилакойдын мембран дээр.",
    topic: "Ургамал",
  },
  {
    question: "Үндэсний үсний үүрэг?",
    answer: "Хөрснөөс ус болон эрдэс бодисыг шимж авах гадаргууг ихэсгэх.",
    topic: "Ургамал",
  },
  {
    question: "Меристем эд гэж юу вэ?",
    answer: "Ургамлын өсөлт явагддаг, тасралтгүй хуваагдах чадвартай эд.",
    topic: "Ургамал",
  },
];

export default function CartBio() {
  const [cards, setCards] = useState([]);
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);

  const generateRandomSet = () => {
    const shuffled = [...ALL_BIOLOGY_DATA].sort(() => 0.5 - Math.random());
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
              href="/biology"
              className="p-3 rounded-2xl bg-white border border-slate-100 shadow-sm text-[#312C85] hover:bg-slate-50 transition-all"
            >
              <ChevronLeft />
            </Link>
            <div>
              <h2 className="text-sm font-black text-[#312C85] uppercase tracking-[0.3em]">
                Биологи Флаш Карт
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
