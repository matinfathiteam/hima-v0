import { Container } from '@/components/shared/container'
import { clientLogos } from '@/lib/data'

export function LogoCloud() {
  return (
    <section className="border-y border-border bg-card/50 py-10">
      <Container className="flex flex-col items-center gap-6">
        <p className="text-sm text-muted-foreground">
          اعتماد کسب‌وکارهایی که همسفرشان بوده‌ایم
        </p>
        <ul className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
          {clientLogos.map((logo) => (
            <li
              key={logo.name}
              className="text-lg font-bold text-muted-foreground/70 transition-colors hover:text-foreground"
            >
              {logo.name}
            </li>
          ))}
        </ul>
      </Container>
    </section>
  )
}
