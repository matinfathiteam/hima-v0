import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { Container } from '@/components/shared/container'
import { SectionHeading } from '@/components/shared/section-heading'
import { FaqAccordion } from '@/components/shared/faq-accordion'
import { Button } from '@/components/ui/button'
import type { FAQ } from '@/types'

export function HomeFaq({ items }: { items: FAQ[] }) {
  return (
    <section className="bg-muted/40 py-16 sm:py-20">
      <Container className="flex flex-col gap-10">
        <SectionHeading
          eyebrow="سوالات متداول"
          title="پاسخ سوال‌های پرتکرار شما"
          description="اگر پاسخ سوال‌تان را پیدا نکردید، تیم ما آماده‌ی گفتگوست."
        />
        <div className="mx-auto w-full max-w-3xl">
          <FaqAccordion items={items} />
        </div>
        <div className="flex justify-center">
          <Button
            size="lg"
            variant="outline"
            render={
              <Link href="/faq">
                همه‌ی سوالات متداول
                <ArrowLeft className="size-4" />
              </Link>
            }
          />
        </div>
      </Container>
    </section>
  )
}
