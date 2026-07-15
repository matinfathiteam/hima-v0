import { SITE } from '@/lib/site'
import type { FAQ } from '@/types'

export function organizationLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE.legalName,
    alternateName: SITE.nameEn,
    url: SITE.url,
    email: SITE.email,
    slogan: SITE.tagline,
    sameAs: [SITE.social.instagram, SITE.social.linkedin, SITE.social.telegram],
  }
}

export function localBusinessLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: SITE.legalName,
    image: `${SITE.url}/images/hero.png`,
    url: SITE.url,
    email: SITE.email,
    telephone: SITE.phoneHref,
    address: {
      '@type': 'PostalAddress',
      streetAddress: SITE.address,
      addressLocality: 'تهران',
      addressCountry: 'IR',
    },
    priceRange: '$$',
  }
}

export function faqLd(faqs: FAQ[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: { '@type': 'Answer', text: f.answer },
    })),
  }
}

export function serviceLd(name: string, description: string, slug: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name,
    description,
    provider: { '@type': 'Organization', name: SITE.legalName },
    url: `${SITE.url}/services/${slug}`,
    areaServed: 'IR',
  }
}

export function articleLd(opts: {
  title: string
  description: string
  slug: string
  date: string
  author: string
  image: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: opts.title,
    description: opts.description,
    datePublished: opts.date,
    author: { '@type': 'Person', name: opts.author },
    image: `${SITE.url}${opts.image}`,
    publisher: { '@type': 'Organization', name: SITE.legalName },
    mainEntityOfPage: `${SITE.url}/blog/${opts.slug}`,
  }
}

export function breadcrumbLd(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: `${SITE.url}${item.url}`,
    })),
  }
}
