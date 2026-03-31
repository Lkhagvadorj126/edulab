"use client";

import React, { useState, useEffect, Suspense, useRef } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import {
  ChevronLeft,
  Globe,
  Map,
  Mountain,
  CloudRain,
  Navigation,
  Compass,
  LayoutGrid,
  CheckCircle2,
  Loader2,
  Waves,
} from "lucide-react";

// --- ТОХИРГОО БА ӨНГӨ (Geography Theme) ---
const topicConfigs = {
  all: {
    title: "Газарзүй Холимог",
    color: "#1E40AF", // Deep Blue
    bg: "bg-slate-50",
    icon: <LayoutGrid className="w-5 h-5 text-white" />,
  },
  planet: {
    title: "Эх дэлхий, Сансар",
    color: "#312C85",
    bg: "bg-indigo-50",
    icon: <Globe className="w-5 h-5 text-white" />,
  },
  climate: {
    title: "Уур амьсгал",
    color: "#0EA5E9",
    bg: "bg-sky-50",
    icon: <CloudRain className="w-5 h-5 text-white" />,
  },
  surface: {
    title: "Гадаргын хэлбэр",
    color: "#B45309",
    bg: "bg-orange-50",
    icon: <Mountain className="w-5 h-5 text-white" />,
  },
  water: {
    title: "Усан мандал",
    color: "#06B6D4",
    bg: "bg-cyan-50",
    icon: <Waves className="w-5 h-5 text-white" />,
  },
  cartography: {
    title: "Зураг зүй",
    color: "#10B981",
    bg: "bg-emerald-50",
    icon: <Map className="w-5 h-5 text-white" />,
  },
  population: {
    title: "Хүн ам, Суурьшил",
    color: "#6366F1",
    bg: "bg-indigo-50",
    icon: <Navigation className="w-5 h-5 text-white" />,
  },
};

