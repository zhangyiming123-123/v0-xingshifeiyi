'use client'

import { useState, useRef } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import Link from 'next/link'

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
    title: '国家认证：非遗名录上的明珠',
    body: '2006年，广东醒狮被列入第一批国家级非物质文化遗产名录。这份认可开启了它从传统民俗向国家文化名片的转型之路，如今已成为连接全球华人的精神纽带。',
    details: ['2006年入选国家级非遗', '全运会正式竞赛项目', '世界三大甲级南狮赛事', '全球华人精神原乡'],
    image: '/images/lion-status.jpg',
    imageAlt: '橙色与黑红色醒狮同台表演，背景为岭南青砖街道，气氛热烈',
  },
  technique: {
    title: '无武不成狮：醒狮的技法体系',
    body: '醒狮技艺是武术根基、狮型八态、采青仪式与鼓乐指挥的综合融合。所谓"无武不成狮"，所有表演动作皆建立在扎实的南拳马步之上，最终在高桩竞技中达到艺术的极致。',
    details: ['武术马步为基础根基', '狮型八态神似表演', '采青完整戏剧流程', '鼓乐总指挥配合'],
    image: '/images/lion-technique.jpg',
    imageAlt: '金黄色醒狮站立于梅花桩顶，展示高桩采青技艺，背景为深色树丛',
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
      { label: '滥觞于宫廷', body: '最早的源头可追溯到唐代宫廷的《太平乐》（又称《五方狮子舞》��，是一种规模宏大、妆造华丽的宫廷庆典乐舞。' },
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

const statusBlocks = [
  {
    icon: '证',
    color: '#C41E24',
    heading: '国家认证：非遗名录上的明珠',
    intro: '2006年，广东醒狮被列入第一批国家级非物质文化遗产名录。这份国家级认可，不仅确认了它的文化价值，也开启了它从传统民俗向国家文化名片的转型之路。',
    items: [],
  },
  {
    icon: '魂',
    color: '#2C5F7C',
    heading: '文化象征：一个"醒"字的精神灌注',
    intro: '"醒狮"二字，本身就是对岭南乃至中华民族精神的绝妙提炼。',
    items: [
      {
        label: '历史赋予的民族觉醒之魂',
        body: '"醒狮"的概念诞生于清末民初。当时，有识之士借用"睡狮"的比喻，将"醒"字赋予舞狮，使其承载了唤醒民族自觉、鼓舞国人奋起的时代精神。',
      },
      {
        label: '表里如一的南派艺术精髓',
        body: '不同地位和性格的狮头角色皆有对应：黄狮代表仁义、红狮代表忠义、黑狮代表勇猛。与侧重"形似"的北狮不同，南狮更强调"神似"，讲究"形、神、意、气"的统一，追求展现狮子的精气神。',
      },
    ],
  },
  {
    icon: '竞',
    color: '#C9A96E',
    heading: '体育竞技：从街头戏台到世界赛场',
    intro: '醒狮已发展为一项拥有国际竞赛体系的现代体育项目。',
    items: [
      {
        label: '晋升全运会的里程碑',
        body: '醒狮已被纳入全国运动会的正式比赛项目，这标志着其从民俗表演向官方认可的现代体育竞技的跨越。',
      },
      {
        label: '激烈的国际赛事体系',
        body: '澳门"狮王争霸国际赛"已成为世界三大甲级南狮赛事之一，吸引全球顶尖队伍同台竞技。高桩醒狮是核心竞技项目，狮队在数米高的梅花桩上完成腾跃等高难度动作，极具观赏性。',
      },
    ],
  },
  {
    icon: '桥',
    color: '#C41E24',
    heading: '国际影响：连接世界的文化桥梁',
    intro: '醒狮早已跨越国界，成为中华文化在全球的生动名片和连接全球华人的精神纽带。',
    items: [
      {
        label: '全球华人的精神原乡',
        body: '只要有华人聚居的地方，就有醒狮。它是全球华人同胞的文化母港，是连接海内外华人的精神纽带。',
      },
      {
        label: '响彻世界的中国声音',
        body: '从巴西圣保罗、南非电视台到英国伦敦，醒狮的鼓点和雄姿不断上演。在马来西亚等东南亚国家，醒狮文化更是蓬勃发展，当地醒狮队已成为国际赛场上的劲旅。',
      },
    ],
  },
]

function StatusContent() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <div ref={ref} className="mt-10 space-y-8">
      {/* 装饰分隔线 */}
      <motion.div
        className="flex items-center gap-4"
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.5 }}
      >
        <div className="h-px flex-1" style={{ background: 'linear-gradient(90deg, transparent, #C9A96E)' }} />
        <span className="text-xs tracking-[0.4em] px-4" style={{ fontFamily: 'var(--font-serif)', color: '#C9A96E' }}>
          地位详解
        </span>
        <div className="h-px flex-1" style={{ background: 'linear-gradient(90deg, #C9A96E, transparent)' }} />
      </motion.div>

      {/* 四个板块 */}
      {statusBlocks.map((block, bi) => (
        <motion.div
          key={bi}
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.1 + bi * 0.13, duration: 0.6, ease: 'easeOut' }}
        >
          {/* 标题行 */}
          <div className="flex items-center gap-3 mb-4">
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold"
              style={{ background: block.color, color: '#FAF6F0', fontFamily: 'var(--font-serif)' }}
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

          {/* 板块内容 */}
          <div className="pl-11 space-y-4">
            {/* 简介段落 */}
            {block.intro && (
              <p
                className="text-sm"
                style={{ fontFamily: 'var(--font-sans)', color: '#5A4035', lineHeight: '1.9' }}
              >
                {block.intro}
              </p>
            )}

            {/* 条目列表 */}
            {block.items.map((item, ii) => (
              <motion.div
                key={ii}
                className="flex gap-3"
                initial={{ opacity: 0, x: -12 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.2 + bi * 0.13 + ii * 0.08, duration: 0.5 }}
              >
                <div className="flex flex-col items-center flex-shrink-0 pt-1">
                  <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: block.color }} />
                  {ii < block.items.length - 1 && (
                    <div className="w-px flex-1 mt-1" style={{ background: `${block.color}40`, minHeight: '28px' }} />
                  )}
                </div>
                <div className="flex-1 pb-1">
                  <span
                    className="text-sm font-bold mr-2"
                    style={{ fontFamily: 'var(--font-serif)', color: block.color }}
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

          {/* 板块分隔线 */}
          {bi < statusBlocks.length - 1 && (
            <div
              className="mt-6 h-px"
              style={{ background: 'linear-gradient(90deg, #C9A96E30, #C9A96E60, #C9A96E30)' }}
            />
          )}
        </motion.div>
      ))}

      {/* 数据亮点条 */}
      <motion.div
        className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4 pt-6"
        style={{ borderTop: '1px solid #C9A96E40' }}
        initial={{ opacity: 0, y: 16 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.7, duration: 0.5 }}
      >
        {[
          { num: '2006', label: '列入国家级非遗' },
          { num: '全运', label: '正式竞赛项目' },
          { num: '世界三大', label: '甲级南狮赛事' },
          { num: '全球', label: '华人精神纽带' },
        ].map((stat, i) => (
          <div
            key={i}
            className="flex flex-col items-center p-4 text-center"
            style={{ background: 'rgba(196,30,36,0.04)', border: '1px solid #C9A96E30' }}
          >
            <span
              className="text-xl font-bold mb-1"
              style={{ fontFamily: 'var(--font-serif)', color: '#C41E24' }}
            >
              {stat.num}
            </span>
            <span
              className="text-xs"
              style={{ fontFamily: 'var(--font-sans)', color: '#7A6055' }}
            >
              {stat.label}
            </span>
          </div>
        ))}
      </motion.div>
    </div>
  )
}

