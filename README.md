# Climate Roots

> A production-grade digital catalogue and interactive garden map built for **SOSAC (Sociedad Sostenible A.C.)**, an environmental NGO driving urban ecological transformation in Monterrey, México.

**Live site →** [climaterootssos.vercel.app](https://climaterootssos.vercel.app)

---

## Preview

<div align="center">
    <img src="https://github.com/user-attachments/assets/63eda814-2cd9-466c-8ae5-065d45f586cb"        
  width="48%" alt="Home" />       
    <img src="https://github.com/user-attachments/assets/75b3ba0d-8e18-40b3-bdb1-b55f25829755" 
  width="48%" alt="Subject" />         
    <br/><br/>                       
    <img src="https://github.com/user-attachments/assets/2a7c9b72-5a62-4655-873d-70726b8a04e4"        
  width="48%" alt="Tasks" />         
    <img src="https://github.com/user-attachments/assets/665b5658-cfe2-4aac-9360-fa48cfb0932d" 
  width="48%" alt="Planner" />          
    <br/><br/>
    <img src="https://github.com/user-attachments/assets/af7b9f16-8db8-46eb-8f4c-23128dec27cc"        
  width="48%" alt="Exams" />         
    <img src="https://github.com/user-attachments/assets/48bfb934-f6dc-4dd8-bfbd-a9cdf6a2f03c" 
  width="48%" alt="Grades" />
  </div>
  
---

## The Project

SOSAC runs a 1,100 m² regenerated urban garden in the Zona Metropolitana de Monterrey — a living laboratory for nature-based solutions to urban heat, biodiversity loss, and community disconnection. They needed a digital home that matched the ambition of the physical space.

This is a fully custom web application — no templates, no UI kits — designed and built from scratch to serve as both a functional tool for SOSAC and a showcase of what editorial-grade web development looks like when applied to environmental work.

The result was received well enough that SOSAC extended an invitation to continue collaborating on future projects.

### What it does

- **Interactive garden map** — an illustrated SVG floor plan of the garden's six zones. Hover to explore each zone; click to see the plants that grow there.
- **Plant catalogue** — 12 documented species with filterable tags, organic-shaped cards, and full detail pages including benefits, scientific names, and a registration-ready sheet.
- **Café & Jardín** — community session archive with timeline, participant counts, and an integrated registration form backed by Resend.
- **Biodiversity gallery** — an infinite-scroll marquee of observed fauna (birds, pollinators, reptiles).
- **Light + dark mode** — animated circular clip-path transition, not a binary flip.

---

## Tech Stack

| Layer | Choice | Why |
|---|---|---|
| Framework | Next.js 14 (App Router) | SSG for performance, Server Actions for the form |
| Language | TypeScript — strict mode, zero `any` | Correctness at scale |
| Styling | Tailwind CSS + custom design system | Full control over brand palette |
| Animation | Framer Motion + Lenis | Scroll-driven reveals, smooth scroll, layout transitions |
| Email | Resend | Transactional email for session registration |
| Fonts | next/font — Fraunces, Inter, JetBrains Mono | Self-hosted, no layout shift |
| Deployment | Vercel | Edge network, zero config |

---

## Design System

All brand colors are defined as CSS variables with separate light and dark values — no Tailwind defaults used for brand surfaces.

| Token | Light | Dark | Role |
|---|---|---|---|
| `--bg` | `#F4F1EA` | `#0F1612` | Page background |
| `--ink` | `#14241B` | `#EDE7D8` | Body text |
| `--moss` | `#2D5F3F` | `#87A878` | Primary brand green |
| `--bloom` | `#E89E3C` | `#F5C45C` | Warm accent — pollinators |
| `--water` | `#3A7A99` | `#6BA3C2` | Cool accent — water features |

Typography is set in fluid clamp scales — the hero display type runs `clamp(4rem, 12vw, 11rem)` at `line-height: 0.9`.

---

## Architecture

```
src/
├── app/
│   ├── layout.tsx              → Fonts, ThemeProvider, Lenis wrapper
│   ├── page.tsx                → Landing — composes all sections
│   ├── globals.css             → CSS variables (light/dark), base styles
│   ├── actions/
│   │   └── register.ts         → Server Action — Resend email on form submit
│   └── catalogo/[slug]/
│       └── page.tsx            → Static plant detail pages (generateStaticParams)
├── components/
│   ├── layout/
│   │   ├── Nav.tsx             → Fixed nav, transparent → blur on scroll, mobile menu
│   │   ├── Footer.tsx          → Oversized wordmark, social links
│   │   └── ThemeToggle.tsx     → Clip-path circular dark/light transition
│   ├── sections/
│   │   ├── Hero.tsx            → Parallax image, animated headline, counting stats
│   │   ├── Manifesto.tsx       → Pull-quote editorial layout
│   │   ├── GardenMap.tsx       → SVG illustrated garden plan, zone interactions
│   │   ├── Catalogue.tsx       → Filterable plant grid
│   │   ├── CafeJardin.tsx      → Session timeline + registration CTA
│   │   └── Biodiversidad.tsx   → Fauna marquee gallery
│   ├── ui/
│   │   ├── PlantCard.tsx       → Card + full-screen modal with layout transition
│   │   ├── RegistrationModal.tsx → Form slide-up panel, success state
│   │   ├── ZonePanel.tsx       → Zone detail slide-in panel
│   │   ├── MagneticButton.tsx  → Spring-physics magnetic hover
│   │   ├── AnimatedNumber.tsx  → RAF-based counting animation
│   │   └── RevealText.tsx      → Word-by-word and letter-by-letter reveal
│   └── motion/
│       ├── LenisProvider.tsx   → Smooth scroll setup
│       └── ScrollReveal.tsx    → Reusable in-view reveal + stagger container
├── data/
│   └── garden.ts               → Typed data layer: zones, plants, sessions, fauna
└── lib/
    └── utils.ts                → cn(), slugify(), formatDate()
```

---

## Running locally

```bash
# Install dependencies
npm install

# Copy env file and add your Resend key
cp .env.local.example .env.local

# Start dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Environment variables

| Variable | Required | Description |
|---|---|---|
| `RESEND_API_KEY` | Yes | From [resend.com](https://resend.com) → API Keys |
| `NEXT_PUBLIC_WA_NUMBER` | Optional | WhatsApp number for secondary CTA (format: `521XXXXXXXXXX`) |

### Production build

```bash
npm run build   # Static generation + bundle analysis
npm start       # Preview production build locally
```

---

## Data layer

All content lives in `src/data/garden.ts` as typed TypeScript — structured as if it came from a CMS so it can be swapped for Contentful, Sanity, or any headless CMS without touching the components.

```ts
// Extend or replace plant data here
export const plants: Plant[] = [ ... ]   // 12 species
export const zones: Zone[] = [ ... ]     // 6 garden zones with SVG paths
export const sessions: Session[] = [ ... ] // Café & Jardín session history
export const fauna: Fauna[] = [ ... ]    // 8 observed species
```

To replace placeholder photos with real SOSAC photography:
```bash
grep -r "TODO: replace" src/
```

---

## About SOSAC

[SOSAC — Sociedad Sostenible A.C.](https://sosac.org) is a Monterrey-based non-profit working at the intersection of urban ecology, community organizing, and nature-based solutions. Their SOSAC-Lab project demonstrates that residual urban spaces can simultaneously reduce heat island effect, absorb stormwater, host biodiversity, and build social fabric.

This site was developed as part of **Semana Tec con Sentido Humano** at Tecnológico de Monterrey, aligned with **UN Sustainable Development Goal 13 — Climate Action**.

[sosac.org](https://sosac.org) · [instagram.com/sosacmx](https://instagram.com/sosacmx) · [facebook.com/sosacmx](https://facebook.com/sosacmx)

---

## License

MIT — see [LICENSE](LICENSE) for details.
