import { SwipeDeck } from "@/components/swipe-deck"

export default function LearningFlowPage() {
  return (
    <>
      {/* Navbar removed; it's rendered globally in app/layout.tsx to avoid duplicates */}
      <section className="max-w-4xl mx-auto px-4 py-8 flex flex-col items-center gap-6">
        <header className="w-full max-w-xl">
          <h1 className="text-2xl font-semibold text-balance">Learning Flow</h1>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Swipe short, motivational videos. Like to personalize your feed. Use ← Skip, → Like, ↑ Rewind.
          </p>
        </header>
        <SwipeDeck />
      </section>
    </>
  )
}
