'use client'

import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Check, ArrowLeft, ArrowRight, Upload, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { FormField, Input, Textarea } from '@/components/ui/field'
import { services, niches } from '@/lib/data'
import { sanitizeText } from '@/lib/format'
import { nameSchema, emailOrPhoneSchema } from '@/lib/validation'
import { cn } from '@/lib/utils'

const SERVICE_OPTIONS = [
  ...services.map((s) => ({ id: s.slug, label: s.title })),
  { id: 'consultation', label: 'مشاوره و راهنمایی' },
]

const BUDGETS = [
  { id: 'under-50', label: 'تا ۵۰ میلیون تومان' },
  { id: '50-100', label: '۵۰ تا ۱۰۰ میلیون تومان' },
  { id: '100-200', label: '۱۰۰ تا ۲۰۰ میلیون تومان' },
  { id: 'over-200', label: 'بیش از ۲۰۰ میلیون تومان' },
]

const TIMELINES = [
  { id: 'urgent', label: 'فوری (کمتر از ۱ ماه)' },
  { id: 'normal', label: 'عادی (۱ تا ۳ ماه)' },
  { id: 'flexible', label: 'منعطف (بدون عجله)' },
]

const STEPS = ['نوع خدمت', 'بودجه و زمان', 'توضیحات', 'اطلاعات تماس']
const MAX_FILE_BYTES = 5_000_000 // 5MB

