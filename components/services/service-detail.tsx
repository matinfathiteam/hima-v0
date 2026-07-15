import Link from 'next/link'
import { ArrowLeft, Check, Sparkles } from 'lucide-react'
import { Container } from '@/components/shared/container'
import { PageHeader } from '@/components/shared/page-header'
import { SectionHeading } from '@/components/shared/section-heading'
import { FaqAccordion } from '@/components/shared/faq-accordion'
import { ProjectCard } from '@/components/shared/project-card'
import { CtaBand } from '@/components/shared/cta-band'
import { Icon } from '@/components/ui/icon'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { formatToman } from '@/lib/format'
import { getProjectsByService } from '@/lib/data'
import type { Service } from '@/types'

export function ServiceDetail({ service }: { service: Service }) {
  const relatedProjects = getProjectsByService(service.slug).slice(0, 3)

  return (
    <>
      <PageHeader
        eyebrow="خدمات هیما"
        title={service.title}
        description={service.heroTagline}
        breadcrumbs={[
          { name: 'خانه', href: '/' },
          { name: 'خدمات', href: '/services' },
          { name: service.title, href: `/services/${service.slug}` },
        ]}
      >
        <div className="mt-2 flex flex-col gap-3 sm:flex-row">
          <Button
            size="lg"
            className="bg-brand-gradient text-primary-foreground"
            render={
              <Link href={`/order?service=${service.slug}`}>
                ثبت سفارش این خدمت
                <ArrowLeft className="size-4" />
              </Link>
            }
          />
          <Button size="lg" variant="outline" render={<Link href="/pricing">مشاهده تعرفه‌ها</Link>} />
        </div>
      </PageHeader>

      <section className="py-16 sm:py-20">
        <Container className="grid gap-12 lg:grid-cols-[1.4fr_1fr]">
          <div className="flex flex-col gap-6">
            <SectionHeading align="start" title="این خدمت شامل چه چیزهایی است؟" />
            <p className="text-pretty leading-relaxed text-muted-foreground">
              {service.description}
            </p>
            <ul className="grid gap-3 sm:grid-cols-2">
              {service.deliverables.map((d) => (
                <li key={d} className="flex items-start gap-2.5 text-sm">
                  <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Check className="size-3.5" aria-hidden="true" />
                  </span>
                  <span className="leading-relaxed">{d}</span>
                </li>
              ))}
            </ul>
          </div>

          <aside className="flex h-fit flex-col gap-5 rounded-3xl border border-border bg-card p-6">
            <span className="flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <Icon name={service.icon} className="size-6" />
            </span>
            <div className="flex flex-col gap-1">
              <span className="text-sm text-muted-foreground">شروع از</span>
              <span className="text-2xl font-black text-foreground">
                {formatToman(service.startingPrice)}
              </span>
            </div>
            <div className="flex flex-col gap-2 border-t border-border pt-4">
              <span className="text-sm font-bold">تکنولوژی‌های ما</span>
              <div className="flex flex-wrap gap-2">
                {service.techStack.map((t) => (
                  <Badge key={t} variant="muted" className="font-mono text-xs">
                    {t}
                  </Badge>
                ))}
              </div>
              {service.slug === 'web-design' ? (
                <p className="mt-1 flex items-start gap-1.5 text-xs leading-relaxed text-muted-foreground">
                  <Sparkles className="mt-0.5 size-3.5 shrink-0 text-accent" aria-hidden="true" />
                  همین سایتی که می‌بینید با همین استک ساخته شده؛ بهترین نمونه‌کار ما، خود ماییم.
                </p>
              ) : null}
            </div>
            <Button
              className="bg-brand-gradient text-primary-foreground"
              render={<Link href={`/calculator`}>برآورد قیمت دقیق</Link>}
            />
          </aside>
        </Container>
      </section>

      <section className="bg-muted/40 py-16 sm:py-20">
        <Container className="flex flex-col gap-10">
          <SectionHeading
            eyebrow="فرایند اجرا"
            title="از ایده تا نتیجه، قدم‌به‌قدم"
          />
          <ol className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {service.process.map((step, i) => (
              <li
                key={step.title}
                className="flex flex-col gap-3 rounded-2xl border border-border bg-card p-6"
              >
                <span className="text-2xl font-black text-primary/25">
                  {String(i + 1).padStart(2, '۰')}
                </span>
                <h3 className="font-bold">{step.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {step.description}
                </p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      {relatedProjects.length > 0 ? (
        <section className="py-16 sm:py-20">
          <Container className="flex flex-col gap-10">
            <SectionHeading eyebrow="نمونه‌کارها" title="نتیجه‌ی کار ما را ببینید" />
            <div className="grid gap-6 md:grid-cols-3">
              {relatedProjects.map((project) => (
                <ProjectCard key={project.slug} project={project} />
              ))}
            </div>
          </Container>
        </section>
      ) : null}

      {service.faqs.length > 0 ? (
        <section className="bg-muted/40 py-16 sm:py-20">
          <Container className="flex flex-col gap-10">
            <SectionHeading eyebrow="سوالات متداول" title="سوال‌های رایج درباره‌ی این خدمت" />
            <div className="mx-auto w-full max-w-3xl">
              <FaqAccordion items={service.faqs} />
            </div>
          </Container>
        </section>
      ) : null}

      <CtaBand
        title={`آماده‌اید ${service.title} را شروع کنیم؟`}
        primaryLabel="ثبت سفارش"
        primaryHref={`/order?service=${service.slug}`}
      />
    </>
  )
}
