// src/components/carrito/ModalMetodosPago.jsx
//
// Este es el popup que pediste para confirmar/pagar la apuesta.
// IMPORTANTE (seguridad, lo que hablamos antes): este modal por ahora
// es una SIMULACIÓN visual. No procesa pagos reales todavía —
// eso requeriría una pasarela de pago real (Stripe, etc.) y, como
// hablamos al inicio, no estamos construyendo dinero real.
//
// En la Fase 5/6 (con Supabase), este modal va a conectar con el saldo
// virtual del usuario en la base de datos. Por ahora, deja ver el
// FLUJO completo (elegir método → validar → confirmar) con datos de
// prueba, que es la base sobre la que conectaremos lo real después.

import { useState } from "react";
import { formatearMoneda } from "../../utils/calcularGanancia";

const metodosPago = [
  { id: "tarjeta", nombre: "Tarjeta de crédito/débito", icono: "💳" },
  { id: "sinpe", nombre: "SINPE Móvil", icono: "📱" },
  { id: "saldo", nombre: "Saldo en la plataforma", icono: "🪙" },
];

export default function ModalMetodosPago({
  montoTotal,
  onCerrar,
  onPagoConfirmado,
}) {
  const [metodoElegido, setMetodoElegido] = useState(null);
  const [validando, setValidando] = useState(false);

  // Simulamos una validación con un pequeño retraso, para que se
  // sienta como un proceso real de verificación (igual que pasaría al
  // conectar con una pasarela de pago de verdad). setTimeout ejecuta
  // código después de cierto tiempo, sin congelar el resto de la app.
  function manejarConfirmar() {
    if (!metodoElegido) return;

    setValidando(true);

    setTimeout(() => {
      setValidando(false);
      onPagoConfirmado();
    }, 1200);
  }

  return (
    // Fondo oscuro semitransparente que cubre toda la pantalla.
    // onClick en el fondo cierra el modal (clickear "afuera" lo cierra,
    // un patrón estándar de UX).
    <div
      className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50"
      onClick={onCerrar}
    >
      {/* stopPropagation evita que un click DENTRO del modal se
          "propague" hacia el fondo y lo cierre por accidente. */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-superficie border border-superficie-alta rounded-xl p-6 w-full max-w-sm"
      >
        <h3 className="font-display text-lg font-bold text-texto mb-1">
          Confirmar pago
        </h3>
        <p className="text-sm text-texto-tenue mb-5">
          Vas a pagar{" "}
          <span className="text-acento font-semibold">
            {formatearMoneda(montoTotal)}
          </span>
        </p>

        <div className="flex flex-col gap-2 mb-6">
          {metodosPago.map((metodo) => (
            <button
              key={metodo.id}
              onClick={() => setMetodoElegido(metodo.id)}
              className={`flex items-center gap-3 rounded-lg px-4 py-3 text-left text-sm transition-all
                ${
                  metodoElegido === metodo.id
                    ? "bg-acento/15 border border-acento text-texto"
                    : "bg-superficie-alta/50 border border-transparent text-texto hover:bg-superficie-alta"
                }`}
            >
              <span aria-hidden="true" className="text-lg">
                {metodo.icono}
              </span>
              {metodo.nombre}
            </button>
          ))}
        </div>

        <div className="flex gap-3">
          <button
            onClick={onCerrar}
            disabled={validando}
            className="flex-1 rounded-lg py-2.5 text-sm font-medium text-texto border border-superficie-alta hover:bg-superficie-alta transition-colors"
          >
            Cancelar
          </button>
          <button
            onClick={manejarConfirmar}
            disabled={!metodoElegido || validando}
            className={`flex-1 rounded-lg py-2.5 text-sm font-medium transition-all
              ${
                metodoElegido && !validando
                  ? "bg-acento text-fondo hover:bg-acento-claro"
                  : "bg-superficie-alta text-texto-tenue cursor-not-allowed"
              }`}
          >
            {validando ? "Validando..." : "Pagar"}
          </button>
        </div>
      </div>
    </div>
  );
}