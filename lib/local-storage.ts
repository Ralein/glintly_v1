export function lsGet<T>(key: string, fallback: T): T {
  try {
    if (typeof window === "undefined") return fallback
    const raw = window.localStorage.getItem(key)
    return raw ? (JSON.parse(raw) as T) : fallback
  } catch {
    return fallback
  }
}

export function lsSet<T>(key: string, value: T) {
  try {
    if (typeof window === "undefined") return
    window.localStorage.setItem(key, JSON.stringify(value))
  } catch {
    // ignore
  }
}
