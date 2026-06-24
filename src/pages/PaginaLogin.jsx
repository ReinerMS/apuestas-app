// src/pages/PaginaLogin.jsx
//
// CONCEPTO NUEVO: formularios controlados en React.
// "Controlado" significa que el VALOR del input vive en useState, no
// directamente en el HTML. Por eso cada <input> tiene "value={algo}" y
// "onChange={...}" — React es quien decide qué se muestra en el campo,
// no el navegador por sí solo. Es el patrón estándar para formularios
// en React.
//
// useLocation/useNavigate: cuando el carrito exige login antes de
// pagar, vamos a redirigir aquí con información de "a dónde volver"
// después de iniciar sesión. Por eso leemos location.state.

import { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function PaginaLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { iniciarSesion } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Si llegamos aquí porque el carrito nos redirigió, location.state
  // va a traer la página a la que debemos volver después de loguear.
  // Si no hay nada (llegaste aquí directo desde el menú), volvemos al
  // home por defecto.
  const rutaDeRegreso = location.state?.desde || "/";

  function manejarEnvio(evento) {
    // preventDefault es ESENCIAL en formularios de React: sin esto, el
    // navegador intentaría recargar la página al enviar el formulario
    // (comportamiento HTML normal), perdiendo todo el estado de React.
    evento.preventDefault();

    if (!email || !password) return;

    iniciarSesion(email);
    navigate(rutaDeRegreso);
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-fondo p-6">
      <form
        onSubmit={manejarEnvio}
        className="bg-superficie border border-superficie-alta rounded-xl p-8 w-full max-w-sm"
      >
        <h1 className="font-display text-xl font-bold text-texto mb-1">
          Iniciar sesión
        </h1>
        <p className="text-sm text-texto-tenue mb-6">
          Necesitas una cuenta para confirmar apuestas.
        </p>

        <label className="text-xs text-texto-tenue block mb-1">Correo</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="tucorreo@ejemplo.com"
          required
          className="w-full bg-fondo border border-superficie-alta rounded-md px-3 py-2 text-sm text-texto mb-4 focus:outline-none focus:border-acento transition-colors"
        />

        <label className="text-xs text-texto-tenue block mb-1">
          Contraseña
        </label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••"
          required
          className="w-full bg-fondo border border-superficie-alta rounded-md px-3 py-2 text-sm text-texto mb-6 focus:outline-none focus:border-acento transition-colors"
        />

        <button
          type="submit"
          className="w-full bg-acento text-fondo rounded-lg py-2.5 text-sm font-medium hover:bg-acento-claro transition-colors"
        >
          Iniciar sesión
        </button>

        <p className="text-xs text-texto-tenue text-center mt-5">
          ¿No tienes cuenta?{" "}
          <Link to="/registro" className="text-acento hover:underline">
            Regístrate
          </Link>
        </p>

        <p className="text-[11px] text-texto-tenue/70 text-center mt-4">
          (Simulación — cualquier correo y contraseña funcionan por ahora)
        </p>
      </form>
    </div>
  );
}