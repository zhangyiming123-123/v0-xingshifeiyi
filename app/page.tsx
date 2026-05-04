import Navbar from '@/components/navbar'
import HeroSection from '@/components/hero-section'
import CultureSection, { LionHeadSection } from '@/components/culture-section'
import FilmSection from '@/components/film-section'
import ProductsSection from '@/components/products-section'
import Footer from '@/components/footer'

export default function Home() {
  return (
    <main>
      <Navbar />
      <HeroSection />
      <CultureSection />
      <LionHeadSection />
      <FilmSection />
      <ProductsSection />
      <Footer />
    </main>
  )
}
