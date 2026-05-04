'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const footerCols = [
  {
    title: '文化板块',
    links: [
      { label: '醒狮简史', href: '#culture' },
      { label: '技法解析', href: '#culture' },
      { label: '非遗故事', href: '#culture' },
    ],
  },
  {
    title: '影像资料',
    links: [
      { label: '原创短片', href: '#film' },
      { label: '工艺纪录', href: '#film' },
    ],
  },
  {
    title: '互动参与',
    links: [
      { label: '醒狮文创', href: '#products' },
    ],
  },
]

// 祥云装饰 SVG
function CloudDeco({ opacity = 0.12 }: { opacity?: number }) {
  return (
    <svg viewBox="0 0 120 30" fill="none" style={{ opacity }}>
      <path
        d="M10 22 Q10 14 18 14 Q16 6 26 8 Q28 2 36 4 Q40 0 46 4 Q54 0 60 6 Q68 2 74 6 Q80 0 88 4 Q96 2 100 8 Q108 6 110 14 Q118 14 118 22"
        stroke="#C9A96E" strokeWidth="1" fill="none" strokeLinecap="round"
      />
    </svg>
  )
}

export default function Footer() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })

  return (
    <footer ref={ref} id="footer" style={{ background: '#2A1C12', position: 'relative', overflow: 'hidden' }}>

      {/* 背景暗纹祥云 */}
      <div className="absolute inset-0 pointer-events-none select-none" aria-hidden="true">
        <div className="absolute top-6 left-0 w-80"><CloudDeco opacity={0.08} /></div>
        <div className="absolute top-6 right-0 w-80 scale-x-[-1]"><CloudDeco opacity={0.08} /></div>
        <div className="absolute bottom-14 left-1/4 w-64"><CloudDeco opacity={0.06} /></div>
        <div className="absolute bottom-14 right-1/4 w-64 scale-x-[-1]"><CloudDeco opacity={0.06} /></div>
        {/* 大斜向装饰字 */}
        <div
          className="absolute -right-8 top-1/2 -translate-y-1/2 text-[180px] font-bold select-none pointer-events-none leading-none"
          style={{
            fontFamily: 'var(--font-serif)',
            color: 'transparent',
            WebkitTextStroke: '1px rgba(201,169,110,0.06)',
            letterSpacing: '-0.05em',
          }}
        >
          醒
        </div>
      </div>

      {/* 顶部装饰线 — 三段渐变 */}
      <div className="relative">
        <div
          className="h-px w-full"
          style={{ background: 'linear-gradient(90deg, transparent 0%, #C9A96E 25%, #C41E24 50%, #C9A96E 75%, transparent 100%)' }}
        />
        {/* 顶部中央菱形徽章 */}
        <div className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center">
          <div
            className="w-3 h-3 rotate-45"
            style={{ background: '#C41E24', border: '1px solid #C9A96E', boxShadow: '0 0 8px rgba(196,30,36,0.6)' }}
          />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-5 sm:px-6 pt-10 sm:pt-14 pb-8 sm:pb-10 relative">

        {/* 主内容区：品牌 + 三列链接 */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 mb-12">

          {/* 品牌区 — 占 5 列 */}
          <motion.div
            className="md:col-span-5"
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Logo 行 */}
            <div className="flex items-end gap-4 mb-6">
              <svg viewBox="0 0 48 52" fill="none" className="w-12 h-14 flex-shrink-0" aria-label="醒狮图标">
                {/* 顶球 */}
                <circle cx="24" cy="5" r="3.5" stroke="#C9A96E" strokeWidth="1.2" fill="none"/>
                <circle cx="24" cy="5" r="1.4" fill="#C41E24"/>
                {/* 头部轮廓 */}
                <ellipse cx="24" cy="26" rx="14" ry="16" stroke="#C41E24" strokeWidth="1.5" fill="none"/>
                {/* 云纹额饰 */}
                <path d="M16 14 Q18 10 20 12 Q20 8 24 10 Q28 8 28 12 Q30 10 32 14" stroke="#C9A96E" strokeWidth="0.9" fill="none" strokeLinecap="round"/>
                {/* 眉 */}
                <path d="M14 20 Q18 17 21 19" stroke="#C41E24" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
                <path d="M27 19 Q30 17 34 20" stroke="#C41E24" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
                {/* 眼 */}
                <ellipse cx="19" cy="23" rx="3" ry="2.5" stroke="#C41E24" strokeWidth="1.2" fill="none"/>
                <ellipse cx="29" cy="23" rx="3" ry="2.5" stroke="#C41E24" strokeWidth="1.2" fill="none"/>
                <circle cx="19" cy="23" r="1.2" fill="#2C5F7C"/>
                <circle cx="29" cy="23" r="1.2" fill="#2C5F7C"/>
                <circle cx="18.3" cy="22.3" r="0.5" fill="white"/>
                <circle cx="28.3" cy="22.3" r="0.5" fill="white"/>
                {/* 鼻嘴 */}
                <path d="M21 30 Q24 32 27 30" stroke="#C41E24" strokeWidth="1.2" fill="none" strokeLinecap="round"/>
                {/* 胡须 */}
                <line x1="6" y1="28" x2="16" y2="27" stroke="#C9A96E" strokeWidth="0.8"/>
                <line x1="6" y1="31" x2="16" y2="30" stroke="#C9A96E" strokeWidth="0.8"/>
                <line x1="32" y1="27" x2="42" y2="28" stroke="#C9A96E" strokeWidth="0.8"/>
                <line x1="32" y1="30" x2="42" y2="31" stroke="#C9A96E" strokeWidth="0.8"/>
                {/* 流苏 */}
                {[20, 22, 24, 26, 28].map((x, i) => (
                  <line key={i} x1={x} y1="40" x2={x + (i - 2) * 0.4} y2="50" stroke="#C9A96E" strokeWidth="0.7" strokeLinecap="round"/>
                ))}
              </svg>
              <div>
                <h2
                  className="text-3xl font-bold tracking-[0.15em] leading-none"
                  style={{ fontFamily: 'var(--font-serif)', color: '#C9A96E' }}
                >
                  醒狮
                </h2>
                <p
                  className="text-xs tracking-[0.35em] mt-1"
                  style={{ fontFamily: 'var(--font-sans)', color: 'rgba(201,169,110,0.55)' }}
                >
                  非遗文化
                </p>
              </div>
            </div>

            {/* 简介 */}
            <p
              className="text-sm leading-relaxed mb-6 max-w-xs"
              style={{ fontFamily: 'var(--font-sans)', color: 'rgba(250,246,240,0.45)', lineHeight: '2' }}
            >
              致力于保护与传承岭南醒狮非物质文化遗产，
              让这份千年文脉在新时代焕发新的光彩。
            </p>

            {/* 非遗徽章 */}
            <div className="flex items-center gap-3">
              <div
                className="flex items-center gap-2 px-4 py-2"
                style={{
                  border: '1px solid rgba(201,169,110,0.3)',
                  background: 'rgba(201,169,110,0.06)',
                }}
              >
                <div className="w-1.5 h-1.5 rounded-full" style={{ background: '#C41E24' }} />
                <span
                  className="text-xs tracking-[0.25em]"
                  style={{ fontFamily: 'var(--font-serif)', color: 'rgba(201,169,110,0.7)' }}
                >
                  国家级非物质文化遗产
                </span>
                <div className="w-1.5 h-1.5 rounded-full" style={{ background: '#C41E24' }} />
              </div>
            </div>
          </motion.div>

          {/* 竖向装饰分隔线 */}
          <div className="hidden md:flex md:col-span-1 justify-center">
            <motion.div
              className="w-px h-full"
              style={{ background: 'linear-gradient(180deg, transparent, rgba(201,169,110,0.3) 30%, rgba(201,169,110,0.3) 70%, transparent)' }}
              initial={{ scaleY: 0 }}
              animate={inView ? { scaleY: 1 } : {}}
              transition={{ delay: 0.3, duration: 0.8 }}
            />
          </div>

          {/* 三列链接 — 占 6 列 */}
          <div className="md:col-span-6 grid grid-cols-2 sm:grid-cols-3 gap-6">
            {footerCols.map((col, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.2 + i * 0.12, duration: 0.6 }}
              >
                {/* 列标题 + 装饰 */}
                <div className="mb-5">
                  <h4
                    className="text-xs font-bold tracking-[0.3em] mb-1"
                    style={{ fontFamily: 'var(--font-serif)', color: '#C9A96E' }}
                  >
                    {col.title}
                  </h4>
                  <div
                    className="h-px w-8"
                    style={{ background: 'linear-gradient(90deg, #C41E24, transparent)' }}
                  />
                </div>

                {/* 链接列表 */}
                <ul className="flex flex-col gap-3.5">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <motion.a
                        href={link.href}
                        className="text-sm flex items-center gap-1.5 group/fl"
                        style={{ fontFamily: 'var(--font-sans)', color: 'rgba(250,246,240,0.45)' }}
                        whileHover={{ color: '#FAF6F0', x: 3 }}
                        transition={{ type: 'spring', stiffness: 400, damping: 22 }}
                      >
                        <span
                          className="w-1 h-1 rounded-full flex-shrink-0 transition-colors duration-200 group-hover/fl:bg-red-600"
                          style={{ background: 'rgba(201,169,110,0.4)' }}
                        />
                        {link.label}
                      </motion.a>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>

        {/* 分隔线 */}
        <div className="relative mb-8">
          <div
            className="h-px"
            style={{ background: 'linear-gradient(90deg, transparent, rgba(201,169,110,0.25) 20%, rgba(201,169,110,0.25) 80%, transparent)' }}
          />
          {/* 中央装饰 */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center gap-2 px-4" style={{ background: '#2A1C12' }}>
            <div className="w-4 h-px" style={{ background: '#C9A96E', opacity: 0.4 }} />
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <path d="M7 1 L8.5 5.5 L13 5.5 L9.5 8.5 L11 13 L7 10 L3 13 L4.5 8.5 L1 5.5 L5.5 5.5 Z" stroke="#C9A96E" strokeWidth="0.8" fill="none" opacity="0.6"/>
            </svg>
            <div className="w-4 h-px" style={{ background: '#C9A96E', opacity: 0.4 }} />
          </div>
        </div>

        {/* 底部版权行 */}
        <motion.div
          className="flex flex-col md:flex-row items-center justify-between gap-3"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          <p
            className="text-xs tracking-wider"
            style={{ fontFamily: 'var(--font-sans)', color: 'rgba(250,246,240,0.28)' }}
          >
            © 2026 岭南醒狮非遗文化展示平台
          </p>
          <div className="flex items-center gap-2">
            <div className="w-1 h-1 rounded-full" style={{ background: 'rgba(196,30,36,0.5)' }} />
            <p
              className="text-xs tracking-[0.18em]"
              style={{ fontFamily: 'var(--font-sans)', color: 'rgba(201,169,110,0.3)' }}
            >
              Lingnan Lion Dance · Intangible Cultural Heritage
            </p>
            <div className="w-1 h-1 rounded-full" style={{ background: 'rgba(196,30,36,0.5)' }} />
          </div>
        </motion.div>
      </div>

      {/* 底部红色实线 */}
      <div
        className="h-1"
        style={{ background: 'linear-gradient(90deg, #3D2B1F, #C41E24 30%, #C41E24 70%, #3D2B1F)' }}
      />
    </footer>
  )
}
