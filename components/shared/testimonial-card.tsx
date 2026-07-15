import { Quote } from 'lucide-react'
import { Avatar } from '@/components/shared/avatar'
import { Badge } from '@/components/ui/badge'
import type { Testimonial } from '@/types'

export function TestimonialCard({ item }: { item: Testimonial }) {
  return (
    <figure className="flex h-full flex-col gap-4 rounded-2xl border border-border bg-card p-6">
      <Quote className="size-7 text-primary/30" aria-hidden="true" />
      <blockquote className="flex-1 text-sm leading-relaxed text-foreground">
        {item.quote}
      </blockquote>
      <Badge variant="accent" className="w-fit">
        {item.result}
      </Badge>
      <figcaption className="flex items-center gap-3 border-t border-border pt-4">
        <Avatar name={item.name} className="size-11" />
        <div className="flex flex-col">
          <span className="text-sm font-bold">{item.name}</span>
          <span className="text-xs text-muted-foreground">
            {item.role}، {item.company}
          </span>
        </div>
      </figcaption>
    </figure>
  )
}
