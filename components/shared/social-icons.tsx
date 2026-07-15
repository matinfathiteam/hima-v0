type IconProps = { className?: string }

/**
 * Brand social glyphs as inline SVGs. The installed lucide-react build
 * ships no Instagram/Linkedin marks, so we render accessible, decorative
 * paths here (labels live on the wrapping links).
 */
export function InstagramIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="4.2" />
      <circle cx="17.4" cy="6.6" r="1.1" fill="currentColor" stroke="none" />
    </svg>
  )
}

export function LinkedinIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M4 9v11" />
      <circle cx="4" cy="4.5" r="1.4" fill="currentColor" stroke="none" />
      <path d="M9 20v-6a3 3 0 0 1 6 0v6" />
      <path d="M9 12v8" />
    </svg>
  )
}
