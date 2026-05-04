import { notFound } from 'next/navigation'
import Link from 'next/link'
import type { Metadata } from 'next'

// ─── 数据 ─────────────────────────────────────────────────────────────────────

const pages: Record<string, {
  title: string
  subtitle: string
  heroImage: string
  heroAlt: string
  accentColor: string
  sections: {
    heading: string
    icon: string
    items: { label: string; body: string }[]
  }[]
  closing?: string
}> = {
  history: {
    title: '醒狮简史',
    subtitle: 'History of Lion Dance',
    heroImage: '/images/lion-history-1.jpg',
    heroAlt: '岭南醒狮在传统祠堂前表演，地面铺满爆竹碎屑，烟雾弥漫',
    accentColor: '#C41E24',
    sections: [
      {
        heading: '唐代起源与南传',
        icon: '唐',
        items: [
          {
            label: '太平乐——宫廷的荣耀',
            body: '醒狮最早的源头可追溯到唐代宫廷的《太平乐》，又称《五方狮子舞》。这是一种规模宏大、妆造华丽的宫廷庆典，专为皇室雅乐所设，象征着天下太平、四方归附的盛世气象。',
          },
          {
            label: '南迁的文化种子',
            body: '五代十国时期，北方战乱频仍，大批中原士民被迫南迁。这场历史性的人口流动，将舞狮习俗作为文化基因一同带入岭南地区，为后来醒狮在广东的落地生根埋下了伏笔。',
          },
        ],
      },
      {
        heading: '明代成型与民间传说',
        icon: '明',
        items: [
          {
            label: '佛山：醒狮的摇篮',
            body: '明代起，醒狮在广东南海县（今佛山一带）逐渐成形并流传至民间。此地商贾云集、武风鼎盛，成为孕育这门综合艺术的最佳土壤。',
          },
          {
            label: '驱"年兽"的民间传说',
            body: '相传明代佛山曾出现专吃农作物与禽畜的"独角怪兽"，乡民按照神兽的样子扎狮头，配以锣鼓之声将其驱走。此后这种仪式遂演变为岭南春节驱邪避害的民间习俗，代代相传，历久弥新。',
          },
        ],
      },
      {
        heading: '清代"狮武合一"与流派',
        icon: '清',
        items: [
          {
            label: '禁武令下的民间智慧',
            body: '清代官方推行"禁教抑武"政策，民间习武群体便将南派武术技法融于舞狮身法之中，以艺掩武，形成了"狮武合一"的独特传统，使醒狮的动作充满力量感与武术功架。',
          },
          {
            label: '两大流派的诞生',
            body: '在这一时期，岭南醒狮形成了两大代表性流派：以佛山狮（硬派）为代表的传统南派狮艺，风格雄壮刚猛；晚清广东狮王冯庚长在佛山狮基础上独创以"狮型猫步"著称的鹤山狮（灵巧派），动作轻盈细腻，各具风格，共同构成醒狮艺术的丰富生态。',
          },
        ],
      },
      {
        heading: '近代民族觉醒',
        icon: '醒',
        items: [
          {
            label: '一字之改，意蕴千钧',
            body: '清末民初，面对西方列强的入侵与民族危机的深重，"瑞"与"睡"在粤语中谐音的文化契机被知识分子巧妙利用。革命宣传家将传统"瑞狮"改名"醒狮"，借此唤醒国民的民族精神，意寓中华民族这头"睡狮"已然觉醒，奋然而起。',
          },
          {
            label: '文化符号的政治转型',
            body: '这一命名转变，使醒狮从单纯的民俗活动，一跃成为具有深刻政治内涵和民族情感的文化符号。它不再只是节庆的点缀，而成为时代精神的凝聚与表达。',
          },
        ],
      },
      {
        heading: '建国后的起伏与非遗时代',
        icon: '兴',
        items: [
          {
            label: '纳入体育，文革沉寂',
            body: '中华人民共和国成立后，醒狮被纳入群众体育项目，获得官方认可与推广。然而文化大革命期间，醒狮作为"封建糟粕"遭到批判，一度陷入沉寂。',
          },
          {
            label: '改革开放后的复兴',
            body: '改革开放的春风吹散了阴霾，醒狮迅速复兴并随华人移民传播至海外，在东南亚、北美、欧洲各地华人聚居区广泛扎根。2006年，广东醒狮被正式列入首批国家级非物质文化遗产名录，一跃成为粤港澳大湾区的文化标志，从传统民俗正式晋升为国家级文化名片。',
          },
        ],
      },
      {
        heading: '当代发展与创新',
        icon: '新',
        items: [
          {
            label: '跨界融合的文化IP',
            body: '如今，醒狮已从单纯的传统节庆活动，演变为与流行文化产业紧密结合的文化IP。它频繁出现在电影、游戏、演唱会等现场，以当代审美重新诠释传统，吸引了大量年轻受众。',
          },
          {
            label: '数字化赋能与高桩竞技',
            body: '通过AI、AR等数字化手段，醒狮的传播方式不断创新，进一步扩大了文化影响力。与此同时，高桩竞技——表演者在数米高的梅花桩上完成腾跃等高难度动作——已成为最具看点的当代表演形式，将传统技艺推向新的竞技高度。',
          },
        ],
      },
    ],
    closing: '岭南醒狮，一路走来，历经千年沧桑。它承载着宫廷的雍容、民间的活力、武术的刚猛与民族的魂魄，在时代的浪潮中一次次"醒"来，始终与人民同呼吸、共命运。',
  },

  origin: {
    title: '醒狮起源',
    subtitle: 'Origins of Lion Dance',
    heroImage: '/images/lion-origin.jpg',
    heroAlt: '金色与红色醒狮在岭南古建筑前共同表演，色彩热烈，气氛浓郁',
    accentColor: '#2C5F7C',
    sections: [
      {
        heading: '源流演变：从中原到岭南',
        icon: '源',
        items: [
          {
            label: '滥觞于宫廷——太平乐',
            body: '醒狮最早的源头，可以追溯到唐代宫廷的《太平乐》（也称《五方狮子舞》）。这是一种规模宏大、妆造华丽的宫廷庆典，以五方神狮象征东西南北中，专为皇室祈福所设，是宫廷雅乐中的重要仪典。',
          },
          {
            label: '南传与本土化',
            body: '五代十国时期，随着中原移民大量南迁，这种宫廷乐舞也随之传入岭南。与当地独特的地域文化、民间信仰和节庆习俗融合，逐渐世俗化，从庙堂走向民间，扎根在珠江流域的土地上。',
          },
          {
            label: '"狮武合一"的形成',
            body: '到了清代，因官方"禁教抑武"政策的压制，民间的习武群体便将南派武术技法悄然融入舞狮的身段与步法之中，形成了"狮武合一"的传统，使醒狮的每一个动作都蕴含着力量与功架之美。',
          },
        ],
      },
      {
        heading: '民间传说：明代佛山驱"年兽"',
        icon: '传',
        items: [
          {
            label: '年兽为祸佛山',
            body: '明朝初年，广东佛山一带流传着这样一个故事：当地出现了一只名为"年兽"（或"连兽"）的独角怪兽，形貌凶恶，时常出没于村落之间，糟蹋庄稼，侵扰牲畜，令百姓苦不堪言，惶惶不可终日。',
          },
          {
            label: '扎狮驱怪，一鸣惊人',
            body: '走投无路的乡民们决定以其道还治其身。他们用竹篾扎骨架，以彩布蒙面，制成凶猛的狮头狮身，模仿传说中更为强大的神兽。众人抬着狮头，在周边大力敲锣打鼓，声势震天，成功将怪兽吓跑，再未出现。',
          },
          {
            label: '沿习成俗，代代相传',
            body: '此后，人们便将这次"驱兽"的经历口口相传，并约定成俗：每逢年节喜庆，必舞狮以驱邪纳吉，保一方平安。这个充满生活智慧的民间传说，至今仍是解释岭南醒狮民俗由来最广为人知的故事。',
          },
        ],
      },
      {
        heading: '点睛之笔：从"瑞狮"到"醒狮"',
        icon: '醒',
        items: [
          {
            label: '古称"瑞狮"的吉祥内涵',
            body: '在很长一段历史时期内，南方的这种狮舞因其驱邪迎祥的美好寓意，一直被称为"瑞狮"，与"祥瑞"、"瑞兆"相关联，是民间喜庆文化的重要组成部分。',
          },
          {
            label: '历史赋予的时代重命',
            body: '清末民初，面对列强环伺的民族危机，一批有识之士发现"瑞"在粤语中与"睡"谐音，这个文字的巧合成为了历史的契机。革命宣传家和知识分子将"瑞狮"正式改称"醒狮"，以唤醒民众沉睡的民族意识，鼓励国人奋起抗争。',
          },
          {
            label: '层叠的历史积淀',
            body: '因此，岭南醒狮的"起源"并非一个单一的起点，而是一个层层叠加、不断演化的过程：它发端于唐代宫廷，在明代佛山壮大成形，在清代融入了武术的筋骨，最终在近代被赋予了唤醒民族精神的深刻内涵。',
          },
        ],
      },
    ],
    closing: '每一头腾跃而起的醒狮，都是历史积淀与时代精神的共鸣。从宫廷到民间，从镇妖驱邪到唤醒国魂，这段跨越千年的起源故事，正是岭南醒狮最深沉的文化根脉。',
  },

  status: {
    title: '醒狮地位',
    subtitle: 'Cultural Status of Lion Dance',
    heroImage: '/images/lion-status.jpg',
    heroAlt: '橙色与黑红色醒狮同台表演，背景为岭南青砖街道，气氛热烈',
    accentColor: '#C41E24',
    sections: [
      {
        heading: '国家认证：非遗名录上的明珠',
        icon: '证',
        items: [
          {
            label: '2006年——历史性的认定',
            body: '2006年，广东醒狮被列入第一批国家级非物质文化遗产名录。这份来自国家层面的正式认可，不仅确认了醒狮作为中华优秀传统文化的核心地位，也标志着它从地方民俗向国家文化名片的历史性转型，开启了新的保护与传承时代。',
          },
          {
            label: '多地协同，共护非遗',
            body: '目前，佛山、广州、东莞、珠海等多个广东地市的醒狮项目均已获得不同级别的非遗认定，形成了层级分明、覆盖广泛的保护体系。粤港澳大湾区更将醒狮列为区域文化标志，协同推进其传承与国际传播。',
          },
        ],
      },
      {
        heading: '文化象征：一个"醒"字的精神灌注',
        icon: '魂',
        items: [
          {
            label: '历史赋予的民族觉醒之魂',
            body: '"醒狮"二字，本身就是对岭南乃至中华民族精神的绝妙提炼。这一命名诞生于清末民初的民族危机之中，有识之士借用"睡狮"的比喻，将"醒"字赋予舞狮，使其承载了唤醒民族自觉、鼓舞国人奋起的时代精神，成为近代民族主义话语中的重要意象。',
          },
          {
            label: '狮头颜色的角色语言',
            body: '在艺术风格上，醒狮建立了一套完整的角色符号体系：黄狮代表仁义温厚，红狮代表忠义豪迈，黑狮代表勇猛刚烈，各有其独特的性格与气质。与侧重"形似"的北狮不同，南狮更强调"神似"，讲究"形、神、意、气"的统一，追求展现狮子内在的精气神与生命力。',
          },
        ],
      },
      {
        heading: '体育竞技：从街头戏台到世界赛场',
        icon: '竞',
        items: [
          {
            label: '晋升全运会的历史里程碑',
            body: '醒狮已被正式纳入全国运动会的竞赛项目，这是其从民俗表演向官方认可的现代体育竞技项目跨越的重要标志，也是中国体育界对这一传统技艺当代活力的高度肯定。',
          },
          {
            label: '激烈的国际赛事体系',
            body: '在国际赛场上，醒狮已拥有成熟的竞技体系。澳门举办的"狮王争霸国际赛"是公认的世界三大甲级南狮赛事之一，每年吸引来自中国大陆、香港、澳门、马来西亚、新加坡等地的顶尖队伍同台竞技。其中，高桩醒狮是最核心的竞技项目，参赛者需在数米高的梅花桩上完成一系列腾跃、平衡等高难度动作，惊险刺激，极具观赏性。',
          },
        ],
      },
      {
        heading: '国际影响：连接世界的文化桥梁',
        icon: '桥',
        items: [
          {
            label: '全球华人的精神原乡',
            body: '醒狮早已跨越国界，成为中华文化在全球最生动的名片之一。只要有华人聚居的地方，便有醒狮的鼓声。它是连接海内外华人同胞共同情感的精神纽带，无论身处世界哪个角落，那一声铿锵的锣鼓都能唤起深藏心底的文化认同与家国情怀。',
          },
          {
            label: '响彻世界的中国声音',
            body: '从巴西圣保罗的中国城、南非的电视荧屏，到英国伦敦的唐人街庆典，醒狮的雄姿已在五大洲留下足迹。在马来西亚、新加坡等东南亚国家，醒狮文化更是蓬勃发展，当地醒狮队在训练条件、竞技水准等方面已达到世界顶级，成为国际赛场上令人瞩目的劲旅。',
          },
        ],
      },
    ],
    closing: '从一方乡土的节庆习俗，到国家认证的文化名片，再到连接全球华人的精神纽带——醒狮的每一步跨越，都是中华文化生命力的有力证明。',
  },

  technique: {
    title: '醒狮技法',
    subtitle: 'Techniques of Lion Dance',
    heroImage: '/images/lion-technique.jpg',
    heroAlt: '金黄色醒狮站立于梅花桩顶，展示高桩采青技艺，背景为深色树丛',
    accentColor: '#C9A96E',
    sections: [
      {
        heading: '武术根基：所有动作之源',
        icon: '武',
        items: [
          {
            label: '"无武不成狮"的根本要求',
            body: '所谓"无武不成狮"，是对醒狮技艺最精辟的概括。醒狮的所有步法均直接来源于南派武术，尤其是以广东南拳为核心的武术体系。舞狮人在学狮之前，必须先习武，以扎马步为最基本的入门功夫，非数年苦功不能入门。',
          },
          {
            label: '千变万化的步法体系',
            body: '实际表演中，醒狮运用到的步法极为多样，包括：扎马步（最基础）、弓步、开合步、麒麟步、虚步、吊步、金鸡独立步等。在高空梅花桩上表演时，对重心控制和步法稳健的要求更是达到极致，一步之差便可能导致严重失误。',
          },
          {
            label: '舞狮头与舞狮尾的协同艺术',
            body: '醒狮由两人配合完成，分工明确而要求严苛。舞狮头者须"硬桥硬马，两手直托狮头"，力量与耐力缺一不可；舞狮尾者则需熟练掌握各类弯腰踢腿技巧，同时与狮头保持高度默契。二人如同一体，配合的流畅程度直接决定表演的艺术水准。',
          },
        ],
      },
      {
        heading: '狮型八态：用肢体讲故事',
        icon: '态',
        items: [
          {
            label: '南狮的灵魂：神似重于形似',
            body: '与侧重模仿狮子外形的北狮不同，南狮的核心追求是"神似"——即通过表演者的肢体语言，活灵活现地呈现一头真实狮子的喜怒哀乐与内心世界。这便是醒狮表演最具挑战性也最具魅力之处。',
          },
          {
            label: '八种神态的具体表达',
            body: '醒狮表演涵盖"喜、怒、哀、乐、动、静、惊、疑"八种神态，通过"睁眼"、"洗须"、"舔身"、"抖毛"等一系列细节动作来具体呈现。眼皮的开合、嘴巴的张合速度、耳朵的角度，都是传达情绪的精妙语言。追求"形、神、意、气"的高度统一，是每一位醒狮艺人的终身功课。',
          },
        ],
      },
      {
        heading: '采青：一场完整的戏剧',
        icon: '青',
        items: [
          {
            label: '"青"的含义与种类',
            body: '"青"通常由生菜（取粤语"生财"之谐音）和红包组成，象征吉祥与财富，是整个醒狮表演中最核心的道具。按"青"的摆放位置与形式，分为高青（悬挂高处）、地青（置于地面，有水青、蟹青、八卦青等变式）和中阵青（设于阵法之中）等多种类型。',
          },
          {
            label: '采青的五步程式',
            body: '采青是一套有严格程式的完整仪式，分为五个阶段依次展开：① 起势出洞——狮子从沉睡中缓缓醒来，警觉地巡视四周环境；② 探桩上桩——试探靠近青的所在，表现出试青、疑青、惊青等犹豫心理；③ 采青食青——以高难度动作将青采下并吃入腹中；④ 碎青吐青——将生菜咬碎并抛散向四方，寓意将吉祥福气播撒给在场所有人；⑤ 回洞收式——以醉态或得意之姿完成收尾，全身放松，一气呵成。',
          },
        ],
      },
      {
        heading: '流派风格：佛山狮与鹤山狮',
        icon: '派',
        items: [
          {
            label: '佛山狮——硬桥硬马，以刚为美',
            body: '佛山狮是传统南派狮艺的代表，以"硬桥硬马"著称。其步法以南拳大马步为基础，动作大开大合，声势雄壮，彰显出一种刚猛威武的力量之美，是南狮传统风格的正宗传承。',
          },
          {
            label: '鹤山狮——狮型猫步，以灵取胜',
            body: '鹤山狮由晚清广东狮王冯庚长在佛山狮的基础上独创，最大的特色在于独树一帜的"狮型猫步"。这种步法借鉴了猫科动物轻盈灵动的行走方式，使得整个表演灵巧活泼、情态可人，将醒狮的"雄威"与猫的"活泼"完美融合，形成了另一种截然不同的审美风格。',
          },
        ],
      },
      {
        heading: '鼓乐：醒狮的灵魂指挥',
        icon: '鼓',
        items: [
          {
            label: '鼓声即命令',
            body: '在醒狮表演中，鼓乐绝不仅仅是伴奏背景，而是整场表演的"总指挥"。鼓声的轻重缓急、节奏变化，直接指挥着狮子的情绪起伏、动作节拍和行动方向。一位优秀的鼓手，能让台上的醒狮宛如活物，随心而动。',
          },
          {
            label: '丰富的鼓谱节奏',
            body: '南狮的鼓谱以"三声"（三星鼓）和"七声"（七星鼓）为核心节拍，在不同表演状态下运用不同的打法，包括"走路鼓"（狮子行进时）、"行狮"（常规巡游节奏）、"抛狮"（高难度腾跃时）、"咬七星"（采青关键动作时）等。整个鼓乐队由鼓、锣、钹三种乐器相互配合，铿锵有力，将表演现场的气氛推向最高点。',
          },
        ],
      },
    ],
    closing: '醒狮技艺的最高境界，是将深厚的武术功底、生动的故事演绎与激昂的鼓乐指挥完美融合，最终在高桩竞技的极限考验中，呈现出令人屏息的艺术高峰。举世闻名的黄飞鸿醒狮队，正是将三者结合得最出神入化的代表。',
  },
}

