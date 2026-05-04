'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue,
  AnimatePresence,
} from 'framer-motion'

const PARTICLES = Array.from({ length: 18 }, (_, i) => ({
  id: i,
  x: (i * 37 + 13) % 100,
  y: (i * 53 + 7) % 100,
  size: 1 + (i % 3) * 0.6,
  dur: 3 + (i % 4) * 1.2,
  delay: (i * 0.3) % 2,
}))

// ─── 互动狮头组件 ────────────────────────────────────────────────────────────

function InteractiveLion({
  mouseX,
  mouseY,
}: {
  mouseX: ReturnType<typeof useMotionValue<number>>
  mouseY: ReturnType<typeof useMotionValue<number>>
}) {
  const [isBlinking, setIsBlinking] = useState(false)
  const [isClicked, setIsClicked] = useState(false)
  const [easterEgg, setEasterEgg] = useState('')
  const blinkTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const autoBlinkTimer = useRef<ReturnType<typeof setInterval> | null>(null)

  // 狮头跟随鼠标偏转
  const rotateY = useTransform(mouseX, [-1, 1], [-14, 14])
  const rotateX = useTransform(mouseY, [-1, 1], [8, -8])
  const smoothRotY = useSpring(rotateY, { stiffness: 80, damping: 18 })
  const smoothRotX = useSpring(rotateX, { stiffness: 80, damping: 18 })

  // 眼珠跟随
  const eyeX = useTransform(mouseX, [-1, 1], [-4, 4])
  const eyeY = useTransform(mouseY, [-1, 1], [-3, 3])
  const smoothEyeX = useSpring(eyeX, { stiffness: 120, damping: 20 })
  const smoothEyeY = useSpring(eyeY, { stiffness: 120, damping: 20 })

  // 自动随机眨眼
  useEffect(() => {
    autoBlinkTimer.current = setInterval(() => {
      triggerBlink()
    }, 3500 + Math.random() * 2000)
    return () => {
      if (autoBlinkTimer.current) clearInterval(autoBlinkTimer.current)
    }
  }, [])

  const triggerBlink = useCallback(() => {
    if (isBlinking) return
    setIsBlinking(true)
    blinkTimer.current = setTimeout(() => setIsBlinking(false), 280)
  }, [isBlinking])

  // Web Audio API 合成锣鼓音效
  const playDrum = useCallback(() => {
    try {
      const ctx = new AudioContext()

      // 低频鼓点
      const osc1 = ctx.createOscillator()
      const gain1 = ctx.createGain()
      osc1.connect(gain1)
      gain1.connect(ctx.destination)
      osc1.frequency.setValueAtTime(120, ctx.currentTime)
      osc1.frequency.exponentialRampToValueAtTime(40, ctx.currentTime + 0.18)
      gain1.gain.setValueAtTime(0.7, ctx.currentTime)
      gain1.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.22)
      osc1.start(ctx.currentTime)
      osc1.stop(ctx.currentTime + 0.22)

      // 高频锣声
      const osc2 = ctx.createOscillator()
      const gain2 = ctx.createGain()
      osc2.type = 'sawtooth'
      osc2.connect(gain2)
      gain2.connect(ctx.destination)
      osc2.frequency.setValueAtTime(680, ctx.currentTime)
      osc2.frequency.exponentialRampToValueAtTime(420, ctx.currentTime + 0.3)
      gain2.gain.setValueAtTime(0.35, ctx.currentTime)
      gain2.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.35)
      osc2.start(ctx.currentTime)
      osc2.stop(ctx.currentTime + 0.35)

      // 噪音钹声
      const bufferSize = ctx.sampleRate * 0.15
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate)
      const data = buffer.getChannelData(0)
      for (let i = 0; i < bufferSize; i++) data[i] = Math.random() * 2 - 1
      const noise = ctx.createBufferSource()
      const noiseGain = ctx.createGain()
      const filter = ctx.createBiquadFilter()
      filter.type = 'bandpass'
      filter.frequency.value = 3200
      noise.buffer = buffer
      noise.connect(filter)
      filter.connect(noiseGain)
      noiseGain.connect(ctx.destination)
      noiseGain.gain.setValueAtTime(0.25, ctx.currentTime)
      noiseGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.15)
      noise.start(ctx.currentTime)

      setTimeout(() => ctx.close(), 500)
    } catch {
      // 部分浏览器不支持，静默失败
    }
  }, [])

  const eggs = [
    '威！威！威！',
    '醒咗未呀？',
    '锣鼓喧天，狮舞翩跹',
    '采青纳福，步步高升',
    '不动如山，动如雷霆',
  ]

  const handleClick = useCallback(() => {
    playDrum()
    setIsClicked(true)
    setEasterEgg(eggs[Math.floor(Math.random() * eggs.length)])
    setTimeout(() => setIsClicked(false), 600)
    setTimeout(() => setEasterEgg(''), 2200)
  }, [playDrum])

  const handleHover = useCallback(() => {
    triggerBlink()
  }, [triggerBlink])

  return (
    <div className="relative flex flex-col items-center justify-center select-none">
      {/* 彩蛋文案 */}
      <AnimatePresence>
        {easterEgg && (
          <motion.div
            className="absolute -top-16 left-1/2 -translate-x-1/2 px-5 py-2.5 whitespace-nowrap z-20 pointer-events-none"
            style={{
              background: 'rgba(196,30,36,0.92)',
              border: '1px solid rgba(201,169,110,0.6)',
              boxShadow: '0 4px 24px rgba(196,30,36,0.4)',
            }}
            initial={{ opacity: 0, y: 10, scale: 0.85 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.9 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          >
            <span
              className="text-sm font-bold tracking-widest"
              style={{ fontFamily: 'var(--font-serif)', color: '#FAF6F0' }}
            >
              {easterEgg}
            </span>
            {/* 对话气泡尖角 */}
            <div
              className="absolute left-1/2 -translate-x-1/2 -bottom-2 w-3 h-2"
              style={{
                clipPath: 'polygon(0 0, 100% 0, 50% 100%)',
                background: 'rgba(196,30,36,0.92)',
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* 狮头外发光圈 */}
      <motion.div
        className="absolute rounded-full"
        style={{
          width: 280,
          height: 280,
          background: 'radial-gradient(circle, rgba(196,30,36,0.12) 0%, transparent 70%)',
        }}
        animate={{ scale: [1, 1.12, 1], opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* 外圈旋转光环 */}
      <motion.div
        className="absolute rounded-full"
        style={{
          width: 270,
          height: 270,
          border: '1px dashed rgba(201,169,110,0.25)',
        }}
        animate={{ rotate: [0, 360] }}
        transition={{ duration: 22, repeat: Infinity, ease: 'linear' }}
      />
      <motion.div
        className="absolute rounded-full"
        style={{
          width: 240,
          height: 240,
          border: '1px solid rgba(196,30,36,0.18)',
        }}
        animate={{ rotate: [0, -360] }}
        transition={{ duration: 16, repeat: Infinity, ease: 'linear' }}
      />

      {/* 主狮头 — 真实图片 + 3D 透视跟随 */}
      <motion.div
        className="relative"
        style={{
          rotateY: smoothRotY,
          rotateX: smoothRotX,
          transformPerspective: 900,
          transformStyle: 'preserve-3d',
          cursor: 'pointer',
          width: 260,
          height: 300,
        }}
        animate={isClicked ? { scale: [1, 1.1, 0.95, 1.05, 1] } : {}}
        transition={{ duration: 0.45, ease: 'easeInOut' }}
        onClick={handleClick}
        onHoverStart={handleHover}
        whileHover={{ scale: 1.05 }}
        aria-label="互动醒狮，点击听锣鼓"
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === 'Enter' && handleClick()}
      >
        {/* 底部光晕 */}
        <motion.div
          className="absolute -inset-6 rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(196,30,36,0.18) 0%, transparent 70%)',
          }}
          animate={{ scale: [1, 1.1, 1], opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* 狮头图片 */}
        <motion.img
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_20260429064429_5263_485-4UGGvKM4vixZDdxhyyR0bq7xMdjAd2.png"
          alt="岭南醒狮插画——黑色张飞狮，额顶蓝黄花朵，三只漩涡大眼，大红嘴"
          className="w-full h-full object-contain relative z-10"
          animate={isClicked ? {
            filter: ['brightness(1)', 'brightness(1.5)', 'brightness(1)'],
          } : { filter: 'brightness(1)' }}
          transition={{ duration: 0.3 }}
          draggable={false}
        />

        {/* 左眼帘遮罩 — 眨眼动画，精确定位在图片左眼区域 */}
        <motion.div
          className="absolute z-20 rounded-full"
          style={{
            left: '22%',
            top: '40%',
            width: '26%',
            height: '18%',
            background: '#1A0A04',
            transformOrigin: 'top center',
          }}
          animate={{ scaleY: isBlinking ? [0, 1, 1, 0] : 0 }}
          transition={{ duration: 0.28, ease: 'easeInOut', times: [0, 0.35, 0.65, 1] }}
        />
        {/* 右眼帘遮罩 */}
        <motion.div
          className="absolute z-20 rounded-full"
          style={{
            right: '18%',
            top: '40%',
            width: '26%',
            height: '18%',
            background: '#1A0A04',
            transformOrigin: 'top center',
          }}
          animate={{ scaleY: isBlinking ? [0, 1, 1, 0] : 0 }}
          transition={{ duration: 0.28, ease: 'easeInOut', times: [0, 0.35, 0.65, 1] }}
        />

        {/* 眼珠高光跟随 — 左眼 */}
        <motion.div
          className="absolute z-20 rounded-full pointer-events-none"
          style={{
            left: '28%',
            top: '44%',
            width: '8%',
            height: '6%',
            background: 'rgba(255,255,255,0.55)',
            x: smoothEyeX,
            y: smoothEyeY,
            filter: 'blur(1px)',
          }}
        />
        {/* 眼珠高光跟随 — 右眼 */}
        <motion.div
          className="absolute z-20 rounded-full pointer-events-none"
          style={{
            right: '24%',
            top: '44%',
            width: '8%',
            height: '6%',
            background: 'rgba(255,255,255,0.55)',
            x: smoothEyeX,
            y: smoothEyeY,
            filter: 'blur(1px)',
          }}
        />

        {/* 点击红色闪光 */}
        <AnimatePresence>
          {isClicked && (
            <motion.div
              className="absolute inset-0 z-30 rounded-full pointer-events-none"
              style={{ background: 'rgba(196,30,36,0.22)' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0] }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35 }}
            />
          )}
        </AnimatePresence>
      </motion.div>

      {/* 提示文案 */}
      <motion.div
        className="mt-5 flex flex-col items-center gap-2"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.2, duration: 0.6 }}
      >
        <motion.p
          className="text-xs tracking-[0.25em] text-center"
          style={{ fontFamily: 'var(--font-sans)', color: 'rgba(201,169,110,0.65)' }}
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
        >
          戳我一下，带你醒醒神
        </motion.p>
        <motion.div
          className="flex gap-1.5"
          animate={{ y: [0, 3, 0] }}
          transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
        >
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="w-1 h-1 rounded-full"
              style={{
                background: '#C9A96E',
                opacity: 0.3 + i * 0.2,
              }}
            />
          ))}
        </motion.div>
      </motion.div>
    </div>
  )
}

