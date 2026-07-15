'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, Upload, Check, Menu } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { FormField, Input } from '@/components/ui/field'
import { sanitizeText } from '@/lib/format'
import { cn } from '@/lib/utils'

type Palette = {
  id: string
  label: string
  primary: string
  accent: string
  bg: string
  text: string
}

const PALETTES: Palette[] = [
  { id: 'violet', label: 'بنفش هیما', primary: '#7c2fd6', accent: '#e0559b', bg: '#faf7fd', text: '#241436' },
  { id: 'ocean', label: 'آبی اقیانوسی', primary: '#0e7490', accent: '#0891b2', bg: '#f0fbfd', text: '#0b2b33' },
  { id: 'forest', label: 'سبز جنگلی', primary: '#15803d', accent: '#65a30d', bg: '#f4fbf3', text: '#122b16' },
  { id: 'sunset', label: 'نارنجی غروب', primary: '#c2410c', accent: '#e11d48', bg: '#fff7f2', text: '#3a1608' },
  { id: 'midnight', label: 'شب‌رنگ', primary: '#4338ca', accent: '#7c3aed', bg: '#f5f5ff', text: '#181637' },
  { id: 'rose', label: 'صورتی مدرن', primary: '#be185d', accent: '#db2777', bg: '#fff5f9', text: '#3d0a22' },
]

const STORAGE_KEY = 'hima:template-preview'
const MAX_LOGO_BYTES = 1_000_000 // 1MB

type SavedState = {
  businessName: string
  paletteId: string
  logoDataUrl: string
}

