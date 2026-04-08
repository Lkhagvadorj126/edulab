// src/constants/lessonsDataP.js

export const PHYSICS_CONFIG = {
  motion: {
    page: {
      title: "Уурших ба хайлах",
      subtitle: "Бодисын төлөвийн өөрчлөлт, дулааны үзэгдэл",
      videoUrl: "https://www.youtube.com/embed/G6jWl_vAAsU",
      presentationUrl:
        "https://www.canva.com/design/DAHGIf043Zs/hTaf7hEG76WgVrnnJ3XhWw/view?embed",
    },
    slider: [
      {
        image: "https://physic-dmts.vercel.app/pre1.png",
        alt: "Heat and States of Matter",
      },
    ],
    experiments: [
      {
        title: "Бодисын төлөв",
        href: "https://phet.colorado.edu/sims/html/states-of-matter-basics/latest/states-of-matter-basics_all.html",
        img: "https://phet.colorado.edu/sims/html/states-of-matter-basics/latest/states-of-matter-basics-600.png",
      },
      {
        title: "Дулааны энерги",
        href: "https://phet.colorado.edu/sims/html/energy-forms-and-changes/latest/energy-forms-and-changes_all.html",
        img: "https://phet.colorado.edu/sims/html/energy-forms-and-changes/latest/energy-forms-and-changes-600.png",
      },
      {
        title: "Хийн шинж чанар",
        href: "https://phet.colorado.edu/sims/html/gas-properties/latest/gas-properties_all.html",
        img: "https://phet.colorado.edu/sims/html/gas-properties/latest/gas-properties-600.png",
      },
    ],
    theory: [
      {
        title: "Бодисын төлөв шилжих",
        content: [
          "Бодис нэг төлөвөөс нөгөө төлөвт шилжих үзэгдлийг төлөвийн шилжилт гэнэ.",
          "Хайлах, уурших, царцах, конденсацлах зэрэг нь үүнд хамаарна.",
        ],
      },
      {
        title: "Хайлах үзэгдэл",
        content: [
          "Бодис хатуу төлөвөөс шингэн төлөвт шилжих процесс.",
          "Хайлах үед бодис гаднаас дулаан шингээдэг.",
          "Томьёо: Q = λ * m.",
        ],
      },
      {
        title: "Уурших үзэгдэл",
        content: [
          "Бодис шингэн төлөвөөс хийн төлөвт шилжих процесс.",
          "Ууршилт нь шингэний гадаргуу дээр ямар ч температурт явагдана.",
          "Томьёо: Q = L * m.",
        ],
      },
      {
        title: "Буцлах үзэгдэл",
        content: [
          "Шингэний бүх эзэлхүүн дотор явагдах эрчимтэй ууршилт.",
          "Тодорхой тогтмол температурт (буцлах температур) явагддаг.",
        ],
      },
      {
        title: "Дулааны тоо хэмжээ",
        content: [
          "Биеийг халаах эсвэл хөргөхөд авсан буюу алдсан энерги.",
          "Томьёо: Q = c * m * Δt.",
        ],
      },
      {
        title: "Дотоод энерги",
        content: [
          "Биеийг бүрдүүлэгч молекулуудын хөдөлгөөний ба харилцан үйлчлэлийн энерги.",
        ],
      },
      {
        title: "Энерги хадгалагдах хууль",
        content: [
          "Дулааны тэнцвэрийн үед: Авсан дулаан = Алдсан дулаан (Q_авсан = Q_алдсан).",
        ],
      },
    ],
    tests: [
      {
        question:
          "Бодис хатуу төлөвөөс шингэн төлөвт шилжих процессыг юу гэх вэ?",
        options: ["Уурших", "Хайлах", "Царцах"],
        answer: "Хайлах",
      },
      {
        question:
          "Шингэний бүх эзэлхүүн дотор явагдах эрчимтэй ууршилтыг юу гэх вэ?",
        options: ["Буцлах", "Конденсацлах", "Хайлах"],
        answer: "Буцлах",
      },
      {
        question: "Хайлах үзэгдлийн үед бодис дулааныг яадаг вэ?",
        options: ["Дулаан алддаг", "Дулаан шингээдэг", "Өөрчлөгддөггүй"],
        answer: "Дулаан шингээдэг",
      },
      {
        question: "Ууршилтын дулааны тоо хэмжээг олох зөв томьёо?",
        options: ["Q = λ * m", "Q = c * m * Δt", "Q = L * m"],
        answer: "Q = L * m",
      },
      {
        question: "Дулааны тэнцвэрийн үед авсан ба алдсан дулааны хамаарал?",
        options: [
          "Q_авсан > Q_алдсан",
          "Q_авсан = Q_алдсан",
          "Q_авсан < Q_алдсан",
        ],
        answer: "Q_авсан = Q_алдсан",
      },
    ],
    cards: [
      { question: "Хайлахын хувийн дулааны томьёо?", answer: "Q = λ * m" },
      { question: "Ууршихын хувийн дулааны томьёо?", answer: "Q = L * m" },
      {
        question: "Дулааны тоо хэмжээний үндсэн томьёо?",
        answer: "Q = c * m * Δt",
      },
      {
        question: "Конденсацлах гэж юу вэ?",
        answer: "Хийн төлөвөөс шингэн төлөвт шилжих процесс",
      },
      {
        question: "Дотоод энерги юунаас тогтох вэ?",
        answer: "Молекулуудын хөдөлгөөний ба харилцан үйлчлэлийн энерги",
      },
    ],
  },

  sound: {
    page: {
      title: "Дуу ба Долгион",
      subtitle: "Механик долгион, акустик",
      videoUrl: "https://www.youtube.com/embed/S_S78v-uMtc",
      presentationUrl:
        "https://www.canva.com/design/DAHGIVvUU6k/TM_r2hhKFHbjPlUza8Br-g/view?embed",
    },
    slider: [
      { image: "https://physic-dmts.vercel.app/pre1.png", alt: "Sound Wave" },
    ],
    experiments: [
      {
        title: "Дууны долгион",
        href: "https://phet.colorado.edu/sims/html/waves-intro/latest/waves-intro_all.html",
        img: "https://phet.colorado.edu/sims/html/waves-intro/latest/waves-intro-600.png",
      },
      {
        title: "Интерференц",
        href: "https://phet.colorado.edu/sims/html/wave-interference/latest/wave-interference_all.html",
        img: "https://phet.colorado.edu/sims/html/wave-interference/latest/wave-interference-600.png",
      },
      {
        title: "Дууны хурд",
        href: "https://phet.colorado.edu/sims/html/sound/latest/sound_all.html",
        img: "https://phet.colorado.edu/sims/html/sound/latest/sound-600.png",
      },
    ],
    theory: [
      {
        title: "Механик долгион",
        content: [
          "Харимхай орчинд тархах хэлбэлзлийг долгион гэнэ.",
          "Долгион нь бодисыг зөөхгүй, энергийг дамжуулдаг.",
        ],
      },
      {
        title: "Долгионы урт",
        content: ["Ижил фазтай хоёр цэгийн хоорондох зай.", "Тэмдэглэгээ: λ."],
      },
      {
        title: "Давтамж",
        content: ["1 секундэд хийх хэлбэлзлийн тоо.", "Нэгж: Гц."],
      },
      {
        title: "Дууны долгион",
        content: ["16-20,000 Гц-ийн механик долгион.", "Вакуумд тарахгүй."],
      },
      { title: "Дууны хурд", content: ["Орчноос хамаарна. Агаарт ~340 м/с."] },
      { title: "Инфразвук", content: ["16 Гц-ээс бага давтамжтай дуу."] },
      { title: "Ультразвук", content: ["20,000 Гц-ээс их давтамжтай дуу."] },
    ],
    tests: [
      {
        question: "Хүний чих сонсох боломжтой муж?",
        options: ["16 Гц-ээс бага", "16-20,000 Гц", "20,000 Гц+"],
        answer: "16-20,000 Гц",
      },
      {
        question: "Дууны долгион хаана тарахгүй вэ?",
        options: ["Ус", "Ган", "Вакуум"],
        answer: "Вакуум",
      },
      {
        question: "Дууны өндөр юунаас хамаарах вэ?",
        options: ["Давтамж", "Далайц", "Хурд"],
        answer: "Давтамж",
      },
      {
        question: "Дууны хурд агаарт хэд вэ?",
        options: ["340 м/с", "1500 м/с", "5000 м/с"],
        answer: "340 м/с",
      },
      {
        question: "Ойсон дууг юу гэдэг вэ?",
        options: ["Интерференц", "Цуурай", "Дифракци"],
        answer: "Цуурай",
      },
    ],
    cards: [
      {
        question: "Долгионы урт гэж юу вэ?",
        answer: "Ижил фазтай хоёр цэгийн зай",
      },
      { question: "Дууны хурд усанд хэд вэ?", answer: "~1500 м/с" },
      { question: "Цуурай ашиглан зай олох?", answer: "S = v * t / 2" },
      { question: "Дууны хүч юунаас хамаарах вэ?", answer: "Далайцаас" },
      { question: "Ультразвук давтамж?", answer: "20,000 Гц-ээс их" },
    ],
  },

  heat: {
    page: {
      title: "Орбитын хөдөлгөөн",
      subtitle: "Тэнгэрийн механик ба Гравитаци",
      videoUrl: "https://www.youtube.com/embed/unWGVH9N_pY",
      presentationUrl:
        "https://www.canva.com/design/DAHGIWhAs6Y/2eyP2p65gZCV4MZ4uaDV_w/view?embed",
    },
    slider: [
      { image: "https://physic-dmts.vercel.app/orbit1.png", alt: "Orbit" },
    ],
    experiments: [
      {
        title: "Орбитын лаборатори",
        href: "https://phet.colorado.edu/sims/html/gravity-and-orbits/latest/gravity-and-orbits_all.html",
        img: "https://phet.colorado.edu/sims/html/gravity-and-orbits/latest/gravity-and-orbits-600.png",
      },
      {
        title: "Гравитацийн хүч",
        href: "https://phet.colorado.edu/sims/html/gravity-force-lab-basics/latest/gravity-force-lab-basics_all.html",
        img: "https://phet.colorado.edu/sims/html/gravity-force-lab-basics/latest/gravity-force-lab-basics-600.png",
      },
      {
        title: "Төвд тэмүүлэх хүч",
        href: "https://phet.colorado.edu/sims/html/forces-and-motion-basics/latest/forces-and-motion-basics_all.html",
        img: "https://phet.colorado.edu/sims/html/forces-and-motion-basics/latest/forces-and-motion-basics-600.png",
      },
    ],
    theory: [
      {
        title: "Таталцлын хууль",
        content: [
          "Масстай биес биеэ татна.",
          "Томьёо: F = G * (m1 * m2) / r².",
        ],
      },
      {
        title: "Кеплерийн 1-р хууль",
        content: ["Гаригууд Нарыг эллипс орбитоор тойрно."],
      },
      {
        title: "Кеплерийн 2-р хууль",
        content: ["Ижил хугацаанд ижил талбай зураглана."],
      },
      { title: "Кеплерийн 3-р хууль", content: ["T² / a³ = const."] },
      { title: "Орбитын хурд", content: ["v = sqrt(G * M / r)."] },
      { title: "Төвд тэмүүлэх хурдатгал", content: ["a = v² / r."] },
      {
        title: "Жингүйдэл",
        content: ["Зөвхөн таталцлын хүчний нөлөөнд байх төлөв."],
      },
    ],
    tests: [
      {
        question: "Гаригийн зам юу вэ?",
        options: ["Тойрог", "Эллипс", "Шулуун"],
        answer: "Эллипс",
      },
      {
        question: "Таталцлын хууль?",
        options: ["F=ma", "F=G*m1m2/r²", "F=kx"],
        answer: "F=G*m1m2/r²",
      },
      {
        question: "Кеплерийн 3-р хууль?",
        options: ["T/a", "T²/a³", "T³/a²"],
        answer: "T²/a³",
      },
      {
        question: "Орбитын хурдны томьёо?",
        options: ["sqrt(GM/r)", "GM/r", "GM²/r"],
        answer: "sqrt(GM/r)",
      },
      {
        question: "Унах төлөв юу вэ?",
        options: ["Инерци", "Жингүйдэл", "Тэнцвэр"],
        answer: "Жингүйдэл",
      },
    ],
    cards: [
      { question: "Кеплерийн 1-р хууль?", answer: "Эллипс орбитоор тойрно" },
      { question: "Хурдатгалын томьёо?", answer: "a = v² / r" },
      { question: "G-ийн утга?", answer: "6.67 * 10^-11" },
      { question: "Орбитын хурд ба зай?", answer: "Урвуу хамааралтай" },
      { question: "Кеплерийн 2-р хууль?", answer: "Талбай зураглах хууль" },
    ],
  },
};
