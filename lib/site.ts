export const SITE = {
  name: 'هیما',
  nameEn: 'Hima',
  legalName: 'آژانس دیجیتال هیما',
  tagline: 'همسفر دیجیتال شما',
  url: 'https://hima.agency',
  email: 'hello@hima.agency',
  phone: '۰۲۱-۹۱۰۰۲۰۳۰',
  phoneHref: '+982191002030',
  address: 'تهران، خیابان ولیعصر، برج نگین، طبقه ۱۲، واحد ۱۲۰۴',
  responseTime: 'پاسخگویی زیر ۴۸ ساعت',
  social: {
    instagram: 'https://instagram.com/hima.agency',
    linkedin: 'https://linkedin.com/company/hima-agency',
    telegram: 'https://t.me/hima_agency',
  },
} as const

export const NAV_LINKS = [
  { href: '/', label: 'خانه' },
  { href: '/services', label: 'خدمات' },
  { href: '/projects', label: 'نمونه‌کارها' },
  { href: '/blog', label: 'بلاگ' },
  { href: '/calculator', label: 'ماشین‌حساب قیمت' },
  { href: '/about', label: 'درباره ما' },
  { href: '/contact', label: 'تماس با ما' },
] as const
