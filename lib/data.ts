import type {
  Service,
  Niche,
  Project,
  BlogPost,
  Testimonial,
  FAQ,
  TeamMember,
  ClientLogo,
  PricingPackage,
  GrowthBundle,
  ComparisonRow,
} from '@/types'

import servicesData from '@/data/services.json'
import nichesData from '@/data/niches.json'
import projectsData from '@/data/projects.json'
import blogData from '@/data/blogPosts.json'
import testimonialsData from '@/data/testimonials.json'
import faqsData from '@/data/faqs.json'
import teamData from '@/data/team.json'
import clientLogosData from '@/data/clientLogos.json'
import pricingData from '@/data/pricingPackages.json'
import comparisonData from '@/data/comparisonData.json'

export const services = servicesData as Service[]
export const niches = nichesData as Niche[]
export const projects = projectsData as Project[]
export const blogPosts = blogData as BlogPost[]
export const testimonials = testimonialsData as Testimonial[]
export const faqs = faqsData as FAQ[]
export const team = teamData as TeamMember[]
export const clientLogos = clientLogosData as ClientLogo[]
export const pricingPackages = pricingData.packages as PricingPackage[]
export const growthBundles = pricingData.bundles as GrowthBundle[]
export const comparisonRows = comparisonData as ComparisonRow[]

export function getService(slug: string) {
  return services.find((s) => s.slug === slug)
}
export function getNiche(slug: string) {
  return niches.find((n) => n.slug === slug)
}
export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug)
}
export function getBlogPost(slug: string) {
  return blogPosts.find((b) => b.slug === slug)
}
export function getProjectsByNiche(niche: string) {
  return projects.filter((p) => p.niche === niche)
}
export function getProjectsByService(serviceSlug: string) {
  return projects.filter((p) => p.serviceSlug === serviceSlug)
}
export function getRelatedProjects(slugs: string[]) {
  return projects.filter((p) => slugs.includes(p.slug))
}

/** Combined slug pool for /services/[slug] — services + niches. */
export function getServiceOrNicheSlugs() {
  return [...services.map((s) => s.slug), ...niches.map((n) => n.slug)]
}
