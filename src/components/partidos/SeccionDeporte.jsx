// src/components/partidos/SeccionDeporte.jsx
//
// Este componente representa UN bloque del home (ej: "Fútbol — Copa
// Mundo 2026" con sus 3 partidos debajo). Recibe ya filtrados los
// partidos que le corresponden; no sabe nada de CÓMO se filtraron,
// solo los muestra. Esto lo hace fácil de probar y reutilizar.
//
// "verTodos" es un Link hacia la página dedicada de ese deporte
// (la vamos a crear en el siguiente paso), para cuando el usuario
// quiere ver MÁS partidos de los que mostramos aquí en el home.

import { Link } from "react-router-dom";
import PartidoCard from "./PartidoCard";

export default function SeccionDeporte({
  titulo,
  icono,
  slugDeporte,
  partidos,
  seleccionesPorPartido,
  onSeleccionar,
}) {
  // Si no hay partidos para este deporte en este momento, no mostramos
  // la sección vacía (mejor experiencia que un bloque en blanco).
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
          <PartidoCard
            key={partido.id}
            partido={partido}
            seleccionActual={seleccionesPorPartido[partido.id]}
            onSeleccionar={onSeleccionar}
          />
        ))}
      </div>
    </section>
  );
}