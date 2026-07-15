import type { Metadata } from 'next'
import { Container } from '@/components/shared/container'
import { PageHeader } from '@/components/shared/page-header'
import { TemplatePreviewTool } from '@/components/tools/template-preview-tool'
import { JsonLd } from '@/components/shared/json-ld'
import { breadcrumbLd } from '@/lib/structured-data'

export const metadata: Metadata = {
  title: 'ساخت پیش‌نمایش قالب',
  description:
    'نام کسب‌وکار، لوگو و پالت رنگی خود را انتخاب کنید و همین حالا یک پیش‌نمایش زنده از سایت‌تان ببینید.',
  alternates: { canonical: '/services/template' },
}

export default function TemplatePage() {
  return (
    <>
      <JsonLd
        data={breadcrumbLd([
          { name: 'خانه', url: '/' },
          { name: 'خدمات', url: '/services' },
          { name: 'پیش‌نمایش قالب', url: '/services/template' },
        ])}
      />
      <PageHeader
        eyebrow="ابزار تعاملی"
        title="سایت‌تان را همین حالا ببینید"
        description="نام برند، لوگو و رنگ دلخواه‌تان را انتخاب کنید و یک پیش‌نمایش زنده از سایت آینده‌تان بسازید. سپس با یک کلیک همان نسخه را سفارش دهید."
        breadcrumbs={[
          { name: 'خانه', href: '/' },
          { name: 'خدمات', href: '/services' },
          { name: 'پیش‌نمایش قالب', href: '/services/template' },
        ]}
      />
      <section className="py-16 sm:py-20">
        <Container>
          <TemplatePreviewTool />
        </Container>
      </section>
    </>
  )
}