// --- ГАЗАРЗҮЙН БҮРЭН АСУУЛТУУД (60 асуулт) ---
const GEO_QUESTIONS = {
  planet: [
    {
      question: "Нарны аймаг дахь хамгийн том гараг?",
      options: ["Ангараг", "Бархасбадь", "Санчир"],
      correct: 1,
    },
    {
      question: "Дэлхий нарыг нэг удаа тойрох хугацаа?",
      options: ["24 цаг", "365.25 хоног", "30 хоног"],
      correct: 1,
    },
    {
      question: "Дэлхийн тэнхлэгийн хазайлт хэдэн градус вэ?",
      options: ["23.5°", "45°", "0°"],
      correct: 0,
    },
    {
      question: "Дэлхий нарнаас алслагдсан байдлаараа хэд дэх гараг вэ?",
      options: ["2", "3", "4"],
      correct: 1,
    },
    {
      question: "Сарны дэлхийг тойрох хөдөлгөөний үр дүнд юу үүсдэг вэ?",
      options: ["Улирал", "Далайн татлага, түлхэлт", "Өдөр шөнө"],
      correct: 1,
    },
    {
      question: "Дэлхийн дотоод бүтцийн хамгийн халуун хэсэг?",
      options: ["Цөм", "Манти", "Царцдас"],
      correct: 0,
    },
    {
      question: "Өдөр шөнө солигдох үндсэн шалтгаан?",
      options: [
        "Дэлхий нарыг тойрох",
        "Дэлхий тэнхлэгээ тойрох",
        "Сарны хөдөлгөөн",
      ],
      correct: 1,
    },
    {
      question:
        "Нарны гэрэл дэлхийд ирэхэд ойролцоогоор хэдэн минут зарцуулдаг вэ?",
      options: ["1 минут", "8 минут", "60 минут"],
      correct: 1,
    },
    {
      question: "Дэлхийн хамгийн гадна талын хатуу бүрхүүл?",
      options: ["Лиitosфер", "Атмосфер", "Гидросфер"],
      correct: 0,
    },
    {
      question: "Манай галактикийн нэр?",
      options: ["Андромеда", "Сүүн зам", "Магеллан"],
      correct: 1,
    },
  ],
  climate: [
    {
      question: "Агаар мандлын хамгийн доод давхарга?",
      options: ["Стратосфер", "Тропосфер", "Мезосфер"],
      correct: 1,
    },
    {
      question: "Агаарын даралтыг хэмждэг багаж?",
      options: ["Гигрометр", "Барометр", "Термометр"],
      correct: 1,
    },
    {
      question: "Дэлхийн дулааралтын гол шалтгаан болох хий?",
      options: ["Хүчилтөрөгч", "Нүүрсхүчлийн хий (CO2)", "Азот"],
      correct: 1,
    },
    {
      question: "Хамгийн их тунадас ордог уур амьсгалын бүс?",
      options: ["Цөл", "Экватор", "Туйл"],
      correct: 1,
    },
    {
      question: "Салхины чиглэлийг заагч багаж?",
      options: ["Флюгер", "Анемометр", "Салхи хэмжигч"],
      correct: 0,
    },
    {
      question: "Агаарын найрлагад хамгийн их хувийг эзэлдэг хий?",
      options: ["Хүчилтөрөгч", "Азот", "Аргон"],
      correct: 1,
    },
    {
      question: "Озоны давхарга ямар давхаргад байдаг вэ?",
      options: ["Тропосфер", "Стратосфер", "Экзосфер"],
      correct: 1,
    },
    {
      question: "Уур амьсгал гэж юу вэ?",
      options: [
        "Тухайн үеийн агаар",
        "Олон жилийн дундаж горим",
        "Салхины хурд",
      ],
      correct: 1,
    },
    {
      question: "Муссон салхи гэж юу вэ?",
      options: [
        "Байнгын салхи",
        "Улирлын чанартай салхи",
        "Орон нутгийн салхи",
      ],
      correct: 1,
    },
    {
      question: "Агаарын чийгшлийг юугаар хэмждэг вэ?",
      options: ["Барометр", "Гигрометр", "Анемометр"],
      correct: 1,
    },
  ],
  surface: [
    {
      question: "Дэлхийн хамгийн өндөр оргил?",
      options: ["К2", "Эверест (Жомолунгма)", "Килиманжаро"],
      correct: 1,
    },
    {
      question: "Тивүүдийн нүүх онолыг хэн анх гаргасан бэ?",
      options: ["Колумб", "Альфред Вегенер", "Магеллан"],
      correct: 1,
    },
    {
      question: "Хамгийн том арал?",
      options: ["Мадагаскар", "Гренланд", "Исланд"],
      correct: 1,
    },
    {
      question: "Галт уулын дэлбэрэлтээр гарч ирсэн халуун хайлмаг?",
      options: ["Магма", "Лаав", "Үнс"],
      correct: 1,
    },
    {
      question: "Чулуулаг мандал хагарч шилжихийг юу гэх вэ?",
      options: ["Галт уул", "Газар хөдлөлт", "Элэгдэл"],
      correct: 1,
    },
    {
      question: "Тунамал чулуулгийн жишээ?",
      options: ["Бал чулуу", "Элсэн чулуу", "Боржин"],
      correct: 1,
    },
    {
      question: "Дэлхийн хамгийн том цөл?",
      options: ["Говь", "Сахар", "Виктория"],
      correct: 1,
    },
    {
      question: "Хамгийн гүн хотгор (хонхор)?",
      options: ["Байгал", "Марианы хотгор", "Үхсэн тэнгис"],
      correct: 1,
    },
    {
      question: "Царцдасын хөдөлгөөнөөр үүссэн уул?",
      options: ["Хөндий уул", "Атираат уул", "Үлдэгдэл уул"],
      correct: 1,
    },
    {
      question: "Монгол орны хамгийн өндөр цэг?",
      options: ["Мөнххайрхан", "Хүйтэн оргил", "Богд хан"],
      correct: 1,
    },
  ],
  water: [
    {
      question: "Дэлхийн гадаргын хэдэн хувийг ус эзэлдэг вэ?",
      options: ["50%", "71%", "90%"],
      correct: 1,
    },
    {
      question: "Хамгийн том далай?",
      options: ["Атлантын", "Номхон", "Энэтхэгийн"],
      correct: 1,
    },
    {
      question: "Дэлхийн хамгийн урт мөрөн?",
      options: ["Миссисипи", "Нил", "Амазон"],
      correct: 1,
    },
    {
      question: "Цэвэр усны хамгийн их нөөц хаана байдаг вэ?",
      options: ["Гол мөрөн", "Мөсөн гол", "Нуур"],
      correct: 1,
    },
    {
      question: "Хамгийн их давсжилттай тэнгис?",
      options: ["Хар тэнгис", "Улаан тэнгис", "Каспийн тэнгис"],
      correct: 1,
    },
    {
      question: "Далайн усны дундаж давсжилт?",
      options: ["25‰", "35‰", "45‰"],
      correct: 1,
    },
    {
      question: "Голын эх авч байгаа газрыг юу гэх вэ?",
      options: ["Адаг", "Эх", "Татар"],
      correct: 1,
    },
    {
      question: "Хамгийн их усны нөөцтэй мөрөн?",
      options: ["Нил", "Амазон", "Янцзы"],
      correct: 1,
    },
    {
      question: "Дэлхийн хамгийн гүн нуур?",
      options: ["Хөвсгөл", "Байгал", "Виктория"],
      correct: 1,
    },
    {
      question: "Далайн дулаан урсгалын жишээ?",
      options: ["Перу", "Гольфстрим", "Канар"],
      correct: 1,
    },
  ],
  cartography: [
    {
      question: "Газрын зургийн зүг чигийг заагч багаж?",
      options: ["Термометр", "Луужин (Compass)", "Радар"],
      correct: 1,
    },
    {
      question: "Экваторын урт ойролцоогоор?",
      options: ["20,000 км", "40,000 км", "60,000 км"],
      correct: 1,
    },
    {
      question: "Дэлхийн загвар (бөмбөрцөг)?",
      options: ["Атлас", "Глобус", "Зураг"],
      correct: 1,
    },
    {
      question: "Газрын зураг дээрх ижил өндөртэй цэгүүдийг холбосон шугам?",
      options: ["Меридиан", "Хэвтээ шугам (Изогипс)", "Параллель"],
      correct: 1,
    },
    {
      question: "0 градусын голдож хаагуур дайрдаг вэ?",
      options: ["Парис", "Гринвич", "Нью-Йорк"],
      correct: 1,
    },
    {
      question: "Газрын гадаргыг багасгаж зурсан харьцаа?",
      options: ["Таних тэмдэг", "Масштаб", "Төсөөлөл"],
      correct: 1,
    },
    {
      question: "Босоо шугамыг юу гэж нэрлэдэг вэ?",
      options: ["Өргөрөг", "Уртраг (Голдож)", "Экватор"],
      correct: 1,
    },
    {
      question: "Хэвтээ шугамыг юу гэж нэрлэдэг вэ?",
      options: ["Уртраг", "Өргөрөг (Зэргэд)", "Гринвич"],
      correct: 1,
    },
    {
      question: "Газрын зургийн цуглуулга ном?",
      options: ["Нэвтэрхий толь", "Атлас", "Сэтгүүл"],
      correct: 1,
    },
    {
      question: "Хамгийн бага масштабтай зураг?",
      options: ["Төлөвлөгөө", "Дэлхийн зураг", "Аймгийн зураг"],
      correct: 1,
    },
  ],
  population: [
    {
      question: "Дэлхийн хүн ам ойролцоогоор хэд вэ?",
      options: ["5 тэрбум", "8 тэрбум", "10 тэрбум"],
      correct: 1,
    },
    {
      question: "Хамгийн их хүн амтай улс?",
      options: ["АНУ", "Энэтхэг", "Орос"],
      correct: 1,
    },
    {
      question: "Нэг км кв талбайд ногдох хүн ам?",
      options: ["Төрөлт", "Хүн амын нягтшил", "Суурьшил"],
      correct: 1,
    },
    {
      question: "Хотжилт гэж юу вэ?",
      options: [
        "Хөдөө рүү нүүх",
        "Урбанизаци (Хот руу шилжих)",
        "Газар тариалан",
      ],
      correct: 1,
    },
    {
      question: "Хамгийн олон улстай тив?",
      options: ["Ази", "Африк", "Европ"],
      correct: 1,
    },
    {
      question: "Далайд гарцгүй хамгийн том улс?",
      options: ["Казахстан", "Монгол", "Чад"],
      correct: 0,
    },
    {
      question: "Дэлхийн хамгийн том газар нутагтай улс?",
      options: ["Хятад", "Орос", "Канада"],
      correct: 1,
    },
    {
      question: "Хүн амын механик хөдөлгөөн?",
      options: ["Төрөлт", "Шилжих хөдөлгөөн (Миграци)", "Нас баралт"],
      correct: 1,
    },
    {
      question: "Монгол улсын хүн амын тоо?",
      options: ["2.5 сая", "3.5 сая", "4.5 сая"],
      correct: 1,
    },
    {
      question: "Дэлхийн хамгийн олон хэлээр ярьдаг тив?",
      options: ["Европ", "Ази", "Антарктид"],
      correct: 1,
    },
  ],
};

