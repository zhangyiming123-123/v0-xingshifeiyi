'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const navLinks = [
  { label: '醒狮文脉', href: '#culture' },
  { label: '狮头制作', href: '#lionhead' },
  { label: '原创短片', href: '#film' },
  { label: '醒狮文创', href: '#products' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [activeLink, setActiveLink] = useState('')
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50"
      initial={{ backgroundColor: '#FAF6F0', boxShadow: '0 1px 0 rgba(201,169,110,0.4)' }}
      animate={{
        backgroundColor: scrolled ? '#3D2B1F' : '#FAF6F0',
        boxShadow: scrolled
          ? '0 2px 20px rgba(61,43,31,0.4)'
          : '0 1px 0 rgba(201,169,110,0.4)',
      }}
      transition={{ duration: 0.4, ease: 'easeInOut' }}
    >
      {/* 金线顶部装饰 */}
      <div
        className="h-0.5 w-full transition-opacity duration-500"
        style={{
          background: 'linear-gradient(90deg, transparent, #C9A96E 30%, #C9A96E 70%, transparent)',
          opacity: scrolled ? 0.6 : 1,
        }}
      />

      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <motion.a
          href="#"
          className="flex items-center gap-3 group"
          whileHover={{ scale: 1.02 }}
          transition={{ type: 'spring', stiffness: 400, damping: 20 }}
        >
          {/* 狮头图标 SVG */}
          <div className="w-10 h-10 relative flex-shrink-0">
            <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
              {/* 狮头轮廓 */}
              <circle cx="20" cy="18" r="12" stroke="#C41E24" strokeWidth="1.5" fill="none"/>
              {/* 额头装饰 */}
              <path d="M14 12 Q20 6 26 12" stroke="#C9A96E" strokeWidth="1.2" fill="none" strokeLinecap="round"/>
              {/* 眼睛 */}
              <ellipse cx="16" cy="17" rx="2" ry="2.5" fill="#C41E24"/>
              <ellipse cx="24" cy="17" rx="2" ry="2.5" fill="#C41E24"/>
              <circle cx="16.5" cy="16.5" r="0.8" fill="#FAF6F0"/>
              <circle cx="24.5" cy="16.5" r="0.8" fill="#FAF6F0"/>
              {/* 鼻子 */}
              <path d="M19 21 Q20 22.5 21 21" stroke="#C41E24" strokeWidth="1.2" fill="none" strokeLinecap="round"/>
              {/* 嘴巴 */}
              <path d="M16 23 Q20 27 24 23" stroke="#C41E24" strokeWidth="1.2" fill="none" strokeLinecap="round"/>
              {/* 胡须 */}
              <line x1="8" y1="22" x2="14" y2="21" stroke="#C9A96E" strokeWidth="0.8"/>
              <line x1="8" y1="24" x2="14" y2="23" strokeWidth="0.8" stroke="#C9A96E"/>
              <line x1="26" y1="21" x2="32" y2="22" stroke="#C9A96E" strokeWidth="0.8"/>
              <line x1="26" y1="23" x2="32" y2="24" stroke="#C9A96E" strokeWidth="0.8"/>
              {/* 头顶装饰 */}
              <path d="M17 8 Q20 4 23 8" stroke="#C9A96E" strokeWidth="1" fill="none" strokeLinecap="round"/>
              <circle cx="20" cy="4" r="1.5" fill="#C9A96E"/>
              {/* 耳朵 */}
              <path d="M10 14 Q8 8 13 10" stroke="#C41E24" strokeWidth="1.2" fill="none"/>
              <path d="M30 14 Q32 8 27 10" stroke="#C41E24" strokeWidth="1.2" fill="none"/>
            </svg>
          </div>
          <div className="flex flex-col leading-none">
            <span
              className="text-lg font-bold tracking-widest transition-colors duration-500"
              style={{
                fontFamily: 'var(--font-serif)',
                color: scrolled ? '#C9A96E' : '#C41E24',
              }}
            >
              醒狮
            </span>
            <span
              className="text-xs tracking-[0.2em] transition-colors duration-500"
              style={{ color: scrolled ? 'rgba(201,169,110,0.7)' : '#7A6055' }}
            >
              非遗文化
            </span>
          </div>
        </motion.a>

        {/* 桌面导航 */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <motion.a
              key={link.href}
              href={link.href}
              className="relative px-4 py-2 text-sm tracking-widest transition-colors duration-300"
              style={{
                fontFamily: 'var(--font-serif)',
                color: scrolled
                  ? activeLink === link.href ? '#C9A96E' : 'rgba(250,246,240,0.85)'
                  : activeLink === link.href ? '#C41E24' : '#3D2B1F',
              }}
              onHoverStart={() => setActiveLink(link.href)}
              onHoverEnd={() => setActiveLink('')}
              whileHover={{ y: -1 }}
              transition={{ type: 'spring', stiffness: 400, damping: 25 }}
            >
              {link.label}
              <AnimatePresence>
                {activeLink === link.href && (
                  <motion.span
                    key="underline"
                    className="absolute bottom-0.5 left-4 right-4 h-px"
                    style={{ background: scrolled ? '#C9A96E' : '#C41E24' }}
                    initial={{ scaleX: 0, opacity: 0 }}
                    animate={{ scaleX: 1, opacity: 1 }}
                    exit={{ scaleX: 0, opacity: 0 }}
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  />
                )}
              </AnimatePresence>
            </motion.a>
          ))}
        </nav>

        {/* 右侧操作区 */}
        <div className="flex items-center gap-2">
          {/* 移动端菜单按钮 */}
          <motion.button
            className="md:hidden w-9 h-9 flex items-center justify-center"
            style={{ color: scrolled ? '#C9A96E' : '#3D2B1F' }}
            onClick={() => setMobileOpen(!mobileOpen)}
            whileTap={{ scale: 0.95 }}
            aria-label="菜单"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              {mobileOpen ? (
                <>
                  <line x1="18" y1="6" x2="6" y2="18"/>
                  <line x1="6" y1="6" x2="18" y2="18"/>
                </>
              ) : (
                <>
                  <line x1="3" y1="6" x2="21" y2="6"/>
                  <line x1="3" y1="12" x2="21" y2="12"/>
                  <line x1="3" y1="18" x2="21" y2="18"/>
                </>
              )}
            </svg>
          </motion.button>
        </div>
      </div>

      {/* 移动端菜单 */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="md:hidden overflow-hidden border-t"
            style={{
              borderColor: 'rgba(201,169,110,0.3)',
              backgroundColor: scrolled ? '#3D2B1F' : '#FAF6F0',
            }}
          >
            {navLinks.map((link, i) => (
              <motion.a
                key={link.href}
                href={link.href}
                className="block px-6 py-3 text-sm tracking-widest border-b"
                style={{
                  fontFamily: 'var(--font-serif)',
                  color: scrolled ? 'rgba(250,246,240,0.85)' : '#3D2B1F',
                  borderColor: 'rgba(201,169,110,0.15)',
                }}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: i * 0.05 }}
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
