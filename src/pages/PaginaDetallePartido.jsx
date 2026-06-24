// src/pages/PaginaDetallePartido.jsx
//
// Esta es la página a la que llegas al hacer click en un partido.
// Usa useParams (igual que PaginaDeporte) para leer el ID del partido
// desde la URL (/partido/1, /partido/2, etc.) y buscarlo en partidos.js.
//
// Si el partido tiene "mercados" (fútbol, por ahora), los mostramos
// todos usando BloqueMercado. Si no los tiene (básquet/tenis/béisbol
// por ahora), mostramos un mensaje en vez de una página vacía confusa.

import { useParams, Link } from "react-router-dom";
import { partidos } from "../data/partidos";
import BloqueMercado from "../components/partidos/BloqueMercado";

export default function PaginaDetallePartido() {
  const { id } = useParams();

  // Los parámetros de useParams() siempre llegan como texto (string),
  // aunque en partidos.js los id sean números. Por eso convertimos con
  // Number() antes de comparar — si no, "1" === 1 sería false en JS.
  const partido = partidos.find((p) => p.id === Number(id));

  if (!partido) {
    return (
      <div className="min-h-screen bg-fondo p-6 text-center">
        <p className="text-texto">No encontramos ese partido.</p>
        <Link to="/" className="text-acento underline mt-2 inline-block">
          Volver al inicio
        </Link>
      </div>
    );
  }

  const fechaFormateada = new Date(partido.fecha).toLocaleString("es-CR", {
    weekday: "long",
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className="min-h-screen bg-fondo p-6">
      <Link
        to="/"
        className="text-sm text-texto-tenue hover:text-texto mb-4 inline-block"
      >
        ← Volver
      </Link>

      <div className="mb-6">
        <p className="text-xs text-texto-tenue mb-1">{partido.torneo}</p>
        <h1 className="font-display text-2xl font-bold text-texto">
          {partido.equipoLocal} vs {partido.equipoVisita}
        </h1>
        <p className="text-sm text-texto-tenue mt-1 capitalize">
          {fechaFormateada}
        </p>
      </div>

      <div className="bg-superficie border border-superficie-alta rounded-xl p-5 max-w-xl">
        {partido.mercados && partido.mercados.length > 0 ? (
          // Recorremos TODOS los mercados del partido. Cada uno se
          // dibuja con el mismo componente BloqueMercado, sin importar
          // si tiene 2 o 3 opciones — esa es la ventaja del modelo de
          // datos que armamos.
          partido.mercados.map((mercado) => (
            <BloqueMercado
              key={mercado.clave}
              partido={partido}
              mercado={mercado}
            />
          ))
        ) : (
          <p className="text-texto-tenue text-sm">
            Por ahora este deporte solo tiene el mercado principal
            disponible. Vuelve a la sección del deporte para apostar ahí.
          </p>
        )}
      </div>
    </div>
  );
}