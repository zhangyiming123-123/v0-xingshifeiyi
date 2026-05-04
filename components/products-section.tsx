'use client'

import Image from 'next/image'
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const products = [
  {
    id: 1,
    name: '醒狮陶瓷杯垫',
    category: '器物文玩',
    image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Image%2057-WJEdfYfxy4vFE3hyl2bA82Uqx6Wm2l.png',
    tag: '热销',
  },
  {
    id: 2,
    name: '醒狮烫金冰箱贴',
    category: '生活文创',
    image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Image%2053%20%281%29-uq4GGeBIXfMlsWv48SxV55d3QAa8EV.png',
    tag: '非遗',
  },
  {
    id: 3,
    name: '醒狮折扇',
    category: '民俗工艺',
    image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Image%2058%20%281%29-tYfPFc8NsMVHuy3tnWLWfPQZ6GzSEt.png',
    tag: '限量',
  },
  {
    id: 4,
    name: '醒狮贺岁红包',
    category: '节庆文创',
    image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Image%2055-NIQHiVce14z9dC6t6ZZTvWrWCAf6lK.png',
    tag: '新品',
  },
  {
    id: 5,
    name: '醒狮国风明信片',
    category: '书画文创',
    image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Image%2056%20%281%29-z4lPfAEDai5TI0FmZGab9nkBgHsZHz.png',
    tag: '热销',
  },
  {
    id: 6,
    name: '醒狮硬皮笔记本',
    category: '文具文创',
    image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Image%2054%20%281%29-ywpBiiPdJjmpDF0GR7NRmr4Nc8iDMt.png',
    tag: '精选',
  },
]

function ProductCard({ product, index }: { product: typeof products[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })

  return (
    <motion.div
      ref={ref}
      className="group relative border cursor-pointer overflow-hidden"
      style={{
        borderColor: '#C9A96E',
        background: '#FAF6F0',
      }}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.08, duration: 0.5, ease: 'easeOut' }}
      whileHover={{ y: -6, boxShadow: '0 16px 40px rgba(196,30,36,0.18)' }}
    >
      {/* hover 红边框 */}
      <motion.div
        className="absolute inset-0 border-2 z-10 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ borderColor: '#C41E24' }}
      />

      {/* 角标装饰 */}
      <div className="absolute top-0 left-0 w-10 h-10 z-10 pointer-events-none">
        <svg viewBox="0 0 40 40" fill="none">
          <path d="M4 4 L18 4 M4 4 L4 18" stroke="#C9A96E" strokeWidth="1.5" opacity="0.6"/>
        </svg>
      </div>
      <div className="absolute bottom-0 right-0 w-10 h-10 z-10 pointer-events-none">
        <svg viewBox="0 0 40 40" fill="none">
          <path d="M36 36 L22 36 M36 36 L36 22" stroke="#C9A96E" strokeWidth="1.5" opacity="0.6"/>
        </svg>
      </div>

      {/* 图片区 */}
      <div className="relative overflow-hidden" style={{ aspectRatio: '1 / 1' }}>
        <motion.div
          className="w-full h-full"
          whileHover={{ scale: 1.06 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
        >
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        </motion.div>

        {/* 标签 */}
        <div
          className="absolute top-3 right-3 px-2 py-0.5 text-xs tracking-wider z-10"
          style={{ background: '#C41E24', color: '#FAF6F0', fontFamily: 'var(--font-sans)' }}
        >
          {product.tag}
        </div>

        {/* hover 遮层 + 按钮 */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{ background: 'rgba(61,43,31,0.5)' }}
        >
          <motion.button
            className="px-6 py-2 text-sm tracking-widest"
            style={{
              fontFamily: 'var(--font-serif)',
              background: '#C41E24',
              color: '#FAF6F0',
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
          >
            立即购买
          </motion.button>
        </motion.div>
      </div>

      {/* 产品信息 */}
      <div className="px-4 py-4">
        <div>
          <p
            className="text-xs tracking-wider mb-1"
            style={{ fontFamily: 'var(--font-sans)', color: '#C9A96E' }}
          >
            {product.category}
          </p>
          <h3
            className="text-base font-bold leading-tight"
            style={{ fontFamily: 'var(--font-serif)', color: '#3D2B1F' }}
          >
            {product.name}
          </h3>
        </div>

        {/* 金线分隔 */}
        <div
          className="mt-3 h-px"
          style={{ background: 'linear-gradient(90deg, #C9A96E, transparent)' }}
        />
      </div>
    </motion.div>
  )
}

export default function ProductsSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const inView = useInView(sectionRef, { once: true, margin: '-60px' })

  return (
    <section
      id="products"
      ref={sectionRef}
      className="py-24 rice-paper cloud-pattern overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* 标题 */}
        <div className="flex flex-col items-center gap-3 mb-14">
          <motion.div
            className="flex items-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            {/* 祥云装饰 */}
            <svg width="48" height="24" viewBox="0 0 48 24" fill="none">
              <path d="M2 18 Q6 6 12 10 Q8 2 16 4 Q14 -1 22 2 Q22 -2 28 2 Q26 -1 32 4 Q40 2 38 10 Q44 6 46 18" stroke="#C9A96E" strokeWidth="1" fill="none" strokeLinecap="round"/>
            </svg>
            <h2
              className="text-3xl md:text-4xl font-bold tracking-widest text-balance"
              style={{ fontFamily: 'var(--font-serif)', color: '#3D2B1F' }}
            >
              醒狮文创
            </h2>
            <svg width="48" height="24" viewBox="0 0 48 24" fill="none" style={{ transform: 'scaleX(-1)' }}>
              <path d="M2 18 Q6 6 12 10 Q8 2 16 4 Q14 -1 22 2 Q22 -2 28 2 Q26 -1 32 4 Q40 2 38 10 Q44 6 46 18" stroke="#C9A96E" strokeWidth="1" fill="none" strokeLinecap="round"/>
            </svg>
          </motion.div>
          <motion.p
            className="text-xs tracking-[0.3em] uppercase"
            style={{ fontFamily: 'var(--font-sans)', color: '#C9A96E' }}
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.3 }}
          >
            Cultural Creative Products
          </motion.p>
          <motion.div
            className="gold-divider w-48"
            initial={{ scaleX: 0 }}
            animate={inView ? { scaleX: 1 } : {}}
            transition={{ delay: 0.4, duration: 0.6 }}
          />
        </div>

        {/* 3×2 产品网格 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>

        {/* 查看更多 */}
        <motion.div
          className="flex justify-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          <motion.button
            className="px-12 py-3 text-sm tracking-widest border"
            style={{
              fontFamily: 'var(--font-serif)',
              color: '#3D2B1F',
              borderColor: '#C9A96E',
            }}
            whileHover={{
              background: '#C41E24',
              borderColor: '#C41E24',
              color: '#FAF6F0',
              y: -2,
            }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: 'spring', stiffness: 400, damping: 20 }}
          >
            浏览全部文创
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}
