import { NextResponse } from "next/server"

export async function GET() {
  const videos = [
    {
      id: 1,
      title: "5 Productivity Hacks",
      url: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
      poster: "/productivity-video.jpg",
      topic: "Productivity",
    },
    {
      id: 2,
      title: "Motivation Boost",
      url: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
      poster: "/motivation-video.jpg",
      topic: "Motivation",
    },
    {
      id: 3,
      title: "Learn Faster",
      url: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
      poster: "/learning-video.jpg",
      topic: "Learning",
    },
    {
      id: 4,
      title: "Deep Work in 25 Minutes",
      url: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
      poster: "/deep-work.jpg",
      topic: "Productivity",
    },
    {
      id: 5,
      title: "Stay Consistent Daily",
      url: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
      poster: "/consistency.jpg",
      topic: "Motivation",
    },
    {
      id: 6,
      title: "Memory Tricks That Stick",
      url: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
      poster: "/memory.jpg",
      topic: "Learning",
    },
    // Additional videos can be added here
    {
      id: 7,
      title: "Time Management Tips",
      url: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
      poster: "/time-management.jpg",
      topic: "Productivity",
    },
    {
      id: 8,
      title: "Overcoming Procrastination",
      url: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
      poster: "/procrastination.jpg",
      topic: "Motivation",
    },
    {
      id: 9,
      title: "Effective Note Taking",
      url: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
      poster: "/note-taking.jpg",
      topic: "Learning",
    },
  ]
  return NextResponse.json(videos)
}
