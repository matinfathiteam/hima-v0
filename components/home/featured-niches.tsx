import { Container } from '@/components/shared/container'
import { SectionHeading } from '@/components/shared/section-heading'
import { NicheCard } from '@/components/shared/niche-card'
import { niches } from '@/lib/data'

export function FeaturedNiches() {
  return (
    <section className="py-16 sm:py-20">
      <Container className="flex flex-col gap-12">
        <SectionHeading
          eyebrow="تخصص نیچ‌محور"
          title="برای صنعت شما، راهکار اختصاصی"
          description="هر کسب‌وکار زبان خودش را دارد؛ ما آن را بلدیم."
        />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {niches.map((niche) => (
            <NicheCard key={niche.slug} niche={niche} />
          ))}
        </div>
      </Container>
    </section>
  )
}
