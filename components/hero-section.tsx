'use client'

import { useEffect, useState } from 'react'
import { motion, useAnimation } from 'framer-motion'

const heroChars = ['岭', '南', '醒', '狮']

function LionHeadSVG() {
  return (
    <svg
      viewBox="0 0 400 460"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full"
      aria-label="岭南醒狮线条狮头插图"
    >
      {/* 顶部装饰球 */}
      <circle cx="200" cy="30" r="18" stroke="#C9A96E" strokeWidth="1.5" fill="none"/>
      <circle cx="200" cy="30" r="10" stroke="#C41E24" strokeWidth="1" fill="none"/>
      <circle cx="200" cy="30" r="4" fill="#C41E24"/>

      {/* 头顶羽毛装饰 */}
      <path d="M170 55 Q160 30 175 40 Q165 20 185 35 Q178 15 200 25" stroke="#C9A96E" strokeWidth="1.2" fill="none" strokeLinecap="round"/>
      <path d="M230 55 Q240 30 225 40 Q235 20 215 35 Q222 15 200 25" stroke="#C9A96E" strokeWidth="1.2" fill="none" strokeLinecap="round"/>

      {/* 额头云纹 */}
      <path d="M145 90 Q155 75 165 85 Q162 68 178 75 Q175 60 195 68 Q195 55 210 60 Q215 50 228 58 Q235 65 232 75 Q245 78 242 90" stroke="#C9A96E" strokeWidth="1.2" fill="none" strokeLinecap="round"/>

      {/* 主脸型 */}
      <ellipse cx="200" cy="200" rx="115" ry="130" stroke="#C41E24" strokeWidth="2" fill="none"/>

      {/* 耳朵 */}
      <path d="M85 140 Q65 110 75 85 Q90 70 108 88 Q95 100 92 120 Z" stroke="#C41E24" strokeWidth="1.5" fill="none"/>
      <path d="M90 130 Q78 108 85 90 Q96 82 107 95 Q98 105 96 122 Z" stroke="#C9A96E" strokeWidth="1" fill="none"/>
      <path d="M315 140 Q335 110 325 85 Q310 70 292 88 Q305 100 308 120 Z" stroke="#C41E24" strokeWidth="1.5" fill="none"/>
      <path d="M310 130 Q322 108 315 90 Q304 82 293 95 Q302 105 304 122 Z" stroke="#C9A96E" strokeWidth="1" fill="none"/>

      {/* 眉毛 */}
      <path d="M130 160 Q155 145 175 155" stroke="#C41E24" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
      <path d="M225 155 Q245 145 270 160" stroke="#C41E24" strokeWidth="2.5" fill="none" strokeLinecap="round"/>

      {/* 眼睛外圈 */}
      <ellipse cx="158" cy="185" rx="26" ry="22" stroke="#C41E24" strokeWidth="2" fill="none"/>
      <ellipse cx="242" cy="185" rx="26" ry="22" stroke="#C41E24" strokeWidth="2" fill="none"/>

      {/* 眼睛内部 */}
      <ellipse cx="158" cy="185" rx="16" ry="14" stroke="#2C5F7C" strokeWidth="1.5" fill="none"/>
      <ellipse cx="242" cy="185" rx="16" ry="14" stroke="#2C5F7C" strokeWidth="1.5" fill="none"/>
      <circle cx="158" cy="185" r="7" fill="#2C5F7C" opacity="0.8"/>
      <circle cx="242" cy="185" r="7" fill="#2C5F7C" opacity="0.8"/>
      <circle cx="155" cy="182" r="3" fill="white" opacity="0.9"/>
      <circle cx="239" cy="182" r="3" fill="white" opacity="0.9"/>

      {/* 鼻子区域 */}
      <path d="M185 230 Q200 240 215 230" stroke="#C41E24" strokeWidth="2" fill="none" strokeLinecap="round"/>
      <ellipse cx="200" cy="235" rx="12" ry="8" stroke="#C41E24" strokeWidth="1.5" fill="none"/>

      {/* 胡须 */}
      <line x1="60" y1="250" x2="145" y2="238" stroke="#C9A96E" strokeWidth="1.2"/>
      <line x1="55" y1="265" x2="145" y2="255" stroke="#C9A96E" strokeWidth="1.2"/>
      <line x1="65" y1="278" x2="145" y2="272" stroke="#C9A96E" strokeWidth="1"/>
      <line x1="340" y1="250" x2="255" y2="238" stroke="#C9A96E" strokeWidth="1.2"/>
      <line x1="345" y1="265" x2="255" y2="255" stroke="#C9A96E" strokeWidth="1.2"/>
      <line x1="335" y1="278" x2="255" y2="272" stroke="#C9A96E" strokeWidth="1"/>

      {/* 嘴巴/下颌 */}
      <path d="M148 265 Q165 280 200 282 Q235 280 252 265" stroke="#C41E24" strokeWidth="2" fill="none" strokeLinecap="round"/>
      <path d="M155 285 Q175 310 200 315 Q225 310 245 285" stroke="#C41E24" strokeWidth="2" fill="none" strokeLinecap="round"/>
      <path d="M148 265 Q148 295 155 285" stroke="#C41E24" strokeWidth="1.5" fill="none"/>
      <path d="M252 265 Q252 295 245 285" stroke="#C41E24" strokeWidth="1.5" fill="none"/>

      {/* 下颌装饰流苏 */}
      <path d="M160 315 Q158 340 155 360 Q160 380 158 400" stroke="#C9A96E" strokeWidth="1" fill="none" strokeLinecap="round"/>
      <path d="M175 318 Q173 345 172 368 Q175 390 173 410" stroke="#C9A96E" strokeWidth="1" fill="none" strokeLinecap="round"/>
      <path d="M190 320 Q188 348 188 372 Q190 395 188 415" stroke="#C9A96E" strokeWidth="1" fill="none" strokeLinecap="round"/>
      <path d="M200 320 Q200 350 200 375 Q200 398 200 418" stroke="#C9A96E" strokeWidth="1" fill="none" strokeLinecap="round"/>
      <path d="M210 320 Q212 348 212 372 Q210 395 212 415" stroke="#C9A96E" strokeWidth="1" fill="none" strokeLinecap="round"/>
      <path d="M225 318 Q227 345 228 368 Q225 390 227 410" stroke="#C9A96E" strokeWidth="1" fill="none" strokeLinecap="round"/>
      <path d="M240 315 Q242 340 245 360 Q240 380 242 400" stroke="#C9A96E" strokeWidth="1" fill="none" strokeLinecap="round"/>

      {/* 流苏底部装饰 */}
      <path d="M155 400 Q158 410 155 418" stroke="#C41E24" strokeWidth="1.2" fill="none" strokeLinecap="round"/>
      <path d="M173 410 Q175 420 172 428" stroke="#C41E24" strokeWidth="1.2" fill="none" strokeLinecap="round"/>
      <path d="M188 415 Q190 425 188 433" stroke="#C41E24" strokeWidth="1.2" fill="none" strokeLinecap="round"/>
      <path d="M200 418 Q200 428 200 436" stroke="#C41E24" strokeWidth="1.2" fill="none" strokeLinecap="round"/>
      <path d="M212 415 Q210 425 212 433" stroke="#C41E24" strokeWidth="1.2" fill="none" strokeLinecap="round"/>
      <path d="M227 410 Q225 420 228 428" stroke="#C41E24" strokeWidth="1.2" fill="none" strokeLinecap="round"/>
      <path d="M245 400 Q242 410 245 418" stroke="#C41E24" strokeWidth="1.2" fill="none" strokeLinecap="round"/>

      {/* 脸部祥云装饰 */}
      <path d="M200 130 Q193 120 186 125 Q180 115 174 122 Q170 114 178 110 Q185 104 195 112 Q200 105 205 112 Q215 104 222 110 Q230 114 226 122 Q220 115 214 125 Q207 120 200 130 Z" stroke="#C9A96E" strokeWidth="1" fill="none"/>
    </svg>
  )
}

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

          {/* 右侧狮头SVG */}
          <div className="flex-shrink-0 w-72 h-80 md:w-96 md:h-[440px] lg:w-[420px] lg:h-[480px] relative">
            {/* 背景圆形装饰 */}
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 1, ease: [0.22, 1, 0.36, 1] }}
            >
              <div
                className="absolute w-4/5 h-4/5 rounded-full"
                style={{
                  border: '1px solid rgba(201,169,110,0.3)',
                  background: 'radial-gradient(circle, rgba(196,30,36,0.04) 0%, transparent 70%)',
                }}
              />
              <div
                className="absolute w-3/5 h-3/5 rounded-full"
                style={{ border: '1px dashed rgba(201,169,110,0.2)' }}
              />
            </motion.div>

            {/* 古典角标装饰 */}
            {[
              'top-4 left-4',
              'top-4 right-4',
              'bottom-4 left-4',
              'bottom-4 right-4',
            ].map((pos, i) => (
              <motion.div
                key={i}
                className={`absolute ${pos} w-8 h-8 opacity-50`}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 0.5, scale: 1 }}
                transition={{ delay: 0.8 + i * 0.1 }}
              >
                <svg viewBox="0 0 32 32" fill="none">
                  {i === 0 && <><line x1="2" y1="2" x2="14" y2="2" stroke="#C9A96E" strokeWidth="1.5"/><line x1="2" y1="2" x2="2" y2="14" stroke="#C9A96E" strokeWidth="1.5"/></>}
                  {i === 1 && <><line x1="30" y1="2" x2="18" y2="2" stroke="#C9A96E" strokeWidth="1.5"/><line x1="30" y1="2" x2="30" y2="14" stroke="#C9A96E" strokeWidth="1.5"/></>}
                  {i === 2 && <><line x1="2" y1="30" x2="14" y2="30" stroke="#C9A96E" strokeWidth="1.5"/><line x1="2" y1="30" x2="2" y2="18" stroke="#C9A96E" strokeWidth="1.5"/></>}
                  {i === 3 && <><line x1="30" y1="30" x2="18" y2="30" stroke="#C9A96E" strokeWidth="1.5"/><line x1="30" y1="30" x2="30" y2="18" stroke="#C9A96E" strokeWidth="1.5"/></>}
                </svg>
              </motion.div>
            ))}

            {/* 狮头主体 */}
            <motion.div
              className="relative w-full h-full float-anim"
              initial={{ opacity: 0, rotate: -15, scale: 0.85 }}
              animate={{ opacity: 1, rotate: 0, scale: 1 }}
              transition={{ delay: 0.5, duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            >
              <LionHeadSVG />
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
