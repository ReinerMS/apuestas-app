// src/pages/PaginaDeporte.jsx
//
// CONCEPTO NUEVO: useParams()
//
// Hasta ahora nuestras rutas eran fijas: "/login", "/historial". Esta
// ruta es DINÁMICA: "/deporte/:slug", donde :slug puede ser "futbol",
// "tenis", lo que sea. useParams() nos deja LEER qué valor tiene ese
// parámetro en la URL actual.
//
// Ejemplo: si la URL es /deporte/tenis, entonces useParams() nos da
// { slug: "tenis" }. Así, una sola página sirve para los 4 deportes,
// en vez de copiar/pegar 4 páginas casi iguales.

import { useParams, Link } from "react-router-dom";
import { partidos } from "../data/partidos";
import { deportes } from "../data/deportes";
import PartidoCard from "../components/partidos/PartidoCard";
import { useState } from "react";

export default function PaginaDeporte() {
  const { slug } = useParams();
  const [selecciones, setSelecciones] = useState({});

  // Buscamos el deporte cuyo slug coincide con el de la URL
  const deporte = deportes.find((d) => d.slug === slug);

  // Si alguien escribe una URL con un slug que no existe
  // (ej: /deporte/ajedrez), mostramos un mensaje claro en vez de
  // que la página se rompa o se vea vacía sin explicación.
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

  function manejarSeleccion(partido, tipo, cuotaValor) {
    setSelecciones((anterior) => {
      const yaEstabaSeleccionado = anterior[partido.id] === tipo;

      if (yaEstabaSeleccionado) {
        const copia = { ...anterior };
        delete copia[partido.id];
        return copia;
      }

      return { ...anterior, [partido.id]: tipo };
    });

    console.log(
      "Click en",
      deporte.nombre,
      "->",
      partido.equipoLocal,
      "vs",
      partido.equipoVisita,
      "tipo:",
      tipo,
      "cuota:",
      cuotaValor
    );
  }

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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
          {partidosDeEsteDeporte.map((partido) => (
            <PartidoCard
              key={partido.id}
              partido={partido}
              seleccionActual={selecciones[partido.id]}
              onSeleccionar={manejarSeleccion}
            />
          ))}
        </div>
      )}
    </div>
  );
}