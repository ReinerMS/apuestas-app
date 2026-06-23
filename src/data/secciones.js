// src/data/secciones.js
//
// Esta es la pieza clave para el "panel autogestionado a futuro".
//
// En vez de que PaginaInicio.jsx tenga escrito a mano "muestra fútbol,
// luego básquet, luego tenis", esa decisión vive AQUÍ, como datos.
// Cuando más adelante esto se mueva a una tabla de Supabase, vas a poder
// cambiar el "orden" o el "visible" desde un panel sin tocar ningún
// componente de React.
//
// Campos:
// - deporteId: a qué deporte de deportes.js corresponde esta sección
// - titulo: lo que se muestra como encabezado (puede ser distinto al
//   nombre del deporte, ej. "Fútbol en vivo" en vez de solo "Fútbol")
// - orden: en qué posición aparece (menor número = más arriba)
// - visible: si es false, la sección NO se muestra (como "ocultar"
//   temporalmente sin borrar la configuración)

export const secciones = [
  {
    id: 1,
    deporteId: 1, // Fútbol
    titulo: "Fútbol — Copa Mundo 2026",
    orden: 1,
    visible: true,
  },
  {
    id: 2,
    deporteId: 2, // Básquet
    titulo: "Básquet en vivo",
    orden: 2,
    visible: true,
  },
  {
    id: 3,
    deporteId: 3, // Tenis
    titulo: "Tenis — Próximos partidos",
    orden: 3,
    visible: true,
  },
  {
    id: 4,
    deporteId: 4, // Béisbol
    titulo: "Béisbol",
    orden: 4,
    visible: true,
  },
];