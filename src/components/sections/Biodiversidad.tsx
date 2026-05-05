'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { motion, useInView } from 'framer-motion'
import { fauna } from '@/data/garden'
import { ScrollReveal } from '../motion/ScrollReveal'

export function Biodiversidad() {
  const marqueeRef = useRef<HTMLDivElement>(null)

  // Double the array for seamless loop
  const doubled = [...fauna, ...fauna]

  return (
    <section
      id="biodiversidad"
      className="section-gap overflow-hidden"
      aria-label="Biodiversidad observada"
    >
      <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16 mb-12 md:mb-16">
        <ScrollReveal>
          <p className="text-eyebrow text-ink-soft mb-3">Fauna observada</p>
        </ScrollReveal>
        <div className="grid grid-cols-12 items-end gap-4">
          <div className="col-span-12 md:col-span-6">
            <ScrollReveal delay={0.1}>
              <h2 className="text-h2 font-display font-black text-ink leading-tight">
                Vida que{' '}
                <span className="italic text-water">regresa</span>
              </h2>
            </ScrollReveal>
          </div>
          <div className="col-span-12 md:col-span-5 md:col-start-8">
            <ScrollReveal delay={0.2}>
              <p className="text-ink-soft text-base leading-relaxed">
                Desde que el jardín tomó forma, estas especies han sido
                avistadas o ahora viven aquí. Cada una es un indicador
                de que el ecosistema está sanando.
              </p>
            </ScrollReveal>
          </div>
        </div>
      </div>

      {/* Marquee track */}
      <div
        ref={marqueeRef}
        className="relative"
        role="region"
        aria-label="Galería de fauna"
      >
        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-24 z-10 pointer-events-none bg-gradient-to-r from-bg to-transparent" />
        <div className="absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none bg-gradient-to-l from-bg to-transparent" />

        {/* Marquee row 1 */}
        <div className="marquee-track flex gap-5 mb-5">
          {doubled.map((animal, i) => (
            <FaunaCard key={`${animal.id}-${i}`} animal={animal} />
          ))}
        </div>

        {/* Marquee row 2 — reversed */}
        <div
          className="flex gap-5"
          style={{
            display: 'flex',
            width: 'max-content',
            animation: 'marquee-reverse 50s linear infinite',
          }}
        >
          {[...doubled].reverse().map((animal, i) => (
            <FaunaCard key={`rev-${animal.id}-${i}`} animal={animal} />
          ))}
        </div>
      </div>

      {/* Count */}
      <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16 mt-12">
        <ScrollReveal>
          <div className="flex items-center gap-4">
            <div className="h-px flex-1 bg-line max-w-[80px]" />
            <p className="text-eyebrow text-ink-soft">
              {fauna.length} especies registradas en 2025
            </p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}

function FaunaCard({ animal }: { animal: typeof fauna[0] }) {
  const [isOpen, setIsOpen] = React.useState(false)

  return (
    <>
      <motion.div
        className="relative flex-shrink-0 w-52 cursor-pointer group"
        whileHover={{ y: -6 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        onClick={() => setIsOpen(true)}
      >
        {/* Image */}
        <div className="relative overflow-hidden rounded-xl mb-3" style={{ aspectRatio: '3/4' }}>
          {/* TODO: replace with SOSAC photo */}
          <Image
            src={animal.imageUrl}
            alt={animal.commonName}
            fill
            sizes="208px"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/50 via-transparent to-transparent" />

          {/* Type badge */}
          <div className="absolute top-3 left-3">
            <span className="text-[0.6rem] uppercase tracking-widest px-2 py-0.5 rounded-full bg-ink/60 text-white font-medium backdrop-blur-sm">
              {animal.type}
            </span>
          </div>
        </div>

        {/* Name */}
        <div>
          <p className="font-display font-bold text-ink text-sm group-hover:text-moss transition-colors">
            {animal.commonName}
          </p>
          <p className="font-mono text-ink-soft text-xs italic mt-0.5">
            {animal.scientificName}
          </p>
        </div>
      </motion.div>

      {/* Detail modal */}
      {isOpen && (
        <FaunaModal animal={animal} onClose={() => setIsOpen(false)} />
      )}
    </>
  )
}

function FaunaModal({
  animal,
  onClose,
}: {
  animal: typeof fauna[0]
  onClose: () => void
}) {
  return (
    <>
      <motion.div
        className="fixed inset-0 bg-ink/50 z-50 cursor-pointer"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      />
      <motion.div
        className="fixed inset-x-4 top-1/2 -translate-y-1/2 max-w-sm mx-auto bg-surface rounded-2xl z-50 overflow-hidden shadow-2xl"
        initial={{ opacity: 0, scale: 0.9, y: '-40%' }}
        animate={{ opacity: 1, scale: 1, y: '-50%' }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="relative" style={{ aspectRatio: '4/3' }}>
          <Image
            src={animal.imageUrl}
            alt={animal.commonName}
            fill
            sizes="(max-width: 640px) 100vw, 384px"
            className="object-cover"
          />
        </div>
        <div className="p-6">
          <button
            onClick={onClose}
            aria-label="Cerrar"
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-ink/30 backdrop-blur-sm flex items-center justify-center"
          >
            <svg width="12" height="12" viewBox="0 0 14 14" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round">
              <path d="M1 1l12 12M13 1L1 13"/>
            </svg>
          </button>
          <span className="text-eyebrow text-water mb-2 block">{animal.type}</span>
          <h3 className="font-display font-black text-ink text-2xl mb-1">
            {animal.commonName}
          </h3>
          <p className="font-mono text-ink-soft text-sm italic mb-4">
            {animal.scientificName}
          </p>
          <p className="text-ink-soft text-sm leading-relaxed">{animal.note}</p>
        </div>
      </motion.div>
    </>
  )
}

// Need React import for useState in FaunaCard
import React from 'react'
