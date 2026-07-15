import type { Metadata } from 'next'
import { Container } from '@/components/shared/container'
import { PageHeader } from '@/components/shared/page-header'
import { FreeAuditForm } from '@/components/tools/free-audit-form'
import { JsonLd } from '@/components/shared/json-ld'
import { buildMetadata } from '@/lib/site'
import { breadcrumbLd } from '@/lib/structured-data'

export const metadata: Metadata = buildMetadata({
  title: 'آنالیز رایگان سایت',
  description:
    'آدرس سایت فعلی‌تان را بدهید تا تیم هیما سرعت، سئو، تجربه‌ی موبایل و امنیت آن را رایگان بررسی کند و گزارش بهبود بفرستد.',
  path: '/free-audit',
})

export default function FreeAuditPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbLd([
          { name: 'خانه', url: '/' },
          { name: 'آنالیز رایگان سایت', url: '/free-audit' },
        ])}
      />
      <PageHeader
        eyebrow="آنالیز رایگان"
        title="سایت فعلی‌تان چقدر خوب کار می‌کند؟"
        description="در چند ثانیه درخواست دهید تا یک گزارش شفاف از نقاط قوت و ضعف سایتتان دریافت کنید؛ رایگان و بدون تعهد."
        breadcrumbs={[
          { name: 'خانه', href: '/' },
          { name: 'آنالیز رایگان سایت', href: '/free-audit' },
        ]}
      />

      <section className="py-16 sm:py-20">
        <Container>
          <FreeAuditForm />
        </Container>
      </section>
    </>
  )
}
