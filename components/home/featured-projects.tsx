import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { Container } from '@/components/shared/container'
import { SectionHeading } from '@/components/shared/section-heading'
import { ProjectCard } from '@/components/shared/project-card'
import { Button } from '@/components/ui/button'
import { projects } from '@/lib/data'

export function FeaturedProjects() {
  const featured = projects.filter((p) => p.featured).slice(0, 3)
  return (
    <section className="bg-muted/40 py-16 sm:py-20">
      <Container className="flex flex-col gap-12">
        <SectionHeading
          eyebrow="نمونه‌کارها"
          title="نتیجه‌ها حرف می‌زنند"
          description="پروژه‌هایی که فقط زیبا نیستند؛ برای کسب‌وکار مشتری رشد واقعی ساختند."
        />
        <div className="grid gap-6 md:grid-cols-3">
          {featured.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
        <div className="flex justify-center">
          <Button
            size="lg"
            variant="outline"
            render={
              <Link href="/projects">
                مشاهده همه نمونه‌کارها
                <ArrowLeft className="size-4" />
              </Link>
            }
          />
        </div>
      </Container>
    </section>
  )
}
