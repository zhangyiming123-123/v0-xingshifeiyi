'use client'

import { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const tabs = [
  { id: 'history', label: '简史' },
  { id: 'origin', label: '起源' },
  { id: 'status', label: '地位' },
  { id: 'technique', label: '技法' },
]

const tabContent: Record<string, { title: string; body: string; details: string[] }> = {
  history: {
    title: '千年流传的醒狮文化',
    body: '岭南醒狮起源于明代，至今已有逾五百年历史。早期的舞狮活动多见于节庆祭祀场合，随着时代变迁，逐渐发展成集武术表演、民间艺术与宗教仪式于一体的综合性民俗活动。清代以后，广东武馆兴盛，醒狮更与南派武术深度融合，形成独具一格的岭南风格。',
    details: ['明代草创，清代兴盛', '与南派武术深度融合', '五百余年传承脉络', '珠三角地区广泛流传'],
  },
  origin: {
    title: '醒狮的起源传说',
    body: '相传古时岭南一带常遭年兽侵扰，乡民束手无策。一日，神人托梦，授以彩狮之形，并配以锣鼓之声以驱邪。自此民间仿制彩狮，逢年过节出狮祈福。另有一说源于北方舞狮传入后，与岭南武术及民俗文化相结合，逐步演变出独特的"南狮"面貌，以别于北方狮舞。',
    details: ['驱邪迎祥的民俗信仰', '南北狮文化交融', '本土武术元素融入', '珠江流域文化孕育'],
  },
  status: {
    title: '非遗保护与文化地位',
    body: '2006年，岭南醒狮被列入首批国家级非物质文化遗产名录，成为中华优秀传统文化的代表之一。如今，醒狮已走出国门，在东南亚、北美、欧洲的华人聚居区广泛传播，成为海外华人凝聚乡情、传承文化的重要纽带，也是中华文化对外交流的一张靓丽名片。',
    details: ['2006年入选国家级非遗', '海外华人文化纽带', '中外文化交流使者', '申报联合国非遗项目'],
  },
  technique: {
    title: '醒狮的核心技法',
    body: '醒狮表演讲究"喜、怒、哀、乐、动、静、惊、疑"八态，通过眼皮、嘴巴、耳朵的灵活操控，配合狮手的步法、桩功与身法，生动诠释狮子的喜怒哀乐。高难度的"采青"技艺是醒狮的灵魂，表演者需踩梅花桩、登高采青，融武术、杂技与艺术于一身，展现岭南儿女的胆魄与智慧。',
    details: ['八态表演技法体系', '采青核心仪式动作', '南派武术桩步融合', '锣鼓击打配合节奏'],
  },
}

const cultureCards = [
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <circle cx="16" cy="16" r="14" stroke="#C41E24" strokeWidth="1.5"/>
        <path d="M10 22 Q16 8 22 22" stroke="#C41E24" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
        <path d="M12 18 Q16 14 20 18" stroke="#C9A96E" strokeWidth="1" fill="none"/>
        <circle cx="16" cy="10" r="2" fill="#C9A96E"/>
      </svg>
    ),
    title: '南狮绝技',
    desc: '高桩采青，挑战极限，融武术与技巧于一体',
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <rect x="4" y="4" width="24" height="24" stroke="#C41E24" strokeWidth="1.5" fill="none"/>
        <path d="M4 4 L12 4 M4 4 L4 12" stroke="#C9A96E" strokeWidth="1.5"/>
        <path d="M28 28 L20 28 M28 28 L28 20" stroke="#C9A96E" strokeWidth="1.5"/>
        <path d="M10 16 Q16 10 22 16 Q16 22 10 16Z" stroke="#C41E24" strokeWidth="1" fill="none"/>
      </svg>
    ),
    title: '礼仪传承',
    desc: '点睛开光，起狮拜神，蕴含深厚礼俗文化',
  },
]

