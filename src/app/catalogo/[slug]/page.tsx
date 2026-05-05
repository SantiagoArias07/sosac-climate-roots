import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { plants } from '@/data/garden'
import type { Metadata } from 'next'

interface PageProps {
  params: { slug: string }
}

export async function generateStaticParams() {
  return plants.map((plant) => ({ slug: plant.slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const plant = plants.find((p) => p.slug === params.slug)
  if (!plant) return {}

  return {
    title: `${plant.commonName} — Climate Roots`,
    description: plant.description,
  }
}

export default function PlantPage({ params }: PageProps) {
  const plant = plants.find((p) => p.slug === params.slug)
  if (!plant) notFound()

  return (
    <main className="min-h-screen bg-bg">
      {/* Back nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-6 md:px-10 py-5 flex items-center gap-4">
        <Link
          href="/#catalogo"
          className="flex items-center gap-2 text-sm text-ink-soft hover:text-ink transition-colors"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
            <path d="M15 8H1M6 3L1 8l5 5"/>
          </svg>
          Volver al catálogo
        </Link>
      </nav>

      <div className="max-w-[1200px] mx-auto px-6 md:px-10 pt-28 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 items-start">
          {/* Image */}
          <div
            className="relative overflow-hidden"
            style={{ borderRadius: '40% 60% 60% 40% / 40% 40% 60% 60%', aspectRatio: '4/5' }}
          >
            {/* TODO: replace with SOSAC photo */}
            <Image
              src={plant.imageUrl}
              alt={plant.commonName}
              fill
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
          </div>

          {/* Content */}
          <div className="pt-8 md:pt-20">
            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-6">
              {plant.types.map((type) => (
                <span
                  key={type}
                  className="text-xs uppercase tracking-widest px-3 py-1 rounded-full border border-moss text-moss"
                >
                  {type}
                </span>
              ))}
            </div>

            {/* Names */}
            <h1
              className="font-display font-black text-ink leading-none mb-2"
              style={{ fontSize: 'clamp(3rem, 7vw, 6rem)' }}
            >
              {plant.commonName}
            </h1>
            <p className="font-mono text-ink-soft text-base italic mb-8">
              {plant.scientificName}
            </p>

            {/* Description */}
            <p className="text-ink-soft text-lg leading-relaxed mb-10">
              {plant.description}
            </p>

            {/* Benefits */}
            <div>
              <p className="text-eyebrow text-ink-soft mb-5">Beneficios</p>
              <ul className="space-y-4">
                {plant.benefits.map((benefit, i) => (
                  <li key={i} className="flex items-start gap-3 text-ink">
                    <span className="w-1.5 h-1.5 rounded-full bg-moss flex-shrink-0 mt-2" />
                    {benefit}
                  </li>
                ))}
              </ul>
            </div>

            {/* Video placeholder */}
            <div className="mt-10 rounded-2xl bg-surface border border-line p-8 flex flex-col items-center justify-center gap-4 min-h-[160px]">
              <div className="w-12 h-12 rounded-full border-2 border-moss/40 flex items-center justify-center">
                <svg width="18" height="18" viewBox="0 0 16 16" fill="var(--moss)" className="ml-0.5">
                  <path d="M3 2l11 6-11 6V2z"/>
                </svg>
              </div>
              <p className="text-ink-soft text-sm text-center max-w-[240px]">
                Video del jardín próximamente — grabación en SOSAC-Lab, Monterrey
              </p>
            </div>

            {/* Share */}
            <div className="mt-8 flex items-center gap-4">
              <p className="text-eyebrow text-ink-soft">Compartir</p>
              <a
                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(`${plant.commonName} (${plant.scientificName}) en el jardín @sosacmx`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full border border-line flex items-center justify-center hover:border-ink transition-colors"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" className="text-ink-soft">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.748l7.73-8.835L1.254 2.25H8.08l4.259 5.63 5.905-5.63zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
