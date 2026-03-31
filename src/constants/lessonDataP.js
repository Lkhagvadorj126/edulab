// src/constants/lessonsDataP.js

export const PHYSICS_CONFIG = {
  motion: {
    page: {
      title: "Хөдөлгөөн",
      subtitle: "Механик хөдөлгөөний үндэс",
      videoUrl: "https://www.youtube.com/embed/fTht9OInTms",
    },
    slider: [
      {
        image: "https://physic-dmts.vercel.app/hudulguun1.png",
        alt: "Motion 1",
      },
      {
        image: "https://physic-dmts.vercel.app/hudulguun2.png",
        alt: "Motion 2",
      },
    ],
    experiments: [
      {
        title: "Хөдөлгөөний график",
        href: "https://phet.colorado.edu/sims/html/calculating-slope/latest/calculating-slope_all.html",
        img: "https://phet.colorado.edu/sims/html/calculating-slope/latest/calculating-slope-600.png",
      },
      {
        title: "Хүч ба Хөдөлгөөн",
        href: "https://phet.colorado.edu/sims/html/forces-and-motion-basics/latest/forces-and-motion-basics_all.html",
        img: "https://phet.colorado.edu/sims/html/forces-and-motion-basics/latest/forces-and-motion-basics-600.png",
      },
      {
        title: "Төвд тэмүүлэх хүч",
        href: "https://phet.colorado.edu/sims/html/forces-and-motion/latest/forces-and-motion_all.html",
        img: "https://phet.colorado.edu/sims/html/forces-and-motion/latest/forces-and-motion-600.png",
      },
    ],
    theory: [
      {
        title: "Механик хөдөлгөөн",
        content: [
          "Хугацааны явцад биеийн байрлал бусад биеттэй харьцуулахад өөрчлөгдөх үзэгдэл.",
          "Тооллын бие: Хөдөлгөөнийг харьцуулан үзэж буй бие.",
        ],
      },
      {
        title: "Траектори ба Зам",
        content: [
          "Траектори: Биеийн хөдөлгөөний явцад үлдээх мөр.",
          "Зам (s): Траекторийн урт. Скаляр хэмжигдэхүүн.",
        ],
      },
      {
        title: "Шилжилт",
        content: [
          "Хөдөлгөөний эхлэл ба төгсгөлийн цэгийг холбосон чиглэлт хэрчим.",
          "Замнаас ялгаатай нь вектор хэмжигдэхүүн юм.",
        ],
      },
      {
        title: "Хурд",
        content: [
          "Нэгж хугацаанд туулсан замыг хурд гэнэ.",
          "Томьёо: v = s / t. Нэгж: м/с.",
        ],
      },
      {
        title: "Хурдатгал",
        content: [
          "Хурд хугацааны явцад өөрчлөгдөх хурдацыг хэлнэ.",
          "Томьёо: a = (v - v₀) / t. Нэгж: м/с².",
        ],
      },
      {
        title: "Жигд хөдөлгөөн",
        content: [
          "Ижил хугацаанд ижил зам туулах хөдөлгөөн.",
          "Хурд тогтмол байдаг (v = const).",
        ],
      },
      {
        title: "Ньютоны 1-р хууль",
        content: [
          "Биед гадны хүч үйлчлэхгүй бол тайван байсан бие тайван, хөдөлж байсан нь жигд шулуун хөдөлгөөндөө байна.",
        ],
      },
    ],
  },
  sound: {
    page: {
      title: "Дуу ба Долгион",
      subtitle: "Механик долгион, акустик",
      videoUrl: "https://www.youtube.com/embed/S_S78v-uMtc",
    },
    slider: [
      { image: "https://physic-dmts.vercel.app/pre1.png", alt: "Sound 1" },
      { image: "https://physic-dmts.vercel.app/pre2.png", alt: "Sound 2" },
    ],
    experiments: [
      {
        title: "Дууны долгион",
        href: "https://phet.colorado.edu/sims/html/waves-intro/latest/waves-intro_all.html",
        img: "https://phet.colorado.edu/sims/html/waves-intro/latest/waves-intro-600.png",
      },
      {
        title: "Долгионы интерференц",
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
          "Долгион нь бодисыг зөөхгүй, зөвхөн энергийг дамжуулдаг.",
        ],
      },
      {
        title: "Долгионы урт ба Давтамж",
        content: [
          "Долгионы урт (λ): Ижил фазтай хоёр цэгийн зай.",
          "Давтамж (f): 1 секундэд хийх хэлбэлзлийн тоо.",
        ],
      },
      {
        title: "Дууны долгион",
        content: [
          "16 Гц-ээс 20,000 Гц хүртэлх давтамжтай механик долгион.",
          "Хий, шингэн, хатуу орчинд тардаг ч вакуумд тарахгүй.",
        ],
      },
      {
        title: "Дууны хурд",
        content: [
          "Агаарт 340 м/с, усанд 1500 м/с, ганд 5000 м/с орчим байдаг.",
          "Орчны нягт ихсэх тусам дууны хурд нэмэгдэнэ.",
        ],
      },
      {
        title: "Дууны өндөр ба Хүч",
        content: [
          "Өндөр: Давтамжаас хамаарна (их давтамж = нарийн дуу).",
          "Хүч: Далайцаас хамаарна (их далайц = чанга дуу).",
        ],
      },
      {
        title: "Инфразвук ба Ультразвук",
        content: [
          "Инфразвук: 16 Гц-ээс бага (хүнд сонсогдохгүй).",
          "Ультразвук: 20,000 Гц-ээс их (бат, соно ашигладаг).",
        ],
      },
      {
        title: "Цуурай",
        content: [
          "Дууны долгион саадаас ойж эргэж ирэх үзэгдэл.",
          "Цуурайг ашиглан зайг хэмжих боломжтой (S = v*t/2).",
        ],
      },
    ],
  },
  heat: {
    page: {
      title: "Дулаан",
      subtitle: "Термодинамикийн үндэс",
      videoUrl: "https://www.youtube.com/embed/G6jWl_vAAsU",
    },
    slider: [
      { image: "https://physic-dmts.vercel.app/pre1.png", alt: "Heat 1" },
    ],
    experiments: [
      {
        title: "Дулааны энерги",
        href: "https://phet.colorado.edu/sims/html/energy-forms-and-changes/latest/energy-forms-and-changes_all.html",
        img: "https://phet.colorado.edu/sims/html/energy-forms-and-changes/latest/energy-forms-and-changes-600.png",
      },
      {
        title: "Бодисын төлөв",
        href: "https://phet.colorado.edu/sims/html/states-of-matter-basics/latest/states-of-matter-basics_all.html",
        img: "https://phet.colorado.edu/sims/html/states-of-matter-basics/latest/states-of-matter-basics-600.png",
      },
      {
        title: "Хийн хууль",
        href: "https://phet.colorado.edu/sims/html/gas-properties/latest/gas-properties_all.html",
        img: "https://phet.colorado.edu/sims/html/gas-properties/latest/gas-properties-600.png",
      },
    ],
    theory: [
      {
        title: "Дотоод энерги",
        content: [
          "Биеийг бүрдүүлэгч жижиг хэсгүүдийн хөдөлгөөний ба харилцан үйлчлэлийн энерги.",
        ],
      },
      {
        title: "Дулаан дамжуулал",
        content: [
          "Кондукци: Хатуу биед (мөргөлдөх замаар).",
          "Конвекци: Шингэн ба хийд (урсгалаар).",
          "Цацраг: Вакуумд (долгионоор).",
        ],
      },
      {
        title: "Дулааны тоо хэмжээ",
        content: [
          "Биеийн температур өөрчлөгдөхөд авсан буюу алдсан энерги.",
          "Томьёо: Q = c * m * Δt.",
        ],
      },
      {
        title: "Хайлах ба Уурших",
        content: ["Хайлах дулаан: Q = λ * m.", "Уурших дулаан: Q = L * m."],
      },
      {
        title: "Хувийн дулаан багтаамж",
        content: [
          "1 кг бодисыг 1 градусаар халаахад шаардлагатай энерги (c).",
          "Усны хувийн дулаан багтаамж хамгийн их (4200 Ж/кг*К).",
        ],
      },
      {
        title: "Термодинамикийн 1-р хууль",
        content: [
          "Системд өгсөн дулаан нь түүний дотоод энергийг нэмэгдүүлэх ба ажил хийхэд зарцуулагдана: Q = ΔU + A.",
        ],
      },
      {
        title: "Дулааны тэнцвэр",
        content: [
          "Хоёр биеийн температур ижил болох хүртэл энерги солилцох процесс.",
        ],
      },
    ],
  },
  quantum: {
    page: {
      title: "Квантын үзэгдэл",
      subtitle: "Атом ба Цөмийн физик",
      videoUrl: "https://www.youtube.com/embed/5eW6u_kS9r4",
    },
    slider: [
      { image: "https://physic-dmts.vercel.app/laser1.png", alt: "Quantum 1" },
    ],
    experiments: [
      {
        title: "Фотоэффект",
        href: "https://phet.colorado.edu/sims/html/photoelectric-effect/latest/photoelectric-effect_all.html",
        img: "https://phet.colorado.edu/sims/html/photoelectric-effect/latest/photoelectric-effect-600.png",
      },
      {
        title: "Резерфордын сарнилт",
        href: "https://phet.colorado.edu/sims/html/rutherford-scattering/latest/rutherford-scattering_all.html",
        img: "https://phet.colorado.edu/sims/html/rutherford-scattering/latest/rutherford-scattering-600.png",
      },
      {
        title: "Атомын загвар",
        href: "https://phet.colorado.edu/sims/html/build-an-atom/latest/build-an-atom_all.html",
        img: "https://phet.colorado.edu/sims/html/build-an-atom/latest/build-an-atom-600.png",
      },
    ],
    theory: [
      {
        title: "Квант онол",
        content: [
          "Энерги тасралтгүй биш, харин тодорхой хэсэг буюу порцоор цацардаг (E = h*ν).",
        ],
      },
      {
        title: "Фотоэффект",
        content: [
          "Гэрлийн нөлөөгөөр бодисоос электрон сугаран гарах үзэгдэл.",
          "Эйнштейний томьёо: hν = A + E_k.",
        ],
      },
      {
        title: "Гэрлийн хоёрдмол шинж",
        content: [
          "Гэрэл нь долгион (интерференц) ба бөөм (фотоэффект) шинжийг зэрэг агуулдаг.",
        ],
      },
      {
        title: "Атомын бүтэц",
        content: [
          "Төвдөө эерэг цэнэгтэй цөм, түүнийг тойрон электронууд эргэлдэнэ.",
        ],
      },
      {
        title: "Цөмийн хүч",
        content: [
          "Цөм доторх протон ба нейтронуудыг барьж байдаг маш хүчтэй, богино зайн үйлчлэлтэй хүч.",
        ],
      },
      {
        title: "Радиоидэвхт чанар",
        content: [
          "Тогтворгүй цөмүүд аяндаа задарч цацраг гаргах үзэгдэл (Альфа, Бета, Гамма).",
        ],
      },
      {
        title: "Цөмийн нэгдэх ба задрах",
        content: [
          "Задрах: Хүнд цөм хуваагдах (АЦС).",
          "Нэгдэх: Хөнгөн цөмүүд нийлэх (Нарны энерги).",
        ],
      },
    ],
  },
  light: {
    page: {
      title: "Гэрэл ба Оптик",
      subtitle: "Цахилгаан соронзон долгион",
      videoUrl: "https://www.youtube.com/embed/y3SBSbsdiYg",
    },
    slider: [
      {
        image: "https://physic-dmts.vercel.app/hudulguun1.png",
        alt: "Light 1",
      },
    ],
    experiments: [
      {
        title: "Гэрлийн хугарал",
        href: "https://phet.colorado.edu/sims/html/bending-light/latest/bending-light_all.html",
        img: "https://phet.colorado.edu/sims/html/bending-light/latest/bending-light-600.png",
      },
      {
        title: "Линз",
        href: "https://phet.colorado.edu/sims/html/geometric-optics/latest/geometric-optics_all.html",
        img: "https://phet.colorado.edu/sims/html/geometric-optics/latest/geometric-optics-600.png",
      },
      {
        title: "Өнгө холилдох",
        href: "https://phet.colorado.edu/sims/html/color-vision/latest/color-vision_all.html",
        img: "https://phet.colorado.edu/sims/html/color-vision/latest/color-vision-600.png",
      },
    ],
    theory: [
      {
        title: "Гэрлийн ойлт",
        content: [
          "Гэрэл саад дээр тусаад буцах үзэгдэл.",
          "Ойлтын хууль: Туссан өнцөг ойсон өнцөгтэй тэнцүү.",
        ],
      },
      {
        title: "Гэрлийн хугарал",
        content: [
          "Нэг орчноос нөгөөд шилжихэд гэрлийн чиглэл өөрчлөгдөх үзэгдэл.",
          "Хугарлын илтгэгч: n = c / v.",
        ],
      },
      {
        title: "Бүрэн дотоод ойлт",
        content: [
          "Гэрэл нягт ихтэй орчноос нягт багатай руу орохдоо бүрэн ойх үзэгдэл (Шилэн кабель).",
        ],
      },
      {
        title: "Линз",
        content: [
          "Цуглуулагч ба Сарниулагч линз.",
          "Линзний томьёо: 1/F = 1/d + 1/f.",
        ],
      },
      {
        title: "Дисперси",
        content: ["Цагаан гэрэл долоон өнгө болон задрах үзэгдэл (Солонго)."],
      },
      {
        title: "Интерференц ба Дифракци",
        content: [
          "Гэрлийн долгион шинжийг батлах үзэгдлүүд.",
          "Долгионууд давхцах ба саадыг тойрч гарах.",
        ],
      },
      {
        title: "Гэрлийн хурд",
        content: [
          "Вакуум дахь хурд c = 3*10⁸ м/с.",
          "Ертөнцийн хамгийн дээд хурд.",
        ],
      },
    ],
  },
  energy: {
    page: {
      title: "Цахилгаан ба Соронз",
      subtitle: "Цахилгаан хэлхээ, соронзон орон",
      videoUrl: "https://www.youtube.com/embed/PVL24HAesnc",
    },
    slider: [
      { image: "https://physic-dmts.vercel.app/laser1.png", alt: "Energy 1" },
    ],
    experiments: [
      {
        title: "Цахилгаан хэлхээ",
        href: "https://phet.colorado.edu/sims/html/circuit-construction-kit-dc-virtual-lab/latest/circuit-construction-kit-dc-virtual-lab_all.html",
        img: "https://phet.colorado.edu/sims/html/circuit-construction-kit-dc-virtual-lab/latest/circuit-construction-kit-dc-virtual-lab-600.png",
      },
      {
        title: "Омын хууль",
        href: "https://phet.colorado.edu/sims/html/ohms-law/latest/ohms-law_all.html",
        img: "https://phet.colorado.edu/sims/html/ohms-law/latest/ohms-law-600.png",
      },
      {
        title: "Фарадейн хууль",
        href: "https://phet.colorado.edu/sims/html/faradays-law/latest/faradays-law_all.html",
        img: "https://phet.colorado.edu/sims/html/faradays-law/latest/faradays-law-600.png",
      },
    ],
    theory: [
      {
        title: "Цахилгаан цэнэг",
        content: [
          "Кулоны хууль: F = k * q₁q₂ / r².",
          "Эерэг ба сөрөг цэнэгүүд харилцан үйлчлэлцэнэ.",
        ],
      },
      {
        title: "Гүйдлийн хүч",
        content: [
          "Нэгж хугацаанд дамжуулагчийн хөндлөн огтлолоор өнгөрөх цэнэг.",
          "Томьёо: I = q / t. Нэгж: Ампер (А).",
        ],
      },
      {
        title: "Омын хууль",
        content: [
          "Хэлхээний хэсгийн хувьд: I = U / R.",
          "Гүйдэл хүчдэлд шууд, эсэргүүцэлд урвуу пропорциональ.",
        ],
      },
      {
        title: "Эсэргүүцэл",
        content: [
          "Дамжуулагчийн гүйдэлд саад болох шинж чанар.",
          "Дараа ба зэрэгцээ холболт.",
        ],
      },
      {
        title: "Цахилгаан соронзон индукц",
        content: [
          "Хувьсах соронзон орны нөлөөгөөр цахилгаан гүйдэл үүсэх үзэгдэл.",
        ],
      },
      {
        title: "Цахилгаан чадал",
        content: ["Гүйдлийн хийх ажил.", "Томьёо: P = U * I. Нэгж: Ватт (Вт)."],
      },
      {
        title: "Соронзон орон",
        content: [
          "Гүйдэлтэй дамжуулагч эсвэл соронзон биеийн эргэн тойронд үүсэх орон.",
        ],
      },
    ],
  },
};
