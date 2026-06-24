// src/utils/calcularGanancia.js
//
// Esta función NO usa React, NO usa useState, no sabe nada de pantallas.
// Solo recibe números y devuelve un número. Eso se llama una "función pura":
// siempre que le das los mismos datos de entrada, te da el mismo resultado.
//
// ¿Por qué separarla así, en su propio archivo?
// 1) Es muy fácil de probar (testear) sola, sin necesidad de abrir el navegador.
// 2) La vamos a reutilizar en varios lugares: el carrito, el historial, etc.
// 3) Si el día de mañana cambia la fórmula (ej. agregamos comisión),
//    solo tocamos este archivo, no cada componente que la usa.

// LÍMITES DE APUESTA
//
// Los definimos como constantes EXPORTADAS (no como números sueltos
// escritos directo en cada componente) por una razón importante:
// cuando conectemos Supabase en la Fase 4-5, el backend va a necesitar
// estos MISMOS valores para revalidar (recuerda la regla de oro: nunca
// confiar solo en lo que valida el frontend). Tener un solo lugar con
// la verdad evita que el frontend diga "mínimo 1000" y el backend
// piense otra cosa.
export const MONTO_MINIMO = 1000;
export const MONTO_MAXIMO = 50000;

/**
 * Revisa si un monto está dentro del rango permitido para apostar.
 * Devuelve un objeto con el resultado Y un mensaje listo para mostrar,
 * para no repetir esa lógica de texto en cada componente que lo use.
 *
 * @param {number} monto
 * @returns {{ valido: boolean, mensaje: string | null }}
 */
export function validarMontoApuesta(monto) {
  if (!monto || monto <= 0) {
    return { valido: false, mensaje: "Ingresa un monto para apostar." };
  }

  if (monto < MONTO_MINIMO) {
    return {
      valido: false,
      mensaje: `El monto mínimo es ${formatearMoneda(MONTO_MINIMO)}.`,
    };
  }

  if (monto > MONTO_MAXIMO) {
    return {
      valido: false,
      mensaje: `El monto máximo por selección es ${formatearMoneda(MONTO_MAXIMO)}.`,
    };
  }

  return { valido: true, mensaje: null };
}

/**
 * Calcula cuánto se ganaría (monto total, incluyendo lo apostado)
 * dado un monto apostado y una cuota.
 *
 * Ejemplo: apostar 1000 con cuota 1.5 → devuelve 1500
 *
 * @param {number} monto - cuánto dinero apuesta el usuario
 * @param {number} cuota - la cuota de esa selección (ej. 1.5)
 * @returns {number} ganancia potencial total
 */
export function calcularGanancia(monto, cuota) {
  if (monto <= 0 || cuota <= 0) return 0;
  return monto * cuota;
}

/**
 * Calcula la cuota combinada cuando el usuario selecciona varios partidos
 * a la vez (lo que en las casas de apuestas se llama "combinada" o "parlay").
 *
 * Ejemplo: seleccionar cuota 1.5 y cuota 2.0 → cuota combinada = 3.0
 *
 * @param {number[]} cuotas - arreglo con todas las cuotas seleccionadas
 * @returns {number} cuota combinada (multiplicación de todas)
 */
export function calcularCuotaCombinada(cuotas) {
  if (!cuotas || cuotas.length === 0) return 0;
  return cuotas.reduce((acumulado, cuotaActual) => acumulado * cuotaActual, 1);
}

/**
 * Formatea un número como dinero, para mostrarlo bonito en pantalla.
 * Ejemplo: 1500 → "₡1,500.00"
 *
 * @param {number} valor
 * @returns {string}
 */
export function formatearMoneda(valor) {
  return new Intl.NumberFormat("es-CR", {
    style: "currency",
    currency: "CRC",
  }).format(valor);
}