'use client'

import { useEffect, useState } from 'react'
import { motion, useAnimation } from 'framer-motion'

const heroChars = ['岭', '南', '醒', '狮']

const dots = [0, 1, 2]

export default function HeroSection() {
  const [activeDot, setActiveDot] = useState(0)
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
      className="relative min-h-screen flex flex-col rice-paper cloud-pattern overflow-hidden"
    >
      {/* 背景装饰元素 */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
      >
        {/* 左上角古典角标 */}
        <div className="absolute top-20 left-6 w-16 h-16 opacity-30">
          <svg viewBox="0 0 64 64" fill="none">
            <path d="M4 4 L28 4 M4 4 L4 28" stroke="#C9A96E" strokeWidth="2"/>
            <path d="M8 8 L24 8 M8 8 L8 24" stroke="#C41E24" strokeWidth="1"/>
          </svg>
        </div>
        {/* 右下角古典角标 */}
        <div className="absolute bottom-24 right-6 w-16 h-16 opacity-30">
          <svg viewBox="0 0 64 64" fill="none">
            <path d="M60 60 L36 60 M60 60 L60 36" stroke="#C9A96E" strokeWidth="2"/>
            <path d="M56 56 L40 56 M56 56 L56 40" stroke="#C41E24" strokeWidth="1"/>
          </svg>
        </div>
        {/* 大红圆背景装饰 */}
        <div
          className="absolute top-1/4 right-0 w-96 h-96 rounded-full opacity-[0.04]"
          style={{ background: '#C41E24', transform: 'translate(30%, -20%)' }}
        />
        <div
          className="absolute bottom-1/4 left-0 w-64 h-64 rounded-full opacity-[0.03]"
          style={{ background: '#2C5F7C', transform: 'translate(-30%, 20%)' }}
        />
      </div>

      {/* 主内容区域 */}
      <div className="flex-1 flex items-center max-w-7xl mx-auto w-full px-6 pt-24 pb-16">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16 w-full">

          {/* 左侧文字内容 */}
          <div className="flex-1 flex flex-col items-start">
            {/* 非遗标签 */}
            <motion.div
              className="flex items-center gap-2 mb-6"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <span
                className="px-3 py-1 text-xs tracking-[0.25em] border"
                style={{
                  fontFamily: 'var(--font-sans)',
                  color: '#2C5F7C',
                  borderColor: '#2C5F7C',
                  background: 'rgba(44,95,124,0.08)',
                }}
              >
                国家级非物质文化遗产
              </span>
              <div className="h-px w-8" style={{ background: '#C9A96E' }} />
              <span
                className="text-xs tracking-widest"
                style={{ fontFamily: 'var(--font-sans)', color: '#7A6055' }}
              >
                NATIONAL HERITAGE
              </span>
            </motion.div>

            {/* 大标题书法字逐字动画 */}
            <div className="flex items-end gap-3 mb-2" aria-label="岭南醒狮">
              {heroChars.map((char, i) => (
                <motion.span
                  key={i}
                  className="text-[clamp(4rem,12vw,8rem)] leading-none font-black select-none"
                  style={{
                    fontFamily: 'var(--font-serif)',
                    color: '#C41E24',
                    textShadow: '3px 3px 0 rgba(196,30,36,0.15)',
                    letterSpacing: '0.05em',
                  }}
                  initial={{ opacity: 0, y: 30, filter: 'blur(6px)', scale: 0.85 }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)', scale: 1 }}
                  transition={{
                    delay: 0.4 + i * 0.15,
                    duration: 0.7,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  {char}
                </motion.span>
              ))}
            </div>

            {/* 英文副标题 */}
            <motion.p
              className="text-base tracking-[0.3em] mb-4"
              style={{
                fontFamily: 'var(--font-sans)',
                color: '#7A6055',
                letterSpacing: '0.25em',
              }}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.1, duration: 0.6 }}
            >
              LINGNAN LION DANCE · INTANGIBLE CULTURAL HERITAGE
            </motion.p>

            {/* 卷轴分隔线 */}
            <motion.div
              className="flex items-center gap-3 mb-6"
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ delay: 1.3, duration: 0.6, ease: 'easeOut' }}
              style={{ transformOrigin: 'left' }}
            >
              <div className="h-px w-12" style={{ background: 'linear-gradient(90deg, #C41E24, #C9A96E)' }} />
              <svg width="16" height="16" viewBox="0 0 16 16">
                <circle cx="8" cy="8" r="6" stroke="#C9A96E" strokeWidth="1" fill="none"/>
                <circle cx="8" cy="8" r="2" fill="#C41E24"/>
              </svg>
              <div className="h-px w-12" style={{ background: 'linear-gradient(90deg, #C9A96E, transparent)' }} />
            </motion.div>

            {/* 描述文字 */}
            <motion.p
              className="text-base leading-relaxed mb-8 max-w-md"
              style={{
                fontFamily: 'var(--font-sans)',
                color: '#5A4035',
                lineHeight: '1.9',
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.4, duration: 0.6 }}
            >
              岭南醒狮，源于明代，集武术、舞蹈、音乐、杂技于一体，
              融入岭南人的精气神，是中华优秀传统文化的璀璨明珠。
              每逢节庆，锣鼓喧天，狮舞翩跹，传承千年不衰。
            </motion.p>

            {/* 按钮组 */}
            <motion.div
              className="flex items-center gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.6, duration: 0.5 }}
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
                <span className="relative z-10">探寻文脉</span>
                <motion.div
                  className="absolute inset-0"
                  style={{ background: '#3D2B1F' }}
                  initial={{ x: '-100%' }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.a>

              <motion.a
                href="#film"
                className="flex items-center gap-2 px-6 py-3 text-sm tracking-widest border"
                style={{
                  fontFamily: 'var(--font-serif)',
                  color: '#3D2B1F',
                  borderColor: '#C9A96E',
                }}
                whileHover={{
                  scale: 1.03,
                  color: '#C41E24',
                  borderColor: '#C41E24',
                }}
                transition={{ type: 'spring', stiffness: 400, damping: 20 }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M8 5v14l11-7z"/>
                </svg>
                观看短片
              </motion.a>
            </motion.div>
          </div>

          {/* 右侧醒狮真实图片 */}
          <div className="flex-shrink-0 w-72 h-80 md:w-96 md:h-[440px] lg:w-[460px] lg:h-[520px] relative">
            {/* 外圈光晕装饰 */}
            <motion.div
              className="absolute inset-0 flex items-center justify-center pointer-events-none"
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 1, ease: [0.22, 1, 0.36, 1] }}
            >
              <div
                className="absolute w-[90%] h-[90%] rounded-full"
                style={{
                  border: '1px solid rgba(201,169,110,0.35)',
                  boxShadow: 'inset 0 0 60px rgba(196,30,36,0.06)',
                }}
              />
              <div
                className="absolute w-[78%] h-[78%] rounded-full"
                style={{ border: '1px dashed rgba(201,169,110,0.2)' }}
              />
            </motion.div>

            {/* 古典角标装饰 */}
            {[
              { pos: 'top-2 left-2', d0: 'M2 2 L16 2', d1: 'M2 2 L2 16' },
              { pos: 'top-2 right-2', d0: 'M30 2 L16 2', d1: 'M30 2 L30 16' },
              { pos: 'bottom-2 left-2', d0: 'M2 30 L16 30', d1: 'M2 30 L2 16' },
              { pos: 'bottom-2 right-2', d0: 'M30 30 L16 30', d1: 'M30 30 L30 16' },
            ].map((item, i) => (
              <motion.div
                key={i}
                className={`absolute ${item.pos} w-8 h-8`}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 0.6, scale: 1 }}
                transition={{ delay: 0.8 + i * 0.1 }}
                aria-hidden="true"
              >
                <svg viewBox="0 0 32 32" fill="none">
                  <path d={item.d0} stroke="#C9A96E" strokeWidth="1.5"/>
                  <path d={item.d1} stroke="#C9A96E" strokeWidth="1.5"/>
                </svg>
              </motion.div>
            ))}

            {/* 醒狮图片主体 */}
            <motion.div
              className="relative w-full h-full float-anim"
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: 0.5, duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* 图片容器：圆形裁切 + 金边 */}
              <div
                className="w-full h-full rounded-full overflow-hidden"
                style={{
                  border: '3px solid rgba(201,169,110,0.6)',
                  boxShadow: '0 0 0 6px rgba(201,169,110,0.12), 0 20px 60px rgba(196,30,36,0.25), 0 8px 32px rgba(61,43,31,0.3)',
                }}
              >
                <img
                  src="/images/lion-dance-hero.jpg"
                  alt="岭南醒狮舞狮表演，色彩鲜艳的狮头道具特写"
                  className="w-full h-full object-cover"
                  style={{ objectPosition: 'center 20%' }}
                />
              </div>

              {/* 底部徽章标签 */}
              <motion.div
                className="absolute -bottom-3 left-1/2 -translate-x-1/2 px-5 py-1.5 flex items-center gap-2"
                style={{
                  background: '#3D2B1F',
                  border: '1px solid rgba(201,169,110,0.5)',
                }}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.4, duration: 0.5 }}
              >
                <div className="w-1.5 h-1.5 rounded-full" style={{ background: '#C41E24' }} />
                <span
                  className="text-xs tracking-widest whitespace-nowrap"
                  style={{ fontFamily: 'var(--font-sans)', color: '#C9A96E' }}
                >
                  岭南非遗 · 醒狮表演
                </span>
                <div className="w-1.5 h-1.5 rounded-full" style={{ background: '#C41E24' }} />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* 底部轮播点 + 滚动提示 */}
      <div className="flex flex-col items-center gap-4 pb-8">
        {/* 轮播点 */}
        <div className="flex items-center gap-3">
          {dots.map((dot) => (
            <motion.button
              key={dot}
              onClick={() => setActiveDot(dot)}
              className="relative rounded-full"
              style={{
                width: activeDot === dot ? 24 : 8,
                height: 8,
                background: activeDot === dot ? '#C41E24' : '#C9A96E',
                opacity: activeDot === dot ? 1 : 0.4,
              }}
              animate={{
                width: activeDot === dot ? 24 : 8,
                background: activeDot === dot ? '#C41E24' : '#C9A96E',
              }}
              transition={{ type: 'spring', stiffness: 500, damping: 30 }}
              aria-label={`轮播点 ${dot + 1}`}
            />
          ))}
        </div>

        {/* 滚动提示 */}
        <motion.div
          className="flex flex-col items-center gap-1 opacity-50"
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
        >
          <span
            className="text-xs tracking-widest"
            style={{ fontFamily: 'var(--font-sans)', color: '#7A6055' }}
          >
            向下探索
          </span>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#7A6055" strokeWidth="2">
            <path d="M12 5v14M5 12l7 7 7-7"/>
          </svg>
        </motion.div>
      </div>
    </section>
  )
}
