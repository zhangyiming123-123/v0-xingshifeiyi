'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const footerLinks = [
  {
    title: '文化板块',
    links: ['醒狮简史', '技法解析', '非遗故事'],
  },
  {
    title: '影像资料',
    links: ['原创短片', '演出记录', '工艺纪录', '活动现场'],
  },
  {
    title: '互动参与',
    links: ['醒狮文创', '志愿者招募', '捐助支持'],
  },
]

const contactItems = [
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
        <circle cx="12" cy="10" r="3"/>
      </svg>
    ),
    label: '广东省广州市越秀区中山四路123号',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
        <polyline points="22,6 12,13 2,6"/>
      </svg>
    ),
    label: 'contact@lingnan-lion.cn',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.15 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.07 1h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 8.96a16 16 0 0 0 6.13 6.13l1.32-1.32a2 2 0 0 1 2.11-.45c.91.32 1.87.51 2.81.7A2 2 0 0 1 22 16.92z"/>
      </svg>
    ),
    label: '020-8888-9999',
  },
]

export default function Footer() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })

  return (
    <footer
      ref={ref}
      id="footer"
      style={{ background: '#3D2B1F' }}
    >
      {/* 顶部金线 */}
      <div
        className="h-px w-full"
        style={{ background: 'linear-gradient(90deg, transparent, #C9A96E 30%, #C9A96E 70%, transparent)' }}
      />

      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* 上部三列 */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* 品牌列 */}
          <motion.div
            className="md:col-span-1"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <svg viewBox="0 0 40 40" fill="none" className="w-10 h-10">
                <circle cx="20" cy="18" r="12" stroke="#C41E24" strokeWidth="1.5" fill="none"/>
                <path d="M14 12 Q20 6 26 12" stroke="#C9A96E" strokeWidth="1.2" fill="none" strokeLinecap="round"/>
                <ellipse cx="16" cy="17" rx="2" ry="2.5" fill="#C41E24"/>
                <ellipse cx="24" cy="17" rx="2" ry="2.5" fill="#C41E24"/>
                <circle cx="16.5" cy="16.5" r="0.8" fill="#FAF6F0"/>
                <circle cx="24.5" cy="16.5" r="0.8" fill="#FAF6F0"/>
                <path d="M19 21 Q20 22.5 21 21" stroke="#C41E24" strokeWidth="1.2" fill="none" strokeLinecap="round"/>
                <path d="M16 23 Q20 27 24 23" stroke="#C41E24" strokeWidth="1.2" fill="none" strokeLinecap="round"/>
                <line x1="8" y1="22" x2="14" y2="21" stroke="#C9A96E" strokeWidth="0.8"/>
                <line x1="8" y1="24" x2="14" y2="23" strokeWidth="0.8" stroke="#C9A96E"/>
                <line x1="26" y1="21" x2="32" y2="22" stroke="#C9A96E" strokeWidth="0.8"/>
                <line x1="26" y1="23" x2="32" y2="24" stroke="#C9A96E" strokeWidth="0.8"/>
                <circle cx="20" cy="4" r="1.5" fill="#C9A96E"/>
              </svg>
              <div>
                <p className="text-lg font-bold tracking-widest" style={{ fontFamily: 'var(--font-serif)', color: '#C9A96E' }}>醒狮</p>
                <p className="text-xs tracking-[0.2em]" style={{ fontFamily: 'var(--font-sans)', color: 'rgba(201,169,110,0.6)' }}>非遗文化</p>
              </div>
            </div>
            <p
              className="text-sm leading-relaxed mb-6"
              style={{ fontFamily: 'var(--font-sans)', color: 'rgba(250,246,240,0.5)', lineHeight: '1.9' }}
            >
              致力于保护与传承岭南醒狮非物质文化遗产，
              让这份千年文脉在新时代焕发新的光彩。
            </p>
            {/* 联系方式 */}
            <div className="flex flex-col gap-3">
              {contactItems.map((item, i) => (
                <motion.div
                  key={i}
                  className="flex items-start gap-3"
                  initial={{ opacity: 0, x: -10 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.2 + i * 0.08 }}
                >
                  <span style={{ color: '#C9A96E', marginTop: 1 }}>{item.icon}</span>
                  <span
                    className="text-xs leading-relaxed"
                    style={{ fontFamily: 'var(--font-sans)', color: 'rgba(250,246,240,0.55)' }}
                  >
                    {item.label}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* 链接三列 */}
          {footerLinks.map((col, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.15 + i * 0.1, duration: 0.6 }}
            >
              <h4
                className="text-sm font-bold tracking-widest mb-5 pb-3 border-b"
                style={{
                  fontFamily: 'var(--font-serif)',
                  color: '#C9A96E',
                  borderColor: 'rgba(201,169,110,0.25)',
                }}
              >
                {col.title}
              </h4>
              <ul className="flex flex-col gap-3">
                {col.links.map((link) => (
                  <li key={link}>
                    <motion.a
                      href="#"
                      className="text-sm transition-colors"
                      style={{ fontFamily: 'var(--font-sans)', color: 'rgba(250,246,240,0.5)' }}
                      whileHover={{ color: '#C9A96E', x: 4 }}
                      transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                    >
                      {link}
                    </motion.a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* 金线分隔 */}
        <div
          className="h-px mb-8"
          style={{ background: 'linear-gradient(90deg, transparent, rgba(201,169,110,0.4), transparent)' }}
        />

        {/* 底部版权 */}
        <motion.div
          className="flex flex-col md:flex-row items-center justify-between gap-4"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <div className="flex items-center gap-3">
            {/* 小装饰 */}
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <circle cx="10" cy="10" r="8" stroke="#C9A96E" strokeWidth="0.8" opacity="0.5"/>
              <circle cx="10" cy="10" r="3" fill="#C41E24" opacity="0.7"/>
            </svg>
            <p
              className="text-xs tracking-wider"
              style={{ fontFamily: 'var(--font-sans)', color: 'rgba(250,246,240,0.35)' }}
            >
              © 2024 岭南醒狮非遗文化展示平台 · 粤ICP备XXXXXXXX号
            </p>
          </div>
          <p
            className="text-xs tracking-[0.2em] uppercase"
            style={{ fontFamily: 'var(--font-sans)', color: 'rgba(201,169,110,0.4)' }}
          >
            Lingnan Lion Dance · National Intangible Cultural Heritage
          </p>
        </motion.div>
      </div>

      {/* 底部红线 */}
      <div className="h-1" style={{ background: '#C41E24' }} />
    </footer>
  )
}
