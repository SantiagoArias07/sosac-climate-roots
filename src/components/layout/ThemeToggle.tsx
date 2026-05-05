'use client'

import { useTheme } from 'next-themes'
import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const overlayRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setMounted(true)
  }, [])

  function handleToggle() {
    if (isTransitioning || !buttonRef.current) return

    setIsTransitioning(true)

    const rect = buttonRef.current.getBoundingClientRect()
    const originX = rect.left + rect.width / 2
    const originY = rect.top + rect.height / 2

    // Calculate max radius needed to cover the whole screen
    const maxRadius = Math.max(
      Math.hypot(originX, originY),
      Math.hypot(window.innerWidth - originX, originY),
      Math.hypot(originX, window.innerHeight - originY),
      Math.hypot(window.innerWidth - originX, window.innerHeight - originY),
    )

    if (overlayRef.current) {
      overlayRef.current.style.setProperty('--origin-x', `${originX}px`)
      overlayRef.current.style.setProperty('--origin-y', `${originY}px`)
      overlayRef.current.style.setProperty('--max-radius', `${maxRadius}px`)
      overlayRef.current.style.background =
        theme === 'dark' ? '#F4F1EA' : '#0F1612'
    }

    // Animate the clip-path
    setTimeout(() => {
      setTheme(theme === 'dark' ? 'light' : 'dark')
    }, 150)

    setTimeout(() => {
      setIsTransitioning(false)
    }, 700)
  }

  if (!mounted) {
    return (
      <div className="w-10 h-10 rounded-full border border-line" />
    )
  }

  const isDark = theme === 'dark'

  return (
    <>
      {/* Transition overlay */}
      <AnimatePresence>
        {isTransitioning && (
          <motion.div
            ref={overlayRef}
            className="fixed inset-0 pointer-events-none z-[99999]"
            style={{
              background: isDark ? '#F4F1EA' : '#0F1612',
            }}
            initial={{
              clipPath: `circle(0px at var(--origin-x, 50%) var(--origin-y, 50%))`,
            }}
            animate={{
              clipPath: `circle(var(--max-radius, 150%) at var(--origin-x, 50%) var(--origin-y, 50%))`,
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          />
        )}
      </AnimatePresence>

      <button
        ref={buttonRef}
        onClick={handleToggle}
        aria-label={isDark ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
        className="relative w-10 h-10 rounded-full border border-line flex items-center justify-center hover:border-moss transition-colors duration-300 focus-visible:outline-moss"
      >
        <motion.div
          key={isDark ? 'moon' : 'sun'}
          initial={{ scale: 0, rotate: -90, opacity: 0 }}
          animate={{ scale: 1, rotate: 0, opacity: 1 }}
          exit={{ scale: 0, rotate: 90, opacity: 0 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0 flex items-center justify-center"
        >
          {isDark ? (
            // Sun icon
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-ink">
              <circle cx="12" cy="12" r="4"/>
              <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/>
            </svg>
          ) : (
            // Moon icon
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-ink">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
            </svg>
          )}
        </motion.div>
      </button>
    </>
  )
}
