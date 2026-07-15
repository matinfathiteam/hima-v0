import type { Metadata } from 'next'
import { Container } from '@/components/shared/container'
import { PageHeader } from '@/components/shared/page-header'
import { SectionHeading } from '@/components/shared/section-heading'
import { CtaBand } from '@/components/shared/cta-band'
import { JsonLd } from '@/components/shared/json-ld'
import { buildMetadata } from '@/lib/site'
import { breadcrumbLd } from '@/lib/structured-data'
import { PROCESS_STEPS } from '@/lib/content'

export const metadata: Metadata = buildMetadata({
  title: 'فرآیند همکاری',
  description:
    'فرآیند شش‌مرحله‌ای هیما از اولین گفتگو تا پشتیبانی پس از انتشار؛ شفاف، قابل‌پیش‌بینی و متمرکز بر رشد شما.',
  path: '/process',
})

const principles = [
  { title: 'شفافیت کامل', description: 'در هر مرحله دقیقاً می‌دانید کجای کار هستیم؛ بدون هزینه یا سورپرایز پنهان.' },
  { title: 'بازخورد مستمر', description: 'در نقاط بازبینی مشخص نظر شما را می‌گیریم تا نتیجه دقیقاً مطابق انتظارتان باشد.' },
  { title: 'کیفیت پیش از سرعت', description: 'عجله نمی‌کنیم؛ اما زمان‌بندی را محترم می‌شماریم و سر قولمان می‌مانیم.' },
]

export default function ProcessPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbLd([
          { name: 'خانه', url: '/' },
          { name: 'فرآیند همکاری', url: '/process' },
        ])}
      />
      <PageHeader
        eyebrow="فرآیند کار"
        title="مسیری روشن، از ایده تا رشد"
        description="همکاری با هیما یک فرآیند شفاف و مرحله‌به‌مرحله است. دقیقاً می‌دانید هر گام چه اتفاقی می‌افتد و چه انتظاری داشته باشید."
        breadcrumbs={[
          { name: 'خانه', href: '/' },
          { name: 'فرآیند همکاری', href: '/process' },
        ]}
      />

      <section className="py-16 sm:py-20">
        <Container>
          <ol className="relative mx-auto flex max-w-3xl flex-col gap-8 border-e-2 border-border pe-8">
            {PROCESS_STEPS.map((step) => (
              <li key={step.step} className="relative flex flex-col gap-2">
                <span className="absolute -end-[41px] flex size-9 items-center justify-center rounded-full bg-brand-gradient text-sm font-bold text-primary-foreground">
                  {step.step}
                </span>
                <div className="flex flex-col gap-2 rounded-2xl border border-border bg-card p-6">
                  <h2 className="text-lg font-bold">{step.title}</h2>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {step.description}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <section className="bg-muted/40 py-16 sm:py-20">
        <Container className="flex flex-col gap-12">
          <SectionHeading
            eyebrow="اصول ما در همکاری"
            title="چطور کار می‌کنیم"
          />
          <div className="grid gap-6 md:grid-cols-3">
            {principles.map((p) => (
              <div key={p.title} className="flex flex-col gap-3 rounded-2xl border border-border bg-card p-6">
                <h3 className="text-lg font-bold">{p.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{p.description}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <CtaBand />
    </>
  )
}
