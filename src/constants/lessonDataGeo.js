// src/constants/lessonDataGeo.js

export const GEOGRAPHY_CONFIG = {
  // 1. ДЭЛХИЙН АМЬДРАЛЫН ТАРХАЛТ
  eh_gazar: {
    page: {
      title: "Дэлхийн амьдралын тархалт",
      subtitle: "Биосфер, байгалийн бүс бүслүүр, экосистемийн олон янз байдал",
      videoUrl: "https://www.youtube.com/embed/hVmqWbaVp38",
      presentationUrl:
        "https://www.canva.com/design/DAHGKWbmIA8/P6ZQf3MIbg8IJrqPdJ5Rrg/view?embed",
    },
    slider: [
      {
        image:
          "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800",
        alt: "Nature 1",
      },
    ],
    experiments: [
      {
        title: "Экосистемийн тэнцвэр",
        href: "https://phet.colorado.edu/sims/html/natural-selection/latest/natural-selection_all.html",
        img: "https://phet.colorado.edu/sims/html/natural-selection/latest/natural-selection-600.png",
      },
      {
        title: "Нүүрстөрөгчийн эргэлт",
        href: "https://phet.colorado.edu/sims/html/greenhouse-effect/latest/greenhouse-effect_all.html",
        img: "https://phet.colorado.edu/sims/html/greenhouse-effect/latest/greenhouse-effect-600.png",
      },
      {
        title: "Ген илрэх зарчим",
        href: "https://phet.colorado.edu/sims/html/gene-expression-essentials/latest/gene-expression-essentials_all.html",
        img: "https://phet.colorado.edu/sims/html/gene-expression-essentials/latest/gene-expression-essentials-600.png",
      },
    ],
    theory: [
      {
        title: "Биосфер буюу Шим мандал",
        content: [
          "Амьд бие оршин тогтнож буй дэлхийн бүрхэвчийг шим мандал гэнэ.",
          "Агаар мандалд 20-25 км, усан мандалд 11 км хүртэл тархсан.",
        ],
      },
      {
        title: "Тархалтад нөлөөлөх хүчин зүйл",
        content: [
          "Дулаан ба чийгний харьцаа нь амьдралын тархалтыг тодорхойлогч гол хүчин зүйл юм.",
        ],
      },
      {
        title: "Хэвтээ бүсшил",
        content: [
          "Уур амьсгал, хөрс, ургамлаараа ижил газар нутгийг байгалийн бүс гэнэ.",
        ],
      },
      {
        title: "Уулын босоо бүслүүр",
        content: [
          "Өндөр ууланд дээшлэх тусам температур буурч, байгалийн бүсүүд босоо чиглэлд солигддог.",
        ],
      },
      {
        title: "Далай тэнгисийн амьдрал",
        content: ["Далайн амьдралыг Планктон, Нектон, Бентос гэж 3 ангилдаг."],
      },
      {
        title: "Идэш тэжээлийн хэлхээ",
        content: [
          "Үйлдвэрлэгчид, хэрэглэгчид, задлагчид гэсэн 3 үндсэн хэсгээс бүрдэнэ.",
        ],
      },
      {
        title: "Биологийн олон янз байдал",
        content: [
          "Дэлхийн экологийн тэнцвэрт байдлыг хадгалахын тулд төрөл зүйлийг хамгаалах шаардлагатай.",
        ],
      },
    ],
    tests: [
      {
        question: "Амьдрал агаар мандалд хэдэн км хүртэл тархсан бэ?",
        options: ["5-10 км", "20-25 км", "50-60 км"],
        answer: "20-25 км",
      },
      {
        question: "Урсгалаар идэвхгүй шилжин явагч амьд биес?",
        options: ["Нектон", "Бентос", "Планктон"],
        answer: "Планктон",
      },
      {
        question: "Байгалийн бүсүүд өндөр ууланд солигдох үзэгдэл?",
        options: ["Хэвтээ бүсшил", "Босоо бүслүүр", "Уур амьсгал"],
        answer: "Босоо бүслүүр",
      },
      {
        question: "Экосистемийн 'Үйлдвэрлэгчид' аль нь вэ?",
        options: ["Ургамал", "Амьтан", "Мөөгөнцөр"],
        answer: "Ургамал",
      },
      {
        question: "Биосфер нь ямар мандлуудын уулзвар дээр орших вэ?",
        options: [
          "Зөвхөн ус ба агаар",
          "Агаар, ус, чулуун мандал",
          "Зөвхөн хөрс",
        ],
        answer: "Агаар, ус, чулуун мандал",
      },
    ],
    cards: [
      {
        question: "Шим мандал гэж юу вэ?",
        answer: "Амьд биес оршин тогтнож буй дэлхийн бүрхэвч",
      },
      {
        question: "Нектон гэж юу вэ?",
        answer: "Далайн усанд идэвхтэй сэлэгч амьтад (загас, халим)",
      },
      { question: "Бентос гэж юу вэ?", answer: "Далайн ёроолын амьд биес" },
      {
        question: "Экологийн пирамидын 10%-ийн хууль?",
        answer: "Эрчим хүчний 10% нь л дараагийн шатанд дамжих",
      },
      {
        question: "Экваторын чийглэг ойн онцлог?",
        answer: "Дэлхийн хамгийн баялаг төрөл зүйлтэй бүс",
      },
    ],
  },

  // 2. УСАН МАНДАЛ
  uur_amisgal: {
    page: {
      title: "Усан мандал",
      subtitle: "Дэлхийн усны нөөц, далай тэнгис, гол мөрөн ба усны эргэлт",
      videoUrl: "https://www.youtube.com/embed/f2G_fE7z_rI",
      presentationUrl:
        "https://www.canva.com/design/DAHGKRg06Xw/1z_yeav7ZdrBFnG3rZZWvw/view?embed",
    },
    slider: [
      {
        image:
          "https://images.unsplash.com/photo-1505118380757-91f5f45d8de4?w=800",
        alt: "Water",
      },
    ],
    experiments: [
      {
        title: "Усны эргэлт",
        href: "https://phet.colorado.edu/sims/html/states-of-matter/latest/states-of-matter_all.html",
        img: "https://phet.colorado.edu/sims/html/states-of-matter/latest/states-of-matter-600.png",
      },
      {
        title: "Далайн урсгал",
        href: "https://phet.colorado.edu/sims/html/density/latest/density_all.html",
        img: "https://phet.colorado.edu/sims/html/density/latest/density-600.png",
      },
      {
        title: "Усны бохирдол",
        href: "https://phet.colorado.edu/sims/html/molarity/latest/molarity_all.html",
        img: "https://phet.colorado.edu/sims/html/molarity/latest/molarity-600.png",
      },
    ],
    theory: [
      {
        title: "Усан мандал",
        content: ["Дэлхийн гадаргын 71%-ийг эзэлдэг бүх усны нэгдэл."],
      },
      {
        title: "Цэнгэг усны нөөц",
        content: [
          "Нийт усны ердөө 2.5% нь цэнгэг ус бөгөөд дийлэнх нь мөсөн голд бий.",
        ],
      },
      {
        title: "Усны их эргэлт",
        content: [
          "Далай болон эх газраас ус ууршиж, тунадас болон эргэж буух тасралтгүй процесс.",
        ],
      },
      {
        title: "Далайн давсжилт",
        content: [
          "Дундаж давсжилт 35‰. Хамгийн их давсжилттай нь Улаан тэнгис.",
        ],
      },
      {
        title: "Далайн урсгал",
        content: [
          "Усыг хол зайд зөөх хөдөлгөөн. Дулаан ба хүйтэн гэж ангилна.",
        ],
      },
      {
        title: "Эх газрын ус",
        content: ["Гол мөрөн, нуур, мөсөн гол, газар доорх ус хамаарна."],
      },
      {
        title: "Мөсөн голын ач холбогдол",
        content: [
          "Цэнгэг усны хамгийн том нөөц бөгөөд уур амьсгалыг зохицуулагч.",
        ],
      },
    ],
    tests: [
      {
        question: "Дэлхийн гадаргын хэдэн хувийг ус эзэлдэг вэ?",
        options: ["50%", "71%", "29%"],
        answer: "71%",
      },
      {
        question: "Цэнгэг усны хамгийн их нөөц хаана хадгалагддаг вэ?",
        options: ["Гол мөрөн", "Мөсөн гол", "Нуур"],
        answer: "Мөсөн гол",
      },
      {
        question: "Далайн усны дундаж давсжилт хэд вэ?",
        options: ["15‰", "35‰", "45‰"],
        answer: "35‰",
      },
      {
        question: "Ууршилт конденсац болох үзэгдлийг юу гэх вэ?",
        options: ["Усны эргэлт", "Далайн урсгал", "Түрлэг"],
        answer: "Усны эргэлт",
      },
      {
        question: "Хамгийн том далай аль нь вэ?",
        options: ["Атлант", "Энэтхэг", "Номхон"],
        answer: "Номхон",
      },
    ],
    cards: [
      {
        question: "Промиль (‰) гэж юу вэ?",
        answer: "1 литр усанд агуулагдах давсны хэмжээ (грамм)",
      },
      {
        question: "Шелф гэж юу вэ?",
        answer: "0-200м гүнтэй далайн эргийн хэсэг",
      },
      {
        question: "Цутгал гол гэж юу вэ?",
        answer: "Гол голдоо нэгдэж буй жижиг голууд",
      },
      {
        question: "Рашаан гэж юу вэ?",
        answer: "Эрдэс бодис, хий агуулсан эмчилгээний ус",
      },
      {
        question: "Усны эргэлтийн хөдөлгөгч хүч?",
        answer: "Нарны энерги ба дэлхийн татах хүч",
      },
    ],
  },

  // 3. ХҮН АМ БА СУУРЬШИЛ
  hun_am: {
    page: {
      title: "Дэлхийн хүн ам ба Суурьшил",
      subtitle: "Хүн амын өсөлт, нягтшил, хотжилт, миграци",
      videoUrl: "https://www.youtube.com/embed/2IMfnXlD1O4",
      presentationUrl:
        "https://www.canva.com/design/DAHGKb5Q5HA/5W59YeGurBeasZeWOMV3WQ/view?embed",
    },
    slider: [
      {
        image:
          "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800",
        alt: "City",
      },
    ],
    experiments: [
      {
        title: "Хүн амын өсөлт",
        href: "https://phet.colorado.edu/sims/html/natural-selection/latest/natural-selection_all.html",
        img: "https://phet.colorado.edu/sims/html/natural-selection/latest/natural-selection-600.png",
      },
      {
        title: "Суурьшлын талбай",
        href: "https://phet.colorado.edu/sims/html/area-builder/latest/area-builder_all.html",
        img: "https://phet.colorado.edu/sims/html/area-builder/latest/area-builder-600.png",
      },
      {
        title: "Нөөцийн хуваарилалт",
        href: "https://phet.colorado.edu/sims/html/balancing-act/latest/balancing-act_all.html",
        img: "https://phet.colorado.edu/sims/html/balancing-act/latest/balancing-act-600.png",
      },
    ],
    theory: [
      {
        title: "Хүн амын тархалт",
        content: ["Дэлхийн хүн амын 90% нь Хойд хагас бөмбөрцөгт амьдардаг."],
      },
      {
        title: "Хүн амын нягтшил",
        content: ["Нэг км² талбайд ногдох хүний тоо. Монголд 1.9 хүн/км²."],
      },
      {
        title: "Нөхөн үржихүй",
        content: [
          "Төрөлт ба нас баралтын зөрүүгээр тодорхойлогдох ердийн өсөлт.",
        ],
      },
      {
        title: "Хотжилт",
        content: [
          "Хотын хүн амын тоо өсөж, хотын амьдралын хэв маяг дэлгэрэх процесс.",
        ],
      },
      {
        title: "Миграци",
        content: ["Хүмүүс амьдрах газраа өөрчлөн шилжих хөдөлгөөн."],
      },
      {
        title: "Хүн амын бүтэц",
        content: [
          "Нас, хүйсний суварга ашиглан хүн амын төлөв байдлыг тодорхойлно.",
        ],
      },
      {
        title: "Арьстан ба Үндэстэн",
        content: ["Европжуу, Монголжуу, Негржүү гэсэн 3 үндсэн арьстан бий."],
      },
    ],
    tests: [
      {
        question: "Дэлхийн хамгийн бага нягтшилтай улс?",
        options: ["Бразил", "Монгол", "Хятад"],
        answer: "Монгол",
      },
      {
        question: "Төрөлт - Нас баралт = ?",
        options: ["Мегаполис", "Ердийн өсөлт", "Миграци"],
        answer: "Ердийн өсөлт",
      },
      {
        question: "Хотын хүн амын эзлэх хувь нэмэгдэхийг юу гэх вэ?",
        options: ["Хотжилт", "Суурьшил", "Төвлөрөл"],
        answer: "Хотжилт",
      },
      {
        question: "Хүн амын 90% нь аль хагас бөмбөрцөгт байдаг вэ?",
        options: ["Өмнөд", "Хойд", "Зүүн"],
        answer: "Хойд",
      },
      {
        question: "Ажиллах хүчний насны муж?",
        options: ["0-14", "15-64", "65+"],
        answer: "15-64",
      },
    ],
    cards: [
      {
        question: "Мегаполис гэж юу вэ?",
        answer: "Олон том хотууд нэгдэж үүссэн асар том суурьшил",
      },
      {
        question: "Демографийн тэсрэлт?",
        answer: "Хөгжиж буй орнуудад төрөлт маш хурдацтай өсөх үзэгдэл",
      },
      {
        question: "Миграцийн түлхэх хүчин зүйл?",
        answer: "Дайн, ажилгүйдэл, ядуурал",
      },
      {
        question: "Миграцийн татах хүчин зүйл?",
        answer: "Өндөр цалин, аюулгүй байдал, боловсрол",
      },
      {
        question: "Хүн амын суварга (пирамид)?",
        answer: "Нас, хүйсний бүтцийг харуулсан график",
      },
    ],
  },
};
