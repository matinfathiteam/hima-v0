'use client'

import { useState } from 'react'
import { CheckCircle2, Gauge, Search, Smartphone, ShieldCheck } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { FormField, Input } from '@/components/ui/field'
import { sanitizeText } from '@/lib/format'
import { auditSchema } from '@/lib/validation'

const CHECKS = [
  { icon: Gauge, label: 'سرعت بارگذاری و کارایی فنی' },
  { icon: Search, label: 'وضعیت سئو و دیده‌شدن در گوگل' },
  { icon: Smartphone, label: 'تجربه‌ی کاربری روی موبایل' },
  { icon: ShieldCheck, label: 'امنیت و استانداردهای فنی' },
]

type Errors = Partial<Record<'website' | 'name' | 'contact', string>>

export function FreeAuditForm() {
  const [website, setWebsite] = useState('')
  const [name, setName] = useState('')
  const [contact, setContact] = useState('')
  const [errors, setErrors] = useState<Errors>({})
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const parsed = auditSchema.safeParse({
      website: sanitizeText(website),
      name: sanitizeText(name),
      contact: sanitizeText(contact),
    })
    if (!parsed.success) {
      const next: Errors = {}
      for (const issue of parsed.error.issues) {
        const key = issue.path[0] as keyof Errors
        if (key && !next[key]) next[key] = issue.message
      }
      setErrors(next)
      return
    }
    setErrors({})
    // Mock submit — no backend. Inline confirmation.
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="flex flex-col items-center gap-4 rounded-3xl border border-border bg-card p-8 text-center">
        <span className="flex size-14 items-center justify-center rounded-full bg-primary/10 text-primary">
          <CheckCircle2 className="size-8" aria-hidden="true" />
        </span>
        <h2 className="text-xl font-bold">درخواست آنالیز ثبت شد</h2>
        <p className="max-w-md text-sm leading-relaxed text-muted-foreground">
          تیم فنی هیما سایت شما را بررسی می‌کند و گزارش آنالیز رایگان را در کمتر از
          ۴۸ ساعت برایتان ارسال می‌کند.
        </p>
      </div>
    )
  }

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <div className="flex flex-col gap-6 rounded-3xl border border-border bg-muted/30 p-6 sm:p-8">
        <h2 className="text-xl font-bold">در این آنالیز چه چیزی بررسی می‌شود؟</h2>
        <ul className="flex flex-col gap-4">
          {CHECKS.map((c) => (
            <li key={c.label} className="flex items-center gap-3">
              <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <c.icon className="size-5" aria-hidden="true" />
              </span>
              <span className="text-sm leading-relaxed">{c.label}</span>
            </li>
          ))}
        </ul>
        <p className="mt-auto text-sm leading-relaxed text-muted-foreground">
          گزارش کاملاً رایگان است و هیچ تعهدی ایجاد نمی‌کند؛ فقط می‌خواهیم بدانید سایتتان
          کجا ایستاده و چطور می‌تواند بهتر شود.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        noValidate
        className="flex flex-col gap-5 rounded-3xl border border-border bg-card p-6 sm:p-8"
      >
        <FormField
          label="آدرس سایت شما"
          htmlFor="audit-website"
          required
          error={errors.website}
        >
          <Input
            id="audit-website"
            inputMode="url"
            dir="ltr"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
            aria-invalid={!!errors.website}
            aria-describedby={errors.website ? 'audit-website-error' : undefined}
            placeholder="example.com"
          />
        </FormField>

        <FormField label="نام شما" htmlFor="audit-name" required error={errors.name}>
          <Input
            id="audit-name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? 'audit-name-error' : undefined}
            placeholder="نام شما"
          />
        </FormField>

        <FormField
          label="ایمیل یا شماره تماس"
          htmlFor="audit-contact"
          required
          error={errors.contact}
        >
          <Input
            id="audit-contact"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            aria-invalid={!!errors.contact}
            aria-describedby={errors.contact ? 'audit-contact-error' : undefined}
            placeholder="example@mail.com یا ۰۹۱۲..."
          />
        </FormField>

        <Button type="submit" size="lg" className="bg-brand-gradient text-primary-foreground">
          درخواست آنالیز رایگان
        </Button>
      </form>
    </div>
  )
}
