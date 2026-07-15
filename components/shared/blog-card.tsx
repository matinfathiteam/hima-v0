import Link from 'next/link'
import Image from 'next/image'
import { Clock } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { toPersianDigits } from '@/lib/format'
import type { BlogPost } from '@/types'

export function BlogCard({ post }: { post: BlogPost }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card transition-all hover:-translate-y-1 hover:shadow-brand"
    >
      <div className="relative aspect-[16/9] overflow-hidden bg-muted">
        <Image
          src={post.cover || '/placeholder.svg'}
          alt={post.title}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="flex flex-1 flex-col gap-3 p-5">
        <Badge variant="muted" className="w-fit">
          {post.category}
        </Badge>
        <h3 className="text-balance font-bold leading-snug group-hover:text-primary">
          {post.title}
        </h3>
        <p className="text-sm leading-relaxed text-muted-foreground line-clamp-2">
          {post.excerpt}
        </p>
        <div className="mt-auto flex items-center gap-3 border-t border-border pt-3 text-xs text-muted-foreground">
          <span>{post.author}</span>
          <span className="flex items-center gap-1">
            <Clock className="size-3.5" />
            {toPersianDigits(post.readingTime)} دقیقه
          </span>
        </div>
      </div>
    </Link>
  )
}