// ─── 狮头制作数据 ──────────────────────────────────────────────────────────────

const craftSteps = [
  {
    num: '一',
    char: '扎',
    color: '#C41E24',
    title: '骨架成型，千点定神',
    intro: '这是狮头制作的灵魂所在，也是最考验匠人功力的第一步，关乎狮头最终的"气韵"。',
    items: [
      { label: '精选竹材', body: '首选广东清远或广宁生长3至5年的老桂竹，冬至后采伐，水分少、质地坚韧且不易生虫，再剖成上百根粗细、长短各不相同的篾条。' },
      { label: '开篾与软化', body: '将竹篾剖削至不同规格，关键部位（如主骨架）的篾条需用烛火烤软，以增强韧性使其易于弯曲造型。' },
      { label: '扎成形架', body: '以鼻梁、额头、腮骨主架为起点，用浸湿纱纸条将交叉竹篾扎结固定并刷上浆糊，形成约1300个扎点。精益求精的匠人恪守"额宽额高3:2比例、狮耳对称45度"的严格规范。' },
    ],
  },
  {
    num: '二',
    char: '扑',
    color: '#2C5F7C',
    title: '披纱挂绸，强基固形',
    intro: '骨架扎好后，用纱纸和布料为狮头糊上一层层"皮肤"，使其既坚韧又平整。',
    items: [
      { label: '多层裱糊', body: '在骨架上均匀涂抹特制浆糊，层层裱上纱纸和纱布。传统狮头扑多达六层纱纸，现代工艺常用"两层纱纸＋一层纱布＋一层纱纸"，兼顾强度与轻便。' },
      { label: '精塑五官', body: '从狮头背部、前额等大面积区域开始，再细致处理鼻、角、眼窝等复杂���位。每粘贴一层都要仔细抚平，糊好的狮头置阴凉处自然风干，表皮总厚度通常控制在2毫米以内。' },
    ],
  },
  {
    num: '三',
    char: '写',
    color: '#C9A96E',
    title: '彩笔传神，赋予性格',
    intro: '风干后的素胚将在匠人笔下获得生命。彩绘是赋予狮头独特性格与精神的关键。',
    items: [
      { label: '脸谱化身', body: '岭南狮头汲取了传统粤剧脸谱精髓：黄底刘备狮象征仁义尊贵，红底关羽狮代表忠义胜利，黑底张飞狮寓意勇猛霸气，不同色彩代表不同历史人物及品格。' },
      { label: '刚劲纹样', body: '匠人用毛笔绘制唐草纹（象征繁荣）、虎斑纹（象征辟邪）、火焰纹（装饰感极强）等纹样，线条刚劲有力，色彩对比强烈，层次分明。' },
    ],
  },
  {
    num: '四',
    char: '装',
    color: '#3D2B1F',
    title: '点睛配饰，神形兼备',
    intro: '这是赋予狮头"生命感"的最后一步，通过各种配件的装配，让狮子"活"起来。',
    items: [
      { label: '点睛与动感装配', body: '贴上能灵活转动的活动眼珠并装上眼帘使狮子能够"眨眼"传神；装上能活动的下巴，部分高端狮头还装有让耳朵晃动的"机关"与发声铜铃，使整个狮头随舞动者动作活灵活现。' },
      { label: '华美装饰', body: '额头中央镶嵌代表智慧的铜镜，狮角、狮耳等部位装上色彩各异的绒毛球。最终整个狮头固定在藤圈之上，作为舞狮者的操控把手。' },
    ],
  },
]

