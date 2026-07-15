import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import type { Project } from '@/types'

export function ProjectCard({ project }: { project: Project }) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card transition-all hover:-translate-y-1 hover:shadow-brand"
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-muted">
        <Image
          src={project.cover || '/placeholder.svg'}
          alt={`نمونه‌کار ${project.title}`}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute top-3 right-3">
          <Badge variant="default" className="bg-background/85 backdrop-blur">
            {project.categoryLabel}
          </Badge>
        </div>
      </div>
      <div className="flex flex-1 flex-col gap-3 p-5">
        <div className="flex flex-col gap-1">
          <h3 className="font-bold">{project.title}</h3>
          <p className="text-sm text-muted-foreground">{project.client}</p>
        </div>
        <p className="text-sm leading-relaxed text-muted-foreground line-clamp-2">
          {project.summary}
        </p>
        <div className="mt-auto flex flex-wrap gap-3 border-t border-border pt-3">
          {project.metrics.slice(0, 2).map((m) => (
            <div key={m.label} className="flex flex-col">
              <span className="text-sm font-bold text-primary">{m.value}</span>
              <span className="text-xs text-muted-foreground">{m.label}</span>
            </div>
          ))}
          <ArrowLeft className="mr-auto mt-auto size-5 text-muted-foreground transition-transform group-hover:-translate-x-1" />
        </div>
      </div>
    </Link>
  )
}
