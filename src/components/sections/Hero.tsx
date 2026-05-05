'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { motion, useScroll, useTransform } from 'framer-motion'
import { AnimatedNumber } from '../ui/AnimatedNumber'

const stats = [
  {
    value: 1100,
    prefix: '',
    suffix: ' m²',
    label: 'Área de cobertura vegetal recuperada',
    sublabel: 'Con acciones de mantenimiento',
    decimals: 0,
  },
  {
    value: 1.2,
    prefix: '–',
    suffix: ' °C*',
    label: 'Reducción de islas de calor',
    sublabel: 'Mejora de sensación térmica',
    decimals: 1,
  },
  {
    value: 147,
    prefix: '',
    suffix: '',
    label: 'participantes',
    sublabel: 'En 4 sesiones de Café & Jardín',
    decimals: 0,
  },
]

// Leaf SVG for ambient animation
function FloatingLeaf({
  style,
  delay,
  size,
}: {
  style: React.CSSProperties
  delay: number
  size: number
}) {
  return (
    <motion.div
      className="absolute pointer-events-none opacity-20"
      style={style}
      animate={{
        y: [0, -30, -10, -40, 0],
        rotate: [0, 15, -8, 20, 0],
        x: [0, 10, -5, 8, 0],
      }}
      transition={{
        duration: 12 + delay * 2,
        delay,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 60 80"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M30 75 C30 75, 5 55, 5 30 C5 10, 20 2, 30 2 C40 2, 55 10, 55 30 C55 55, 30 75, 30 75Z"
          fill="currentColor"
          className="text-moss"
        />
        <line x1="30" y1="75" x2="30" y2="10" stroke="currentColor" strokeWidth="1.5" className="text-moss-deep" opacity="0.5"/>
        <path d="M30 30 Q20 22 12 28" stroke="currentColor" strokeWidth="1" fill="none" className="text-moss-deep" opacity="0.4"/>
        <path d="M30 40 Q40 32 48 38" stroke="currentColor" strokeWidth="1" fill="none" className="text-moss-deep" opacity="0.4"/>
      </svg>
    </motion.div>
  )
}

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  })

  const imageY = useTransform(scrollYProgress, [0, 1], ['0%', '20%'])
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '12%'])
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0])

  const leaves = [
    { style: { top: '15%', left: '8%' }, delay: 0, size: 48 },
    { style: { top: '30%', right: '6%' }, delay: 1.5, size: 64 },
    { style: { top: '60%', left: '3%' }, delay: 3, size: 36 },
    { style: { top: '20%', right: '20%' }, delay: 2, size: 28 },
    { style: { bottom: '30%', right: '12%' }, delay: 0.8, size: 52 },
    { style: { top: '50%', left: '18%' }, delay: 4, size: 32 },
  ]

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex flex-col overflow-hidden"
      aria-label="Hero"
    >
      {/* Background image with parallax */}
      <motion.div
        className="absolute inset-0 z-0"
        style={{ y: imageY }}
      >
        {/* TODO: replace with SOSAC garden photo */}
        <Image
          src="https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&w=2000&q=80"
          alt="Jardín urbano SOSAC-Lab"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
          placeholder="blur"
          blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/2wBDAQkJCQwLDBgNDRgyIRwhMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjL/wAARCAAIAAoDASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAABgUE/8QAIhAAAQMEAwEBAAAAAAAAAAAAAQIDBAAFERIhMVH/xAAUAQEAAAAAAAAAAAAAAAAAAAAA/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8Ai7Y6TtmrK8u+5NlqFPk5xp+FtqKlBCQBxsAAAAAA/9k="
        />
        {/* Dark gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-ink/80 via-ink/50 to-ink/20" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-ink/60" />
      </motion.div>

      {/* Floating leaf silhouettes */}
      {leaves.map((leaf, i) => (
        <FloatingLeaf key={i} {...leaf} />
      ))}

      {/* Main hero content */}
      <motion.div
        className="relative z-10 flex-1 flex flex-col justify-end px-6 md:px-10 lg:px-16 pb-[clamp(4rem,10vw,8rem)]"
        style={{ y: textY, opacity }}
      >
        <div className="max-w-[1440px] mx-auto w-full">
          {/* Eyebrow */}
          <motion.p
            className="text-eyebrow text-leaf mb-6 md:mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            SOSAC-LAB · MONTERREY · 2025
          </motion.p>

          {/* Main headline — two lines */}
          <div className="overflow-hidden">
            <motion.h1
              className="font-display font-black text-hero text-white leading-none"
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              transition={{ duration: 1.1, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              Donde la ciudad
            </motion.h1>
          </div>
          <div className="overflow-hidden">
            <motion.span
              className="block font-display font-black text-hero italic leading-none"
              style={{ marginTop: '-0.05em', color: '#87A878' }}
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              transition={{ duration: 1.1, delay: 0.65, ease: [0.22, 1, 0.36, 1] }}
            >
              respira de nuevo
            </motion.span>
          </div>

          {/* Subtitle */}
          <motion.p
            className="mt-6 md:mt-8 max-w-lg text-white/80 text-base md:text-lg leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.9, ease: [0.22, 1, 0.36, 1] }}
          >
            Un laboratorio vivo de soluciones basadas en la naturaleza en
            el corazón de la Zona Metropolitana de Monterrey.
          </motion.p>

          {/* Stats strip */}
          <motion.div
            className="mt-12 md:mt-16 grid grid-cols-3 gap-4 md:gap-8 max-w-2xl"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 1.1, ease: [0.22, 1, 0.36, 1] }}
          >
            {stats.map((stat, i) => (
              <div key={i} className="flex flex-col gap-1">
                <div
                  className="font-display font-black text-white leading-none"
                  style={{ fontSize: 'clamp(1.6rem, 4.5vw, 3.2rem)' }}
                >
                  <AnimatedNumber
                    value={stat.value}
                    prefix={stat.prefix}
                    suffix={stat.suffix}
                    decimals={stat.decimals}
                    duration={2}
                  />
                </div>
                <p className="text-white/75 text-[0.7rem] md:text-xs leading-snug mt-0.5">
                  {stat.label}
                </p>
                {'sublabel' in stat && stat.sublabel && (
                  <p className="text-white/45 text-[0.65rem] leading-snug">
                    {stat.sublabel}
                  </p>
                )}
              </div>
            ))}
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll indicator — bottom-right, editorial mouse icon */}
      <motion.div
        className="absolute bottom-8 right-6 md:right-10 lg:right-16 z-10 flex flex-col items-center gap-3"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.8, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        style={{ opacity }}
        aria-hidden="true"
      >
        {/* Mouse silhouette */}
        <div className="w-[22px] h-[34px] rounded-full border border-white/35 flex justify-center pt-[6px]">
          <motion.div
            className="w-[3px] h-[8px] rounded-full bg-white/70"
            animate={{ y: [0, 10, 0], opacity: [1, 0.2, 1] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>
        {/* Label */}
        <span
          className="text-white/35 font-mono"
          style={{
            fontSize: '0.6rem',
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            writingMode: 'vertical-rl',
          }}
        >
          scroll
        </span>
      </motion.div>
    </section>
  )
}
