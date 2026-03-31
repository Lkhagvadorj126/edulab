// src/constants/lessonsData.js

export const LESSONS_CONFIG = {
  molecular: {
    page: {
      title: "Молекулын туйлшрал",
      subtitle: "Физикийн цахим хичээл",
      videoUrl: "https://www.youtube.com/embed/PVL24HAesnc",
    },
    slider: [
      {
        image: "https://physic-dmts.vercel.app/laser1.png",
        alt: "Molecular 1",
      },
      {
        image: "https://physic-dmts.vercel.app/laser2.png",
        alt: "Molecular 2",
      },
    ],
    experiments: [
      {
        title: "Молекулын туйлшрал",
        href: "https://phet.colorado.edu/sims/html/molecule-polarity/latest/molecule-polarity_all.html",
        img: "https://phet.colorado.edu/sims/html/molecule-polarity/latest/molecule-polarity-600.png",
      },
      {
        title: "Молекулын хэлбэрүүд",
        href: "https://phet.colorado.edu/sims/html/molecule-shapes/latest/molecule-shapes_all.html",
        img: "https://phet.colorado.edu/sims/html/molecule-shapes/latest/molecule-shapes-600.png",
      },
      {
        title: "Атомын харилцан үйлчлэл",
        href: "https://phet.colorado.edu/sims/html/atomic-interactions/latest/atomic-interactions_all.html",
        img: "https://phet.colorado.edu/sims/html/atomic-interactions/latest/atomic-interactions-600.png",
      },
    ],
    theory: [
      {
        title: "Молекулын туйлшрал",
        content: [
          "Гадаад цахилгаан орны нөлөөгөөр молекул дахь цэнэгийн төвүүд шилжиж, диполь үүсэх үзэгдэл.",
          "Электронт туйлшрал: Электрон үүлний шилжилтээр үүснэ.",
          "Ионт туйлшрал: Кристалл торон дахь ионуудын шилжилтээр үүснэ.",
        ],
      },
      {
        title: "Цахилгаан диполь момент",
        content: [
          "Молекулын туйлшралыг тодорхойлох вектор хэмжигдэхүүн.",
          "Томьёо: p = q · l (q — цэнэг, l — цэнэг хоорондын зай).",
          "Нэгж: Кл·м (Кулон·метр) эсвэл Дебай (D).",
        ],
      },
      {
        title: "Туйлтай ба Туйлгүй молекул",
        content: [
          "Туйлтай: Цэнэгийн төвүүд нь давхцдаггүй молекул (Ус H₂O, Аммиак NH₃).",
          "Туйлгүй: Цэнэгийн төвүүд нь давхцдаг молекул (O₂, N₂, CH₄).",
        ],
      },
      {
        title: "Диэлектрик нэвтрүүлэлт",
        content: [
          "Орчин дахь цахилгаан харилцан үйлчлэлийн хүч вакуумынхаас хэд дахин сулрахыг заана.",
          "Томьёо: ε = F₀ / F.",
        ],
      },
      {
        title: "Конденсатор ба Диэлектрик",
        content: [
          "Ялтсуудын хооронд диэлектрик оруулахад багтаамж ε дахин нэмэгдэнэ.",
          "Томьөо: C = ε · C₀ = ε (ε₀ · S / d).",
        ],
      },
      {
        title: "Химийн холбооны туйлшрал",
        content: [
          "Электроны сөрөг чанарын зөрүү их байх тусам холбоо илүү туйлтай байна.",
          "Ковалентын туйлтай холбоо: Электрон үүл нэг атом руугаа илүү шилжсэн холбоо.",
        ],
      },
      {
        title: "Диэлектрик доторх орон",
        content: [
          "Диэлектрик туйлшрах үед түүний дотор эсрэг чиглэсэн цахилгаан орон үүснэ.",
          "Үр дүнд нь нийлбэр цахилгаан орны хүчлэг буурдаг: E = E₀ / ε.",
        ],
      },
    ],
  },
  density: {
    page: {
      title: "Нягтрал",
      subtitle: "Физикийн цахим хичээл",
      videoUrl: "https://www.youtube.com/embed/ycCDX3WIqpc",
    },
    slider: [
      { image: "https://physic-dmts.vercel.app/pre1.png", alt: "Density 1" },
      { image: "https://physic-dmts.vercel.app/pre2.png", alt: "Density 2" },
    ],
    experiments: [
      {
        title: "Нягтрал (Үндсэн)",
        href: "https://phet.colorado.edu/sims/html/density/latest/density_all.html",
        img: "https://phet.colorado.edu/sims/html/density/latest/density-420.png",
      },
      {
        title: "Буянтын хүч",
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
        title: " Нягтрал гэж юу вэ?",
        content: [
          "Бодисын нэгж эзлэхүүнд ногдох массын хэмжээг нягтрал гэнэ.",
          "Энэ нь тухайн бодисын молекулууд хэр зэрэг 'шагшуу' эсвэл 'сийрэг' байрласныг илтгэнэ.",
        ],
      },
      {
        title: "Үндсэн томьёо",
        content: [
          "Нягтралыг тодорхойлохдоо массыг эзлэхүүнд хуваана: ρ = m / V",
          "ρ (ро) - нягтрал, m - масс, V - эзлэхүүн.",
        ],
      },
      {
        title: " Хэмжих нэгж",
        content: [
          "Олон улсын СИ систем дэх үндсэн нэгж нь кг/м³ юм.",
          "Лабораторийн нөхцөлд ихэвчлэн г/см³ нэгжийг ашигладаг (1 г/см³ = 1000 кг/м³).",
        ],
      },
      {
        title: " Бодисын төлөв ба Нягтрал",
        content: [
          "Ихэнх бодисын нягтрал хатуу төлөвт хамгийн их, хийн төлөвт хамгийн бага байдаг.",
          "Анхаар: Ус нь 4°C-т хамгийн их нягтралтай байдаг тул мөс усан дээр хөвдөг.",
        ],
      },
      {
        title: "Хөвөх ба живэх нөхцөл",
        content: [
          "Биеийн нягтрал шингэнийхээс бага бол хөвнө (ρ_бие < ρ_шингэн).",
          "Биеийн нягтрал их бол живнэ (ρ_бие > ρ_шингэн).",
        ],
      },
      {
        title: " Архимедийн хүч",
        content: [
          "Шингэн дотор байгаа биед дэшүүлэх хүч үйлчилдэг. Үүнийг Архимедийн хүч гэнэ.",
          "Томьёо: Fₐ = ρ_ш * g * V_ш",
        ],
      },
      {
        title: "Температурын нөлөө",
        content: ["Бодисыг халаахад эзлэхүүн нь тэлж, нягтрал нь багасдаг."],
      },
    ],
  },
  diffusion: {
    page: {
      title: "Диффуз",
      subtitle: "Физикийн цахим хичээл",
      videoUrl: "https://www.youtube.com/embed/c_IYK8sy0QA",
    },
    slider: [
      { image: "https://physic-dmts.vercel.app/pre1.png", alt: "Diffusion 1" },
      { image: "https://physic-dmts.vercel.app/pre2.png", alt: "Diffusion 2" },
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
        title: " Диффуз гэж юу вэ?",
        content: [
          "Бодисын молекулууд өөрөө аяндаа холилдож, концентраци ихтэй хэсгээс багатай хэсэг рүү шилжих үзэгдэл.",
          "Энэ нь молекулуудын эмх замбараагүй дулааны хөдөлгөөний үр дүн юм.",
        ],
      },
      {
        title: " Броуны хөдөлгөөн",
        content: [
          "Шингэн эсвэл хий доторх жижиг хэсгүүдийн зогсолтгүй, замбараагүй хөдөлгөөн.",
          "Диффуз явагдах үндсэн шалтгаан буюу молекул байгааг батлах шууд бус баримт.",
        ],
      },
      {
        title: " Температурын хамаарал",
        content: [
          "Температур нэмэгдэхэд молекулуудын хөдөлгөөний кинетик энерги ихэсдэг.",
          "Үүний үр дүнд молекулууд хурдан хөдөлж, диффуз явагдах хугацаа богиносоно.",
        ],
      },
      {
        title: " Бодисын төлөв ба Диффуз",
        content: [
          "Хий: Молекул хоорондын зай их тул хамгийн хурдан явагдана.",
          "Шингэн: Дунд зэргийн хурдтай.",
          "Хатуу бие: Молекул хоорондын холбоос чанга тул маш удаан (хэдэн жилээр) явагдана.",
        ],
      },
      {
        title: " Фикийн нэгдүгээр хууль",
        content: [
          "Диффузын урсгал нь концентрацийн градиентад шууд пропорциональ байна.",
          "Томьёо: J = -D * (dc/dx).",
        ],
      },
      {
        title: " Молекул Кинетик Онол (МКО)",
        content: [
          "1. Бодис молекулаас тогтоно. 2. Молекул зогсолтгүй хөдөлнө. 3. Молекулууд хоорондоо харилцан үйлчлэлцэнэ.",
        ],
      },
    ],
  },
  laser: {
    page: {
      title: "Лазер",
      subtitle: "Физикийн цахим хичээл",
      videoUrl: "https://www.youtube.com/embed/y3SBSbsdiYg",
    },
    slider: [
      {
        image: "https://physic-dmts.vercel.app/hudulguun1.png",
        alt: "Laser 1",
      },
      {
        image: "https://physic-dmts.vercel.app/hudulguun2.png",
        alt: "Laser 2",
      },
    ],
    experiments: [
      {
        title: "Гэрлийн хугарал",
        href: "https://phet.colorado.edu/sims/html/bending-light/latest/bending-light_all.html",
        img: "https://phet.colorado.edu/sims/html/bending-light/latest/bending-light-600.png",
      },
      {
        title: "Квантын үзэгдэл",
        href: "https://phet.colorado.edu/sims/html/photoelectric-effect/latest/photoelectric-effect_all.html",
        img: "https://phet.colorado.edu/sims/html/photoelectric-effect/latest/photoelectric-effect-600.png",
      },
    ],
    theory: [
      {
        title: "Лазер гэж юу вэ?",
        content: [
          "Light Amplification by Stimulated Emission of Radiation буюу албадмал цацаргалтаар гэрлийг хүчжүүлэх гэсэн утгатай.",
        ],
      },
      {
        title: "Үүсэл",
        content: ["Анхны ажилладаг лазерыг 1960 онд Теодор Майман бүтээсэн."],
      },
      {
        title: "Шинж чанарууд",
        content: [
          "Монохромат: Нэг өнгө, нэг долгионы уртаас тогтоно.",
          "Когерент: Долгионууд ижил фазтай, синхрон хөдөлдөг.",
          "Чиглэлт: Маш бага сарнилттай, нарийн багц хэлбэртэй.",
        ],
      },
      {
        title: "Албадмал цацаргалт",
        content: [
          "Фотоны нөлөөгөөр өдөөгдсөн электрон доод түвшинд шилжихдээ ижил энергитэй фотон гаргах процесс.",
        ],
      },
    ],
  },
  measurement: {
    page: {
      title: "Квантын хэмжилт",
      subtitle: "Физикийн цахим хичээл",
      videoUrl: "https://www.youtube.com/embed/5eW6u_kS9r4",
    },
    slider: [
      {
        image: "https://physic-dmts.vercel.app/laser1.png",
        alt: "Molecular 1",
      },
      {
        image: "https://physic-dmts.vercel.app/laser2.png",
        alt: "Molecular 2",
      },
    ],
    experiments: [
      {
        title: "Нэгж шилжүүлэх",
        href: "https://phet.colorado.edu/sims/html/unit-rates/latest/unit-rates_all.html",
        img: "https://phet.colorado.edu/sims/html/unit-rates/latest/unit-rates-600.png",
      },
      {
        title: "Хэмжилтийн нарийвчлал",
        href: "https://phet.colorado.edu/sims/html/estimation/latest/estimation_all.html",
        img: "https://phet.colorado.edu/sims/html/estimation/latest/estimation-600.png",
      },
    ],
    theory: [
      {
        title: " Хэмжигдэхүүн",
        content: [
          "Биеийн болон үзэгдлийн шинж чанарыг тоогоор илэрхийлэхийг хэлнэ.",
          "Үндсэн хэмжигдэхүүн: Урт (l), Хугацаа (t), Масс (m), Гүйдэл (I).",
        ],
      },
      {
        title: "Хэмжилтийн алдаа",
        content: [
          "Үнэмлэхүй алдаа (Δa): Хэмжсэн утга ба бодит утгын зөрүү.",
          "Харьцангуй алдаа (ε): Үнэмлэхүй алдааг бодит утгад харьцуулсан хувь.",
        ],
      },
      {
        title: "Багажийн нарийвчлал",
        content: [
          "Хуваарийн утга (C): Хоёр зураасны хоорондох хамгийн бага зай.",
          "Багажийн алдаа: Ихэвчлэн хуваарийн утгын хагастай тэнцүү (Δa = C/2).",
        ],
      },
    ],
  },
};
