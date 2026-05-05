# Climate Roots — SOSAC-Lab

Catálogo digital e interactivo del jardín urbano regenerado de **SOSAC (Sociedad Sostenible A.C.)** en Monterrey, México.

---

## Cómo correrlo

### Requisitos
- Node.js 18+
- npm 9+

### Instalación

```bash
npm install
```

### Desarrollo

```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

### Producción

```bash
npm run build
npm start
```

---

## Estructura

```
src/
├── app/
│   ├── layout.tsx          → Fonts, ThemeProvider, Lenis
│   ├── page.tsx            → Landing page
│   ├── globals.css         → CSS variables (light/dark), base styles
│   └── catalogo/[slug]/    → Página de detalle de planta
├── components/
│   ├── layout/             → Nav, Footer, ThemeToggle
│   ├── sections/           → Hero, Manifesto, GardenMap, Catalogue, CafeJardin, Biodiversidad
│   ├── ui/                 → MagneticButton, AnimatedNumber, RevealText, PlantCard, ZonePanel
│   └── motion/             → LenisProvider, ScrollReveal
├── data/
│   └── garden.ts           → Datos de zonas, plantas, sesiones, fauna
└── lib/
    └── utils.ts            → Helpers (cn, slugify, formatDate)
```

---

## Stack técnico

| Tecnología | Uso |
|---|---|
| Next.js 14 (App Router) | Framework |
| TypeScript (strict) | Tipado |
| Tailwind CSS | Estilos utilitarios |
| Framer Motion | Animaciones de componentes |
| Lenis | Smooth scroll |
| next-themes | Modo oscuro / claro |
| next/font | Fuentes (Fraunces, Inter, JetBrains Mono) |

---

## Paleta de colores

| Variable | Light | Dark |
|---|---|---|
| `--bg` | `#F4F1EA` | `#0F1612` |
| `--ink` | `#14241B` | `#EDE7D8` |
| `--moss` | `#2D5F3F` | `#87A878` |
| `--bloom` | `#E89E3C` | `#F5C45C` |
| `--water` | `#3A7A99` | `#6BA3C2` |

---

## Reemplazar fotografías

Todos los `imageUrl` tienen un comentario `// TODO: replace with SOSAC photo`.
Para encontrarlos todos:

```bash
grep -r "TODO: replace" src/
```

---

## Créditos

Desarrollado como parte de **Semana Tec con Sentido Humano**  
Tecnológico de Monterrey · ODS 13 Acción por el Clima · 2026

**SOSAC — Sociedad Sostenible A.C.**  
[sosac.org](https://sosac.org) · [@sosacmx](https://instagram.com/sosacmx)
