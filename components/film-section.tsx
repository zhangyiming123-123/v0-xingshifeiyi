'use client'

import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'


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
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
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
            className="flex-1 relative rounded overflow-hidden group"
            style={{ aspectRatio: '16 / 9' }}
            initial={{ opacity: 0, scale: 0.96 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.2, duration: 0.7 }}
          >
            {/* B站 iframe — 点击播放后显示 */}
            {playing && (
              <iframe
                src="//player.bilibili.com/player.html?isOutside=true&aid=116539709784669&bvid=BV13MRmBRE8Y&cid=38195298430&p=1&autoplay=1"
                className="absolute inset-0 w-full h-full"
                scrolling="no"
                frameBorder="0"
                allowFullScreen={true}
                style={{ border: 'none' }}
                title="醒狮原创短片"
              />
            )}

            {/* 封面占位 — 未播放时显示 */}
            {!playing && (
              <div
                className="absolute inset-0"
                style={{
                  background: 'linear-gradient(135deg, #1A1008 0%, #2C1810 40%, #2C5F7C 100%)',
                }}
              >
                <div className="absolute inset-0 cloud-pattern opacity-10" />
                <svg
                  className="absolute inset-0 w-full h-full"
                  viewBox="0 0 800 340"
                  fill="none"
                  preserveAspectRatio="xMidYMid slice"
                  aria-hidden="true"
                >
                  <circle cx="400" cy="170" r="140" stroke="#C9A96E" strokeWidth="0.6" opacity="0.3"/>
                  <circle cx="400" cy="170" r="100" stroke="#C41E24" strokeWidth="0.5" opacity="0.2"/>
                  <path d="M100 200 Q250 80 400 170 Q550 260 700 140" stroke="#C9A96E" strokeWidth="1" fill="none" opacity="0.4"/>
                  <path d="M80 230 Q230 110 400 200 Q570 290 720 170" stroke="#C41E24" strokeWidth="0.8" fill="none" opacity="0.3"/>
                  <path d="M30 30 L60 30 M30 30 L30 60" stroke="#C9A96E" strokeWidth="1.5" opacity="0.5"/>
                  <path d="M770 30 L740 30 M770 30 L770 60" stroke="#C9A96E" strokeWidth="1.5" opacity="0.5"/>
                  <path d="M30 310 L60 310 M30 310 L30 280" stroke="#C9A96E" strokeWidth="1.5" opacity="0.5"/>
                  <path d="M770 310 L740 310 M770 310 L770 280" stroke="#C9A96E" strokeWidth="1.5" opacity="0.5"/>
                </svg>
                <div
                  className="absolute inset-0"
                  style={{
                    background: 'linear-gradient(to right, rgba(61,43,31,0.4) 0%, transparent 40%, transparent 60%, rgba(44,95,124,0.3) 100%)',
                  }}
                />
              </div>
            )}

            {/* 播放按钮 — 未播放时显示 */}
            {!playing && (
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.button
                  className="pulse-btn relative w-16 h-16 rounded-full flex items-center justify-center z-10"
                  style={{ background: '#C41E24' }}
                  onClick={() => setPlaying(true)}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label="播放视频"
                >
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="white" style={{ marginLeft: 3 }}>
                    <path d="M8 5v14l11-7z"/>
                  </svg>
                </motion.button>
              </div>
            )}

            {/* 底部字幕条 — 未播放时显示 */}
            {!playing && (
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
                      原创短片 · 2026
                    </span>
                    <h3
                      className="text-xl font-bold text-white"
                      style={{ fontFamily: 'var(--font-serif)' }}
                    >
                      醒狮
                    </h3>
                  </div>
                  <span
                    className="text-sm"
                    style={{ fontFamily: 'var(--font-sans)', color: 'rgba(250,246,240,0.6)' }}
                  >
                    导演：张熠铭
                  </span>
                </div>
              </div>
            )}

            {/* 悬停描边 — 未播放时显示 */}
            {!playing && (
              <motion.div
                className="absolute inset-0 border-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                style={{ borderColor: '#C9A96E' }}
              />
            )}
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
                2026年度原创短片
              </div>
              <h3
                className="text-2xl font-bold mb-4 leading-snug"
                style={{ fontFamily: 'var(--font-serif)', color: '#FAF6F0' }}
              >
                醒狮
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
                在城市里碰壁的年轻人林醒，因爷爷留下的狮馆即将拆迁，重返故乡佛山涌口村。他在尘封的狮头与旧时光里，意外读懂了醒狮扎作背后的温度与力量，并通过吉光镜照见人心深处的孤独与枷锁。在与留守少年小杰的彼此救赎中，林醒以扎狮、舞狮为灯，解开自己与乡邻们心中的郁结，最终让沉寂的醒狮文化，在烟火人间里重新亮起，完成了一场关于传承、治愈与自我觉醒的温柔旅程。
              </p>

              {/* 元数据 */}
              {[
                { label: '导演', value: '张熠铭' },
                { label: '年份', value: '2026' },
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


      </div>
    </section>
  )
}