export function TemplatePreviewTool() {
  const [businessName, setBusinessName] = useState('کسب‌وکار شما')
  const [paletteId, setPaletteId] = useState(PALETTES[0].id)
  const [logoDataUrl, setLogoDataUrl] = useState('')
  const [uploadError, setUploadError] = useState<string>()
  const [hydrated, setHydrated] = useState(false)

  // Restore from localStorage on mount.
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (raw) {
        const parsed = JSON.parse(raw) as SavedState
        if (parsed.businessName) setBusinessName(parsed.businessName)
        if (parsed.paletteId && PALETTES.some((p) => p.id === parsed.paletteId)) {
          setPaletteId(parsed.paletteId)
        }
        if (parsed.logoDataUrl) setLogoDataUrl(parsed.logoDataUrl)
      }
    } catch {
      /* ignore corrupt storage */
    }
    setHydrated(true)
  }, [])

  // Persist on change (after hydration to avoid overwriting saved data).
  useEffect(() => {
    if (!hydrated) return
    const state: SavedState = { businessName, paletteId, logoDataUrl }
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
    } catch {
      /* storage may be full/blocked */
    }
  }, [businessName, paletteId, logoDataUrl, hydrated])

  const palette = PALETTES.find((p) => p.id === paletteId) ?? PALETTES[0]
  const safeName = sanitizeText(businessName) || 'کسب‌وکار شما'

  function handleLogo(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    setUploadError(undefined)
    if (!file.type.startsWith('image/')) {
      setUploadError('فقط فایل تصویری مجاز است')
      return
    }
    if (file.size > MAX_LOGO_BYTES) {
      setUploadError('حجم فایل باید کمتر از ۱ مگابایت باشد')
      return
    }
    const reader = new FileReader()
    reader.onload = () => setLogoDataUrl(String(reader.result))
    reader.readAsDataURL(file)
  }

  const orderHref = `/order?template=1&name=${encodeURIComponent(safeName)}&palette=${palette.id}`

  return (
    <div className="grid gap-8 lg:grid-cols-[360px_1fr]">
      {/* Controls */}
      <div className="flex h-fit flex-col gap-6 rounded-3xl border border-border bg-card p-6">
        <h2 className="text-lg font-bold">تنظیمات قالب</h2>

        <FormField label="نام کسب‌وکار" htmlFor="tpl-name">
          <Input
            id="tpl-name"
            value={businessName}
            maxLength={40}
            onChange={(e) => setBusinessName(e.target.value)}
            placeholder="مثلاً: فروشگاه سبزینه"
          />
        </FormField>

        <div className="flex flex-col gap-2">
          <span className="text-sm font-medium">لوگو (اختیاری)</span>
          <label
            htmlFor="tpl-logo"
            className="flex cursor-pointer items-center justify-center gap-2 rounded-lg border border-dashed border-border bg-background px-4 py-3 text-sm text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground"
          >
            <Upload className="size-4" aria-hidden="true" />
            {logoDataUrl ? 'تغییر لوگو' : 'بارگذاری لوگو'}
            <input
              id="tpl-logo"
              type="file"
              accept="image/*"
              className="sr-only"
              onChange={handleLogo}
            />
          </label>
          {uploadError ? (
            <p className="text-xs font-medium text-destructive">{uploadError}</p>
          ) : null}
        </div>

        <div className="flex flex-col gap-3">
          <span className="text-sm font-medium">پالت رنگی</span>
          <div className="grid grid-cols-3 gap-2">
            {PALETTES.map((p) => (
              <button
                key={p.id}
                type="button"
                onClick={() => setPaletteId(p.id)}
                aria-pressed={paletteId === p.id}
                aria-label={p.label}
                className={cn(
                  'relative flex h-12 items-center justify-center gap-1 rounded-xl border transition-transform hover:scale-105',
                  paletteId === p.id ? 'border-foreground ring-2 ring-foreground/20' : 'border-border',
                )}
                style={{ backgroundColor: p.bg }}
              >
                <span className="size-4 rounded-full" style={{ backgroundColor: p.primary }} />
                <span className="size-4 rounded-full" style={{ backgroundColor: p.accent }} />
                {paletteId === p.id ? (
                  <Check
                    className="absolute -right-1 -top-1 size-4 rounded-full bg-foreground p-0.5 text-background"
                    aria-hidden="true"
                  />
                ) : null}
              </button>
            ))}
          </div>
        </div>

        <Button
          size="lg"
          className="bg-brand-gradient text-primary-foreground"
          render={
            <Link href={orderHref}>
              همین نسخه رو سفارش بده
              <ArrowLeft className="size-4" />
            </Link>
          }
        />
      </div>

      {/* Live preview */}
      <div className="overflow-hidden rounded-3xl border border-border shadow-brand">
        <div
          className="flex flex-col"
          style={{ backgroundColor: palette.bg, color: palette.text }}
        >
          {/* Mock browser bar */}
          <div className="flex items-center gap-2 border-b border-black/10 bg-black/5 px-4 py-2.5">
            <span className="size-2.5 rounded-full bg-black/20" />
            <span className="size-2.5 rounded-full bg-black/20" />
            <span className="size-2.5 rounded-full bg-black/20" />
            <span className="mx-auto rounded-md bg-white/60 px-3 py-1 text-xs text-black/50">
              {`www.${palette.id}-site.ir`}
            </span>
          </div>

          {/* Mock nav */}
          <div className="flex items-center justify-between px-6 py-4">
            <div className="flex items-center gap-2">
              {logoDataUrl ? (
                // Data URL preview of user logo; next/image not suitable for arbitrary data URLs here.
                // eslint-disable-next-line @next/next/no-img-element
                <img src={logoDataUrl} alt="لوگوی شما" className="size-8 rounded-lg object-cover" />
              ) : (
                <span
                  className="flex size-8 items-center justify-center rounded-lg text-sm font-bold text-white"
                  style={{ backgroundColor: palette.primary }}
                >
                  {safeName.trim().charAt(0)}
                </span>
              )}
              <span className="text-sm font-bold">{safeName}</span>
            </div>
            <div className="hidden items-center gap-4 text-xs sm:flex">
              <span>خانه</span>
              <span>محصولات</span>
              <span>درباره ما</span>
              <span
                className="rounded-md px-3 py-1.5 text-white"
                style={{ backgroundColor: palette.primary }}
              >
                تماس
              </span>
            </div>
            <Menu className="size-5 sm:hidden" aria-hidden="true" />
          </div>

          {/* Mock hero */}
          <div className="flex flex-col items-center gap-4 px-6 py-12 text-center">
            <span
              className="rounded-full px-3 py-1 text-xs font-medium text-white"
              style={{ backgroundColor: palette.accent }}
            >
              به {safeName} خوش آمدید
            </span>
            <h3 className="max-w-md text-2xl font-black leading-tight sm:text-3xl">
              تجربه‌ای متفاوت با {safeName}
            </h3>
            <p className="max-w-sm text-sm opacity-70">
              این یک پیش‌نمایش زنده از سایت شماست. رنگ‌ها و برند شما، همین حالا.
            </p>
            <div className="flex gap-2">
              <span
                className="rounded-lg px-4 py-2 text-sm font-medium text-white"
                style={{ backgroundColor: palette.primary }}
              >
                شروع کنید
              </span>
              <span
                className="rounded-lg border px-4 py-2 text-sm font-medium"
                style={{ borderColor: palette.primary, color: palette.primary }}
              >
                بیشتر بدانید
              </span>
            </div>
          </div>

          {/* Mock cards */}
          <div className="grid grid-cols-3 gap-3 px-6 pb-10">
            {[0, 1, 2].map((i) => (
              <div key={i} className="flex flex-col gap-2 rounded-xl bg-white/60 p-3">
                <span
                  className="h-16 rounded-lg"
                  style={{ backgroundColor: i === 1 ? palette.accent : palette.primary, opacity: 0.85 }}
                />
                <span className="h-2 w-3/4 rounded bg-black/15" />
                <span className="h-2 w-1/2 rounded bg-black/10" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
