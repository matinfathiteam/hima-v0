import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { Container } from '@/components/shared/container'
import { SectionHeading } from '@/components/shared/section-heading'
import { TestimonialCard } from '@/components/shared/testimonial-card'
import { Button } from '@/components/ui/button'
import { testimonials } from '@/lib/data'

export function TestimonialsSection({ limit = 3 }: { limit?: number }) {
  const items = testimonials.slice(0, limit)
  return (
    <section className="bg-muted/40 py-16 sm:py-20">
      <Container className="flex flex-col gap-12">
        <SectionHeading
          eyebrow="نظر مشتریان"
          title="اعتماد، مهم‌ترین دستاورد ماست"
          description="نتیجه‌ی همسفری هیما، از زبان کسانی که تجربه‌اش کرده‌اند."
        />
        <div className="grid gap-6 md:grid-cols-3">
          {items.map((item) => (
            <TestimonialCard key={item.id} item={item} />
          ))}
        </div>
        <div className="flex justify-center">
          <Button
            size="lg"
            variant="outline"
            render={
              <Link href="/testimonials">
                همه‌ی نظرات
                <ArrowLeft className="size-4" />
              </Link>
            }
          />
        </div>
      </Container>
    </section>
  )
}