const lionColors = [
  {
    name: '黄狮', subtitle: '刘备狮',
    swatch: '#D4A017',
    swatchBorder: '#C9A96E',
    symbol: '仁义帝王',
    patterns: '五彩唐草花纹（五彩刘备面）',
    traits: '仁义、尊贵、祥和、睿智',
    occasion: '大型庆典、迎宾、喜庆节日等正式场合，代表最高礼遇',
    tag: '最高礼遇',
    tagColor: '#C9A96E',
  },
  {
    name: '红狮', subtitle: '关羽狮',
    swatch: '#C41E24',
    swatchBorder: '#C41E24',
    symbol: '忠义胜利',
    patterns: '黑眉黑须，额上"二龙争珠"或"金钱"纹',
    traits: '忠义、勇敢、财富、胜利',
    occasion: '开业庆典、祝寿、竞赛，寓意红红火火、旗开得胜',
    tag: '最常见',
    tagColor: '#C41E24',
  },
  {
    name: '黑狮', subtitle: '张飞狮',
    swatch: '#1A1A1A',
    swatchBorder: '#555',
    symbol: '勇猛霸气',
    patterns: '黑脸黑须，青鼻红额，额绘"火焰"或"八卦"纹',
    traits: '勇猛、好斗、刚烈、辟邪',
    occasion: '打擂、斗狮、驱邪除煞、挑战高难青阵，民间有"黑狮最狠"之说',
    tag: '最霸气',
    tagColor: '#555',
  },
  {
    name: '绿狮', subtitle: '赵子龙狮',
    swatch: '#2D7A4F',
    swatchBorder: '#2D7A4F',
    symbol: '忠勇机智',
    patterns: '翠绿底色配金纹装饰',
    traits: '忠勇、年轻气盛、机智',
    occasion: '竞技或私人喜庆场合，寓意生机勃勃',
    tag: '竞技常见',
    tagColor: '#2D7A4F',
  },
  {
    name: '蓝狮', subtitle: '马超狮',
    swatch: '#2C5F7C',
    swatchBorder: '#2C5F7C',
    symbol: '刚毅沉稳',
    patterns: '深蓝底色，配以银灰色纹饰',
    traits: '刚毅、沉稳、威猛',
    occasion: '竞技或特定武术门派，相对少见',
    tag: '较为少见',
    tagColor: '#2C5F7C',
  },
  {
    name: '白狮', subtitle: '黄忠狮',
    swatch: '#D8D0C0',
    swatchBorder: '#aaa',
    symbol: '沉稳智谋',
    patterns: '银白或灰白底色，配以金色描边',
    traits: '沉稳、智谋、老当益壮',
    occasion: '特定场合，代表黄忠智谋，并非丧事用色，纯白极为罕见',
    tag: '极为罕见',
    tagColor: '#888',
  },
]

