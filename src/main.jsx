// src/main.jsx
//
// BrowserRouter es el componente que "activa" el sistema de rutas
// en toda la app. Tiene que envolver a <App />, porque cualquier
// componente que use <Link> o <Routes> necesita estar DENTRO de él
// para funcionar. Piénsalo como "encender el GPS" antes de poder
// usar direcciones.

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import { CarritoProvider } from "./context/CarritoContext.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      {/* AuthProvider va "más afuera" que CarritoProvider a propósito:
          el carrito eventualmente va a necesitar saber quién es el
          usuario (por ejemplo, para guardar la apuesta a SU nombre),
          así que conviene que la información de sesión esté disponible
          "por encima" de todo lo demás. */}
      <AuthProvider>
        <CarritoProvider>
          <App />
        </CarritoProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);