export function MultiStepOrderForm() {
  const router = useRouter()
  const params = useSearchParams()

  const prefServ = params.get('service')
  const prefNiche = params.get('niche')
  const nicheServiceHint = prefNiche
    ? niches.find((n) => n.slug === prefNiche)
    : undefined

  const [step, setStep] = useState(0)
  const [selectedServices, setSelectedServices] = useState<string[]>(
    prefServ && SERVICE_OPTIONS.some((s) => s.id === prefServ)
      ? [prefServ]
      : nicheServiceHint
        ? ['web-design']
        : [],
  )
  const [budget, setBudget] = useState('')
  const [timeline, setTimeline] = useState('')
  const [description, setDescription] = useState(
    prefNiche && nicheServiceHint ? `پروژه‌ی تخصصی: ${nicheServiceHint.title}. ` : '',
  )
  const [fileName, setFileName] = useState('')
  const [fileError, setFileError] = useState<string>()
  const [name, setName] = useState('')
  const [contact, setContact] = useState('')
  const [errors, setErrors] = useState<{ name?: string; contact?: string; services?: string }>({})

  function toggleService(id: string) {
    setSelectedServices((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id],
    )
  }

  function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    setFileError(undefined)
    if (!file) return
    if (file.size > MAX_FILE_BYTES) {
      setFileError('حجم فایل باید کمتر از ۵ مگابایت باشد')
      return
    }
    setFileName(sanitizeText(file.name))
  }

  function next() {
    if (step === 0) {
      if (selectedServices.length === 0) {
        setErrors((e) => ({ ...e, services: 'حداقل یک خدمت را انتخاب کنید' }))
        return
      }
      setErrors((e) => ({ ...e, services: undefined }))
    }
    setStep((s) => Math.min(s + 1, STEPS.length - 1))
  }

  function submit(e: React.FormEvent) {
    e.preventDefault()
    const nameResult = nameSchema.safeParse(sanitizeText(name))
    const contactResult = emailOrPhoneSchema.safeParse(sanitizeText(contact))
    const nextErrors: typeof errors = {}
    if (!nameResult.success) nextErrors.name = nameResult.error.issues[0]?.message
    if (!contactResult.success) nextErrors.contact = contactResult.error.issues[0]?.message
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) return
    // Mock submit — no backend. Navigate to confirmation.
    router.push('/order/thank-you')
  }

  return (
    <form onSubmit={submit} noValidate className="mx-auto flex w-full max-w-3xl flex-col gap-8">
      {/* Progress */}
      <ol className="flex items-center gap-2">
        {STEPS.map((title, i) => (
          <li key={title} className="flex flex-1 flex-col gap-2">
            <div
              className={cn('h-1.5 rounded-full transition-colors', i <= step ? 'bg-primary' : 'bg-muted')}
            />
            <span
              className={cn(
                'hidden text-xs font-medium sm:block',
                i <= step ? 'text-foreground' : 'text-muted-foreground',
              )}
            >
              {title}
            </span>
          </li>
        ))}
      </ol>

      <div className="rounded-3xl border border-border bg-card p-6 sm:p-8">
        {step === 0 ? (
          <fieldset className="flex flex-col gap-6">
            <legend className="text-xl font-bold">به چه خدماتی نیاز دارید؟</legend>
            <div className="grid gap-3 sm:grid-cols-2">
              {SERVICE_OPTIONS.map((s) => {
                const active = selectedServices.includes(s.id)
                return (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => toggleService(s.id)}
                    aria-pressed={active}
                    className={cn(
                      'flex items-center gap-3 rounded-2xl border p-4 text-start transition-colors',
                      active
                        ? 'border-primary bg-primary/5 ring-1 ring-primary'
                        : 'border-border bg-background hover:border-primary/40',
                    )}
                  >
                    <span
                      className={cn(
                        'flex size-5 shrink-0 items-center justify-center rounded-md border',
                        active ? 'border-primary bg-primary text-primary-foreground' : 'border-border',
                      )}
                    >
                      {active ? <Check className="size-3.5" aria-hidden="true" /> : null}
                    </span>
                    <span className="text-sm font-medium">{s.label}</span>
                  </button>
                )
              })}
            </div>
            {errors.services ? (
              <p className="text-xs font-medium text-destructive">{errors.services}</p>
            ) : null}
          </fieldset>
        ) : null}

        {step === 1 ? (
          <div className="flex flex-col gap-8">
            <fieldset className="flex flex-col gap-4">
              <legend className="text-xl font-bold">بودجه‌ی تقریبی</legend>
              <div className="grid gap-3 sm:grid-cols-2">
                {BUDGETS.map((b) => (
                  <button
                    key={b.id}
                    type="button"
                    onClick={() => setBudget(b.id)}
                    aria-pressed={budget === b.id}
                    className={cn(
                      'rounded-2xl border p-4 text-start text-sm font-medium transition-colors',
                      budget === b.id
                        ? 'border-primary bg-primary/5 ring-1 ring-primary'
                        : 'border-border bg-background hover:border-primary/40',
                    )}
                  >
                    {b.label}
                  </button>
                ))}
              </div>
            </fieldset>
            <fieldset className="flex flex-col gap-4">
              <legend className="text-lg font-bold">زمان‌بندی دلخواه</legend>
              <div className="grid gap-3 sm:grid-cols-3">
                {TIMELINES.map((t) => (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => setTimeline(t.id)}
                    aria-pressed={timeline === t.id}
                    className={cn(
                      'rounded-2xl border p-4 text-start text-sm font-medium transition-colors',
                      timeline === t.id
                        ? 'border-primary bg-primary/5 ring-1 ring-primary'
                        : 'border-border bg-background hover:border-primary/40',
                    )}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
            </fieldset>
          </div>
        ) : null}

        {step === 2 ? (
          <div className="flex flex-col gap-6">
            <h2 className="text-xl font-bold">پروژه‌تان را توضیح دهید</h2>
            <FormField label="توضیحات پروژه" htmlFor="order-desc">
              <Textarea
                id="order-desc"
                value={description}
                maxLength={2000}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="درباره‌ی کسب‌وکار، اهداف و انتظاراتتان از این پروژه بنویسید..."
              />
            </FormField>
            <div className="flex flex-col gap-2">
              <span className="text-sm font-medium">فایل ضمیمه (اختیاری)</span>
              <label
                htmlFor="order-file"
                className="flex cursor-pointer items-center justify-center gap-2 rounded-lg border border-dashed border-border bg-background px-4 py-3 text-sm text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground"
              >
                <Upload className="size-4" aria-hidden="true" />
                بارگذاری فایل (حداکثر ۵ مگابایت)
                <input
                  id="order-file"
                  type="file"
                  accept="image/*,.pdf,.doc,.docx,.zip"
                  className="sr-only"
                  onChange={handleFile}
                />
              </label>
              {fileName ? (
                <span className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Check className="size-3.5 text-primary" aria-hidden="true" />
                  {fileName}
                  <button
                    type="button"
                    onClick={() => setFileName('')}
                    aria-label="حذف فایل"
                    className="text-destructive"
                  >
                    <X className="size-3.5" />
                  </button>
                </span>
              ) : null}
              {fileError ? (
                <p className="text-xs font-medium text-destructive">{fileError}</p>
              ) : null}
            </div>
          </div>
        ) : null}

        {step === 3 ? (
          <div className="flex flex-col gap-6">
            <h2 className="text-xl font-bold">اطلاعات تماس شما</h2>
            <FormField label="نام و نام خانوادگی" htmlFor="order-name" required error={errors.name}>
              <Input
                id="order-name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                aria-invalid={!!errors.name}
                aria-describedby={errors.name ? 'order-name-error' : undefined}
                placeholder="نام شما"
              />
            </FormField>
            <FormField
              label="ایمیل یا شماره تماس"
              htmlFor="order-contact"
              required
              error={errors.contact}
            >
              <Input
                id="order-contact"
                value={contact}
                onChange={(e) => setContact(e.target.value)}
                aria-invalid={!!errors.contact}
                aria-describedby={errors.contact ? 'order-contact-error' : undefined}
                placeholder="example@mail.com یا ۰۹۱۲..."
              />
            </FormField>
          </div>
        ) : null}
      </div>

      <div className="flex justify-between">
        <Button
          size="lg"
          variant="outline"
          type="button"
          disabled={step === 0}
          onClick={() => setStep((s) => Math.max(s - 1, 0))}
        >
          <ArrowRight className="size-4" />
          بازگشت
        </Button>
        {step < STEPS.length - 1 ? (
          <Button
            size="lg"
            type="button"
            className="bg-brand-gradient text-primary-foreground"
            onClick={next}
          >
            ادامه
            <ArrowLeft className="size-4" />
          </Button>
        ) : (
          <Button size="lg" type="submit" className="bg-brand-gradient text-primary-foreground">
            ثبت نهایی سفارش
            <Check className="size-4" />
          </Button>
        )}
      </div>
    </form>
  )
}
