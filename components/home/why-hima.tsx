import { Container } from '@/components/shared/container'
import { SectionHeading } from '@/components/shared/section-heading'
import { Icon } from '@/components/ui/icon'
import { VALUE_PROPS } from '@/lib/content'

export function WhyHima() {
  return (
    <section className="py-16 sm:py-20">
      <Container className="flex flex-col gap-12">
        <SectionHeading
          eyebrow="چرا هیما"
          title="یک همسفر، نه فقط یک فروشنده"
          description="ما موفقیت شما را موفقیت خودمان می‌دانیم. این چهار اصل، تفاوت هیما را می‌سازد."
        />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {VALUE_PROPS.map((v) => (
            <div
              key={v.title}
              className="flex flex-col gap-4 rounded-2xl border border-border bg-card p-6"
            >
              <span className="flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Icon name={v.icon} className="size-6" />
              </span>
              <h3 className="text-lg font-bold">{v.title}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {v.description}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}
