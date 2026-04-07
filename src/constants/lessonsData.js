// src/constants/lessonsData.js

export const LESSONS_CONFIG = {
  density: {
    page: {
      title: "Нягтрал ба Архимедийн хүч",
      subtitle: "Бодисын шинж чанар, шингэн ба хийн даралт",
      videoUrl: "https://www.youtube.com/embed/ycCDX3WIqpc",
    },
    slider: [
      {
        image: "https://physic-dmts.vercel.app/pre1.png",
        alt: "Density and Floating Concept",
      },
      {
        image: "https://physic-dmts.vercel.app/pre2.png",
        alt: "Archimedes Principle Experiment",
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
        title: "Нягтрал гэж юу вэ?",
        content: [
          "Бодисын нэгж эзлэхүүнд ногдох массын хэмжээг нягтрал гэнэ.",
          "Энэ нь молекулуудын байрлал хэр зэрэг 'шагшуу' эсвэл 'сийрэг' байгааг илтгэнэ.",
        ],
      },
      {
        title: "Үндсэн томьёо",
        content: [
          "Нягтралыг тодорхойлохдоо массыг эзлэхүүнд хуваана: ρ = m / V.",
          "ρ (ро) - нягтрал, m - масс (кг), V - эзлэхүүн (м³).",
        ],
      },
      {
        title: "Хэмжих нэгж",
        content: [
          "Олон улсын СИ систем дэх үндсэн нэгж нь кг/м³ юм.",
          "1 г/см³ нягтрал нь 1000 кг/м³-тэй тэнцүү байдаг.",
        ],
      },
      {
        title: "Бодисын төлөв ба Нягтрал",
        content: [
          "Хатуу төлөвт нягтрал их, хийн төлөвт хамгийн бага байна.",
          "Ус 4°C-т хамгийн их нягтралтай (1000 кг/м³) байдаг.",
        ],
      },
      {
        title: "Хөвөх ба живэх нөхцөл",
        content: [
          "ρ_бие < ρ_шингэн: Бие хөвнө (жишээ нь: мод усан дээр).",
          "ρ_бие > ρ_шингэн: Бие живнэ (жишээ нь: төмөр усанд).",
          "ρ_бие = ρ_шингэн: Бие шингэн дотор хаана ч тогтоно.",
        ],
      },
      {
        title: "Архимедийн хүч",
        content: [
          "Шингэн эсвэл хий дотор байгаа биед үйлчлэх дээш түлхэх хүч.",
          "Томьёо: Fₐ = ρ_ш * g * V_ш (ρ_ш - шингэний нягтрал, V_ш - живсэн хэсгийн эзлэхүүн).",
        ],
      },
      {
        title: "Температурын нөлөө",
        content: [
          "Бие халахад эзлэхүүн тэлж, нягтрал нь багасдаг.",
          "Энэ зарчмаар агаарын бөмбөлөг дээшээ хөөрдөг.",
        ],
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
      subtitle: "Квант физик ба Оптик",
      // Видео хичээл: Лазерын ажиллах зарчмыг тайлбарласан илүү чанартай бичлэгээр сольж болно
      videoUrl: "https://www.youtube.com/embed/y3SBSbsdiYg",
    },
    slider: [
      {
        image: "https://physic-dmts.vercel.app/laser_structure.png", // Боломжтой бол Лазерын бүтцийн зураг
        alt: "Лазерын бүтэц",
      },
      {
        image: "https://physic-dmts.vercel.app/laser_types.png",
        alt: "Лазерын төрлүүд",
      },
    ],
    experiments: [
      {
        title: "Лазер ба Гэрлийн хугарал",
        href: "https://phet.colorado.edu/sims/html/bending-light/latest/bending-light_all.html",
        img: "https://phet.colorado.edu/sims/html/bending-light/latest/bending-light-600.png",
      },
      {
        title: "Лазерын лаборатори (Квант)",
        href: "https://phet.colorado.edu/sims/html/lasers/latest/lasers_all.html",
        img: "https://phet.colorado.edu/sims/html/isotopes-and-atomic-mass/latest/isotopes-and-atomic-mass-420.png", // PhET дээрх Лазерын тусгай лаборатори
      },
      {
        title: "Фото эффект ба Лазер",
        href: "https://phet.colorado.edu/sims/html/photoelectric-effect/latest/photoelectric-effect_all.html",
        img: "https://phet.colorado.edu/sims/photoelectric/photoelectric-420.png",
      },
    ],
    theory: [
      {
        title: "Лазерын үндсэн ойлголт",
        content: [
          "LASER нь 'Light Amplification by Stimulated Emission of Radiation' буюу албадмал цацаргалтаар гэрлийг хүчжүүлэх гэсэн үгсийн товчлол юм.",
          "Энгийн гэрэл бүх зүгт сарнидаг бол лазер нь маш нарийн, өндөр энергийн нягтралтай багц гэрэл үүсгэдэгээрээ онцлог.",
        ],
      },
      {
        title: "Албадмал цацаргалт",
        content: [
          "Өдөөгдсөн төлөвт байгаа электрон гадны фотоны нөлөөгөөр үндсэн төлөвт шилжихдээ ижил энерги, фаз, чиглэлтэй хоёр дахь фотоныг гаргах үзэгдэл юм.",
          "Энэ процесс нь гэрлийг хүчжүүлэх буюу ижил шинж чанартай олон тэрбум фотоныг нэгэн зэрэг үүсгэх боломжийг олгодог.",
        ],
      },
      {
        title: "Популяцийн урвуу байрлал",
        content: [
          "Лазер үүсэхийн тулд идэвхтэй орчин дахь өдөөгдсөн төлөвт байгаа электроны тоо үндсэн төлөвт байгаа электроноос олон байх ёстой.",
          "Үүнийг популяцийн урвуу байрлал гэх бөгөөд үүний тулд гаднаас энерги өгч электронуудыг өдөөдөг.",
        ],
      },
      {
        title: "Лазер гэрлийн гол шинж чанарууд",
        content: [
          "Монохромат чанар нь зөвхөн нэг долгионы урттай буюу маш нарийн нэг өнгөтэй байхыг хэлнэ.",
          "Когерент чанар нь бүх гэрлийн долгионууд хугацаа болон орон зайн хувьд синхрон хөдлөхийг, нарийн чиглэлт чанар нь маш бага сарнилттайгаар шулуун тарахыг хэлнэ.",
        ],
      },
      {
        title: "Лазерын үндсэн бүтэц",
        content: [
          "Лазер нь лазер үүсгэх идэвхтэй орчин, электронуудыг өдөөх энергийн үүсгүүр, болон гэрлийг ойлгож хүчжүүлэх оптик резонатор гэсэн хэсгээс бүрдэнэ.",
          "Резонатор нь хоёр талдаа байрлах толиноос бүрдэх бөгөөд нэг нь бүтэн ойлгодог, нөгөө нь гэрлийг гадагш гаргахын тулд хагас ойлгодог байна.",
        ],
      },
      {
        title: "Төрлүүд ба практик хэрэглээ",
        content: [
          "Орчин үед хийн, хатуу биеийн, шингэн болон хагас дамжуулагч лазерын төрлүүдийг шинжлэх ухаан, техникт өргөн ашиглаж байна.",
          "Хэрэглээний хувьд мэдээлэл дамжуулах шилэн кабель, мэс засал, металл зүсэх болон барилгын тэгш хэм тогтооход голчлон ашигладаг.",
        ],
      },
      {
        title: "Аюулгүй ажиллагааны дүрэм",
        content: [
          "Лазерын туяа нь нүдний торлог бүрхэвчийг маш богино хугацаанд гэмтээх аюултай тул тусгай хамгаалалтын шил заавал зүүх шаардлагатай.",
          "Хүчин чадлаас хамаарч ангилалд хуваагддаг бөгөөд өндөр зэрэглэлийн лазер нь арьс түлэх болон гал гаргах эрсдэлтэй байдаг тул сонор сэрэмжтэй ажиллах ёстой.",
        ],
      },
    ],
  },
};
