import Link from 'next/link'
import { ArrowLeft, AlertCircle, Check } from 'lucide-react'
import { Container } from '@/components/shared/container'
import { PageHeader } from '@/components/shared/page-header'
import { SectionHeading } from '@/components/shared/section-heading'
import { FaqAccordion } from '@/components/shared/faq-accordion'
import { ProjectCard } from '@/components/shared/project-card'
import { CtaBand } from '@/components/shared/cta-band'
import { Icon } from '@/components/ui/icon'
import { Button } from '@/components/ui/button'
import { formatMillionToman } from '@/lib/format'
import { getRelatedProjects } from '@/lib/data'
import type { Niche } from '@/types'

export function NicheDetail({ niche }: { niche: Niche }) {
  const relatedProjects = getRelatedProjects(niche.relatedProjectSlugs).slice(0, 3)

  return (
    <>
      <PageHeader
        eyebrow="تخصص نیچ‌محور"
        title={`طراحی سایت ${niche.title}`}
        description={niche.heroTagline}
        breadcrumbs={[
          { name: 'خانه', href: '/' },
          { name: 'خدمات', href: '/services' },
          { name: niche.title, href: `/services/${niche.slug}` },
        ]}
      >
        <div className="mt-2 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
          <div className="flex items-center gap-3 rounded-2xl border border-border bg-card px-4 py-3">
            <span className="flex size-10 items-center justify-center rounded-xl bg-accent/15 text-accent">
              <Icon name={niche.icon} className="size-5" />
            </span>
            <div className="flex flex-col">
              <span className="text-xs text-muted-foreground">بازه‌ی قیمت</span>
              <span className="text-sm font-bold">
                {formatMillionToman(niche.priceRangeMin)} تا{' '}
                {formatMillionToman(niche.priceRangeMax)}
              </span>
            </div>
          </div>
          <Button
            size="lg"
            className="bg-brand-gradient text-primary-foreground"
            render={
              <Link href={`/order?niche=${niche.slug}`}>
                درخواست پروژه
                <ArrowLeft className="size-4" />
              </Link>
            }
          />
        </div>
      </PageHeader>

      <section className="py-16 sm:py-20">
        <Container className="grid gap-8 lg:grid-cols-2">
          <div className="flex flex-col gap-6 rounded-3xl border border-border bg-card p-7">
            <h2 className="flex items-center gap-2 text-xl font-bold">
              <AlertCircle className="size-5 text-destructive" aria-hidden="true" />
              چالش‌هایی که می‌شناسیم
            </h2>
            <ul className="flex flex-col gap-3">
              {niche.painPoints.map((p) => (
                <li key={p} className="flex items-start gap-2.5 text-sm leading-relaxed">
                  <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-destructive" />
                  {p}
                </li>
              ))}
            </ul>
          </div>
          <div className="flex flex-col gap-6 rounded-3xl border border-primary/20 bg-primary/5 p-7">
            <h2 className="flex items-center gap-2 text-xl font-bold">
              <Check className="size-5 text-primary" aria-hidden="true" />
              راهکار هیما
            </h2>
            <ul className="flex flex-col gap-3">
              {niche.solutions.map((s) => (
                <li key={s} className="flex items-start gap-2.5 text-sm leading-relaxed">
                  <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-primary/15 text-primary">
                    <Check className="size-3.5" aria-hidden="true" />
                  </span>
                  {s}
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      {relatedProjects.length > 0 ? (
        <section className="bg-muted/40 py-16 sm:py-20">
          <Container className="flex flex-col gap-10">
            <SectionHeading
              eyebrow="نمونه‌کارهای مرتبط"
              title={`پروژه‌های ${niche.title} ما`}
            />
            <div className="grid gap-6 md:grid-cols-3">
              {relatedProjects.map((project) => (
                <ProjectCard key={project.slug} project={project} />
              ))}
            </div>
          </Container>
        </section>
      ) : null}

      {niche.faqs.length > 0 ? (
        <section className="py-16 sm:py-20">
          <Container className="flex flex-col gap-10">
            <SectionHeading
              eyebrow="سوالات متداول"
              title={`سوال‌های رایج درباره‌ی سایت ${niche.title}`}
            />
            <div className="mx-auto w-full max-w-3xl">
              <FaqAccordion items={niche.faqs} />
            </div>
          </Container>
        </section>
      ) : null}

      <CtaBand
        title={`سایت ${niche.title} خود را با هیما بسازید`}
        primaryLabel="درخواست پروژه"
        primaryHref={`/order?niche=${niche.slug}`}
      />
    </>
  )
}
