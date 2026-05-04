'use client'

import { useState, useRef } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'

const tabs = [
  { id: 'history', label: '简史' },
  { id: 'origin', label: '起源' },
  { id: 'status', label: '地位' },
  { id: 'technique', label: '技法' },
]

const timelineEvents = [
  {
    era: '唐代',
    period: '618 — 907',
    title: '太平乐南传',
    body: '醒狮脱胎于唐代宫廷"太平乐"（五方狮子舞），为宫廷雅乐。五代十国时期北方战乱，中原士民南迁，舞狮习俗随之带入岭南。',
    color: '#2C5F7C',
  },
  {
    era: '明代',
    period: '1368 — 1644',
    title: '成型与民间传说',
    body: '醒狮在广东南海县（今佛山一带）逐渐成形。相传乡民按神兽之形扎狮头、鸣锣打鼓驱"独角怪兽"，仪式遂演变为岭南春节驱邪避害习俗。',
    color: '#C9A96E',
  },
  {
    era: '清代',
    period: '1644 — 1912',
    title: '狮武合一与流派',
    body: '因"禁教抑武"，民间习武群体将南派武术融于舞狮身法，形成"狮武合一"。佛山狮（硬派）与冯庚长创立的鹤山狮（灵巧派）两大流派由此诞生。',
    color: '#C41E24',
  },
  {
    era: '近代',
    period: '1840 — 1949',
    title: '瑞狮更名醒狮',
    body: '清末知识分子与革命宣传家借"瑞"与"睡"在粤语中谐音，将"瑞狮"改名"醒狮"，意寓中华民族这头"睡狮"已然觉醒，唤起民族精神。',
    color: '#C41E24',
  },
  {
    era: '建国后',
    period: '1949 — 2006',
    title: '起伏复兴与非遗入列',
    body: '醒狮被纳入群众体育，文革期间一度沉寂。改革开放后迅速复兴并传至海外。2006年，广东醒狮正式列入首批国家级非物质文化遗产名录。',
    color: '#C9A96E',
  },
  {
    era: '当代',
    period: '2006 — 至今',
    title: '创新融合新时代',
    body: '醒狮与电影、游戏、演唱会等流行文化紧密结合，成为粤港澳大湾区文化IP。AI、AR等数字化手段持续创新，高桩竞技成为最具看点的当代表演形式。',
    color: '#2C5F7C',
  },
]

