import type { Metadata } from 'next'
import { Check, X, Sparkles } from 'lucide-react'
import { Container } from '@/components/shared/container'
import { PageHeader } from '@/components/shared/page-header'
import { SectionHeading } from '@/components/shared/section-heading'
import { CtaBand } from '@/components/shared/cta-band'
import { JsonLd } from '@/components/shared/json-ld'
import { buildMetadata } from '@/lib/site'
import { breadcrumbLd } from '@/lib/structured-data'
import { comparisonRows } from '@/lib/data'
import { cn } from '@/lib/utils'

export const metadata: Metadata = buildMetadata({
  title: 'مقایسه‌ی گزینه‌ها',
  description:
    'هیما در مقابل فریلنسر و سایت‌ساز آماده؛ یک مقایسه‌ی صادقانه که به دغدغه‌های واقعی شما درباره‌ی کیفیت، پشتیبانی و هزینه‌ی بلندمدت پاسخ می‌دهد.',
  path: '/compare',
})

const COLUMNS = [
  { key: 'hima' as const, label: 'هیما', highlight: true },
  { key: 'freelancer' as const, label: 'فریلنسر', highlight: false },
  { key: 'builder' as const, label: 'سایت‌ساز آماده', highlight: false },
]

function Cell({ value }: { value: string | boolean }) {
  if (typeof value === 'boolean') {
    return value ? (
      <Check className="mx-auto size-5 text-primary" aria-label="بله" />
    ) : (
      <X className="mx-auto size-4 text-muted-foreground/50" aria-label="خیر" />
    )
  }
  return <span className="text-sm leading-relaxed">{value}</span>
}

export default function ComparePage() {
  return (
    <>
      <JsonLd
        data={breadcrumbLd([
          { name: 'خانه', url: '/' },
          { name: 'مقایسه', url: '/compare' },
        ])}
      />
      <PageHeader
        eyebrow="مقایسه‌ی صادقانه"
        title="هیما، فریلنسر یا سایت‌ساز آماده؟"
        description="می‌دانیم انتخاب سختی است. به‌جای بزرگ‌نمایی، واقعیت را کنار هم می‌گذاریم تا خودتان بهترین تصمیم را برای کسب‌وکارتان بگیرید."
        breadcrumbs={[
          { name: 'خانه', href: '/' },
          { name: 'مقایسه', href: '/compare' },
        ]}
      />

      <section className="py-16 sm:py-20">
        <Container>
          <div className="overflow-x-auto rounded-3xl border border-border bg-card">
            <table className="w-full min-w-[640px] text-sm">
              <caption className="sr-only">
                مقایسه‌ی هیما با فریلنسر و سایت‌ساز آماده
              </caption>
              <thead>
                <tr className="border-b border-border">
                  <th scope="col" className="p-4 text-start font-bold">
                    معیار
                  </th>
                  {COLUMNS.map((c) => (
                    <th
                      key={c.key}
                      scope="col"
                      className={cn(
                        'p-4 text-center font-bold',
                        c.highlight && 'bg-primary/5 text-primary',
                      )}
                    >
                      <span className="inline-flex items-center gap-1.5">
                        {c.highlight ? (
                          <Sparkles className="size-4" aria-hidden="true" />
                        ) : null}
                        {c.label}
                      </span>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {comparisonRows.map((row, i) => (
                  <tr key={row.feature} className={cn(i % 2 === 1 && 'bg-muted/40')}>
                    <th scope="row" className="p-4 text-start font-medium">
                      {row.feature}
                    </th>
                    <td className={cn('p-4 text-center', 'bg-primary/5')}>
                      <Cell value={row.hima} />
                    </td>
                    <td className="p-4 text-center">
                      <Cell value={row.freelancer} />
                    </td>
                    <td className="p-4 text-center">
                      <Cell value={row.builder} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Container>
      </section>

      <section className="bg-muted/40 py-16 sm:py-20">
        <Container className="flex flex-col gap-10">
          <SectionHeading
            eyebrow="حرف حساب ما"
            title="چرا هیما یک سرمایه‌گذاری است، نه هزینه"
            description="گزینه‌های ارزان‌تر ممکن است در ابتدا جذاب باشند، اما هزینه‌ی واقعی در بلندمدت مشخص می‌شود."
          />
          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                title: 'کیفیتی که می‌ماند',
                body: 'سایت شما با استانداردهای فنی روز ساخته می‌شود؛ سریع، امن و آماده‌ی رشد، نه یک قالب تکراری که زود کهنه می‌شود.',
              },
              {
                title: 'یک تیم، نه یک نفر',
                body: 'به‌جای اتکا به یک فرد، یک تیم چندتخصصی پشت پروژه‌ی شماست؛ ریسک قطع همکاری و توقف پروژه از بین می‌رود.',
              },
              {
                title: 'همراهی پس از تحویل',
                body: 'کار ما با تحویل تمام نمی‌شود. نگهداری، سئو و بهبود مستمر بخشی از شراکت ماست تا رشد ادامه پیدا کند.',
              },
            ].map((item) => (
              <div key={item.title} className="flex flex-col gap-3 rounded-2xl border border-border bg-card p-6">
                <h3 className="text-lg font-bold">{item.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{item.body}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <CtaBand
        title="آماده‌اید انتخاب درست را انجام دهید؟"
        description="بیایید درباره‌ی پروژه‌تان صحبت کنیم و ببینیم هیما چطور می‌تواند ارزش واقعی بسازد."
      />
    </>
  )
}
