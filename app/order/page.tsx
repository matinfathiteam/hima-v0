import type { Metadata } from 'next'
import { Suspense } from 'react'
import { PageHeader } from '@/components/shared/page-header'
import { Container } from '@/components/shared/container'
import { MultiStepOrderForm } from '@/components/tools/multi-step-order-form'
import { buildMetadata } from '@/lib/site'

export const metadata: Metadata = buildMetadata({
  title: 'ثبت سفارش',
  description:
    'سفارش پروژه‌ی خود را در چند گام ساده ثبت کنید؛ نوع خدمت، بودجه، زمان‌بندی و توضیحات را مشخص کنید تا کارشناسان هیما با شما تماس بگیرند.',
  path: '/order',
})

export default function OrderPage() {
  return (
    <>
      <PageHeader
        eyebrow="ثبت سفارش"
        title="پروژه‌تان را در چند گام ثبت کنید"
        description="فرم زیر را تکمیل کنید تا تیم هیما در کوتاه‌ترین زمان برای مشاوره‌ی رایگان با شما تماس بگیرد."
        breadcrumbs={[
          { name: 'خانه', href: '/' },
          { name: 'ثبت سفارش', href: '/order' },
        ]}
      />
      <section className="py-12 sm:py-16">
        <Container>
          <Suspense fallback={null}>
            <MultiStepOrderForm />
          </Suspense>
        </Container>
      </section>
    </>
  )
}
