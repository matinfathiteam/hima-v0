import type { Metadata } from 'next'
import { Container } from '@/components/shared/container'
import { PageHeader } from '@/components/shared/page-header'
import { PriceCalculator } from '@/components/tools/price-calculator'
import { JsonLd } from '@/components/shared/json-ld'
import { breadcrumbLd } from '@/lib/structured-data'

export const metadata: Metadata = {
  title: 'ماشین‌حساب قیمت',
  description:
    'با ماشین‌حساب هوشمند قیمت هیما، در کمتر از یک دقیقه یک برآورد شفاف از هزینه‌ی طراحی سایت خود بگیرید.',
  alternates: { canonical: '/calculator' },
}

export default function CalculatorPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbLd([
          { name: 'خانه', url: '/' },
          { name: 'ماشین‌حساب قیمت', url: '/calculator' },
        ])}
      />
      <PageHeader
        eyebrow="ابزار امضای هیما"
        title="ماشین‌حساب هوشمند قیمت"
        description="چند سوال ساده پاسخ دهید تا یک برآورد شفاف و منصفانه از هزینه‌ی پروژه‌تان به دست آورید؛ بدون تماس، بدون فشار فروش."
        breadcrumbs={[
          { name: 'خانه', href: '/' },
          { name: 'ماشین‌حساب قیمت', href: '/calculator' },
        ]}
      />
      <section className="py-16 sm:py-20">
        <Container>
          <PriceCalculator />
        </Container>
      </section>
    </>
  )
}
