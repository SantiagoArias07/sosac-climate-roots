'use client'

import { useEffect, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ThemeToggle } from './ThemeToggle'
import { MagneticButton } from '../ui/MagneticButton'
import { cn } from '@/lib/utils'

const links = [
  { label: 'Catálogo', href: '#catalogo' },
  { label: 'Mapa', href: '#mapa' },
  { label: 'Café & Jardín', href: '#cafe-jardin' },
  { label: 'Biodiversidad', href: '#biodiversidad' },
]

export function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const { scrollY } = useScroll()

  useEffect(() => {
    const unsubscribe = scrollY.on('change', (latest) => {
      setScrolled(latest > 60)
    })
    return unsubscribe
  }, [scrollY])

  function handleNavClick(href: string) {
    setMenuOpen(false)
    const el = document.querySelector(href)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <motion.header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
        scrolled
          ? 'nav-blur bg-bg/80 border-b border-line/40'
          : 'bg-transparent',
      )}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, delay: 1.8, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16 h-16 md:h-20 flex items-center justify-between">
        {/* Logo */}
        <a
          href="#"
          className="group flex items-center gap-2 focus-visible:outline-none"
          aria-label="Climate Roots inicio"
        >
          <div className="w-8 h-8 rounded-full bg-moss flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-bg">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z" fill="currentColor"/>
              <path d="M12 2 C9 8, 6 12, 12 22 C18 12, 15 8, 12 2Z" fill="currentColor" opacity="0.7"/>
            </svg>
          </div>
          <span className="font-display font-bold text-lg tracking-tight text-ink">
            Climate<span className="text-moss"> Roots</span>
          </span>
        </a>

        {/* Desktop nav links */}
        <nav className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <button
              key={link.href}
              onClick={() => handleNavClick(link.href)}
              className="text-eyebrow text-ink-soft hover:text-ink transition-colors duration-300 underline-draw focus-visible:outline-none"
            >
              {link.label}
            </button>
          ))}
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-3 md:gap-4">
          <ThemeToggle />

          <MagneticButton
            href="#cafe-jardin"
            className="hidden md:flex items-center gap-2 px-5 py-2.5 rounded-full bg-moss text-bg text-eyebrow font-semibold hover:bg-moss-deep transition-colors duration-300"
          >
            Quiero participar
          </MagneticButton>

          {/* Mobile menu button */}
          <button
            className="md:hidden w-10 h-10 flex flex-col items-center justify-center gap-1.5 focus-visible:outline-moss rounded"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Abrir menú"
            aria-expanded={menuOpen}
          >
            <motion.span
              className="block w-5 h-px bg-ink"
              animate={menuOpen ? { rotate: 45, y: 5 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.3 }}
            />
            <motion.span
              className="block w-5 h-px bg-ink"
              animate={menuOpen ? { opacity: 0 } : { opacity: 1 }}
              transition={{ duration: 0.2 }}
            />
            <motion.span
              className="block w-5 h-px bg-ink"
              animate={menuOpen ? { rotate: -45, y: -5 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.3 }}
            />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <motion.div
        className="md:hidden overflow-hidden"
        initial={false}
        animate={{ height: menuOpen ? 'auto' : 0, opacity: menuOpen ? 1 : 0 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="px-6 pb-6 pt-2 flex flex-col gap-4 nav-blur bg-bg/90 border-t border-line/40">
          {links.map((link, i) => (
            <motion.button
              key={link.href}
              onClick={() => handleNavClick(link.href)}
              className="text-left font-display text-2xl font-bold text-ink hover:text-moss transition-colors duration-200"
              initial={{ x: -20, opacity: 0 }}
              animate={
                menuOpen
                  ? { x: 0, opacity: 1 }
                  : { x: -20, opacity: 0 }
              }
              transition={{
                delay: i * 0.06,
                duration: 0.4,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              {link.label}
            </motion.button>
          ))}
          <motion.a
            href="#cafe-jardin"
            onClick={() => setMenuOpen(false)}
            className="mt-2 inline-flex w-full items-center justify-center px-5 py-3 rounded-full bg-moss text-bg text-eyebrow font-semibold"
            initial={{ opacity: 0, y: 10 }}
            animate={menuOpen ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
            transition={{ delay: 0.24, duration: 0.4 }}
          >
            Quiero participar
          </motion.a>
        </div>
      </motion.div>
    </motion.header>
  )
}
