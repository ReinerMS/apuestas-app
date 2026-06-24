// src/data/partidos.js
//
// NUEVO: cada partido de fútbol ahora tiene un campo "mercados", que es
// un arreglo con TODOS los tipos de apuesta disponibles para ese
// partido (1x2, total de goles, ambos marcan, etc.). Cada mercado
// tiene esta forma:
//   { clave, nombre, opciones: [{ etiqueta, cuota }, ...] }
//
// Mantenemos también "cuotas" (el mercado principal 1x2/2vías) porque
// PartidoCard, en el home, sigue mostrando solo ESE mercado resumido —
// no queremos que la tarjeta chica del home se llene de 4 mercados a
// la vez. El campo "mercados" completo se usa en la página de DETALLE
// del partido, a la que se llega haciendo click en la tarjeta.
//
// Básquet/tenis/béisbol por ahora siguen solo con "cuotas" (sin
// mercados extendidos) — los podemos ampliar después con el mismo
// patrón si quieres.

export const partidos = [
  // ---------- FÚTBOL (deporteId: 1) — con mercados extendidos ----------
  {
    id: 1,
    deporteId: 1,
    modalidad: "1x2",
    torneo: "Copa Mundo 2026",
    equipoLocal: "Argentina",
    equipoVisita: "Austria",
    fecha: "2026-06-22T11:00:00",
    cuotas: { local: 1.5, empate: 4.0, visita: 7.5 },
    mercados: [
      {
        clave: "1x2",
        nombre: "Resultado del partido",
        opciones: [
          { etiqueta: "Argentina", cuota: 1.5 },
          { etiqueta: "Empate", cuota: 4.0 },
          { etiqueta: "Austria", cuota: 7.5 },
        ],
      },
      {
        clave: "total_goles",
        nombre: "Total de goles",
        opciones: [
          { etiqueta: "Más de 2.5", cuota: 1.95 },
          { etiqueta: "Menos de 2.5", cuota: 1.86 },
        ],
      },
      {
        clave: "ambos_marcan",
        nombre: "Ambos equipos marcan",
        opciones: [
          { etiqueta: "Sí", cuota: 1.8 },
          { etiqueta: "No", cuota: 1.95 },
        ],
      },
      {
        clave: "doble_oportunidad",
        nombre: "Doble oportunidad",
        opciones: [
          { etiqueta: "Argentina o Empate", cuota: 1.18 },
          { etiqueta: "Argentina o Austria", cuota: 1.12 },
          { etiqueta: "Empate o Austria", cuota: 2.9 },
        ],
      },
    ],
  },
  {
    id: 2,
    deporteId: 1,
    modalidad: "1x2",
    torneo: "Copa Mundo 2026",
    equipoLocal: "Brasil",
    equipoVisita: "Japón",
    fecha: "2026-06-22T14:00:00",
    cuotas: { local: 1.35, empate: 4.5, visita: 8.0 },
    mercados: [
      {
        clave: "1x2",
        nombre: "Resultado del partido",
        opciones: [
          { etiqueta: "Brasil", cuota: 1.35 },
          { etiqueta: "Empate", cuota: 4.5 },
          { etiqueta: "Japón", cuota: 8.0 },
        ],
      },
      {
        clave: "total_goles",
        nombre: "Total de goles",
        opciones: [
          { etiqueta: "Más de 2.5", cuota: 1.7 },
          { etiqueta: "Menos de 2.5", cuota: 2.1 },
        ],
      },
      {
        clave: "ambos_marcan",
        nombre: "Ambos equipos marcan",
        opciones: [
          { etiqueta: "Sí", cuota: 2.0 },
          { etiqueta: "No", cuota: 1.7 },
        ],
      },
    ],
  },
  {
    id: 3,
    deporteId: 1,
    modalidad: "1x2",
    torneo: "Liga Costa Rica",
    equipoLocal: "Saprissa",
    equipoVisita: "Alajuelense",
    fecha: "2026-06-23T19:00:00",
    cuotas: { local: 2.1, empate: 3.2, visita: 3.4 },
    mercados: [
      {
        clave: "1x2",
        nombre: "Resultado del partido",
        opciones: [
          { etiqueta: "Saprissa", cuota: 2.1 },
          { etiqueta: "Empate", cuota: 3.2 },
          { etiqueta: "Alajuelense", cuota: 3.4 },
        ],
      },
      {
        clave: "total_goles",
        nombre: "Total de goles",
        opciones: [
          { etiqueta: "Más de 2.5", cuota: 2.05 },
          { etiqueta: "Menos de 2.5", cuota: 1.78 },
        ],
      },
      {
        clave: "ambos_marcan",
        nombre: "Ambos equipos marcan",
        opciones: [
          { etiqueta: "Sí", cuota: 1.95 },
          { etiqueta: "No", cuota: 1.8 },
        ],
      },
    ],
  },

  // ---------- BÁSQUET (deporteId: 2) — sin empate, sin mercados extendidos aún ----------
  {
    id: 4,
    deporteId: 2,
    modalidad: "2vias",
    torneo: "NBA",
    equipoLocal: "Lakers",
    equipoVisita: "Celtics",
    fecha: "2026-06-22T20:00:00",
    cuotas: { local: 1.8, visita: 2.0 },
  },
  {
    id: 5,
    deporteId: 2,
    modalidad: "2vias",
    torneo: "NBA",
    equipoLocal: "Warriors",
    equipoVisita: "Nuggets",
    fecha: "2026-06-23T21:30:00",
    cuotas: { local: 2.3, visita: 1.6 },
  },

  // ---------- TENIS (deporteId: 3) — sin empate ----------
  {
    id: 6,
    deporteId: 3,
    modalidad: "2vias",
    torneo: "Wimbledon",
    equipoLocal: "Carlos Alcaraz",
    equipoVisita: "Novak Djokovic",
    fecha: "2026-06-24T10:00:00",
    cuotas: { local: 1.9, visita: 1.9 },
  },
  {
    id: 7,
    deporteId: 3,
    modalidad: "2vias",
    torneo: "Wimbledon",
    equipoLocal: "Iga Swiatek",
    equipoVisita: "Coco Gauff",
    fecha: "2026-06-24T13:00:00",
    cuotas: { local: 1.55, visita: 2.4 },
  },

  // ---------- BÉISBOL (deporteId: 4) — sin empate ----------
  {
    id: 8,
    deporteId: 4,
    modalidad: "2vias",
    torneo: "MLB",
    equipoLocal: "Yankees",
    equipoVisita: "Red Sox",
    fecha: "2026-06-22T23:00:00",
    cuotas: { local: 1.7, visita: 2.1 },
  },
];