function LionHeadContent() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const [activeColor, setActiveColor] = useState<number | null>(null)

  return (
    <div ref={ref} className="mt-10 space-y-14">

      {/* ── 表一：工序流程 ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.5 }}
      >
        {/* 标题行 */}
        <div className="flex items-center gap-4 mb-8">
          <div className="h-px flex-1" style={{ background: 'linear-gradient(90deg, transparent, #C9A96E)' }} />
          <span className="text-xs tracking-[0.4em] px-4 whitespace-nowrap" style={{ fontFamily: 'var(--font-serif)', color: '#C9A96E' }}>
            表一 · 扎作工序
          </span>
          <div className="h-px flex-1" style={{ background: 'linear-gradient(90deg, #C9A96E, transparent)' }} />
        </div>

        {/* 四步流程横向卡片 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {craftSteps.map((step, si) => (
            <motion.div
              key={si}
              className="relative overflow-hidden"
              style={{ border: `1px solid ${step.color}40`, background: 'rgba(250,246,240,0.5)' }}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 + si * 0.12, duration: 0.55, ease: 'easeOut' }}
            >
              {/* 左侧色条 */}
              <div className="absolute left-0 top-0 bottom-0 w-1" style={{ background: step.color }} />

              <div className="pl-6 pr-5 pt-5 pb-5">
                {/* 工序标题 */}
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className="w-10 h-10 flex-shrink-0 flex flex-col items-center justify-center"
                    style={{ background: step.color }}
                  >
                    <span className="text-[10px] leading-none" style={{ color: 'rgba(250,246,240,0.7)', fontFamily: 'var(--font-sans)' }}>
                      工序{step.num}
                    </span>
                    <span className="text-xl leading-none font-bold" style={{ color: '#FAF6F0', fontFamily: 'var(--font-serif)' }}>
                      {step.char}
                    </span>
                  </div>
                  <div>
                    <h4 className="text-base font-bold" style={{ fontFamily: 'var(--font-serif)', color: '#3D2B1F' }}>
                      {step.title}
                    </h4>
                    <p className="text-xs mt-0.5" style={{ fontFamily: 'var(--font-sans)', color: '#9A7A6A' }}>
                      {step.intro}
                    </p>
                  </div>
                </div>

                {/* 条目 */}
                <div className="space-y-3">
                  {step.items.map((item, ii) => (
                    <motion.div
                      key={ii}
                      className="flex gap-3"
                      initial={{ opacity: 0, x: -10 }}
                      animate={inView ? { opacity: 1, x: 0 } : {}}
                      transition={{ delay: 0.2 + si * 0.12 + ii * 0.07, duration: 0.45 }}
                    >
                      <div className="flex flex-col items-center flex-shrink-0 pt-1">
                        <div className="w-1.5 h-1.5 rounded-full" style={{ background: step.color }} />
                        {ii < step.items.length - 1 && (
                          <div className="w-px flex-1 mt-1" style={{ background: `${step.color}35`, minHeight: '20px' }} />
                        )}
                      </div>
                      <div>
                        <span className="text-sm font-bold mr-1.5" style={{ fontFamily: 'var(--font-serif)', color: step.color }}>
                          {item.label}
                        </span>
                        <span className="text-sm" style={{ fontFamily: 'var(--font-sans)', color: '#5A4035', lineHeight: '1.85' }}>
                          {item.body}
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* 流派对比小条 */}
        <motion.div
          className="mt-6 p-4 flex flex-col sm:flex-row gap-4"
          style={{ background: '#3D2B1F', border: '1px solid #C9A96E40' }}
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.65, duration: 0.45 }}
        >
          <div className="flex-1">
            <span className="text-xs tracking-widest block mb-1" style={{ fontFamily: 'var(--font-serif)', color: '#C9A96E' }}>佛山狮（硬派）</span>
            <p className="text-sm" style={{ fontFamily: 'var(--font-sans)', color: 'rgba(250,246,240,0.75)' }}>
              狮头圆、口阔，造型威武霸气，眼大明亮，大开大合——霸气外露的硬派代表。
            </p>
          </div>
          <div className="w-px hidden sm:block" style={{ background: '#C9A96E40' }} />
          <div className="flex-1">
            <span className="text-xs tracking-widest block mb-1" style={{ fontFamily: 'var(--font-serif)', color: '#C9A96E' }}>鹤山狮（灵巧派）</span>
            <p className="text-sm" style={{ fontFamily: 'var(--font-sans)', color: 'rgba(250,246,240,0.75)' }}>
              狮头较扁而长，最具标志性的是像青蛙一样的"蛤乸嘴"，显得灵巧机敏，栩栩如生。
            </p>
          </div>
        </motion.div>
      </motion.div>

      {/* ── 表二：颜色选择 ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        {/* 标题行 */}
        <div className="flex items-center gap-4 mb-8">
          <div className="h-px flex-1" style={{ background: 'linear-gradient(90deg, transparent, #C9A96E)' }} />
          <span className="text-xs tracking-[0.4em] px-4 whitespace-nowrap" style={{ fontFamily: 'var(--font-serif)', color: '#C9A96E' }}>
            表二 · 颜色与性格
          </span>
          <div className="h-px flex-1" style={{ background: 'linear-gradient(90deg, #C9A96E, transparent)' }} />
        </div>

        {/* 色块网格 */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
          {lionColors.map((lc, ci) => (
            <motion.button
              key={ci}
              onClick={() => setActiveColor(activeColor === ci ? null : ci)}
              className="text-left relative overflow-hidden transition-all duration-300 focus:outline-none group"
              style={{
                border: activeColor === ci ? `2px solid ${lc.swatch}` : '1px solid rgba(201,169,110,0.3)',
                background: activeColor === ci ? `${lc.swatch}12` : 'rgba(250,246,240,0.5)',
              }}
              initial={{ opacity: 0, scale: 0.92 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.35 + ci * 0.08, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -3 }}
            >
              {/* 顶部色条 */}
              <div className="h-1.5 w-full" style={{ background: lc.swatch }} />

              <div className="p-4">
                {/* 色块 + 名称 */}
                <div className="flex items-center gap-3 mb-3">
                  <div
                    className="w-9 h-9 rounded-full flex-shrink-0"
                    style={{
                      background: lc.swatch,
                      border: `2px solid ${lc.swatchBorder}`,
                      boxShadow: `0 2px 8px ${lc.swatch}50`,
                    }}
                  />
                  <div>
                    <div className="font-bold text-sm" style={{ fontFamily: 'var(--font-serif)', color: '#3D2B1F' }}>
                      {lc.name}
                    </div>
                    <div className="text-xs" style={{ fontFamily: 'var(--font-sans)', color: '#9A7A6A' }}>
                      {lc.subtitle}
                    </div>
                  </div>
                  <span
                    className="ml-auto text-[10px] px-2 py-0.5 whitespace-nowrap"
                    style={{
                      fontFamily: 'var(--font-sans)',
                      color: lc.tagColor,
                      border: `1px solid ${lc.tagColor}60`,
                      background: `${lc.tagColor}10`,
                    }}
                  >
                    {lc.tag}
                  </span>
                </div>

                {/* 象征 */}
                <div className="text-xs font-bold mb-2" style={{ fontFamily: 'var(--font-serif)', color: lc.swatch === '#1A1A1A' ? '#666' : lc.swatch }}>
                  {lc.symbol}
                </div>

                {/* 展开详情 */}
                <AnimatePresence>
                  {activeColor === ci && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                      style={{ overflow: 'hidden' }}
                    >
                      <div className="pt-3 space-y-2" style={{ borderTop: `1px solid ${lc.swatch}30` }}>
                        <div>
                          <span className="text-[10px] tracking-wider" style={{ fontFamily: 'var(--font-sans)', color: '#C9A96E' }}>脸谱纹样</span>
                          <p className="text-xs mt-0.5" style={{ fontFamily: 'var(--font-sans)', color: '#5A4035', lineHeight: '1.7' }}>{lc.patterns}</p>
                        </div>
                        <div>
                          <span className="text-[10px] tracking-wider" style={{ fontFamily: 'var(--font-sans)', color: '#C9A96E' }}>性格象征</span>
                          <p className="text-xs mt-0.5" style={{ fontFamily: 'var(--font-sans)', color: '#5A4035', lineHeight: '1.7' }}>{lc.traits}</p>
                        </div>
                        <div>
                          <span className="text-[10px] tracking-wider" style={{ fontFamily: 'var(--font-sans)', color: '#C9A96E' }}>使用场合</span>
                          <p className="text-xs mt-0.5" style={{ fontFamily: 'var(--font-sans)', color: '#5A4035', lineHeight: '1.7' }}>{lc.occasion}</p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* 点击提示 */}
                {activeColor !== ci && (
                  <p className="text-[10px] mt-1 opacity-50" style={{ fontFamily: 'var(--font-sans)', color: '#9A7A6A' }}>
                    点击查看详情
                  </p>
                )}
              </div>
            </motion.button>
          ))}
        </div>

        {/* 色彩规律结语 */}
        <motion.div
          className="p-5 border-l-2"
          style={{ borderColor: '#C9A96E', background: 'rgba(201,169,110,0.06)' }}
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.85, duration: 0.45 }}
        >
          <p className="text-xs tracking-widest mb-2" style={{ fontFamily: 'var(--font-serif)', color: '#C9A96E' }}>色彩搭配的规律</p>
          <p className="text-sm" style={{ fontFamily: 'var(--font-sans)', color: '#5A4035', lineHeight: '1.9' }}>
            主色决定角色——狮头的主体颜色决定了其扮演的基本人物和性格底色。大部分狮头无论主色，额顶都会镶嵌<strong style={{ color: '#C41E24' }}>明镜</strong>（代表"照妖镜"或智慧），并配以金色、银色或彩色的绒球、流苏增加华丽感。现代竞技或文创中经常出现粉、紫、靛蓝等非传统色，但文化核心仍以<strong style={{ color: '#C41E24' }}>红、黄、黑、绿、蓝</strong>五大正色为基础。
          </p>
          <p className="text-sm mt-3 italic" style={{ fontFamily: 'var(--font-serif)', color: '#7A5A4A' }}>
            选择什么颜色的狮头，就是选择一种"性格"和"气场"。
          </p>
        </motion.div>
      </motion.div>

    </div>
  )
}

