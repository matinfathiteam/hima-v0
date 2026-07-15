import {
  ShoppingBag,
  Frame,
  BriefcaseBusiness,
  GraduationCap,
  CalendarDays,
  Dumbbell,
  Stethoscope,
  UtensilsCrossed,
  Layout,
  ShoppingCart,
  Palette,
  TrendingUp,
  Megaphone,
  PenTool,
  MousePointerClick,
  ShieldCheck,
  MessageCircle,
  HelpCircle,
  type LucideIcon,
} from 'lucide-react'

const MAP: Record<string, LucideIcon> = {
  ShoppingBag,
  Frame,
  BriefcaseBusiness,
  GraduationCap,
  CalendarDays,
  Dumbbell,
  Stethoscope,
  UtensilsCrossed,
  Layout,
  ShoppingCart,
  Palette,
  TrendingUp,
  Megaphone,
  PenTool,
  MousePointerClick,
  ShieldCheck,
  MessageCircle,
}

export function Icon({
  name,
  className,
}: {
  name: string
  className?: string
}) {
  const Cmp = MAP[name] ?? HelpCircle
  return <Cmp className={className} aria-hidden="true" />
}
