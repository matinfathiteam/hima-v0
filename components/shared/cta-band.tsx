import Link from 'next/link'
import { ArrowLeft, MessageCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Container } from '@/components/shared/container'

export function CtaBand({
  title = 'آماده‌اید سفر دیجیتال‌تان را شروع کنیم؟',
  description = 'یک مشاوره رایگان بگیرید و ببینید هیما چطور می‌تواند همسفر رشد کسب‌وکار شما باشد.',
  primaryLabel = 'ثبت سفارش',
  primaryHref = '/order',
  secondaryLabel = 'مشاوره رایگان',
  secondaryHref = '/free-audit',
}: {
  title?: string
  description?: string
  primaryLabel?: string
  primaryHref?: string
  secondaryLabel?: string
  secondaryHref?: string
}) {
  return (
    <section className="py-16 sm:py-20">
      <Container>
        <div className="relative overflow-hidden rounded-3xl bg-brand-gradient px-6 py-14 text-center text-primary-foreground sm:px-12">
          <div className="mx-auto flex max-w-2xl flex-col items-center gap-5">
            <h2 className="text-balance text-2xl font-bold sm:text-3xl md:text-4xl">
              {title}
            </h2>
            <p className="text-pretty leading-relaxed text-primary-foreground/85">
              {description}
            </p>
            <div className="mt-2 flex flex-col gap-3 sm:flex-row">
              <Button
                size="lg"
                className="bg-background text-foreground hover:bg-background/90"
                render={
                  <Link href={primaryHref}>
                    {primaryLabel}
                    <ArrowLeft className="size-4" />
                  </Link>
                }
              />
              <Button
                size="lg"
                variant="outline"
                className="border-primary-foreground/30 bg-transparent text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
                render={
                  <Link href={secondaryHref}>
                    <MessageCircle className="size-4" />
                    {secondaryLabel}
                  </Link>
                }
              />
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
