import { Hero } from '@/components/home/hero'
import { LogoCloud } from '@/components/home/logo-cloud'
import { WhyHima } from '@/components/home/why-hima'
import { FeaturedServices } from '@/components/home/featured-services'
import { FeaturedNiches } from '@/components/home/featured-niches'
import { FeaturedProjects } from '@/components/home/featured-projects'
import { ProcessTeaser } from '@/components/home/process-teaser'
import { TestimonialsSection } from '@/components/shared/testimonials-section'
import { HomeFaq } from '@/components/home/home-faq'
import { LatestPosts } from '@/components/home/latest-posts'
import { CalculatorTeaser } from '@/components/home/calculator-teaser'
import { CtaBand } from '@/components/shared/cta-band'
import { JsonLd } from '@/components/shared/json-ld'
import { faqs } from '@/lib/data'
import { organizationLd, localBusinessLd, faqLd } from '@/lib/structured-data'

export default function HomePage() {
  const homeFaqs = faqs.slice(0, 6)
  return (
    <>
      <JsonLd data={organizationLd()} />
      <JsonLd data={localBusinessLd()} />
      <JsonLd data={faqLd(homeFaqs)} />
      <Hero />
      <LogoCloud />
      <WhyHima />
      <FeaturedServices />
      <FeaturedNiches />
      <FeaturedProjects />
      <ProcessTeaser />
      <TestimonialsSection />
      <HomeFaq items={homeFaqs} />
      <LatestPosts />
      <CalculatorTeaser />
      <CtaBand />
    </>
  )
}
