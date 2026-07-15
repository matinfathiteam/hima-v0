'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { Check, ArrowLeft, ArrowRight, Sparkles, Lock, RotateCcw } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { FormField, Input } from '@/components/ui/field'
import { formatToman, sanitizeText } from '@/lib/format'
import { leadGateSchema } from '@/lib/validation'
import { cn } from '@/lib/utils'

type SiteType = {
  id: string
  label: string
  description: string
  base: number
}

type Feature = {
  id: string
  label: string
  price: number
}

const SITE_TYPES: SiteType[] = [
  { id: 'landing', label: 'لندینگ / تک‌صفحه‌ای', description: 'یک صفحه‌ی حرفه‌ای برای معرفی یا کمپین', base: 25_000_000 },
  { id: 'corporate', label: 'سایت شرکتی', description: 'چند صفحه، معرفی خدمات و بلاگ', base: 45_000_000 },
  { id: 'store', label: 'فروشگاه اینترنتی', description: 'فروش آنلاین با درگاه پرداخت', base: 85_000_000 },
  { id: 'lms', label: 'آموزشی / LMS', description: 'فروش دوره و مدیریت دانشجو', base: 95_000_000 },
  { id: 'booking', label: 'رزرو / نوبت‌دهی', description: 'کلینیک، باشگاه، رستوران و رویداد', base: 55_000_000 },
  { id: 'portfolio', label: 'پرتفولیو / گالری', description: 'نمایش حرفه‌ای آثار و نمونه‌کار', base: 30_000_000 },
]

const FEATURES: Feature[] = [
  { id: 'branding', label: 'طراحی هویت بصری و لوگو', price: 20_000_000 },
  { id: 'content', label: 'تولید محتوا و متن', price: 12_000_000 },
  { id: 'seo', label: 'بسته‌ی سئوی حرفه‌ای', price: 15_000_000 },
  { id: 'multilang', label: 'چندزبانه', price: 18_000_000 },
  { id: 'blog', label: 'بلاگ و مرکز مقالات', price: 8_000_000 },
  { id: 'payment', label: 'درگاه پرداخت و اشتراک', price: 14_000_000 },
  { id: 'dashboard', label: 'پنل مدیریت اختصاصی', price: 22_000_000 },
  { id: 'animation', label: 'انیمیشن و تعامل پیشرفته', price: 10_000_000 },
]

const STEP_TITLES = ['نوع سایت', 'امکانات', 'دریافت برآورد']

