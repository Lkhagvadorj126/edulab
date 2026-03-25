"use client";

import React, { useState, useEffect, Suspense, useRef } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import {
  ChevronLeft,
  Activity,
  Zap,
  Beaker,
  Magnet,
  Dna,
  LayoutGrid,
  CheckCircle2,
  Loader2,
  Trophy,
} from "lucide-react";

// --- ТОХИРГОО БА ӨНГӨ ---
const topicConfigs = {
  all: {
    title: "Холимог тест",
    color: "#1E293B",
    bg: "bg-slate-50",
    icon: <LayoutGrid className="w-5 h-5 text-white" />,
  },
  density: {
    title: "Нягтрал ба Даралт",
    color: "#3B82F6",
    bg: "bg-blue-50",
    icon: <Activity className="w-5 h-5 text-white" />,
  },
  diffusion: {
    title: "МКО болон Диффуз",
    color: "#6366F1",
    bg: "bg-indigo-50",
    icon: <Beaker className="w-5 h-5 text-white" />,
  },
  laser: {
    title: "Лазерын онол",
    color: "#F59E0B",
    bg: "bg-amber-50",
    icon: <Zap className="w-5 h-5 text-white" />,
  },
  molecular: {
    title: "Молекул туйлшрал",
    color: "#EF4444",
    bg: "bg-rose-50",
    icon: <Magnet className="w-5 h-5 text-white" />,
  },
  measurement: {
    title: "Квант хэмжилт",
    color: "#8B5CF6",
    bg: "bg-purple-50",
    icon: <Dna className="w-5 h-5 text-white" />,
  },
};

