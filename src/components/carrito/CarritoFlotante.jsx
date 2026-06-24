// src/components/carrito/CarritoFlotante.jsx
//
// Este componente coordina 4 piezas:
// 1. Un botón flotante (siempre visible) que muestra cuántas
//    selecciones tienes, y al hacer click abre el panel.
// 2. El panel deslizable con PanelCarrito adentro.
// 3. El modal de pago, que se abre al confirmar SOLO si hay sesión.
// 4. La redirección a /login si NO hay sesión, guardando la ruta
//    actual para volver al carrito después de loguearse.
//
// Vive en App.jsx (fuera de las rutas), para que esté disponible en
// TODAS las páginas, igual que la barra de navegación.

import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useCarrito } from "../../context/CarritoContext";
import { useAuth } from "../../context/AuthContext";
import PanelCarrito from "./PanelCarrito";
import ModalMetodosPago from "./ModalMetodosPago";

export default function CarritoFlotante() {
  const { selecciones, vaciarCarrito } = useCarrito();
  const { estaAutenticado } = useAuth();
  const [panelAbierto, setPanelAbierto] = useState(false);
  const [modalPagoAbierto, setModalPagoAbierto] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const montoTotal = selecciones.reduce((suma, s) => suma + (s.monto || 0), 0);

  // Aquí está la regla que pediste: ver el carrito y calcular NO
  // requiere sesión (por eso el panel se abre libremente con
  // setPanelAbierto). Pero CONFIRMAR sí la requiere.
  function manejarConfirmar() {
    if (!estaAutenticado) {
      // Cerramos el panel y mandamos a login, guardando en el state
      // de la navegación la ruta actual ("location.pathname"), para
      // que PaginaLogin sepa a dónde regresar después de loguearse.
      setPanelAbierto(false);
      navigate("/login", { state: { desde: location.pathname } });
      return;
    }

    setModalPagoAbierto(true);
  }

  function manejarPagoConfirmado() {
    setModalPagoAbierto(false);
    setPanelAbierto(false);
    vaciarCarrito();
    // En la Fase 5, aquí vamos a GUARDAR la apuesta de verdad en
    // Supabase. Por ahora, confirmamos visualmente con una alerta.
    alert("¡Apuesta confirmada! (simulación, sin dinero real todavía)");
  }

  return (
    <>
      {selecciones.length > 0 && (
        <button
          onClick={() => setPanelAbierto(true)}
          className="fixed bottom-5 right-5 bg-acento text-fondo rounded-full px-5 py-3.5 shadow-lg flex items-center gap-2 font-medium text-sm hover:bg-acento-claro hover:-translate-y-0.5 transition-all z-40"
        >
          <span aria-hidden="true">🧾</span>
          {selecciones.length}{" "}
          {selecciones.length === 1 ? "selección" : "selecciones"}
        </button>
      )}

      {panelAbierto && (
        <div
          className="fixed inset-0 bg-black/50 z-40"
          onClick={() => setPanelAbierto(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="fixed top-0 right-0 h-full w-full sm:w-96 bg-fondo p-5 overflow-y-auto"
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-display text-xl font-bold text-texto">
                Carrito
              </h2>
              <button
                onClick={() => setPanelAbierto(false)}
                aria-label="Cerrar carrito"
                className="text-texto-tenue hover:text-texto text-lg"
              >
                ✕
              </button>
            </div>

            <PanelCarrito onConfirmar={manejarConfirmar} />
          </div>
        </div>
      )}

      {modalPagoAbierto && (
        <ModalMetodosPago
          montoTotal={montoTotal}
          onCerrar={() => setModalPagoAbierto(false)}
          onPagoConfirmado={manejarPagoConfirmado}
        />
      )}
    </>
  );
}