import Link from 'next/link'
import { Home, ArrowLeft, Compass } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Container } from '@/components/shared/container'

const QUICK_LINKS = [
  { href: '/services', label: 'خدمات' },
  { href: '/projects', label: 'نمونه‌کارها' },
  { href: '/calculator', label: 'ماشین‌حساب قیمت' },
  { href: '/contact', label: 'تماس با ما' },
]

export default function NotFound() {
  return (
    <section className="flex min-h-[70vh] items-center py-20">
      <Container>
        <div className="mx-auto flex max-w-xl flex-col items-center text-center">
          <div className="flex size-16 items-center justify-center rounded-2xl bg-brand-gradient text-primary-foreground">
            <Compass className="size-8" aria-hidden="true" />
          </div>

          <p className="mt-8 text-6xl font-bold text-primary sm:text-7xl">۴۰۴</p>
          <h1 className="mt-4 text-balance text-2xl font-bold sm:text-3xl">
            صفحه‌ای که دنبالش بودید پیدا نشد
          </h1>
          <p className="mt-3 text-pretty leading-relaxed text-muted-foreground">
            شاید آدرس اشتباه وارد شده یا صفحه جابه‌جا شده باشد. اما نگران نباشید،
            همسفر شما همین‌جاست تا مسیر درست را نشانتان دهد.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button
              size="lg"
              className="bg-brand-gradient text-primary-foreground"
              render={
                <Link href="/">
                  <Home className="size-4" />
                  بازگشت به خانه
                </Link>
              }
            />
            <Button
              size="lg"
              variant="outline"
              render={
                <Link href="/contact">
                  <ArrowLeft className="size-4" />
                  تماس با ما
                </Link>
              }
            />
          </div>

          <nav aria-label="پیوندهای سریع" className="mt-10 w-full border-t border-border pt-8">
            <p className="mb-4 text-sm font-medium text-muted-foreground">
              شاید دنبال یکی از این‌ها بودید:
            </p>
            <ul className="flex flex-wrap justify-center gap-x-6 gap-y-2">
              {QUICK_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm font-medium text-primary hover:underline"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </Container>
    </section>
  )
}
