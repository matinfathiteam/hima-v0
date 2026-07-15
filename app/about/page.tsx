import type { Metadata } from 'next'
import Image from 'next/image'
import { Container } from '@/components/shared/container'
import { PageHeader } from '@/components/shared/page-header'
import { SectionHeading } from '@/components/shared/section-heading'
import { CtaBand } from '@/components/shared/cta-band'
import { Icon } from '@/components/ui/icon'
import { JsonLd } from '@/components/shared/json-ld'
import { buildMetadata, SITE } from '@/lib/site'
import { breadcrumbLd, organizationLd } from '@/lib/structured-data'
import { VALUE_PROPS } from '@/lib/content'
import { team } from '@/lib/data'

export const metadata: Metadata = buildMetadata({
  title: 'درباره ما',
  description:
    'داستان هیما؛ تیمی که باور دارد آژانس باید همسفر رشد مشتری باشد، نه فقط پیمانکار. با آدم‌های پشت هیما آشنا شوید.',
  path: '/about',
})

const stats = [
  { value: '۱۲۰+', label: 'پروژه‌ی تحویل‌شده' },
  { value: '۸', label: 'صنعت تخصصی' },
  { value: '۹۵٪', label: 'رضایت و همکاری مجدد' },
  { value: '۶+', label: 'سال تجربه‌ی مشترک' },
]

export default function AboutPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbLd([
          { name: 'خانه', url: '/' },
          { name: 'درباره ما', url: '/about' },
        ])}
      />
      <JsonLd data={organizationLd()} />
      <PageHeader
        eyebrow="درباره‌ی هیما"
        title="مردم از انسان‌ها می‌خرند، نه از شرکت‌ها"
        description="هیما با یک باور ساده متولد شد: طراحی سایت پایان کار نیست، شروع یک همسفری است. ما کنار کسب‌وکارها می‌مانیم تا با هم رشد کنیم."
        breadcrumbs={[
          { name: 'خانه', href: '/' },
          { name: 'درباره ما', href: '/about' },
        ]}
      />

      {/* Founding story */}
      <section className="py-16 sm:py-20">
        <Container className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <div className="flex flex-col gap-5">
            <SectionHeading align="start" eyebrow="داستان ما" title="از یک ناامیدی، تا یک شراکت" />
            <div className="flex flex-col gap-4 text-pretty leading-relaxed text-muted-foreground">
              <p>
                {SITE.name} از دل یک تجربه‌ی تکراری شکل گرفت: کسب‌وکارهایی که سایت می‌ساختند اما بعد
                از تحویل، تنها می‌ماندند. سایت زیبا بود، اما رشدی در کار نبود؛ نه سئویی، نه پشتیبانی
                قابل‌اتکایی، نه کسی که واقعاً به نتیجه اهمیت بدهد.
              </p>
              <p>
                ما تصمیم گرفتیم مدل دیگری بسازیم. آژانسی که خودش را نه فروشنده‌ی سایت، بلکه همسفر
                بلندمدت رشد مشتری می‌داند. جایی که کیفیت اولویت اول است و کار با تحویل تمام نمی‌شود،
                بلکه تازه شروع می‌شود.
              </p>
              <p>
                امروز {SITE.legalName} در هشت صنعت تخصصی، از گالری هنری تا کلینیک پزشکی، کنار
                کسب‌وکارها ایستاده است؛ با همان باور اول: مردم از انسان‌ها می‌خرند.
              </p>
            </div>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-border bg-muted">
            <Image
              src="/images/about-team.png"
              alt="تیم هیما در حال همکاری"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        </Container>
      </section>

      {/* Stats */}
      <section className="bg-brand-gradient py-14 text-primary-foreground">
        <Container>
          <dl className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {stats.map((s) => (
              <div key={s.label} className="flex flex-col items-center gap-1 text-center">
                <dt className="text-3xl font-black sm:text-4xl">{s.value}</dt>
                <dd className="text-sm text-primary-foreground/85">{s.label}</dd>
              </div>
            ))}
          </dl>
        </Container>
      </section>

      {/* Values */}
      <section className="py-16 sm:py-20">
        <Container className="flex flex-col gap-12">
          <SectionHeading
            eyebrow="ارزش‌های ما"
            title="چیزهایی که سرشان کوتاه نمی‌آییم"
            description="این اصول، چهارچوب هر تصمیم و هر پروژه‌ی ماست."
          />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {VALUE_PROPS.map((v) => (
              <div
                key={v.title}
                className="flex flex-col gap-3 rounded-2xl border border-border bg-card p-6"
              >
                <span className="flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Icon name={v.icon} className="size-6" />
                </span>
                <h3 className="text-lg font-bold">{v.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{v.description}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Team */}
      <section className="bg-muted/40 py-16 sm:py-20">
        <Container className="flex flex-col gap-12">
          <SectionHeading
            eyebrow="تیم هیما"
            title="آدم‌هایی که پشت هر پروژه‌اند"
            description="ما یک تیم چندتخصصی هستیم که با هم، رشد شما را می‌سازیم."
          />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {team.map((member) => (
              <figure
                key={member.name}
                className="flex flex-col gap-4 rounded-2xl border border-border bg-card p-6"
              >
                <div className="relative size-20 overflow-hidden rounded-2xl bg-muted">
                  <Image
                    src={member.photo || '/placeholder-user.jpg'}
                    alt={`عکس ${member.name}`}
                    fill
                    sizes="80px"
                    className="object-cover"
                  />
                </div>
                <figcaption className="flex flex-col gap-1">
                  <span className="font-bold">{member.name}</span>
                  <span className="text-sm text-primary">{member.role}</span>
                </figcaption>
                <p className="text-sm leading-relaxed text-muted-foreground">{member.bio}</p>
              </figure>
            ))}
          </div>
        </Container>
      </section>

      <CtaBand />
    </>
  )
}
