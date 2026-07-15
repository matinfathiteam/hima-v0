import Link from 'next/link'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import { toPersianDigits } from '@/lib/format'

/** Builds a query string, preserving extra params and setting page. */
function pageHref(basePath: string, page: number, extra?: Record<string, string>) {
  const params = new URLSearchParams(extra)
  if (page > 1) params.set('page', String(page))
  else params.delete('page')
  const qs = params.toString()
  return qs ? `${basePath}?${qs}` : basePath
}

export function Pagination({
  basePath,
  currentPage,
  totalPages,
  extraParams,
}: {
  basePath: string
  currentPage: number
  totalPages: number
  extraParams?: Record<string, string>
}) {
  if (totalPages <= 1) return null
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1)

  return (
    <nav aria-label="صفحه‌بندی" className="flex items-center justify-center gap-2">
      <PageLink
        href={pageHref(basePath, currentPage - 1, extraParams)}
        disabled={currentPage <= 1}
        aria-label="صفحه‌ی قبل"
      >
        <ChevronRight className="size-4" aria-hidden="true" />
      </PageLink>

      {pages.map((p) => (
        <PageLink
          key={p}
          href={pageHref(basePath, p, extraParams)}
          active={p === currentPage}
          aria-label={`صفحه‌ی ${toPersianDigits(p)}`}
          aria-current={p === currentPage ? 'page' : undefined}
        >
          {toPersianDigits(p)}
        </PageLink>
      ))}

      <PageLink
        href={pageHref(basePath, currentPage + 1, extraParams)}
        disabled={currentPage >= totalPages}
        aria-label="صفحه‌ی بعد"
      >
        <ChevronLeft className="size-4" aria-hidden="true" />
      </PageLink>
    </nav>
  )
}

function PageLink({
  href,
  active,
  disabled,
  children,
  ...rest
}: {
  href: string
  active?: boolean
  disabled?: boolean
  children: React.ReactNode
} & React.AriaAttributes) {
  const className = cn(
    'flex size-10 items-center justify-center rounded-lg border text-sm font-medium transition-colors',
    active
      ? 'border-primary bg-primary text-primary-foreground'
      : 'border-border bg-card text-foreground hover:bg-muted',
    disabled && 'pointer-events-none opacity-40',
  )
  if (disabled) {
    return (
      <span className={className} aria-disabled="true" {...rest}>
        {children}
      </span>
    )
  }
  return (
    <Link href={href} className={className} {...rest}>
      {children}
    </Link>
  )
}
