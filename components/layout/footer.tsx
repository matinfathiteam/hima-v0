import Link from 'next/link'
import { Sparkles, Mail, Phone, MapPin, Send } from 'lucide-react'
import { Container } from '@/components/shared/container'
import { InstagramIcon, LinkedinIcon } from '@/components/shared/social-icons'
import { SITE } from '@/lib/site'
import { services, niches } from '@/lib/data'

const columns = [
  {
    title: 'خدمات',
    links: services.slice(0, 6).map((s) => ({
      href: `/services/${s.slug}`,
      label: s.title,
    })),
  },
  {
    title: 'صنایع',
    links: niches.slice(0, 6).map((n) => ({
      href: `/services/${n.slug}`,
      label: n.title,
    })),
  },
  {
    title: 'شرکت',
    links: [
      { href: '/about', label: 'درباره ما' },
      { href: '/process', label: 'فرایند همکاری' },
      { href: '/testimonials', label: 'نظرات مشتریان' },
      { href: '/pricing', label: 'تعرفه‌ها' },
      { href: '/blog', label: 'بلاگ' },
      { href: '/refer', label: 'معرفی و درآمد' },
    ],
  },
  {
    title: 'ابزارها',
    links: [
      { href: '/calculator', label: 'ماشین‌حساب قیمت' },
      { href: '/services/template', label: 'ساخت پیش‌نمایش قالب' },
      { href: '/compare', label: 'مقایسه با رقبا' },
      { href: '/free-audit', label: 'آنالیز رایگان سایت' },
      { href: '/faq', label: 'سوالات متداول' },
      { href: '/contact', label: 'تماس با ما' },
    ],
  },
]

export function Footer() {
  return (
    <footer className="mt-24 border-t border-border bg-card">
      <Container className="py-14">
        <div className="grid gap-10 lg:grid-cols-5">
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2">
              <span className="flex size-9 items-center justify-center rounded-xl bg-brand-gradient text-primary-foreground">
                <Sparkles className="size-5" aria-hidden="true" />
              </span>
              <span className="text-lg font-bold">{SITE.name}</span>
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              {SITE.legalName}؛ همسفر بلندمدت رشد دیجیتال کسب‌وکار شما. نه فقط یک سایت، یک شراکت.
            </p>
            <div className="mt-5 flex items-center gap-3">
              <a
                href={SITE.social.instagram}
                aria-label="اینستاگرام"
                className="flex size-9 items-center justify-center rounded-lg bg-muted text-muted-foreground transition-colors hover:bg-primary hover:text-primary-foreground"
              >
                <InstagramIcon className="size-4" />
              </a>
              <a
                href={SITE.social.linkedin}
                aria-label="لینکدین"
                className="flex size-9 items-center justify-center rounded-lg bg-muted text-muted-foreground transition-colors hover:bg-primary hover:text-primary-foreground"
              >
                <LinkedinIcon className="size-4" />
              </a>
              <a
                href={SITE.social.telegram}
                aria-label="تلگرام"
                className="flex size-9 items-center justify-center rounded-lg bg-muted text-muted-foreground transition-colors hover:bg-primary hover:text-primary-foreground"
              >
                <Send className="size-4" />
              </a>
            </div>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <h3 className="text-sm font-bold">{col.title}</h3>
              <ul className="mt-4 flex flex-col gap-2.5">
                {col.links.map((link) => (
                  <li key={link.href + link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 grid gap-4 border-t border-border pt-8 sm:grid-cols-3">
          <a
            href={`tel:${SITE.phoneHref}`}
            className="flex items-center gap-2.5 text-sm text-muted-foreground hover:text-foreground"
          >
            <Phone className="size-4 text-primary" />
            {SITE.phone}
          </a>
          <a
            href={`mailto:${SITE.email}`}
            className="flex items-center gap-2.5 text-sm text-muted-foreground hover:text-foreground"
          >
            <Mail className="size-4 text-primary" />
            {SITE.email}
          </a>
          <p className="flex items-start gap-2.5 text-sm text-muted-foreground">
            <MapPin className="mt-0.5 size-4 shrink-0 text-primary" />
            {SITE.address}
          </p>
        </div>

        <div className="mt-8 flex flex-col items-center justify-between gap-4 border-t border-border pt-6 text-sm text-muted-foreground sm:flex-row">
          <p>
            © {new Date().getFullYear()} {SITE.legalName}. تمامی حقوق محفوظ است.
          </p>
          <div className="flex items-center gap-4">
            <Link href="/privacy-policy" className="hover:text-foreground">
              حریم خصوصی
            </Link>
            <Link href="/terms" className="hover:text-foreground">
              قوانین و مقررات
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  )
}
