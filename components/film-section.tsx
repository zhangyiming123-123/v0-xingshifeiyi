'use client'

import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'

const miniCards = [
  {
    title: '采青问天',
    duration: '08:24',
    desc: '高桩之巅，狮舞翩跹，问天采青仪式全记录',
    tag: '技法纪录',
  },
  {
    title: '锣鼓击鸣',
    duration: '05:16',
    desc: '铿锵锣鼓，节奏激昂，醒狮音乐的灵魂解析',
    tag: '音乐探秘',
  },
  {
    title: '狮头工艺',
    duration: '12:08',
    desc: '一针一线，匠心传承，传统狮头扎制工艺',
    tag: '非遗工艺',
  },
]

export default function FilmSection() {
  const [playing, setPlaying] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)
  const inView = useInView(sectionRef, { once: true, margin: '-60px' })

  return (
    <section
      id="film"
      ref={sectionRef}
      className="py-24 overflow-hidden"
      style={{ background: '#3D2B1F' }}
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* 标题 */}
        <motion.div
          className="mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-4 mb-2">
            <div className="w-1 h-8" style={{ background: '#C41E24' }} />
            <h2
              className="text-3xl md:text-4xl font-bold tracking-widest"
              style={{ fontFamily: 'var(--font-serif)', color: '#FAF6F0' }}
            >
              原创短片
            </h2>
          </div>
          <p
            className="ml-5 text-xs tracking-[0.3em] uppercase"
            style={{ fontFamily: 'var(--font-sans)', color: '#C9A96E' }}
          >
            Original Documentary Films
          </p>
        </motion.div>

        {/* 主区域：左视频 右信息 */}
        <div className="flex flex-col lg:flex-row gap-8 mb-10">
          {/* 左视频 */}
          <motion.div
            className="flex-1 relative aspect-cinema rounded overflow-hidden group"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.2, duration: 0.7 }}
          >
            {/* 视频背景 */}
            <div
              className="absolute inset-0"
              style={{
                background: 'linear-gradient(135deg, #1A1008 0%, #2C1810 40%, #2C5F7C 100%)',
              }}
            >
              {/* 纹理 */}
              <div className="absolute inset-0 cloud-pattern opacity-10" />
              {/* 装饰SVG */}
              <svg
                className="absolute inset-0 w-full h-full"
                viewBox="0 0 800 340"
                fill="none"
                preserveAspectRatio="xMidYMid slice"
                aria-hidden="true"
              >
                <circle cx="400" cy="170" r="140" stroke="#C9A96E" strokeWidth="0.6" opacity="0.3"/>
                <circle cx="400" cy="170" r="100" stroke="#C41E24" strokeWidth="0.5" opacity="0.2"/>
                {/* 抽象动感线条 */}
                <path d="M100 200 Q250 80 400 170 Q550 260 700 140" stroke="#C9A96E" strokeWidth="1" fill="none" opacity="0.4"/>
                <path d="M80 230 Q230 110 400 200 Q570 290 720 170" stroke="#C41E24" strokeWidth="0.8" fill="none" opacity="0.3"/>
                {/* 角标 */}
                <path d="M30 30 L60 30 M30 30 L30 60" stroke="#C9A96E" strokeWidth="1.5" opacity="0.5"/>
                <path d="M770 30 L740 30 M770 30 L770 60" stroke="#C9A96E" strokeWidth="1.5" opacity="0.5"/>
                <path d="M30 310 L60 310 M30 310 L30 280" stroke="#C9A96E" strokeWidth="1.5" opacity="0.5"/>
                <path d="M770 310 L740 310 M770 310 L770 280" stroke="#C9A96E" strokeWidth="1.5" opacity="0.5"/>
              </svg>
              {/* 渐变遮层 */}
              <div
                className="absolute inset-0"
                style={{
                  background: 'linear-gradient(to right, rgba(61,43,31,0.4) 0%, transparent 40%, transparent 60%, rgba(44,95,124,0.3) 100%)',
                }}
              />
            </div>

            {/* 播放按钮 */}
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.button
                className="pulse-btn relative w-16 h-16 rounded-full flex items-center justify-center z-10"
                style={{ background: '#C41E24' }}
                onClick={() => setPlaying(!playing)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                aria-label="播放视频"
              >
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="white"
                  style={{ marginLeft: 3 }}
                >
                  <path d="M8 5v14l11-7z"/>
                </svg>
              </motion.button>
            </div>

            {/* 底部字幕条 */}
            <div
              className="absolute bottom-0 left-0 right-0 px-6 py-4"
              style={{
                background: 'linear-gradient(to top, rgba(61,43,31,0.95) 0%, transparent 100%)',
              }}
            >
              <div className="flex items-end justify-between">
                <div>
                  <span
                    className="text-xs tracking-widest mb-1 block"
                    style={{ fontFamily: 'var(--font-sans)', color: '#C9A96E' }}
                  >
                    醒狮纪录片 · 主片
                  </span>
                  <h3
                    className="text-xl font-bold text-white"
                    style={{ fontFamily: 'var(--font-serif)' }}
                  >
                    狮舞岭南
                  </h3>
                </div>
                <span
                  className="text-sm"
                  style={{ fontFamily: 'var(--font-sans)', color: 'rgba(250,246,240,0.6)' }}
                >
                  28:46
                </span>
              </div>
            </div>

            {/* 悬停遮层 */}
            <motion.div
              className="absolute inset-0 border-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
              style={{ borderColor: '#C9A96E' }}
            />
          </motion.div>

          {/* 右侧信息 */}
          <motion.div
            className="lg:w-72 flex flex-col justify-between"
            initial={{ opacity: 0, x: 20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <div>
              <div
                className="inline-block px-3 py-1 text-xs tracking-widest mb-4"
                style={{
                  fontFamily: 'var(--font-sans)',
                  background: 'rgba(196,30,36,0.2)',
                  color: '#C41E24',
                  border: '1px solid rgba(196,30,36,0.4)',
                }}
              >
                2024年度非遗纪录
              </div>
              <h3
                className="text-2xl font-bold mb-4 leading-snug"
                style={{ fontFamily: 'var(--font-serif)', color: '#FAF6F0' }}
              >
                狮舞岭南
              </h3>
              <div className="gold-divider mb-4" />
              <p
                className="text-sm leading-relaxed mb-6"
                style={{
                  fontFamily: 'var(--font-sans)',
                  color: 'rgba(250,246,240,0.65)',
                  lineHeight: '1.9',
                }}
              >
                深入广州、佛山、东莞三地，跟拍岭南醒狮传承人，
                记录一代狮王从习武入门到登台采青的完整历程，
                呈现濒临失传的高桩醒狮绝技。
              </p>

              {/* 元数据 */}
              {[
                { label: '导演', value: '陈振华' },
                { label: '时长', value: '28分46秒' },
                { label: '制作', value: '非遗影像中心' },
                { label: '年份', value: '2024' },
              ].map((item) => (
                <div
                  key={item.label}
                  className="flex items-center justify-between py-2 border-b"
                  style={{ borderColor: 'rgba(201,169,110,0.2)' }}
                >
                  <span
                    className="text-xs tracking-widest"
                    style={{ fontFamily: 'var(--font-sans)', color: '#C9A96E' }}
                  >
                    {item.label}
                  </span>
                  <span
                    className="text-sm"
                    style={{ fontFamily: 'var(--font-sans)', color: 'rgba(250,246,240,0.8)' }}
                  >
                    {item.value}
                  </span>
                </div>
              ))}
            </div>

            <motion.button
              className="mt-6 w-full py-3 text-sm tracking-widest border transition-colors"
              style={{
                fontFamily: 'var(--font-serif)',
                color: '#C9A96E',
                borderColor: '#C9A96E',
              }}
              whileHover={{
                background: '#C9A96E',
                color: '#3D2B1F',
              }}
              whileTap={{ scale: 0.98 }}
            >
              查看全部影片
            </motion.button>
          </motion.div>
        </div>

        {/* 下方三列小卡片 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {miniCards.map((card, i) => (
            <motion.div
              key={i}
              className="relative p-5 border cursor-pointer group overflow-hidden"
              style={{ borderColor: 'rgba(201,169,110,0.3)', background: 'rgba(250,246,240,0.04)' }}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4 + i * 0.1, duration: 0.5 }}
              whileHover={{ y: -4, borderColor: '#C41E24' }}
            >
              <motion.div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: 'rgba(196,30,36,0.05)' }}
              />
              <div className="flex items-start justify-between mb-3">
                <span
                  className="text-xs px-2 py-0.5 tracking-wider"
                  style={{
                    fontFamily: 'var(--font-sans)',
                    background: 'rgba(201,169,110,0.15)',
                    color: '#C9A96E',
                  }}
                >
                  {card.tag}
                </span>
                <span
                  className="text-xs"
                  style={{ fontFamily: 'var(--font-sans)', color: 'rgba(250,246,240,0.4)' }}
                >
                  {card.duration}
                </span>
              </div>
              <h4
                className="text-lg font-bold mb-2"
                style={{ fontFamily: 'var(--font-serif)', color: '#FAF6F0' }}
              >
                {card.title}
              </h4>
              <p
                className="text-sm"
                style={{ fontFamily: 'var(--font-sans)', color: 'rgba(250,246,240,0.55)', lineHeight: '1.7' }}
              >
                {card.desc}
              </p>
              <div
                className="mt-4 flex items-center gap-2 text-xs opacity-0 group-hover:opacity-100 transition-opacity"
                style={{ color: '#C41E24' }}
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M8 5v14l11-7z"/>
                </svg>
                <span style={{ fontFamily: 'var(--font-sans)' }}>立即观看</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
