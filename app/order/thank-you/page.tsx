import type { Metadata } from 'next'
import Link from 'next/link'
import { CheckCircle2, Home, Phone } from 'lucide-react'
import { Container } from '@/components/shared/container'
import { Button } from '@/components/ui/button'
import { buildMetadata, site } from '@/lib/site'

export const metadata: Metadata = {
  ...buildMetadata({
    title: 'سفارش ثبت شد',
    description: 'سفارش شما با موفقیت ثبت شد. کارشناسان هیما به‌زودی با شما تماس می‌گیرند.',
    path: '/order/thank-you',
  }),
  robots: { index: false, follow: false },
}

export default function OrderThankYouPage() {
  return (
    <section className="py-16 sm:py-24">
      <Container>
        <div className="mx-auto flex max-w-xl flex-col items-center gap-6 text-center">
          <span className="flex size-16 items-center justify-center rounded-full bg-primary/10 text-primary">
            <CheckCircle2 className="size-9" aria-hidden="true" />
          </span>
          <h1 className="text-balance text-3xl font-black tracking-tight sm:text-4xl">
            سفارش شما با موفقیت ثبت شد
          </h1>
          <p className="text-pretty text-lg leading-relaxed text-muted-foreground">
            از اعتماد شما سپاسگزاریم. کارشناسان هیما درخواست شما را بررسی می‌کنند و در کمتر از یک
            روز کاری برای مشاوره‌ی رایگان با شما تماس می‌گیرند.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg" className="bg-brand-gradient text-primary-foreground">
              <Link href="/">
                <Home className="size-4" />
                بازگشت به خانه
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <a href={`tel:${site.phone}`}>
                <Phone className="size-4" />
                تماس با ما
              </a>
            </Button>
          </div>
        </div>
      </Container>
    </section>
  )
}
