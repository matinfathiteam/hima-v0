import Link from 'next/link'
import { Calculator, ArrowLeft, Sparkles } from 'lucide-react'
import { Container } from '@/components/shared/container'
import { Button } from '@/components/ui/button'

export function CalculatorTeaser() {
  return (
    <section className="py-16 sm:py-20">
      <Container>
        <div className="relative overflow-hidden rounded-3xl border border-border bg-card px-6 py-12 sm:px-12">
          <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(50%_60%_at_100%_0%,oklch(0.9_0.06_320)_0%,transparent_60%)]" />
          <div className="flex flex-col items-center gap-6 text-center lg:flex-row lg:items-center lg:justify-between lg:text-start">
            <div className="flex flex-col items-center gap-4 lg:items-start">
              <span className="flex size-14 items-center justify-center rounded-2xl bg-brand-gradient text-primary-foreground">
                <Calculator className="size-7" aria-hidden="true" />
              </span>
              <div className="flex flex-col gap-2">
                <span className="flex items-center gap-1.5 text-sm font-medium text-accent">
                  <Sparkles className="size-4" aria-hidden="true" />
                  ابزار امضای هیما
                </span>
                <h2 className="text-balance text-2xl font-bold sm:text-3xl">
                  هزینه‌ی پروژه‌ی شما چقدر می‌شود؟
                </h2>
                <p className="max-w-xl text-pretty leading-relaxed text-muted-foreground">
                  با ماشین‌حساب هوشمند قیمت هیما، در کمتر از یک دقیقه یک برآورد
                  شفاف از هزینه‌ی سایت‌تان بگیرید؛ بدون تماس، بدون انتظار.
                </p>
              </div>
            </div>
            <Button
              size="lg"
              className="shrink-0 bg-brand-gradient text-primary-foreground"
              render={
                <Link href="/calculator">
                  محاسبه‌ی قیمت
                  <ArrowLeft className="size-4" />
                </Link>
              }
            />
          </div>
        </div>
      </Container>
    </section>
  )
}
