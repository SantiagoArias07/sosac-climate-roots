'use client'

import { useRef, useEffect, useState } from 'react'
import { useInView } from 'framer-motion'
import { cn } from '@/lib/utils'

interface AnimatedNumberProps {
  value: number
  suffix?: string
  prefix?: string
  decimals?: number
  duration?: number
  className?: string
}

function easeOutQuint(t: number): number {
  return 1 - Math.pow(1 - t, 5)
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
  const [current, setCurrent] = useState(0)
  const hasStarted = useRef(false)

  useEffect(() => {
    if (!isInView || hasStarted.current) return
    hasStarted.current = true

    const startTime = performance.now()
    const durationMs = duration * 1000
    let frameId: number

    function tick() {
      const elapsed = performance.now() - startTime
      const progress = Math.min(elapsed / durationMs, 1)
      setCurrent(value * easeOutQuint(progress))
      if (progress < 1) {
        frameId = requestAnimationFrame(tick)
      }
    }

    frameId = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frameId)
  }, [isInView, value, duration])

  const formatted =
    decimals > 0
      ? current.toFixed(decimals)
      : Math.round(current).toLocaleString('en-US')

  return (
    <span ref={ref} className={cn(className)}>
      {prefix}{formatted}{suffix}
    </span>
  )
}
