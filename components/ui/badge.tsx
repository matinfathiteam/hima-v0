import { cn } from '@/lib/utils'

export function Badge({
  className,
  variant = 'default',
  children,
}: {
  className?: string
  variant?: 'default' | 'outline' | 'accent' | 'muted'
  children: React.ReactNode
}) {
  const variants = {
    default: 'bg-primary/10 text-primary',
    accent: 'bg-accent/15 text-accent',
    outline: 'border border-border text-muted-foreground',
    muted: 'bg-muted text-muted-foreground',
  }
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium',
        variants[variant],
        className,
      )}
    >
      {children}
    </span>
  )
}
