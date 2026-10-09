'use client'

import { useCallback, useEffect, useState } from 'react'

const STORAGE_KEY = 'zorro-x:sidebar-collapsed'

export function useSidebarCollapsed() {
  const [collapsed, setCollapsed] = useState(false)
  // Transitions stay off until the stored value is applied, so a saved collapsed state doesn't animate on load.
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    try {
      setCollapsed(window.localStorage.getItem(STORAGE_KEY) === 'true')
    } catch {}
    const frame = requestAnimationFrame(() => setHydrated(true))
    return () => cancelAnimationFrame(frame)
  }, [])

  const toggle = useCallback(() => {
    setCollapsed((prev) => {
      const next = !prev
      try {
        window.localStorage.setItem(STORAGE_KEY, String(next))
      } catch {}
      return next
    })
  }, [])

  return { collapsed, toggle, hydrated }
}
