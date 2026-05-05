'use client'

import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { Zone, Plant } from '@/data/garden'

interface ZonePanelProps {
  zone: Zone | null
  plants: Plant[]
  onClose: () => void
}

export function ZonePanel({ zone, plants, onClose }: ZonePanelProps) {
  const zonePlants = zone
    ? plants.filter((p) => p.zoneId === zone.id)
    : []

  return (
    <AnimatePresence>
      {zone && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-ink/30 z-40 cursor-pointer"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
          />

          {/* Panel */}
          <motion.aside
            className="fixed top-0 right-0 h-full w-full max-w-md bg-surface z-50 overflow-y-auto shadow-2xl"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Header */}
            <div
              className="sticky top-0 z-10 px-6 py-5 border-b border-line flex items-center justify-between"
              style={{ background: 'var(--surface)' }}
            >
              <div>
                <p className="text-eyebrow text-ink-soft mb-1">Zona</p>
                <h3 className="font-display font-bold text-xl text-ink leading-tight">
                  {zone.name}
                </h3>
              </div>
              <button
                onClick={onClose}
                aria-label="Cerrar panel"
                className="w-9 h-9 rounded-full border border-line flex items-center justify-center hover:border-ink transition-colors"
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                  <path d="M1 1l12 12M13 1L1 13"/>
                </svg>
              </button>
            </div>

            {/* Zone description */}
            <div className="px-6 py-5 border-b border-line">
              <p className="text-ink-soft text-sm leading-relaxed">
                {zone.description}
              </p>
            </div>

            {/* Plants list */}
            <div className="px-6 py-5">
              {zonePlants.length === 0 ? (
                <p className="text-ink-soft text-sm italic">
                  No hay plantas registradas en esta zona todavía.
                </p>
              ) : (
                <div className="space-y-4">
                  <p className="text-eyebrow text-ink-soft mb-4">
                    Plantas en esta zona
                  </p>
                  {zonePlants.map((plant, i) => (
                    <motion.div
                      key={plant.id}
                      className="flex items-center gap-4 p-3 rounded-lg hover:bg-bg transition-colors"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        delay: i * 0.07,
                        duration: 0.5,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                    >
                      <div className="w-14 h-14 rounded-lg overflow-hidden flex-shrink-0">
                        <Image
                          src={plant.imageUrl}
                          alt={plant.commonName}
                          width={56}
                          height={56}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-display font-bold text-ink text-sm leading-tight">
                          {plant.commonName}
                        </p>
                        <p className="font-mono text-ink-soft text-xs italic mt-0.5 truncate">
                          {plant.scientificName}
                        </p>
                        <div className="flex flex-wrap gap-1 mt-1.5">
                          {plant.types.slice(0, 2).map((t) => (
                            <span
                              key={t}
                              className="text-[10px] uppercase tracking-wide px-1.5 py-0.5 rounded-full bg-moss/10 text-moss"
                            >
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  )
}