// ─── 页面 ─────────────────────────────────────────────────────────────────────

export async function generateStaticParams() {
  return Object.keys(pages).map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const page = pages[slug]
  if (!page) return {}
  return {
    title: `${page.title} · 岭南醒狮 · 非遗文化`,
    description: `深入了解岭南醒狮${page.title}——国家级非物质文化遗产的文化内涵与历史传承。`,
  }
}

export default async function CultureDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const page = pages[slug]
  if (!page) notFound()

  return (
    <main
      className="min-h-screen"
      style={{ background: '#FAF6F0', fontFamily: 'var(--font-sans)' }}
    >
      {/* 顶部返回导航 */}
      <div
        className="sticky top-0 z-50 px-6 py-3 flex items-center gap-4 border-b"
        style={{ background: 'rgba(250,246,240,0.95)', borderColor: '#C9A96E40', backdropFilter: 'blur(8px)' }}
      >
        <Link
          href="/#culture"
          className="flex items-center gap-2 text-sm transition-colors duration-200 hover:opacity-70"
          style={{ fontFamily: 'var(--font-serif)', color: '#3D2B1F' }}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path d="M10 3 L5 8 L10 13" stroke="#3D2B1F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          返回醒狮文脉
        </Link>
        <div className="h-4 w-px" style={{ background: '#C9A96E60' }} />
        <span className="text-xs tracking-[0.3em]" style={{ color: '#C9A96E', fontFamily: 'var(--font-serif)' }}>
          {page.subtitle}
        </span>
      </div>

      {/* Hero 图片区 */}
      <div className="relative h-64 md:h-80 lg:h-96 overflow-hidden">
        <img
          src={page.heroImage}
          alt={page.heroAlt}
          className="w-full h-full object-cover"
          style={{ objectPosition: 'center 30%' }}
        />
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(to bottom, rgba(61,43,31,0.2) 0%, rgba(61,43,31,0.7) 100%)' }}
        />
        {/* 古典角标 */}
        {[
          { pos: 'top-4 left-4', d0: 'M2 2 L14 2', d1: 'M2 2 L2 14' },
          { pos: 'top-4 right-4', d0: 'M22 2 L10 2', d1: 'M22 2 L22 14' },
          { pos: 'bottom-4 left-4', d0: 'M2 22 L14 22', d1: 'M2 22 L2 10' },
          { pos: 'bottom-4 right-4', d0: 'M22 22 L10 22', d1: 'M22 22 L22 10' },
        ].map((item, i) => (
          <div key={i} className={`absolute ${item.pos} w-6 h-6`} aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none">
              <path d={item.d0} stroke="#C9A96E" strokeWidth="1.5" strokeLinecap="round"/>
              <path d={item.d1} stroke="#C9A96E" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </div>
        ))}
        {/* 标题 */}
        <div className="absolute bottom-8 left-0 right-0 px-8 md:px-16">
          <p className="text-xs tracking-[0.4em] mb-2" style={{ color: '#C9A96E', fontFamily: 'var(--font-serif)' }}>
            {page.subtitle}
          </p>
          <h1
            className="text-3xl md:text-5xl font-bold text-white text-balance"
            style={{ fontFamily: 'var(--font-serif)', textShadow: '0 2px 12px rgba(0,0,0,0.4)' }}
          >
            {page.title}
          </h1>
          <div className="mt-3 h-0.5 w-16" style={{ background: page.accentColor }} />
        </div>
      </div>

      {/* 内容主体 */}
      <article className="max-w-3xl mx-auto px-6 py-14 space-y-14">
        {page.sections.map((section, si) => (
          <section key={si} className="space-y-7">
            {/* 章节标题 */}
            <div className="flex items-center gap-4">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 text-base font-bold"
                style={{ background: page.accentColor, color: '#FAF6F0', fontFamily: 'var(--font-serif)' }}
              >
                {section.icon}
              </div>
              <h2
                className="text-xl md:text-2xl font-bold"
                style={{ fontFamily: 'var(--font-serif)', color: '#3D2B1F' }}
              >
                {section.heading}
              </h2>
            </div>

            {/* 条目 */}
            <div className="pl-14 space-y-8">
              {section.items.map((item, ii) => (
                <div key={ii} className="relative">
                  {/* 左侧竖线装饰 */}
                  <div
                    className="absolute -left-6 top-0 bottom-0 w-px"
                    style={{ background: `${page.accentColor}30` }}
                  />
                  <div
                    className="absolute -left-[26px] top-2 w-3 h-3 rounded-full border-2"
                    style={{ borderColor: page.accentColor, background: '#FAF6F0' }}
                  />
                  <h3
                    className="text-base font-bold mb-3"
                    style={{ fontFamily: 'var(--font-serif)', color: page.accentColor }}
                  >
                    {item.label}
                  </h3>
                  <p
                    className="text-[15px] leading-loose"
                    style={{ fontFamily: 'var(--font-sans)', color: '#5A4035', lineHeight: '2.0' }}
                  >
                    {item.body}
                  </p>
                </div>
              ))}
            </div>

            {/* 章节分隔线 */}
            {si < page.sections.length - 1 && (
              <div
                className="h-px mt-10"
                style={{ background: 'linear-gradient(90deg, transparent, #C9A96E50, transparent)' }}
              />
            )}
          </section>
        ))}

        {/* 结语 */}
        {page.closing && (
          <blockquote
            className="px-8 py-6 border-l-4 mt-8"
            style={{
              borderColor: page.accentColor,
              background: `${page.accentColor}08`,
              fontFamily: 'var(--font-serif)',
              color: '#5A4035',
              lineHeight: '2.0',
              fontSize: '15px',
              fontStyle: 'italic',
            }}
          >
            {page.closing}
          </blockquote>
        )}

        {/* 底部导航 */}
        <div className="pt-10 flex flex-col sm:flex-row gap-4 items-center justify-between border-t" style={{ borderColor: '#C9A96E40' }}>
          <Link
            href="/#culture"
            className="flex items-center gap-2 text-sm transition-opacity duration-200 hover:opacity-70"
            style={{ fontFamily: 'var(--font-serif)', color: '#3D2B1F' }}
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <path d="M9 2 L4 7 L9 12" stroke="#3D2B1F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            返回醒狮文脉
          </Link>
          <div className="flex gap-6">
            {Object.entries(pages)
              .filter(([k]) => k !== slug)
              .map(([k, v]) => (
                <Link
                  key={k}
                  href={`/culture/${k}`}
                  className="text-sm transition-colors duration-200 hover:underline"
                  style={{ fontFamily: 'var(--font-serif)', color: '#C41E24', textDecorationColor: '#C41E24', underlineOffset: '3px' }}
                >
                  {v.title}
                </Link>
              ))}
          </div>
        </div>
      </article>
    </main>
  )
}
