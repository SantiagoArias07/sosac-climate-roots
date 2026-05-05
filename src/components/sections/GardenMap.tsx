'use client'

import { useState, useRef } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { zones, plants, Zone } from '@/data/garden'
import { ZonePanel } from '../ui/ZonePanel'
import { ScrollReveal } from '../motion/ScrollReveal'

const zoneDescriptions: Record<string, { step: number; accent: string }> = {
  polinizador: { step: 1, accent: 'var(--bloom)' },
  medicinal: { step: 2, accent: 'var(--leaf)' },
  aromatico: { step: 3, accent: 'var(--water)' },
  huerto: { step: 4, accent: 'var(--moss)' },
  compostaje: { step: 5, accent: 'var(--ink-soft)' },
  'cafe-jardin': { step: 6, accent: '#C8956C' },
}

export function GardenMap() {
  const [hoveredZone, setHoveredZone] = useState<string | null>(null)
  const [selectedZone, setSelectedZone] = useState<Zone | null>(null)
  const sectionRef = useRef<HTMLElement>(null)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })

  const activeZone = zones.find((z) => z.id === hoveredZone)

  return (
    <>
      <section
        ref={sectionRef}
        id="mapa"
        className="section-gap relative"
        aria-label="Mapa del jardín"
      >
        <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16">
          {/* Section header */}
          <div className="mb-16 md:mb-20">
            <ScrollReveal>
              <p className="text-eyebrow text-ink-soft mb-3">El jardín</p>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <h2 className="text-h2 font-display font-black text-ink leading-tight max-w-2xl">
                Un ecosistema de
                <span className="italic text-moss"> seis mundos</span>
              </h2>
            </ScrollReveal>
          </div>

          {/* Map + side panel layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            {/* Map SVG — 7 columns */}
            <div className="lg:col-span-7 lg:sticky lg:top-28">
              <ScrollReveal delay={0.2}>
                <div className="relative">
                  {/* Map container */}
                  <svg
                    viewBox="0 0 600 500"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-full h-auto"
                    role="img"
                    aria-label="Mapa ilustrado del jardín SOSAC-Lab"
                  >
                    {/* Background paper texture */}
                    <rect width="600" height="500" fill="var(--surface)" rx="8"/>

                    {/* Subtle grid lines (hand-drawn feel) */}
                    <g opacity="0.06" stroke="var(--ink)" strokeWidth="0.5">
                      {[1,2,3,4,5,6,7,8,9].map(i => (
                        <line key={`h${i}`} x1="0" y1={i*50} x2="600" y2={i*50} strokeDasharray="2,4"/>
                      ))}
                      {[1,2,3,4,5,6,7,8,9,10,11].map(i => (
                        <line key={`v${i}`} x1={i*50} y1="0" x2={i*50} y2="500" strokeDasharray="2,4"/>
                      ))}
                    </g>

                    {/* Dotted paths between zones (hand-drawn feel) */}
                    <g fill="none" stroke="var(--ink)" strokeWidth="1" strokeDasharray="3,6" opacity="0.2">
                      <path d="M190 120 C230 130, 300 150, 300 160"/>
                      <path d="M190 120 C150 180, 145 220, 138 280"/>
                      <path d="M300 160 C300 220, 310 260, 318 290"/>
                      <path d="M138 335 C180 335, 230 340, 240 340"/>
                      <path d="M390 155 C430 180, 450 250, 460 300"/>
                      <path d="M465 125 C440 170, 400 200, 390 200"/>
                    </g>

                    {/* Zone paths */}
                    {zones.map((zone) => {
                      const isHovered = hoveredZone === zone.id
                      const anyHovered = hoveredZone !== null
                      const opacity = anyHovered ? (isHovered ? 0.9 : 0.2) : 0.65

                      return (
                        <g key={zone.id}>
                          <motion.path
                            d={zone.svgPathD}
                            fill={zone.color}
                            stroke={zone.color}
                            strokeWidth={isHovered ? 2 : 1}
                            animate={{ opacity }}
                            transition={{ duration: 0.3, ease: 'easeOut' }}
                            className="zone-path cursor-pointer"
                            onMouseEnter={() => setHoveredZone(zone.id)}
                            onMouseLeave={() => setHoveredZone(null)}
                            onClick={() => setSelectedZone(zone)}
                            role="button"
                            aria-label={zone.name}
                            tabIndex={0}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter' || e.key === ' ') setSelectedZone(zone)
                            }}
                          />

                          {/* Zone label */}
                          <motion.text
                            x={zone.labelX}
                            y={zone.labelY}
                            textAnchor="middle"
                            fill="var(--surface)"
                            fontSize="9"
                            fontFamily="var(--font-inter)"
                            fontWeight="600"
                            letterSpacing="0.08em"
                            style={{ textTransform: 'uppercase', pointerEvents: 'none' }}
                            animate={{ opacity: isHovered ? 1 : anyHovered ? 0 : 0.8 }}
                            transition={{ duration: 0.2 }}
                          >
                            {zone.name.split(' ').map((word, i) => (
                              <tspan key={i} x={zone.labelX} dy={i === 0 ? 0 : '1.2em'}>
                                {word}
                              </tspan>
                            ))}
                          </motion.text>
                        </g>
                      )
                    })}

                    {/* Compass rose — bottom right */}
                    <g transform="translate(555, 455)" opacity="0.4">
                      <circle r="18" fill="none" stroke="var(--ink)" strokeWidth="0.75"/>
                      <path d="M0,-14 L3,-3 L0,6 L-3,-3 Z" fill="var(--ink)"/>
                      <path d="M0,14 L3,3 L0,-6 L-3,3 Z" fill="var(--ink)" opacity="0.4"/>
                      <path d="M-14,0 L-3,3 L6,0 L-3,-3 Z" fill="var(--ink)" opacity="0.4"/>
                      <path d="M14,0 L3,-3 L-6,0 L3,3 Z" fill="var(--ink)" opacity="0.4"/>
                      <text y="-19" textAnchor="middle" fontSize="6" fill="var(--ink)" fontFamily="var(--font-inter)" fontWeight="700">N</text>
                    </g>

                    {/* Scale bar */}
                    <g transform="translate(20, 476)" opacity="0.35">
                      <line x1="0" y1="0" x2="60" y2="0" stroke="var(--ink)" strokeWidth="1"/>
                      <line x1="0" y1="-3" x2="0" y2="3" stroke="var(--ink)" strokeWidth="1"/>
                      <line x1="60" y1="-3" x2="60" y2="3" stroke="var(--ink)" strokeWidth="1"/>
                      <text x="30" y="-6" textAnchor="middle" fontSize="7" fill="var(--ink)" fontFamily="var(--font-inter)">10 m</text>
                    </g>

                    {/* Title */}
                    <text x="20" y="22" fontSize="9" fill="var(--ink-soft)" fontFamily="var(--font-inter)" letterSpacing="0.12em" opacity="0.6">
                      SOSAC-LAB · MONTERREY · PLANTA JARDÍN
                    </text>
                  </svg>

                  {/* Legend */}
                  <div className="mt-4 flex flex-wrap gap-3">
                    {zones.map((zone) => (
                      <button
                        key={zone.id}
                        className="flex items-center gap-1.5 text-[0.7rem] text-ink-soft hover:text-ink transition-colors"
                        onMouseEnter={() => setHoveredZone(zone.id)}
                        onMouseLeave={() => setHoveredZone(null)}
                        onClick={() => setSelectedZone(zone)}
                      >
                        <span
                          className="w-3 h-3 rounded-full flex-shrink-0"
                          style={{ background: zone.color }}
                        />
                        {zone.name}
                      </button>
                    ))}
                  </div>
                </div>
              </ScrollReveal>
            </div>

            {/* Zone info — 5 columns */}
            <div className="lg:col-span-5 space-y-8">
              <AnimatePresence mode="wait">
                {activeZone ? (
                  <motion.div
                    key={activeZone.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    className="p-6 rounded-2xl border border-line"
                  >
                    <div
                      className="w-3 h-3 rounded-full mb-4"
                      style={{ background: activeZone.color }}
                    />
                    <h3 className="font-display font-black text-2xl md:text-3xl text-ink mb-3">
                      {activeZone.name}
                    </h3>
                    <p className="text-ink-soft leading-relaxed">
                      {activeZone.description}
                    </p>
                    <button
                      onClick={() => setSelectedZone(activeZone)}
                      className="mt-5 flex items-center gap-2 text-eyebrow text-moss hover:gap-3 transition-all duration-300"
                    >
                      Ver plantas
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                        <path d="M1 7h12M8 3l4 4-4 4"/>
                      </svg>
                    </button>
                  </motion.div>
                ) : (
                  <motion.div
                    key="default"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <p className="text-eyebrow text-ink-soft mb-6">Explora las zonas</p>
                    <div className="space-y-4">
                      {zones.map((zone, i) => (
                        <motion.button
                          key={zone.id}
                          className="w-full flex items-center gap-4 p-4 rounded-xl border border-line hover:border-moss text-left group transition-colors duration-300"
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.06, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                          onMouseEnter={() => setHoveredZone(zone.id)}
                          onMouseLeave={() => setHoveredZone(null)}
                          onClick={() => setSelectedZone(zone)}
                        >
                          <span
                            className="w-4 h-4 rounded-full flex-shrink-0 group-hover:scale-125 transition-transform"
                            style={{ background: zone.color }}
                          />
                          <span className="font-display font-bold text-ink group-hover:text-moss transition-colors">
                            {zone.name}
                          </span>
                          <svg
                            width="14" height="14" viewBox="0 0 14 14" fill="none"
                            stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
                            className="ml-auto text-ink-soft opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <path d="M1 7h12M8 3l4 4-4 4"/>
                          </svg>
                        </motion.button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Mobile: scrollable zone cards */}
          <div className="mt-16 lg:hidden">
            <p className="text-eyebrow text-ink-soft mb-6">Las seis zonas</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {zones.map((zone) => (
                <button
                  key={zone.id}
                  onClick={() => setSelectedZone(zone)}
                  className="p-5 rounded-2xl border border-line text-left hover:border-moss transition-colors group"
                >
                  <span
                    className="block w-5 h-5 rounded-full mb-3"
                    style={{ background: zone.color }}
                  />
                  <h3 className="font-display font-bold text-ink group-hover:text-moss transition-colors mb-2">
                    {zone.name}
                  </h3>
                  <p className="text-ink-soft text-sm line-clamp-2 leading-relaxed">
                    {zone.description}
                  </p>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Zone detail panel */}
      <ZonePanel
        zone={selectedZone}
        plants={plants}
        onClose={() => setSelectedZone(null)}
      />
    </>
  )
}
