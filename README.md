# Proyecto: Simulador de apuestas deportivas

Proyecto de aprendizaje con React + Tailwind + Supabase (backend/auth/BD)
+ The Odds API (datos reales de partidos).

## Estructura de carpetas

```
apuestas-app/
├── src/
│   ├── components/        → Piezas visuales reutilizables (NO pantallas completas)
│   │   ├── partidos/      → Tarjeta de partido, lista de cuotas, etc.
│   │   ├── carrito/       → El "carrito" de apuestas seleccionadas
│   │   ├── auth/          → Formularios de login y registro
│   │   └── comunes/       → Botones, inputs, loaders genéricos (se usan en toda la app)
│   │
│   ├── pages/             → Pantallas completas (juntan varios components)
│   │                        Ej: PaginaInicio.jsx, PaginaLogin.jsx, PaginaHistorial.jsx
│   │
│   ├── hooks/             → Lógica de React reutilizable (useAuth, useSaldo, useCarrito)
│   │
│   ├── context/           → Estado global: sesión del usuario, saldo, carrito
│   │                        (para no pasar props manualmente por 5 componentes)
│   │
│   ├── lib/                → Configuración de servicios externos
│   │                        Ej: supabaseClient.js (conexión a Supabase)
│   │
│   ├── services/          → Funciones que hablan con el backend/API
│   │                        Ej: apuestasService.js, partidosService.js
│   │                        Aquí viven los "fetch" / llamadas a Supabase
│   │
│   ├── data/              → Datos de prueba (mock) - SOLO Fase 2 y 3
│   │                        Se elimina o se ignora cuando llega la API real
│   │
│   ├── utils/             → Funciones puras de cálculo (sin React, sin API)
│   │                        Ej: calcularGanancia.js, formatearMoneda.js
│   │
│   ├── App.jsx
│   └── main.jsx
│
├── public/
├── .env                   → Variables secretas (NUNCA se sube a git)
├── .env.example           → Plantilla de .env sin valores reales (sí se sube)
├── .gitignore
└── package.json
```

## Regla simple para decidir dónde poner un archivo nuevo

- ¿Es una pantalla completa que se ve en una URL? → `pages/`
- ¿Es una pieza visual que se repite o se usa dentro de una pantalla? → `components/`
- ¿Es lógica de React con useState/useEffect que quieres reusar? → `hooks/`
- ¿Es un cálculo puro de matemáticas/lógica, sin JSX? → `utils/`
- ¿Habla con Supabase o una API externa? → `services/`
- ¿Es información que varios componentes lejanos necesitan (sesión, saldo)? → `context/`

## Progreso por fases

- [x] Fase 1 — Fundamentos de React
- [ ] Fase 2 — Simulador con datos falsos (usa `src/data/`)
- [ ] Fase 3 — Carrito de apuestas con Tailwind
- [ ] Fase 4 — Supabase: registro y login (usa `src/lib/`, `src/context/`)
- [ ] Fase 5 — CRUD de apuestas (usa `src/services/`)
- [ ] Fase 6 — Saldo virtual y pago simulado
- [ ] Fase 7 — Conectar API real de cuotas
- [ ] Fase 8 — Pulir y desplegar
