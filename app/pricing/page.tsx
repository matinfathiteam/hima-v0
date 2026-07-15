import type { Metadata } from 'next'
import Link from 'next/link'
import { Check, X, Sparkles, ArrowLeft } from 'lucide-react'
import { Container } from '@/components/shared/container'
import { PageHeader } from '@/components/shared/page-header'
import { SectionHeading } from '@/components/shared/section-heading'
import { FaqAccordion } from '@/components/shared/faq-accordion'
import { CtaBand } from '@/components/shared/cta-band'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { JsonLd } from '@/components/shared/json-ld'
import { buildMetadata } from '@/lib/site'
import { breadcrumbLd } from '@/lib/structured-data'
import { pricingPackages, growthBundles, faqs } from '@/lib/data'
import { formatToman, formatMillionToman, toPersianDigits } from '@/lib/format'
import { cn } from '@/lib/utils'

export const metadata: Metadata = buildMetadata({
  title: 'تعرفه‌ها و بسته‌ها',
  description:
    'سه بسته‌ی شروع، حرفه‌ای و سازمانی به‌همراه بسته‌های رشد با تخفیف؛ قیمت‌گذاری شفاف هیما برای هر مرحله از کسب‌وکار شما.',
  path: '/pricing',
})

/** Capability matrix mapped to the three tiers for an honest comparison. */
const MATRIX: { feature: string; tiers: [boolean, boolean, boolean] }[] = [
  { feature: 'طراحی واکنش‌گرا و موبایل‌محور', tiers: [true, true, true] },
  { feature: 'سرعت بارگذاری زیر ۲.۵ ثانیه', tiers: [true, true, true] },
  { feature: 'سئوی فنی پایه', tiers: [true, true, true] },
  { feature: 'پنل مدیریت محتوا', tiers: [false, true, true] },
  { feature: 'بلاگ و ساختار سئوی محتوایی', tiers: [false, true, true] },
  { feature: 'طراحی هویت بصری', tiers: [false, true, true] },
  { feature: 'فروشگاه و درگاه پرداخت', tiers: [false, false, true] },
  { feature: 'کمپین رشد و سئوی پیشرفته', tiers: [false, false, true] },
  { feature: 'مدیر پروژه‌ی اختصاصی', tiers: [false, false, true] },
  { feature: 'مدت پشتیبانی رایگان', tiers: [true, true, true] },
]

const priceFaqs = faqs.filter((f) => f.topic === 'قیمت')

function TierCell({ on }: { on: boolean }) {
  return on ? (
    <Check className="mx-auto size-5 text-primary" aria-label="دارد" />
  ) : (
    <X className="mx-auto size-4 text-muted-foreground/50" aria-label="ندارد" />
  )
}

