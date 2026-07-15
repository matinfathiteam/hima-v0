import type { Metadata } from 'next'
import { buildMetadata } from '@/lib/site'
import { testimonials, clientLogos } from '@/lib/data'
import { PageHeader } from '@/components/shared/page-header'
import { Container } from '@/components/shared/container'
import { CtaBand } from '@/components/shared/cta-band'
import { TestimonialsFilter } from '@/components/tools/testimonials-filter'

export const metadata: Metadata = buildMetadata({
  title: 'رضایت مشتریان',
  description:
    'داستان موفقیت کسب‌وکارهایی که با هیما همسفر شدند؛ نتایج واقعی از صنایع مختلف را ببینید.',
  path: '/testimonials',
})

const STATS = [
  { value: '+۱۲۰', label: 'پروژه‌ی تحویل‌شده' },
  { value: '٪۹۶', label: 'رضایت مشتریان' },
  { value: '+۸', label: 'صنعت تخصصی' },
  { value: '+۵ سال', label: 'همراهی و پشتیبانی' },
]

export default function TestimonialsPage() {
  return (
    <>
      <PageHeader
        eyebrow="داستان مشتریان"
        title="کسب‌وکارهایی که با ما رشد کردند"
        description="ما فقط سایت نمی‌سازیم؛ همسفر رشد کسب‌وکارها می‌شویم. نتایج واقعی مشتریان‌مان را در صنایع مختلف ببینید."
        breadcrumbs={[
          { name: 'خانه', href: '/' },
          { name: 'رضایت مشتریان', href: '/testimonials' },
        ]}
      />

      <section className="border-b border-border bg-muted/30 py-10">
        <Container>
          <dl className="grid grid-cols-2 gap-6 text-center sm:grid-cols-4">
            {STATS.map((s) => (
              <div key={s.label} className="flex flex-col gap-1">
                <dt className="sr-only">{s.label}</dt>
                <dd className="text-3xl font-bold text-primary sm:text-4xl">
                  {s.value}
                </dd>
                <p className="text-sm text-muted-foreground">{s.label}</p>
              </div>
            ))}
          </dl>
        </Container>
      </section>

      <section className="py-16 sm:py-20">
        <Container>
          <TestimonialsFilter testimonials={testimonials} />
        </Container>
      </section>

      {clientLogos.length > 0 && (
        <section className="border-t border-border py-14">
          <Container>
            <p className="mb-8 text-center text-sm font-medium text-muted-foreground">
              برندهایی که به ما اعتماد کردند
            </p>
            <ul className="flex flex-wrap items-center justify-center gap-x-10 gap-y-6">
              {clientLogos.map((logo) => (
                <li
                  key={logo.name}
                  className="text-lg font-bold text-muted-foreground/70"
                >
                  {logo.name}
                </li>
              ))}
            </ul>
          </Container>
        </section>
      )}

      <CtaBand
        title="می‌خواهید داستان بعدی موفقیت شما باشید؟"
        description="یک مشاوره رایگان بگیرید و مسیر رشد دیجیتال کسب‌وکارتان را با هم ترسیم کنیم."
      />
    </>
  )
}
