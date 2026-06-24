// src/context/CarritoContext.jsx
//
// CONCEPTO: Context API (ya lo conoces de antes).
//
// CAMBIO IMPORTANTE en esta versión: antes, cada partido solo podía
// tener UNA selección activa en el carrito (1x2 nada más). Ahora que
// un partido puede tener VARIOS mercados (1x2, total de goles, ambos
// marcan...), necesitamos identificar cada selección de forma única
// combinando partidoId + mercado, no solo partidoId.
//
// Para esto, cada selección ahora tiene un campo "claveUnica", que es
// un texto como "1-1x2" o "1-total_goles" (partidoId + clave del
// mercado, unidos por un guion). Así, dos selecciones del MISMO
// partido pero de mercados DISTINTOS pueden convivir en el carrito sin
// pisarse entre sí.
//
// Mantenemos las funciones viejas (alternarSeleccion, obtenerSeleccionDe)
// intactas para que PartidoCard (el del home) siga funcionando exactamente
// igual que antes — esas seguían usando el mercado "principal" (1x2/2vías)
// con clave fija. Agregamos funciones NUEVAS (alternarSeleccionMercado,
// obtenerSeleccionMercado) para la página de detalle, que sí maneja
// múltiples mercados por partido.

import { createContext, useContext, useState } from "react";

const CarritoContext = createContext(null);

// Para que el mercado "principal" (el que ya usaba PartidoCard del home)
// tenga una clave consistente con el nuevo sistema, le damos siempre la
// clave fija "principal".
const CLAVE_MERCADO_PRINCIPAL = "principal";

export function CarritoProvider({ children }) {
  // Cada selección ahora tiene esta forma:
  // {
  //   claveUnica,       // ej: "1-principal" o "1-total_goles"
  //   partidoId,
  //   equipoLocal, equipoVisita,
  //   mercadoClave,     // ej: "1x2", "total_goles", "principal"
  //   mercadoNombre,    // texto legible, ej: "Total de goles"
  //   etiquetaSeleccion,// ej: "Argentina", "Más de 2.5"
  //   cuota,
  //   monto
  // }
  const [selecciones, setSelecciones] = useState([]);

  // --- FUNCIONES VIEJAS (las sigue usando PartidoCard del home) ---
  // Por dentro, ahora usan claveUnica con el mercado "principal", pero
  // por fuera se comportan exactamente igual que antes.

  function alternarSeleccion(datosSeleccion) {
    const claveUnica = `${datosSeleccion.partidoId}-${CLAVE_MERCADO_PRINCIPAL}`;

    setSelecciones((anterior) => {
      const yaExiste = anterior.find((s) => s.claveUnica === claveUnica);
      const esLaMismaOpcion =
        yaExiste && yaExiste.tipo === datosSeleccion.tipo;

      if (esLaMismaOpcion) {
        return anterior.filter((s) => s.claveUnica !== claveUnica);
      }

      if (yaExiste) {
        return anterior.map((s) =>
          s.claveUnica === claveUnica
            ? { ...datosSeleccion, claveUnica, monto: s.monto }
            : s
        );
      }

      return [...anterior, { ...datosSeleccion, claveUnica, monto: 0 }];
    });
  }

  function obtenerSeleccionDe(partidoId) {
    const claveUnica = `${partidoId}-${CLAVE_MERCADO_PRINCIPAL}`;
    return selecciones.find((s) => s.claveUnica === claveUnica)?.tipo;
  }

  // --- FUNCIONES NUEVAS (para la página de detalle, varios mercados) ---

  // Agrega/quita una selección de un mercado ESPECÍFICO de un partido.
  // Misma lógica que alternarSeleccion, pero la "llave" incluye el
  // mercado, así que no pisa selecciones de otros mercados del mismo
  // partido.
  function alternarSeleccionMercado(datos) {
    const claveUnica = `${datos.partidoId}-${datos.mercadoClave}`;

    setSelecciones((anterior) => {
      const yaExiste = anterior.find((s) => s.claveUnica === claveUnica);
      const esLaMismaOpcion =
        yaExiste && yaExiste.etiquetaSeleccion === datos.etiquetaSeleccion;

      if (esLaMismaOpcion) {
        return anterior.filter((s) => s.claveUnica !== claveUnica);
      }

      if (yaExiste) {
        return anterior.map((s) =>
          s.claveUnica === claveUnica
            ? { ...datos, claveUnica, monto: s.monto }
            : s
        );
      }

      return [...anterior, { ...datos, claveUnica, monto: 0 }];
    });
  }

  // Para saber, dentro de UN mercado específico de UN partido, qué
  // opción está marcada (para resaltar el botón correcto en
  // BloqueMercado).
  function obtenerSeleccionMercado(partidoId, mercadoClave) {
    const claveUnica = `${partidoId}-${mercadoClave}`;
    return selecciones.find((s) => s.claveUnica === claveUnica)
      ?.etiquetaSeleccion;
  }

  // --- FUNCIONES COMPARTIDAS (funcionan igual para ambos sistemas) ---

  function actualizarMonto(claveUnica, nuevoMonto) {
    setSelecciones((anterior) =>
      anterior.map((s) =>
        s.claveUnica === claveUnica ? { ...s, monto: nuevoMonto } : s
      )
    );
  }

  function quitarSeleccion(claveUnica) {
    setSelecciones((anterior) =>
      anterior.filter((s) => s.claveUnica !== claveUnica)
    );
  }

  function vaciarCarrito() {
    setSelecciones([]);
  }

  const valor = {
    selecciones,
    alternarSeleccion,
    obtenerSeleccionDe,
    alternarSeleccionMercado,
    obtenerSeleccionMercado,
    actualizarMonto,
    quitarSeleccion,
    vaciarCarrito,
  };

  return (
    <CarritoContext.Provider value={valor}>
      {children}
    </CarritoContext.Provider>
  );
}

export function useCarrito() {
  const contexto = useContext(CarritoContext);

  if (!contexto) {
    throw new Error("useCarrito debe usarse dentro de un <CarritoProvider>");
  }

  return contexto;
}