export default function PricingPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbLd([
          { name: 'خانه', url: '/' },
          { name: 'تعرفه‌ها', url: '/pricing' },
        ])}
      />
      <PageHeader
        eyebrow="تعرفه‌ها"
        title="قیمت‌گذاری شفاف، بدون هزینه‌ی پنهان"
        description="بسته‌ای متناسب با مرحله‌ی کسب‌وکار خود انتخاب کنید. همه‌ی قیمت‌ها نقطه‌ی شروع‌اند و برآورد دقیق پس از جلسه‌ی کشف رایگان مشخص می‌شود."
        breadcrumbs={[
          { name: 'خانه', href: '/' },
          { name: 'تعرفه‌ها', href: '/pricing' },
        ]}
      />

      {/* Tiers */}
      <section className="py-16 sm:py-20">
        <Container className="grid items-start gap-6 lg:grid-cols-3">
          {pricingPackages.map((pkg) => (
            <div
              key={pkg.id}
              className={cn(
                'flex h-full flex-col gap-6 rounded-3xl border bg-card p-7',
                pkg.featured
                  ? 'border-primary shadow-brand ring-1 ring-primary'
                  : 'border-border',
              )}
            >
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold">{pkg.name}</h2>
                  {pkg.featured ? (
                    <Badge variant="accent">
                      <Sparkles className="size-3.5" aria-hidden="true" />
                      پیشنهاد ما
                    </Badge>
                  ) : null}
                </div>
                <p className="text-sm leading-relaxed text-muted-foreground">{pkg.tagline}</p>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-xs text-muted-foreground">{pkg.priceNote}</span>
                <span className="text-2xl font-black text-brand-gradient">
                  {formatToman(pkg.price)}
                </span>
              </div>
              <ul className="flex flex-1 flex-col gap-3">
                {pkg.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-sm">
                    <Check className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
                    <span className="leading-relaxed">{f}</span>
                  </li>
                ))}
              </ul>
              <Button
                size="lg"
                variant={pkg.featured ? 'default' : 'outline'}
                className={pkg.featured ? 'bg-brand-gradient text-primary-foreground' : undefined}
                render={
                  <Link href={`/order?service=web-design&package=${pkg.id}`}>
                    {pkg.cta}
                    <ArrowLeft className="size-4" />
                  </Link>
                }
              />
            </div>
          ))}
        </Container>
      </section>

      {/* Comparison table */}
      <section className="bg-muted/40 py-16 sm:py-20">
        <Container className="flex flex-col gap-10">
          <SectionHeading
            eyebrow="مقایسه‌ی بسته‌ها"
            title="دقیقاً ببینید هر بسته چه چیزی دارد"
          />
          <div className="overflow-x-auto rounded-3xl border border-border bg-card">
            <table className="w-full min-w-[560px] text-sm">
              <caption className="sr-only">مقایسه‌ی امکانات بسته‌های قیمتی هیما</caption>
              <thead>
                <tr className="border-b border-border">
                  <th scope="col" className="p-4 text-start font-bold">
                    امکانات
                  </th>
                  {pricingPackages.map((p) => (
                    <th key={p.id} scope="col" className="p-4 text-center font-bold">
                      {p.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {MATRIX.map((row, i) => (
                  <tr key={row.feature} className={cn(i % 2 === 1 && 'bg-muted/40')}>
                    <th scope="row" className="p-4 text-start font-medium">
                      {row.feature}
                    </th>
                    {row.tiers.map((on, idx) => (
                      <td key={idx} className="p-4 text-center">
                        <TierCell on={on} />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Container>
      </section>

      {/* Growth bundles */}
      <section className="py-16 sm:py-20">
        <Container className="flex flex-col gap-10">
          <SectionHeading
            eyebrow="بسته‌های رشد"
            title="بیشتر بگیرید، کمتر بپردازید"
            description="ترکیب خدمات در قالب یک بسته، هم هزینه را کم می‌کند و هم رشد را پیوسته نگه می‌دارد."
          />
          <div className="grid gap-6 md:grid-cols-2">
            {growthBundles.map((b) => (
              <div
                key={b.id}
                className="flex flex-col gap-5 rounded-3xl border border-border bg-card p-7"
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold">{b.name}</h3>
                  <Badge variant="accent">
                    {toPersianDigits(b.discountPercent)}٪ تخفیف
                  </Badge>
                </div>
                <p className="text-sm leading-relaxed text-muted-foreground">{b.description}</p>
                <ul className="flex flex-col gap-2.5">
                  {b.includes.map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-sm">
                      <Check className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
                      <span className="leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-auto flex flex-col gap-1 border-t border-border pt-5">
                  <span className="text-sm text-muted-foreground line-through">
                    جدا: {formatMillionToman(b.separatePrice)}
                  </span>
                  <span className="text-2xl font-black text-brand-gradient">
                    {formatMillionToman(b.bundlePrice)}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    برای {toPersianDigits(b.durationMonths)} ماه همکاری
                  </span>
                </div>
                <Button
                  size="lg"
                  className="bg-brand-gradient text-primary-foreground"
                  render={
                    <Link href={`/order?bundle=${b.id}`}>
                      انتخاب این بسته
                      <ArrowLeft className="size-4" />
                    </Link>
                  }
                />
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Pricing FAQ */}
      {priceFaqs.length > 0 ? (
        <section className="bg-muted/40 py-16 sm:py-20">
          <Container className="flex max-w-3xl flex-col gap-10">
            <SectionHeading eyebrow="سوالات مالی" title="پرسش‌های رایج درباره‌ی قیمت" />
            <FaqAccordion items={priceFaqs} />
          </Container>
        </section>
      ) : null}

      <CtaBand />
    </>
  )
}
