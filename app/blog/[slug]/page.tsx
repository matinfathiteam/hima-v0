import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { Clock, ArrowLeft } from 'lucide-react'
import { Container } from '@/components/shared/container'
import { PageHeader } from '@/components/shared/page-header'
import { SectionHeading } from '@/components/shared/section-heading'
import { BlogCard } from '@/components/shared/blog-card'
import { Avatar } from '@/components/shared/avatar'
import { CtaBand } from '@/components/shared/cta-band'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { JsonLd } from '@/components/shared/json-ld'
import { blogPosts, getBlogPost, getNiche } from '@/lib/data'
import { articleLd, breadcrumbLd } from '@/lib/structured-data'
import { toPersianDigits } from '@/lib/format'

export function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const post = getBlogPost(slug)
  if (!post) return { title: 'مقاله یافت نشد' }
  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      type: 'article',
      title: post.title,
      description: post.excerpt,
      publishedTime: post.date,
      authors: [post.author],
      images: [{ url: post.cover }],
    },
  }
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = getBlogPost(slug)
  if (!post) notFound()

  const niche = getNiche(post.nicheSlug)
  const related = blogPosts.filter((p) => p.slug !== post.slug).slice(0, 3)

  return (
    <>
      <JsonLd
        data={articleLd({
          title: post.title,
          description: post.excerpt,
          slug: post.slug,
          date: post.date,
          author: post.author,
          image: post.cover,
        })}
      />
      <JsonLd
        data={breadcrumbLd([
          { name: 'خانه', url: '/' },
          { name: 'بلاگ', url: '/blog' },
          { name: post.title, url: `/blog/${post.slug}` },
        ])}
      />
      <PageHeader
        eyebrow={post.category}
        title={post.title}
        breadcrumbs={[
          { name: 'خانه', href: '/' },
          { name: 'بلاگ', href: '/blog' },
          { name: post.title, href: `/blog/${post.slug}` },
        ]}
      >
        <div className="mt-2 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
          <span className="flex items-center gap-2">
            <Avatar name={post.author} className="size-8" />
            {post.author}
          </span>
          <span>{toPersianDigits(post.date)}</span>
          <span className="flex items-center gap-1">
            <Clock className="size-4" aria-hidden="true" />
            {toPersianDigits(post.readingTime)} دقیقه مطالعه
          </span>
        </div>
      </PageHeader>

      <article className="py-12 sm:py-16">
        <Container className="flex max-w-3xl flex-col gap-8">
          <div className="relative aspect-[16/9] w-full overflow-hidden rounded-3xl border border-border bg-muted">
            <Image
              src={post.cover || '/placeholder.svg'}
              alt={post.title}
              fill
              priority
              sizes="(max-width: 768px) 100vw, 768px"
              className="object-cover"
            />
          </div>

          <div className="flex flex-col gap-8">
            {post.content.map((section) => (
              <section key={section.heading} className="flex flex-col gap-3">
                <h2 className="text-xl font-bold sm:text-2xl">{section.heading}</h2>
                <p className="text-pretty leading-loose text-muted-foreground">
                  {section.body}
                </p>
              </section>
            ))}
          </div>

          {niche ? (
            <div className="flex flex-col gap-3 rounded-2xl border border-primary/20 bg-primary/5 p-6 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm leading-relaxed">
                به دنبال طراحی سایت{' '}
                <span className="font-bold">{niche.title}</span> هستید؟ صفحه‌ی تخصصی
                هیما را ببینید.
              </p>
              <Button
                className="shrink-0 bg-brand-gradient text-primary-foreground"
                render={
                  <Link href={`/services/${niche.slug}`}>
                    مشاهده‌ی خدمت
                    <ArrowLeft className="size-4" />
                  </Link>
                }
              />
            </div>
          ) : null}

          <div className="flex items-center gap-4 rounded-2xl border border-border bg-card p-6">
            <Avatar name={post.author} className="size-14" />
            <div className="flex flex-col gap-1">
              <span className="font-bold">{post.author}</span>
              <span className="text-sm text-muted-foreground">{post.authorRole}</span>
            </div>
          </div>
        </Container>
      </article>

      <section className="bg-muted/40 py-16 sm:py-20">
        <Container className="flex flex-col gap-10">
          <SectionHeading eyebrow="ادامه‌ی مطالعه" title="مقالات مرتبط" />
          <div className="grid gap-6 md:grid-cols-3">
            {related.map((p) => (
              <BlogCard key={p.slug} post={p} />
            ))}
          </div>
        </Container>
      </section>

      <CtaBand />
    </>
  )
}
