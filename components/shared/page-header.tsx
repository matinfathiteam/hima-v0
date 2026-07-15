import Link from 'next/link'
import { ChevronLeft } from 'lucide-react'
import { Container } from '@/components/shared/container'
import { Badge } from '@/components/ui/badge'

export type Crumb = { name: string; href: string }

export function PageHeader({
  eyebrow,
  title,
  description,
  breadcrumbs,
  children,
}: {
  eyebrow?: string
  title: string
  description?: string
  breadcrumbs?: Crumb[]
  children?: React.ReactNode
}) {
  return (
    <section className="relative overflow-hidden border-b border-border">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(55%_55%_at_85%_0%,oklch(0.9_0.06_320)_0%,transparent_60%)]" />
      <Container className="py-12 sm:py-16">
        {breadcrumbs ? (
          <nav aria-label="مسیر صفحه" className="mb-6">
            <ol className="flex flex-wrap items-center gap-1 text-sm text-muted-foreground">
              {breadcrumbs.map((c, i) => (
                <li key={c.href} className="flex items-center gap-1">
                  {i > 0 ? (
                    <ChevronLeft className="size-4 text-muted-foreground/60" aria-hidden="true" />
                  ) : null}
                  {i === breadcrumbs.length - 1 ? (
                    <span className="text-foreground">{c.name}</span>
                  ) : (
                    <Link href={c.href} className="transition-colors hover:text-foreground">
                      {c.name}
                    </Link>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        ) : null}
        <div className="flex max-w-3xl flex-col gap-4">
          {eyebrow ? <Badge variant="accent">{eyebrow}</Badge> : null}
          <h1 className="text-balance text-3xl font-black tracking-tight sm:text-4xl md:text-5xl">
            {title}
          </h1>
          {description ? (
            <p className="text-pretty text-lg leading-relaxed text-muted-foreground">
              {description}
            </p>
          ) : null}
          {children}
        </div>
      </Container>
    </section>
  )
}
