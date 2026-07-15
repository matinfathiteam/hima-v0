import type { Metadata } from 'next'
import { Container } from '@/components/shared/container'
import { PageHeader } from '@/components/shared/page-header'
import { SectionHeading } from '@/components/shared/section-heading'
import { ServiceCard } from '@/components/shared/service-card'
import { NicheCard } from '@/components/shared/niche-card'
import { CtaBand } from '@/components/shared/cta-band'
import { JsonLd } from '@/components/shared/json-ld'
import { services, niches } from '@/lib/data'
import { breadcrumbLd } from '@/lib/structured-data'

export const metadata: Metadata = {
  title: 'خدمات ما',
  description:
    'خدمات هیما: طراحی سایت، فروشگاه اینترنتی، برندینگ، سئو، دیجیتال مارکتینگ و تولید محتوا؛ همه با تمرکز بر رشد واقعی کسب‌وکار شما.',
  alternates: { canonical: '/services' },
}

export default function ServicesPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbLd([
          { name: 'خانه', url: '/' },
          { name: 'خدمات', url: '/services' },
        ])}
      />
      <PageHeader
        eyebrow="خدمات هیما"
        title="راهکارهایی که کسب‌وکار شما را جلو می‌برند"
        description="از طراحی سایت به‌عنوان خدمت پرچم‌دار تا برندینگ، سئو و بازاریابی؛ هر خدمت با یک هدف طراحی شده است: رشد قابل‌اندازه‌گیری شما."
        breadcrumbs={[
          { name: 'خانه', href: '/' },
          { name: 'خدمات', href: '/services' },
        ]}
      />

      <section className="py-16 sm:py-20">
        <Container className="flex flex-col gap-10">
          <SectionHeading
            align="start"
            eyebrow="خدمات اصلی"
            title="هر آنچه برای حضور دیجیتال حرفه‌ای نیاز دارید"
          />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <ServiceCard key={service.slug} service={service} />
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-muted/40 py-16 sm:py-20">
        <Container className="flex flex-col gap-10">
          <SectionHeading
            align="start"
            eyebrow="تخصص نیچ‌محور"
            title="راهکارهای اختصاصی برای صنعت شما"
            description="برای هر صنعت، تجربه و راهکار آزموده داریم."
          />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {niches.map((niche) => (
              <NicheCard key={niche.slug} niche={niche} />
            ))}
          </div>
        </Container>
      </section>

      <CtaBand />
    </>
  )
}
