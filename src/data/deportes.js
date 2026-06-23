// src/data/deportes.js
//
// Este es el catálogo fijo de deportes. El "slug" es una versión del
// nombre sin espacios ni tildes, pensada para usarse en URLs
// (ej: /deporte/futbol en vez de /deporte/Fútbol). Es una convención
// muy común en desarrollo web.
//
// "icono" por ahora es solo un emoji de texto para no complicarnos con
// librerías de íconos todavía; lo podemos mejorar después.

export const deportes = [
  {
    id: 1,
    nombre: "Fútbol",
    slug: "futbol",
    icono: "⚽",
  },
  {
    id: 2,
    nombre: "Básquet",
    slug: "basquet",
    icono: "🏀",
  },
  {
    id: 3,
    nombre: "Tenis",
    slug: "tenis",
    icono: "🎾",
  },
  {
    id: 4,
    nombre: "Béisbol",
    slug: "beisbol",
    icono: "⚾",
  },
];