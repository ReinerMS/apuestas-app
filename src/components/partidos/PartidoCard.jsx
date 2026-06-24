// src/components/partidos/PartidoCard.jsx
//
// NUEVO: el encabezado del partido (torneo, equipos, fecha) ahora es
// un <Link> que lleva a la página de detalle con TODOS los mercados.
// Los botones de cuota siguen funcionando igual (seleccionar en el
// carrito directo desde el home), sin conflicto: son áreas separadas
// dentro de la misma tarjeta, cada una con su propio comportamiento.
//
// "Ver más mercados →" es la pista visual de que hay más contenido al
// hacer click, para que no sea un misterio para el usuario.

import { Link } from "react-router-dom";
import { useCarrito } from "../../context/CarritoContext";

function BotonCuota({ etiqueta, valor, seleccionado, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`flex flex-col items-center justify-center rounded-lg py-2.5 px-1 transition-all duration-200
        ${
          seleccionado
            ? "bg-acento text-fondo scale-[1.02]"
            : "bg-superficie-alta text-texto hover:bg-superficie-alta/70"
        }`}
    >
      <span className="text-base font-semibold">{valor.toFixed(2)}</span>
      <span className="text-xs opacity-80 truncate max-w-full">{etiqueta}</span>
    </button>
  );
}

export default function PartidoCard({ partido }) {
  const { equipoLocal, equipoVisita, torneo, cuotas, fecha, modalidad, mercados } =
    partido;
  const { obtenerSeleccionDe, alternarSeleccion } = useCarrito();

  const seleccionActual = obtenerSeleccionDe(partido.id);
  const tieneEmpate = modalidad === "1x2";

  // Solo mostramos el enlace "Ver más mercados" si el partido
  // realmente tiene el campo "mercados" cargado (por ahora, solo
  // fútbol lo tiene). Así evitamos un enlace que lleve a una página
  // vacía para básquet/tenis/béisbol.
  const tieneMercadosExtendidos = mercados && mercados.length > 0;

  const fechaFormateada = new Date(fecha).toLocaleString("es-CR", {
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  });

  function manejarClick(tipo, cuotaValor, etiquetaSeleccion) {
    alternarSeleccion({
      partidoId: partido.id,
      equipoLocal,
      equipoVisita,
      tipo,
      etiquetaSeleccion,
      cuota: cuotaValor,
    });
  }

  return (
    <div className="bg-superficie rounded-xl border border-superficie-alta p-4 w-full transition-transform duration-200 hover:-translate-y-0.5">
      <div className="flex justify-between items-center mb-2">
        <span className="text-xs text-texto-tenue">{torneo}</span>
        <span className="text-xs text-texto-tenue">{fechaFormateada}</span>
      </div>

      {/* Este bloque es el que lleva al detalle. Usamos "group" de
          Tailwind para que, al pasar el mouse por CUALQUIER parte de
          este Link, el texto "Ver más mercados" cambie de color
          también (group-hover), dando la sensación de que todo el
          bloque es una sola unidad clickeable. */}
      <Link to={`/partido/${partido.id}`} className="group block mb-3">
        <h3 className="font-display text-base font-bold text-texto group-hover:text-acento transition-colors">
          {equipoLocal} <span className="text-texto-tenue font-normal">vs</span>{" "}
          {equipoVisita}
        </h3>
        {tieneMercadosExtendidos && (
          <span className="text-xs text-texto-tenue group-hover:text-acento transition-colors">
            Ver más mercados →
          </span>
        )}
      </Link>

      <div className={`grid gap-2 ${tieneEmpate ? "grid-cols-3" : "grid-cols-2"}`}>
        <BotonCuota
          etiqueta={equipoLocal}
          valor={cuotas.local}
          seleccionado={seleccionActual === "local"}
          onClick={() => manejarClick("local", cuotas.local, equipoLocal)}
        />

        {tieneEmpate && (
          <BotonCuota
            etiqueta="Empate"
            valor={cuotas.empate}
            seleccionado={seleccionActual === "empate"}
            onClick={() => manejarClick("empate", cuotas.empate, "Empate")}
          />
        )}

        <BotonCuota
          etiqueta={equipoVisita}
          valor={cuotas.visita}
          seleccionado={seleccionActual === "visita"}
          onClick={() => manejarClick("visita", cuotas.visita, equipoVisita)}
        />
      </div>
    </div>
  );
}