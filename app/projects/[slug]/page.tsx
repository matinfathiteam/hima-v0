import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft, ArrowRight, ExternalLink, AlertCircle, Check, Quote } from 'lucide-react'
import { Container } from '@/components/shared/container'
import { PageHeader } from '@/components/shared/page-header'
import { SectionHeading } from '@/components/shared/section-heading'
import { VideoEmbedSlot } from '@/components/shared/video-embed-slot'
import { Avatar } from '@/components/shared/avatar'
import { CtaBand } from '@/components/shared/cta-band'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { JsonLd } from '@/components/shared/json-ld'
import { projects, getProject } from '@/lib/data'
import { breadcrumbLd } from '@/lib/structured-data'

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const project = getProject(slug)
  if (!project) return { title: 'نمونه‌کار یافت نشد' }
  return {
    title: project.title,
    description: project.summary,
    alternates: { canonical: `/projects/${project.slug}` },
    openGraph: {
      title: project.title,
      description: project.summary,
      images: [{ url: project.cover }],
    },
  }
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const project = getProject(slug)
  if (!project) notFound()

  const index = projects.findIndex((p) => p.slug === slug)
  const prev = index > 0 ? projects[index - 1] : null
  const next = index < projects.length - 1 ? projects[index + 1] : null

  return (
    <>
      <JsonLd
        data={breadcrumbLd([
          { name: 'خانه', url: '/' },
          { name: 'نمونه‌کارها', url: '/projects' },
          { name: project.title, url: `/projects/${project.slug}` },
        ])}
      />
      <PageHeader
        eyebrow={project.categoryLabel}
        title={project.title}
        description={project.summary}
        breadcrumbs={[
          { name: 'خانه', href: '/' },
          { name: 'نمونه‌کارها', href: '/projects' },
          { name: project.title, href: `/projects/${project.slug}` },
        ]}
      >
        <div className="mt-2 flex flex-wrap items-center gap-4">
          <span className="text-sm text-muted-foreground">
            کارفرما: <span className="font-bold text-foreground">{project.client}</span>
          </span>
          {project.liveUrl ? (
            <Button
              variant="outline"
              render={
                <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="size-4" />
                  مشاهده‌ی سایت
                </a>
              }
            />
          ) : null}
        </div>
      </PageHeader>

      <section className="py-12 sm:py-16">
        <Container className="flex flex-col gap-12">
          <div className="relative aspect-[16/9] w-full overflow-hidden rounded-3xl border border-border bg-muted">
            <Image
              src={project.cover || '/placeholder.svg'}
              alt={`نمای اصلی پروژه‌ی ${project.title}`}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 1024px"
              className="object-cover"
            />
          </div>

          <div className="grid gap-8 lg:grid-cols-2">
            <div className="flex flex-col gap-4 rounded-3xl border border-border bg-card p-7">
              <h2 className="flex items-center gap-2 text-xl font-bold">
                <AlertCircle className="size-5 text-destructive" aria-hidden="true" />
                چالش
              </h2>
              <p className="text-pretty leading-relaxed text-muted-foreground">
                {project.challenge}
              </p>
            </div>
            <div className="flex flex-col gap-4 rounded-3xl border border-primary/20 bg-primary/5 p-7">
              <h2 className="flex items-center gap-2 text-xl font-bold">
                <Check className="size-5 text-primary" aria-hidden="true" />
                راه‌حل
              </h2>
              <p className="text-pretty leading-relaxed text-muted-foreground">
                {project.solution}
              </p>
            </div>
          </div>
        </Container>
      </section>

      {project.gallery.length > 1 ? (
        <section className="pb-12 sm:pb-16">
          <Container className="flex flex-col gap-6">
            <SectionHeading align="start" title="گالری پروژه" />
            <div className="grid gap-5 sm:grid-cols-2">
              {project.gallery.map((src, i) => (
                <div
                  key={src + i}
                  className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-border bg-muted"
                >
                  <Image
                    src={src || '/placeholder.svg'}
                    alt={`تصویر ${i + 1} از پروژه‌ی ${project.title}`}
                    fill
                    loading="lazy"
                    sizes="(max-width: 640px) 100vw, 50vw"
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          </Container>
        </section>
      ) : null}

      {project.videoId ? (
        <section className="pb-12 sm:pb-16">
          <Container className="flex flex-col gap-6">
            <SectionHeading align="start" title="ویدیوی معرفی پروژه" />
            <VideoEmbedSlot videoId={project.videoId} title={project.title} />
          </Container>
        </section>
      ) : null}

      <section className="bg-muted/40 py-16 sm:py-20">
        <Container className="flex flex-col gap-10">
          <SectionHeading eyebrow="نتیجه" title="عددها دروغ نمی‌گویند" />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {project.metrics.map((m) => (
              <div
                key={m.label}
                className="flex flex-col gap-2 rounded-2xl border border-border bg-card p-7 text-center"
              >
                <span className="text-3xl font-black text-brand-gradient">{m.value}</span>
                <span className="text-sm text-muted-foreground">{m.label}</span>
              </div>
            ))}
          </div>

          {project.techStack.length > 0 ? (
            <div className="flex flex-wrap items-center justify-center gap-2">
              <span className="text-sm text-muted-foreground">تکنولوژی‌ها:</span>
              {project.techStack.map((t) => (
                <Badge key={t} variant="muted" className="font-mono text-xs">
                  {t}
                </Badge>
              ))}
            </div>
          ) : null}
        </Container>
      </section>

      {project.testimonial ? (
        <section className="py-16 sm:py-20">
          <Container>
            <figure className="mx-auto flex max-w-2xl flex-col items-center gap-5 text-center">
              <Quote className="size-9 text-primary/30" aria-hidden="true" />
              <blockquote className="text-balance text-xl font-medium leading-relaxed">
                {project.testimonial.quote}
              </blockquote>
              <figcaption className="flex items-center gap-3">
                <Avatar name={project.testimonial.name} className="size-11" />
                <div className="flex flex-col items-start">
                  <span className="text-sm font-bold">{project.testimonial.name}</span>
                  <span className="text-xs text-muted-foreground">
                    {project.testimonial.role}
                  </span>
                </div>
              </figcaption>
            </figure>
          </Container>
        </section>
      ) : null}

      <section className="border-t border-border py-10">
        <Container className="flex items-center justify-between gap-4">
          {prev ? (
            <Link
              href={`/projects/${prev.slug}`}
              className="group flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground"
            >
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
              <span className="flex flex-col items-start">
                <span className="text-xs">پروژه‌ی قبلی</span>
                <span className="font-bold text-foreground">{prev.title}</span>
              </span>
            </Link>
          ) : (
            <span />
          )}
          {next ? (
            <Link
              href={`/projects/${next.slug}`}
              className="group flex items-center gap-2 text-start text-sm font-medium text-muted-foreground hover:text-foreground"
            >
              <span className="flex flex-col items-end">
                <span className="text-xs">پروژه‌ی بعدی</span>
                <span className="font-bold text-foreground">{next.title}</span>
              </span>
              <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" />
            </Link>
          ) : (
            <span />
          )}
        </Container>
      </section>

      <CtaBand
        title="پروژه‌ی بعدی می‌تواند مال شما باشد"
        primaryLabel="شروع پروژه"
        primaryHref="/order"
      />
    </>
  )
}