// ─── 技法数据 ────────────────────────────────────────────────────────────────

const eightStates = ['喜', '怒', '哀', '乐', '动', '静', '惊', '疑']

const techniqueBlocks = [
  {
    icon: '武',
    color: '#C41E24',
    heading: '武术根基：所有动作之源',
    intro: '所谓"无武不成狮"，醒狮的所有步法均来源于南派武术，舞狮人须先习武，以扎马步为最基本要求。',
    items: [
      {
        label: '千变万化的步法',
        body: '基本功是南派拳法的马步，实际表演中运用到的步法非常多样，包括马步、弓步、开合步、麒麟步、虚步、吊步、金鸡独立步等，在高空梅花桩上尤需稳健重心。',
      },
      {
        label: '器械协同要求',
        body: '舞狮头者要求"硬桥硬马，两手直托狮头"；舞狮尾者需熟练弯腰踢腿技巧。两人配合默契，协同一体，是醒狮表演的核心要求。',
      },
    ],
  },
  {
    icon: '态',
    color: '#2C5F7C',
    heading: '狮型八态：讲故事的肢体语言',
    intro: '醒狮表演的核心在于"演"活一头狮子。与侧重"形似"的北狮不同，南狮更强调"神似"，具体体现在对狮子"八态"的模拟上。',
    items: [
      {
        label: '具体细节动作',
        body: '通过"睁眼"、"洗须"、"舔身"、"抖毛"等一系列细节动作，结合八种神态，活灵活现地呈现狮子的各种情绪与状态，追求"形、神、意、气"的统一。',
      },
    ],
  },
  {
    icon: '青',
    color: '#C9A96E',
    heading: '采青：一场完整的戏剧',
    intro: '"采青"是醒狮表演最高潮的核心环节，整个过程构成一出有头有尾的微型戏剧，极大考验表演者的艺术能力。"青"通常由生菜（取"生财"之意）和红包组成，代表吉祥与财富。',
    items: [
      {
        label: '程式化五步流程',
        body: '起势出洞（狮子从沉睡中醒来巡视）→ 探桩上桩（试青/疑青/惊青）→ 采青食青（以高难度动作采摘）→ 碎青吐青（咬碎散播吉祥）→ 回洞收式（醉态尽显完成收尾）。',
      },
      {
        label: '多样的青阵',
        body: '高青：将"青"高悬，需叠罗汉或爬高竿；地青：放置地面，有水青、蟹青、八卦青等；中阵青：摆设阵法将"青"置于其中，增加难度与观赏性。',
      },
    ],
  },
  {
    icon: '派',
    color: '#3D2B1F',
    heading: '流派风格：佛山狮与鹤山狮',
    intro: '岭南醒狮在发展过程中，形成了两大流派，在步法和风格上各有千秋。',
    items: [
      {
        label: '佛山狮（硬派）',
        body: '硬桥硬马，声势雄壮，动作大开大合，彰显威猛与力量。主要以扎实稳健的南拳大马步为基础，是传统南派狮艺的代表。',
      },
      {
        label: '鹤山狮（灵巧派）',
        body: '灵巧活泼，情态可人，表演细腻，注重将狮的雄威与猫的活泼结合。晚清广东狮王冯庚长独创"狮型猫步"，步法轻巧灵动，变化多端。',
      },
    ],
  },
  {
    icon: '鼓',
    color: '#C41E24',
    heading: '鼓乐：醒狮的灵魂指挥',
    intro: '鼓乐不仅是伴奏，更是表演的"总指挥"。鼓声的轻重缓急直接影响着狮子的情绪和行为。',
    items: [
      {
        label: '鼓谱节拍',
        body: '南狮的敲打节拍以"三声"（三星鼓）和"七声"（七星鼓）为主，打法随表演状态而变化，包括"走路鼓"、"行狮"、"抛狮"、"咬七星"等不同节奏。',
      },
      {
        label: '乐器配置',
        body: '整个鼓乐队由鼓、锣、钹等乐器组成，以鼓为核心指挥全局。锣鼓铿锵有力，是醒狮表演不可分割的灵魂组成部分。',
      },
    ],
  },
]

