// src/hooks/useModoTema.js
//
// Este es nuestro primer HOOK PERSONALIZADO. Un hook personalizado es,
// en el fondo, una función normal de JavaScript que por dentro usa otros
// hooks de React (useState, useEffect), y que podemos reutilizar en
// cualquier componente con una sola línea.
//
// ¿Por qué sacar esto de BarraNavegacion.jsx en vez de dejarlo ahí?
// Porque "el modo claro/oscuro" es un concepto que probablemente vas a
// necesitar en más de un lugar (quizás luego un botón en el footer, o en
// una pantalla de configuración). Si la lógica vive en un hook, cualquier
// componente la puede usar sin copiar/pegar código.

import { useState, useEffect } from "react";

export function useModoTema() {
  // Empezamos siempre en modo oscuro (el diseño original).
  // Nota: no usamos localStorage aquí porque este proyecto vive dentro
  // de un entorno de práctica que no lo soporta bien en todos los casos;
  // cuando despliegues el proyecto de verdad fuera de aquí, podrías
  // agregar localStorage para que recuerde la preferencia entre visitas.
  const [modoClaro, setModoClaro] = useState(false);

  // useEffect: "cada vez que modoClaro cambie, ejecuta esto."
  // Aquí es donde realmente le decimos al navegador: agrega o quita
  // la clase "light" del <html>. Esa clase es la que activa las
  // variables de color que definimos en index.css.
  useEffect(() => {
    const elementoHtml = document.documentElement; // esto es <html>

    if (modoClaro) {
      elementoHtml.classList.add("light");
    } else {
      elementoHtml.classList.remove("light");
    }
  }, [modoClaro]); // <- "vigila" esta variable; si cambia, vuelve a correr

  // Esta función es la que el botón va a llamar para alternar el modo.
  function alternarModo() {
    setModoClaro((valorAnterior) => !valorAnterior);
  }

  // Devolvemos lo que cualquier componente que use este hook va a necesitar.
  return { modoClaro, alternarModo };
}