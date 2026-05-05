'use client'

import { useRef, useEffect, useState } from 'react'
import { useInView, animate } from 'framer-motion'
import { cn } from '@/lib/utils'

interface AnimatedNumberProps {
  value: number
  suffix?: string
  prefix?: string
  decimals?: number
  duration?: number
  className?: string
}

export function AnimatedNumber({
  value,
  suffix = '',
  prefix = '',
  decimals = 0,
  duration = 2,
  className,
}: AnimatedNumberProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-10% 0px' })
  const [hasAnimated, setHasAnimated] = useState(false)

  useEffect(() => {
    if (!isInView || hasAnimated || !ref.current) return
    setHasAnimated(true)

    const controls = animate(0, value, {
      duration,
      ease: [0.22, 1, 0.36, 1],
      onUpdate(latest) {
        if (ref.current) {
          ref.current.textContent =
            prefix + latest.toFixed(decimals) + suffix
        }
      },
    })

    return () => controls.stop()
  }, [isInView, hasAnimated, value, duration, decimals, prefix, suffix])

  return (
    <span ref={ref} className={cn(className)}>
      {prefix}0{suffix}
    </span>
  )
}