function TechniqueContent() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <div ref={ref} className="mt-10 space-y-8">
      {/* 装饰分隔线 */}
      <motion.div
        className="flex items-center gap-4"
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.5 }}
      >
        <div className="h-px flex-1" style={{ background: 'linear-gradient(90deg, transparent, #C9A96E)' }} />
        <span className="text-xs tracking-[0.4em] px-4" style={{ fontFamily: 'var(--font-serif)', color: '#C9A96E' }}>
          技法详解
        </span>
        <div className="h-px flex-1" style={{ background: 'linear-gradient(90deg, #C9A96E, transparent)' }} />
      </motion.div>

      {/* 狮型八态可视化标签组 */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.1, duration: 0.5 }}
        className="p-5"
        style={{ border: '1px solid #C9A96E40', background: 'rgba(196,30,36,0.03)' }}
      >
        <p
          className="text-xs tracking-[0.3em] mb-4 text-center"
          style={{ fontFamily: 'var(--font-serif)', color: '#C9A96E' }}
        >
          狮型八态 · 神似为上
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          {eightStates.map((state, i) => (
            <motion.div
              key={state}
              className="w-12 h-12 flex items-center justify-center text-lg font-bold cursor-default select-none"
              style={{
                fontFamily: 'var(--font-serif)',
                color: '#FAF6F0',
                background: i % 2 === 0 ? '#C41E24' : '#3D2B1F',
                border: `1px solid ${i % 2 === 0 ? '#C41E24' : '#C9A96E'}`,
              }}
              initial={{ opacity: 0, scale: 0.6 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.15 + i * 0.06, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ scale: 1.15, zIndex: 10 }}
            >
              {state}
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* 五大技法板块 */}
      {techniqueBlocks.map((block, bi) => (
        <motion.div
          key={bi}
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2 + bi * 0.12, duration: 0.6, ease: 'easeOut' }}
        >
          {/* 标题行 */}
          <div className="flex items-center gap-3 mb-4">
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold"
              style={{ background: block.color, color: '#FAF6F0', fontFamily: 'var(--font-serif)' }}
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

          <div className="pl-11 space-y-4">
            {/* 简介 */}
            <p
              className="text-sm"
              style={{ fontFamily: 'var(--font-sans)', color: '#5A4035', lineHeight: '1.9' }}
            >
              {block.intro}
            </p>

            {/* 条目列表 */}
            {block.items.map((item, ii) => (
              <motion.div
                key={ii}
                className="flex gap-3"
                initial={{ opacity: 0, x: -12 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.25 + bi * 0.12 + ii * 0.08, duration: 0.5 }}
              >
                <div className="flex flex-col items-center flex-shrink-0 pt-1">
                  <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: block.color }} />
                  {ii < block.items.length - 1 && (
                    <div className="w-px flex-1 mt-1" style={{ background: `${block.color}40`, minHeight: '28px' }} />
                  )}
                </div>
                <div className="flex-1 pb-1">
                  <span
                    className="text-sm font-bold mr-2"
                    style={{ fontFamily: 'var(--font-serif)', color: block.color }}
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

          {bi < techniqueBlocks.length - 1 && (
            <div
              className="mt-6 h-px"
              style={{ background: 'linear-gradient(90deg, #C9A96E30, #C9A96E60, #C9A96E30)' }}
            />
          )}
        </motion.div>
      ))}

      {/* 流派对照表 */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.85, duration: 0.5 }}
        className="mt-4 overflow-x-auto"
      >
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr style={{ background: '#3D2B1F' }}>
              <th
                className="px-4 py-3 text-left font-bold tracking-widest"
                style={{ fontFamily: 'var(--font-serif)', color: '#C9A96E', border: '1px solid #C9A96E40' }}
              >
                流派
              </th>
              <th
                className="px-4 py-3 text-left font-bold tracking-widest"
                style={{ fontFamily: 'var(--font-serif)', color: '#C9A96E', border: '1px solid #C9A96E40' }}
              >
                风格特点
              </th>
              <th
                className="px-4 py-3 text-left font-bold tracking-widest"
                style={{ fontFamily: 'var(--font-serif)', color: '#C9A96E', border: '1px solid #C9A96E40' }}
              >
                核心步法
              </th>
            </tr>
          </thead>
          <tbody>
            {[
              { name: '佛山狮', style: '硬桥硬马，声势雄壮，动作大开大合，彰显威猛与力量', step: '南拳大马步' },
              { name: '鹤山狮', style: '灵巧活泼，情态可人，将狮的雄威与猫的活泼结合', step: '狮型猫步' },
            ].map((row, i) => (
              <tr
                key={i}
                style={{ background: i % 2 === 0 ? 'rgba(196,30,36,0.04)' : 'rgba(250,246,240,0.6)' }}
              >
                <td
                  className="px-4 py-3 font-bold"
                  style={{ fontFamily: 'var(--font-serif)', color: '#C41E24', border: '1px solid #C9A96E30' }}
                >
                  {row.name}
                </td>
                <td
                  className="px-4 py-3"
                  style={{ fontFamily: 'var(--font-sans)', color: '#5A4035', border: '1px solid #C9A96E30' }}
                >
                  {row.style}
                </td>
                <td
                  className="px-4 py-3 font-bold"
                  style={{ fontFamily: 'var(--font-serif)', color: '#2C5F7C', border: '1px solid #C9A96E30' }}
                >
                  {row.step}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </motion.div>

      {/* 总结引用 */}
      <motion.div
        className="p-5 border-l-2"
        style={{ borderColor: '#C9A96E', background: 'rgba(201,169,110,0.06)' }}
        initial={{ opacity: 0, y: 12 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 1.0, duration: 0.5 }}
      >
        <p
          className="text-sm italic"
          style={{ fontFamily: 'var(--font-serif)', color: '#5A4035', lineHeight: '2' }}
        >
          醒狮技艺的最高境界，便是将深厚的<strong style={{ color: '#C41E24' }}>武术功底</strong>、生动的<strong style={{ color: '#C41E24' }}>故事演绎</strong>与激昂的<strong style={{ color: '#C41E24' }}>鼓乐指挥</strong>完美融合，最终在赛场上呈现惊险的高桩竞技。举世知名的黄飞鸿醒狮队，正是将三者结合得最出神入化的代表之一。
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
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
                    <Link
                      href={`/culture/${activeTab}?item=${i}`}
                      className="text-sm transition-colors duration-200 group/link flex items-center gap-1"
                      style={{ fontFamily: 'var(--font-sans)', color: '#5A4035' }}
                    >
                      <span className="group-hover/link:underline group-hover/link:decoration-[#C41E24] underline-offset-2">
                        {detail}
                      </span>
                      <svg
                        width="10"
                        height="10"
                        viewBox="0 0 10 10"
                        fill="none"
                        className="opacity-0 group-hover/link:opacity-100 transition-opacity flex-shrink-0"
                        aria-hidden="true"
                      >
                        <path d="M2 8 L8 2 M4 2 L8 2 L8 6" stroke="#C41E24" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </Link>
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

        {/* 地位详解 — 仅在地位标签显示 */}
        <AnimatePresence>
          {activeTab === 'status' && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.5, ease: 'easeInOut' }}
              style={{ overflow: 'hidden' }}
            >
              <StatusContent />
            </motion.div>
          )}
        </AnimatePresence>

        {/* 技法详解 — 仅在技法标签显示 */}
        <AnimatePresence>
          {activeTab === 'technique' && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.5, ease: 'easeInOut' }}
              style={{ overflow: 'hidden' }}
            >
              <TechniqueContent />
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

