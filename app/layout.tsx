import type { Metadata } from 'next'
import { Noto_Serif_SC, Noto_Sans_SC } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const notoSerifSC = Noto_Serif_SC({
  subsets: ['latin'],
  weight: ['400', '500', '700', '900'],
  variable: '--font-serif',
})

const notoSansSC = Noto_Sans_SC({
  subsets: ['latin'],
  weight: ['300', '400', '500', '700'],
  variable: '--font-sans',
})

export const metadata: Metadata = {
  title: '岭南醒狮 · 非遗文化',
  description: '传承千年的岭南醒狮文化，国家级非物质文化遗产，融合武术、舞蹈与民俗的艺术瑰宝。',
  generator: 'v0.app',
  keywords: ['岭南醒狮', '非遗文化', '舞狮', '广东民俗', '国家级非物质文化遗产'],
  openGraph: {
    title: '岭南醒狮 · 非遗文化展示',
    description: '传承千年的岭南醒狮文化，国家级非物质文化遗产',
    locale: 'zh_CN',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="zh-CN" className={`${notoSerifSC.variable} ${notoSansSC.variable} bg-warm-white`}>
      <body className="font-sans antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
