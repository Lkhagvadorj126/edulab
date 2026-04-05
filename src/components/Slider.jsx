import { useState } from "react";

export default function Slider({ slides = [] }) {
  // 1. Анхны утгыг хоосон массив болгож оноов
  const [current, setCurrent] = useState(0);

  // 2. slides байгаа эсэхийг шалгаж length-ийг авна
  const length = slides?.length || 0;

  const nextSlide = () => {
    if (length === 0) return;
    setCurrent(current === length - 1 ? 0 : current + 1);
  };

  const prevSlide = () => {
    if (length === 0) return;
    setCurrent(current === 0 ? length - 1 : current - 1);
  };

  // 3. Хэрэв дата байхгүй бол ямар нэг зүйл зурахгүй (null)
  if (!Array.isArray(slides) || slides.length === 0) {
    return (
      <div className="w-full h-full bg-slate-100 flex items-center justify-center text-slate-400">
        Зураг ачаалж байна...
      </div>
    );
  }

  return (
    <div className="relative w-full h-full overflow-hidden">
      {/* Сумнууд */}
      <button
        onClick={prevSlide}
        className="absolute z-10 top-1/2 left-4 -translate-y-1/2 p-2 bg-white/50 hover:bg-white/80 rounded-full transition-all"
      >
        &#10094;
      </button>
      <button
        onClick={nextSlide}
        className="absolute z-10 top-1/2 right-4 -translate-y-1/2 p-2 bg-white/50 hover:bg-white/80 rounded-full transition-all"
      >
        &#10095;
      </button>

      {slides.map((slide, index) => (
        <div
          key={index}
          className={`${
            index === current ? "opacity-100" : "opacity-0 absolute"
          } transition-opacity duration-500 w-full h-full`}
        >
          {index === current && (
            <img
              src={slide.img || slide.image} // Таны LessonTemplateP дээр 'img' гэж байгаа тул хоёуланг нь шалгав
              alt={slide.title || slide.alt}
              className="w-full h-full object-cover"
            />
          )}
        </div>
      ))}
    </div>
  );
}
