import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { Icon } from '@/components/ui/icon'
import { formatToman } from '@/lib/format'
import type { Service } from '@/types'

export function ServiceCard({ service }: { service: Service }) {
  return (
    <Link
      href={`/services/${service.slug}`}
      className="group flex flex-col gap-4 rounded-2xl border border-border bg-card p-6 transition-all hover:-translate-y-1 hover:border-primary/40 hover:shadow-brand"
    >
      <span className="flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
        <Icon name={service.icon} className="size-6" />
      </span>
      <div className="flex flex-col gap-2">
        <h3 className="text-lg font-bold">{service.title}</h3>
        <p className="text-sm leading-relaxed text-muted-foreground">
          {service.shortValue}
        </p>
      </div>
      <div className="mt-auto flex items-center justify-between border-t border-border pt-4">
        <span className="text-sm text-muted-foreground">
          شروع از{' '}
          <span className="font-bold text-foreground">
            {formatToman(service.startingPrice)}
          </span>
        </span>
        <span className="flex items-center gap-1 text-sm font-medium text-primary">
          جزئیات
          <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" />
        </span>
      </div>
    </Link>
  )
}
