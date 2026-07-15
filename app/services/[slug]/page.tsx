import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { ServiceDetail } from '@/components/services/service-detail'
import { NicheDetail } from '@/components/services/niche-detail'
import { JsonLd } from '@/components/shared/json-ld'
import { services, niches, getService, getNiche } from '@/lib/data'
import { serviceLd, breadcrumbLd, faqLd } from '@/lib/structured-data'

export function generateStaticParams() {
  return [
    ...services.map((s) => ({ slug: s.slug })),
    ...niches.map((n) => ({ slug: n.slug })),
  ]
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const service = getService(slug)
  const niche = getNiche(slug)

  if (service) {
    return {
      title: service.title,
      description: service.shortValue,
      alternates: { canonical: `/services/${service.slug}` },
    }
  }
  if (niche) {
    return {
      title: `طراحی سایت ${niche.title}`,
      description: niche.shortValue,
      alternates: { canonical: `/services/${niche.slug}` },
    }
  }
  return { title: 'خدمت یافت نشد' }
}

export default async function ServiceOrNichePage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const service = getService(slug)
  const niche = getNiche(slug)

  if (service) {
    return (
      <>
        <JsonLd data={serviceLd(service.title, service.shortValue, service.slug)} />
        <JsonLd
          data={breadcrumbLd([
            { name: 'خانه', url: '/' },
            { name: 'خدمات', url: '/services' },
            { name: service.title, url: `/services/${service.slug}` },
          ])}
        />
        {service.faqs.length > 0 ? <JsonLd data={faqLd(service.faqs)} /> : null}
        <ServiceDetail service={service} />
      </>
    )
  }

  if (niche) {
    return (
      <>
        <JsonLd
          data={serviceLd(`طراحی سایت ${niche.title}`, niche.shortValue, niche.slug)}
        />
        <JsonLd
          data={breadcrumbLd([
            { name: 'خانه', url: '/' },
            { name: 'خدمات', url: '/services' },
            { name: niche.title, url: `/services/${niche.slug}` },
          ])}
        />
        {niche.faqs.length > 0 ? <JsonLd data={faqLd(niche.faqs)} /> : null}
        <NicheDetail niche={niche} />
      </>
    )
  }

  notFound()
}
