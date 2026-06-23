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
 
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);
 