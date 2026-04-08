// src/constants/lessonsData.js

export const LESSONS_CONFIG = {
  density: {
    page: {
      title: "Нягтрал ба Архимедийн хүч",
      subtitle: "Бодисын шинж чанар, шингэн ба хийн даралт",
      videoUrl: "https://www.youtube.com/embed/ycCDX3WIqpc",
      presentationUrl:
        "https://www.canva.com/design/DAHGIyPpzPQ/Y5Mbd8QmOjeLN4dLvamhlQ/view?embed",
    },
    slider: [
      {
        image: "https://physic-dmts.vercel.app/pre1.png",
        alt: "Density Concept",
      },
    ],
    experiments: [
      {
        title: "Нягтралын лаборатори",
        href: "https://phet.colorado.edu/sims/html/density/latest/density_all.html",
        img: "https://phet.colorado.edu/sims/html/density/latest/density-600.png",
      },
      {
        title: "Буянтын хүч (Хөвөх)",
        href: "https://phet.colorado.edu/sims/html/buoyancy/latest/buoyancy_all.html",
        img: "https://phet.colorado.edu/sims/html/buoyancy/latest/buoyancy-600.png",
      },
      {
        title: "Шингэний даралт",
        href: "https://phet.colorado.edu/sims/html/under-pressure/latest/under-pressure_all.html",
        img: "https://phet.colorado.edu/sims/html/under-pressure/latest/under-pressure-600.png",
      },
    ],
    theory: [
      {
        title: "Нягтрал",
        content: [
          "Бодисын нэгж эзлэхүүнд ногдох массын хэмжээ.",
          "Томьёо: ρ = m / V",
        ],
      },
      {
        title: "Үндсэн нэгж",
        content: [
          "СИ систем дэх нэгж нь кг/м³.",
          "Усны нягтрал 1000 кг/м³ байдаг.",
        ],
      },
      {
        title: "Архимедийн хүч",
        content: ["Шингэн доторх биеийг дээш түлхэх хүч.", "Fₐ = ρш · g · Vш"],
      },
      {
        title: "Хөвөх нөхцөл",
        content: [
          "Биеийн нягтрал шингэнийхээс бага бол хөвнө.",
          "ρбие < ρшингэн",
        ],
      },
      {
        title: "Живэх нөхцөл",
        content: [
          "Биеийн нягтрал шингэнийхээс их бол живнэ.",
          "ρбие > ρшингэн",
        ],
      },
      {
        title: "Даралт",
        content: ["Шингэний гүнээс хамаарч даралт ихэснэ.", "P = ρ · g · h"],
      },
      {
        title: "Температурын нөлөө",
        content: ["Бие халахад эзлэхүүн тэлж, нягтрал багасна."],
      },
    ],
    tests: [
      {
        question: "Нягтралын томьёо аль нь вэ?",
        options: ["m/V", "V/m", "m·V"],
        answer: "m/V",
      },
      {
        question: "Архимедийн хүч хаашаа чиглэх вэ?",
        options: ["Доошоо", "Хажуу тийш", "Дээшээ"],
        answer: "Дээшээ",
      },
      {
        question: "Усны нягтрал хэд вэ?",
        options: ["100 кг/м³", "1000 кг/м³", "10000 кг/м³"],
        answer: "1000 кг/м³",
      },
      {
        question: "Бие хэзээ живэх вэ?",
        options: ["ρб < ρш", "ρб > ρш", "ρб = ρш"],
        answer: "ρб > ρш",
      },
      {
        question: "Нягтралын нэгж юу вэ?",
        options: ["кг/м", "кг/м³", "м³/кг"],
        answer: "кг/м³",
      },
    ],
    cards: [
      { question: "ρ тэмдэглэгээний нэр?", answer: "Ро (Нягтрал)" },
      { question: "1 г/см³ = ? кг/м³", answer: "1000 кг/м³" },
      { question: "Архимедийн хүчний томьёо?", answer: "Fₐ = ρgV" },
      {
        question: "Хаймсан бие усанд яах вэ?",
        answer: "Хөвнө (Нягтрал бага тул)",
      },
      { question: "Даралтын томьёо?", answer: "P = ρgh" },
    ],
  },

  diffusion: {
    page: {
      title: "Диффуз",
      subtitle: "Молекул кинетик онол",
      videoUrl: "https://www.youtube.com/embed/c_IYK8sy0QA",
      presentationUrl:
        "https://www.canva.com/design/DAHGJOehh6Q/hUrudrDgDzG79tvSB0805Q/view?embed",
    },
    slider: [
      { image: "https://physic-dmts.vercel.app/pre1.png", alt: "Diffusion" },
    ],
    experiments: [
      {
        title: "Диффуз",
        href: "https://phet.colorado.edu/sims/html/diffusion/latest/diffusion_all.html",
        img: "https://phet.colorado.edu/sims/html/diffusion/latest/diffusion-420.png",
      },
      {
        title: "Хийн танилцуулга",
        href: "https://phet.colorado.edu/sims/html/gases-intro/latest/gases-intro_all.html",
        img: "https://phet.colorado.edu/sims/html/gases-intro/latest/gases-intro-420.png",
      },
      {
        title: "Хийн шинж чанар",
        href: "https://phet.colorado.edu/sims/html/gas-properties/latest/gas-properties_all.html",
        img: "https://phet.colorado.edu/sims/html/gas-properties/latest/gas-properties-420.png",
      },
    ],
    theory: [
      {
        title: "Диффуз",
        content: ["Молекулууд өөрөө аяндаа холилдох үзэгдэл."],
      },
      {
        title: "Броуны хөдөлгөөн",
        content: ["Жижиг хэсгүүдийн замбараагүй хөдөлгөөн."],
      },
      {
        title: "Температур",
        content: ["Халуун үед диффуз илүү хурдан явагдана."],
      },
      { title: "Хий", content: ["Хий дотор диффуз хамгийн хурдан явагддаг."] },
      { title: "Шингэн", content: ["Шингэнд дунд зэргийн хурдтай явагдана."] },
      {
        title: "Хатуу бие",
        content: ["Хатуу биед маш удаан, олон жилээр явагдана."],
      },
      {
        title: "МКО",
        content: ["Бүх бодис молекулаас тогтох ба зогсолтгүй хөдөлнө."],
      },
    ],
    tests: [
      {
        question: "Диффуз хаана хамгийн хурдан бэ?",
        options: ["Хий", "Шингэн", "Хатуу"],
        answer: "Хий",
      },
      {
        question: "Температур нэмэгдэхэд диффуз яах вэ?",
        options: ["Удааширна", "Хурдасна", "Өөрчлөгдөхгүй"],
        answer: "Хурдасна",
      },
      {
        question: "Молекул байгааг батлах баримт?",
        options: ["Дифракци", "Броуны хөдөлгөөн", "Цуурай"],
        answer: "Броуны хөдөлгөөн",
      },
      {
        question: "Диффуз гэж юу вэ?",
        options: ["Холилдох", "Царцах", "Хайлах"],
        answer: "Холилдох",
      },
      {
        question: "Хүйтэн усанд сахар яаж уусах вэ?",
        options: ["Хурдан", "Удаан", "Уусахгүй"],
        answer: "Удаан",
      },
    ],
    cards: [
      {
        question: "Диффуз хаана явагдахгүй вэ?",
        answer: "Вакуумд (Молекул байхгүй тул)",
      },
      {
        question: "Броуны хөдөлгөөн юунд явагдах вэ?",
        answer: "Шингэн ба хий",
      },
      { question: "МКО гэж юу вэ?", answer: "Молекул Кинетик Онол" },
      {
        question: "Диффуз бодисын солилцоонд хэрэгтэй юу?",
        answer: "Тийм (Хүчилтөрөгч дамжуулах)",
      },
      { question: "Молекул зогсох уу?", answer: "Үгүй (Зогсолтгүй хөдөлнө)" },
    ],
  },

  laser: {
    page: {
      title: "Лазер",
      subtitle: "Квант физик ба Оптик",
      videoUrl: "https://www.youtube.com/embed/y3SBSbsdiYg",
      presentationUrl:
        "https://www.canva.com/design/DAHGJGMJyQA/kXoZvS4NptAGGf2WM-cyjQ/view?embed",
    },
    slider: [
      {
        image: "https://physic-dmts.vercel.app/laser_structure.png",
        alt: "Laser",
      },
    ],
    experiments: [
      {
        title: "Гэрлийн хугарал",
        href: "https://phet.colorado.edu/sims/html/bending-light/latest/bending-light_all.html",
        img: "https://phet.colorado.edu/sims/html/bending-light/latest/bending-light-600.png",
      },
      {
        title: "Лазерын лаборатори",
        href: "https://phet.colorado.edu/sims/html/lasers/latest/lasers_all.html",
        img: "https://phet.colorado.edu/sims/photoelectric/photoelectric-420.png",
      },
      {
        title: "Фото эффект",
        href: "https://phet.colorado.edu/sims/html/photoelectric-effect/latest/photoelectric-effect_all.html",
        img: "https://phet.colorado.edu/sims/html/isotopes-and-atomic-mass/latest/isotopes-and-atomic-mass-420.png",
      },
    ],
    theory: [
      {
        title: "LASER",
        content: ["Light Amplification by Stimulated Emission of Radiation."],
      },
      {
        title: "Албадмал цацаргалт",
        content: ["Фотоны нөлөөгөөр ижил шинжтэй фотон үүсэх."],
      },
      {
        title: "Монохромат",
        content: ["Зөвхөн нэг долгионы урттай (нэг өнгө) байх."],
      },
      {
        title: "Когерент",
        content: ["Бүх долгион ижил фазтай, синхрон хөдлөх."],
      },
      {
        title: "Нарийн чиглэлт",
        content: ["Сарнилтгүйгээр шулуун тарах чадвар."],
      },
      {
        title: "Популяцийн урвуу байрлал",
        content: ["Өдөөгдсөн электрон суурь электроноос олон байх."],
      },
      {
        title: "Резонатор",
        content: ["Хоёр талдаа толиноос бүрдэх гэрэл хүчжүүлэгч."],
      },
    ],
    tests: [
      {
        question: "LASER гэж юу вэ?",
        options: ["Цацаргалт", "Хүчжүүлсэн гэрэл", "Дулаан"],
        answer: "Хүчжүүлсэн гэрэл",
      },
      {
        question: "Лазерын гол шинж?",
        options: ["Сарнилт их", "Олон өнгө", "Монохромат"],
        answer: "Монохромат",
      },
      {
        question: "Лазер дотор юу байдаг вэ?",
        options: ["Толь", "Ус", "Утас"],
        answer: "Толь",
      },
      {
        question: "Лазерын өнгө юунаас хамаарах вэ?",
        options: ["Тогтоогч", "Долгионы урт", "Зай"],
        answer: "Долгионы урт",
      },
      {
        question: "Хамгийн аюултай нь юу вэ?",
        options: ["Гэрэл", "Нүд рүү тусах", "Өнгө"],
        answer: "Нүд рүү тусах",
      },
    ],
    cards: [
      {
        question: "Албадмал цацаргалт гэж юу вэ?",
        answer: "Гаднаас өдөөгдсөн цацаргалт",
      },
      { question: "Когерент чанар?", answer: "Долгионууд нэгэн зэрэг хөдлөх" },
      {
        question: "Лазерыг хаана ашиглах вэ?",
        answer: "Мэс засал, Холбоо, Үйлдвэр",
      },
      {
        question: "Энгийн гэрэл лазер мөн үү?",
        answer: "Үгүй (Сарнилт их тул)",
      },
      { question: "Резонатор гэж юу вэ?", answer: "Гэрэл ойлгох толь" },
    ],
  },
};
