'use client'

import { useMemo, useState } from 'react'
import { CheckCircle2, Copy, Check, RefreshCw } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { FormField, Input, Textarea } from '@/components/ui/field'
import { sanitizeText } from '@/lib/format'
import { referSchema } from '@/lib/validation'

function makeCode() {
  const chars = 'ABCDEFGHJKMNPQRSTUVWXYZ23456789'
  let code = ''
  for (let i = 0; i < 6; i++) code += chars[Math.floor(Math.random() * chars.length)]
  return `HIMA-${code}`
}

type Errors = Partial<Record<'name' | 'contact' | 'referredName' | 'note', string>>

export function ReferForm() {
  const initialCode = useMemo(() => makeCode(), [])
  const [code, setCode] = useState(initialCode)
  const [copied, setCopied] = useState(false)
  const [name, setName] = useState('')
  const [contact, setContact] = useState('')
  const [referredName, setReferredName] = useState('')
  const [note, setNote] = useState('')
  const [errors, setErrors] = useState<Errors>({})
  const [submitted, setSubmitted] = useState(false)

  async function copyCode() {
    try {
      await navigator.clipboard.writeText(code)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      /* clipboard may be blocked */
    }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const parsed = referSchema.safeParse({
      name: sanitizeText(name),
      contact: sanitizeText(contact),
      referredName: sanitizeText(referredName),
      note: sanitizeText(note),
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
        <h2 className="text-xl font-bold">معرفی شما ثبت شد</h2>
        <p className="max-w-md text-sm leading-relaxed text-muted-foreground">
          ممنون که هیما را معرفی کردید. به‌محض عقد قرارداد با فرد معرفی‌شده، پورسانت شما
          محاسبه و پرداخت می‌شود. کد معرف شما:{' '}
          <span className="font-bold text-foreground">{code}</span>
        </p>
      </div>
    )
  }

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      {/* Referral code panel */}
      <div className="flex h-fit flex-col gap-5 rounded-3xl border border-border bg-muted/30 p-6 sm:p-8">
        <h2 className="text-xl font-bold">کد معرف اختصاصی شما</h2>
        <p className="text-sm leading-relaxed text-muted-foreground">
          این کد را به دوستان و آشنایانتان بدهید؛ هنگام ثبت سفارش وارد می‌شود و پورسانت شما
          به آن گره می‌خورد.
        </p>
        <div className="flex items-center gap-2 rounded-2xl border border-dashed border-primary/40 bg-background p-4">
          <span dir="ltr" className="flex-1 font-mono text-lg font-bold tracking-wider text-primary">
            {code}
          </span>
          <Button
            type="button"
            variant="outline"
            size="icon"
            aria-label="کپی کد معرف"
            onClick={copyCode}
          >
            {copied ? <Check className="size-4 text-primary" /> : <Copy className="size-4" />}
          </Button>
          <Button
            type="button"
            variant="outline"
            size="icon"
            aria-label="ساخت کد جدید"
            onClick={() => setCode(makeCode())}
          >
            <RefreshCw className="size-4" />
          </Button>
        </div>
        <p className="text-xs leading-relaxed text-muted-foreground">
          پورسانت شما ۱۰ تا ۱۵ درصد از مبلغ اولین قرارداد فرد معرفی‌شده است.
        </p>
      </div>

      {/* Submission form */}
      <form
        onSubmit={handleSubmit}
        noValidate
        className="flex flex-col gap-5 rounded-3xl border border-border bg-card p-6 sm:p-8"
      >
        <FormField label="نام شما (معرف)" htmlFor="refer-name" required error={errors.name}>
          <Input
            id="refer-name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? 'refer-name-error' : undefined}
            placeholder="نام شما"
          />
        </FormField>

        <FormField
          label="ایمیل یا شماره تماس شما"
          htmlFor="refer-contact"
          required
          error={errors.contact}
        >
          <Input
            id="refer-contact"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            aria-invalid={!!errors.contact}
            aria-describedby={errors.contact ? 'refer-contact-error' : undefined}
            placeholder="example@mail.com یا ۰۹۱۲..."
          />
        </FormField>

        <FormField
          label="نام فرد یا کسب‌وکار معرفی‌شده"
          htmlFor="refer-referred"
          required
          error={errors.referredName}
        >
          <Input
            id="refer-referred"
            value={referredName}
            onChange={(e) => setReferredName(e.target.value)}
            aria-invalid={!!errors.referredName}
            aria-describedby={errors.referredName ? 'refer-referred-error' : undefined}
            placeholder="نام فرد یا کسب‌وکاری که معرفی می‌کنید"
          />
        </FormField>

        <FormField label="توضیحات (اختیاری)" htmlFor="refer-note" error={errors.note}>
          <Textarea
            id="refer-note"
            value={note}
            maxLength={500}
            onChange={(e) => setNote(e.target.value)}
            placeholder="اگر نکته‌ای درباره‌ی نیاز فرد معرفی‌شده هست، بنویسید..."
          />
        </FormField>

        <Button type="submit" size="lg" className="bg-brand-gradient text-primary-foreground">
          ثبت معرفی
        </Button>
      </form>
    </div>
  )
}
