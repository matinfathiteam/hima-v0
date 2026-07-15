'use client'

import { useMemo, useState } from 'react'
import type { Testimonial } from '@/types'
import { TestimonialCard } from '@/components/shared/testimonial-card'
import { cn } from '@/lib/utils'

type FilterOption = { value: string; label: string }

export function TestimonialsFilter({
  testimonials,
}: {
  testimonials: Testimonial[]
}) {
  const [active, setActive] = useState('all')

  const options: FilterOption[] = useMemo(() => {
    const seen = new Map<string, string>()
    for (const t of testimonials) {
      if (!seen.has(t.industry)) {
        seen.set(t.industry, t.industryLabel)
      }
    }
    return [
      { value: 'all', label: 'همه صنایع' },
      ...Array.from(seen.entries()).map(([value, label]) => ({ value, label })),
    ]
  }, [testimonials])

  const filtered = useMemo(
    () =>
      active === 'all'
        ? testimonials
        : testimonials.filter((t) => t.industry === active),
    [testimonials, active],
  )

  return (
    <div>
      <div
        className="flex flex-wrap justify-center gap-2"
        role="tablist"
        aria-label="فیلتر رضایت مشتریان بر اساس صنعت"
      >
        {options.map((opt) => {
          const isActive = active === opt.value
          return (
            <button
              key={opt.value}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => setActive(opt.value)}
              className={cn(
                'rounded-full border px-4 py-2 text-sm font-medium transition-colors',
                isActive
                  ? 'border-transparent bg-brand-gradient text-primary-foreground'
                  : 'border-border bg-card text-muted-foreground hover:text-foreground',
              )}
            >
              {opt.label}
            </button>
          )
        })}
      </div>

      <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filtered.map((t) => (
          <TestimonialCard key={t.id} item={t} />
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="mt-10 text-center text-muted-foreground">
          موردی برای این صنعت ثبت نشده است.
        </p>
      )}
    </div>
  )
}
