"use client"

import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Moon, Sun, Laptop } from "lucide-react"
import { useEffect, useState } from "react"

export function ThemeToggle() {
  const { setTheme, resolvedTheme, theme } = useTheme()

  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  const icon = !mounted ? (
    <Sun className="h-4 w-4" aria-hidden="true" />
  ) : resolvedTheme === "dark" ? (
    <Moon className="h-4 w-4" aria-hidden="true" />
  ) : resolvedTheme === "light" ? (
    <Sun className="h-4 w-4" aria-hidden="true" />
  ) : (
    <Laptop className="h-4 w-4" aria-hidden="true" />
  )

  const label = !mounted
    ? "Theme toggle"
    : resolvedTheme === "dark"
      ? "Current theme: Dark"
      : resolvedTheme === "light"
        ? "Current theme: Light"
        : "Current theme: System"

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" aria-label={label} title={label}>
          {icon}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" sideOffset={8}>
        <DropdownMenuItem onClick={() => setTheme("light")} aria-pressed={theme === "light"} className="gap-2">
          <Sun className="h-4 w-4" />
          Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")} aria-pressed={theme === "dark"} className="gap-2">
          <Moon className="h-4 w-4" />
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")} aria-pressed={theme === "system"} className="gap-2">
          <Laptop className="h-4 w-4" />
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
