// src/components/partidos/SeccionDeporte.jsx
//
// SIMPLIFICADO: ya no recibe "seleccionesPorPartido" ni "onSeleccionar".
// PartidoCard ahora se conecta solo al carrito mediante useCarrito(),
// así que este componente vuelve a ser más simple: solo organiza el
// título y la cuadrícula de tarjetas.

import { Link } from "react-router-dom";
import PartidoCard from "./PartidoCard";

export default function SeccionDeporte({ titulo, icono, slugDeporte, partidos }) {
  if (!partidos || partidos.length === 0) return null;

  return (
    <section className="mb-10">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-display text-xl font-bold text-texto flex items-center gap-2">
          <span aria-hidden="true">{icono}</span>
          {titulo}
        </h2>

        <Link
          to={`/deporte/${slugDeporte}`}
          className="text-sm font-medium text-acento hover:text-acento-claro transition-colors"
        >
          Ver todos →
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {partidos.map((partido) => (
          <PartidoCard key={partido.id} partido={partido} />
        ))}
      </div>
    </section>
  );
}