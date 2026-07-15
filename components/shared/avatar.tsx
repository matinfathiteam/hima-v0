import { cn } from '@/lib/utils'

const PALETTE = [
  'bg-primary/15 text-primary',
  'bg-accent/20 text-accent',
  'bg-secondary text-secondary-foreground',
]

function initials(name: string) {
  const parts = name.trim().split(/\s+/)
  return (parts[0]?.[0] ?? '') + (parts[1]?.[0] ?? '')
}

export function Avatar({
  name,
  className,
}: {
  name: string
  className?: string
}) {
  const idx = name.length % PALETTE.length
  return (
    <span
      aria-hidden="true"
      className={cn(
        'flex shrink-0 items-center justify-center rounded-full text-sm font-bold',
        PALETTE[idx],
        className,
      )}
    >
      {initials(name)}
    </span>
  )
}
