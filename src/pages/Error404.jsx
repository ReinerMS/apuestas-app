// src/pages/PaginaNoEncontrada.jsx
//
// Esta es la página que se muestra cuando la URL no coincide con
// NINGUNA ruta definida en App.jsx (ej: /esto-no-existe).
//
// "Interactiva" aquí significa: tiene una animación CSS (el balón
// rebotando) y un pequeño chiste visual conectado a nuestra marca de
// apuestas (mostramos una "cuota" absurdamente baja de encontrar la
// página, reforzando el tema en vez de ser un error genérico).
//
// useNavigate() es un hook de react-router-dom que nos permite mandar
// al usuario a otra página mediante código (no solo con un <Link> que
// el usuario clickea). Lo usamos en el botón "Volver al inicio".

import { useNavigate } from "react-router-dom";

export default function Error404() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-fondo flex flex-col items-center justify-center p-6 text-center">
      {/* El balón rebotando. La animación está definida en index.css
          como "animate-rebote", reutilizando el mismo patrón que usamos
          para la línea pulsante del logo. */}
      <div className="text-7xl mb-6 animate-rebote select-none" aria-hidden="true">
        ⚽
      </div>

      <h1 className="font-display text-5xl font-bold text-texto mb-2">
        404
      </h1>

      <p className="text-texto text-lg mb-1">
        Esta jugada no existe.
      </p>
      <p className="text-texto-tenue mb-6 max-w-sm">
        La página que buscas se fue al descanso y no va a volver. Revisa la
        dirección o vuelve al inicio.
      </p>

      {/* El chiste de la cuota: refuerza la marca sin ser intrusivo */}
      <div className="bg-superficie border border-superficie-alta rounded-lg px-5 py-3 mb-8 inline-flex items-center gap-3">
        <span className="text-xs text-texto-tenue">
          Probabilidad de que esta página aparezca
        </span>
        <span className="text-acento font-semibold text-sm">99.00</span>
      </div>

      <button
        onClick={() => navigate("/")}
        className="text-sm font-medium text-fondo bg-acento rounded-lg px-5 py-2.5 hover:bg-acento-claro hover:-translate-y-0.5 transition-all"
      >
        Volver al inicio
      </button>
    </div>
  );
}