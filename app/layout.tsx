import type { Metadata } from 'next';
import { Barlow_Condensed, Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

const geistSans = Geist({ variable: '--font-geist-sans', subsets: ['latin'] });
const geistMono = Geist_Mono({ variable: '--font-geist-mono', subsets: ['latin'] });
const barlowCondensed = Barlow_Condensed({
  variable: '--font-barlow-condensed',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
});

export const metadata: Metadata = {
  title: '430 / HEFEI — 全马训练路书',
  description: '2026 合肥马拉松 4 小时 30 分目标的十周训练与补给计划。',
  openGraph: {
    title: '430 / HEFEI — 全马训练路书',
    description: '十周训练、长跑补给与比赛日执行计划。',
    type: 'website',
    locale: 'zh_CN',
    images: [{ url: '/marathon-430-social-preview.png', width: 1734, height: 907, alt: '430 / HEFEI 合肥马拉松训练路书' }],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const directionContract = "document.currentScript?.parentNode?.insertBefore(document.createComment('Visual direction: premium cobalt Chinese survey field notebook and architectural blueprint; monumental 4:30 binding, surveyed ten-week route, warm ruled notes paper, chartreuse active marker; square technical geometry; no gradients, glass, generic card grid, or decorative pills.'), document.currentScript)";

  return (
    <html lang="zh-CN">
      <body className={`${geistSans.variable} ${geistMono.variable} ${barlowCondensed.variable}`}>
        <script dangerouslySetInnerHTML={{ __html: directionContract }} />
        {children}
      </body>
    </html>
  );
}
