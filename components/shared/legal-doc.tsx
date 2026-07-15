import { Container } from '@/components/shared/container'
import { PageHeader } from '@/components/shared/page-header'

export type LegalSection = { heading: string; body: string[] }

export function LegalDoc({
  title,
  eyebrow,
  updatedAt,
  breadcrumbLabel,
  breadcrumbHref,
  sections,
}: {
  title: string
  eyebrow: string
  updatedAt: string
  breadcrumbLabel: string
  breadcrumbHref: string
  sections: LegalSection[]
}) {
  return (
    <>
      <PageHeader
        eyebrow={eyebrow}
        title={title}
        breadcrumbs={[
          { name: 'خانه', href: '/' },
          { name: breadcrumbLabel, href: breadcrumbHref },
        ]}
      />

      <section className="py-14 sm:py-16">
        <Container>
          <div className="mx-auto max-w-3xl">
            <p className="mb-10 text-sm text-muted-foreground">
              آخرین به‌روزرسانی: {updatedAt}
            </p>

            <div className="flex flex-col gap-10">
              {sections.map((section, i) => (
                <div key={section.heading} className="flex flex-col gap-3">
                  <h2 className="text-lg font-bold text-foreground sm:text-xl">
                    {`${(i + 1).toLocaleString('fa-IR')}. ${section.heading}`}
                  </h2>
                  {section.body.map((para, j) => (
                    <p
                      key={j}
                      className="text-pretty leading-relaxed text-muted-foreground"
                    >
                      {para}
                    </p>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>
    </>
  )
}