// ─── Hero 主组件 ─────────────────────────────────────────────────────────────

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const [activeDot, setActiveDot] = useState(0)

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const smoothX = useSpring(mouseX, { stiffness: 60, damping: 20 })
  const smoothY = useSpring(mouseY, { stiffness: 60, damping: 20 })

  const bgShiftX1 = useTransform(smoothX, [-1, 1], [-18, 18])
  const bgShiftY1 = useTransform(smoothY, [-1, 1], [-10, 10])
  const circleShiftX = useTransform(smoothX, [-1, 1], [-8, 8])
  const circleShiftY = useTransform(smoothY, [-1, 1], [-5, 5])

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end start'] })
  const contentOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const contentY = useTransform(scrollYProgress, [0, 0.5], [0, -60])
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.12])

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
      {/* ── 背景图层 ── */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        {/* 红底白狮背景 */}
        <motion.div
          className="absolute inset-0"
          style={{ y: bgShiftY1, x: bgShiftX1, scale: bgScale }}
          initial={{ opacity: 0, scale: 1.08 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 2.2, ease: [0.22, 1, 0.36, 1] }}
        >
          <img
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Image%2036.png-WCgGpqnHpUQwqciR70ZakMRqfiyS7M.jpeg"
            alt=""
            className="w-full h-full object-cover"
            style={{ objectPosition: 'center 30%', opacity: 0.45 }}
          />
          <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 75% 70% at 55% 48%, transparent 30%, #0E080670 65%, #0E0806 100%)' }} />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(100deg, #0E0806 0%, #0E080688 28%, transparent 60%)' }} />
        </motion.div>

        {/* 呼吸红光 */}
        <motion.div
          className="absolute inset-0"
          animate={{
            background: [
              'radial-gradient(ellipse 55% 55% at 56% 50%, rgba(196,30,36,0.08) 0%, transparent 70%)',
              'radial-gradient(ellipse 65% 65% at 56% 50%, rgba(196,30,36,0.16) 0%, transparent 70%)',
              'radial-gradient(ellipse 55% 55% at 56% 50%, rgba(196,30,36,0.08) 0%, transparent 70%)',
            ],
          }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* 宣纸噪点 */}
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`, backgroundSize: '200px 200px' }} />

        {/* 水印"醒" */}
        <motion.div
          className="absolute select-none"
          style={{
            fontSize: 'clamp(300px, 50vw, 600px)',
            color: 'transparent',
            WebkitTextStroke: '1px rgba(201,169,110,0.05)',
            top: '50%', left: '50%',
            transform: 'translate(-50%, -50%)',
            lineHeight: 1,
            fontFamily: 'var(--font-serif)',
            x: circleShiftX, y: circleShiftY,
          }}
          initial={{ opacity: 0, scale: 1.2 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6, duration: 2 }}
          aria-hidden="true"
        >
          醒
        </motion.div>

        {/* 同心旋转圆 */}
        <motion.div className="absolute" style={{ right: '8%', top: '50%', x: circleShiftX, y: circleShiftY }}>
          {[440, 380, 310, 240, 170].map((size, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full"
              style={{
                width: size, height: size,
                top: '50%', left: '50%', x: '-50%', y: '-50%',
                border: `${i === 0 ? 1 : 0.5}px ${i % 2 === 0 ? 'solid' : 'dashed'} ${['rgba(201,169,110,0.28)', 'rgba(196,30,36,0.22)', 'rgba(201,169,110,0.14)', 'rgba(44,95,124,0.18)', 'rgba(201,169,110,0.08)'][i]}`,
              }}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1, rotate: i % 2 === 0 ? [0, 360] : [0, -360] }}
              transition={{
                opacity: { delay: 1.0 + i * 0.12, duration: 1.0 },
                scale: { delay: 1.0 + i * 0.12, duration: 1.0, ease: [0.22, 1, 0.36, 1] },
                rotate: { delay: 1.0 + i * 0.12, duration: 20 + i * 8, repeat: Infinity, ease: 'linear' },
              }}
            />
          ))}
        </motion.div>

        {/* 浮动粒子 */}
        {PARTICLES.map((p) => (
          <motion.div
            key={p.id}
            className="absolute rounded-full"
            style={{
              left: `${p.x}%`, top: `${p.y}%`,
              width: p.size, height: p.size,
              background: p.id % 3 === 0 ? '#C9A96E' : p.id % 3 === 1 ? '#C41E24' : '#FAF6F0',
            }}
            animate={{
              y: [0, -(18 + (p.id % 5) * 10), 0],
              x: [0, (p.id % 2 === 0 ? 1 : -1) * (6 + (p.id % 4) * 4), 0],
              opacity: [0.15, 0.7, 0.15],
              scale: [1, 1.4, 1],
            }}
            transition={{ duration: p.dur, delay: p.delay, repeat: Infinity, ease: 'easeInOut' }}
          />
        ))}

        {/* 古典角标 */}
        {[
          { cls: 'top-24 left-6', d1: 'M4 4 L36 4 M4 4 L4 36', d2: 'M10 10 L28 10 M10 10 L10 28' },
          { cls: 'top-24 right-6', d1: 'M76 4 L44 4 M76 4 L76 36', d2: 'M70 10 L52 10 M70 10 L70 28' },
          { cls: 'bottom-24 left-6', d1: 'M4 76 L36 76 M4 76 L4 44', d2: 'M10 70 L28 70 M10 70 L10 52' },
          { cls: 'bottom-24 right-6', d1: 'M76 76 L44 76 M76 76 L76 44', d2: 'M70 70 L52 70 M70 70 L70 52' },
        ].map((corner, i) => (
          <motion.div key={i} className={`absolute w-20 h-20 ${corner.cls}`} initial={{ opacity: 0 }} animate={{ opacity: 0.55 }} transition={{ delay: 1.8 + i * 0.1 }} aria-hidden="true">
            <svg viewBox="0 0 80 80" fill="none">
              <path d={corner.d1} stroke="#C9A96E" strokeWidth="1.5" />
              <path d={corner.d2} stroke="#C41E24" strokeWidth="0.8" />
            </svg>
          </motion.div>
        ))}

        {/* 扫光线 */}
        <motion.div
          className="absolute left-0 right-0"
          style={{ height: '1px', top: '50%', background: 'linear-gradient(90deg, transparent 0%, rgba(201,169,110,0.08) 25%, rgba(196,30,36,0.3) 50%, rgba(201,169,110,0.08) 75%, transparent 100%)' }}
          animate={{ opacity: [0, 0.8, 0.3, 0.8, 0.3] }}
          transition={{ delay: 1.4, duration: 1.2, repeat: Infinity, repeatDelay: 3 }}
        />
        <motion.div
          className="absolute top-0 bottom-0"
          style={{ width: '1px', left: '38%', background: 'linear-gradient(180deg, transparent 0%, rgba(201,169,110,0.06) 30%, rgba(196,30,36,0.18) 50%, rgba(201,169,110,0.06) 70%, transparent 100%)' }}
          animate={{ opacity: [0, 0.6, 0], scaleY: [0.3, 1, 0.3] }}
          transition={{ delay: 2, duration: 3.5, repeat: Infinity, repeatDelay: 4, ease: 'easeInOut' }}
        />
      </div>

      {/* ── 主内容层 ── */}
      <motion.div
        className="flex-1 flex items-center max-w-7xl mx-auto w-full px-8 md:px-16 pt-28 pb-16 relative z-10"
        style={{ opacity: contentOpacity, y: contentY }}
      >
        {/* 左侧文字区 */}
        <div className="flex flex-col max-w-xl flex-1">
          {/* 非遗徽章 */}
          <motion.div
            className="flex items-center gap-3 mb-10"
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex items-center gap-2 px-4 py-1.5" style={{ border: '1px solid rgba(201,169,110,0.45)', background: 'rgba(201,169,110,0.07)' }}>
              <div className="w-1.5 h-1.5 rounded-full" style={{ background: '#C41E24' }} />
              <span className="text-xs tracking-[0.35em]" style={{ fontFamily: 'var(--font-sans)', color: '#C9A96E' }}>国家级非物质文化遗产</span>
            </div>
            <div className="h-px w-12" style={{ background: 'linear-gradient(90deg, rgba(201,169,110,0.5), transparent)' }} />
            <span className="text-[10px] tracking-[0.3em] hidden md:block" style={{ fontFamily: 'var(--font-sans)', color: 'rgba(201,169,110,0.4)' }}>EST. 2006</span>
          </motion.div>

          {/* 书法大字 */}
          <div className="mb-6" aria-label="岭南醒狮">
            <div className="flex items-baseline gap-3 mb-[-8px]">
              {['岭', '南'].map((char, i) => (
                <motion.span
                  key={char}
                  className="cursor-default select-none block"
                  style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(2.4rem, 5.5vw, 3.8rem)', lineHeight: 1, color: 'rgba(250,246,240,0.6)', letterSpacing: '0.08em' }}
                  initial={{ opacity: 0, y: -20, filter: 'blur(6px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  transition={{ delay: 0.3 + i * 0.14, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                  whileHover={{ color: '#C9A96E', letterSpacing: '0.15em', transition: { duration: 0.2 } }}
                >
                  {char}
                </motion.span>
              ))}
            </div>
            <div className="flex items-end gap-1">
              <motion.span
                className="cursor-default select-none block"
                style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(5.5rem, 15vw, 10rem)', lineHeight: 0.88, color: '#C41E24', textShadow: '0 0 80px rgba(196,30,36,0.5), 0 0 30px rgba(196,30,36,0.3), 4px 6px 0 rgba(100,10,10,0.4)', letterSpacing: '-0.01em' }}
                initial={{ opacity: 0, y: 50, filter: 'blur(16px)', scale: 0.85 }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)', scale: 1 }}
                transition={{ delay: 0.65, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ textShadow: '0 0 100px rgba(196,30,36,0.8), 0 0 40px rgba(196,30,36,0.5), 4px 6px 0 rgba(100,10,10,0.4)', scale: 1.04, transition: { duration: 0.25 } }}
              >醒</motion.span>
              <motion.span
                className="cursor-default select-none block"
                style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(5.5rem, 15vw, 10rem)', lineHeight: 0.88, color: '#FAF6F0', textShadow: '4px 6px 0 rgba(61,43,31,0.6), 0 0 40px rgba(250,246,240,0.08)', letterSpacing: '-0.01em' }}
                initial={{ opacity: 0, y: 50, filter: 'blur(16px)', scale: 0.85 }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)', scale: 1 }}
                transition={{ delay: 0.82, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ color: '#C9A96E', scale: 1.04, transition: { duration: 0.25 } }}
              >狮</motion.span>
            </div>
          </div>

          {/* 金线分隔 */}
          <motion.div className="flex items-center gap-3 mb-7" initial={{ opacity: 0, scaleX: 0 }} animate={{ opacity: 1, scaleX: 1 }} style={{ transformOrigin: 'left' }} transition={{ delay: 1.3, duration: 0.8 }}>
            <div className="h-[2px] w-12" style={{ background: '#C41E24' }} />
            <div className="h-[2px] w-5" style={{ background: 'rgba(201,169,110,0.5)' }} />
            <div className="w-2 h-2 rotate-45 flex-shrink-0" style={{ border: '1px solid #C9A96E' }} />
            <div className="h-px flex-1" style={{ background: 'linear-gradient(90deg, rgba(201,169,110,0.5), transparent)' }} />
          </motion.div>

          {/* 英文副标题 */}
          <motion.p className="text-[11px] tracking-[0.4em] mb-3" style={{ fontFamily: 'var(--font-sans)', color: 'rgba(201,169,110,0.55)' }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.45, duration: 0.6 }}>
            LINGNAN LION DANCE · INTANGIBLE CULTURAL HERITAGE
          </motion.p>

          {/* 中文描述 */}
          <motion.p className="text-sm mb-12" style={{ fontFamily: 'var(--font-sans)', color: 'rgba(250,246,240,0.45)', lineHeight: '2.1', maxWidth: '32em' }} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.55, duration: 0.7 }}>
            源于唐代，盛于岭南。集武术、舞蹈、音乐于一体，<br />
            每逢节庆，锣鼓喧天，狮舞翩跹，传承千年不衰。
          </motion.p>

          {/* 按钮组 */}
          <motion.div className="flex items-center gap-5 flex-wrap" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.72, duration: 0.6 }}>
            <motion.a
              href="#culture"
              className="relative px-9 py-3.5 text-sm tracking-[0.2em] overflow-hidden"
              style={{ fontFamily: 'var(--font-serif)', background: '#C41E24', color: '#FAF6F0' }}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: 'spring', stiffness: 350, damping: 22 }}
            >
              <motion.div className="absolute inset-0" style={{ background: 'linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.12) 50%, transparent 60%)' }} initial={{ x: '-100%' }} whileHover={{ x: '200%' }} transition={{ duration: 0.5 }} />
              <span className="relative z-10">探寻文脉</span>
            </motion.a>
            <motion.a
              href="#film"
              className="group flex items-center gap-2.5 px-7 py-3.5 text-sm tracking-[0.2em]"
              style={{ fontFamily: 'var(--font-serif)', color: '#C9A96E', border: '1px solid rgba(201,169,110,0.45)' }}
              whileHover={{ borderColor: '#C9A96E', color: '#FAF6F0', backgroundColor: 'rgba(201,169,110,0.08)', scale: 1.03 }}
              transition={{ type: 'spring', stiffness: 350, damping: 22 }}
            >
              <motion.div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0" style={{ border: '1px solid currentColor' }} whileHover={{ scale: 1.2 }}>
                <svg width="8" height="8" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M8 5v14l11-7z" /></svg>
              </motion.div>
              观看短片
            </motion.a>
          </motion.div>
        </div>

        {/* 右侧互动狮头 */}
        <motion.div
          className="hidden lg:flex items-center justify-center flex-shrink-0"
          style={{ width: 320 }}
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.0, duration: 1.0, ease: [0.22, 1, 0.36, 1] }}
        >
          <InteractiveLion mouseX={smoothX} mouseY={smoothY} />
        </motion.div>
      </motion.div>

      {/* ── 底部轮播点 + 滚动提示 ── */}
      <motion.div className="relative z-10 flex flex-col items-center gap-4 pb-10" style={{ opacity: contentOpacity }}>
        <div className="flex items-center gap-3">
          {[0, 1, 2].map((dot) => (
            <motion.button
              key={dot}
              onClick={() => setActiveDot(dot)}
              aria-label={`轮播点 ${dot + 1}`}
              className="rounded-full overflow-hidden"
              style={{ height: 5, background: activeDot === dot ? '#C41E24' : 'rgba(201,169,110,0.3)' }}
              animate={{ width: activeDot === dot ? 30 : 5 }}
              transition={{ type: 'spring', stiffness: 500, damping: 30 }}
            />
          ))}
        </div>
        <motion.div className="flex flex-col items-center gap-1.5" animate={{ y: [0, 7, 0] }} transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}>
          <span className="text-[10px] tracking-[0.4em]" style={{ fontFamily: 'var(--font-sans)', color: 'rgba(201,169,110,0.4)' }}>SCROLL</span>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="rgba(201,169,110,0.4)" strokeWidth="1.5" aria-hidden="true">
            <path d="M12 5v14M5 12l7 7 7-7" />
          </svg>
        </motion.div>
      </motion.div>
    </section>
  )
}
