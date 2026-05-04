'use client'

import { useRef, type ReactNode } from 'react'
import { motion, useInView, useScroll, useTransform, useSpring } from 'framer-motion'

type Variant = 'slide-up' | 'slide-left' | 'slide-right' | 'scale-up' | 'fade'

interface SectionTransitionProps {
  children: ReactNode
  variant?: Variant
  /** 视差强度 px，默认 40 */
  parallax?: number
  /** inView 触发 margin，默认 "-80px" */
  margin?: string
  className?: string
  id?: string
  /** 区块背景色，用于分隔波浪 */
  waveColor?: string
  /** 上方区块背景色 */
  prevColor?: string
}

const variants: Record<Variant, { initial: object; animate: object }> = {
  'slide-up': {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
  },
  'slide-left': {
    initial: { opacity: 0, x: -60 },
    animate: { opacity: 1, x: 0 },
  },
  'slide-right': {
    initial: { opacity: 0, x: 60 },
    animate: { opacity: 1, x: 0 },
  },
  'scale-up': {
    initial: { opacity: 0, scale: 0.94, y: 30 },
    animate: { opacity: 1, scale: 1, y: 0 },
  },
  'fade': {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
  },
}

export function SectionTransition({
  children,
  variant = 'slide-up',
  parallax = 40,
  margin = '-80px',
  className,
  id,
  waveColor,
  prevColor,
}: SectionTransitionProps) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: margin as Parameters<typeof useInView>[1]['margin'] })

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  const rawY = useTransform(scrollYProgress, [0, 1], [-parallax / 2, parallax / 2])
  const y = useSpring(rawY, { stiffness: 60, damping: 20, mass: 0.8 })

  const { initial, animate: animTarget } = variants[variant]

  return (
    <div id={id} ref={ref} className={`relative overflow-hidden ${className ?? ''}`}>
      {/* 顶部波浪分隔符：仅在提供颜色时渲染 */}
      {prevColor && waveColor && (
        <div className="absolute top-0 left-0 right-0 pointer-events-none z-10" style={{ marginTop: -1 }}>
          <svg
            viewBox="0 0 1440 48"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
            className="w-full"
            style={{ height: 48, display: 'block' }}
            aria-hidden="true"
          >
            <path
              d="M0,0 C180,48 360,0 540,24 C720,48 900,0 1080,24 C1260,48 1380,16 1440,8 L1440,0 Z"
              fill={prevColor}
            />
          </svg>
        </div>
      )}

      {/* 视差+入场动画包裹层 */}
      <motion.div
        style={{ y }}
        initial={initial}
        animate={inView ? animTarget : initial}
        transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </motion.div>
    </div>
  )
}

/**
 * 用于给 section 内的子元素做交错 (stagger) 入场。
 * 直接包裹需要依次出现的列表项。
 */
interface StaggerProps {
  children: ReactNode
  staggerDelay?: number
  margin?: string
  className?: string
}

export function StaggerReveal({
  children,
  staggerDelay = 0.1,
  margin = '-60px',
  className,
}: StaggerProps) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: margin as Parameters<typeof useInView>[1]['margin'] })

  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: staggerDelay } },
      }}
    >
      {children}
    </motion.div>
  )
}

export const staggerItem = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
}

/**
 * 区块之间的斜切/卷轴装饰分隔线
 */
interface DividerProps {
  color?: string
  flip?: boolean
}

export function SectionDivider({ color = '#FAF6F0', flip = false }: DividerProps) {
  return (
    <div
      className="relative w-full overflow-hidden pointer-events-none"
      style={{ height: 56, marginBottom: -1 }}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 1440 56"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        className="absolute inset-0 w-full h-full"
        style={{ transform: flip ? 'scaleX(-1)' : undefined }}
      >
        {/* 斜切主路径 */}
        <path d="M0,56 L1440,0 L1440,56 Z" fill={color} />
        {/* 金线装饰 */}
        <line x1="0" y1="56" x2="1440" y2="0" stroke="#C9A96E" strokeWidth="0.6" opacity="0.4" />
      </svg>
    </div>
  )
}

/**
 * 横向滚动视差背景层，给 section 增加景深感
 */
interface ParallaxBgProps {
  children: ReactNode
  speed?: number
  className?: string
}

export function ParallaxBg({ children, speed = 0.3, className }: ParallaxBgProps) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const rawY = useTransform(scrollYProgress, [0, 1], ['0%', `${speed * 100}%`])
  const y = useSpring(rawY, { stiffness: 40, damping: 20 })

  return (
    <div ref={ref} className={`relative overflow-hidden ${className ?? ''}`}>
      <motion.div className="absolute inset-0 w-full h-full" style={{ y, scale: 1.15 }}>
        {children}
      </motion.div>
    </div>
  )
}
