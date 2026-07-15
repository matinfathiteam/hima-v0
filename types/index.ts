export interface Service {
  slug: string
  title: string
  shortValue: string
  description: string
  icon: string
  heroTagline: string
  deliverables: string[]
  process: { title: string; description: string }[]
  techStack: string[]
  startingPrice: number
  faqs: FAQ[]
  featured: boolean
}

export interface Niche {
  slug: string
  title: string
  shortValue: string
  icon: string
  heroTagline: string
  painPoints: string[]
  solutions: string[]
  priceRangeMin: number
  priceRangeMax: number
  relatedProjectSlugs: string[]
  faqs: FAQ[]
}

export interface Project {
  slug: string
  title: string
  client: string
  category: string
  categoryLabel: string
  niche: string
  serviceSlug: string
  cover: string
  liveUrl?: string
  videoId?: string
  summary: string
  outcome: string
  challenge: string
  solution: string
  gallery: string[]
  techStack: string[]
  metrics: { label: string; value: string }[]
  testimonial?: { quote: string; name: string; role: string }
  featured: boolean
}

export interface BlogPost {
  slug: string
  title: string
  excerpt: string
  cover: string
  category: string
  nicheSlug: string
  author: string
  authorRole: string
  date: string
  readingTime: number
  content: { heading: string; body: string }[]
}

export interface Testimonial {
  id: string
  quote: string
  name: string
  role: string
  company: string
  avatar: string
  industry: string
  industryLabel: string
  result: string
}

export interface FAQ {
  question: string
  answer: string
  topic?: string
}

export interface TeamMember {
  name: string
  role: string
  bio: string
  photo: string
}

export interface ClientLogo {
  name: string
  logo: string
}

export interface PricingPackage {
  id: string
  name: string
  tagline: string
  price: number
  priceNote: string
  featured: boolean
  features: string[]
  cta: string
}

export interface GrowthBundle {
  id: string
  name: string
  description: string
  includes: string[]
  durationMonths: number
  bundlePrice: number
  separatePrice: number
  discountPercent: number
}

export interface ComparisonRow {
  feature: string
  hima: string | boolean
  freelancer: string | boolean
  builder: string | boolean
}
