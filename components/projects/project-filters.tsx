import Link from 'next/link'
import { cn } from '@/lib/utils'

export type FilterTab = { value: string; label: string }

export function ProjectFilters({
  tabs,
  active,
}: {
  tabs: FilterTab[]
  active: string
}) {
  return (
    <div className="flex flex-wrap gap-2" role="tablist" aria-label="فیلتر دسته‌بندی نمونه‌کارها">
      {tabs.map((tab) => {
        const isActive = tab.value === active
        const href = tab.value === 'all' ? '/projects' : `/projects?category=${tab.value}`
        return (
          <Link
            key={tab.value}
            href={href}
            role="tab"
            aria-selected={isActive}
            className={cn(
              'rounded-full border px-4 py-2 text-sm font-medium transition-colors',
              isActive
                ? 'border-primary bg-primary text-primary-foreground'
                : 'border-border bg-card text-muted-foreground hover:bg-muted hover:text-foreground',
            )}
          >
            {tab.label}
          </Link>
        )
      })}
    </div>
  )
}
