import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { Container } from '@/components/shared/container'
import { SectionHeading } from '@/components/shared/section-heading'
import { BlogCard } from '@/components/shared/blog-card'
import { Button } from '@/components/ui/button'
import { blogPosts } from '@/lib/data'

export function LatestPosts() {
  const items = blogPosts.slice(0, 3)
  return (
    <section className="py-16 sm:py-20">
      <Container className="flex flex-col gap-12">
        <SectionHeading
          eyebrow="بلاگ هیما"
          title="از تجربه‌ی ما بیاموزید"
          description="راهنماها و مقالاتی که به شما کمک می‌کنند تصمیم دیجیتال درستی بگیرید."
        />
        <div className="grid gap-6 md:grid-cols-3">
          {items.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>
        <div className="flex justify-center">
          <Button
            size="lg"
            variant="outline"
            render={
              <Link href="/blog">
                همه‌ی مقالات
                <ArrowLeft className="size-4" />
              </Link>
            }
          />
        </div>
      </Container>
    </section>
  )
}
