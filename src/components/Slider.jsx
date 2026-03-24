import { useState } from "react";

export default function Slider({ slides }) {
  const [current, setCurrent] = useState(0);
  const length = slides.length;

  const nextSlide = () => {
    setCurrent(current === length - 1 ? 0 : current + 1);
  };

  const prevSlide = () => {
    setCurrent(current === 0 ? length - 1 : current - 1);
  };

  if (!Array.isArray(slides) || slides.length === 0) return null;

  return (
    // max-w-xl-ийг устгаж, h-full нэмсэн
    <div className="relative w-full h-full overflow-hidden">
      {/* Сумнуудыг илүү цэвэрхэн, хагас тунгалаг болгов */}
      <button
        onClick={prevSlide}
        className="absolute z-10 top-1/2 left-4 transform -translate-y-1/2 p-2 bg-white/50 hover:bg-white/80 rounded-full transition-all"
      >
        &#10094;
      </button>
      <button
        onClick={nextSlide}
        className="absolute z-10 top-1/2 right-4 transform -translate-y-1/2 p-2 bg-white/50 hover:bg-white/80 rounded-full transition-all"
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
              src={slide.image}
              alt={slide.alt}
              // Зургийг контейнерт дүүргэх хамгийн чухал хэсэг:
              className="w-full h-full object-cover"
            />
          )}
        </div>
      ))}
    </div>
  );
}
