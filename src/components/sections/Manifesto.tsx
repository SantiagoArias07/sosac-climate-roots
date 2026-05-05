'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import { ScrollReveal } from '../motion/ScrollReveal'

export function Manifesto() {
  const sectionRef = useRef<HTMLElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)
  const isImageInView = useInView(imageRef, { once: true, margin: '-15% 0px' })

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })
  const imageParallax = useTransform(scrollYProgress, [0, 1], ['-8%', '8%'])

  return (
    <section
      ref={sectionRef}
      id="manifesto"
      className="section-gap relative overflow-hidden"
      aria-label="Manifiesto SOSAC-Lab"
    >
      <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16">
        {/* Asymmetric layout */}
        <div className="grid grid-cols-12 gap-4 md:gap-8 items-start">
          {/* Pull quote — spans columns 1-7 on desktop */}
          <div className="col-span-12 lg:col-span-7 lg:col-start-1">
            <ScrollReveal delay={0.1}>
              <p className="text-eyebrow text-ink-soft mb-8">
                Manifiesto
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <blockquote
                className="font-display font-black italic text-ink leading-tight mb-12"
                style={{ fontSize: 'clamp(2rem, 5vw, 4rem)' }}
              >
                &ldquo;Probamos que la infraestructura natural puede mitigar
                integralmente los desafíos urbanos.&rdquo;
              </blockquote>
            </ScrollReveal>

            {/* Three paragraphs — offset slightly right */}
            <div className="lg:pl-12 space-y-6">
              <ScrollReveal delay={0.3}>
                <p className="text-ink-soft text-base md:text-lg leading-relaxed">
                  SOSAC-Lab es un espacio de aprendizaje y acción dedicado
                  a catalizar la transformación ecológica y social de la
                  Zona Metropolitana de Monterrey a través de Soluciones
                  Basadas en la Naturaleza.
                </p>
              </ScrollReveal>

              <ScrollReveal delay={0.4}>
                <p className="text-ink-soft text-base md:text-lg leading-relaxed">
                  En 1,100 m² de ciudad convertidos en jardín, demostramos
                  que los espacios residuales urbanos tienen el potencial de
                  bajar la temperatura local, absorber agua pluvial, albergar
                  biodiversidad y construir comunidad al mismo tiempo.
                </p>
              </ScrollReveal>

              <ScrollReveal delay={0.5}>
                <p className="text-ink-soft text-base md:text-lg leading-relaxed">
                  Climate Roots es el catálogo vivo de esa demostración:
                  cada planta, cada zona, cada sesión de Café & Jardín
                  es evidencia de que otro modelo de ciudad es posible.
                </p>
              </ScrollReveal>
            </div>

            {/* Horizontal line accent */}
            <ScrollReveal delay={0.6} className="mt-10">
              <div className="flex items-center gap-4">
                <div className="h-px flex-1 max-w-[80px] bg-moss" />
                <span className="text-eyebrow text-moss">ODS 13 · Acción por el Clima</span>
              </div>
            </ScrollReveal>
          </div>

          {/* Image — columns 9-12 on desktop, floated out */}
          <div className="col-span-12 lg:col-span-5 lg:col-start-8 mt-10 lg:mt-0">
            <div
              ref={imageRef}
              className="relative overflow-hidden"
              style={{ borderRadius: '2px 40% 2px 40% / 40% 2px 40% 2px' }}
            >
              {/* Clip-path mask reveal */}
              <motion.div
                className="relative"
                initial={{ clipPath: 'inset(100% 0% 0% 0%)' }}
                animate={
                  isImageInView
                    ? { clipPath: 'inset(0% 0% 0% 0%)' }
                    : {}
                }
                transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
              >
                <motion.div style={{ y: imageParallax }}>
                  {/* TODO: replace with SOSAC photo */}
                  <Image
                    src="https://images.unsplash.com/photo-1459156212016-c812468e2115?auto=format&fit=crop&w=1200&q=80"
                    alt="Zona medicinal del jardín SOSAC-Lab"
                    width={800}
                    height={1000}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 40vw"
                    className="w-full object-cover"
                    style={{ aspectRatio: '4/5' }}
                  />
                </motion.div>
              </motion.div>

              {/* Caption overlay */}
              <div className="absolute bottom-4 left-4 right-4">
                <p className="text-xs text-white/70 font-mono">
                  Jardín Medicinal · SOSAC-Lab · Monterrey
                </p>
              </div>
            </div>

            {/* Stats accent below image */}
            <ScrollReveal delay={0.5} className="mt-6 pl-4 border-l-2 border-bloom">
              <p className="font-display font-black text-bloom" style={{ fontSize: 'clamp(2.5rem, 6vw, 4rem)' }}>
                –1.2°C
              </p>
              <p className="text-ink-soft text-sm mt-1">
                reducción de temperatura superficial registrada
              </p>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  )
}
