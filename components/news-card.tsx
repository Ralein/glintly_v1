"use client"

type NewsArticle = {
  id?: string
  title: string
  url: string
  summary: string
  source?: string
}

export function NewsCard({
  article,
  bookmarked,
  onToggleBookmark,
}: {
  article: NewsArticle
  bookmarked?: boolean
  onToggleBookmark?: () => void
}) {
  return (
    <article className="bg-card text-card-foreground shadow-sm border rounded-xl p-4 max-w-xl w-full">
      <div className="flex items-start justify-between gap-4">
        <h2 className="text-lg font-semibold mb-2 text-pretty">{article.title}</h2>
        {onToggleBookmark ? (
          <button
            onClick={onToggleBookmark}
            className="text-sm underline text-blue-600"
            aria-pressed={!!bookmarked}
            aria-label={bookmarked ? "Remove bookmark" : "Add bookmark"}
          >
            {bookmarked ? "Bookmarked" : "Bookmark"}
          </button>
        ) : null}
      </div>
      <p className="text-sm text-muted-foreground leading-relaxed mb-3">{article.summary}</p>
      <div className="flex items-center justify-between">
        {article.source ? (
          <span className="text-xs text-muted-foreground">Source: {article.source}</span>
        ) : (
          <span aria-hidden className="text-xs" />
        )}
        <a href={article.url} target="_blank" rel="noreferrer noopener" className="text-blue-600 underline text-sm">
          Read more
        </a>
      </div>
    </article>
  )
}
