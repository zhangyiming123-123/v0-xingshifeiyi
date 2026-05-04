'use client'

import { useEffect, useState } from 'react'
import { motion, useAnimation } from 'framer-motion'

const heroChars = ['岭', '南', '醒', '狮']
const dots = [0, 1, 2]

export default function HeroSection() {
  const [activeDot, setActiveDot] = useState(0)
  const [hoveredChar, setHoveredChar] = useState<number | null>(null)
  const controls = useAnimation()

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveDot((prev) => (prev + 1) % 3)
    }, 3000)
    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    controls.start({ opacity: 1, y: 0 })
  }, [controls])

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col overflow-hidden"
      style={{ background: '#1A0E08' }}
    >
      {/* ── 全屏背景图层 ── */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">

        {/* 红底白狮插画 — 右侧主视觉，撑满高度 */}
        <motion.div
          className="absolute right-0 top-0 bottom-0 w-[55%]"
          initial={{ opacity: 0, scale: 1.06 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
        >
          <img
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Image%2036.png-WCgGpqnHpUQwqciR70ZakMRqfiyS7M.jpeg"
            alt=""
            className="w-full h-full object-cover object-center"
          />
          {/* 左侧渐变遮罩，让图片与左侧文字区平滑融合 */}
          <div
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(90deg, #1A0E08 0%, #1A0E0890 28%, transparent 60%)',
            }}
          />
          {/* 顶底遮罩压暗 */}
          <div
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(180deg, #1A0E0860 0%, transparent 20%, transparent 80%, #1A0E08 100%)',
            }}
          />
        </motion.div>

        {/* 蓝底黑狮 — 左侧大幅铺底，与红狮形成双侧包夹 */}
        <motion.div
          className="absolute left-0 top-0 bottom-0 w-[48%]"
          initial={{ opacity: 0, scale: 1.06 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
        >
          <img
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Mark%20Generation%20%2841%29.png-onMatZ9UHpOlGo9qTwir4hGEI1OMEI.jpeg"
            alt=""
            className="w-full h-full object-cover object-center"
            style={{ opacity: 0.28 }}
          />
          {/* 右侧渐变遮罩，让蓝狮向中间自然消隐 */}
          <div
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(90deg, #1A0E08 0%, transparent 35%, #1A0E08 100%)',
            }}
          />
          {/* 顶底压暗 */}
          <div
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(180deg, #1A0E0880 0%, transparent 25%, transparent 75%, #1A0E08 100%)',
            }}
          />
        </motion.div>

        {/* 超大水印"醒"字 */}
        <motion.div
          className="absolute select-none pointer-events-none"
          style={{
            fontSize: 'clamp(240px, 40vw, 480px)',
            fontFamily: 'var(--font-serif)',
            color: 'transparent',
            WebkitTextStroke: '1px rgba(201,169,110,0.08)',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            lineHeight: 1,
            letterSpacing: '-0.05em',
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1.5 }}
          aria-hidden="true"
        >
          醒
        </motion.div>

        {/* 曼陀罗同心圆装饰 — 右侧图片上叠加，呼应插画的圆形元素 */}
        <motion.div
          className="absolute right-[5%] top-1/2 -translate-y-1/2 pointer-events-none"
          initial={{ opacity: 0, rotate: -30, scale: 0.7 }}
          animate={{ opacity: 1, rotate: 0, scale: 1 }}
          transition={{ delay: 1.0, duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
        >
          {[320, 280, 240, 200].map((size, i) => (
            <div
              key={i}
              className="absolute rounded-full border"
              style={{
                width: size,
                height: size,
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                borderColor: i === 0
                  ? 'rgba(201,169,110,0.25)'
                  : i === 1
                  ? 'rgba(196,30,36,0.2)'
                  : i === 2
                  ? 'rgba(201,169,110,0.12)'
                  : 'rgba(196,30,36,0.1)',
                borderStyle: i % 2 === 0 ? 'solid' : 'dashed',
              }}
            />
          ))}
        </motion.div>

        {/* 左上角古典角标 */}
        <motion.div
          className="absolute top-24 left-6 w-20 h-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          transition={{ delay: 1.5 }}
        >
          <svg viewBox="0 0 80 80" fill="none">
            <path d="M4 4 L36 4 M4 4 L4 36" stroke="#C9A96E" strokeWidth="2"/>
            <path d="M10 10 L28 10 M10 10 L10 28" stroke="#C41E24" strokeWidth="1"/>
          </svg>
        </motion.div>

        {/* 右下角古典角标 */}
        <motion.div
          className="absolute bottom-24 right-6 w-20 h-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          transition={{ delay: 1.5 }}
        >
          <svg viewBox="0 0 80 80" fill="none">
            <path d="M76 76 L44 76 M76 76 L76 44" stroke="#C9A96E" strokeWidth="2"/>
            <path d="M70 70 L52 70 M70 70 L70 52" stroke="#C41E24" strokeWidth="1"/>
          </svg>
        </motion.div>

        {/* 横向扫光线条 */}
        <motion.div
          className="absolute left-0 right-0"
          style={{
            height: '1px',
            top: '50%',
            background: 'linear-gradient(90deg, transparent 0%, rgba(201,169,110,0.15) 30%, rgba(196,30,36,0.2) 50%, rgba(201,169,110,0.15) 70%, transparent 100%)',
          }}
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ delay: 1.2, duration: 1.0 }}
        />
      </div>

      {/* ── 主内容区域 ── */}
      <div className="flex-1 flex items-center max-w-7xl mx-auto w-full px-8 pt-28 pb-16 relative z-10">
        <div className="flex flex-col max-w-xl">

          {/* 非遗标签 */}
          <motion.div
            className="flex items-center gap-3 mb-8"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <div
              className="px-3 py-1 text-xs tracking-[0.3em] border"
              style={{
                fontFamily: 'var(--font-sans)',
                color: '#C9A96E',
                borderColor: 'rgba(201,169,110,0.5)',
                background: 'rgba(201,169,110,0.08)',
              }}
            >
              国家级非物质文化遗产
            </div>
            <div className="h-px w-6" style={{ background: '#C9A96E40' }} />
            <span
              className="text-[10px] tracking-[0.4em]"
              style={{ fontFamily: 'var(--font-sans)', color: 'rgba(201,169,110,0.5)' }}
            >
              2006 · NATIONAL HERITAGE
            </span>
          </motion.div>

          {/* 书法大字 — 错落竖行感，逐字动画 */}
          <div className="mb-4" aria-label="岭南醒狮">
            {/* 前两字小一号，后两字放大，形成层次 */}
            <div className="flex items-end gap-2 mb-1">
              {['岭', '南'].map((char, i) => (
                <motion.span
                  key={i}
                  className="cursor-default select-none"
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: 'clamp(2.8rem, 7vw, 4.5rem)',
                    lineHeight: 1,
                    color: 'rgba(250,246,240,0.7)',
                    letterSpacing: '0.05em',
                  }}
                  initial={{ opacity: 0, y: 24, filter: 'blur(8px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  transition={{ delay: 0.5 + i * 0.15, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                  onMouseEnter={() => setHoveredChar(i)}
                  onMouseLeave={() => setHoveredChar(null)}
                  whileHover={{ color: '#C9A96E', scale: 1.1 }}
                >
                  {char}
                </motion.span>
              ))}
            </div>
            <div className="flex items-end gap-3">
              {['醒', '狮'].map((char, i) => (
                <motion.span
                  key={i}
                  className="cursor-default select-none"
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: 'clamp(5rem, 14vw, 9rem)',
                    lineHeight: 0.9,
                    color: i === 0 ? '#C41E24' : '#FAF6F0',
                    letterSpacing: '0.02em',
                    textShadow: i === 0
                      ? '0 0 40px rgba(196,30,36,0.4), 4px 4px 0 rgba(196,30,36,0.2)'
                      : '4px 4px 0 rgba(61,43,31,0.5)',
                  }}
                  initial={{ opacity: 0, y: 40, filter: 'blur(12px)', scale: 0.88 }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)', scale: 1 }}
                  transition={{ delay: 0.8 + i * 0.18, duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
                  onMouseEnter={() => setHoveredChar(i + 2)}
                  onMouseLeave={() => setHoveredChar(null)}
                  whileHover={{ scale: 1.04, y: -4 }}
                >
                  {char}
                </motion.span>
              ))}
            </div>
          </div>

          {/* 装饰分隔线 */}
          <motion.div
            className="flex items-center gap-3 mb-6"
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ delay: 1.3, duration: 0.7, ease: 'easeOut' }}
            style={{ transformOrigin: 'left' }}
          >
            <div className="h-[2px] w-10" style={{ background: '#C41E24' }} />
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M10 2 L12.5 7.5 L18 8.5 L14 12.5 L15 18 L10 15 L5 18 L6 12.5 L2 8.5 L7.5 7.5 Z" stroke="#C9A96E" strokeWidth="1" fill="rgba(201,169,110,0.15)"/>
            </svg>
            <div className="h-px flex-1" style={{ background: 'linear-gradient(90deg, #C9A96E60, transparent)' }} />
          </motion.div>

          {/* 副标题 + 描述 */}
          <motion.p
            className="text-sm mb-2 tracking-[0.25em]"
            style={{ fontFamily: 'var(--font-sans)', color: 'rgba(201,169,110,0.7)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4, duration: 0.6 }}
          >
            LINGNAN LION DANCE · INTANGIBLE CULTURAL HERITAGE
          </motion.p>
          <motion.p
            className="text-sm leading-loose mb-10"
            style={{
              fontFamily: 'var(--font-sans)',
              color: 'rgba(250,246,240,0.55)',
              lineHeight: '2',
            }}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 0.6 }}
          >
            源于唐代，盛于岭南。集武术、舞蹈、音乐于一体，<br />
            每逢节庆，锣鼓喧天，狮舞翩跹，传承千年不衰。
          </motion.p>

          {/* 按钮组 */}
          <motion.div
            className="flex items-center gap-4"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.7, duration: 0.5 }}
          >
            <motion.a
              href="#culture"
              className="relative px-8 py-3 text-sm tracking-widest overflow-hidden"
              style={{
                fontFamily: 'var(--font-serif)',
                background: '#C41E24',
                color: '#FAF6F0',
              }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: 'spring', stiffness: 400, damping: 20 }}
            >
              <motion.div
                className="absolute inset-0"
                style={{ background: '#8B1218' }}
                initial={{ x: '-100%' }}
                whileHover={{ x: 0 }}
                transition={{ duration: 0.3 }}
              />
              <span className="relative z-10">探寻文脉</span>
            </motion.a>

            <motion.a
              href="#film"
              className="flex items-center gap-2 px-6 py-3 text-sm tracking-widest border"
              style={{
                fontFamily: 'var(--font-serif)',
                color: '#C9A96E',
                borderColor: 'rgba(201,169,110,0.5)',
              }}
              whileHover={{ borderColor: '#C9A96E', color: '#FAF6F0', scale: 1.03 }}
              transition={{ type: 'spring', stiffness: 400, damping: 20 }}
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M8 5v14l11-7z"/>
              </svg>
              观看短片
            </motion.a>
          </motion.div>
        </div>
      </div>

      {/* ── 右侧插画徽章浮动层（仅大屏显示，叠于图上） ── */}
      <motion.div
        className="hidden lg:block absolute right-[6%] top-1/2 -translate-y-1/2 z-10 pointer-events-none"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.6, duration: 0.8 }}
      >
        {/* 底部标签 */}
        <div
          className="absolute -bottom-10 left-1/2 -translate-x-1/2 px-6 py-2 flex items-center gap-2 whitespace-nowrap"
          style={{ background: 'rgba(26,14,8,0.85)', border: '1px solid rgba(201,169,110,0.4)' }}
        >
          <div className="w-1.5 h-1.5 rounded-full" style={{ background: '#C41E24' }} />
          <span
            className="text-xs tracking-[0.3em]"
            style={{ fontFamily: 'var(--font-sans)', color: '#C9A96E' }}
          >
            岭南非遗 · 醒狮文化
          </span>
          <div className="w-1.5 h-1.5 rounded-full" style={{ background: '#C41E24' }} />
        </div>
      </motion.div>

      {/* ── 底部轮播点 + 滚动提示 ── */}
      <div className="relative z-10 flex flex-col items-center gap-4 pb-10">
        <div className="flex items-center gap-3">
          {dots.map((dot) => (
            <motion.button
              key={dot}
              onClick={() => setActiveDot(dot)}
              aria-label={`轮播点 ${dot + 1}`}
              style={{
                height: 6,
                borderRadius: 3,
                background: activeDot === dot ? '#C41E24' : 'rgba(201,169,110,0.35)',
              }}
              animate={{ width: activeDot === dot ? 28 : 6 }}
              transition={{ type: 'spring', stiffness: 500, damping: 30 }}
            />
          ))}
        </div>

        <motion.div
          className="flex flex-col items-center gap-1"
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
        >
          <span
            className="text-xs tracking-widest"
            style={{ fontFamily: 'var(--font-sans)', color: 'rgba(201,169,110,0.45)' }}
          >
            向下探索
          </span>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(201,169,110,0.45)" strokeWidth="2" aria-hidden="true">
            <path d="M12 5v14M5 12l7 7 7-7"/>
          </svg>
        </motion.div>
      </div>
    </section>
  )
}
