/**
 * Renders a YouTube video case study if a videoId is provided.
 * Gracefully renders nothing when no video is available.
 */
export function VideoEmbedSlot({
  videoId,
  title,
}: {
  videoId?: string
  title: string
}) {
  if (!videoId) return null
  return (
    <div className="relative aspect-video w-full overflow-hidden rounded-2xl border border-border bg-muted">
      <iframe
        className="absolute inset-0 h-full w-full"
        src={`https://www.youtube-nocookie.com/embed/${videoId}`}
        title={`ویدیوی معرفی پروژه‌ی ${title}`}
        loading="lazy"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      />
    </div>
  )
}
