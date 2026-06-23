// src/data/partidos.js
//
// Igual que antes, esto es "mock data". Lo nuevo: cada partido ahora
// tiene un campo "deporteId" que lo conecta con un deporte de
// deportes.js. Así, cuando pidamos "los partidos de básquet", podemos
// filtrar este arreglo por ese campo.
//
// También agregamos el campo "modalidad", que cambia según el deporte
// (fútbol usa 1x2, básquet/tenis/béisbol usan "gana A" vs "gana B",
// sin empate). Esto es importante: no todos los deportes se apuestan
// igual, y el componente que muestra las cuotas va a necesitar saber
// si debe mostrar 2 o 3 botones.

export const partidos = [
  // ---------- FÚTBOL (deporteId: 1) ----------
  {
    id: 1,
    deporteId: 1,
    modalidad: "1x2",
    torneo: "Copa Mundo 2026",
    equipoLocal: "Argentina",
    equipoVisita: "Austria",
    fecha: "2026-06-22T11:00:00",
    cuotas: { local: 1.5, empate: 4.0, visita: 7.5 },
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
  },

  // ---------- BÁSQUET (deporteId: 2) — sin empate ----------
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