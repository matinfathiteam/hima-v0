import type { MetadataRoute } from 'next'
import { SITE } from '@/lib/site'
import { services, niches, projects, blogPosts } from '@/lib/data'

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()

  const staticRoutes: {
    path: string
    priority: number
    changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency']
  }[] = [
    { path: '/', priority: 1, changeFrequency: 'weekly' },
    { path: '/services', priority: 0.9, changeFrequency: 'monthly' },
    { path: '/services/template', priority: 0.7, changeFrequency: 'monthly' },
    { path: '/projects', priority: 0.9, changeFrequency: 'weekly' },
    { path: '/blog', priority: 0.8, changeFrequency: 'weekly' },
    { path: '/pricing', priority: 0.8, changeFrequency: 'monthly' },
    { path: '/compare', priority: 0.6, changeFrequency: 'monthly' },
    { path: '/calculator', priority: 0.7, changeFrequency: 'monthly' },
    { path: '/about', priority: 0.6, changeFrequency: 'monthly' },
    { path: '/testimonials', priority: 0.6, changeFrequency: 'monthly' },
    { path: '/process', priority: 0.6, changeFrequency: 'monthly' },
    { path: '/faq', priority: 0.6, changeFrequency: 'monthly' },
    { path: '/contact', priority: 0.7, changeFrequency: 'monthly' },
    { path: '/free-audit', priority: 0.7, changeFrequency: 'monthly' },
    { path: '/refer', priority: 0.5, changeFrequency: 'monthly' },
    { path: '/order', priority: 0.7, changeFrequency: 'monthly' },
    { path: '/privacy-policy', priority: 0.3, changeFrequency: 'yearly' },
    { path: '/terms', priority: 0.3, changeFrequency: 'yearly' },
  ]

  const staticEntries: MetadataRoute.Sitemap = staticRoutes.map((route) => ({
    url: `${SITE.url}${route.path === '/' ? '' : route.path}`,
    lastModified: now,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }))

  const serviceEntries: MetadataRoute.Sitemap = services.map((service) => ({
    url: `${SITE.url}/services/${service.slug}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.7,
  }))

  const nicheEntries: MetadataRoute.Sitemap = niches.map((niche) => ({
    url: `${SITE.url}/services/${niche.slug}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.7,
  }))

  const projectEntries: MetadataRoute.Sitemap = projects.map((project) => ({
    url: `${SITE.url}/projects/${project.slug}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.6,
  }))

  const blogEntries: MetadataRoute.Sitemap = blogPosts.map((post) => ({
    url: `${SITE.url}/blog/${post.slug}`,
    lastModified: post.publishedAt ? new Date(post.publishedAt) : now,
    changeFrequency: 'monthly',
    priority: 0.6,
  }))

  return [
    ...staticEntries,
    ...serviceEntries,
    ...nicheEntries,
    ...projectEntries,
    ...blogEntries,
  ]
}
