import { NextResponse } from "next/server"
import { summarizeMotivational } from "@/utils/ai-client"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const topicFilter = searchParams.get("topic") || "All"
  const sourceFilter = searchParams.get("source") || "All"

  // 1) Fetch news (mock data for now)
  const articles = [
    {
      id: "a1",
      title: "Tech Innovation 2025",
      url: "https://news.example.com/tech-innovation-2025",
      content:
        "AI is transforming learning with personalized micro-lessons, adaptive testing, and productivity assistants that curate study plans.",
      source: "MockRSS",
      topic: "Tech",
    },
    {
      id: "a2",
      title: "Study Tips That Work",
      url: "https://news.example.com/study-tips",
      content:
        "Experts recommend spaced repetition, active recall, and bite-sized content to improve learning outcomes and motivation.",
      source: "HN",
      topic: "Learning",
    },
    {
      id: "a3",
      title: "Focus Systems for Deep Work",
      url: "https://news.example.com/deep-work",
      content:
        "Deep work blocks, minimized context switching, and clear goals significantly improve productivity and retention.",
      source: "MockRSS",
      topic: "Productivity",
    },
    {
      id: "a4",
      title: "AI Assistants as Study Coaches",
      url: "https://news.example.com/ai-coach",
      content:
        "Students leverage AI to plan study schedules, quiz themselves with active recall, and sustain motivation with measurable streaks.",
      source: "HN",
      topic: "AI",
    },
  ]

  // 2) Filter articles based on topic and source
  const filtered = articles.filter((a) => {
    const topicOk = topicFilter === "All" || a.topic === topicFilter
    const sourceOk = sourceFilter === "All" || a.source === sourceFilter
    return topicOk && sourceOk
  })

  // 3) Summarize with AI or fallback
  const summarized = await Promise.all(
    filtered.map(async (a) => {
      const summary = await summarizeMotivational(a.content)
      return { id: a.id, title: a.title, url: a.url, content: a.content, topic: a.topic, source: a.source, summary }
    }),
  )

  return NextResponse.json(summarized)
}
