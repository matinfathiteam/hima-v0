import type { Metadata } from 'next'
import { Phone, Mail, MapPin, Clock, Send } from 'lucide-react'
import { Container } from '@/components/shared/container'
import { PageHeader } from '@/components/shared/page-header'
import { ContactForm } from '@/components/tools/contact-form'
import { InstagramIcon, LinkedinIcon } from '@/components/shared/social-icons'
import { JsonLd } from '@/components/shared/json-ld'
import { buildMetadata, SITE } from '@/lib/site'
import { breadcrumbLd, localBusinessLd } from '@/lib/structured-data'

export const metadata: Metadata = buildMetadata({
  title: 'تماس با ما',
  description:
    'با هیما در تماس باشید؛ تلفن، ایمیل، شبکه‌های اجتماعی و فرم تماس مستقیم. پاسخگویی کارشناسان ما زیر ۴۸ ساعت است.',
  path: '/contact',
})

const channels = [
  { icon: Phone, label: 'تلفن تماس', value: SITE.phone, href: `tel:${SITE.phoneHref}` },
  { icon: Mail, label: 'ایمیل', value: SITE.email, href: `mailto:${SITE.email}` },
]

const socials = [
  { icon: InstagramIcon, label: 'اینستاگرام', href: SITE.social.instagram },
  { icon: LinkedinIcon, label: 'لینکدین', href: SITE.social.linkedin },
  { icon: Send, label: 'تلگرام', href: SITE.social.telegram },
]

export default function ContactPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbLd([
          { name: 'خانه', url: '/' },
          { name: 'تماس با ما', url: '/contact' },
        ])}
      />
      <JsonLd data={localBusinessLd()} />
      <PageHeader
        eyebrow="تماس با ما"
        title="بیایید گفتگو را شروع کنیم"
        description="هر سوالی درباره‌ی پروژه‌تان دارید، ما اینجاییم. سریع‌ترین راه، پر کردن فرم زیر یا تماس مستقیم است."
        breadcrumbs={[
          { name: 'خانه', href: '/' },
          { name: 'تماس با ما', href: '/contact' },
        ]}
      />

      <section className="py-16 sm:py-20">
        <Container className="grid gap-10 lg:grid-cols-[1fr_1.2fr]">
          {/* Info column */}
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-5">
              {channels.map((c) => (
                <a
                  key={c.label}
                  href={c.href}
                  className="flex items-center gap-4 rounded-2xl border border-border bg-card p-5 transition-colors hover:border-primary/40"
                >
                  <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <c.icon className="size-5" aria-hidden="true" />
                  </span>
                  <span className="flex flex-col">
                    <span className="text-xs text-muted-foreground">{c.label}</span>
                    <span className="font-bold" dir={c.label === 'ایمیل' ? 'ltr' : undefined}>
                      {c.value}
                    </span>
                  </span>
                </a>
              ))}

              <div className="flex items-start gap-4 rounded-2xl border border-border bg-card p-5">
                <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <MapPin className="size-5" aria-hidden="true" />
                </span>
                <span className="flex flex-col gap-0.5">
                  <span className="text-xs text-muted-foreground">آدرس</span>
                  <span className="text-sm font-medium leading-relaxed">{SITE.address}</span>
                </span>
              </div>

              <div className="flex items-center gap-4 rounded-2xl border border-border bg-card p-5">
                <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Clock className="size-5" aria-hidden="true" />
                </span>
                <span className="flex flex-col">
                  <span className="text-xs text-muted-foreground">ساعات پاسخگویی</span>
                  <span className="text-sm font-medium">شنبه تا چهارشنبه، ۹ تا ۱۸ — {SITE.responseTime}</span>
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="flex size-11 items-center justify-center rounded-xl bg-muted text-muted-foreground transition-colors hover:bg-primary hover:text-primary-foreground"
                >
                  <s.icon className="size-5" />
                </a>
              ))}
            </div>

            {/* Map embed with reserved aspect ratio (zero CLS) */}
            <div className="overflow-hidden rounded-2xl border border-border">
              <iframe
                title="نقشه‌ی محل دفتر هیما"
                src="https://www.openstreetmap.org/export/embed.html?bbox=51.38%2C35.72%2C51.44%2C35.76&layer=mapnik"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="aspect-video w-full"
              />
            </div>
          </div>

          {/* Form column */}
          <ContactForm />
        </Container>
      </section>
    </>
  )
}
