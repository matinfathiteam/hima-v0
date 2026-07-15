import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { Container } from '@/components/shared/container'
import { SectionHeading } from '@/components/shared/section-heading'
import { Button } from '@/components/ui/button'
import { PROCESS_STEPS } from '@/lib/content'

export function ProcessTeaser() {
  return (
    <section className="py-16 sm:py-20">
      <Container className="flex flex-col gap-12">
        <SectionHeading
          eyebrow="فرایند همکاری"
          title="سفری شفاف، از اولین گفتگو تا رشد پایدار"
          description="می‌دانید در هر مرحله چه اتفاقی می‌افتد؛ بدون ابهام، بدون هزینه‌ی پنهان."
        />
        <ol className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {PROCESS_STEPS.map((s) => (
            <li
              key={s.step}
              className="flex flex-col gap-3 rounded-2xl border border-border bg-card p-6"
            >
              <span className="text-2xl font-black text-primary/25">{s.step}</span>
              <h3 className="text-lg font-bold">{s.title}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {s.description}
              </p>
            </li>
          ))}
        </ol>
        <div className="flex justify-center">
          <Button
            size="lg"
            variant="outline"
            render={
              <Link href="/process">
                جزئیات کامل فرایند
                <ArrowLeft className="size-4" />
              </Link>
            }
          />
        </div>
      </Container>
    </section>
  )
}
