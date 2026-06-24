// src/router/AppRouter.jsx
//
// Este archivo tiene UNA sola responsabilidad: decir qué página
// corresponde a cada URL. Antes esto vivía dentro de App.jsx junto con
// la barra de navegación; ahora lo separamos para que cada archivo
// haga una sola cosa:
//
// - App.jsx       -> estructura general de la app (qué se ve siempre)
// - AppRouter.jsx -> solo el mapa de rutas (qué cambia según la URL)
//
// Esto es útil porque a medida que agregues más páginas, este archivo
// va a crecer, y no quieres que App.jsx se vuelva enorme y mezcle dos
// responsabilidades distintas.

import { Routes, Route } from "react-router-dom";
import PaginaInicio from "@/pages/PaginaInicio";
import PaginaLogin from "@/pages/PaginaLogin";
import PaginaRegistro from "@/pages/PaginaRegistro";
import PaginaHistorial from "@/pages/PaginaHistorial";
import PaginaDeporte from "@/pages/PaginaDeporte";
import PaginaDetallePartido from "@/pages/PaginaDetallePartido";
import Error404 from "@/pages/Error404";

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<PaginaInicio />} />
      <Route path="/login" element={<PaginaLogin />} />
      <Route path="/registro" element={<PaginaRegistro />} />
      <Route path="/historial" element={<PaginaHistorial />} />
      {/* :slug es un parámetro dinámico — coincide con cualquier
          valor en esa posición de la URL (futbol, tenis, etc.) */}
      <Route path="/deporte/:slug" element={<PaginaDeporte />} />
      {/* :id identifica el partido específico al que se hizo click */}
      <Route path="/partido/:id" element={<PaginaDetallePartido />} />

      {/* IMPORTANTE: esta ruta va SIEMPRE al final. El path="*"
          significa "cualquier cosa que no haya coincidido arriba". */}
      <Route path="*" element={<Error404 />} />
    </Routes>
  );
}