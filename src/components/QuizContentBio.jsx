"use client";

import React, { useState, useEffect, Suspense, useRef } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import {
  ChevronLeft,
  Dna,
  Wind,
  Zap,
  BookOpen,
  Layers,
  Leaf,
  LayoutGrid,
  CheckCircle2,
  Loader2,
  ArrowRightCircle,
} from "lucide-react";

// --- ТОХИРГОО БА ӨНГӨ (Style consistency with Chemistry) ---
const topicConfigs = {
  all: {
    title: "Биологи Холимог",
    color: "#312C85",
    bg: "bg-slate-50",
    icon: <LayoutGrid className="w-5 h-5 text-white" />,
  },
  es: {
    title: "Эсийн бүтэц",
    color: "#3B82F6",
    bg: "bg-blue-50",
    icon: <Dna className="w-5 h-5 text-white" />,
  },
  amisgal: {
    title: "Амьсгал ба зөөвөрлөлт",
    color: "#10B981",
    bg: "bg-emerald-50",
    icon: <Wind className="w-5 h-5 text-white" />,
  },
  zohitsuulga: {
    title: "Зохицуулга ба хяналт",
    color: "#F59E0B",
    bg: "bg-amber-50",
    icon: <Zap className="w-5 h-5 text-white" />,
  },
  hoollolt: {
    title: "Хүний хооллолт",
    color: "#8B5CF6",
    bg: "bg-purple-50",
    icon: <BookOpen className="w-5 h-5 text-white" />,
  },
  angilal: {
    title: "Амьтны ангилал",
    color: "#EC4899",
    bg: "bg-pink-50",
    icon: <Layers className="w-5 h-5 text-white" />,
  },
  urgamal: {
    title: "Ургамал зүй",
    color: "#22C55E",
    bg: "bg-green-50",
    icon: <Leaf className="w-5 h-5 text-white" />,
  },
};

