// src/components/partidos/BloqueMercado.jsx
//
// Este componente dibuja UN mercado completo (su nombre + todas sus
// opciones como botones). Funciona igual sin importar si el mercado
// tiene 2 opciones (Sí/No) o 3 (Local/Empate/Visita) — por eso
// pudimos diseñar el modelo de datos con la misma forma para todos.
//
// "claveSeleccionMercado" identifica de forma única esta combinación
// partido+mercado dentro del carrito (ej: "1-total_goles"), porque
// ahora un mismo partido puede tener VARIAS selecciones activas a la
// vez (una por 1x2, otra por total de goles), a diferencia de antes
// donde solo podía haber una selección por partido.

import { useCarrito } from "../../context/CarritoContext";

export default function BloqueMercado({ partido, mercado }) {
  const { obtenerSeleccionMercado, alternarSeleccionMercado } = useCarrito();

  const seleccionActual = obtenerSeleccionMercado(partido.id, mercado.clave);

  function manejarClick(opcion) {
    alternarSeleccionMercado({
      partidoId: partido.id,
      equipoLocal: partido.equipoLocal,
      equipoVisita: partido.equipoVisita,
      mercadoClave: mercado.clave,
      mercadoNombre: mercado.nombre,
      etiquetaSeleccion: opcion.etiqueta,
      cuota: opcion.cuota,
    });
  }

  return (
    <div className="mb-5">
      <h4 className="text-sm font-medium text-texto-tenue mb-2">
        {mercado.nombre}
      </h4>

      {/* El grid se ajusta según cuántas opciones tenga ESTE mercado
          en particular (2 o 3), no según el modalidad del partido
          completo como hacíamos antes en PartidoCard. */}
      <div
        className={`grid gap-2 ${
          mercado.opciones.length === 3 ? "grid-cols-3" : "grid-cols-2"
        }`}
      >
        {mercado.opciones.map((opcion) => {
          const estaSeleccionada = seleccionActual === opcion.etiqueta;

          return (
            <button
              key={opcion.etiqueta}
              onClick={() => manejarClick(opcion)}
              className={`flex flex-col items-center justify-center rounded-lg py-2.5 px-1 transition-all duration-200
                ${
                  estaSeleccionada
                    ? "bg-acento text-fondo scale-[1.02]"
                    : "bg-superficie-alta text-texto hover:bg-superficie-alta/70"
                }`}
            >
              <span className="text-base font-semibold">
                {opcion.cuota.toFixed(2)}
              </span>
              <span className="text-xs opacity-80 truncate max-w-full">
                {opcion.etiqueta}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}