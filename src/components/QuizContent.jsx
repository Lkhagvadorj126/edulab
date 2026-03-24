"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import {
  ChevronLeft,
  Zap,
  Activity,
  Trophy,
  Beaker,
  Dna,
  LayoutGrid,
} from "lucide-react";
import NavAll from "./NavAll";

const topicConfigs = {
  all: {
    title: "Холимог тест",
    sub: "Бүх бүлэг - 10 асуулт",
    color: "#1E293B", // Slate 800
    bg: "bg-slate-50",
    icon: <LayoutGrid className="w-5 h-5 text-white" />,
    retryPath: "/quiz?topic=all",
    homePath: "/dashboard",
  },
  motion: {
    title: "Механик хөдөлгөөн",
    sub: "Физик 10Б",
    color: "#3B82F6", // Blue 500
    bg: "bg-blue-50",
    icon: <Activity className="w-5 h-5 text-white" />,
    retryPath: "/quiz?topic=motion",
    homePath: "/dashboard",
  },
  sound: {
    title: "Дуу авиа",
    sub: "Физик 10Б",
    color: "#6366F1", // Indigo 500
    bg: "bg-indigo-50",
    icon: <Activity className="w-5 h-5 text-white" />,
    retryPath: "/quiz?topic=sound",
    homePath: "/dashboard",
  },
  light: {
    title: "Гэрэл ба Оптик",
    sub: "Физик 10Б",
    color: "#F59E0B", // Amber 500
    bg: "bg-amber-50",
    icon: <Zap className="w-5 h-5 text-white" />,
    retryPath: "/quiz?topic=light",
    homePath: "/dashboard",
  },
  heat: {
    title: "Дулааны физик",
    sub: "Физик 10Б",
    color: "#EF4444", // Rose 500
    bg: "bg-rose-50",
    icon: <Beaker className="w-5 h-5 text-white" />,
    retryPath: "/quiz?topic=heat",
    homePath: "/dashboard",
  },
  energy: {
    title: "Ажил ба Энерги",
    sub: "Физик 10Б",
    color: "#10B981", // Emerald 500
    bg: "bg-emerald-50",
    icon: <Zap className="w-5 h-5 text-white" />,
    retryPath: "/quiz?topic=energy",
    homePath: "/dashboard",
  },
  quantum: {
    title: "Квант физик",
    sub: "Физик 10Б",
    color: "#8B5CF6", // Purple 500
    bg: "bg-purple-50",
    icon: <Dna className="w-5 h-5 text-white" />,
    retryPath: "/quiz?topic=quantum",
    homePath: "/dashboard",
  },
};
const allQuestionsByTopic = {
  motion: [
    {
      id: 1,
      question: "Биеийн хөдөлгөөнийг ажиглах цэгийг юу гэх вэ?",
      options: ["Лавлах систем", "Шилжилт", "Зам"],
      correct: 0,
    },
    {
      id: 2,
      question: "Хөдөлгөөний эх ба төгсгөл цэгийг холбосон векторыг юу гэх вэ?",
      options: ["Зам", "Шилжилт", "Хурд"],
      correct: 1,
    },
    {
      id: 3,
      question: "Хурдатгалын зөв томьёо аль нь вэ?",
      options: ["a = v / t", "a = Δv / t", "a = s / t"],
      correct: 1,
    },
    {
      id: 4,
      question: "Тэгш хөдөлгөөний замын томьёо аль нь вэ?",
      options: ["s = v₀t", "s = vt²", "s = at/2"],
      correct: 0,
    },
    {
      id: 5,
      question: "Чөлөөт уналтын хурдатгал g-ийн утга хэд вэ?",
      options: ["1.6 м/с²", "8.9 м/с²", "9.8 м/с²"],
      correct: 2,
    },
    {
      id: 6,
      question: "Ньютоны 2-р хуулийн томьёо аль нь вэ?",
      options: ["F = ma", "F = m/a", "F = v/t"],
      correct: 0,
    },
    {
      id: 7,
      question: "Кинетик энергийн томьёо аль нь вэ?",
      options: ["E = mgh", "E = ½mv²", "E = mv"],
      correct: 1,
    },
    {
      id: 8,
      question: "Үрэлтийн хүчний томьёог сонгоно уу?",
      options: ["F = μN", "F = mg", "F = ma"],
      correct: 0,
    },
    {
      id: 9,
      question: "Механик ажлын (A) томьёо аль нь вэ?",
      options: ["A = F·s·cosθ", "A = F/t", "A = mgh"],
      correct: 0,
    },
    {
      id: 10,
      question: "Импульс (p)-ийг хэрхэн олдог вэ?",
      options: ["p = mv", "p = m/v", "p = ma"],
      correct: 0,
    },
    {
      id: 11,
      question: "Тойрог хөдөлгөөний өнцөг хурд ω-ийн томьёо?",
      options: ["ω = 2π / T", "ω = v / r²", "ω = 2πr"],
      correct: 0,
    },
    {
      id: 12,
      question: "Төвд тэмүүлэх хурдатгалын томьёо?",
      options: ["a = v² / r", "a = r / v²", "a = v*r"],
      correct: 0,
    },
    {
      id: 13,
      question: "Потенциал энергийн томьёо аль нь вэ?",
      options: ["E = mgh", "E = ½mv²", "E = ma"],
      correct: 0,
    },
    {
      id: 14,
      question: "Механик ажлын нэгж юу вэ?",
      options: ["Ватт (Вт)", "Ньютон (Н)", "Жоуль (Ж)"],
      correct: 2,
    },
    {
      id: 15,
      question: "Чадал P-ийг хэрхэн олдог вэ?",
      options: ["P = A / t", "P = A * t", "P = F * m"],
      correct: 0,
    },
    {
      id: 16,
      question: "s-t графикийн налуу юуг илэрхийлэх вэ?",
      options: ["Хурдатгал", "Хурд", "Хүч"],
      correct: 1,
    },
    {
      id: 17,
      question: "v-t графикийн доорх талбай юуг илэрхийлэх вэ?",
      options: ["Шилжилт", "Хурдатгал", "Эрчим"],
      correct: 0,
    },
    {
      id: 18,
      question: "Чөлөөт уналтын өндрийг (h) олох томьёо?",
      options: ["h = ½gt²", "h = gt", "h = v²/g"],
      correct: 0,
    },
    {
      id: 19,
      question: "Ньютоны 3-р хууль юуг илэрхийлэх вэ?",
      options: ["Инерци", "Үйлдэл ба эсрэг үйлдэл", "Цохилт"],
      correct: 1,
    },
    {
      id: 20,
      question: "Хэвтээ чиглэлд шидэгдсэн биеийн алслалт R?",
      options: ["R = v₀t", "R = gt²/2", "R = v₀/g"],
      correct: 0,
    },
  ],
  sound: [
    {
      id: 1,
      question: "Агаарт (20°C хэмд) дууны хурд хэд вэ?",
      options: ["343 м/с", "1480 м/с", "300,000 км/с"],
      correct: 0,
    },
    {
      id: 2,
      question: "Дууны түвшинг хэмжих нэгж?",
      options: ["Гц", "дБ", "Вт/м²"],
      correct: 1,
    },
    {
      id: 3,
      question: "Доплерийн эффект гэж юу вэ?",
      options: ["Дуу ойх", "Давтамж өөрчлөгдөх", "Энерги алдагдах"],
      correct: 1,
    },
    {
      id: 4,
      question: "Хүний чихний сонсох муж?",
      options: ["0-20 Гц", "20-20,000 Гц", "20 кГц-ээс дээш"],
      correct: 1,
    },
    {
      id: 5,
      question: "Саадаас ойж буцаж ирэх авиа?",
      options: ["Резонанс", "Цуурай", "Дифракц"],
      correct: 1,
    },
    {
      id: 6,
      question: "Далайц огцом өсөх үзэгдэл?",
      options: ["Резонанс", "Интерференц", "Ойлт"],
      correct: 0,
    },
    {
      id: 7,
      question: "Дуу аль орчинд хамгийн хурдан бэ?",
      options: ["Хий", "Шингэн", "Хатуу"],
      correct: 2,
    },
    {
      id: 8,
      question: "20 Гц-ээс бага давтамжтай авиа?",
      options: ["Хэт авиа", "Инфра авиа", "Сонсогдох"],
      correct: 1,
    },
    {
      id: 9,
      question: "Саадыг тойрч гарах үзэгдэл?",
      options: ["Дифракц", "Интерференц", "Хугарал"],
      correct: 0,
    },
    {
      id: 10,
      question: "Цуурай сонсогдох доод зай?",
      options: ["10.5 м", "17.2 м", "34.4 м"],
      correct: 1,
    },
    {
      id: 11,
      question: "Хэт авианы давтамж?",
      options: ["> 20,000 Гц", "< 20 Гц", "100 Гц"],
      correct: 0,
    },
    {
      id: 12,
      question: "Долгионы урт ба давтамжийн хамаарал?",
      options: ["λ = v/f", "λ = v*f", "λ = f/v"],
      correct: 0,
    },
    {
      id: 13,
      question: "Дууны чанга сул юунаас хамаарах вэ?",
      options: ["Давтамж", "Далайц", "Хурд"],
      correct: 1,
    },
    {
      id: 14,
      question: "Дууны өндөр нам юунаас хамаарах вэ?",
      options: ["Давтамж", "Далайц", "Орчин"],
      correct: 0,
    },
    {
      id: 15,
      question: "Усан дахь дууны хурд ойролцоогоор?",
      options: ["340 м/с", "1500 м/с", "5000 м/с"],
      correct: 1,
    },
    {
      id: 16,
      question: "Вакуум орчинд дуу тарах уу?",
      options: ["Татарна", "Тархахгүй", "Хурдан тархана"],
      correct: 1,
    },
    {
      id: 17,
      question: "Дууны долгион ямар төрлийнх вэ?",
      options: ["Хөндлөн", "Тууш", "Цахилгаан соронзон"],
      correct: 1,
    },
    {
      id: 18,
      question: "Давтамжийн нэгж юу вэ?",
      options: ["Жоуль", "Герц", "Метр"],
      correct: 1,
    },
    {
      id: 19,
      question: "Гармоник хэлбэлзлийн тэгшитгэл?",
      options: ["x = A cos(ωt)", "v = s/t", "F = ma"],
      correct: 0,
    },
    {
      id: 20,
      question: "Дууны хурд температуртай яаж хамаарах вэ?",
      options: ["Ихсэхэд ихсэнэ", "Ихсэхэд багасна", "Хамааралгүй"],
      correct: 0,
    },
  ],
  light: [
    {
      id: 1,
      question: "Ойлтын хуулиар α ба β өнцөг ямар байх вэ?",
      options: ["β > α", "β < α", "β = α"],
      correct: 2,
    },
    {
      id: 2,
      question: "Снеллиусын хууль аль нь вэ?",
      options: ["n = c/v", "n₁sinα = n₂sinβ", "1/f = 1/d"],
      correct: 1,
    },
    {
      id: 3,
      question: "Вакуум дахь гэрлийн хурд?",
      options: ["300,000 км/с", "300,000 м/с", "3*10^6 м/с"],
      correct: 0,
    },
    {
      id: 4,
      question: "Линзний оптик хүчний нэгж?",
      options: ["Метр", "Диоптр", "Варт"],
      correct: 1,
    },
    {
      id: 5,
      question: "Цагаан гэрэл 7 өнгөөр задрах үзэгдэл?",
      options: ["Интерференц", "Дисперс", "Дифракц"],
      correct: 1,
    },
    {
      id: 6,
      question: "Гэрэл саадыг тойрч нугарах үзэгдэл?",
      options: ["Дифракц", "Туйлшрал", "Ойлт"],
      correct: 0,
    },
    {
      id: 7,
      question: "Бүрэн дотоод ойлт хаана явагдах вэ?",
      options: [
        "Илтгэгч багаас их рүү",
        "Илтгэгч ихээс бага руу",
        "Зөвхөн агаарт",
      ],
      correct: 1,
    },
    {
      id: 8,
      question: "Фокусын зай 0.5м бол оптик хүч хэд вэ?",
      options: ["0.5 дптр", "2 дптр", "1 дптр"],
      correct: 1,
    },
    {
      id: 9,
      question: "Когерент долгионууд давхцах үзэгдэл?",
      options: ["Интерференц", "Дисперс", "Ойлт"],
      correct: 0,
    },
    {
      id: 10,
      question: "Гэрлийн гадаргууд үзүүлэх хүч?",
      options: ["Хугарал", "Даралт", "Туйлшрал"],
      correct: 1,
    },
    {
      id: 11,
      question: "Тохойн толиор ямар дүрс үүсдэг вэ?",
      options: ["Бодит", "Хуурмаг", "Дүрс үүсэхгүй"],
      correct: 1,
    },
    {
      id: 12,
      question: "Нүдний шилний линз ямар төрөл вэ?",
      options: ["Цуглуулагч/Сааруулагч", "Зөвхөн цуглуулагч", "Хавтгай"],
      correct: 0,
    },
    {
      id: 13,
      question: "Гэрэл ямар төрлийн долгион бэ?",
      options: ["Тууш", "Хөндлөн", "Механик"],
      correct: 1,
    },
    {
      id: 14,
      question: "Солонгын өнгө юунаас болж үүсдэг вэ?",
      options: ["Дифракц", "Дисперс", "Туйлшрал"],
      correct: 1,
    },
    {
      id: 15,
      question: "Гэрлийн цацраг гэж юу вэ?",
      options: ["Энерги тарах шугам", "Долгионы фронт", "Материаллаг цэг"],
      correct: 0,
    },
    {
      id: 16,
      question: "Нимгэн линзний томьёо?",
      options: ["1/F = 1/d + 1/f", "F = m*a", "P = U*I"],
      correct: 0,
    },
    {
      id: 17,
      question: "Гэрэл шилнээс агаарт гарахад хурд нь?",
      options: ["Ихсэнэ", "Багасна", "Өөрчлөгдөхгүй"],
      correct: 0,
    },
    {
      id: 18,
      question: "Шар өнгийн гэрлийн нэмэлт өнгө?",
      options: ["Улаан", "Хөх", "Ногоон"],
      correct: 1,
    },
    {
      id: 19,
      question: "Фотоны энергийн томьёо?",
      options: ["E = hf", "E = mc2", "E = mgh"],
      correct: 0,
    },
    {
      id: 20,
      question: "Гэрэл тунгалаг биш биеийн ард юу үүсгэдэг вэ?",
      options: ["Сүүдэр", "Гэрэл", "Хугарал"],
      correct: 0,
    },
  ],
  heat: [
    {
      id: 1,
      question: "Молекулуудын дундаж кинетик энергийн хэмжүүр?",
      options: ["Дулаан", "Температур", "Энтропи"],
      correct: 1,
    },
    {
      id: 2,
      question: "Дулаан дамжих төрөлд аль нь орохгүй вэ?",
      options: ["Дамжуулалт", "Конвекци", "Диффуз"],
      correct: 2,
    },
    {
      id: 3,
      question: "Дулааны багтаамжийн томьёо?",
      options: ["Q = mcΔT", "Q = mL", "ΔU = Q+A"],
      correct: 0,
    },
    {
      id: 4,
      question: "Бодис хайлах үеийн дулаан?",
      options: ["Q = mcΔT", "Q = λm", "PV = nRT"],
      correct: 1,
    },
    {
      id: 5,
      question: "Идеал хийн төлөвийн тэгшитгэл?",
      options: ["PV = nRT", "P/V = const", "V = kT"],
      correct: 0,
    },
    {
      id: 6,
      question: "Термодинамикийн 1-р хууль?",
      options: ["ΔU = Q+A", "η = 1-T2/T1", "Q=mcT"],
      correct: 0,
    },
    {
      id: 7,
      question: "Карно машины ашигт үйлийн коэффициент?",
      options: ["η = T1/T2", "η = 1-(T2/T1)", "η = Q/m"],
      correct: 1,
    },
    {
      id: 8,
      question: "Абсолют тэг температур Цельсээр?",
      options: ["0°C", "-100°C", "-273.15°C"],
      correct: 2,
    },
    {
      id: 9,
      question: "Шингэнээр дулаан дамжих үзэгдэл?",
      options: ["Дамжуулалт", "Конвекци", "Цацрал"],
      correct: 1,
    },
    {
      id: 10,
      question: "Энтропи үргэлж нэмэгдэнэ гэдэг нь хэддүгээр хууль вэ?",
      options: ["1-р хууль", "2-р хууль", "3-р хууль"],
      correct: 1,
    },
    {
      id: 11,
      question: "0 К температурт молекулын хөдөлгөөн?",
      options: ["Хурдсана", "Зогсоно", "Өөрчлөгдөхгүй"],
      correct: 1,
    },
    {
      id: 12,
      question: "Бойль-Мариоттын хууль?",
      options: ["P/V=const", "PV=const", "V/T=const"],
      correct: 1,
    },
    {
      id: 13,
      question: "Температур 1°C өөрчлөгдөхөд шаардлагатай дулаан?",
      options: ["Дулааны багтаамж", "Хайлах дулаан", "Дотоод энерги"],
      correct: 0,
    },
    {
      id: 14,
      question: "Дотоод энергийг өөрчлөх 2 арга?",
      options: ["Ажил ба Дулаан солилцоо", "Хурд ба Хүч", "Масс ба Эзлэхүүн"],
      correct: 0,
    },
    {
      id: 15,
      question: "Уурших үеийн дулаан?",
      options: ["Q = Lm", "Q = mcT", "Q = mq"],
      correct: 0,
    },
    {
      id: 16,
      question: "Хийн гүйцэтгэх ажлын томьёо?",
      options: ["A = PΔV", "A = Fs", "A = mgh"],
      correct: 0,
    },
    {
      id: 17,
      question: "Бодисын тоо хэмжээний нэгж?",
      options: ["кг", "моль", "метр"],
      correct: 1,
    },
    {
      id: 18,
      question: "Шарлийн хууль (V=const)?",
      options: ["P/T=const", "PV=const", "V/T=const"],
      correct: 0,
    },
    {
      id: 19,
      question: "Гей-Люссакийн хууль (P=const)?",
      options: ["P/T=const", "PV=const", "V/T=const"],
      correct: 2,
    },
    {
      id: 20,
      question: "Усны хувийн дулаан багтаамж ойролцоогоор?",
      options: ["4200 Ж/кг°C", "2100 Ж/кг°C", "1000 Ж/кг°C"],
      correct: 0,
    },
  ],
  energy: [
    {
      id: 1,
      question: "Кулоны хуулийн томьёо?",
      options: ["F = kqq/r²", "F = ma", "F = BIL"],
      correct: 0,
    },
    {
      id: 2,
      question: "Цахилгаан орны хүчлэг E?",
      options: ["E = U/d", "E = F/q", "Хоёул зөв"],
      correct: 2,
    },
    {
      id: 3,
      question: "Омын хууль?",
      options: ["I = U/R", "R = U/I", "U = IR", "Бүгд зөв"],
      correct: 3,
    },
    {
      id: 4,
      question: "Жоуль-Ленцийн хууль юуг тодорхойлох вэ?",
      options: ["Хүч", "Дулааны хэмжээ", "Соронзон урсгал"],
      correct: 1,
    },
    {
      id: 5,
      question: "Соронзон индукцийн нэгж?",
      options: ["Вебер", "Тесла", "Генри"],
      correct: 1,
    },
    {
      id: 6,
      question: "Амперийн хүчний томьёо?",
      options: ["F = qvB", "F = BIL sinα", "F = kqq/r2"],
      correct: 1,
    },
    {
      id: 7,
      question: "Лоренцын хүч гэж юу вэ?",
      options: [
        "Цэнэгт бөөмд үйлчлэх хүч",
        "Гүйдэлд үйлчлэх хүч",
        "Үрэлтийн хүч",
      ],
      correct: 0,
    },
    {
      id: 8,
      question: "Фарадейн хууль?",
      options: ["Ei = -ΔΦ/Δt", "Φ = BS", "L = Φ/I"],
      correct: 0,
    },
    {
      id: 9,
      question: "Цахилгаан багтаамжийн нэгж?",
      options: ["Вольт", "Фарад", "Ом"],
      correct: 1,
    },
    {
      id: 10,
      question: "Эсэргүүцлийн нэгж?",
      options: ["Ампер", "Вольт", "Ом"],
      correct: 2,
    },
    {
      id: 11,
      question: "Зэрэгцээ холболтонд аль нь ижил байх вэ?",
      options: ["Гүйдэл", "Хүчдэл", "Эсэргүүцэл"],
      correct: 1,
    },
    {
      id: 12,
      question: "Цуваа холболтонд аль нь ижил байх вэ?",
      options: ["Гүйдэл", "Хүчдэл", "Чадал"],
      correct: 0,
    },
    {
      id: 13,
      question: "Соронзон урсгалын нэгж?",
      options: ["Тесла", "Вебер", "Генри"],
      correct: 1,
    },
    {
      id: 14,
      question: "Ленцийн дүрэм юуг тодорхойлдог вэ?",
      options: ["Индукцийн гүйдлийн чиглэл", "Хүчний хэмжээ", "Цэнэгийн утга"],
      correct: 0,
    },
    {
      id: 15,
      question: "Конденсаторын энергийн томьёо?",
      options: ["W = CU²/2", "W = mgh", "W = I²Rt"],
      correct: 0,
    },
    {
      id: 16,
      question: "Диэлектрик нэвтрүүлэлт гэж юу вэ?",
      options: [
        "Орчин дахь хүч сулрах хэмжээ",
        "Цэнэгийн хурд",
        "Гүйдлийн хүч",
      ],
      correct: 0,
    },
    {
      id: 17,
      question: "Цахилгаан чадлын томьёо?",
      options: ["P = UI", "P = Fv", "P = A/t", "Бүгд зөв"],
      correct: 3,
    },
    {
      id: 18,
      question: "Гүйдлийн хүчийг юугаар хэмждэг вэ?",
      options: ["Вольтметр", "Амперметр", "Омметр"],
      correct: 1,
    },
    {
      id: 19,
      question: "Хүчдэлийг юугаар хэмждэг вэ?",
      options: ["Вольтметр", "Амперметр", "Вартметр"],
      correct: 0,
    },
    {
      id: 20,
      question: "Соронзон орон юунаас үүсдэг вэ?",
      options: ["Тайван цэнэг", "Хөдөлж буй цэнэг", "Масс"],
      correct: 1,
    },
  ],
  quantum: [
    {
      id: 1,
      question: "Планкийн квант энергийн томьёо?",
      options: ["E = mc2", "E = hf", "E = mgh"],
      correct: 1,
    },
    {
      id: 2,
      question: "Фотоэффектийн үед гарах ажил юунаас хамаарах вэ?",
      options: ["Эрчим", "Металлын төрөл", "Хугацаа"],
      correct: 1,
    },
    {
      id: 3,
      question: "Де Бройлийн долгионы урт?",
      options: ["λ = h/p", "λ = c/f", "λ = hf/c"],
      correct: 0,
    },
    {
      id: 4,
      question: "Гейзенбергийн тодорхойгүйн зарчим?",
      options: ["Масс ба Энерги", "Координат ба Импульс", "Хурд ба Хугацаа"],
      correct: 1,
    },
    {
      id: 5,
      question: "Борын атомын загварт энерги?",
      options: ["Тасралтгүй", "Квантчлагдсан", "Өөрчлөгдөхгүй"],
      correct: 1,
    },
    {
      id: 6,
      question: "Хар биеийн цацруулах чадвар температурын?",
      options: ["2 зэрэг", "3 зэрэг", "4 зэрэг"],
      correct: 2,
    },
    {
      id: 7,
      question: "Фотоны импульсийн томьёо?",
      options: ["p = h/λ", "p = mv", "p = Ft"],
      correct: 0,
    },
    {
      id: 8,
      question: "Комптон эффектийн үед долгионы урт?",
      options: ["Ихэснэ", "Багасна", "Өөрчлөхгүй"],
      correct: 0,
    },
    {
      id: 9,
      question: "Паулигийн зарчмаар ижил байж болохгүй квант тоо?",
      options: ["2", "3", "4"],
      correct: 2,
    },
    {
      id: 10,
      question: "Винийн шилжилтийн хууль λ ба T?",
      options: ["Шууд", "Урвуу", "Хамааралгүй"],
      correct: 1,
    },
    {
      id: 11,
      question: "Фотоэффектийн улаан хил гэж юу вэ?",
      options: ["Доод давтамж", "Дээд давтамж", "Өнгө"],
      correct: 0,
    },
    {
      id: 12,
      question: "Эйнштейний фотоэффектийн тэгшитгэл?",
      options: ["hf = A + Ek", "E = mc2", "hf = mc"],
      correct: 0,
    },
    {
      id: 13,
      question: "Атомын цөм юунаас тогтох вэ?",
      options: ["Протон ба Электрон", "Протон ба Нейтрон", "Зөвхөн Нейтрон"],
      correct: 1,
    },
    {
      id: 14,
      question: "Радиоидэвхт задралын хууль?",
      options: ["N = N₀e^-λt", "F = ma", "PV = nRT"],
      correct: 0,
    },
    {
      id: 15,
      question: "Альфа задралын үед ямар бөөм гардаг вэ?",
      options: ["Гелийн цөм", "Электрон", "Фотон"],
      correct: 0,
    },
    {
      id: 16,
      question: "Бета задралын үед ямар бөөм гардаг вэ?",
      options: ["Гелийн цөм", "Электрон/Позитрон", "Протон"],
      correct: 1,
    },
    {
      id: 17,
      question: "Цөмийн холбоос энергийн томьёо?",
      options: ["E = Δmc²", "E = hf", "E = mgh"],
      correct: 0,
    },
    {
      id: 18,
      question: "Хагас задралын үе гэж юу вэ?",
      options: [
        "Цөмийн тал нь задрах хугацаа",
        "Бүх цөм задрах хугацаа",
        "1 секунд",
      ],
      correct: 0,
    },
    {
      id: 19,
      question: "Гэрлийн бөөмлөг чанарыг батлах үзэгдэл?",
      options: ["Интерференц", "Фотоэффект", "Дифракц"],
      correct: 1,
    },
    {
      id: 20,
      question: "Шредингерийн тэгшитгэл юуг тодорхойлох вэ?",
      options: ["Долгионы функц", "Бөөмийн зам", "Хүч"],
      correct: 0,
    },
  ],
};
function QuizManager() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const topic = searchParams.get("topic") || "all";
  const config = topicConfigs[topic] || topicConfigs.all;

  const [questions, setQuestions] = useState([]);
  const [step, setStep] = useState(0);
  const [score, setScore] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    let sourceQuestions =
      topic === "all"
        ? Object.values(allQuestionsByTopic).flat()
        : allQuestionsByTopic[topic] || [];

    const shuffled = [...sourceQuestions].sort(() => Math.random() - 0.5);
    setQuestions(topic === "all" ? shuffled.slice(0, 10) : shuffled);
    setIsClient(true);
  }, [topic]);

  // QuizManager доторх handleAnswer функцийг ингэж шинэчил:
  const handleAnswer = (idx) => {
    const currentQ = questions[step];
    const isCorrect = idx === currentQ.correct;

    const answerData = {
      question: currentQ.question,
      selected: currentQ.options[idx],
      correct: currentQ.options[currentQ.correct],
      isCorrect,
    };

    const updatedAnswers = [...userAnswers, answerData];
    setUserAnswers(updatedAnswers);

    // Оноог шууд шинэчлэн тооцох (State async учраас v-ээр тооцно)
    const newScore = isCorrect ? score + 1 : score;
    if (isCorrect) setScore(newScore);

    setTimeout(() => {
      if (step + 1 < questions.length) {
        setStep((s) => s + 1);
      } else {
        // ЧУХАЛ: Энд чиглүүлэх замыг үр дүнгийн хуудасны замаар солино
        // Жишээ нь: /results эсвэл /resultContent
        const encodedAnswers = encodeURIComponent(
          JSON.stringify(updatedAnswers),
        );
        router.push(
          `/resultContent?type=${topic}&total=${questions.length}&score=${newScore}&answers=${encodedAnswers}`,
        );
      }
    }, 300);
  };

  if (!isClient || questions.length === 0) return null;

  return (
    <div
      className={`h-screen ${config.bg} flex flex-col overflow-hidden font-sans`}
    >
      <NavAll />
      <nav className="mt-24 px-6 max-w-[800px] mx-auto w-full">
        <div className="bg-white/80 backdrop-blur-md border border-white rounded-3xl p-3 shadow-sm flex items-center justify-between">
          <button
            onClick={() => router.back()}
            className="p-2 hover:bg-slate-100 rounded-xl transition-all"
          >
            <ChevronLeft size={20} />
          </button>
          <div className="flex items-center gap-4">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
              Асуулт {step + 1} / {questions.length}
            </span>
            <div className="w-24 h-1.5 bg-slate-100 rounded-full overflow-hidden">
              <div
                className="h-full transition-all duration-500"
                style={{
                  width: `${((step + 1) / questions.length) * 100}%`,
                  backgroundColor: config.color,
                }}
              />
            </div>
          </div>
        </div>
      </nav>

      <main className="flex-1 flex items-center justify-center p-6">
        <div className="bg-white w-full max-w-[650px] rounded-[3rem] p-8 md:p-12 shadow-xl shadow-slate-200/50 border border-slate-50">
          <div
            className="inline-block px-4 py-1.5 rounded-xl text-[9px] font-black uppercase tracking-[0.2em] mb-6"
            style={{
              backgroundColor: config.color + "15",
              color: config.color,
            }}
          >
            {config.title}
          </div>
          <h2 className="text-xl md:text-2xl font-black text-slate-800 leading-tight mb-8">
            {questions[step]?.question}
          </h2>
          <div className="grid gap-3">
            {questions[step]?.options.map((ans, idx) => (
              <button
                key={idx}
                onClick={() => handleAnswer(idx)}
                className="group w-full p-5 rounded-2xl text-left font-bold transition-all border-2 border-slate-50 bg-slate-50/40 text-slate-500 hover:border-slate-900 hover:bg-slate-900 hover:text-white active:scale-[0.97] flex items-center gap-4"
              >
                <span className="w-8 h-8 rounded-lg flex items-center justify-center text-[11px] font-black bg-white text-slate-400 group-hover:bg-white/10 group-hover:text-white">
                  {String.fromCharCode(65 + idx)}
                </span>
                {ans}
              </button>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

export default function QuizPage() {
  return (
    <Suspense>
      <QuizManager />
    </Suspense>
  );
}
