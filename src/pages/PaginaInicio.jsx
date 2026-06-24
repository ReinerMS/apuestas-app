// src/pages/PaginaInicio.jsx
//
// SIMPLIFICADO: ya no necesitamos useState ni manejarSeleccion aquí.
// Esta página ahora solo se encarga de leer secciones.js y armar el
// home; toda la lógica de selección vive en CarritoContext.

import { partidos } from "../data/partidos";
import { deportes } from "../data/deportes";
import { secciones } from "../data/secciones";
import SeccionDeporte from "../components/partidos/SeccionDeporte";

export default function PaginaInicio() {
  const seccionesVisibles = [...secciones]
    .filter((seccion) => seccion.visible)
    .sort((a, b) => a.orden - b.orden);

  return (
    <div className="min-h-screen bg-fondo p-6">
      <h1 className="font-display text-2xl font-bold text-texto mb-1">
        Partidos disponibles
      </h1>
      <p className="text-texto-tenue mb-8">
        Selecciona una cuota para agregarla a tu apuesta
      </p>

      {seccionesVisibles.map((seccion) => {
        const deporte = deportes.find((d) => d.id === seccion.deporteId);
        const partidosDeEsteDeporte = partidos.filter(
          (p) => p.deporteId === seccion.deporteId
        );

        return (
          <SeccionDeporte
            key={seccion.id}
            titulo={seccion.titulo}
            icono={deporte?.icono}
            slugDeporte={deporte?.slug}
            partidos={partidosDeEsteDeporte}
          />
        );
      })}
    </div>
  );
}