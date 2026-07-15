import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { Container } from '@/components/shared/container'
import { SectionHeading } from '@/components/shared/section-heading'
import { ServiceCard } from '@/components/shared/service-card'
import { Button } from '@/components/ui/button'
import { services } from '@/lib/data'

export function FeaturedServices() {
  const items = services.slice(0, 8)
  return (
    <section className="bg-muted/40 py-16 sm:py-20">
      <Container className="flex flex-col gap-12">
        <SectionHeading
          eyebrow="خدمات ما"
          title="هر آنچه برای رشد دیجیتال نیاز دارید"
          description="از طراحی سایت به‌عنوان خدمت پرچم‌دار تا برندینگ و بازاریابی، همه زیر یک سقف."
        />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((service) => (
            <ServiceCard key={service.slug} service={service} />
          ))}
        </div>
        <div className="flex justify-center">
          <Button
            size="lg"
            variant="outline"
            render={
              <Link href="/services">
                مشاهده همه خدمات
                <ArrowLeft className="size-4" />
              </Link>
            }
          />
        </div>
      </Container>
    </section>
  )
}
