'use client'

import { useRef, useState } from 'react'
import Image from 'next/image'
import { motion, useInView } from 'framer-motion'
import { sessions } from '@/data/garden'
import { formatDate } from '@/lib/utils'
import { ScrollReveal, StaggerContainer, staggerChild } from '../motion/ScrollReveal'
import { RegistrationModal } from '../ui/RegistrationModal'

const WA_NUMBER = process.env.NEXT_PUBLIC_WA_NUMBER ?? '521XXXXXXXXXX'
const WA_MESSAGE = encodeURIComponent(
  'Hola, me interesa participar en la próxima sesión de Café & Jardín en SOSAC-Lab.',
)
const WA_URL = `https://wa.me/${WA_NUMBER}?text=${WA_MESSAGE}`

export function CafeJardin() {
  const statRef = useRef<HTMLDivElement>(null)
  const isStatInView = useInView(statRef, { once: true, margin: '-10% 0px' })
  const [modalOpen, setModalOpen] = useState(false)

  return (
    <section
      id="cafe-jardin"
      className="section-gap"
      aria-label="Café y Jardín"
    >
      <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16">
        {/* Section header */}
        <div className="mb-16">
          <ScrollReveal>
            <p className="text-eyebrow text-ink-soft mb-3">Comunidad</p>
          </ScrollReveal>
          <div className="grid grid-cols-12 items-end gap-4">
            <div className="col-span-12 md:col-span-7">
              <ScrollReveal delay={0.1}>
                <h2 className="text-h2 font-display font-black text-ink leading-tight">
                  Café &{' '}
                  <span className="italic text-bloom">Jardín</span>
                </h2>
              </ScrollReveal>
            </div>
            <div className="col-span-12 md:col-span-5">
              <ScrollReveal delay={0.2}>
                <p className="text-ink-soft text-base leading-relaxed">
                  Diálogos ciudadanos alrededor del jardín. Cada sesión
                  es una excusa para aprender, conectar y hacer ciudad
                  de otra manera.
                </p>
              </ScrollReveal>
            </div>
          </div>
        </div>

        {/* Stat callout */}
        <ScrollReveal className="mb-16">
          <div
            ref={statRef}
            className="inline-flex items-baseline gap-3 px-6 py-4 rounded-2xl border border-bloom/30 bg-bloom/5"
          >
            <motion.span
              className="font-display font-black text-bloom"
              style={{ fontSize: 'clamp(3rem, 8vw, 5rem)', lineHeight: 1 }}
              initial={{ opacity: 0, y: 20 }}
              animate={isStatInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              147
            </motion.span>
            <span className="text-ink-soft text-base md:text-lg">
              personas reunidas en 2025
            </span>
          </div>
        </ScrollReveal>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          {/* Left: Timeline */}
          <div className="lg:col-span-7">
            <p className="text-eyebrow text-ink-soft mb-8">Sesiones 2025</p>

            <div className="relative">
              {/* Vertical line */}
              <div className="absolute left-5 top-0 bottom-0 w-px timeline-line" />

              <StaggerContainer className="space-y-0">
                {sessions.map((session, i) => (
                  <motion.article
                    key={session.id}
                    variants={staggerChild}
                    className="relative flex gap-6 pb-12 last:pb-0"
                  >
                    {/* Timeline dot */}
                    <div className="relative z-10 flex-shrink-0">
                      <div className="w-10 h-10 rounded-full border-2 border-line bg-surface flex items-center justify-center">
                        <span className="font-display font-black text-sm text-ink">
                          {String(i + 1).padStart(2, '0')}
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 pt-1 pb-0">
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-3">
                        <time
                          dateTime={session.date}
                          className="text-eyebrow text-moss"
                        >
                          {formatDate(session.date)}
                        </time>
                        <span className="text-eyebrow text-ink-soft">
                          {session.participants} personas
                        </span>
                      </div>

                      <h3 className="font-display font-bold text-ink text-xl mb-2 leading-tight">
                        {session.title}
                      </h3>

                      <p className="text-ink-soft text-sm leading-relaxed mb-4">
                        {session.description}
                      </p>

                      {/* Session image */}
                      <div className="relative overflow-hidden rounded-xl" style={{ aspectRatio: '16/7' }}>
                        {/* TODO: replace with SOSAC photo */}
                        <Image
                          src={session.imageUrl}
                          alt={session.title}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 60vw, 50vw"
                          className="object-cover transition-transform duration-700 hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-ink/20 to-transparent" />
                      </div>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-1.5 mt-3">
                        {session.tags.map((tag) => (
                          <span
                            key={tag}
                            className="text-[0.65rem] uppercase tracking-widest px-2 py-0.5 rounded-full border border-line text-ink-soft"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.article>
                ))}
              </StaggerContainer>
            </div>
          </div>

          {/* Right: Next session CTA */}
          <div className="lg:col-span-5 lg:sticky lg:top-28">
            <ScrollReveal delay={0.2}>
              <div className="p-8 rounded-2xl border-2 border-moss bg-moss/5 relative overflow-hidden">
                {/* Background leaf accent */}
                <div className="absolute -right-8 -top-8 w-40 h-40 opacity-5">
                  <svg viewBox="0 0 100 140" fill="var(--moss)">
                    <path d="M50 130 C50 130, 10 95, 10 55 C10 20, 30 5, 50 5 C70 5, 90 20, 90 55 C90 95, 50 130, 50 130Z"/>
                  </svg>
                </div>

                <div className="relative z-10">
                  <p className="text-eyebrow text-moss mb-3">Próxima sesión</p>

                  <h3 className="font-display font-black text-ink text-2xl md:text-3xl leading-tight mb-2">
                    Café & Jardín
                    <br />
                    <span className="italic text-moss">Junio 2025</span>
                  </h3>

                  <div className="flex items-center gap-2 mb-6">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--moss)" strokeWidth="2" strokeLinecap="round">
                      <rect x="3" y="4" width="18" height="18" rx="2"/>
                      <path d="M16 2v4M8 2v4M3 10h18"/>
                    </svg>
                    <span className="text-ink-soft text-sm">Fecha por confirmar · Monterrey</span>
                  </div>

                  <p className="text-ink-soft text-sm leading-relaxed mb-8">
                    Cada mes nos reunimos en el jardín para explorar un tema
                    relacionado con la ecología urbana. Café de por medio,
                    siempre con las manos en la tierra.
                  </p>

                  {/* Primary CTA + WhatsApp secondary */}
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setModalOpen(true)}
                      className="flex-1 px-5 py-4 rounded-full bg-moss text-bg font-semibold text-sm hover:bg-moss-deep active:scale-[0.98] transition-all duration-300"
                    >
                      Inscribirme a la próxima sesión
                    </button>

                    {/* WhatsApp circular secondary button */}
                    <a
                      href={WA_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Contactar por WhatsApp"
                      className="w-[52px] h-[52px] rounded-full flex items-center justify-center shrink-0 transition-all duration-300 active:scale-95"
                      style={{ background: '#25D366' }}
                      onMouseEnter={e => (e.currentTarget.style.background = '#128C7E')}
                      onMouseLeave={e => (e.currentTarget.style.background = '#25D366')}
                    >
                      {/* WhatsApp logo SVG */}
                      <svg width="26" height="26" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347zm-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884zm8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                      </svg>
                    </a>
                  </div>

                  <p className="text-center text-ink-soft text-xs mt-3">
                    Cupo limitado · Entrada libre
                  </p>
                </div>
              </div>
            </ScrollReveal>

            {/* Past sessions mini-stat */}
            <ScrollReveal delay={0.35} className="mt-6 grid grid-cols-2 gap-4">
              <div className="p-5 rounded-xl border border-line text-center">
                <p className="font-display font-black text-ink text-3xl">4</p>
                <p className="text-ink-soft text-xs mt-1">sesiones en 2025</p>
              </div>
              <div className="p-5 rounded-xl border border-line text-center">
                <p className="font-display font-black text-moss text-3xl">147</p>
                <p className="text-ink-soft text-xs mt-1">participantes</p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>

      <RegistrationModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </section>
  )
}
