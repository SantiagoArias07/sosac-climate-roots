'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { Plant } from '@/data/garden'
import { cn } from '@/lib/utils'

interface PlantCardProps {
  plant: Plant
  index?: number
}

export function PlantCard({ plant, index = 0 }: PlantCardProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <motion.article
        layoutId={`plant-card-${plant.id}`}
        className="group cursor-pointer"
        onClick={() => setIsOpen(true)}
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-5% 0px' }}
        transition={{
          delay: (index % 3) * 0.08,
          duration: 0.7,
          ease: [0.22, 1, 0.36, 1],
        }}
        whileHover={{ y: -4 }}
      >
        {/* Image wrapper with organic mask */}
        <div className="relative overflow-hidden mb-4" style={{ borderRadius: '40% 60% 60% 40% / 40% 40% 60% 60%' }}>
          <motion.div
            className="relative aspect-[4/5]"
            whileHover={{ scale: 1.04, rotate: 1 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <Image
              src={plant.imageUrl}
              alt={plant.commonName}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover"
            />
            {/* Color accent overlay on hover */}
            <motion.div
              className="absolute inset-0"
              style={{ background: plant.accentColor }}
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 0.15 }}
              transition={{ duration: 0.3 }}
            />
          </motion.div>
        </div>

        {/* Card content */}
        <div className="px-1">
          {/* Type tags */}
          <div className="flex flex-wrap gap-1.5 mb-2">
            {plant.types.slice(0, 2).map((type) => (
              <span
                key={type}
                className="text-[0.65rem] uppercase tracking-widest px-2 py-0.5 rounded-full border border-line text-ink-soft"
              >
                {type}
              </span>
            ))}
          </div>

          {/* Name */}
          <h3 className="font-display font-bold text-ink text-xl leading-tight mb-1 group-hover:text-moss transition-colors duration-300">
            {plant.commonName}
          </h3>

          {/* Scientific name */}
          <p className="font-mono text-ink-soft text-xs italic mb-2">
            {plant.scientificName}
          </p>

          {/* Description */}
          <p className="text-ink-soft text-sm leading-relaxed line-clamp-2">
            {plant.description}
          </p>

          {/* Read more indicator */}
          <div className="flex items-center gap-1.5 mt-3 text-moss text-xs font-semibold uppercase tracking-wide opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <span>Ver detalle</span>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
              <path d="M1 6h10M7 2l4 4-4 4"/>
            </svg>
          </div>
        </div>
      </motion.article>

      {/* Full-screen modal */}
      <AnimatePresence>
        {isOpen && (
          <PlantModal plant={plant} onClose={() => setIsOpen(false)} />
        )}
      </AnimatePresence>
    </>
  )
}

function PlantModal({ plant, onClose }: { plant: Plant; onClose: () => void }) {
  return (
    <>
      {/* Backdrop */}
      <motion.div
        className="fixed inset-0 bg-ink/50 z-50 cursor-pointer"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        onClick={onClose}
      />

      {/* Modal */}
      <motion.div
        layoutId={`plant-card-${plant.id}`}
        className="fixed inset-4 md:inset-10 lg:inset-16 bg-surface rounded-2xl z-50 overflow-hidden flex flex-col md:flex-row shadow-2xl"
      >
        {/* Image panel */}
        <div className="relative w-full md:w-[45%] flex-shrink-0 h-64 md:h-auto overflow-hidden">
          <Image
            src={plant.imageUrl}
            alt={plant.commonName}
            fill
            sizes="(max-width: 768px) 100vw, 45vw"
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/40 to-transparent" />
        </div>

        {/* Content panel */}
        <div className="flex-1 overflow-y-auto p-6 md:p-10">
          {/* Close button */}
          <div className="flex justify-end mb-6">
            <button
              onClick={onClose}
              aria-label="Cerrar"
              className="w-9 h-9 rounded-full border border-line flex items-center justify-center hover:border-ink transition-colors"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                <path d="M1 1l12 12M13 1L1 13"/>
              </svg>
            </button>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-4">
            {plant.types.map((type) => (
              <span
                key={type}
                className="text-xs uppercase tracking-widest px-3 py-1 rounded-full border border-moss text-moss"
              >
                {type}
              </span>
            ))}
          </div>

          {/* Names */}
          <h2 className="font-display font-black text-ink leading-tight mb-1" style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}>
            {plant.commonName}
          </h2>
          <p className="font-mono text-ink-soft text-sm italic mb-6">
            {plant.scientificName}
          </p>

          {/* Description */}
          <p className="text-ink-soft text-base leading-relaxed mb-8">
            {plant.description}
          </p>

          {/* Benefits */}
          {plant.benefits.length > 0 && (
            <div>
              <p className="text-eyebrow text-ink-soft mb-4">Beneficios</p>
              <ul className="space-y-3">
                {plant.benefits.map((benefit, i) => (
                  <motion.li
                    key={i}
                    className="flex items-start gap-3 text-ink text-sm"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.08, duration: 0.4 }}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-moss flex-shrink-0 mt-2" />
                    {benefit}
                  </motion.li>
                ))}
              </ul>
            </div>
          )}

          {/* Video placeholder */}
          <div className="mt-8 rounded-xl bg-bg border border-line p-6 flex flex-col items-center justify-center gap-3 min-h-[140px]">
            <div className="w-10 h-10 rounded-full border-2 border-moss/40 flex items-center justify-center">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="var(--moss)" className="ml-0.5">
                <path d="M3 2l11 6-11 6V2z"/>
              </svg>
            </div>
            <p className="text-ink-soft text-sm text-center">
              Video próximamente — grabación en el jardín SOSAC-Lab
            </p>
          </div>

          {/* Share */}
          <div className="mt-6 flex items-center gap-3">
            <p className="text-eyebrow text-ink-soft">Compartir</p>
            <a
              href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(`Conoce la ${plant.commonName} (${plant.scientificName}) en el jardín @sosacmx en Monterrey`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-full border border-line flex items-center justify-center hover:border-ink transition-colors"
              aria-label="Compartir en Twitter"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" className="text-ink-soft">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.748l7.73-8.835L1.254 2.25H8.08l4.259 5.63 5.905-5.63zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </a>
          </div>
        </div>
      </motion.div>
    </>
  )
}
