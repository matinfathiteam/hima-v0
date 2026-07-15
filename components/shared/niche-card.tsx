import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { Icon } from '@/components/ui/icon'
import { formatMillionToman } from '@/lib/format'
import type { Niche } from '@/types'

export function NicheCard({ niche }: { niche: Niche }) {
  return (
    <Link
      href={`/services/${niche.slug}`}
      className="group flex items-center gap-4 rounded-2xl border border-border bg-card p-5 transition-all hover:-translate-y-1 hover:border-accent/50 hover:shadow-brand"
    >
      <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-accent/15 text-accent">
        <Icon name={niche.icon} className="size-6" />
      </span>
      <div className="flex flex-col gap-1">
        <h3 className="font-bold">{niche.title}</h3>
        <p className="text-xs leading-relaxed text-muted-foreground">
          {niche.shortValue}
        </p>
        <span className="mt-1 text-xs text-muted-foreground">
          از {formatMillionToman(niche.priceRangeMin)}
        </span>
      </div>
      <ArrowLeft className="mr-auto size-5 shrink-0 text-muted-foreground transition-all group-hover:-translate-x-1 group-hover:text-accent" />
    </Link>
  )
}
