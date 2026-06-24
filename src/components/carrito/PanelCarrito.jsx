// src/components/carrito/PanelCarrito.jsx
//
// Este es el panel visual del carrito. Por cada selección, mostramos
// CLARAMENTE:
// - Qué partido y qué elegiste (ej: "Argentina (Local)")
// - Con qué cuota
// - Un input para escribir cuánto quieres apostar (con límites)
// - Cuánto ganarías con ese monto (se recalcula al teclear)
//
// Al final, un resumen TOTAL: cuánto apostaste en total entre todas
// las selecciones, y cuánto ganarías en total si todas resultan
// ganadoras (apuestas simples = independientes entre sí).

import { useCarrito } from "../../context/CarritoContext";
import {
  calcularGanancia,
  formatearMoneda,
  validarMontoApuesta,
  MONTO_MINIMO,
  MONTO_MAXIMO,
} from "../../utils/calcularGanancia";

export default function PanelCarrito({ onConfirmar }) {
  const { selecciones, actualizarMonto, quitarSeleccion } = useCarrito();

  if (selecciones.length === 0) {
    return (
      <div className="bg-superficie border border-superficie-alta rounded-xl p-5 text-center">
        <p className="text-texto-tenue text-sm">
          Tu carrito está vacío. Selecciona una cuota para empezar a apostar.
        </p>
      </div>
    );
  }

  const montoTotal = selecciones.reduce((suma, s) => suma + (s.monto || 0), 0);

  const gananciaTotal = selecciones.reduce(
    (suma, s) => suma + calcularGanancia(s.monto || 0, s.cuota),
    0
  );

  // CAMBIO: antes solo revisábamos "monto > 0". Ahora usamos
  // validarMontoApuesta, que también revisa el mínimo y el máximo.
  // .every() devuelve true solo si TODAS las selecciones son válidas.
  const todosLosMontosValidos = selecciones.every(
    (s) => validarMontoApuesta(s.monto).valido
  );

  return (
    <div className="bg-superficie border border-superficie-alta rounded-xl p-5">
      <h3 className="font-display text-lg font-bold text-texto mb-1">
        Tu apuesta
      </h3>
      <p className="text-xs text-texto-tenue mb-1">
        {selecciones.length}{" "}
        {selecciones.length === 1 ? "selección" : "selecciones"} — cada una se
        paga por separado
      </p>
      {/* Mostramos el rango permitido de una vez, arriba, para que el
          usuario lo sepa ANTES de escribir un monto inválido. */}
      <p className="text-xs text-texto-tenue mb-4">
        Monto permitido por selección: {formatearMoneda(MONTO_MINIMO)} —{" "}
        {formatearMoneda(MONTO_MAXIMO)}
      </p>

      <div className="flex flex-col gap-3 mb-4">
        {selecciones.map((seleccion) => (
          <ItemCarrito
            key={seleccion.claveUnica}
            seleccion={seleccion}
            onCambiarMonto={(nuevoMonto) =>
              actualizarMonto(seleccion.claveUnica, nuevoMonto)
            }
            onQuitar={() => quitarSeleccion(seleccion.claveUnica)}
          />
        ))}
      </div>

      <div className="border-t border-superficie-alta pt-4 flex flex-col gap-1.5">
        <div className="flex justify-between text-sm">
          <span className="text-texto-tenue">Total a pagar</span>
          <span className="text-texto font-medium">
            {formatearMoneda(montoTotal)}
          </span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-texto-tenue">Ganancia total si aciertas todo</span>
          <span className="text-acento font-semibold">
            {formatearMoneda(gananciaTotal)}
          </span>
        </div>
      </div>

      <button
        onClick={onConfirmar}
        disabled={!todosLosMontosValidos}
        className={`w-full mt-5 rounded-lg py-3 text-sm font-medium transition-all
          ${
            todosLosMontosValidos
              ? "bg-acento text-fondo hover:bg-acento-claro hover:-translate-y-0.5"
              : "bg-superficie-alta text-texto-tenue cursor-not-allowed"
          }`}
      >
        {todosLosMontosValidos
          ? `Confirmar y pagar ${formatearMoneda(montoTotal)}`
          : "Revisa los montos de tu apuesta"}
      </button>
    </div>
  );
}

// Componente interno: una fila del carrito.
function ItemCarrito({ seleccion, onCambiarMonto, onQuitar }) {
  const { equipoLocal, equipoVisita, etiquetaSeleccion, mercadoNombre, cuota, monto } =
    seleccion;

  const ganancia = calcularGanancia(monto || 0, cuota);
  const { valido, mensaje } = validarMontoApuesta(monto);
  const mostrarError = monto > 0 && !valido;

  return (
    <div className="bg-superficie-alta/50 rounded-lg p-3">
      <div className="flex justify-between items-start mb-2">
        <div>
          <p className="text-xs text-texto-tenue">
            {equipoLocal} vs {equipoVisita}
            {/* Si la selección viene de un mercado distinto al
                principal (1x2 del home), mostramos su nombre para que
                sea claro DE QUÉ mercado es esta apuesta. Ej: "Total de
                goles" — sin esto, "Más de 2.5" sin contexto sería
                confuso. */}
            {mercadoNombre && mercadoNombre !== undefined && (
              <span className="text-texto-tenue"> — {mercadoNombre}</span>
            )}
          </p>
          <p className="text-sm font-medium text-texto">
            Apuesta: <span className="text-acento">{etiquetaSeleccion}</span>{" "}
            <span className="text-texto-tenue">@ {cuota.toFixed(2)}</span>
          </p>
        </div>

        <button
          onClick={onQuitar}
          aria-label="Quitar del carrito"
          className="text-texto-tenue hover:text-vivo transition-colors text-sm px-1"
        >
          ✕
        </button>
      </div>

      <div className="flex items-center gap-3 mt-2">
        <div className="flex-1">
          <label className="text-xs text-texto-tenue block mb-1">
            Monto a apostar
          </label>
          <input
            type="number"
            min={MONTO_MINIMO}
            max={MONTO_MAXIMO}
            step="100"
            value={monto || ""}
            onChange={(e) => onCambiarMonto(Number(e.target.value))}
            placeholder={`Mín. ${MONTO_MINIMO}`}
            className={`w-full bg-fondo border rounded-md px-3 py-1.5 text-sm text-texto focus:outline-none transition-colors
              ${
                mostrarError
                  ? "border-vivo focus:border-vivo"
                  : "border-superficie-alta focus:border-acento"
              }`}
          />
          {/* Mensaje de error específico de ESTA selección */}
          {mostrarError && (
            <p className="text-[11px] text-vivo mt-1">{mensaje}</p>
          )}
        </div>

        <div className="text-right">
          <p className="text-xs text-texto-tenue mb-1">Ganarías</p>
          <p className="text-sm font-semibold text-acento">
            {formatearMoneda(ganancia)}
          </p>
        </div>
      </div>
    </div>
  );
}