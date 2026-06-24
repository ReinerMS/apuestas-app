// src/components/partidos/PartidoCard.jsx
//
// NUEVO: este componente ahora soporta dos modalidades de cuotas:
// - "1x2": tres opciones (local, empate, visita) — fútbol
// - "2vias": dos opciones (local, visita) — básquet, tenis, béisbol
//
// En vez de tener componentes separados para cada deporte, leemos
// "partido.modalidad" y decidimos cuántos botones mostrar. Esto es más
// mantenible: un solo componente sirve para todos los deportes.

function BotonCuota({ etiqueta, valor, seleccionado, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`flex flex-col items-center justify-center rounded-lg py-2.5 px-1 transition-all duration-200
        ${seleccionado
          ? "bg-acento text-fondo scale-[1.02]"
          : "bg-superficie-alta text-texto hover:bg-superficie-alta/70"
        }`}
    >
      <span className="text-base font-semibold">{valor.toFixed(2)}</span>
      <span className="text-xs opacity-80 truncate max-w-full">{etiqueta}</span>
    </button>
  );
}

export default function PartidoCard({ partido, seleccionActual, onSeleccionar }) {
  const { equipoLocal, equipoVisita, torneo, cuotas, fecha, modalidad } = partido;

  const fechaFormateada = new Date(fecha).toLocaleString("es-CR", {
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  });

  // Decidimos si hay empate o no, según la modalidad. Esto controla
  // tanto CUÁNTOS botones se ven como el ancho de la cuadrícula
  // (grid-cols-3 vs grid-cols-2).
  const tieneEmpate = modalidad === "1x2";

  return (
    <div className="bg-superficie rounded-xl border border-superficie-alta p-4 w-full transition-transform duration-200 hover:-translate-y-0.5">
      <div className="flex justify-between items-center mb-2">
        <span className="text-xs text-texto-tenue">{torneo}</span>
        <span className="text-xs text-texto-tenue">{fechaFormateada}</span>
      </div>

      <h3 className="font-display text-base font-bold text-texto mb-2">
        {equipoLocal} <span className="text-texto-tenue font-normal">vs</span>{" "}
        {equipoVisita}
      </h3>

      <div className={`grid gap-2 ${tieneEmpate ? "grid-cols-3" : "grid-cols-2"}`}>
        <BotonCuota
          etiqueta={equipoLocal}
          valor={cuotas.local}
          seleccionado={seleccionActual === "local"}
          onClick={() => onSeleccionar(partido, "local", cuotas.local)}
        />

        {/* Solo mostramos el botón de empate si la modalidad lo permite.
            Esto es un "renderizado condicional": el && hace que React
            no muestre nada si tieneEmpate es false. */}
        {tieneEmpate && (
          <BotonCuota
            etiqueta="Empate"
            valor={cuotas.empate}
            seleccionado={seleccionActual === "empate"}
            onClick={() => onSeleccionar(partido, "empate", cuotas.empate)}
          />
        )}

        <BotonCuota
          etiqueta={equipoVisita}
          valor={cuotas.visita}
          seleccionado={seleccionActual === "visita"}
          onClick={() => onSeleccionar(partido, "visita", cuotas.visita)}
        />
      </div>
    </div>
  );
}