// --- БИОЛОГИЙН БҮРЭН АСУУЛТУУД (60 асуулт) ---
const BIO_QUESTIONS = {
  es: [
    {
      question: "Ургамлын эс амьтны эсээс юугаараа ялгаатай вэ?",
      options: ["Бөөмтэй", "Эсийн ханатай", "Митохондритой"],
      correct: 1,
    },
    {
      question: "Эсийн 'эрчим хүчний станц' гэж юуг нэрлэдэг вэ?",
      options: ["Рибосом", "Митохондри", "Гольджийн аппарат"],
      correct: 1,
    },
    {
      question: "Генетик мэдээллийг хадгалагч эрхтэнцэр?",
      options: ["Бөөм", "Лизосом", "Вакуоль"],
      correct: 0,
    },
    {
      question: "Уураг нийлэгжүүлдэг эрхтэнцэр аль нь вэ?",
      options: ["Мембран", "Рибосом", "Центриоль"],
      correct: 1,
    },
    {
      question: "Эсийн онолыг анх хэн боловсруулсан бэ?",
      options: ["Дарвин", "Шлейден, Шванн", "Мендель"],
      correct: 1,
    },
    {
      question: "Фотосинтез явагддаг эрхтэнцэр?",
      options: ["Лейкопласт", "Хлоропласт", "Хромопласт"],
      correct: 1,
    },
    {
      question: "Бактерийн эс ямар бүтэцтэй вэ?",
      options: ["Эукариот", "Прокариот", "Вирус"],
      correct: 1,
    },
    {
      question: "Эсийн доторх хоол боловсруулах эрхтэнцэр?",
      options: ["Лизосом", "Вакуоль", "Эндоплазмын тор"],
      correct: 0,
    },
    {
      question: "Мембран нь ямар бодисоос тогтдог вэ?",
      options: ["Дан уураг", "Фосфолипид ба уураг", "Цардуул"],
      correct: 1,
    },
    {
      question: "Эсийн хуваагдлын үед удамшлын мэдээллийг дамжуулдаг бүтэц?",
      options: ["РНХ", "Хромосом", "Цитоплазм"],
      correct: 1,
    },
  ],
  amisgal: [
    {
      question: "Уушгины хийн солилцоо явагддаг хэсэг?",
      options: ["Бронх", "Альвеоль (Цулцан)", "Мөгөөрсөн хоолой"],
      correct: 1,
    },
    {
      question: "Цусан дахь хүчилтөрөгчийг зөөвөрлөгч уураг?",
      options: ["Альбумин", "Гемоглобин", "Инсулин"],
      correct: 1,
    },
    {
      question: "Амьсгал авах үед өрц ямар төлөвт шилжих вэ?",
      options: [
        "Доошоо болж хавтгайрна",
        "Дээшээ болж хүнийнэ",
        "Өөрчлөгдөхгүй",
      ],
      correct: 0,
    },
    {
      question: "Цусны бага эргэлт хаанаас эхэлдэг вэ?",
      options: ["Зүүн ховдол", "Баруун ховдол", "Зүүн тосгуур"],
      correct: 1,
    },
    {
      question: "Артерийн цус гэж ямар цусыг хэлэх вэ?",
      options: ["Хүчилтөрөгчөөр баялаг", "CO2-оор баялаг", "Удаан урсдаг цус"],
      correct: 0,
    },
    {
      question: "Цусны бүлэгнэлтэд оролцогч эс?",
      options: ["Лейкоцит", "Тромбоцит", "Эритроцит"],
      correct: 1,
    },
    {
      question: "Хүний зүрх хэдэн тасалгаатай вэ?",
      options: ["2", "3", "4"],
      correct: 2,
    },
    {
      question: "Анаэроб амьсгалын үед булчинд юу үүсдэг вэ?",
      options: ["Ус", "Сүүн хүчил", "Глюкоз"],
      correct: 1,
    },
    {
      question: "Цагаан эсийн үндсэн үүрэг?",
      options: ["Хүчилтөрөгч зөөх", "Дархлаа хамгаалалт", "Шим тэжээл зөөх"],
      correct: 1,
    },
    {
      question: "Хамгийн зузаан ханатай зүрхний хэсэг?",
      options: ["Зүүн ховдол", "Баруун тосгуур", "Баруун ховдол"],
      correct: 0,
    },
  ],
  zohitsuulga: [
    {
      question: "Мэдрэлийн системийн үндсэн нэгж?",
      options: ["Аксон", "Нейрон", "Синапс"],
      correct: 1,
    },
    {
      question: "Цусан дахь чихрийн хэмжээг бууруулдаг гормон?",
      options: ["Адреналин", "Инсулин", "Тироксин"],
      correct: 1,
    },
    {
      question: "Хүний биеийн тэнцвэрийг хянадаг тархины хэсэг?",
      options: ["Их тархи", "Бага тархи", "Дунд тархи"],
      correct: 1,
    },
    {
      question: "Адреналин хаанаас ялгардаг вэ?",
      options: ["Нойр булчирхай", "Бөөрний дээд булчирхай", "Бамбай булчирхай"],
      correct: 1,
    },
    {
      question: "Рефлексийн нумын төв нь хаана байдаг вэ?",
      options: ["Нугас", "Зүрх", "Элэг"],
      correct: 0,
    },
    {
      question: "Нүдний өнгөт хэсгийг юу гэж нэрлэдэг вэ?",
      options: ["Сурагч", "Солонгон бүрхэвч", "Торлог бүрхэвч"],
      correct: 1,
    },
    {
      question: "Мэдрэлийн импульс дамжих зааг?",
      options: ["Аксон", "Синапс", "Дендрит"],
      correct: 1,
    },
    {
      question: "Ухамсарт үйл ажиллагааг хянадаг тархины хэсэг?",
      options: ["Тархины багана", "Их тархины гадар", "Нугас"],
      correct: 1,
    },
    {
      question: "Даавар (Гормон) хаагуур дамжиж бай эрхтэндээ хүрдэг вэ?",
      options: ["Мэдрэлээр", "Цусаар", "Лимфээр"],
      correct: 1,
    },
    {
      question: "Гомеостаз гэж юу вэ?",
      options: ["Өсөлт", "Дотоод орчны тогтмол байдал", "Үржил"],
      correct: 1,
    },
  ],
  hoollolt: [
    {
      question: "Шүлсэнд агуулагддаг нүүрс ус задалдаг фермент?",
      options: ["Пепсин", "Амилаза", "Липаза"],
      correct: 1,
    },
    {
      question: "Хоол боловсруулах замд шим тэжээл хаана шимэгддэг вэ?",
      options: ["Ходоод", "Нарийн гэдэс", "Бүдүүн гэдэс"],
      correct: 1,
    },
    {
      question: "Цөс хаана боловсруулагддаг вэ?",
      options: ["Цөсний хүүдий", "Элэг", "Ходоод"],
      correct: 1,
    },
    {
      question: "Уургийн задралын эцсийн бүтээгдэхүүн?",
      options: ["Глюкоз", "Амин хүчил", "Өөхний хүчил"],
      correct: 1,
    },
    {
      question: "Витамин C-ийн дутагдлаас үүсэх өвчин?",
      options: ["Рахит", "Чийг бам", "Бери-бери"],
      correct: 1,
    },
    {
      question: "Ходоодны хүчил ямар үүрэгтэй вэ?",
      options: ["Чихэр задлах", "Бактери устгах", "Өөх тос хайлуулах"],
      correct: 1,
    },
    {
      question: "Нарийн гэдэсний шимэгдэх гадаргууг ихэсгэдэг бүтэц?",
      options: ["Ширхэг", "Хөхлөгүүд (Villi)", "Салст"],
      correct: 1,
    },
    {
      question: "Бүдүүн гэдсэнд юу шимэгддэг вэ?",
      options: ["Уураг", "Ус", "Өөх тос"],
      correct: 1,
    },
    {
      question: "Шүдний хамгийн хатуу хэсэг?",
      options: ["Дентин", "Эмаль (Паалан)", "Цемент"],
      correct: 1,
    },
    {
      question: "Эрчим хүчний үндсэн эх үүсвэр бодис?",
      options: ["Уураг", "Нүүрс ус", "Витамин"],
      correct: 1,
    },
  ],
  angilal: [
    {
      question: "Ангилал зүйн хамгийн бага нэгж?",
      options: ["Төрөл", "Зүйл", "Овог"],
      correct: 1,
    },
    {
      question: "Сүүгээр тэжээгчдийн гол онцлог?",
      options: [
        "Нисдэг",
        "Зулзагаа сүүгээр тэжээдэг",
        "Заламгайгаар амьсгалдаг",
      ],
      correct: 1,
    },
    {
      question: "Хоёр нутагтан амьтны төлөөлөгч?",
      options: ["Могой", "Мэлхий", "Загас"],
      correct: 1,
    },
    {
      question: "Бинар нэршлийг хэн зохиосон бэ?",
      options: ["Дарвин", "Карл Линней", "Павлов"],
      correct: 1,
    },
    {
      question: "Хамгийн олон зүйлтэй амьтны хүрээ?",
      options: ["Зөөлөн биетэн", "Үе хөлтөн", "Хөвчтөн"],
      correct: 1,
    },
    {
      question: "Аль нь сээр нуруугүй амьтан вэ?",
      options: ["Шувуу", "Наймаалж", "Яст мэлхий"],
      correct: 1,
    },
    {
      question: "Мөлхөгчид юугаар амьсгалдаг вэ?",
      options: ["Арьс", "Уушги", "Заламгай"],
      correct: 1,
    },
    {
      question: "Загасны зүрх хэдэн тасалгаатай вэ?",
      options: ["2", "3", "4"],
      correct: 0,
    },
    {
      question: "Халуун цустай амьтад аль нь вэ?",
      options: ["Загас", "Шувуу, Сүүн тэжээлтэн", "Мэлхий"],
      correct: 1,
    },
    {
      question: "Хорхойнууд ямар хүрээнд хамаарах вэ?",
      options: ["Үе хөлтөн", "Хавтгай, Дугуй, Гархит", "Хөвчтөн"],
      correct: 1,
    },
  ],
  urgamal: [
    {
      question: "Фотосинтезийн дүнд ямар хий ялгардаг вэ?",
      options: ["CO2", "O2 (Хүчилтөрөгч)", "N2"],
      correct: 1,
    },
    {
      question: "Ургамлын ишээр ус зөөвөрлөх эдийг юу гэх вэ?",
      options: ["Флоэм", "Ксилем (Модлог)", "Камби"],
      correct: 1,
    },
    {
      question: "Навчнаас ус уурших үзэгдлийг юу гэх вэ?",
      options: ["Диффуз", "Транспираци", "Осмос"],
      correct: 1,
    },
    {
      question: "Цэцэгт ургамлын үржлийн эрхтэн?",
      options: ["Иш", "Цэцэг", "Үндэс"],
      correct: 1,
    },
    {
      question: "Фотосинтез явуулахад заавал байх ёстой энерги?",
      options: ["Дулаан", "Гэрэл", "Цахилгаан"],
      correct: 1,
    },
    {
      question: "Үндэсний гол үүрэг юу вэ?",
      options: ["Хүчилтөрөгч ялгаруулах", "Ус эрдэс шимэх", "Үр боловсруулах"],
      correct: 1,
    },
    {
      question: "Навчны амсраар ямар үйл явц явагдах вэ?",
      options: ["Шим бодис тээвэрлэх", "Хийн солилцоо", "Өсөлт"],
      correct: 1,
    },
    {
      question: "Доод ургамлын төлөөлөгч?",
      options: ["Хөвд", "Замаг", "Нарс"],
      correct: 1,
    },
    {
      question: "Нүцгэн үрт ургамал аль нь вэ?",
      options: ["Алим", "Шинэс (Гацуур)", "Сарнай"],
      correct: 1,
    },
    {
      question: "Хамгийн өндөр хөгжилтэй ургамлын аймаг?",
      options: ["Ойм", "Далд үртэн", "Хөвд"],
      correct: 1,
    },
  ],
};

