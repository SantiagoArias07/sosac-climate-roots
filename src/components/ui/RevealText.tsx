'use client'

import { useRef } from 'react'
import { motion, useInView, Variants } from 'framer-motion'

interface RevealTextProps {
  text: string
  className?: string
  delay?: number
  once?: boolean
  tag?: 'h1' | 'h2' | 'h3' | 'p' | 'span'
}

const wordVariants: Variants = {
  hidden: {
    y: '110%',
    rotateX: -20,
    opacity: 0,
  },
  visible: {
    y: '0%',
    rotateX: 0,
    opacity: 1,
  },
}

export function RevealText({
  text,
  className,
  delay = 0,
  once = true,
  tag: Tag = 'span',
}: RevealTextProps) {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref as React.RefObject<Element>, { once, margin: '-5% 0px' })
  const words = text.split(' ')

  return (
    <Tag
      ref={ref as React.RefObject<HTMLElement & HTMLHeadingElement & HTMLParagraphElement>}
      className={className}
      aria-label={text}
      style={{ perspective: '800px' }}
    >
      {words.map((word, i) => (
        <span
          key={i}
          className="inline-block overflow-hidden"
          style={{ marginRight: '0.25em' }}
        >
          <motion.span
            className="inline-block"
            variants={wordVariants}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            transition={{
              duration: 0.9,
              delay: delay + i * 0.07,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </Tag>
  )
}

// Letter-by-letter scramble for hero headlines
interface ScrambleTextProps {
  text: string
  className?: string
  delay?: number
  once?: boolean
}

export function ScrambleText({
  text,
  className,
  delay = 0,
  once = true,
}: ScrambleTextProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once, margin: '-5% 0px' })
  const letters = text.split('')

  return (
    <span ref={ref} className={className} aria-label={text}>
      {letters.map((letter, i) => (
        <motion.span
          key={i}
          className="inline-block"
          style={{ whiteSpace: letter === ' ' ? 'pre' : 'normal' }}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{
            duration: 0.5,
            delay: delay + i * 0.035,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          {letter}
        </motion.span>
      ))}
    </span>
  )
}