const tabContent: Record<string, { title: string; body: string; details: string[]; image: string; imageAlt: string }> = {
  history: {
    title: '千年流传的醒狮文脉',
    body: '岭南醒狮肇始于唐代宫廷太平乐，历经五代南传、明代民间成型、清代"狮武合一"，至近代因民族觉醒而正式得名"醒狮"。2006年列入国家级非遗，今日已成为粤港澳大湾区最具代表性的文化符号。',
    details: ['唐代宫廷太平乐南传', '明清武术融合成型', '近代民族觉醒命名', '2006年入选国家级非遗'],
    image: '/images/lion-history-1.jpg',
    imageAlt: '岭南醒狮在传统祠堂前表演，地面铺满爆竹碎屑，烟雾弥漫',
  },
  origin: {
    title: '源流演变：从中原到岭南',
    body: '岭南醒狮的起源是一个层层叠加的过程：发端于唐代宫廷，壮大于明代佛山，并在近代被赋予唤醒民族精神的深刻内涵。',
    details: ['唐代太平乐南传', '明代佛山民俗成型', '清代狮武合一融合', '近代民族精神赋名'],
    image: '/images/lion-origin.jpg',
    imageAlt: '金色与红色醒狮在岭南古建筑前共同表演，色彩热烈，气氛浓郁',
  },
  status: {
    title: '非遗保护与文化地位',
    body: '2006年，岭南醒狮被列入首批国家级非物质文化遗产名录，成为中华优秀传统文化的代表之一。如今，醒狮已走出国门，在东南亚、北美、欧洲的华人聚居区广泛传播，成为海外华人凝聚乡情、传承文化的重要纽带。',
    details: ['2006年入选国家级非遗', '海外华人文化纽带', '中外文化交流使者', '申报联合国非遗项目'],
    image: '/images/lion-history-1.jpg',
    imageAlt: '醒狮在祠堂前进行传统表演仪式',
  },
  technique: {
    title: '醒狮的核心技法',
    body: '醒狮表演讲究"喜、怒、哀、乐、动、静、惊、疑"八态，通过眼皮、嘴巴、耳朵的灵活操控，配合狮手的步法、桩功与身法，生动诠释狮子的喜怒哀乐。高难度的"采青"技艺是醒狮的灵魂，表演者需踩梅花桩、登高采青，融武术、杂技与艺术于一身。',
    details: ['八态表演技法体系', '采青核心仪式动作', '南派武术桩步融合', '锣鼓击打配合节奏'],
    image: '/images/lion-history-2.jpg',
    imageAlt: '醒狮表演特写，展示精细的狮头工艺与表演者技艺',
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

const originBlocks = [
  {
    icon: '源',
    heading: '源流演变：从中原到岭南',
    items: [
      { label: '滥觞于宫廷', body: '最早的源头可追溯到唐代宫廷的《太平乐》（又称《五方狮子舞》），是一种规模宏大、妆造华丽的宫廷庆典乐舞。' },
      { label: '南传与形成', body: '五代十国时期，随着中原移民大量南迁，这种宫廷乐舞也传入岭南，与当地文化融合，逐渐世俗化并扎根下来。' },
      { label: '狮武合一', body: '到了清代，因官方"禁教抑武"，民间习武群体将南派武术融入舞狮，形成"狮武合一"的传统，使醒狮的动作充满力量与功架。' },
    ],
  },
  {
    icon: '传',
    heading: '民间传说：明代佛山驱"年兽"',
    items: [
      { label: '年兽为祸', body: '明朝初年，广东佛山一带出现了一只名为"年兽"（或"连兽"）的独角怪兽，时常糟蹋庄稼，令百姓苦不堪言。' },
      { label: '扎狮驱怪', body: '为驱赶怪兽，乡民们用竹篾和彩布扎成凶猛的狮头狮身，并在周边敲锣打鼓，成功将"年兽"吓跑。' },
      { label: '沿习成俗', body: '此后，人们便相沿成习，每逢喜庆佳节便舞狮以驱邪纳吉。这个传说至今仍在民间流传，解释了岭南醒狮的民俗由来。' },
    ],
  },
  {
    icon: '醒',
    heading: '点睛之笔：从"瑞狮"到"醒狮"',
    items: [
      { label: '借古称"瑞"', body: '在很长一段时间里，南方的狮子舞因其吉祥寓意而被称为"瑞狮"。' },
      { label: '一字之改', body: '到了清末民初，民族危机深重的年代，因"瑞"在粤语中与"睡"谐音，知识分子与革命宣传家将"瑞狮"改称"醒狮"，以唤醒国人精神。这一字之改，颠覆了传统，赋予了这门艺术全新的民族内涵。' },
    ],
  },
]

function OriginContent() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <div ref={ref} className="mt-10 space-y-10">
      {/* 装饰分隔线 */}
      <motion.div
        className="flex items-center gap-4"
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.5 }}
      >
        <div className="h-px flex-1" style={{ background: 'linear-gradient(90deg, transparent, #C9A96E)' }} />
        <span className="text-xs tracking-[0.4em] px-4" style={{ fontFamily: 'var(--font-serif)', color: '#C9A96E' }}>
          起源详解
        </span>
        <div className="h-px flex-1" style={{ background: 'linear-gradient(90deg, #C9A96E, transparent)' }} />
      </motion.div>

      {originBlocks.map((block, bi) => (
        <motion.div
          key={bi}
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.1 + bi * 0.15, duration: 0.6, ease: 'easeOut' }}
          className="relative"
        >
          {/* 标题行 */}
          <div className="flex items-center gap-3 mb-5">
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold"
              style={{ background: '#C41E24', color: '#FAF6F0', fontFamily: 'var(--font-serif)' }}
            >
              {block.icon}
            </div>
            <h4
              className="text-base font-bold"
              style={{ fontFamily: 'var(--font-serif)', color: '#3D2B1F' }}
            >
              {block.heading}
            </h4>
          </div>

          {/* 条目列表 */}
          <div className="pl-11 space-y-5">
            {block.items.map((item, ii) => (
              <motion.div
                key={ii}
                className="flex gap-3 group"
                initial={{ opacity: 0, x: -12 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.2 + bi * 0.15 + ii * 0.08, duration: 0.5 }}
              >
                {/* 左侧竖线 + 圆点 */}
                <div className="flex flex-col items-center flex-shrink-0 pt-1">
                  <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: '#C9A96E' }} />
                  {ii < block.items.length - 1 && (
                    <div className="w-px flex-1 mt-1" style={{ background: '#C9A96E40', minHeight: '28px' }} />
                  )}
                </div>
                <div className="flex-1 pb-1">
                  <span
                    className="text-sm font-bold mr-2"
                    style={{ fontFamily: 'var(--font-serif)', color: '#C41E24' }}
                  >
                    {item.label}
                  </span>
                  <span
                    className="text-sm"
                    style={{ fontFamily: 'var(--font-sans)', color: '#5A4035', lineHeight: '1.9' }}
                  >
                    {item.body}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>

          {/* 块间分隔 */}
          {bi < originBlocks.length - 1 && (
            <div
              className="mt-8 h-px"
              style={{ background: 'linear-gradient(90deg, #C9A96E30, #C9A96E60, #C9A96E30)' }}
            />
          )}
        </motion.div>
      ))}

      {/* 结语 */}
      <motion.div
        className="p-5 border-l-2 mt-4"
        style={{ borderColor: '#C41E24', background: 'rgba(196,30,36,0.04)' }}
        initial={{ opacity: 0, y: 12 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.7, duration: 0.5 }}
      >
        <p
          className="text-sm italic"
          style={{ fontFamily: 'var(--font-serif)', color: '#5A4035', lineHeight: '2' }}
        >
          因此，岭南醒狮的"起源"是一个层层叠加的过程：它<strong style={{ color: '#C41E24' }}>发端于唐代宫廷</strong>，<strong style={{ color: '#C41E24' }}>壮大于明代佛山</strong>，并在近代被赋予<strong style={{ color: '#C41E24' }}>唤醒民族精神</strong>的深刻内涵。
        </p>
      </motion.div>
    </div>
  )
}

