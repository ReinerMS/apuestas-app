// src/pages/PaginaDeporte.jsx
//
// SIMPLIFICADO: igual que PaginaInicio, ya no manejamos selecciones
// localmente. PartidoCard se conecta solo al carrito global.

import { useParams, Link } from "react-router-dom";
import { partidos } from "../data/partidos";
import { deportes } from "../data/deportes";
import PartidoCard from "../components/partidos/PartidoCard";

export default function PaginaDeporte() {
  const { slug } = useParams();
  const deporte = deportes.find((d) => d.slug === slug);

  if (!deporte) {
    return (
      <div className="min-h-screen bg-fondo p-6 text-center">
        <p className="text-texto">No encontramos ese deporte.</p>
        <Link to="/" className="text-acento underline mt-2 inline-block">
          Volver al inicio
        </Link>
      </div>
    );
  }

  const partidosDeEsteDeporte = partidos.filter(
    (p) => p.deporteId === deporte.id
  );

  return (
    <div className="min-h-screen bg-fondo p-6">
      <Link to="/" className="text-sm text-texto-tenue hover:text-texto mb-4 inline-block">
        ← Volver al inicio
      </Link>

      <h1 className="font-display text-2xl font-bold text-texto mb-6 flex items-center gap-2">
        <span aria-hidden="true">{deporte.icono}</span>
        {deporte.nombre}
      </h1>

      {partidosDeEsteDeporte.length === 0 ? (
        <p className="text-texto-tenue">No hay partidos disponibles ahora.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {partidosDeEsteDeporte.map((partido) => (
            <PartidoCard key={partido.id} partido={partido} />
          ))}
        </div>
      )}
    </div>
  );
}