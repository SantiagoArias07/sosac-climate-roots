import type { Metadata, Viewport } from 'next'
import { Fraunces, Inter, JetBrains_Mono } from 'next/font/google'
import { ThemeProvider } from 'next-themes'
import { LenisProvider } from '@/components/motion/LenisProvider'
import './globals.css'

const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-fraunces',
  style: ['normal', 'italic'],
  display: 'swap',
  preload: true,
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
  preload: true,
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains',
  weight: ['400', '500'],
  style: ['normal', 'italic'],
  display: 'swap',
  preload: false,
})

export const metadata: Metadata = {
  title: 'Climate Roots — SOSAC-Lab · Monterrey',
  description:
    'Catálogo digital e interactivo del jardín urbano regenerado de SOSAC en Monterrey. Un laboratorio vivo de soluciones basadas en la naturaleza en la Zona Metropolitana.',
  keywords: [
    'jardín urbano',
    'Monterrey',
    'SOSAC',
    'biodiversidad',
    'soluciones natureza',
    'plantas medicinales',
    'ODS 13',
  ],
  authors: [{ name: 'SOSAC — Sociedad Sostenible A.C.' }],
  openGraph: {
    title: 'Climate Roots — SOSAC-Lab · Monterrey',
    description:
      'Un laboratorio vivo de soluciones basadas en la naturaleza en el corazón de la ZMM.',
    type: 'website',
    locale: 'es_MX',
    siteName: 'Climate Roots by SOSAC',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Climate Roots — SOSAC-Lab',
    description: 'Catálogo interactivo del jardín urbano de SOSAC en Monterrey.',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#F4F1EA' },
    { media: '(prefers-color-scheme: dark)', color: '#0F1612' },
  ],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="es"
      suppressHydrationWarning
      className={`${fraunces.variable} ${inter.variable} ${jetbrainsMono.variable}`}
    >
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange={false}
        >
          <LenisProvider>
            {/* Film grain overlay */}
            <div className="grain-overlay" aria-hidden="true" />
            {children}
          </LenisProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
