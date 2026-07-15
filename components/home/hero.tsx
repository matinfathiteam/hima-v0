import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft, Sparkles, CheckCircle2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Container } from '@/components/shared/container'
import { Badge } from '@/components/ui/badge'

const highlights = [
  'کیفیت در اولویت اول',
  'شراکت بلندمدت رشد',
  'پشتیبانی سریع پس از تحویل',
]

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(60%_50%_at_80%_0%,oklch(0.9_0.06_320)_0%,transparent_60%)]" />
      <Container className="grid items-center gap-10 py-14 lg:grid-cols-2 lg:py-20">
        <div className="flex flex-col items-start gap-6">
          <Badge variant="accent">
            <Sparkles className="size-3.5" />
            همسفر دیجیتال شما
          </Badge>
          <h1 className="text-balance text-4xl font-black leading-[1.15] tracking-tight sm:text-5xl md:text-6xl">
            نه یک پیمانکار،
            <br />
            <span className="text-brand-gradient">همسفر رشد</span> کسب‌وکار شما
          </h1>
          <p className="max-w-xl text-pretty text-lg leading-relaxed text-muted-foreground">
            هیما با طراحی سایت حرفه‌ای، برندینگ و بازاریابی دیجیتال، در کنار شما
            می‌ماند تا کسب‌وکارتان واقعاً رشد کند؛ نه فقط یک سایت تحویل بگیرید.
          </p>

          <ul className="flex flex-col gap-2">
            {highlights.map((h) => (
              <li key={h} className="flex items-center gap-2 text-sm font-medium">
                <CheckCircle2 className="size-5 text-primary" aria-hidden="true" />
                {h}
              </li>
            ))}
          </ul>

          <div className="mt-2 flex flex-col gap-3 sm:flex-row">
            <Button
              size="lg"
              className="bg-brand-gradient text-primary-foreground"
              render={
                <Link href="/free-audit">
                  درخواست مشاوره رایگان
                  <ArrowLeft className="size-4" />
                </Link>
              }
            />
            <Button
              size="lg"
              variant="outline"
              render={<Link href="/projects">مشاهده نمونه‌کارها</Link>}
            />
          </div>
        </div>

        <div className="relative">
          <div className="relative mx-auto aspect-square w-full max-w-lg overflow-hidden rounded-3xl bg-secondary/50">
            <Image
              src="/images/hero.png"
              alt="مسکات هیما، همسفر دیجیتال کسب‌وکار شما"
              width={640}
              height={640}
              priority
              sizes="(max-width: 1024px) 100vw, 512px"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </Container>
    </section>
  )
}
