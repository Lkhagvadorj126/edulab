// src/constants/lessonsDataP.js

export const PHYSICS_CONFIG = {
  motion: {
    page: {
      title: "Уурших ба хайлах",
      subtitle: "Бодисын төлөвийн өөрчлөлт, дулааны үзэгдэл",
      videoUrl: "https://www.youtube.com/embed/G6jWl_vAAsU", // Дулааны үзэгдлийн видео
    },
    slider: [
      {
        image: "https://physic-dmts.vercel.app/pre1.png", // Дулааны сэдэвтэй зураг
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
          "Томьёо: Q = λ * m. λ - хайлахын хувийн дулаан.",
        ],
      },
      {
        title: "Уурших үзэгдэл",
        content: [
          "Бодис шингэн төлөвөөс хийн төлөвт шилжих процесс.",
          "Ууршилт нь шингэний гадаргуу дээр ямар ч температурт явагдана.",
          "Томьёо: Q = L * m. L - ууршихын хувийн дулаан.",
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
          "c - хувийн дулаан багтаамж.",
        ],
      },
      {
        title: "Дотоод энерги",
        content: [
          "Биеийг бүрдүүлэгч молекулуудын хөдөлгөөний ба харилцан үйлчлэлийн энерги.",
          "Температур ихсэхэд молекулуудын хөдөлгөөн эрчимжиж, дотоод энерги нэмэгдэнэ.",
        ],
      },
      {
        title: "Энерги хадгалагдах хууль",
        content: [
          "Дулааны тэнцвэрийн үед: Авсан дулаан = Алдсан дулаан (Q_авсан = Q_алдсан).",
          "Энерги устахгүй, шинээр үүсэхгүй, зөвхөн нэг хэлбэрээс нөгөөд шилжинэ.",
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
      title: "Орбитын хөдөлгөөн",
      subtitle: "Тэнгэрийн механик ба Гравитаци",
      videoUrl: "https://www.youtube.com/embed/unWGVH9N_pY", // Орбитын хөдөлгөөний тайлбар видео
    },
    slider: [
      {
        image: "https://physic-dmts.vercel.app/orbit1.png",
        alt: "Planetary Orbits",
      },
      {
        image: "https://physic-dmts.vercel.app/orbit2.png",
        alt: "Satellite Motion",
      },
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
        title: "Бүх ертөнцийн таталцлын хууль",
        content: [
          "Аливаа хоёр бие биеэ массын үржвэрээс шууд, хоорондох зайн квадратаас урвуу хамааралтай хүчээр татдаг.",
          "Томьёо: F = G * (m1 * m2) / r².",
        ],
      },
      {
        title: "Кеплерийн 1-р хууль",
        content: [
          "Гаригууд Нарыг нэг фокус дээрээ байрлуулсан эллипс орбитоор тойрон эргэдэг.",
        ],
      },
      {
        title: "Кеплерийн 2-р хууль",
        content: [
          "Нарыг гаригтай холбосон радиус-вектор ижил хугацаанд ижил хэмжээний талбай зураглан өнгөрнө (Талбайн хууль).",
        ],
      },
      {
        title: "Кеплерийн 3-р хууль",
        content: [
          "Гаригуудын Нарыг тойрох үеийн квадрат нь тэдгээрийн орбитын их хагас тэнхлэгийн кубтай пропорциональ байна.",
          "Томьёо: T² / a³ = const.",
        ],
      },
      {
        title: "Орбитын хурд",
        content: [
          "Биеийг тойрог орбитоор тогтвортой аялуулахад шаардлагатай хурд.",
          "Томьёо: v = sqrt(G * M / r).",
        ],
      },
      {
        title: "Төвд тэмүүлэх хурдатгал",
        content: [
          "Орбитоор эргэж буй биеийн хурдны чиглэлийг байнга өөрчилж байдаг хурдатгал.",
          "Томьёо: a = v² / r.",
        ],
      },
      {
        title: "Жингүйдэл",
        content: [
          "Орбитын хөдөлгөөнд байгаа бие зөвхөн таталцлын хүчний нөлөөгөөр чөлөөт уналтанд байх үеийн төлөв.",
        ],
      },
    ],
  },
};
