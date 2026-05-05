import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        bg: 'var(--bg)',
        surface: 'var(--surface)',
        ink: 'var(--ink)',
        'ink-soft': 'var(--ink-soft)',
        moss: 'var(--moss)',
        'moss-deep': 'var(--moss-deep)',
        leaf: 'var(--leaf)',
        bloom: 'var(--bloom)',
        water: 'var(--water)',
        line: 'var(--line)',
      },
      fontFamily: {
        display: ['var(--font-fraunces)', 'Georgia', 'serif'],
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-jetbrains)', 'monospace'],
      },
      fontSize: {
        hero: ['clamp(4rem, 12vw, 11rem)', { lineHeight: '0.9', letterSpacing: '-0.04em' }],
        'section-h2': ['clamp(2.5rem, 6vw, 5.5rem)', { lineHeight: '0.95' }],
        eyebrow: ['0.75rem', { letterSpacing: '0.2em' }],
      },
      spacing: {
        section: 'clamp(8rem, 14vw, 14rem)',
      },
      transitionTimingFunction: {
        'out-quint': 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
      animation: {
        'marquee': 'marquee 40s linear infinite',
        'marquee-reverse': 'marquee-reverse 40s linear infinite',
        'float': 'float 8s ease-in-out infinite',
        'float-delayed': 'float 10s ease-in-out 2s infinite',
        'grain': 'grain 0.5s steps(1) infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'marquee-reverse': {
          '0%': { transform: 'translateX(-50%)' },
          '100%': { transform: 'translateX(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0) rotate(0deg)' },
          '33%': { transform: 'translateY(-20px) rotate(5deg)' },
          '66%': { transform: 'translateY(-10px) rotate(-3deg)' },
        },
        grain: {
          '0%, 100%': { transform: 'translate(0, 0)' },
          '10%': { transform: 'translate(-2%, -3%)' },
          '20%': { transform: 'translate(2%, 3%)' },
          '30%': { transform: 'translate(-3%, 1%)' },
          '40%': { transform: 'translate(3%, -1%)' },
          '50%': { transform: 'translate(-1%, 3%)' },
          '60%': { transform: 'translate(1%, -3%)' },
          '70%': { transform: 'translate(-2%, 1%)' },
          '80%': { transform: 'translate(2%, -1%)' },
          '90%': { transform: 'translate(-1%, -2%)' },
        },
      },
      backgroundImage: {
        'noise': "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
      },
    },
  },
  plugins: [],
}

export default config
