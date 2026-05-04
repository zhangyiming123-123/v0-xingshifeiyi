'use client'

import { useEffect, useRef, useState } from 'react'
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue,
} from 'framer-motion'

// ─── Canvas 粒子狮头 ─────────────────────────────────────────────────────────

function LionParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouseRef = useRef({ x: -9999, y: -9999 })
  const animFrameRef = useRef<number>(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // 狮头轮廓关键点集合（归一化 0-1，相对 canvas 宽高）
    // 用极坐标近似一只醒狮头的轮廓 + 眼眶 + 嘴巴 + 毛发
    function buildLionPoints(W: number, H: number) {
      const pts: { ox: number; oy: number; x: number; y: number; vx: number; vy: number; size: number; color: string; opacity: number; baseOpacity: number }[] = []

      const cx = W * 0.5
      const cy = H * 0.5
      const r = Math.min(W, H) * 0.36

      const colors = ['#C9A96E', '#C41E24', '#FAF6F0', '#2C5F7C']

      function addRing(ox: number, oy: number, radius: number, count: number, scatter: number) {
        for (let i = 0; i < count; i++) {
          const angle = (i / count) * Math.PI * 2 + Math.random() * 0.18
          const jitter = (Math.random() - 0.5) * scatter
          const px = ox + Math.cos(angle) * (radius + jitter)
          const py = oy + Math.sin(angle) * (radius + jitter)
          const base = 0.12 + Math.random() * 0.32
          pts.push({
            ox: px, oy: py, x: px, y: py,
            vx: 0, vy: 0,
            size: 0.6 + Math.random() * 1.4,
            color: colors[Math.floor(Math.random() * colors.length)],
            opacity: base,
            baseOpacity: base,
          })
        }
      }

      function addArc(ox: number, oy: number, radius: number, startAngle: number, endAngle: number, count: number, scatter: number) {
        for (let i = 0; i < count; i++) {
          const angle = startAngle + (i / count) * (endAngle - startAngle)
          const jitter = (Math.random() - 0.5) * scatter
          const px = ox + Math.cos(angle) * (radius + jitter)
          const py = oy + Math.sin(angle) * (radius + jitter)
          const base = 0.1 + Math.random() * 0.3
          pts.push({
            ox: px, oy: py, x: px, y: py,
            vx: 0, vy: 0,
            size: 0.5 + Math.random() * 1.2,
            color: colors[Math.floor(Math.random() * colors.length)],
            opacity: base,
            baseOpacity: base,
          })
        }
      }

      // 外圈毛发轮廓
      addRing(cx, cy + r * 0.1, r, 90, r * 0.18)
      // 头顶花冠
      addArc(cx, cy - r * 0.62, r * 0.32, Math.PI * 0.9, Math.PI * 2.1, 28, r * 0.1)
      // 左耳
      addArc(cx - r * 0.78, cy - r * 0.35, r * 0.2, -Math.PI * 0.6, Math.PI * 0.3, 18, r * 0.06)
      // 右耳
      addArc(cx + r * 0.78, cy - r * 0.35, r * 0.2, Math.PI * 0.7, Math.PI * 1.6, 18, r * 0.06)
      // 额头镜圆
      addRing(cx, cy - r * 0.35, r * 0.1, 18, r * 0.04)
      // 左眼眶外圈
      addRing(cx - r * 0.42, cy - r * 0.05, r * 0.22, 32, r * 0.05)
      // 左眼眶内圈
      addRing(cx - r * 0.42, cy - r * 0.05, r * 0.12, 18, r * 0.03)
      // 右眼眶外圈
      addRing(cx + r * 0.42, cy - r * 0.05, r * 0.22, 32, r * 0.05)
      // 右眼眶内圈
      addRing(cx + r * 0.42, cy - r * 0.05, r * 0.12, 18, r * 0.03)
      // 鼻子
      addRing(cx, cy + r * 0.2, r * 0.09, 14, r * 0.03)
      // 嘴巴上弧
      addArc(cx, cy + r * 0.35, r * 0.35, Math.PI * 0.08, Math.PI * 0.92, 36, r * 0.04)
      // 胡须左侧
      for (let i = 0; i < 18; i++) {
        const px = cx - r * 0.12 - (Math.random() * r * 0.55)
        const py = cy + r * 0.15 + (Math.random() - 0.5) * r * 0.22
        const base = 0.08 + Math.random() * 0.18
        pts.push({ ox: px, oy: py, x: px, y: py, vx: 0, vy: 0, size: 0.5 + Math.random() * 0.8, color: '#C9A96E', opacity: base, baseOpacity: base })
      }
      // 胡须右侧
      for (let i = 0; i < 18; i++) {
        const px = cx + r * 0.12 + (Math.random() * r * 0.55)
        const py = cy + r * 0.15 + (Math.random() - 0.5) * r * 0.22
        const base = 0.08 + Math.random() * 0.18
        pts.push({ ox: px, oy: py, x: px, y: py, vx: 0, vy: 0, size: 0.5 + Math.random() * 0.8, color: '#C9A96E', opacity: base, baseOpacity: base })
      }
      // 散落流光
      for (let i = 0; i < 40; i++) {
        const angle = Math.random() * Math.PI * 2
        const dist = r * (0.5 + Math.random() * 0.7)
        const px = cx + Math.cos(angle) * dist
        const py = cy + Math.sin(angle) * dist
        const base = 0.04 + Math.random() * 0.12
        pts.push({ ox: px, oy: py, x: px, y: py, vx: 0, vy: 0, size: 0.4 + Math.random() * 0.8, color: colors[Math.floor(Math.random() * colors.length)], opacity: base, baseOpacity: base })
      }

      return pts
    }

    // 初始化
    const resize = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio
      canvas.height = canvas.offsetHeight * window.devicePixelRatio
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio)
    }
    resize()
    window.addEventListener('resize', resize)

    let pts = buildLionPoints(canvas.offsetWidth, canvas.offsetHeight)

    // 每个粒子带随机相位的呼吸偏移
    const phases = pts.map(() => Math.random() * Math.PI * 2)
    const driftR = pts.map((p) => 2 + Math.random() * 5)
    const driftSpeed = pts.map(() => 0.0004 + Math.random() * 0.0006)
    let t = 0

    const MOUSE_RADIUS = 130
    const ATTRACT_STRENGTH = 0.018

    function draw() {
      t++
      const W = canvas.offsetWidth
      const H = canvas.offsetHeight
      ctx.clearRect(0, 0, W, H)

      const mx = mouseRef.current.x
      const my = mouseRef.current.y

      for (let i = 0; i < pts.length; i++) {
        const p = pts[i]
        const phase = phases[i]
        const dr = driftR[i]
        const ds = driftSpeed[i]

        // 漂移回原点 + 正弦游走
        const driftX = p.ox + Math.cos(t * ds + phase) * dr
        const driftY = p.oy + Math.sin(t * ds * 1.3 + phase) * dr

        // 鼠标吸引力
        const dx = mx - p.x
        const dy = my - p.y
        const dist = Math.sqrt(dx * dx + dy * dy)

        let tx = driftX
        let ty = driftY

        if (dist < MOUSE_RADIUS && mx > 0) {
          const pull = (1 - dist / MOUSE_RADIUS) * ATTRACT_STRENGTH
          tx = driftX + dx * pull * 18
          ty = driftY + dy * pull * 18
          p.opacity = Math.min(p.baseOpacity + (1 - dist / MOUSE_RADIUS) * 0.55, 0.85)
        } else {
          p.opacity += (p.baseOpacity - p.opacity) * 0.04
        }

        // Spring 移动
        p.vx += (tx - p.x) * 0.06
        p.vy += (ty - p.y) * 0.06
        p.vx *= 0.82
        p.vy *= 0.82
        p.x += p.vx
        p.y += p.vy

        // 绘制光点
        ctx.save()
        ctx.globalAlpha = p.opacity
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = p.color
        ctx.fill()

        // 大点加光晕
        if (p.size > 1.5) {
          ctx.globalAlpha = p.opacity * 0.3
          const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 4)
          grad.addColorStop(0, p.color)
          grad.addColorStop(1, 'transparent')
          ctx.beginPath()
          ctx.arc(p.x, p.y, p.size * 4, 0, Math.PI * 2)
          ctx.fillStyle = grad
          ctx.fill()
        }
        ctx.restore()
      }

      animFrameRef.current = requestAnimationFrame(draw)
    }

    draw()

    // 重建粒子当 resize 时
    const handleResize = () => {
      resize()
      pts = buildLionPoints(canvas.offsetWidth, canvas.offsetHeight)
    }
    window.removeEventListener('resize', resize)
    window.addEventListener('resize', handleResize)

    return () => {
      cancelAnimationFrame(animFrameRef.current)
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top }
  }
  const handleMouseLeave = () => {
    mouseRef.current = { x: -9999, y: -9999 }
  }

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-auto"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      aria-hidden="true"
      style={{ zIndex: 2 }}
    />
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
            style={{ objectPosition: 'center 30%', opacity: 0.35 }}
          />
          <div
            className="absolute inset-0"
            style={{ background: 'radial-gradient(ellipse 75% 70% at 55% 48%, transparent 30%, #0E080670 65%, #0E0806 100%)' }}
          />
          <div
            className="absolute inset-0"
            style={{ background: 'linear-gradient(100deg, #0E0806 0%, #0E080688 28%, transparent 60%)' }}
          />
        </motion.div>

        {/* 呼吸红光 */}
        <motion.div
          className="absolute inset-0"
          animate={{
            background: [
              'radial-gradient(ellipse 55% 55% at 56% 50%, rgba(196,30,36,0.07) 0%, transparent 70%)',
              'radial-gradient(ellipse 65% 65% at 56% 50%, rgba(196,30,36,0.14) 0%, transparent 70%)',
              'radial-gradient(ellipse 55% 55% at 56% 50%, rgba(196,30,36,0.07) 0%, transparent 70%)',
            ],
          }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* 宣纸噪点 */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
            backgroundSize: '200px 200px',
          }}
        />

        {/* 水印"醒" */}
        <motion.div
          className="absolute select-none"
          style={{
            fontSize: 'clamp(300px, 50vw, 600px)',
            color: 'transparent',
            WebkitTextStroke: '1px rgba(201,169,110,0.04)',
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

        {/* 同心旋转圆 */}
        <motion.div
          className="absolute"
          style={{ right: '8%', top: '50%', x: circleShiftX, y: circleShiftY }}
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
                  ['rgba(201,169,110,0.22)', 'rgba(196,30,36,0.18)', 'rgba(201,169,110,0.1)', 'rgba(44,95,124,0.14)', 'rgba(201,169,110,0.06)'][i]
                }`,
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

        {/* 古典角标 */}
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
            animate={{ opacity: 0.5 }}
            transition={{ delay: 1.8 + i * 0.1 }}
            aria-hidden="true"
          >
            <svg viewBox="0 0 80 80" fill="none">
              <path d={corner.d1} stroke="#C9A96E" strokeWidth="1.5" />
              <path d={corner.d2} stroke="#C41E24" strokeWidth="0.8" />
            </svg>
          </motion.div>
        ))}

        {/* 扫光线 */}
        <motion.div
          className="absolute left-0 right-0"
          style={{
            height: '1px',
            top: '50%',
            background: 'linear-gradient(90deg, transparent 0%, rgba(201,169,110,0.06) 25%, rgba(196,30,36,0.22) 50%, rgba(201,169,110,0.06) 75%, transparent 100%)',
          }}
          animate={{ opacity: [0, 0.8, 0.3, 0.8, 0.3] }}
          transition={{ delay: 1.4, duration: 1.2, repeat: Infinity, repeatDelay: 4 }}
        />
        <motion.div
          className="absolute top-0 bottom-0"
          style={{
            width: '1px',
            left: '38%',
            background: 'linear-gradient(180deg, transparent 0%, rgba(201,169,110,0.05) 30%, rgba(196,30,36,0.15) 50%, rgba(201,169,110,0.05) 70%, transparent 100%)',
          }}
          animate={{ opacity: [0, 0.5, 0], scaleY: [0.3, 1, 0.3] }}
          transition={{ delay: 2, duration: 3.5, repeat: Infinity, repeatDelay: 4, ease: 'easeInOut' }}
        />
      </div>

      {/* ── Canvas 粒子狮头 — 全屏覆盖，pointer-events 仅在 canvas 上接管鼠标 ── */}
      <div className="absolute inset-0" style={{ zIndex: 2 }}>
        <LionParticleCanvas />
      </div>

      {/* ── 主内容层 ── */}
      <motion.div
        className="flex-1 flex items-center max-w-7xl mx-auto w-full px-5 sm:px-8 md:px-16 pt-24 sm:pt-28 pb-12 relative"
        style={{ opacity: contentOpacity, y: contentY, zIndex: 10 }}
      >
        {/* 左侧文字区 */}
        <div className="flex flex-col w-full max-w-xl">
          {/* 非遗徽章 */}
          <motion.div
            className="flex items-center gap-2 sm:gap-3 mb-7 sm:mb-10"
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <div
              className="flex items-center gap-2 px-4 py-1.5"
              style={{ border: '1px solid rgba(201,169,110,0.45)', background: 'rgba(201,169,110,0.07)' }}
            >
              <div className="w-1.5 h-1.5 rounded-full" style={{ background: '#C41E24' }} />
              <span className="text-xs tracking-[0.35em]" style={{ fontFamily: 'var(--font-sans)', color: '#C9A96E' }}>
                国家级非物质文化遗产
              </span>
            </div>
            <div className="h-px w-12" style={{ background: 'linear-gradient(90deg, rgba(201,169,110,0.5), transparent)' }} />
            <span
              className="text-[10px] tracking-[0.3em] hidden md:block"
              style={{ fontFamily: 'var(--font-sans)', color: 'rgba(201,169,110,0.4)' }}
            >
              EST. 2006
            </span>
          </motion.div>

          {/* 书法大字 */}
          <div className="mb-6" aria-label="岭南醒狮">
            <div className="flex items-baseline gap-3 mb-[-8px]">
              {['岭', '南'].map((char, i) => (
                <motion.span
                  key={char}
                  className="cursor-default select-none block"
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: 'clamp(1.6rem, 5.5vw, 3.8rem)',
                    lineHeight: 1,
                    color: 'rgba(250,246,240,0.6)',
                    letterSpacing: '0.08em',
                  }}
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
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: 'clamp(4rem, 15vw, 10rem)',
                  lineHeight: 0.88,
                  color: '#C41E24',
                  textShadow: '0 0 80px rgba(196,30,36,0.5), 0 0 30px rgba(196,30,36,0.3), 4px 6px 0 rgba(100,10,10,0.4)',
                  letterSpacing: '-0.01em',
                }}
                initial={{ opacity: 0, y: 50, filter: 'blur(16px)', scale: 0.85 }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)', scale: 1 }}
                transition={{ delay: 0.65, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{
                  textShadow: '0 0 100px rgba(196,30,36,0.8), 0 0 40px rgba(196,30,36,0.5), 4px 6px 0 rgba(100,10,10,0.4)',
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
                  fontSize: 'clamp(4rem, 15vw, 10rem)',
                  lineHeight: 0.88,
                  color: '#FAF6F0',
                  textShadow: '4px 6px 0 rgba(61,43,31,0.6), 0 0 40px rgba(250,246,240,0.08)',
                  letterSpacing: '-0.01em',
                }}
                initial={{ opacity: 0, y: 50, filter: 'blur(16px)', scale: 0.85 }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)', scale: 1 }}
                transition={{ delay: 0.82, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ color: '#C9A96E', scale: 1.04, transition: { duration: 0.25 } }}
              >
                狮
              </motion.span>
            </div>
          </div>

          {/* 金线分隔 */}
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
            <div className="h-px flex-1" style={{ background: 'linear-gradient(90deg, rgba(201,169,110,0.5), transparent)' }} />
          </motion.div>

          {/* 英文副标题 */}
          <motion.p
            className="hidden sm:block text-[11px] tracking-[0.4em] mb-3"
            style={{ fontFamily: 'var(--font-sans)', color: 'rgba(201,169,110,0.55)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.45, duration: 0.6 }}
          >
            LINGNAN LION DANCE · INTANGIBLE CULTURAL HERITAGE
          </motion.p>

          {/* 中文描述 */}
          <motion.p
            className="text-sm mb-8 sm:mb-12"
            style={{ fontFamily: 'var(--font-sans)', color: 'rgba(250,246,240,0.45)', lineHeight: '2.1', maxWidth: '32em' }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.55, duration: 0.7 }}
          >
            源于唐代，盛于岭南。集武术、舞蹈、音乐于一体，<br />
            每逢节庆，锣鼓喧天，狮舞翩跹，传承千年不衰。
          </motion.p>

          {/* 按钮组 */}
          <motion.div
            className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-5"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.72, duration: 0.6 }}
          >
            <motion.a
              href="#culture"
              className="relative w-full sm:w-auto text-center px-9 py-3.5 text-sm tracking-[0.2em] overflow-hidden"
              style={{ fontFamily: 'var(--font-serif)', background: '#C41E24', color: '#FAF6F0' }}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: 'spring', stiffness: 350, damping: 22 }}
            >
              <motion.div
                className="absolute inset-0"
                style={{ background: 'linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.12) 50%, transparent 60%)' }}
                initial={{ x: '-100%' }}
                whileHover={{ x: '200%' }}
                transition={{ duration: 0.5 }}
              />
              <span className="relative z-10">探寻文脉</span>
            </motion.a>
            <motion.a
              href="#film"
              className="group w-full sm:w-auto justify-center flex items-center gap-2.5 px-7 py-3.5 text-sm tracking-[0.2em]"
              style={{ fontFamily: 'var(--font-serif)', color: '#C9A96E', border: '1px solid rgba(201,169,110,0.45)' }}
              whileHover={{ borderColor: '#C9A96E', color: '#FAF6F0', backgroundColor: 'rgba(201,169,110,0.08)', scale: 1.03 }}
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

      {/* ── 底部轮播点 + 滚动提示 ── */}
      <motion.div
        className="relative flex flex-col items-center gap-4 pb-10"
        style={{ opacity: contentOpacity, zIndex: 10 }}
      >
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
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="rgba(201,169,110,0.4)" strokeWidth="1.5" aria-hidden="true">
            <path d="M12 5v14M5 12l7 7 7-7" />
          </svg>
        </motion.div>
      </motion.div>
    </section>
  )
}
