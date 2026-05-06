'use client'

import { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { plants, PlantType } from '@/data/garden'
import { PlantCard } from '../ui/PlantCard'
import { ScrambleText } from '../ui/RevealText'
import { cn } from '@/lib/utils'

const filters: { label: string; value: PlantType | 'all' }[] = [
  { label: 'Todas', value: 'all' },
  { label: 'Polinizadoras', value: PlantType.Polinizadora },
  { label: 'Medicinales', value: PlantType.Medicinal },
  { label: 'Aromáticas', value: PlantType.Aromatica },
  { label: 'Comestibles', value: PlantType.Comestible },
  { label: 'Ornamentales', value: PlantType.Ornamental },
]

export function Catalogue() {
  const [activeFilter, setActiveFilter] = useState<PlantType | 'all'>('all')
  const headerRef = useRef<HTMLDivElement>(null)
  const isHeaderInView = useInView(headerRef, { once: true, margin: '-5% 0px' })

  const filtered =
    activeFilter === 'all'
      ? plants
      : plants.filter((p) => p.types.includes(activeFilter))

  return (
    <section
      id="catalogo"
      className="section-gap"
      aria-label="Catálogo de plantas"
    >
      <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16">
        {/* Header — asymmetric */}
        <div ref={headerRef} className="grid grid-cols-12 mb-14 md:mb-20">
          <div className="col-span-12 md:col-span-8 md:col-start-1">
            <motion.p
              className="text-eyebrow text-ink-soft mb-3"
              initial={{ opacity: 0, y: 15 }}
              animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              Catálogo
            </motion.p>
            <h2 className="text-h2 font-display font-black text-ink leading-tight">
              <span className="block md:inline">
                <ScrambleText text="Las plantas del" delay={0.1} />
              </span>
              {/* whitespace-nowrap keeps "jardín" as one unit — never breaks mid-word */}
              <span className="inline-block whitespace-nowrap md:ml-[0.25em]">
                <ScrambleText
                  text="jardín"
                  className="italic text-moss"
                  delay={0.4}
                />
              </span>
            </h2>
          </div>

          <div className="col-span-12 md:col-span-4 md:col-start-9 flex md:items-end md:justify-end mt-6 md:mt-0">
            <motion.p
              className="text-ink-soft text-sm max-w-xs"
              initial={{ opacity: 0, y: 20 }}
              animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              {plants.length} especies documentadas. Haz clic en cualquier
              planta para ver su ficha completa.
            </motion.p>
          </div>
        </div>

        {/* Filter pills */}
        <motion.div
          className="flex flex-wrap gap-2 mb-10 md:mb-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-5% 0px' }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          {filters.map((filter) => (
            <button
              key={filter.value}
              onClick={() => setActiveFilter(filter.value)}
              className={cn(
                'filter-pill',
                activeFilter === filter.value && 'active',
              )}
            >
              {filter.label}
            </button>
          ))}
        </motion.div>

        {/* Plant grid */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12"
        >
          {filtered.map((plant, i) => (
            <motion.div
              key={plant.id}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              <PlantCard plant={plant} index={i} />
            </motion.div>
          ))}
        </motion.div>

        {filtered.length === 0 && (
          <motion.p
            className="text-center text-ink-soft py-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            No hay plantas en esta categoría aún.
          </motion.p>
        )}
      </div>
    </section>
  )
}
