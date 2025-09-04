"use client"

import { useRef } from "react"

type Video = {
  id: string | number
  title: string
  url: string
  poster?: string
}

export function VideoCard({
  video,
  onSwipe,
}: {
  video: Video
  onSwipe: (liked: boolean) => void
}) {
  const videoRef = useRef<HTMLVideoElement>(null)

  return (
    <div className="relative w-full h-[70vh] md:h-[78vh] max-w-sm mx-auto overflow-hidden rounded-2xl bg-black">
      <video
        ref={videoRef}
        className="w-full h-full object-cover"
        src={video.url}
        poster={video.poster}
        autoPlay
        loop
        playsInline
        muted
      />
      <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/60 to-transparent">
        <h2 className="text-white text-lg font-medium text-pretty">{video.title}</h2>
      </div>

      <div className="absolute inset-x-0 -bottom-16 md:bottom-4 flex items-center justify-center gap-4 md:gap-6">
        <button
          onClick={() => onSwipe(false)}
          aria-label="Skip"
          className="px-5 py-3 rounded-full bg-red-500 text-white text-sm shadow"
        >
          Skip
        </button>
        <button
          onClick={() => onSwipe(true)}
          aria-label="Like"
          className="px-5 py-3 rounded-full bg-green-600 text-white text-sm shadow"
        >
          Like
        </button>
      </div>
    </div>
  )
}
