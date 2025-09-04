"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, PlaySquare, Newspaper } from "lucide-react"
import { cn } from "@/lib/utils"

export function MobileNav() {
  const pathname = usePathname()
  const items = [
    { href: "/", label: "Home", icon: Home },
    { href: "/learning-flow", label: "Learn", icon: PlaySquare },
    { href: "/ai-news", label: "News", icon: Newspaper },
  ]
  return (
    <nav
      className="fixed inset-x-0 bottom-0 z-40 border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 md:hidden"
      role="navigation"
      aria-label="Primary mobile"
    >
      <ul className="mx-auto flex max-w-xl items-center justify-around px-2 py-2">
        {items.map(({ href, label, icon: Icon }) => {
          const active = pathname === href
          return (
            <li key={href}>
              <Link
                href={href}
                className={cn(
                  "flex flex-col items-center gap-1 rounded-md px-3 py-1 text-xs",
                  active ? "text-primary" : "text-muted-foreground hover:text-foreground",
                )}
                aria-current={active ? "page" : undefined}
              >
                <Icon className={cn("h-5 w-5", active && "text-primary")} aria-hidden="true" />
                <span className="leading-4">{label}</span>
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
