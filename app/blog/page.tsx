import type { Metadata } from 'next'
import { Container } from '@/components/shared/container'
import { PageHeader } from '@/components/shared/page-header'
import { BlogCard } from '@/components/shared/blog-card'
import { Pagination } from '@/components/shared/pagination'
import { CtaBand } from '@/components/shared/cta-band'
import { JsonLd } from '@/components/shared/json-ld'
import { blogPosts } from '@/lib/data'
import { breadcrumbLd } from '@/lib/structured-data'

export const metadata: Metadata = {
  title: 'بلاگ',
  description:
    'مقالات و راهنماهای هیما درباره‌ی طراحی سایت، هزینه‌ها، سئو و رشد دیجیتال برای کسب‌وکارهای ایرانی.',
  alternates: { canonical: '/blog' },
}

const PER_PAGE = 6

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>
}) {
  const { page: pageParam } = await searchParams
  const totalPages = Math.max(1, Math.ceil(blogPosts.length / PER_PAGE))
  const currentPage = Math.min(Math.max(1, Number(pageParam) || 1), totalPages)
  const start = (currentPage - 1) * PER_PAGE
  const pageItems = blogPosts.slice(start, start + PER_PAGE)

  return (
    <>
      <JsonLd
        data={breadcrumbLd([
          { name: 'خانه', url: '/' },
          { name: 'بلاگ', url: '/blog' },
        ])}
      />
      <PageHeader
        eyebrow="بلاگ هیما"
        title="راهنمای رشد دیجیتال کسب‌وکار شما"
        description="مقالاتی کاربردی درباره‌ی هزینه‌ها، تصمیم‌های درست و رشد آنلاین؛ نوشته‌شده برای کسب‌وکارهای ایرانی."
        breadcrumbs={[
          { name: 'خانه', href: '/' },
          { name: 'بلاگ', href: '/blog' },
        ]}
      />

      <section className="py-16 sm:py-20">
        <Container className="flex flex-col gap-10">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {pageItems.map((post) => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </div>
          <Pagination basePath="/blog" currentPage={currentPage} totalPages={totalPages} />
        </Container>
      </section>

      <CtaBand />
    </>
  )
}