function HistoryTimeline() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <div ref={ref} className="mt-10">
      {/* 时间轴标题 */}
      <motion.div
        className="flex items-center gap-4 mb-8"
        initial={{ opacity: 0, y: 10 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
      >
        <div className="h-px flex-1" style={{ background: 'linear-gradient(90deg, transparent, #C9A96E)' }} />
        <span
          className="text-xs tracking-[0.4em] px-4"
          style={{ fontFamily: 'var(--font-serif)', color: '#C9A96E' }}
        >
          历史沿革
        </span>
        <div className="h-px flex-1" style={{ background: 'linear-gradient(90deg, #C9A96E, transparent)' }} />
      </motion.div>

      {/* 时间轴主体 */}
      <div className="relative">
        {/* 中央竖线 */}
        <motion.div
          className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px hidden md:block"
          style={{ background: 'linear-gradient(180deg, #C9A96E40, #C9A96E, #C9A96E40)' }}
          initial={{ scaleY: 0, originY: 0 }}
          animate={inView ? { scaleY: 1 } : {}}
          transition={{ duration: 1.2, ease: 'easeOut', delay: 0.2 }}
        />
        {/* 移动端左侧竖线 */}
        <motion.div
          className="absolute left-5 top-0 bottom-0 w-px md:hidden"
          style={{ background: 'linear-gradient(180deg, #C9A96E40, #C9A96E, #C9A96E40)' }}
          initial={{ scaleY: 0, originY: 0 }}
          animate={inView ? { scaleY: 1 } : {}}
          transition={{ duration: 1.2, ease: 'easeOut', delay: 0.2 }}
        />

        <div className="flex flex-col gap-0">
          {timelineEvents.map((event, i) => {
            const isLeft = i % 2 === 0
            return (
              <motion.div
                key={event.era}
                className="relative flex items-start md:grid md:grid-cols-2 gap-0"
                initial={{ opacity: 0, x: isLeft ? -30 : 30 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.3 + i * 0.12, duration: 0.6, ease: 'easeOut' }}
              >
                {/* 左列内容 (偶数项显示，奇数项空白) */}
                <div className={`hidden md:flex ${isLeft ? 'justify-end pr-10' : 'justify-end pr-10 opacity-0 pointer-events-none'} pb-10`}>
                  {isLeft && (
                    <TimelineCard event={event} align="right" />
                  )}
                </div>

                {/* 中央节点 */}
                <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 flex-col items-center" style={{ top: 20 }}>
                  <motion.div
                    className="w-3 h-3 rounded-full border-2 relative z-10"
                    style={{ borderColor: event.color, background: '#FAF6F0' }}
                    whileHover={{ scale: 1.5 }}
                  >
                    <motion.div
                      className="absolute inset-0 rounded-full"
                      style={{ background: event.color }}
                      initial={{ scale: 0 }}
                      animate={inView ? { scale: 0.5 } : {}}
                      transition={{ delay: 0.4 + i * 0.12 }}
                    />
                  </motion.div>
                </div>

                {/* 右列内容 (奇数项显示，偶数项空白) */}
                <div className={`hidden md:flex ${!isLeft ? 'justify-start pl-10' : 'justify-start pl-10 opacity-0 pointer-events-none'} pb-10`}>
                  {!isLeft && (
                    <TimelineCard event={event} align="left" />
                  )}
                </div>

                {/* 移动端布局 */}
                <div className="flex md:hidden items-start gap-4 pl-2 pb-8 w-full">
                  <div className="flex flex-col items-center flex-shrink-0 mt-1">
                    <div
                      className="w-7 h-7 rounded-full flex items-center justify-center relative z-10 border"
                      style={{ borderColor: event.color, background: '#FAF6F0' }}
                    >
                      <div className="w-2 h-2 rounded-full" style={{ background: event.color }} />
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-baseline gap-2 mb-1">
                      <span
                        className="text-sm font-bold"
                        style={{ fontFamily: 'var(--font-serif)', color: event.color }}
                      >
                        {event.era}
                      </span>
                      <span className="text-xs" style={{ color: '#9A8070', fontFamily: 'var(--font-sans)' }}>
                        {event.period}
                      </span>
                    </div>
                    <p
                      className="text-sm font-bold mb-1"
                      style={{ fontFamily: 'var(--font-serif)', color: '#3D2B1F' }}
                    >
                      {event.title}
                    </p>
                    <p
                      className="text-xs leading-relaxed"
                      style={{ fontFamily: 'var(--font-sans)', color: '#7A6055', lineHeight: 1.8 }}
                    >
                      {event.body}
                    </p>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

function TimelineCard({ event, align }: { event: typeof timelineEvents[0]; align: 'left' | 'right' }) {
  return (
    <motion.div
      className="max-w-xs group cursor-default"
      whileHover={{ y: -3 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    >
      <div
        className="p-5 border relative overflow-hidden"
        style={{
          borderColor: '#C9A96E60',
          background: 'rgba(250,246,240,0.9)',
          borderLeft: align === 'left' ? `3px solid ${event.color}` : undefined,
          borderRight: align === 'right' ? `3px solid ${event.color}` : undefined,
        }}
      >
        {/* 悬停遮层 */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{ background: `${event.color}06` }}
        />
        {/* 朝代标签 */}
        <div className="flex items-baseline gap-2 mb-2">
          <span
            className="text-base font-bold"
            style={{ fontFamily: 'var(--font-serif)', color: event.color }}
          >
            {event.era}
          </span>
          <span
            className="text-xs"
            style={{ fontFamily: 'var(--font-sans)', color: '#9A8070' }}
          >
            {event.period}
          </span>
        </div>
        {/* 标题 */}
        <p
          className="text-sm font-bold mb-2"
          style={{ fontFamily: 'var(--font-serif)', color: '#3D2B1F' }}
        >
          {event.title}
        </p>
        {/* 内容 */}
        <p
          className="text-xs"
          style={{ fontFamily: 'var(--font-sans)', color: '#7A6055', lineHeight: 1.9 }}
        >
          {event.body}
        </p>
      </div>
    </motion.div>
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
          className="flex justify-center gap-2 mb-14 flex-wrap"
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
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            className="flex flex-col lg:flex-row gap-10 items-stretch"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
          >
            {/* 左侧图片区 */}
            <motion.div
              className="flex-shrink-0 lg:w-[45%] relative rounded overflow-hidden min-h-72"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
            >
              <div className="w-full h-full min-h-72 relative overflow-hidden">
                <img
                  src={content.image}
                  alt={content.imageAlt}
                  className="w-full h-full object-cover"
                  style={{ minHeight: '288px' }}
                />
                {/* 遮罩 */}
                <div
                  className="absolute inset-0"
                  style={{ background: 'linear-gradient(to top, rgba(61,43,31,0.5) 0%, transparent 50%)' }}
                />
                {/* Tab标签 */}
                <div className="absolute top-4 left-4 px-3 py-1" style={{ background: 'rgba(196,30,36,0.88)' }}>
                  <span className="text-xs tracking-widest text-white" style={{ fontFamily: 'var(--font-serif)' }}>
                    {tabs.find(t => t.id === activeTab)?.label}
                  </span>
                </div>
                {/* 底部古典角标 */}
                {[
                  'bottom-3 left-3',
                  'bottom-3 right-3',
                ].map((pos, idx) => (
                  <div key={idx} className={`absolute ${pos} w-6 h-6`} aria-hidden="true">
                    <svg viewBox="0 0 24 24" fill="none">
                      {idx === 0
                        ? <><line x1="2" y1="22" x2="10" y2="22" stroke="#C9A96E" strokeWidth="1.5"/><line x1="2" y1="22" x2="2" y2="14" stroke="#C9A96E" strokeWidth="1.5"/></>
                        : <><line x1="22" y1="22" x2="14" y2="22" stroke="#C9A96E" strokeWidth="1.5"/><line x1="22" y1="22" x2="22" y2="14" stroke="#C9A96E" strokeWidth="1.5"/></>
                      }
                    </svg>
                  </div>
                ))}
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
                style={{ fontFamily: 'var(--font-sans)', color: '#5A4035', lineHeight: '2' }}
              >
                {content.body}
              </p>
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
                    <span className="text-sm" style={{ fontFamily: 'var(--font-sans)', color: '#5A4035' }}>
                      {detail}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </AnimatePresence>

        {/* 简史时间轴 — 仅在简史标签显示 */}
        <AnimatePresence>
          {activeTab === 'history' && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.5, ease: 'easeInOut' }}
              style={{ overflow: 'hidden' }}
            >
              <HistoryTimeline />
            </motion.div>
          )}
        </AnimatePresence>

        {/* 起源详解 — 仅在起源标签显示 */}
        <AnimatePresence>
          {activeTab === 'origin' && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.5, ease: 'easeInOut' }}
              style={{ overflow: 'hidden' }}
            >
              <OriginContent />
            </motion.div>
          )}
        </AnimatePresence>

        {/* 底部双卡片 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
          {cultureCards.map((card, i) => (
            <motion.div
              key={i}
              className="relative p-6 border corner-decoration group cursor-default"
              style={{ borderColor: '#C9A96E', background: 'rgba(250,246,240,0.8)' }}
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