// ─── 独立狮头制作板块 ──────────────────────────────────────────────────────────

export function LionHeadSection() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section
      id="lionhead"
      ref={ref}
      className="relative py-20 md:py-28 overflow-hidden"
      style={{ background: '#FAF6F0' }}
    >
      {/* 宣纸纹理暗纹 */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M50 10 Q60 5 70 15 Q80 5 90 15 Q85 25 80 20 Q70 30 60 20 Q55 30 50 25 Q45 30 40 20 Q30 30 20 20 Q15 25 10 15 Q20 5 30 15 Q40 5 50 10Z' fill='%23C41E24'/%3E%3C/svg%3E")`,
          backgroundSize: '200px 200px',
        }}
      />
      {/* 超大水印字 */}
      <div
        className="absolute right-0 top-1/2 -translate-y-1/2 select-none pointer-events-none"
        style={{
          fontSize: 'clamp(160px, 22vw, 320px)',
          fontFamily: 'var(--font-serif)',
          color: 'rgba(196,30,36,0.04)',
          lineHeight: 1,
          userSelect: 'none',
        }}
        aria-hidden="true"
      >
        扎
      </div>

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
        {/* 板块标题 */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          {/* 祥云装饰线 */}
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="h-px w-16" style={{ background: 'linear-gradient(90deg, transparent, #C9A96E)' }} />
            <svg width="28" height="14" viewBox="0 0 56 28" fill="none" aria-hidden="true">
              <path d="M4 14 Q8 6 14 10 Q16 4 22 8 Q24 2 28 6 Q32 2 34 8 Q40 4 42 10 Q48 6 52 14 Q48 22 42 18 Q40 24 34 20 Q32 26 28 22 Q24 26 22 20 Q16 24 14 18 Q8 22 4 14Z" fill="#C9A96E" opacity="0.5"/>
            </svg>
            <div className="h-px w-16" style={{ background: 'linear-gradient(90deg, #C9A96E, transparent)' }} />
          </div>
          <p className="text-xs tracking-[0.5em] mb-3" style={{ fontFamily: 'var(--font-sans)', color: '#C9A96E' }}>
            LION HEAD CRAFT · 非遗工艺
          </p>
          <h2
            className="text-3xl md:text-4xl font-bold text-balance"
            style={{ fontFamily: 'var(--font-serif)', color: '#3D2B1F' }}
          >
            扎·扑·写·装
          </h2>
          <p className="mt-3 text-base" style={{ fontFamily: 'var(--font-sans)', color: '#7A6055' }}>
            狮头制作四道工序
          </p>
          <div className="flex items-center justify-center gap-4 mt-4">
            <div className="h-px w-16" style={{ background: 'linear-gradient(90deg, transparent, #C41E24)' }} />
            <div className="w-1.5 h-1.5 rotate-45" style={{ background: '#C41E24' }} />
            <div className="h-px w-16" style={{ background: 'linear-gradient(90deg, #C41E24, transparent)' }} />
          </div>
        </motion.div>

        {/* LionHeadContent 内容 */}
        <LionHeadContent />
      </div>
    </section>
  )
}