function SectionTitle({ children, subtitle }: { children: React.ReactNode; subtitle: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  return (
    <div ref={ref} className="flex flex-col items-center gap-3 mb-12">
      {/* 祥云装饰线 */}
      <motion.div
        className="flex items-center gap-4"
        initial={{ opacity: 0, scaleX: 0.3 }}
        animate={inView ? { opacity: 1, scaleX: 1 } : {}}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        <CloudDecor />
        <motion.h2
          className="text-3xl md:text-4xl font-bold tracking-widest text-center text-balance"
          style={{ fontFamily: 'var(--font-serif)', color: '#3D2B1F' }}
          initial={{ opacity: 0, y: 15 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          {children}
        </motion.h2>
        <CloudDecor flip />
      </motion.div>
      <motion.p
        className="text-xs tracking-[0.3em] uppercase"
        style={{ fontFamily: 'var(--font-sans)', color: '#C9A96E' }}
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ delay: 0.4, duration: 0.5 }}
      >
        {subtitle}
      </motion.p>
      <motion.div
        className="gold-divider w-48"
        initial={{ scaleX: 0 }}
        animate={inView ? { scaleX: 1 } : {}}
        transition={{ delay: 0.5, duration: 0.6 }}
      />
    </div>
  )
}

function CloudDecor({ flip = false }: { flip?: boolean }) {
  return (
    <svg
      width="48"
      height="24"
      viewBox="0 0 48 24"
      fill="none"
      style={{ transform: flip ? 'scaleX(-1)' : undefined }}
    >
      <path
        d="M2 18 Q6 6 12 10 Q8 2 16 4 Q14 -1 22 2 Q22 -2 28 2 Q26 -1 32 4 Q40 2 38 10 Q44 6 46 18"
        stroke="#C9A96E"
        strokeWidth="1"
        fill="none"
        strokeLinecap="round"
      />
    </svg>
  )
}

export default function CultureSection() {
  const [activeTab, setActiveTab] = useState('history')
  const sectionRef = useRef<HTMLElement>(null)
  const inView = useInView(sectionRef, { once: true, margin: '-60px' })
  const content = tabContent[activeTab]

  return (
    <section
      id="culture"
      ref={sectionRef}
      className="py-24 rice-paper cloud-pattern overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6">
        <SectionTitle subtitle="The Spirit of Lingnan Lion Dance">醒狮文脉</SectionTitle>

        {/* 标签按钮 */}
        <motion.div
          className="flex justify-center gap-2 mb-14"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          {tabs.map((tab) => (
            <motion.button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className="relative px-6 py-2 text-sm tracking-widest transition-colors duration-300"
              style={{
                fontFamily: 'var(--font-serif)',
                color: activeTab === tab.id ? '#FAF6F0' : '#3D2B1F',
                background: activeTab === tab.id ? '#C41E24' : 'transparent',
                border: `1px solid ${activeTab === tab.id ? '#C41E24' : '#C9A96E'}`,
              }}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: 'spring', stiffness: 400, damping: 20 }}
            >
              {tab.label}
            </motion.button>
          ))}
        </motion.div>

        {/* 左图右文 */}
        <div className="flex flex-col lg:flex-row gap-10 mb-16 items-stretch">
          {/* 左侧图片区 */}
          <motion.div
            className="flex-shrink-0 lg:w-[45%] relative rounded overflow-hidden min-h-72"
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.7, ease: 'easeOut' }}
          >
            {/* 占位视觉图 — 用SVG绘制 */}
            <div
              className="w-full h-full min-h-72 flex items-center justify-center relative"
              style={{ background: 'linear-gradient(135deg, #3D2B1F 0%, #5A3D2B 50%, #2C5F7C 100%)' }}
            >
              {/* 背景祥云 */}
              <div className="absolute inset-0 cloud-pattern opacity-20" />
              {/* 中心装饰 */}
              <svg
                viewBox="0 0 360 240"
                fill="none"
                className="w-full h-full absolute inset-0"
                preserveAspectRatio="xMidYMid slice"
              >
                <circle cx="180" cy="120" r="90" stroke="#C9A96E" strokeWidth="0.8" opacity="0.4"/>
                <circle cx="180" cy="120" r="70" stroke="#C41E24" strokeWidth="0.6" opacity="0.3"/>
                {/* 抽象狮形 */}
                <ellipse cx="180" cy="115" rx="55" ry="60" stroke="#C9A96E" strokeWidth="1.5" fill="none" opacity="0.8"/>
                <path d="M155 100 Q165 88 180 92 Q195 88 205 100" stroke="#C9A96E" strokeWidth="1.2" fill="none" opacity="0.8"/>
                <ellipse cx="163" cy="110" rx="12" ry="10" stroke="#FAF6F0" strokeWidth="1" fill="none" opacity="0.6"/>
                <ellipse cx="197" cy="110" rx="12" ry="10" stroke="#FAF6F0" strokeWidth="1" fill="none" opacity="0.6"/>
                <circle cx="163" cy="110" r="5" fill="#C41E24" opacity="0.7"/>
                <circle cx="197" cy="110" r="5" fill="#C41E24" opacity="0.7"/>
                <path d="M170 130 Q180 138 190 130" stroke="#C9A96E" strokeWidth="1.5" fill="none" opacity="0.8"/>
                <path d="M155 125 Q140 128 130 125" stroke="#C9A96E" strokeWidth="1" fill="none" opacity="0.5"/>
                <path d="M155 132 Q140 135 128 132" stroke="#C9A96E" strokeWidth="1" fill="none" opacity="0.5"/>
                <path d="M205 125 Q220 128 230 125" stroke="#C9A96E" strokeWidth="1" fill="none" opacity="0.5"/>
                <path d="M205 132 Q220 135 232 132" stroke="#C9A96E" strokeWidth="1" fill="none" opacity="0.5"/>
                {/* 角标 */}
                <path d="M20 20 L44 20 M20 20 L20 44" stroke="#C9A96E" strokeWidth="1.5" opacity="0.6"/>
                <path d="M340 20 L316 20 M340 20 L340 44" stroke="#C9A96E" strokeWidth="1.5" opacity="0.6"/>
                <path d="M20 220 L44 220 M20 220 L20 196" stroke="#C9A96E" strokeWidth="1.5" opacity="0.6"/>
                <path d="M340 220 L316 220 M340 220 L340 196" stroke="#C9A96E" strokeWidth="1.5" opacity="0.6"/>
              </svg>
              {/* Tab标签 */}
              <div className="absolute top-4 left-4 px-3 py-1" style={{ background: 'rgba(196,30,36,0.85)' }}>
                <span className="text-xs tracking-widest text-white" style={{ fontFamily: 'var(--font-serif)' }}>
                  {tabs.find(t => t.id === activeTab)?.label}
                </span>
              </div>
            </div>
            {/* 竖线分隔 */}
            <div
              className="hidden lg:block absolute top-6 -right-5 bottom-6 w-px"
              style={{ background: 'linear-gradient(180deg, transparent, #C9A96E 30%, #C9A96E 70%, transparent)' }}
            />
          </motion.div>

          {/* 右侧文字 */}
          <motion.div
            className="flex-1 flex flex-col justify-center pl-0 lg:pl-8"
            key={activeTab}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          >
            <h3
              className="text-xl md:text-2xl font-bold mb-4 text-balance"
              style={{ fontFamily: 'var(--font-serif)', color: '#3D2B1F' }}
            >
              {content.title}
            </h3>
            <div className="h-0.5 w-12 mb-5" style={{ background: '#C41E24' }} />
            <p
              className="text-base leading-relaxed mb-6"
              style={{
                fontFamily: 'var(--font-sans)',
                color: '#5A4035',
                lineHeight: '2',
              }}
            >
              {content.body}
            </p>
            {/* 要点列表 */}
            <div className="grid grid-cols-2 gap-3">
              {content.details.map((detail, i) => (
                <motion.div
                  key={i}
                  className="flex items-center gap-2"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.08 }}
                >
                  <div className="w-1 h-4 flex-shrink-0" style={{ background: '#C41E24' }} />
                  <span
                    className="text-sm"
                    style={{ fontFamily: 'var(--font-sans)', color: '#5A4035' }}
                  >
                    {detail}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* 底部双卡片 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {cultureCards.map((card, i) => (
            <motion.div
              key={i}
              className="relative p-6 border corner-decoration group cursor-default"
              style={{
                borderColor: '#C9A96E',
                background: 'rgba(250,246,240,0.8)',
              }}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.5 + i * 0.1, duration: 0.6 }}
              whileHover={{ y: -4, boxShadow: '0 8px 30px rgba(196,30,36,0.12)' }}
            >
              <motion.div
                className="absolute inset-0 border-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ borderColor: '#C41E24' }}
              />
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 mt-1">{card.icon}</div>
                <div>
                  <h4
                    className="text-lg font-bold mb-2"
                    style={{ fontFamily: 'var(--font-serif)', color: '#3D2B1F' }}
                  >
                    {card.title}
                  </h4>
                  <p
                    className="text-sm leading-relaxed"
                    style={{ fontFamily: 'var(--font-sans)', color: '#7A6055' }}
                  >
                    {card.desc}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
