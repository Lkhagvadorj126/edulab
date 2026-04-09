// src/constants/biologyData.js

export const BIOLOGY_CONFIG = {
  // 1. ЯЛГАРУУЛАХ ТОГТОЛЦОО
  angilal: {
    page: {
      title: "Ялгаруулах тогтолцоо",
      subtitle: "Биологийн цахим хичээл",
      videoUrl: "https://www.youtube.com/embed/2IMfnXlD1O4",
      presentationUrl:
        "https://www.canva.com/design/DAHGJSJwCQQ/puLJHDZ0xZ5wDRtn3if-zA/view?embed",
    },
    slider: [
      {
        image:
          "https://images.unsplash.com/photo-1576086213369-97a306d36557?w=800",
        alt: "Хүний биеийн бүтэц",
      },
      {
        image:
          "https://images.unsplash.com/photo-1559757175-5700dde675bc?w=800",
        alt: "Анагаах ухааны судалгаа",
      },
    ],
    experiments: [
      {
        title: "Моляр чанар ба шүүлтүүр",
        href: "https://phet.colorado.edu/sims/html/molarity/latest/molarity_all.html",
        img: "https://phet.colorado.edu/sims/html/molarity/latest/molarity-600.png",
      },
      {
        title: "Эсийн мембраны нэвчилт",
        href: "https://phet.colorado.edu/sims/html/membrane-channels/latest/membrane-channels_all.html",
        img: "https://phet.colorado.edu/sims/html/membrane-channels/latest/membrane-channels-600.png",
      },
      {
        title: "Биеийн шингэний тэнцвэр",
        href: "https://phet.colorado.edu/sims/html/diffusion/latest/diffusion_all.html",
        img: "https://phet.colorado.edu/sims/html/diffusion/latest/diffusion-600.png",
      },
    ],
    theory: [
      {
        title: "Ялгаруулах тогтолцооны үүрэг",
        content: [
          "Бодисын солилцооны эцсийн бүтээгдэхүүнийг зайлуулах процесс.",
          "Гомеостазыг хадгалахад шийдвэрлэх үүрэгтэй.",
        ],
      },
      {
        title: "Бөөрний бүтэц",
        content: [
          "Хэвлийн хөндийн ар талд байрлах хос эрхтэн.",
          "Холтослог ба тархилаг бодисоос тогтоно.",
        ],
      },
      {
        title: "Нефрон - Үндсэн нэгж",
        content: [
          "Бөөрний бүтэц, үйл ажиллагааны үндсэн нэгж.",
          "Цуснаас шээсийг шүүж авах үүрэгтэй.",
        ],
      },
      {
        title: "Шээс үүсэх шат",
        content: [
          "Шүүлтүүр, эргэн шимэгдэлт, шүүрэл гэсэн 3 шаттай.",
          "Түүдгэнцэрт анхдагч шээс шүүгдэнэ.",
        ],
      },
      {
        title: "Шээс дамжуулах зам",
        content: [
          "Шээс дамжууруураар дамжин давсагт очно.",
          "Давсаг нь шээсийг түр хадгалах үүрэгтэй.",
        ],
      },
      {
        title: "Арьсны ялгаруулах үүрэг",
        content: [
          "Хөлсний булчирхайгаар ус, давс зайлуулна.",
          "Биеийн температурыг зохицуулахад тусална.",
        ],
      },
      {
        title: "Бөөрний эрүүл мэнд",
        content: [
          "Ус хангалттай ууж, давсыг хязгаарлах хэрэгтэй.",
          "Хувийн ариун цэвэр нь халдвараас сэргийлнэ.",
        ],
      },
    ],
    tests: [
      {
        question: "Бөөрний үндсэн нэгжийг юу гэдэг вэ?",
        options: ["Нейрон", "Нефрон", "Альвеоль"],
        answer: "Нефрон",
      },
      {
        question: "Анхдагч шээс хаана үүсдэг вэ?",
        options: ["Сувганцарт", "Түүдгэнцэрт", "Сүвэнд"],
        answer: "Түүдгэнцэрт",
      },
      {
        question: "Шээс түр хадгалах эрхтэн?",
        options: ["Бөөр", "Давсаг", "Суваг"],
        answer: "Давсаг",
      },
      {
        question: "Биеийн тогтмол байдлыг юу гэх вэ?",
        options: ["Фотосинтез", "Гомеостаз", "Митиоз"],
        answer: "Гомеостаз",
      },
      {
        question: "Шээс дамжуулах хоолой?",
        options: ["Артери", "Вена", "Шээс дамжууруур"],
        answer: "Шээс дамжууруур",
      },
    ],
    cards: [
      { question: "Гомеостаз?", answer: "Дотоод орчны тогтмол байдал." },
      { question: "Нефрон?", answer: "Бөөрний үндсэн нэгж." },
      { question: "Давсаг?", answer: "Шээс түр хадгалах эрхтэн." },
      { question: "Анхдагч шээс?", answer: "Түүдгэнцэрт шүүгдсэн шингэн." },
      {
        question: "Эцсийн шээс?",
        answer: "Сувганцарт эргэн шимэгдсэний дараах шингэн.",
      },
    ],
  },

  // 2. РЕКОМБИНАНТ ИНСУЛИН ҮЙЛДВЭРЛЭЛ
  urgamal: {
    page: {
      title: "Рекомбинант инсулин үйлдвэрлэл",
      subtitle: "Генетик инженерчлэл ба Биотехнологи",
      videoUrl: "https://www.youtube.com/embed/1vT7_D_XFsc",
      presentationUrl:
        "https://www.canva.com/design/DAHGJWETda0/2bIxcjgAodTCaStGJHmnWQ/view?embed",
    },
    slider: [
      {
        image:
          "https://images.unsplash.com/photo-1579165466541-71ae22406324?w=800",
        alt: "Лаборатори",
      },
      {
        image:
          "https://images.unsplash.com/photo-1581093588401-fbb62a02f120?w=800",
        alt: "Ген засварлалт",
      },
    ],
    experiments: [
      {
        title: "Ген илрэх зарчим",
        href: "https://phet.colorado.edu/sims/html/gene-expression-essentials/latest/gene-expression-essentials_all.html",
        img: "https://phet.colorado.edu/sims/html/gene-expression-essentials/latest/gene-expression-essentials-600.png",
      },
      {
        title: "Эсийн доторх процесс",
        href: "https://phet.colorado.edu/sims/html/build-a-cell/latest/build-a-cell_all.html",
        img: "https://phet.colorado.edu/sims/html/build-a-cell/latest/build-a-cell-600.png",
      },
      {
        title: "Молекулын түвшин",
        href: "https://phet.colorado.edu/sims/html/molarity/latest/molarity_all.html",
        img: "https://phet.colorado.edu/sims/html/molarity/latest/molarity-600.png",
      },
    ],
    theory: [
      {
        title: "Генетик инженерчлэл",
        content: [
          "Өөр организмын генийг нэгтгэж шинэ ДНХ гаргах арга.",
          "Эмчилгээний уураг гаргахад ашигладаг.",
        ],
      },
      {
        title: "Инсулины үүрэг",
        content: [
          "Цусан дахь сахарын хэмжээг зохицуулна.",
          "Нойр булчирхайнаас ялгардаг гормон.",
        ],
      },
      {
        title: "Генийг ялгах",
        content: [
          "Инсулины генийг рестрикцийн ферментээр тасалдаг.",
          "Залгахад бэлэн болгон бэлтгэнэ.",
        ],
      },
      {
        title: "Плазмид вектор",
        content: [
          "Бактерийн цагираг ДНХ-г тээвэрлэгч болгоно.",
          "Лигаза ферментээр генийг залгана.",
        ],
      },
      {
        title: "Трансформаци",
        content: [
          "Рекомбинант ДНХ-г бактерийн эсэд нэвтрүүлэх процесс.",
          "Бактери инсулин нийлэгжүүлж эхэлнэ.",
        ],
      },
      {
        title: "Үйлдвэрлэлийн шат",
        content: [
          "Ферментерийн саванд бактерийг хурдан үржүүлнэ.",
          "Асар их хэмжээний уураг нийлэгжүүлнэ.",
        ],
      },
      {
        title: "Цэвэршүүлэлт",
        content: [
          "Гарган авсан уургийг бохирдлоос цэвэрлэнэ.",
          "Хүний инсулинтай ижил бүтэцтэй байна.",
        ],
      },
    ],
    tests: [
      {
        question: "ДНХ 'наах' фермент?",
        options: ["Лигаза", "Амилаза", "Пепсин"],
        answer: "Лигаза",
      },
      {
        question: "Тээвэрлэгч цагираг ДНХ?",
        options: ["Хромосом", "Плазмид", "Геном"],
        answer: "Плазмид",
      },
      {
        question: "Генийг эсэд нэвтрүүлэх?",
        options: ["Транскрипци", "Трансформаци", "Трансляци"],
        answer: "Трансформаци",
      },
      {
        question: "Инсулин хаанаас ялгардаг?",
        options: ["Элэг", "Бөөр", "Нойр булчирхай"],
        answer: "Нойр булчирхай",
      },
      {
        question: "Генийг зүсэх фермент?",
        options: ["Лигаза", "Рестрикци", "Полимераза"],
        answer: "Рестрикци",
      },
    ],
    cards: [
      { question: "Плазмид?", answer: "Бактерийн цагираг ДНХ." },
      { question: "Лигаза?", answer: "ДНХ-ийн хэсгийг холбогч фермент." },
      { question: "Инсулин?", answer: "Сахар зохицуулагч гормон." },
      {
        question: "Чихрийн шижин?",
        answer: "Инсулины дутагдлаас үүсэх өвчин.",
      },
      {
        question: "Рекомбинант ДНХ?",
        answer: "Хоёр өөр эх үүсвэрээс бүрдсэн ДНХ.",
      },
    ],
  },

  // 3. БИЕ МАХБОДЫН ЗОХИЦУУЛГА
  es: {
    page: {
      title: "Бие махбодын зохицуулга",
      subtitle: "Дотоод орчны тогтмол байдал",
      videoUrl: "https://www.youtube.com/embed/X9nxZp6qL-4",
      presentationUrl:
        "https://www.canva.com/design/DAHGJX6Ki4s/AV5Vn3L3sEgych0RF93EmQ/view?embed",
    },
    slider: [
      {
        image:
          "https://images.unsplash.com/photo-1559757175-0270005783ee?w=800",
        alt: "Мэдрэл",
      },
      {
        image:
          "https://images.unsplash.com/photo-1530210124550-912dc1381cb8?w=800",
        alt: "Гормон",
      },
    ],
    experiments: [
      {
        title: "Мэдрэлийн импульс",
        href: "https://phet.colorado.edu/sims/html/neuron/latest/neuron_all.html",
        img: "https://phet.colorado.edu/sims/html/neuron/latest/neuron-600.png",
      },
      {
        title: "Биеийн дулаан",
        href: "https://phet.colorado.edu/sims/html/energy-forms-and-changes/latest/energy-forms-and-changes_all.html",
        img: "https://phet.colorado.edu/sims/html/energy-forms-and-changes/latest/energy-forms-and-changes-600.png",
      },
      {
        title: "Шүүлтүүр ба диффуз",
        href: "https://phet.colorado.edu/sims/html/diffusion/latest/diffusion_all.html",
        img: "https://phet.colorado.edu/sims/html/diffusion/latest/diffusion-600.png",
      },
    ],
    theory: [
      {
        title: "Гомеостазын мөн чанар",
        content: [
          "Дотоод орчны үзүүлэлтүүдийг тогтмол хадгалах чадвар.",
          "Амьд биеийн оршин тогтнох үндэс.",
        ],
      },
      {
        title: "Мэдрэлийн зохицуулга",
        content: [
          "Цахилгаан импульсээр мэдээлэл дамжуулна.",
          "Маш хурдан хугацаанд хариу үзүүлнэ.",
        ],
      },
      {
        title: "Шингэний зохицуулга",
        content: [
          "Гормонууд цусаар дамжин үйлчилнэ.",
          "Удаан хугацааны турш нөлөө үзүүлдэг.",
        ],
      },
      {
        title: "Нейроны бүтэц",
        content: [
          "Мэдрэлийн системийн үндсэн нэгж.",
          "Аксон, дендритээс тогтсон эс юм.",
        ],
      },
      {
        title: "Сөрөг эргэх холбоо",
        content: [
          "Хазайлтыг хэвийн хэмжээнд буцаах механизм.",
          "Сахар, температурын зохицуулгад ашиглагдана.",
        ],
      },
      {
        title: "Дулаан зохицуулга",
        content: [
          "Биеийн температур 37°C орчимд байдаг.",
          "Хөлрөх, чичрэх замаар тэнцвэрийг хангана.",
        ],
      },
      {
        title: "Усны тэнцвэр",
        content: [
          "АДГ гормон усны шимэгдэлтийг хянана.",
          "Бөөрний тусламжтайгаар зохицуулагддаг.",
        ],
      },
    ],
    tests: [
      {
        question: "Сахар багасгах гормон?",
        options: ["Инсулин", "Глюкагон", "Адреналин"],
        answer: "Инсулин",
      },
      {
        question: "Мэдрэлийн үндсэн нэгж?",
        options: ["Нефрон", "Нейрон", "Гормон"],
        answer: "Нейрон",
      },
      {
        question: "Дулаан зохицуулах төв?",
        options: ["Гипоталамус", "Нугас", "Зүрх"],
        answer: "Гипоталамус",
      },
      {
        question: "Хурдан зохицуулга аль нь вэ?",
        options: ["Мэдрэл", "Шингэн", "Арьс"],
        answer: "Мэдрэл",
      },
      {
        question: "Импульс дамжих хэсэг?",
        options: ["Аксон", "Цөм", "Давсаг"],
        answer: "Аксон",
      },
    ],
    cards: [
      { question: "Нейрон?", answer: "Мэдрэлийн эс." },
      { question: "Гормон?", answer: "Цусаар дамжих биологийн идэвхт бодис." },
      { question: "Гипоталамус?", answer: "Тархины дулаан зохицуулагч хэсэг." },
      { question: "Аксон?", answer: "Импульс дамжуулах урт сэртэн." },
      { question: "Синапс?", answer: "Мэдрэлийн эсүүдийн холбоос." },
    ],
  },
};
