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
  const isInView = useInView(ref, { once: true, amount: 0 })
  const [hasAnimated, setHasAnimated] = useState(false)

  useEffect(() => {
    if (!isInView || hasAnimated || !ref.current) return
    setHasAnimated(true)

    const controls = animate(0, value, {
      duration,
      ease: [0.22, 1, 0.36, 1],
      onUpdate(latest) {
        if (ref.current) {
          const formatted =
            decimals > 0
              ? latest.toFixed(decimals)
              : Math.round(latest).toLocaleString('en-US')
          ref.current.textContent = prefix + formatted + suffix
        }
      },
    })

    return () => controls.stop()
  }, [isInView, hasAnimated, value, duration, decimals, prefix, suffix])

  const initialDisplay =
    decimals > 0 ? (0).toFixed(decimals) : '0'

  return (
    <span ref={ref} className={cn(className)}>
      {prefix}{initialDisplay}{suffix}
    </span>
  )
}
