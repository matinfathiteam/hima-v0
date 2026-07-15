import type { Metadata } from 'next'
import { UserPlus, Handshake, Wallet } from 'lucide-react'
import { Container } from '@/components/shared/container'
import { PageHeader } from '@/components/shared/page-header'
import { SectionHeading } from '@/components/shared/section-heading'
import { ReferForm } from '@/components/tools/refer-form'
import { JsonLd } from '@/components/shared/json-ld'
import { buildMetadata } from '@/lib/site'
import { breadcrumbLd } from '@/lib/structured-data'

export const metadata: Metadata = buildMetadata({
  title: 'برنامه‌ی معرفی و درآمد',
  description:
    'کسب‌وکارها را به هیما معرفی کنید و ۱۰ تا ۱۵ درصد از مبلغ اولین قرارداد را به‌عنوان پورسانت دریافت کنید.',
  path: '/refer',
})

const steps = [
  {
    icon: UserPlus,
    title: 'کد معرف بگیرید',
    description: 'کد اختصاصی خود را دریافت و آن را با دوستان و آشنایانتان به اشتراک بگذارید.',
  },
  {
    icon: Handshake,
    title: 'معرفی کنید',
    description: 'فرد یا کسب‌وکار معرفی‌شده هنگام ثبت سفارش، کد شما را وارد می‌کند.',
  },
  {
    icon: Wallet,
    title: 'پورسانت بگیرید',
    description: 'با عقد قرارداد، ۱۰ تا ۱۵ درصد از مبلغ اولین قرارداد به شما پرداخت می‌شود.',
  },
]

export default function ReferPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbLd([
          { name: 'خانه', url: '/' },
          { name: 'معرفی و درآمد', url: '/refer' },
        ])}
      />
      <PageHeader
        eyebrow="برنامه‌ی معرفی"
        title="معرفی کنید، درآمد بسازید"
        description="اگر کسی را می‌شناسید که به سایت حرفه‌ای نیاز دارد، او را به هیما معرفی کنید و در رشد مشترک سهیم شوید."
        breadcrumbs={[
          { name: 'خانه', href: '/' },
          { name: 'معرفی و درآمد', href: '/refer' },
        ]}
      />

      <section className="py-16 sm:py-20">
        <Container className="flex flex-col gap-12">
          <SectionHeading
            eyebrow="چطور کار می‌کند؟"
            title="در سه گام ساده"
            description="برنامه‌ی معرفی هیما شفاف و بدون پیچیدگی است."
          />
          <div className="grid gap-6 md:grid-cols-3">
            {steps.map((s, i) => (
              <div
                key={s.title}
                className="flex flex-col gap-4 rounded-2xl border border-border bg-card p-6"
              >
                <span className="flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <s.icon className="size-6" aria-hidden="true" />
                </span>
                <h3 className="flex items-center gap-2 text-lg font-bold">
                  <span className="text-sm text-primary">{['۱', '۲', '۳'][i]}.</span>
                  {s.title}
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{s.description}</p>
              </div>
            ))}
          </div>

          <ReferForm />
        </Container>
      </section>
    </>
  )
}
