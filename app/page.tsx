import Navbar from '@/components/navbar'
import HeroSection from '@/components/hero-section'
import CultureSection, { LionHeadSection } from '@/components/culture-section'
import FilmSection from '@/components/film-section'
import ProductsSection from '@/components/products-section'
import Footer from '@/components/footer'
import { SectionTransition, SectionDivider } from '@/components/section-transition'

export default function Home() {
  return (
    <main>
      <Navbar />

      {/* Hero — 无包裹，自带入场动画 */}
      <HeroSection />

      {/* Hero → 文脉：深色到暖白的斜切过渡 */}
      <SectionDivider color="#FAF6F0" />

      {/* 醒狮文脉 — 从左滑入 */}
      <SectionTransition variant="slide-left" parallax={30}>
        <CultureSection />
      </SectionTransition>

      {/* 文脉 → 狮头制作：暖白到暖白，加视觉流动感 */}
      <SectionDivider color="#FAF6F0" flip />

      {/* 狮头制作 — 从下推起，视差稍强 */}
      <SectionTransition variant="scale-up" parallax={50}>
        <LionHeadSection />
      </SectionTransition>

      {/* 狮头 → 短片：暖白到深棕 */}
      <SectionDivider color="#1A0E08" />

      {/* 原创短片 — 从右滑入 */}
      <SectionTransition variant="slide-right" parallax={35}>
        <FilmSection />
      </SectionTransition>

      {/* 短片 → 文创：深棕到暖白 */}
      <SectionDivider color="#FAF6F0" flip />

      {/* 醒狮文创 — 缩放淡入 */}
      <SectionTransition variant="scale-up" parallax={25}>
        <ProductsSection />
      </SectionTransition>

      {/* 文创 → 页脚 */}
      <SectionDivider color="#2A1C12" />

      {/* 页脚 — fade 淡入 */}
      <SectionTransition variant="fade" parallax={15}>
        <Footer />
      </SectionTransition>
    </main>
  )
}
