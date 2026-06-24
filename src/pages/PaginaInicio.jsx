// src/pages/PaginaInicio.jsx
//
// Esta página ahora es "data-driven": en vez de tener escrito a mano
// qué deportes mostrar, LEE la configuración de secciones.js y
// construye el home dinámicamente a partir de eso.
//
// Flujo:
// 1. Tomamos las secciones, filtramos solo las "visible: true"
// 2. Las ordenamos por el campo "orden"
// 3. Por cada sección, buscamos su deporte correspondiente
// 4. Filtramos los partidos que pertenecen a ese deporte
// 5. Renderizamos un <SeccionDeporte /> por cada una

import { useState } from "react";
import { partidos } from "../data/partidos";
import { deportes } from "../data/deportes";
import { secciones } from "../data/secciones";
import SeccionDeporte from "../components/partidos/SeccionDeporte";
import BannerCarousel from "../components/comunes/BannerHome";

export default function PaginaInicio() {
  const [selecciones, setSelecciones] = useState({});

  function manejarSeleccion(partido, tipo, cuotaValor) {
    setSelecciones((anterior) => {
      // Si el tipo clickeado es el MISMO que ya estaba guardado para
      // este partido, lo quitamos (deseleccionar). Si es distinto (o
      // no había nada seleccionado), lo guardamos normalmente.
      //
      // ¿Por qué dentro del setSelecciones y no afuera? Porque
      // necesitamos leer "anterior" (el valor actual) para compararlo,
      // y la única forma segura de leer el estado más reciente dentro
      // de un setState es a través de esta función con parámetro.
      const yaEstabaSeleccionado = anterior[partido.id] === tipo;

      if (yaEstabaSeleccionado) {
        // Creamos una copia del objeto SIN la propiedad de este partido.
        const copia = { ...anterior };
        delete copia[partido.id];
        return copia;
      }

      return { ...anterior, [partido.id]: tipo };
    });

    console.log(
      "Click en:",
      partido.equipoLocal,
      "vs",
      partido.equipoVisita,
      "->",
      tipo,
      "cuota:",
      cuotaValor
    );
  }

  // Paso 1 y 2: filtrar solo visibles, y ordenar por el campo "orden".
  // [...secciones] crea una copia antes de ordenar, así no modificamos
  // el arreglo original (buena práctica: evitar "mutar" datos directamente).
  const seccionesVisibles = [...secciones]
    .filter((seccion) => seccion.visible)
    .sort((a, b) => a.orden - b.orden);

  return (



    <div className="min-h-screen bg-fondo p-6">

      <div className="mb-4">
        <BannerCarousel></BannerCarousel>
      </div>

      <h1 className="font-display text-2xl font-bold text-texto mb-1">
        Partidos disponibles
      </h1>
      <p className="text-texto-tenue mb-8">
        Selecciona una cuota para agregarla a tu apuesta
      </p>

      {/* Paso 3, 4 y 5 combinados en el .map() */}
      {seccionesVisibles.map((seccion) => {
        // Buscamos el deporte que corresponde a esta sección
        const deporte = deportes.find((d) => d.id === seccion.deporteId);

        // Filtramos solo los partidos de ese deporte
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
            seleccionesPorPartido={selecciones}
            onSeleccionar={manejarSeleccion}
          />
        );
      })}
    </div>
  );
}