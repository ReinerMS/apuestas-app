// src/context/AuthContext.jsx
//
// IMPORTANTE: esto es una SIMULACIÓN de login, no autenticación real.
// No hay contraseñas verificadas de verdad, no hay base de datos. Es a
// propósito: estamos construyendo la ESTRUCTURA (cómo cualquier
// componente sabe "¿hay alguien logueado?") antes de conectar el
// motor real (Supabase, en la Fase 4).
//
// La idea clave: cualquier componente que use useAuth() en el futuro,
// cuando reemplacemos esto por Supabase, NO va a necesitar cambiar su
// código. Por eso diseñamos la forma (usuario, iniciarSesion,
// cerrarSesion) pensando en cómo se va a usar después, no solo en lo
// mínimo para que funcione hoy.

import { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  // Si "usuario" es null, significa que NADIE ha iniciado sesión.
  // Cuando hay sesión, esto va a ser un objeto como:
  // { id: 1, nombre: "Juan", email: "juan@correo.com" }
  const [usuario, setUsuario] = useState(null);

  // SIMULACIÓN de login: no valida contra ninguna base de datos real.
  // Acepta cualquier email/contraseña y "crea" un usuario de prueba.
  // En la Fase 4, el CONTENIDO de esta función cambia (va a llamar a
  // supabase.auth.signInWithPassword), pero quien la usa (los
  // formularios) no se entera del cambio.
  function iniciarSesion(email) {
    setUsuario({
      id: "usuario-demo",
      nombre: email.split("@")[0], // usamos lo que hay antes del @ como "nombre"
      email,
    });
  }

  function cerrarSesion() {
    setUsuario(null);
  }

  const valor = {
    usuario,
    estaAutenticado: usuario !== null, // booleano fácil de leer en componentes
    iniciarSesion,
    cerrarSesion,
  };

  return <AuthContext.Provider value={valor}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const contexto = useContext(AuthContext);

  if (!contexto) {
    throw new Error("useAuth debe usarse dentro de un <AuthProvider>");
  }

  return contexto;
}