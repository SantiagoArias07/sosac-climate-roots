import Link from 'next/link'

export default function NotFound() {
  return (
    <main className="min-h-screen bg-bg flex flex-col items-center justify-center px-6 text-center">
      <p className="text-eyebrow text-moss mb-4">404</p>
      <h1 className="font-display font-black text-ink mb-4" style={{ fontSize: 'clamp(3rem, 10vw, 8rem)' }}>
        Esta página no<br />
        <span className="italic text-ink-soft">existe</span>
      </h1>
      <p className="text-ink-soft mb-10 max-w-sm">
        Igual que los ecosistemas, algunas rutas se pierden antes de
        florecer. Regresa al inicio.
      </p>
      <Link
        href="/"
        className="px-6 py-3 rounded-full bg-moss text-bg text-sm font-semibold hover:bg-moss-deep transition-colors"
      >
        Volver al jardín
      </Link>
    </main>
  )
}
