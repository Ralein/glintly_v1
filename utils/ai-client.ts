import { generateText } from "ai"
import { xai } from "@ai-sdk/xai"

export async function summarizeMotivational(text: string): Promise<string> {
  // Ensure server-only behavior
  if (typeof process === "undefined") return simpleSummary(text)

  const hasXAI = !!process.env.XAI_API_KEY
  if (!hasXAI) return simpleSummary(text)

  try {
    const { text: out } = await generateText({
      model: xai("grok-4"),
      prompt: `Summarize the following news in 2-3 sentences with a motivational, growth-focused tone. Avoid fluff. Text:\n\n${text}`,
    })
    return out.trim()
  } catch {
    return simpleSummary(text)
  }
}

function simpleSummary(text: string): string {
  const max = 280
  const clean = text.replace(/\s+/g, " ").trim()
  const sliced = clean.length > max ? clean.slice(0, max) + "…" : clean
  return `Key takeaways: ${sliced}`
}
