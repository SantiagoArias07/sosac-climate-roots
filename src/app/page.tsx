import { Nav } from '@/components/layout/Nav'
import { Footer } from '@/components/layout/Footer'
import { Hero } from '@/components/sections/Hero'
import { Manifesto } from '@/components/sections/Manifesto'
import { GardenMap } from '@/components/sections/GardenMap'
import { Catalogue } from '@/components/sections/Catalogue'
import { CafeJardin } from '@/components/sections/CafeJardin'
import { Biodiversidad } from '@/components/sections/Biodiversidad'

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Manifesto />
        <GardenMap />
        <Catalogue />
        <CafeJardin />
        <Biodiversidad />
      </main>
      <Footer />
    </>
  )
}
