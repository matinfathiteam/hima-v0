import type { Metadata } from 'next'
import { Container } from '@/components/shared/container'
import { PageHeader } from '@/components/shared/page-header'
import { ProjectCard } from '@/components/shared/project-card'
import { ProjectFilters, type FilterTab } from '@/components/projects/project-filters'
import { Pagination } from '@/components/shared/pagination'
import { CtaBand } from '@/components/shared/cta-band'
import { JsonLd } from '@/components/shared/json-ld'
import { projects } from '@/lib/data'
import { breadcrumbLd } from '@/lib/structured-data'

export const metadata: Metadata = {
  title: 'نمونه‌کارها',
  description:
    'نمونه‌کارهای هیما؛ پروژه‌هایی واقعی با نتایج قابل‌اندازه‌گیری، از فروشگاه اینترنتی تا گالری هنری و کلینیک پزشکی.',
  alternates: { canonical: '/projects' },
}

const PER_PAGE = 6

function buildTabs(): FilterTab[] {
  const seen = new Map<string, string>()
  for (const p of projects) seen.set(p.category, p.categoryLabel)
  return [
    { value: 'all', label: 'همه' },
    ...Array.from(seen, ([value, label]) => ({ value, label })),
  ]
}

export default async function ProjectsPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; page?: string }>
}) {
  const { category = 'all', page: pageParam } = await searchParams
  const tabs = buildTabs()
  const activeCategory = tabs.some((t) => t.value === category) ? category : 'all'

  const filtered =
    activeCategory === 'all'
      ? projects
      : projects.filter((p) => p.category === activeCategory)

  const currentPage = Math.max(1, Number(pageParam) || 1)
  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE))
  const safePage = Math.min(currentPage, totalPages)
  const start = (safePage - 1) * PER_PAGE
  const pageItems = filtered.slice(start, start + PER_PAGE)

  return (
    <>
      <JsonLd
        data={breadcrumbLd([
          { name: 'خانه', url: '/' },
          { name: 'نمونه‌کارها', url: '/projects' },
        ])}
      />
      <PageHeader
        eyebrow="نمونه‌کارها"
        title="نتیجه‌ها حرف می‌زنند"
        description="هر پروژه، داستان رشد یک کسب‌وکار است. این‌ها فقط سایت نیستند؛ نتیجه‌های واقعی‌اند."
        breadcrumbs={[
          { name: 'خانه', href: '/' },
          { name: 'نمونه‌کارها', href: '/projects' },
        ]}
      />

      <section className="py-16 sm:py-20">
        <Container className="flex flex-col gap-10">
          <ProjectFilters tabs={tabs} active={activeCategory} />

          {pageItems.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {pageItems.map((project) => (
                <ProjectCard key={project.slug} project={project} />
              ))}
            </div>
          ) : (
            <p className="py-12 text-center text-muted-foreground">
              نمونه‌کاری در این دسته‌بندی یافت نشد.
            </p>
          )}

          <Pagination
            basePath="/projects"
            currentPage={safePage}
            totalPages={totalPages}
            extraParams={activeCategory !== 'all' ? { category: activeCategory } : undefined}
          />
        </Container>
      </section>

      <CtaBand />
    </>
  )
}
