// src/components/comunes/BarraNavegacion.jsx
//
// RESPONSIVE: usamos el prefijo "md:" de Tailwind. Las clases SIN prefijo
// aplican siempre (mobile primero). Las clases CON "md:" solo aplican en
// pantallas medianas o más grandes (768px+).
//
// NUEVO: ahora la barra muestra algo distinto según si hay sesión o no.
// Si "estaAutenticado" es true, mostramos el nombre del usuario y un
// botón para cerrar sesión. Si es false, mostramos "Iniciar sesión" y
// "Registrarse", como antes.

import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useModoTema } from "../../hooks/useModoTema";
import { useAuth } from "../../context/AuthContext";

export default function BarraNavegacion() {
  const [menuAbierto, setMenuAbierto] = useState(false);
  const { modoClaro, alternarModo } = useModoTema();
  const { usuario, estaAutenticado, cerrarSesion } = useAuth();

  const claseEnlace = ({ isActive }) =>
    `relative text-sm font-medium transition-colors ${
      isActive ? "text-texto" : "text-texto-tenue hover:text-texto"
    }`;

  return (
    <nav className="bg-fondo border-b border-superficie-alta px-4 md:px-6 py-3 sticky top-0 z-50">
      <div className="flex items-center justify-between">
        {/* Logo + línea animada (nuestro elemento de firma) */}
        <Link to="/" className="flex flex-col gap-1">
          <span className="font-display text-lg font-bold text-texto tracking-tight">
            Cancha<span className="text-acento">Bet</span>
          </span>
          <span className="h-0.5 w-8 bg-acento rounded-full animate-pulse-line" />
        </Link>

        {/* Menú de escritorio: oculto en celular (hidden), visible desde md */}
        <div className="hidden md:flex items-center gap-7">
          <NavLink to="/" className={claseEnlace} end>
            {({ isActive }) => (
              <span>
                Partidos
                {isActive && (
                  <span className="absolute left-0 -bottom-1 w-full h-0.5 bg-acento rounded-full" />
                )}
              </span>
            )}
          </NavLink>
          <NavLink to="/historial" className={claseEnlace}>
            {({ isActive }) => (
              <span>
                Mi historial
                {isActive && (
                  <span className="absolute left-0 -bottom-1 w-full h-0.5 bg-acento rounded-full" />
                )}
              </span>
            )}
          </NavLink>

          <span className="flex items-center gap-2 text-xs text-texto-tenue">
            <span className="w-1.5 h-1.5 rounded-full bg-vivo animate-pulse" />
            3 en vivo
          </span>
        </div>

        {/* Botones de la derecha (escritorio) */}
        <div className="hidden md:flex items-center gap-3">
          <button
            onClick={alternarModo}
            aria-label={modoClaro ? "Cambiar a modo oscuro" : "Cambiar a modo claro"}
            className="p-2 rounded-lg border border-texto/25 text-texto hover:bg-superficie transition-colors"
          >
            {modoClaro ? (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="2" />
                <path
                  d="M12 2v3M12 19v3M4.2 4.2l2.1 2.1M17.7 17.7l2.1 2.1M2 12h3M19 12h3M4.2 19.8l2.1-2.1M17.7 6.3l2.1-2.1"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            ) : (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path
                  d="M21 12.5A8.5 8.5 0 1 1 11.5 3 7 7 0 0 0 21 12.5Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinejoin="round"
                />
              </svg>
            )}
          </button>

          {/* CONDICIONAL: si hay sesión, mostramos el nombre + botón de
              salir. Si no, mostramos los botones de login/registro.
              El operador ternario (condición ? A : B) es la forma más
              común de hacer esto en JSX. */}
          {estaAutenticado ? (
            <>
              <span className="text-sm text-texto-tenue">
                Hola, <span className="text-texto font-medium">{usuario.nombre}</span>
              </span>
              <button
                onClick={cerrarSesion}
                className="text-sm font-medium text-texto border border-texto/25 rounded-lg px-3.5 py-2 hover:bg-superficie transition-colors"
              >
                Cerrar sesión
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="text-sm font-medium text-texto border border-texto/25 rounded-lg px-3.5 py-2 hover:bg-superficie transition-colors"
              >
                Iniciar sesión
              </Link>
              <Link
                to="/registro"
                className="text-sm font-medium text-fondo bg-acento rounded-lg px-4 py-2 hover:bg-acento-claro hover:-translate-y-0.5 transition-all"
              >
                Registrarse
              </Link>
            </>
          )}
        </div>

        {/* Botón hamburguesa: solo visible en celular */}
        <button
          onClick={() => setMenuAbierto(!menuAbierto)}
          className="flex md:hidden text-texto p-2"
          aria-label="Abrir menú"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path
              d="M4 6h16M4 12h16M4 18h16"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </button>
      </div>

      {/* Menú móvil desplegable */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ${
          menuAbierto ? "max-h-80 opacity-100 mt-4" : "max-h-0 opacity-0"
        }`}
      >
        <div className="flex flex-col gap-4 pb-4">
          <NavLink
            to="/"
            end
            onClick={() => setMenuAbierto(false)}
            className={claseEnlace}
          >
            Partidos
          </NavLink>
          <NavLink
            to="/historial"
            onClick={() => setMenuAbierto(false)}
            className={claseEnlace}
          >
            Mi historial
          </NavLink>

          {estaAutenticado ? (
            <>
              <span className="text-sm text-texto-tenue">
                Hola, <span className="text-texto font-medium">{usuario.nombre}</span>
              </span>
              <button
                onClick={() => {
                  cerrarSesion();
                  setMenuAbierto(false);
                }}
                className="text-sm font-medium text-texto border border-texto/25 rounded-lg px-3.5 py-2"
              >
                Cerrar sesión
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                onClick={() => setMenuAbierto(false)}
                className="text-sm font-medium text-texto border border-texto/25 rounded-lg px-3.5 py-2 text-center"
              >
                Iniciar sesión
              </Link>
              <Link
                to="/registro"
                onClick={() => setMenuAbierto(false)}
                className="text-sm font-medium text-fondo bg-acento rounded-lg px-4 py-2 text-center"
              >
                Registrarse
              </Link>
            </>
          )}

          <button
            onClick={alternarModo}
            className="flex items-center justify-center gap-2 text-sm font-medium text-texto border border-texto/25 rounded-lg px-3.5 py-2"
          >
            {modoClaro ? "Modo oscuro" : "Modo claro"}
          </button>
        </div>
      </div>
    </nav>
  );
}