export function PriceCalculator() {
  const [step, setStep] = useState(0)
  const [siteType, setSiteType] = useState<string>('')
  const [features, setFeatures] = useState<string[]>([])
  const [contact, setContact] = useState('')
  const [error, setError] = useState<string>()
  const [revealed, setRevealed] = useState(false)

  const estimate = useMemo(() => {
    const type = SITE_TYPES.find((t) => t.id === siteType)
    if (!type) return { min: 0, max: 0 }
    const addons = FEATURES.filter((f) => features.includes(f.id)).reduce(
      (sum, f) => sum + f.price,
      0,
    )
    const base = type.base + addons
    return { min: base, max: Math.round(base * 1.35) }
  }, [siteType, features])

  function toggleFeature(id: string) {
    setFeatures((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id],
    )
  }

  function handleReveal(e: React.FormEvent) {
    e.preventDefault()
    const parsed = leadGateSchema.safeParse({ contact: sanitizeText(contact) })
    if (!parsed.success) {
      setError(parsed.error.issues[0]?.message)
      return
    }
    setError(undefined)
    // Lead stored to local state only (mock — no backend).
    setRevealed(true)
  }

  function reset() {
    setStep(0)
    setSiteType('')
    setFeatures([])
    setContact('')
    setRevealed(false)
    setError(undefined)
  }

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-8">
      {/* Progress */}
      <ol className="flex items-center gap-2">
        {STEP_TITLES.map((title, i) => (
          <li key={title} className="flex flex-1 flex-col gap-2">
            <div
              className={cn(
                'h-1.5 rounded-full transition-colors',
                i <= step ? 'bg-primary' : 'bg-muted',
              )}
            />
            <span
              className={cn(
                'text-xs font-medium',
                i <= step ? 'text-foreground' : 'text-muted-foreground',
              )}
            >
              {`مرحله ${['۱', '۲', '۳'][i]}: ${title}`}
            </span>
          </li>
        ))}
      </ol>

      <div className="rounded-3xl border border-border bg-card p-6 sm:p-8">
        {step === 0 ? (
          <div className="flex flex-col gap-6">
            <h2 className="text-xl font-bold">چه نوع سایتی می‌خواهید؟</h2>
            <div className="grid gap-3 sm:grid-cols-2">
              {SITE_TYPES.map((t) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setSiteType(t.id)}
                  aria-pressed={siteType === t.id}
                  className={cn(
                    'flex flex-col items-start gap-1 rounded-2xl border p-4 text-start transition-colors',
                    siteType === t.id
                      ? 'border-primary bg-primary/5 ring-1 ring-primary'
                      : 'border-border bg-background hover:border-primary/40',
                  )}
                >
                  <span className="font-bold">{t.label}</span>
                  <span className="text-xs leading-relaxed text-muted-foreground">
                    {t.description}
                  </span>
                </button>
              ))}
            </div>
            <div className="flex justify-end">
              <Button
                size="lg"
                disabled={!siteType}
                className="bg-brand-gradient text-primary-foreground"
                onClick={() => setStep(1)}
              >
                ادامه
                <ArrowLeft className="size-4" />
              </Button>
            </div>
          </div>
        ) : null}

        {step === 1 ? (
          <div className="flex flex-col gap-6">
            <h2 className="text-xl font-bold">چه امکاناتی نیاز دارید؟</h2>
            <p className="text-sm text-muted-foreground">
              موارد دلخواه را انتخاب کنید؛ می‌توانید هیچ‌کدام را هم انتخاب نکنید.
            </p>
            <div className="grid gap-3 sm:grid-cols-2">
              {FEATURES.map((f) => {
                const active = features.includes(f.id)
                return (
                  <button
                    key={f.id}
                    type="button"
                    onClick={() => toggleFeature(f.id)}
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
                    <span className="text-sm font-medium">{f.label}</span>
                  </button>
                )
              })}
            </div>
            <div className="flex justify-between">
              <Button size="lg" variant="outline" onClick={() => setStep(0)}>
                <ArrowRight className="size-4" />
                بازگشت
              </Button>
              <Button
                size="lg"
                className="bg-brand-gradient text-primary-foreground"
                onClick={() => setStep(2)}
              >
                مشاهده‌ی برآورد
                <ArrowLeft className="size-4" />
              </Button>
            </div>
          </div>
        ) : null}

        {step === 2 ? (
          <div className="flex flex-col gap-6">
            {!revealed ? (
              <form onSubmit={handleReveal} className="flex flex-col gap-5" noValidate>
                <div className="flex flex-col items-center gap-3 text-center">
                  <span className="flex size-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                    <Lock className="size-6" aria-hidden="true" />
                  </span>
                  <h2 className="text-xl font-bold">برآورد شما آماده است</h2>
                  <p className="max-w-md text-sm leading-relaxed text-muted-foreground">
                    برای مشاهده‌ی بازه‌ی قیمت تخمینی و دریافت مشاوره‌ی رایگان، راه
                    ارتباطی‌تان را وارد کنید.
                  </p>
                </div>
                <FormField
                  label="ایمیل یا شماره تماس"
                  htmlFor="calc-contact"
                  required
                  error={error}
                >
                  <Input
                    id="calc-contact"
                    inputMode="email"
                    placeholder="example@mail.com یا ۰۹۱۲..."
                    value={contact}
                    onChange={(e) => setContact(e.target.value)}
                    aria-invalid={!!error}
                    aria-describedby={error ? 'calc-contact-error' : undefined}
                  />
                </FormField>
                <div className="flex justify-between">
                  <Button size="lg" variant="outline" type="button" onClick={() => setStep(1)}>
                    <ArrowRight className="size-4" />
                    بازگشت
                  </Button>
                  <Button
                    size="lg"
                    type="submit"
                    className="bg-brand-gradient text-primary-foreground"
                  >
                    نمایش برآورد قیمت
                  </Button>
                </div>
              </form>
            ) : (
              <div className="flex flex-col gap-6 text-center">
                <span className="mx-auto flex items-center gap-1.5 text-sm font-medium text-accent">
                  <Sparkles className="size-4" aria-hidden="true" />
                  برآورد اختصاصی شما
                </span>
                <div className="flex flex-col gap-1">
                  <span className="text-sm text-muted-foreground">بازه‌ی تخمینی هزینه</span>
                  <span className="text-2xl font-black text-brand-gradient sm:text-3xl">
                    {formatToman(estimate.min)} تا {formatToman(estimate.max)}
                  </span>
                </div>
                <p className="mx-auto max-w-md text-sm leading-relaxed text-muted-foreground">
                  این عدد یک برآورد اولیه است. قیمت نهایی پس از جلسه‌ی کشف رایگان و
                  بررسی دقیق نیازهای شما مشخص می‌شود.
                </p>
                <div className="flex flex-col justify-center gap-3 sm:flex-row">
                  <Button
                    size="lg"
                    className="bg-brand-gradient text-primary-foreground"
                    render={
                      <Link href="/order">
                        ثبت سفارش
                        <ArrowLeft className="size-4" />
                      </Link>
                    }
                  />
                  <Button size="lg" variant="outline" type="button" onClick={reset}>
                    <RotateCcw className="size-4" />
                    محاسبه‌ی دوباره
                  </Button>
                </div>
              </div>
            )}
          </div>
        ) : null}
      </div>
    </div>
  )
}
