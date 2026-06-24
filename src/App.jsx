// src/App.jsx
//
// Ahora App.jsx es mucho más simple: solo define la estructura general
// (la barra de navegación, que se ve en TODAS las páginas) y delega el
// "qué página mostrar" a AppRouter. Si en el futuro agregas un footer
// fijo, o un sidebar, este es el lugar donde irían — junto a
// BarraNavegacion, fuera del router.

import BarraNavegacion from "./components/comunes/BarraNavegacion";
import AppRouter from "./router/AppRouter";
import CarritoFlotante from "./components/carrito/CarritoFlotante";

function App() {
  return (
    <>
      <BarraNavegacion />
      <AppRouter />
      {/* Fuera de AppRouter a propósito: así el botón flotante y el
          panel del carrito se ven en CUALQUIER página, no solo en el
          home. Si estuviera dentro de una <Route>, desaparecería al
          cambiar de página. */}
      <CarritoFlotante />
    </>
  );
}

export default App;