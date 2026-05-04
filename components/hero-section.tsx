'use client'

import { useEffect, useRef, useState } from 'react'
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue,
  useAnimationFrame,
} from 'framer-motion'

const heroChars = [
  { char: '岭', delay: 0.3, fromX: -60 },
  { char: '南', delay: 0.45, fromX: -40 },
  { char: '醒', delay: 0.65, fromX: 0, big: true, red: true },
  { char: '狮', delay: 0.82, fromX: 0, big: true },
]

// 浮动粒子数据（固定，避免 hydration 不一致）
const PARTICLES = Array.from({ length: 18 }, (_, i) => ({
  id: i,
  x: (i * 37 + 13) % 100,
  y: (i * 53 + 7) % 100,
  size: 1 + (i % 3) * 0.6,
  dur: 3 + (i % 4) * 1.2,
  delay: (i * 0.3) % 2,
}))

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const [activeDot, setActiveDot] = useState(0)

  // 鼠标视差
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const smoothX = useSpring(mouseX, { stiffness: 60, damping: 20 })
  const smoothY = useSpring(mouseY, { stiffness: 60, damping: 20 })

  // 背景层视差位移（幅度不同形成层次）
  const bgShiftX1 = useTransform(smoothX, [-1, 1], [-18, 18])
  const bgShiftY1 = useTransform(smoothY, [-1, 1], [-10, 10])
  const bgShiftX2 = useTransform(smoothX, [-1, 1], [14, -14])
  const bgShiftY2 = useTransform(smoothY, [-1, 1], [8, -8])
  const circleShiftX = useTransform(smoothX, [-1, 1], [-8, 8])
  const circleShiftY = useTransform(smoothY, [-1, 1], [-5, 5])

  // 滚动视差
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end start'] })
  const scrollY_bg = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])
  const contentOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const contentY = useTransform(scrollYProgress, [0, 0.5], [0, -60])
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.12])

  // 自动轮播点
  useEffect(() => {
    const t = setInterval(() => setActiveDot((p) => (p + 1) % 3), 3200)
    return () => clearInterval(t)
  }, [])

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const { clientX, clientY, currentTarget } = e
    const { width, height } = currentTarget.getBoundingClientRect()
    mouseX.set((clientX / width - 0.5) * 2)
    mouseY.set((clientY / height - 0.5) * 2)
  }
  const handleMouseLeave = () => {
    mouseX.set(0)
    mouseY.set(0)
  }

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative min-h-screen flex flex-col overflow-hidden"
      style={{ background: '#0E0806' }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* ════════════════════════════════
          背景图层区（三层视差叠加）
      ════════════════════════════════ */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">

        {/* 层 1 — 蓝底黑狮，全屏铺底，最慢视差 */}
        <motion.div
          className="absolute inset-0"
          style={{ y: bgShiftY2, x: bgShiftX2, scale: bgScale }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.8 }}
        >
          <img
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Mark%20Generation%20%2841%29.png-onMatZ9UHpOlGo9qTwir4hGEI1OMEI.jpeg"
            alt=""
            className="w-full h-full object-cover object-center"
            style={{ opacity: 0.45 }}
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                'radial-gradient(ellipse 80% 80% at 50% 50%, transparent 30%, #0E080690 70%, #0E0806 100%)',
            }}
          />
        </motion.div>

        {/* 层 2 — 红底白狮，右侧压入，快速视差 */}
        <motion.div
          className="absolute right-0 top-0 bottom-0"
          style={{
            width: '62%',
            y: bgShiftY1,
            x: bgShiftX1,
            scale: bgScale,
          }}
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <img
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Image%2036.png-WCgGpqnHpUQwqciR70ZakMRqfiyS7M.jpeg"
            alt=""
            className="w-full h-full object-cover"
            style={{ objectPosition: 'center 30%' }}
          />
          {/* 左侧渐变融合 */}
          <div
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(90deg, #0E0806 0%, #0E080675 22%, transparent 55%)',
            }}
          />
          {/* 底部渐变 */}
          <div
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(180deg, #0E080660 0%, transparent 15%, transparent 75%, #0E0806 100%)',
            }}
          />
        </motion.div>

        {/* 层 3 — 全局色调遮罩：红色光晕 */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 55% 55% at 38% 55%, rgba(196,30,36,0.09) 0%, transparent 70%)',
            pointerEvents: 'none',
          }}
        />

        {/* 宣纸肌理（超细噪点模拟） */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`,
            backgroundSize: '200px 200px',
          }}
        />

        {/* 超大水印"醒" */}
        <motion.div
          className="absolute select-none font-serif"
          style={{
            fontSize: 'clamp(300px, 50vw, 600px)',
            color: 'transparent',
            WebkitTextStroke: '1px rgba(201,169,110,0.06)',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            lineHeight: 1,
            fontFamily: 'var(--font-serif)',
            x: circleShiftX,
            y: circleShiftY,
          }}
          initial={{ opacity: 0, scale: 1.2 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6, duration: 2 }}
          aria-hidden="true"
        >
          醒
        </motion.div>

        {/* 视差同心圆装饰 */}
        <motion.div
          className="absolute"
          style={{
            right: '8%',
            top: '50%',
            x: circleShiftX,
            y: circleShiftY,
          }}
        >
          {[440, 380, 310, 240, 170].map((size, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full"
              style={{
                width: size,
                height: size,
                top: '50%',
                left: '50%',
                x: '-50%',
                y: '-50%',
                border: `${i === 0 ? 1 : 0.5}px ${i % 2 === 0 ? 'solid' : 'dashed'} ${
                  i === 0
                    ? 'rgba(201,169,110,0.22)'
                    : i === 1
                    ? 'rgba(196,30,36,0.18)'
                    : i === 2
                    ? 'rgba(201,169,110,0.1)'
                    : i === 3
                    ? 'rgba(44,95,124,0.15)'
                    : 'rgba(201,169,110,0.07)'
                }`,
              }}
              initial={{ opacity: 0, scale: 0.6, rotate: -20 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{
                delay: 1.0 + i * 0.12,
                duration: 1.2,
                ease: [0.22, 1, 0.36, 1],
              }}
            />
          ))}
        </motion.div>

        {/* 浮动金粉粒子 */}
        {PARTICLES.map((p) => (
          <motion.div
            key={p.id}
            className="absolute rounded-full"
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: p.size,
              height: p.size,
              background: p.id % 3 === 0 ? '#C9A96E' : p.id % 3 === 1 ? '#C41E24' : '#FAF6F0',
              opacity: 0.3 + (p.id % 4) * 0.1,
            }}
            animate={{
              y: [0, -18, 0],
              opacity: [0.2, 0.6, 0.2],
            }}
            transition={{
              duration: p.dur,
              delay: p.delay,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        ))}

        {/* 古典角标 — 四角 */}
        {[
          { cls: 'top-24 left-6', d1: 'M4 4 L36 4 M4 4 L4 36', d2: 'M10 10 L28 10 M10 10 L10 28' },
          { cls: 'top-24 right-6', d1: 'M76 4 L44 4 M76 4 L76 36', d2: 'M70 10 L52 10 M70 10 L70 28' },
          { cls: 'bottom-24 left-6', d1: 'M4 76 L36 76 M4 76 L4 44', d2: 'M10 70 L28 70 M10 70 L10 52' },
          { cls: 'bottom-24 right-6', d1: 'M76 76 L44 76 M76 76 L76 44', d2: 'M70 70 L52 70 M70 70 L70 52' },
        ].map((corner, i) => (
          <motion.div
            key={i}
            className={`absolute w-20 h-20 ${corner.cls}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.55 }}
            transition={{ delay: 1.8 + i * 0.1 }}
            aria-hidden="true"
          >
            <svg viewBox="0 0 80 80" fill="none">
              <path d={corner.d1} stroke="#C9A96E" strokeWidth="1.5" />
              <path d={corner.d2} stroke="#C41E24" strokeWidth="0.8" />
            </svg>
          </motion.div>
        ))}

        {/* 水平扫光线 */}
        <motion.div
          className="absolute left-0 right-0"
          style={{
            height: '1px',
            top: '50%',
            background:
              'linear-gradient(90deg, transparent 0%, rgba(201,169,110,0.1) 25%, rgba(196,30,36,0.25) 50%, rgba(201,169,110,0.1) 75%, transparent 100%)',
          }}
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ delay: 1.4, duration: 1.2 }}
        />
      </div>

      {/* ════════════════════════════════
          主内容层（滚动淡出）
      ════════════════════════════════ */}
      <motion.div
        className="flex-1 flex items-center max-w-7xl mx-auto w-full px-8 md:px-16 pt-28 pb-16 relative z-10"
        style={{ opacity: contentOpacity, y: contentY }}
      >
        <div className="flex flex-col max-w-2xl">

          {/* 非遗徽章标签 */}
          <motion.div
            className="flex items-center gap-3 mb-10"
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <div
              className="flex items-center gap-2 px-4 py-1.5"
              style={{
                border: '1px solid rgba(201,169,110,0.45)',
                background: 'rgba(201,169,110,0.07)',
              }}
            >
              <div className="w-1.5 h-1.5 rounded-full" style={{ background: '#C41E24' }} />
              <span
                className="text-xs tracking-[0.35em]"
                style={{ fontFamily: 'var(--font-sans)', color: '#C9A96E' }}
              >
                国家级非物质文化遗产
              </span>
            </div>
            <div
              className="h-px w-12"
              style={{ background: 'linear-gradient(90deg, rgba(201,169,110,0.5), transparent)' }}
            />
            <span
              className="text-[10px] tracking-[0.3em] hidden md:block"
              style={{ fontFamily: 'var(--font-sans)', color: 'rgba(201,169,110,0.4)' }}
            >
              EST. 2006
            </span>
          </motion.div>

          {/* 书法大字 — 错层叠排，营造卷轴展开感 */}
          <div className="mb-6" aria-label="岭南醒狮">
            {/* 第一行：岭南（小） */}
            <div className="flex items-baseline gap-3 mb-[-8px]">
              {['岭', '南'].map((char, i) => (
                <motion.span
                  key={char}
                  className="cursor-default select-none block"
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: 'clamp(2.4rem, 5.5vw, 3.8rem)',
                    lineHeight: 1,
                    color: 'rgba(250,246,240,0.6)',
                    letterSpacing: '0.08em',
                  }}
                  initial={{ opacity: 0, y: -20, filter: 'blur(6px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  transition={{
                    delay: 0.3 + i * 0.14,
                    duration: 0.7,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  whileHover={{
                    color: '#C9A96E',
                    letterSpacing: '0.15em',
                    transition: { duration: 0.2 },
                  }}
                >
                  {char}
                </motion.span>
              ))}
            </div>

            {/* 第二行：醒狮（大） */}
            <div className="flex items-end gap-1">
              <motion.span
                className="cursor-default select-none block"
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: 'clamp(5.5rem, 15vw, 10rem)',
                  lineHeight: 0.88,
                  color: '#C41E24',
                  textShadow:
                    '0 0 80px rgba(196,30,36,0.5), 0 0 30px rgba(196,30,36,0.3), 4px 6px 0 rgba(100,10,10,0.4)',
                  letterSpacing: '-0.01em',
                }}
                initial={{ opacity: 0, y: 50, filter: 'blur(16px)', scale: 0.85 }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)', scale: 1 }}
                transition={{ delay: 0.65, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{
                  textShadow:
                    '0 0 100px rgba(196,30,36,0.8), 0 0 40px rgba(196,30,36,0.5), 4px 6px 0 rgba(100,10,10,0.4)',
                  scale: 1.04,
                  transition: { duration: 0.25 },
                }}
              >
                醒
              </motion.span>
              <motion.span
                className="cursor-default select-none block"
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: 'clamp(5.5rem, 15vw, 10rem)',
                  lineHeight: 0.88,
                  color: '#FAF6F0',
                  textShadow: '4px 6px 0 rgba(61,43,31,0.6), 0 0 40px rgba(250,246,240,0.08)',
                  letterSpacing: '-0.01em',
                }}
                initial={{ opacity: 0, y: 50, filter: 'blur(16px)', scale: 0.85 }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)', scale: 1 }}
                transition={{ delay: 0.82, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{
                  color: '#C9A96E',
                  scale: 1.04,
                  transition: { duration: 0.25 },
                }}
              >
                狮
              </motion.span>
            </div>
          </div>

          {/* 金线装饰分隔 */}
          <motion.div
            className="flex items-center gap-3 mb-7"
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            style={{ transformOrigin: 'left' }}
            transition={{ delay: 1.3, duration: 0.8 }}
          >
            <div className="h-[2px] w-12" style={{ background: '#C41E24' }} />
            <div className="h-[2px] w-5" style={{ background: 'rgba(201,169,110,0.5)' }} />
            <div className="w-2 h-2 rotate-45 flex-shrink-0" style={{ border: '1px solid #C9A96E' }} />
            <div
              className="h-px flex-1"
              style={{ background: 'linear-gradient(90deg, rgba(201,169,110,0.5), transparent)' }}
            />
          </motion.div>

          {/* 英文副标题 */}
          <motion.p
            className="text-[11px] tracking-[0.4em] mb-3"
            style={{ fontFamily: 'var(--font-sans)', color: 'rgba(201,169,110,0.55)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.45, duration: 0.6 }}
          >
            LINGNAN LION DANCE · INTANGIBLE CULTURAL HERITAGE
          </motion.p>

          {/* 中文描述 */}
          <motion.p
            className="text-sm mb-12"
            style={{
              fontFamily: 'var(--font-sans)',
              color: 'rgba(250,246,240,0.45)',
              lineHeight: '2.1',
              maxWidth: '32em',
            }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.55, duration: 0.7 }}
          >
            源于唐代，盛于岭南。集武术、舞蹈、音乐于一体，<br />
            每逢节庆，锣鼓喧天，狮舞翩跹，传承千年不衰。
          </motion.p>

          {/* 按钮组 */}
          <motion.div
            className="flex items-center gap-5 flex-wrap"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.72, duration: 0.6 }}
          >
            <motion.a
              href="#culture"
              className="relative px-9 py-3.5 text-sm tracking-[0.2em] overflow-hidden"
              style={{
                fontFamily: 'var(--font-serif)',
                background: '#C41E24',
                color: '#FAF6F0',
              }}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: 'spring', stiffness: 350, damping: 22 }}
            >
              {/* 按钮扫光hover效果 */}
              <motion.div
                className="absolute inset-0"
                style={{ background: 'linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.12) 50%, transparent 60%)' }}
                initial={{ x: '-100%' }}
                whileHover={{ x: '200%' }}
                transition={{ duration: 0.5, ease: 'easeInOut' }}
              />
              <span className="relative z-10">探寻文脉</span>
            </motion.a>

            <motion.a
              href="#film"
              className="group flex items-center gap-2.5 px-7 py-3.5 text-sm tracking-[0.2em]"
              style={{
                fontFamily: 'var(--font-serif)',
                color: '#C9A96E',
                border: '1px solid rgba(201,169,110,0.45)',
              }}
              whileHover={{
                borderColor: '#C9A96E',
                color: '#FAF6F0',
                backgroundColor: 'rgba(201,169,110,0.08)',
                scale: 1.03,
              }}
              transition={{ type: 'spring', stiffness: 350, damping: 22 }}
            >
              <motion.div
                className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
                style={{ border: '1px solid currentColor' }}
                whileHover={{ scale: 1.2 }}
              >
                <svg width="8" height="8" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </motion.div>
              观看短片
            </motion.a>
          </motion.div>
        </div>
      </motion.div>

      {/* ════════════════════════════════
          底部：轮播点 + 滚动提示
      ════════════════════════════════ */}
      <motion.div
        className="relative z-10 flex flex-col items-center gap-4 pb-10"
        style={{ opacity: contentOpacity }}
      >
        <div className="flex items-center gap-3">
          {[0, 1, 2].map((dot) => (
            <motion.button
              key={dot}
              onClick={() => setActiveDot(dot)}
              aria-label={`轮播点 ${dot + 1}`}
              className="rounded-full overflow-hidden"
              style={{
                height: 5,
                background: activeDot === dot ? '#C41E24' : 'rgba(201,169,110,0.3)',
              }}
              animate={{ width: activeDot === dot ? 30 : 5 }}
              transition={{ type: 'spring', stiffness: 500, damping: 30 }}
            />
          ))}
        </div>

        <motion.div
          className="flex flex-col items-center gap-1.5"
          animate={{ y: [0, 7, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <span
            className="text-[10px] tracking-[0.4em]"
            style={{ fontFamily: 'var(--font-sans)', color: 'rgba(201,169,110,0.4)' }}
          >
            SCROLL
          </span>
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="rgba(201,169,110,0.4)"
            strokeWidth="1.5"
            aria-hidden="true"
          >
            <path d="M12 5v14M5 12l7 7 7-7" />
          </svg>
        </motion.div>
      </motion.div>
    </section>
  )
}