function QuizBioManager() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const topicId = searchParams.get("topic") || "all";
  const config = topicConfigs[topicId] || topicConfigs.all;

  const [questions, setQuestions] = useState([]);
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [selectedIdx, setSelectedIdx] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const hasSaved = useRef(false);

  useEffect(() => {
    let source = [];
    if (topicId === "all") {
      source = Object.values(BIO_QUESTIONS).flat();
    } else {
      source = BIO_QUESTIONS[topicId] || BIO_QUESTIONS.es;
    }
    const shuffled = [...source].sort(() => Math.random() - 0.5).slice(0, 10);
    setQuestions(shuffled);
  }, [topicId]);

  const handleAnswer = (idx) => {
    if (selectedIdx !== null || isSaving) return;
    setSelectedIdx(idx);
    const q = questions[current];
    const isCorrect = idx === q.correct;
    const addedXP = isCorrect ? 1 : 0;
    const nextScore = score + addedXP;

    const answerData = {
      question: q.question,
      selected: q.options[idx],
      correct: q.options[q.correct],
      isCorrect,
    };

    const nextAnswers = [...userAnswers, answerData];
    setUserAnswers(nextAnswers);
    if (isCorrect) setScore(nextScore);

    setTimeout(async () => {
      if (current + 1 < questions.length) {
        setCurrent(current + 1);
        setSelectedIdx(null);
      } else {
        setIsSaving(true);
        await saveResults(nextScore, nextAnswers);
      }
    }, 600);
  };

  const saveResults = async (finalScore, finalAnswers) => {
    if (hasSaved.current) return;
    hasSaved.current = true;
    try {
      const uId = localStorage.getItem("userId");
      if (uId) {
        await fetch("/api/users", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId: uId, xpToAdd: finalScore }),
        });
      }
    } catch (err) {
      console.error("Save error:", err);
    } finally {
      const encoded = encodeURIComponent(JSON.stringify(finalAnswers));
      router.push(
        `/resultContent?type=${topicId}&total=${questions.length}&score=${finalScore}&answers=${encoded}`,
      );
    }
  };

  if (questions.length === 0) {
    return (
      <div className="h-screen flex items-center justify-center bg-slate-50">
        <Loader2 className="w-10 h-10 text-[#312C85] animate-spin" />
      </div>
    );
  }

  const q = questions[current];
  const progress = ((current + 1) / questions.length) * 100;

  return (
    <div
      className={`min-h-screen ${config.bg} flex flex-col font-sans transition-all duration-500`}
    >
      {/* Header UI - Same as Chemistry */}
      <header className="fixed top-0 inset-x-0 z-40 px-6 pt-6">
        <div className="max-w-4xl mx-auto bg-white/80 backdrop-blur-xl border border-white rounded-[2rem] p-4 shadow-xl shadow-slate-200/50 flex items-center justify-between">
          <button
            onClick={() => router.back()}
            className="p-3 bg-white rounded-2xl text-slate-400 hover:text-[#312C85] transition-all active:scale-90"
          >
            <ChevronLeft size={20} strokeWidth={3} />
          </button>
          <div className="flex flex-col items-center">
            <span className="text-[9px] font-black text-slate-300 uppercase tracking-widest mb-1">
              {config.title}
            </span>
            <div className="flex items-center gap-3">
              <div className="w-32 h-2 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className="h-full transition-all duration-700 ease-out"
                  style={{
                    width: `${progress}%`,
                    backgroundColor: config.color,
                  }}
                />
              </div>
              <span className="text-xs font-black text-slate-800">
                {current + 1}/{questions.length}
              </span>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center pt-32 pb-12 px-6">
        <div
          className={`w-full max-w-[750px] relative transition-all duration-500 ${isSaving ? "opacity-30 scale-95" : "scale-100"}`}
        >
          {/* Decorative shadow */}
          <div className="absolute inset-0 translate-y-6 scale-[0.9] bg-[#312C85]/5 rounded-[3.5rem] -z-10 blur-md" />

          <div className="bg-white rounded-[3.5rem] p-8 md:p-14 shadow-2xl border border-white relative overflow-hidden">
            {/* Topic Badge */}
            <div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl text-[10px] font-black uppercase tracking-widest mb-8"
              style={{
                backgroundColor: config.color + "15",
                color: config.color,
              }}
            >
              <div
                className="w-1.5 h-1.5 rounded-full animate-pulse"
                style={{ backgroundColor: config.color }}
              />
              БИОЛОГИ {topicId === "all" ? "ХОЛИМОГ" : "БҮЛЭГ"}
            </div>

            <h2 className="text-2xl md:text-3xl font-black text-slate-800 leading-tight mb-12 italic">
              "{q.question}"
            </h2>

            <div className="grid gap-4">
              {q.options.map((opt, idx) => {
                const isSelected = selectedIdx === idx;
                return (
                  <button
                    key={idx}
                    disabled={selectedIdx !== null}
                    onClick={() => handleAnswer(idx)}
                    className={`group relative w-full p-6 rounded-[2rem] text-left transition-all duration-300 flex items-center gap-5 border-2 ${
                      isSelected
                        ? "border-[#312C85] bg-[#312C85] text-white shadow-lg translate-x-2"
                        : "border-slate-50 bg-slate-50/50 text-slate-600 hover:border-slate-200 hover:bg-white active:scale-[0.98]"
                    }`}
                  >
                    <span
                      className={`w-10 h-10 rounded-xl flex items-center justify-center text-xs font-black transition-colors ${isSelected ? "bg-white/20 text-white" : "bg-white text-slate-300 group-hover:text-[#312C85]"}`}
                    >
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span className="font-bold text-base md:text-lg flex-1 leading-tight">
                      {opt}
                    </span>
                    {isSelected && (
                      <CheckCircle2
                        size={20}
                        className="text-white animate-bounce"
                      />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Loading overlay when finishing */}
        {isSaving && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/60 backdrop-blur-sm">
            <div className="bg-white p-8 rounded-[2.5rem] shadow-2xl flex flex-col items-center gap-4">
              <Loader2 className="w-10 h-10 text-[#312C85] animate-spin" />
              <p className="font-black text-[#312C85] text-xs uppercase tracking-widest">
                Үр дүнг хадгалж байна...
              </p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default function UniversalQuizPage() {
  return (
    <Suspense
      fallback={
        <div className="h-screen flex items-center justify-center bg-slate-50 animate-pulse font-black text-[#312C85]">
          УНШИЖ БАЙНА...
        </div>
      }
    >
      <QuizBioManager />
    </Suspense>
  );
}
