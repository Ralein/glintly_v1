"use client"

import useSWR from "swr"
import { useCallback, useEffect, useMemo, useState } from "react"
import { VideoCard } from "./video-card"

type Video = {
  id: string | number
  title: string
  url: string
  poster?: string
  topic?: string
}

const fetcher = (url: string) => fetch(url).then((r) => r.json())

const INDEX_KEY = "lf:index"
const LIKES_KEY = "lf:likes"
const TOPIC_KEY = "lf:topic"
const HISTORY_KEY = "lf:history"

export function SwipeDeck() {
  const { data, isLoading, error } = useSWR<Video[]>("/api/videos", fetcher, { revalidateOnFocus: false })

  // topic filter, persisted
  const [topic, setTopic] = useState<string>(() => {
    if (typeof window === "undefined") return "All"
    try {
      return JSON.parse(localStorage.getItem(TOPIC_KEY) || '"All"')
    } catch {
      return "All"
    }
  })

  // current index, persisted
  const [index, setIndex] = useState<number>(() => {
    if (typeof window === "undefined") return 0
    try {
      return JSON.parse(localStorage.getItem(INDEX_KEY) || "0")
    } catch {
      return 0
    }
  })

  // likes set, persisted
  const [likes, setLikes] = useState<Set<string | number>>(() => {
    if (typeof window === "undefined") return new Set()
    try {
      const arr = JSON.parse(localStorage.getItem(LIKES_KEY) || "[]") as Array<string | number>
      return new Set(arr)
    } catch {
      return new Set()
    }
  })

  // history stack to allow rewind (stores previous indices)
  const [history, setHistory] = useState<number[]>(() => {
    if (typeof window === "undefined") return []
    try {
      return JSON.parse(localStorage.getItem(HISTORY_KEY) || "[]") as number[]
    } catch {
      return []
    }
  })

  useEffect(() => {
    if (typeof window === "undefined") return
    localStorage.setItem(TOPIC_KEY, JSON.stringify(topic))
  }, [topic])

  useEffect(() => {
    if (typeof window === "undefined") return
    localStorage.setItem(INDEX_KEY, JSON.stringify(index))
  }, [index])

  useEffect(() => {
    if (typeof window === "undefined") return
    localStorage.setItem(LIKES_KEY, JSON.stringify(Array.from(likes)))
  }, [likes])

  useEffect(() => {
    if (typeof window === "undefined") return
    localStorage.setItem(HISTORY_KEY, JSON.stringify(history))
  }, [history])

  const allVideos = useMemo(() => data ?? [], [data])
  const topics = useMemo(() => {
    const set = new Set<string>()
    allVideos.forEach((v) => v.topic && set.add(v.topic))
    return ["All", ...Array.from(set)]
  }, [allVideos])

  const filtered = useMemo(() => {
    return topic === "All" ? allVideos : allVideos.filter((v) => v.topic === topic)
  }, [allVideos, topic])

  const maxIndex = Math.max(0, filtered.length - 1)
  const clampedIndex = Math.min(index, maxIndex)
  const current = filtered[clampedIndex]

  const handleSwipe = useCallback(
    (liked: boolean) => {
      if (!current) return
      setHistory((h) => [...h, clampedIndex])
      if (liked) setLikes((prev) => new Set(prev).add(current.id))
      setIndex((i) => Math.min(i + 1, maxIndex))
    },
    [current, clampedIndex, maxIndex],
  )

  const handleRewind = useCallback(() => {
    setHistory((h) => {
      if (h.length === 0) return h
      const next = [...h]
      const prevIndex = next.pop()!
      setIndex(prevIndex)
      return next
    })
  }, [])

  // Keyboard shortcuts: ← skip, → like, ↑ rewind
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        e.preventDefault()
        handleSwipe(false)
      } else if (e.key === "ArrowRight") {
        e.preventDefault()
        handleSwipe(true)
      } else if (e.key === "ArrowUp") {
        e.preventDefault()
        handleRewind()
      }
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [handleSwipe, handleRewind])

  if (error) {
    return <p className="text-red-600">Failed to load videos.</p>
  }

  if (isLoading) {
    return (
      <div className="w-full max-w-xl grid gap-4">
        <div className="h-6 w-40 bg-muted rounded" />
        <div className="h-[70vh] bg-muted rounded-2xl" />
        <div className="h-10 w-full bg-muted rounded" />
      </div>
    )
  }

  if (!filtered.length) {
    return (
      <div className="w-full max-w-xl grid gap-4">
        <Controls
          topics={topics}
          topic={topic}
          onTopicChange={setTopic}
          onRewind={handleRewind}
          canRewind={history.length > 0}
          likedCount={likes.size}
          progress={{ current: 0, total: 0 }}
        />
        <p className="text-muted-foreground">No videos found for this topic.</p>
      </div>
    )
  }

  const progress = {
    current: Math.min(clampedIndex + 1, filtered.length),
    total: filtered.length,
  }

  return (
    <section className="w-full max-w-xl mx-auto grid gap-4">
      <Controls
        topics={topics}
        topic={topic}
        onTopicChange={(t) => {
          setTopic(t)
          // reset index and history when changing topic
          setIndex(0)
          setHistory([])
        }}
        onRewind={handleRewind}
        canRewind={history.length > 0}
        likedCount={likes.size}
        progress={progress}
      />

      {current ? (
        <VideoCard video={current} onSwipe={handleSwipe} />
      ) : (
        <div className="h-[70vh] rounded-2xl bg-muted" aria-label="No more videos" />
      )}

      <ProgressBar current={progress.current} total={progress.total} />
    </section>
  )
}

function Controls(props: {
  topics: string[]
  topic: string
  onTopicChange: (t: string) => void
  onRewind: () => void
  canRewind: boolean
  likedCount: number
  progress: { current: number; total: number }
}) {
  const { topics, topic, onTopicChange, onRewind, canRewind, likedCount, progress } = props
  return (
    <div className="w-full flex items-center justify-between gap-3">
      <label className="flex items-center gap-2">
        <span className="sr-only">Topic</span>
        <select
          className="h-9 rounded-md border bg-background px-2 text-sm"
          value={topic}
          onChange={(e) => onTopicChange(e.target.value)}
          aria-label="Filter by topic"
        >
          {topics.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
      </label>

      <div className="flex items-center gap-3">
        <span className="text-xs text-muted-foreground" aria-live="polite">
          Liked: {likedCount}
        </span>
        <button
          onClick={onRewind}
          disabled={!canRewind}
          className="h-9 px-3 rounded-md border text-sm bg-background disabled:opacity-50"
          aria-label="Rewind"
        >
          Rewind ↑
        </button>
        <span className="text-xs text-muted-foreground">
          {progress.current}/{progress.total}
        </span>
      </div>
    </div>
  )
}

function ProgressBar({ current, total }: { current: number; total: number }) {
  const pct = total === 0 ? 0 : Math.round((current / total) * 100)
  return (
    <div aria-label="Progress" aria-valuenow={pct} aria-valuemin={0} aria-valuemax={100}>
      <div className="h-2 w-full rounded bg-muted">
        <div
          className="h-2 rounded bg-blue-600 transition-all"
          style={{ width: `${pct}%` }}
          role="progressbar"
          aria-valuenow={pct}
          aria-valuemin={0}
          aria-valuemax={100}
        />
      </div>
    </div>
  )
}
