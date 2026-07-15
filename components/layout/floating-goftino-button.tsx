'use client'

import { useState } from 'react'
import { MessageCircle, X, Phone } from 'lucide-react'
import { SITE } from '@/lib/site'
import { cn } from '@/lib/utils'

export function FloatingGoftinoButton() {
  const [open, setOpen] = useState(false)

  return (
    <div className="fixed bottom-5 left-5 z-50 flex flex-col items-start gap-3">
      {open ? (
        <div className="w-72 overflow-hidden rounded-2xl border border-border bg-card shadow-brand">
          <div className="flex items-center justify-between bg-brand-gradient px-4 py-3 text-primary-foreground">
            <span className="text-sm font-bold">پشتیبانی هیما</span>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="بستن گفتگو"
              className="flex size-6 items-center justify-center rounded-md hover:bg-white/20"
            >
              <X className="size-4" />
            </button>
          </div>
          <div className="flex flex-col gap-3 p-4">
            <p className="text-sm leading-relaxed text-muted-foreground">
              سلام! همسفر دیجیتال شما این‌جاست. برای گفتگوی آنلاین از طریق گفتینو یا تماس مستقیم اقدام کنید.
            </p>
            <button
              type="button"
              className="flex items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
              onClick={() => {
                // Goftino chat widget entry point (placeholder integration)
                window.dispatchEvent(new CustomEvent('goftino:open'))
              }}
            >
              <MessageCircle className="size-4" />
              شروع گفتگوی آنلاین
            </button>
            <a
              href={`tel:${SITE.phoneHref}`}
              className="flex items-center justify-center gap-2 rounded-lg border border-border px-4 py-2.5 text-sm font-medium hover:bg-muted"
            >
              <Phone className="size-4" />
              تماس تلفنی
            </a>
          </div>
        </div>
      ) : null}

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label="گفتگوی آنلاین"
        className={cn(
          'flex size-14 items-center justify-center rounded-full text-primary-foreground shadow-brand transition-transform hover:scale-105',
          'bg-brand-gradient',
        )}
      >
        {open ? <X className="size-6" /> : <MessageCircle className="size-6" />}
      </button>
    </div>
  )
}