// --- БҮХ АСУУЛТУУД (50 асуулт) ---
const ALL_QUESTIONS = {
  density: [
    {
      question: "Бодисын нягтралыг олох зөв томьёо аль нь вэ?",
      options: ["ρ = V / m", "ρ = m / V", "ρ = m · V"],
      correct: 1,
    },
    {
      question:
        "Шингэний гидростатик даралтыг (P) ямар томьёогоор тооцоолох вэ?",
      options: ["P = F / A", "P = ρgh", "P = mg"],
      correct: 1,
    },
    {
      question: "Паскалийн хууль хаана илүү хамааралтай вэ?",
      options: ["Нисэх онгоцны далавч", "Гидравлик өсгөгч", "Чөлөөт уналт"],
      correct: 1,
    },
    {
      question: "Архимедийн хүч (Fa) юутай тэнцүү байдаг вэ?",
      options: [
        "Биеийн жинтэй",
        "Түлхэн гаргасан шингэний жинтэй",
        "Биеийн нягттай",
      ],
      correct: 1,
    },
    {
      question: "Ямар нөхцөлд бие шингэнд живэх вэ?",
      options: ["ρбие > ρшин", "ρбие < ρшин", "ρбие = ρшин"],
      correct: 0,
    },
    {
      question:
        "Агаар мандлын хэвийн даралт мөнгөн усны баганын хэдэн мм-тэй тэнцүү вэ?",
      options: ["100 мм", "760 мм", "1013 мм"],
      correct: 1,
    },
    {
      question:
        "Бернуллийн хуулиар шингэний урсгалын хурд ихсэхэд статик даралт яах вэ?",
      options: ["Ихэснэ", "Багасна", "Өөрчлөгдөхгүй"],
      correct: 1,
    },
    {
      question:
        "Нарийн гуурсаар шингэн өөрөө аяндаа өгсөх үзэгдлийг юу гэх вэ?",
      options: ["Диффузи", "Капилляр үзэгдэл", "Резонанс"],
      correct: 1,
    },
    {
      question: "Даралтын нэгж Паскаль (Па) нь юутай тэнцүү вэ?",
      options: ["1 Н / м", "1 Н / м²", "1 кг / м³"],
      correct: 1,
    },
    {
      question: "Гадаргуугийн шалчиг үзэгдлийн үндсэн шалтгаан юу вэ?",
      options: [
        "Гадаад даралт",
        "Молекул хоорондын таталцал",
        "Дэлхийн татах хүч",
      ],
      correct: 1,
    },
  ],
  diffusion: [
    {
      question: "Диффуз үзэгдэл явагдах үндсэн шалтгаан юу вэ?",
      options: [
        "Гадаад даралт",
        "Молекулуудын замбараагүй дулааны хөдөлгөөн",
        "Дэлхийн татах хүч",
      ],
      correct: 1,
    },
    {
      question: "Температур нэмэгдэхэд диффуз яаж өөрчлөгдөх вэ?",
      options: ["Удааширна", "Хурдасна", "Өөрчлөгдөхгүй"],
      correct: 1,
    },
    {
      question: "Диффуз аль төлөвт хамгийн хурдан явагддаг вэ?",
      options: ["Хатуу", "Шингэн", "Хий"],
      correct: 2,
    },
    {
      question:
        "Шингэн доторх жижиг хэсгүүдийн зогсолтгүй, замбараагүй хөдөлгөөнийг юу гэх вэ?",
      options: ["Диффуз", "Броуны хөдөлгөөн", "Резонанс"],
      correct: 1,
    },
    {
      question:
        "Молекулын дундаж кинетик энерги (Ek) юунаас шууд хамааралтай вэ?",
      options: ["Температур (T)", "Даралт (P)", "Эзлэхүүн (V)"],
      correct: 0,
    },
    {
      question:
        "Грэхэмийн хуулиар хийн урсах хурд молекул массаас яаж хамаарах вэ?",
      options: [
        "Шууд хамааралтай",
        "Массын язгуураас урвуу хамааралтай",
        "Хамааралгүй",
      ],
      correct: 1,
    },
    {
      question:
        "Молекул хоёр дараалсан мөргөлдөөний хооронд туулах зайг юу гэх вэ?",
      options: ["Диффузын зам", "Чөлөөт гүйлтийн зам", "Долгионы урт"],
      correct: 1,
    },
    {
      question: "Фикийн 1-р хуулиар диффузын урсгал юунаас хамаардаг вэ?",
      options: ["Концентрацийн градиент", "Биеийн хурд", "Гэрлийн эрчим"],
      correct: 0,
    },
    {
      question: "Хийн даралт үүсэх үндсэн шалтгаан юу вэ?",
      options: [
        "Молекулуудын таталцал",
        "Савны ханыг мөргөх молекулуудын хүч",
        "Хийн температур",
      ],
      correct: 1,
    },
    {
      question: "Молекул Кинетик Онолын (МКО) нэг үндэслэл аль нь вэ?",
      options: [
        "Бодис бүхэл бүтэн цул юм",
        "Бодис молекулаас тогтох ба зогсолтгүй хөдөлнө",
        "Молекулууд зөвхөн шулуун замаар хөдөлнө",
      ],
      correct: 1,
    },
  ],
  laser: [
    {
      question: "LASER гэдэг товчлолын 'S' үсэг ямар утгатай вэ?",
      options: ["System (Систем)", "Stimulated (Албадмал)", "Solar (Нарны)"],
      correct: 1,
    },
    {
      question: "Лазерын гэрэл үүсэх үндсэн зарчим аль нь вэ?",
      options: ["Өөрөө аяндаах цацрал", "Албадмал цацрал", "Дулааны цацрал"],
      correct: 1,
    },
    {
      question: "Популяцийн урвуу шилжилт гэж юу вэ?",
      options: [
        "Дээд түвшний атом доод түвшнээс олон болох",
        "Бүх атомууд үндсэн төлөвт орох",
        "Атомууд системээс гарах",
      ],
      correct: 0,
    },
    {
      question: "Лазерын гэрэл зөвхөн нэг давтамжтай байхыг юу гэх вэ?",
      options: ["Когерент чанар", "Монохромат чанар", "Дифракц"],
      correct: 1,
    },
    {
      question: "Фотоны энергийг (E) тооцоолох зөв томьёо аль нь вэ?",
      options: ["E = h · f", "E = m · c", "E = P / V"],
      correct: 0,
    },
    {
      question:
        "Фотонуудыг буцааж ойлгон, албадмал цацралыг өдөөдөг системийг юу гэх вэ?",
      options: ["Индуктор", "Оптик резонатор", "Диод"],
      correct: 1,
    },
    {
      question:
        "Бүх фотонууд нэг фазтай, ижил чиглэлд хөдлөх шинж чанарыг юу гэх вэ?",
      options: ["Когерент чанар", "Интерференц", "Сарнилт"],
      correct: 0,
    },
    {
      question:
        "Атом өдөөгдсөн төлөвөөс гадны нөлөөгүйгээр шилжихийг юу гэх вэ?",
      options: ["Албадмал цацрал", "Өөрөө аяндаах цацрал", "Фотоэффект"],
      correct: 1,
    },
    {
      question: "Хамгийн анхны лазерыг ямар бодисоор хийсэн бэ?",
      options: ["Гели-Неон", "Руби (Бадамлянхуа)", "Алтан"],
      correct: 1,
    },
    {
      question: "Лазерыг анагаах ухаанд юунд ашигладаг вэ?",
      options: ["Рентген зураг авахад", "Мэс засал", "Даралт хэмжихэд"],
      correct: 1,
    },
  ],
  molecular: [
    {
      question: "Молекулын туйлшрал гэж юу вэ?",
      options: [
        "Молекул задрах",
        "Цэнэгүүд шилжиж диполь үүсэх",
        "Молекул хурдан хөдөлөх",
      ],
      correct: 1,
    },
    {
      question: "Цахилгаан диполь моментыг (p) ямар томьёогоор тодорхойлох вэ?",
      options: ["p = m * v", "p = q * l", "p = F / q"],
      correct: 1,
    },
    {
      question: "Аль нь туйлтай молекулын жишээ вэ?",
      options: ["Устөрөгч (H₂)", "Ус (H₂O)", "Метан (CH₄)"],
      correct: 1,
    },
    {
      question:
        "Диэлектрик доторх цахилгаан орон суларч байгааг илэрхийлэх хэмжигдэхүүн?",
      options: ["Багтаамж", "Диэлектрик нэвтрүүлэлт (ε)", "Эсэргүүцэл"],
      correct: 1,
    },
    {
      question: "Температур ихсэхэд диполь туйлшрал яаж өөрчлөгдөх вэ?",
      options: ["Буурна", "Ихэснэ", "Өөрчлөгдөхгүй"],
      correct: 0,
    },
    {
      question: "Бичил долгионы зуух ямар молекулын туйлшралыг ашигладаг вэ?",
      options: ["Өөх тосны", "Усны", "Агаарын"],
      correct: 1,
    },
    {
      question: "Электрон туйлшрал ямар хугацаанд явагддаг вэ?",
      options: ["Маш удаан", "Маш богино (10⁻¹⁵ сек)", "Минут"],
      correct: 1,
    },
    {
      question:
        "Конденсаторын ялтсуудын хооронд диэлектрик хийхэд багтаамж яах вэ?",
      options: ["ε дахин нэмэгдэнэ", "ε дахин багасна", "Өөрчлөгдөхгүй"],
      correct: 0,
    },
    {
      question: "Аль нь туйлгүй молекул вэ?",
      options: ["Аммиак (NH₃)", "Хүчилтөрөгч (O₂)", "Ус (H₂O)"],
      correct: 1,
    },
    {
      question: "Ионы туйлшрал ихэвчлэн ямар бодист явагддаг вэ?",
      options: ["Хий", "Талст тор бүхий хатуу бодис", "Металл"],
      correct: 1,
    },
  ],
  measurement: [
    {
      question: "Планкийн гипотезоор энерги ямар байдлаар цацагддаг вэ?",
      options: ["Тасралтгүй", "Квант хэлбэрээр", "Дулаан хэлбэрээр"],
      correct: 1,
    },
    {
      question:
        "Фотоэффектийн үзэгдлийг тайлбарласан Эйнштейний тэгшитгэл аль нь вэ?",
      options: ["E = mc²", "h·f = A + Ek", "P = IV"],
      correct: 1,
    },
    {
      question: "Де Бройлийн таамаглалаар микро биетүүд ямар шинж чанатай вэ?",
      options: ["Бөөмлөг", "Долгионлог", "Хоёрдогч чанартай"],
      correct: 2,
    },
    {
      question:
        "Гейзенбергийн зарчмаар ямар хоёр хэмжигдэхүүнийг нэгэн зэрэг тогтоох боломжгүй вэ?",
      options: ["Масс ба Хурдатгал", "Координат ба Импульс", "Хүч ба Хугацаа"],
      correct: 1,
    },
    {
      question: "Фотоны импульсийг (p) тооцоолох зөв томьёо аль нь вэ?",
      options: ["p = h / λ", "p = m · v", "p = F · t"],
      correct: 0,
    },
    {
      question: "Борын атомын загвараар электронууд ямар тойргоор хөдлөх вэ?",
      options: ["Дурын", "Стационар тойргоор", "Спиралиар"],
      correct: 1,
    },
    {
      question:
        "Комптон эффектээр рентген туяа сарнихдаа долгионы урт нь яах вэ?",
      options: ["Багасна", "Ихэснэ", "Өөрчлөгдөхгүй"],
      correct: 1,
    },
    {
      question: "Паулигийн зарчим юуг хориглодог вэ?",
      options: [
        "Цөм рүү унахыг",
        "4 квант тоогоор ижил байхыг",
        "Гэрэл сарнихыг",
      ],
      correct: 1,
    },
    {
      question:
        "Стефан-Больцманы хуулиар цацруулах чадвар температураас яаж хамаарах вэ?",
      options: ["4 зэрэгт шууд", "Урвуу", "Язгууртай"],
      correct: 0,
    },
    {
      question:
        "Винийн шилжилтийн хуулиар температур ихсэхэд долгионы урт яах вэ?",
      options: ["Богино долгион руу", "Урт долгион руу", "Тогтмол"],
      correct: 0,
    },
  ],
};