function QuizGeoManager() {
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
      source = Object.values(GEO_QUESTIONS).flat();
    } else {
      source = GEO_QUESTIONS[topicId] || GEO_QUESTIONS.planet;
    }
    // Санамсаргүй 10 асуулт сонгох
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
        <Loader2 className="w-10 h-10 text-[#1E40AF] animate-spin" />
      </div>
    );
  }

  const q = questions[current];
  const progress = ((current + 1) / questions.length) * 100;

  return (
    <div
      className={`min-h-screen ${config.bg} flex flex-col font-sans transition-all duration-500`}
    >
      {/* Header UI */}
      <header className="fixed top-0 inset-x-0 z-40 px-6 pt-6">
        <div className="max-w-4xl mx-auto bg-white/80 backdrop-blur-xl border border-white rounded-[2rem] p-4 shadow-xl shadow-slate-200/50 flex items-center justify-between">
          <button
            onClick={() => router.back()}
            className="p-3 bg-white rounded-2xl text-slate-400 hover:text-[#1E40AF] transition-all active:scale-90"
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
          <div className="absolute inset-0 translate-y-6 scale-[0.9] bg-[#1E40AF]/5 rounded-[3.5rem] -z-10 blur-md" />

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
              ГАЗАРЗҮЙ {topicId === "all" ? "ХОЛИМОГ" : "БҮЛЭГ"}
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
                        ? "border-[#1E40AF] bg-[#1E40AF] text-white shadow-lg translate-x-2"
                        : "border-slate-50 bg-slate-50/50 text-slate-600 hover:border-slate-200 hover:bg-white active:scale-[0.98]"
                    }`}
                  >
                    <span
                      className={`w-10 h-10 rounded-xl flex items-center justify-center text-xs font-black transition-colors ${isSelected ? "bg-white/20 text-white" : "bg-white text-slate-300 group-hover:text-[#1E40AF]"}`}
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

        {isSaving && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/60 backdrop-blur-sm">
            <div className="bg-white p-8 rounded-[2.5rem] shadow-2xl flex flex-col items-center gap-4">
              <Loader2 className="w-10 h-10 text-[#1E40AF] animate-spin" />
              <p className="font-black text-[#1E40AF] text-xs uppercase tracking-widest">
                Үр дүнг хадгалж байна...
              </p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default function UniversalGeoQuizPage() {
  return (
    <Suspense
      fallback={
        <div className="h-screen flex items-center justify-center bg-slate-50 animate-pulse font-black text-[#1E40AF]">
          УНШИЖ БАЙНА...
        </div>
      }
    >
      <QuizGeoManager />
    </Suspense>
  );
}
