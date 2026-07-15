'use client'

import { useState } from 'react'
import { CheckCircle2, Send } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { FormField, Input, Textarea, Select } from '@/components/ui/field'
import { services } from '@/lib/data'
import { sanitizeText } from '@/lib/format'
import { contactSchema } from '@/lib/validation'

const SUBJECTS = [
  { value: '', label: 'یک موضوع انتخاب کنید' },
  ...services.map((s) => ({ value: s.slug, label: s.title })),
  { value: 'consultation', label: 'مشاوره و راهنمایی' },
  { value: 'other', label: 'موضوع دیگر' },
]

type Errors = Partial<Record<'name' | 'contact' | 'subject' | 'message', string>>

export function ContactForm() {
  const [name, setName] = useState('')
  const [contact, setContact] = useState('')
  const [subject, setSubject] = useState('')
  const [message, setMessage] = useState('')
  const [errors, setErrors] = useState<Errors>({})
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const parsed = contactSchema.safeParse({
      name: sanitizeText(name),
      contact: sanitizeText(contact),
      subject,
      message: sanitizeText(message),
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
    // Mock submit — no backend. Show inline confirmation.
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="flex flex-col items-center gap-4 rounded-3xl border border-border bg-card p-8 text-center">
        <span className="flex size-14 items-center justify-center rounded-full bg-primary/10 text-primary">
          <CheckCircle2 className="size-8" aria-hidden="true" />
        </span>
        <h2 className="text-xl font-bold">پیام شما دریافت شد</h2>
        <p className="max-w-md text-sm leading-relaxed text-muted-foreground">
          ممنون که با هیما تماس گرفتید. کارشناسان ما در کمتر از ۴۸ ساعت پاسخ شما را می‌دهند.
        </p>
      </div>
    )
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="flex flex-col gap-5 rounded-3xl border border-border bg-card p-6 sm:p-8"
    >
      <FormField label="نام و نام خانوادگی" htmlFor="contact-name" required error={errors.name}>
        <Input
          id="contact-name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          aria-invalid={!!errors.name}
          aria-describedby={errors.name ? 'contact-name-error' : undefined}
          placeholder="نام شما"
        />
      </FormField>

      <FormField
        label="ایمیل یا شماره تماس"
        htmlFor="contact-contact"
        required
        error={errors.contact}
      >
        <Input
          id="contact-contact"
          value={contact}
          onChange={(e) => setContact(e.target.value)}
          aria-invalid={!!errors.contact}
          aria-describedby={errors.contact ? 'contact-contact-error' : undefined}
          placeholder="example@mail.com یا ۰۹۱۲..."
        />
      </FormField>

      <FormField label="موضوع" htmlFor="contact-subject" required error={errors.subject}>
        <Select
          id="contact-subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          aria-invalid={!!errors.subject}
          aria-describedby={errors.subject ? 'contact-subject-error' : undefined}
        >
          {SUBJECTS.map((s) => (
            <option key={s.value} value={s.value}>
              {s.label}
            </option>
          ))}
        </Select>
      </FormField>

      <FormField label="پیام شما" htmlFor="contact-message" required error={errors.message}>
        <Textarea
          id="contact-message"
          value={message}
          maxLength={2000}
          onChange={(e) => setMessage(e.target.value)}
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? 'contact-message-error' : undefined}
          placeholder="درباره‌ی پروژه یا سوالتان بنویسید..."
        />
      </FormField>

      <Button type="submit" size="lg" className="bg-brand-gradient text-primary-foreground">
        ارسال پیام
        <Send className="size-4" />
      </Button>
    </form>
  )
}