function QuizManager() {
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
    // 1. Сэдвээс хамаарч асуултуудаа бэлдэх
    let source = [];
    if (topicId === "all") {
      source = Object.values(ALL_QUESTIONS).flat();
    } else {
      source = ALL_QUESTIONS[topicId] || ALL_QUESTIONS.density;
    }

    // 2. Холиод 10-ыг сонгох
    const shuffled = [...source].sort(() => Math.random() - 0.5).slice(0, 10);
    setQuestions(shuffled);
  }, [topicId]);

  const handleAnswer = (idx) => {
    if (selectedIdx !== null || isSaving) return;

    setSelectedIdx(idx);
    const q = questions[current];
    const isCorrect = idx === q.correct;

    // 1 асуулт = 1 XP
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
    }, 500);
  };

  const saveResults = async (finalScore, finalAnswers) => {
    if (hasSaved.current) return;
    hasSaved.current = true;

    // Энд өөрийн API-г дуудаж оноогоо хадгална (Жишээ)
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
      {/* Header UI */}
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
              ФИЗИК 10Б • {topicId === "all" ? "ХОЛИМОГ" : "БҮЛЭГ"}
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
                    className={`
                      group relative w-full p-6 rounded-[2rem] text-left transition-all duration-300 flex items-center gap-5 border-2
                      ${
                        isSelected
                          ? "border-[#312C85] bg-[#312C85] text-white shadow-lg translate-x-2"
                          : "border-slate-50 bg-slate-50/50 text-slate-600 hover:border-slate-200 hover:bg-white active:scale-[0.98]"
                      }
                    `}
                  >
                    <span
                      className={`
                      w-10 h-10 rounded-xl flex items-center justify-center text-xs font-black transition-colors
                      ${isSelected ? "bg-white/20 text-white" : "bg-white text-slate-300 group-hover:text-[#312C85]"}
                    `}
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
      <QuizManager />
    </Suspense>
  );
}
