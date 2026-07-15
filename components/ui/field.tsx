import { cn } from '@/lib/utils'

export function Label({
  className,
  children,
  htmlFor,
  required,
}: {
  className?: string
  children: React.ReactNode
  htmlFor: string
  required?: boolean
}) {
  return (
    <label htmlFor={htmlFor} className={cn('text-sm font-medium', className)}>
      {children}
      {required ? <span className="text-destructive"> *</span> : null}
    </label>
  )
}

const controlClasses =
  'w-full rounded-lg border border-input bg-background px-3.5 py-2.5 text-sm outline-none transition-colors placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/40 aria-[invalid=true]:border-destructive aria-[invalid=true]:ring-destructive/20'

export function Input({ className, ...props }: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input className={cn(controlClasses, className)} {...props} />
}

export function Textarea({
  className,
  ...props
}: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea className={cn(controlClasses, 'min-h-32 resize-y', className)} {...props} />
}

export function Select({
  className,
  children,
  ...props
}: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select className={cn(controlClasses, 'appearance-none', className)} {...props}>
      {children}
    </select>
  )
}

export function FieldError({ id, children }: { id: string; children?: string }) {
  if (!children) return null
  return (
    <p id={id} className="text-xs font-medium text-destructive">
      {children}
    </p>
  )
}

export function FormField({
  label,
  htmlFor,
  required,
  error,
  children,
  className,
}: {
  label: string
  htmlFor: string
  required?: boolean
  error?: string
  children: React.ReactNode
  className?: string
}) {
  return (
    <div className={cn('flex flex-col gap-1.5', className)}>
      <Label htmlFor={htmlFor} required={required}>
        {label}
      </Label>
      {children}
      <FieldError id={`${htmlFor}-error`}>{error}</FieldError>
    </div>
  )
}
