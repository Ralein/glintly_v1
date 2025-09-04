import { NewsFeed } from "@/components/news-feed"

type NewsArticle = {
  id: string
  title: string
  url: string
  content: string
  topic: string
  summary: string
  source?: string
}

async function getNews(): Promise<NewsArticle[]> {
  const res = await fetch("/api/news", { cache: "no-store" })
  if (!res.ok) return []
  return res.json()
}

export default async function AINewsPage() {
  const newsArticles = await getNews()
  
  // Transform for NewsFeed if it expects different property names
  const articles = newsArticles.map(article => ({
    id: article.id,
    content: article.content, // or use article.summary if preferred
    topics: [article.topic], // convert single topic to array
    title: article.title,
    url: article.url,
    source: article.source
  }))

  return (
    <>
      <section className="max-w-4xl mx-auto px-4 py-8 flex flex-col gap-6">
        <header>
          <h1 className="text-2xl font-semibold text-balance">AI News</h1>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Fresh articles summarized with a motivational learning spin.
          </p>
        </header>
        
        <NewsFeed articles={articles} />
      </section>
    </>
  )
}