import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Vazirmatn } from 'next/font/google'
import { JetBrains_Mono } from 'next/font/google'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { FloatingGoftinoButton } from '@/components/layout/floating-goftino-button'
import { SITE } from '@/lib/site'
import './globals.css'

const vazir = Vazirmatn({
  subsets: ['arabic', 'latin'],
  display: 'swap',
  variable: '--font-vazir',
})

const mono = JetBrains_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-latin-mono',
})

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} | همسفر دیجیتال شما`,
    template: `%s | ${SITE.name}`,
  },
  description:
    'آژانس دیجیتال هیما؛ طراحی سایت حرفه‌ای، برندینگ و رشد دیجیتال برای کسب‌وکارها. نه یک پیمانکار، بلکه همسفر بلندمدت رشد شما.',
  keywords: [
    'طراحی سایت',
    'آژانس دیجیتال',
    'طراحی سایت فروشگاهی',
    'سئو',
    'برندینگ',
    'دیجیتال مارکتینگ',
    'هیما',
  ],
  openGraph: {
    type: 'website',
    locale: 'fa_IR',
    siteName: SITE.name,
    url: SITE.url,
    title: `${SITE.name} | همسفر دیجیتال شما`,
    description:
      'طراحی سایت حرفه‌ای، برندینگ و رشد دیجیتال برای کسب‌وکارهای ایرانی.',
  },
  generator: 'v0.app',
  robots: { index: true, follow: true },
}

export const viewport: Viewport = {
  themeColor: '#7c2fd6',
  colorScheme: 'light',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fa" dir="rtl" className={`${vazir.variable} ${mono.variable}`}>
      <body className="font-sans">
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <FloatingGoftinoButton />
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
