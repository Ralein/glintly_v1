"use client"

import useSWR from "swr"
import { useLocalStorage } from "@/hooks/use-local-storage"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { NewsCard } from "./news-card"
import { Bookmark } from "lucide-react"

type Article = {
  id: string
  title: string
  url: string
  content: string
  topic: string
  source: string
  summary: string
}

const fetcher = (url: string) => fetch(url).then((r) => r.json())

export function NewsFeed({ articles }: { articles: Article[] }) {   
  const [topic, setTopic] = useLocalStorage<string>("gn:topic", "All")
  const [source, setSource] = useLocalStorage<string>("gn:source", "All")
  const [bookmarks, setBookmarks] = useLocalStorage<Record<string, boolean>>("gn:bookmarks", {})

  const { data, isLoading } = useSWR<Article[]>(
    `/api/news?topic=${encodeURIComponent(topic)}&source=${encodeURIComponent(source)}`,
    fetcher,
  )

  const topics = ["All", "Tech", "Productivity", "Learning", "AI"]
  const sources = ["All", "MockRSS", "HN"]

  return (
    <div className="grid gap-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Filters</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-wrap items-center gap-3">
          <Select value={topic} onValueChange={setTopic}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Topic" />
            </SelectTrigger>
            <SelectContent>
              {topics.map((t) => (
                <SelectItem key={t} value={t}>
                  {t}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={source} onValueChange={setSource}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Source" />
            </SelectTrigger>
            <SelectContent>
              {sources.map((s) => (
                <SelectItem key={s} value={s}>
                  {s}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <div className="ml-auto text-sm text-muted-foreground">
            {isLoading ? "Loading..." : `${data?.length ?? 0} articles`}
          </div>
        </CardContent>
      </Card>

      <Separator />

      {isLoading ? (
        <div className="grid gap-4 md:grid-cols-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-40 rounded-lg border animate-pulse bg-muted" />
          ))}
        </div>
      ) : data && data.length > 0 ? (
        <div className="grid gap-4 md:grid-cols-2">
          {data.map((a) => (
            <NewsCard
              key={a.id}
              article={a}
              bookmarked={!!bookmarks[a.id]}
              onToggleBookmark={() => {
                const next = { ...bookmarks, [a.id]: !bookmarks[a.id] }
                setBookmarks(next)
              }}
            />
          ))}
        </div>
      ) : (
        <div className="flex h-[40dvh] items-center justify-center rounded-lg border text-sm text-muted-foreground">
          No articles match the current filters.
        </div>
      )}

      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Bookmark className="h-4 w-4" />
        Bookmarked: {Object.values(bookmarks).filter(Boolean).length}
      </div>
    </div>
  )
}
