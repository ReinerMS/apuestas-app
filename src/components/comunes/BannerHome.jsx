import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import banner1 from "@/assets/banners/banner1.jpg";
import banner2 from "@/assets/banners/banner2.jpg";

const slides = [
  {
    image: banner1,
    title: "Las mejores cuotas",
    subtitle: "Registro fácil y rápido",
    button: "Registrarme",
    link: "/registro",
  },
  {
    image: banner2,
    title: "Justo ahora",
    subtitle: "Ingresa para ganar",
    button: "Iniciar Sesión",
    link: "/login",
  },
];

export default function BannerHome() {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (paused) return;

    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [paused]);

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <section
      className="relative w-full h-137.5 overflow-hidden rounded-3xl shadow-2xl"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Slides */}
      <div
        className="flex h-full transition-transform duration-700 ease-in-out"
        style={{
          transform: `translateX(-${current * 100}%)`,
        }}
      >
        {slides.map((slide, index) => (
          <div
            key={index}
            className="relative min-w-full h-full overflow-hidden"
          >
            {/* Imagen */}
            <img
              src={slide.image}
              alt={slide.title}
              className={`w-full h-full object-cover transition-transform duration-7000 ${current === index ? "scale-110" : "scale-100"
                }`}
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-linear-to-r from-black/80 via-black/40 to-transparent" />

            {/* Contenido */}
            <div className="absolute inset-0 flex items-center">
              <div className="max-w-3xl px-8 md:px-16">
                <span className="inline-block px-4 py-1 mb-4 text-sm font-semibold rounded-full bg-yellow-500 text-black ml-4">
                  SPORTS BETTING
                </span>

                <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-4 ml-4">
                  {slide.title}
                </h1>

                <p className="text-lg md:text-xl text-gray-200 mb-8 ml-4">
                  {slide.subtitle}
                </p>

                <button
                  onClick={() => navigate(slide.link)}
                  className="px-8 py-4 rounded-xl bg-green-500 hover:bg-green-600 text-white font-bold transition-all ml-4">

                  {slide.button}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Flecha izquierda */}
      <button
        onClick={prevSlide}
        className="absolute left-6 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-black/40 hover:bg-black/70 backdrop-blur-sm text-white text-xl"
      >
        ❮
      </button>

      {/* Flecha derecha */}
      <button
        onClick={nextSlide}
        className="absolute right-6 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-black/40 hover:bg-black/70 backdrop-blur-sm text-white text-xl"
      >
        ❯
      </button>

      {/* Indicadores */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-20">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`transition-all duration-300 ${current === index
              ? "w-10 h-3 rounded-full bg-white"
              : "w-3 h-3 rounded-full bg-white/40"
              }`}
          />
        ))}
      </div>
    </section>
  );
}