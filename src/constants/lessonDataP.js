// src/constants/lessonsDataP.js

export const PHYSICS_CONFIG = {
  motion: {
    page: {
      title: "Гэрлийн хугарал ба ойлт",
      subtitle: "Оптик ба гэрлийн физик шинж чанар",
      videoUrl: "https://www.youtube.com/embed/ir4n9v_266s",
      presentationUrl: "https://www.canva.com/design/example/view?embed",
    },
    // 3 ТУРШИЛТ (PHET SIMULATIONS)
    experiments: [
      {
        title: "Гэрлийн хугарал ба ойлт",
        href: "https://phet.colorado.edu/sims/html/bending-light/latest/bending-light_all.html?locale=mn",
        img: "https://phet.colorado.edu/sims/html/bending-light/latest/bending-light-600.png",
      },
      {
        title: "Геометр оптик (Линз)",
        href: "https://phet.colorado.edu/sims/html/geometric-optics/latest/geometric-optics_all.html?locale=mn",
        img: "https://phet.colorado.edu/sims/html/geometric-optics/latest/geometric-optics-600.png",
      },
      {
        title: "Өнгө холилт",
        href: "https://phet.colorado.edu/sims/html/color-vision/latest/color-vision_all.html?locale=mn",
        img: "https://phet.colorado.edu/sims/html/color-vision/latest/color-vision-600.png",
      },
    ],
    // 7 ОНОЛЫН ХЭСЭГ
    theory: [
      {
        title: "Гэрлийн ойлт",
        content: [
          "Гэрэл нэг орчноос нөгөө орчны хил дээр тусаад буцаж ойх үзэгдэл.",
          "Хууль: α = β.",
        ],
      },
      {
        title: "Гэрлийн хугарал",
        content: [
          "Гэрэл нэг орчноос өөр нягттай орчинд шилжихдээ чиглэлээ өөрчлөх үзэгдэл.",
          "Томьёо: n1 * sin(α) = n2 * sin(β).",
        ],
      },
      {
        title: "Бүрэн дотоод ойлт",
        content: [
          "Гэрэл оптик нягт ихтэй орчноос багатай руу тусахдаа хил дээр бүрэн буцаж ойх үзэгдэл.",
        ],
      },
      {
        title: "Гэрлийн дисперси",
        content: [
          "Цагаан гэрэл призмээр нэвтрэхдээ долоон өнгө болон задрах үзэгдэл (Солонго үүсэх).",
        ],
      },
      {
        title: "Линз ба түүний төрөл",
        content: [
          "Цогцруулагч (гүдгэр) ба сарниулагч (хүнхэр) гэж хоёр үндсэн төрөлд хуваагдана.",
        ],
      },
      {
        title: "Линзний оптик хүч",
        content: [
          "Линзний фокусын зайн урвуу хэмжигдэхүүн. Нэгж нь Диоптр (дптр). D = 1/F.",
        ],
      },
      {
        title: "Нүдний оптик систем",
        content: [
          "Хүний нүд нь өөрөө цогцруулагч линзний систем юм. Харааны гажигт ойрын ба холын хараа орно.",
        ],
      },
    ],
    // 5 ТЕСТ
    tests: [
      {
        question: "Гэрэл ойх үед тусгалын өнцөг 60° бол ойлтын өнцөг хэд вэ?",
        options: ["30°", "60°", "120°"],
        answer: "60°",
      },
      {
        question: "Вакуум дахь гэрлийн хурд хэд вэ?",
        options: ["300,000 км/с", "300,000 м/с", "150,000 км/с"],
        answer: "300,000 км/с",
      },
      {
        question: "Аль нь сарниулагч линз вэ?",
        options: ["Гүдгэр", "Хүнхэр", "Хавтгай"],
        answer: "Хүнхэр",
      },
      {
        question: "Солонго үүсэх нь гэрлийн ямар үзэгдэл вэ?",
        options: ["Дисперси", "Хугарал", "Ойлт"],
        answer: "Дисперси",
      },
      {
        question: "Линзний фокусын зай 20см бол оптик хүч нь хэд вэ?",
        options: ["5 дптр", "0.05 дптр", "2 дптр"],
        answer: "5 дптр",
      },
    ],
    // 5 ФЛАШКАРТ
    cards: [
      {
        question: "Гэрэл ойх хууль?",
        answer: "α = β (Тусгалын өнцөг = Ойлтын өнцөг)",
      },
      { question: "Линзний томьёо?", answer: "1/F = 1/d + 1/f" },
      { question: "Оптик хүчний нэгж?", answer: "Диоптр (дптр)" },
      { question: "Гэрлийн хугарлын илтгэгч?", answer: "n = c / v" },
      {
        question: "Цагаан гэрэл хэдэн өнгөнөөс тогтдог вэ?",
        answer: "7 үндсэн өнгө",
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
