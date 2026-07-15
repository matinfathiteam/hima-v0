import type { Metadata } from 'next'
import { Container } from '@/components/shared/container'
import { PageHeader } from '@/components/shared/page-header'
import { FaqAccordion } from '@/components/shared/faq-accordion'
import { CtaBand } from '@/components/shared/cta-band'
import { JsonLd } from '@/components/shared/json-ld'
import { buildMetadata } from '@/lib/site'
import { breadcrumbLd, faqLd } from '@/lib/structured-data'
import { faqs } from '@/lib/data'

export const metadata: Metadata = buildMetadata({
  title: 'سوالات متداول',
  description:
    'پاسخ پرسش‌های رایج درباره‌ی قیمت، زمان تحویل، پشتیبانی و فرآیند کار هیما؛ همه‌ی آنچه پیش از شروع باید بدانید.',
  path: '/faq',
})

const TOPIC_ORDER = ['قیمت', 'زمان تحویل', 'پشتیبانی', 'فرآیند کار', 'فنی']

function groupByTopic() {
  const map = new Map<string, typeof faqs>()
  for (const f of faqs) {
    const topic = f.topic ?? 'سایر'
    if (!map.has(topic)) map.set(topic, [])
    map.get(topic)!.push(f)
  }
  return Array.from(map.entries()).sort(
    (a, b) => TOPIC_ORDER.indexOf(a[0]) - TOPIC_ORDER.indexOf(b[0]),
  )
}

export default function FaqPage() {
  const groups = groupByTopic()
  return (
    <>
      <JsonLd
        data={breadcrumbLd([
          { name: 'خانه', url: '/' },
          { name: 'سوالات متداول', url: '/faq' },
        ])}
      />
      <JsonLd data={faqLd(faqs)} />
      <PageHeader
        eyebrow="سوالات متداول"
        title="هر چه می‌خواهید بپرسید"
        description="پاسخ رایج‌ترین سوال‌ها را این‌جا جمع کرده‌ایم. اگر پاسخ سوالتان را نیافتید، خوشحال می‌شویم مستقیم با ما در تماس باشید."
        breadcrumbs={[
          { name: 'خانه', href: '/' },
          { name: 'سوالات متداول', href: '/faq' },
        ]}
      />

      <section className="py-16 sm:py-20">
        <Container className="flex max-w-3xl flex-col gap-12">
          {groups.map(([topic, items]) => (
            <div key={topic} className="flex flex-col gap-5">
              <h2 className="text-xl font-bold">{topic}</h2>
              <FaqAccordion items={items} />
            </div>
          ))}
        </Container>
      </section>

      <CtaBand
        title="هنوز سوالی دارید؟"
        description="کارشناسان ما آماده‌اند تا هر ابهامی را برایتان روشن کنند."
        primaryLabel="تماس با ما"
        primaryHref="/contact"
        secondaryLabel="آنالیز رایگان سایت"
        secondaryHref="/free-audit"
      />
    </>
  )
}
