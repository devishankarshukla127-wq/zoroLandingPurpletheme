'use client'

import { useState, type FormEvent } from 'react'
import { ArrowRight, Search } from 'lucide-react'

export function SearchBar() {
  const [query, setQuery] = useState('')

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()
    // Search isn't wired to a backend yet.
  }

  return (
    <form role="search" onSubmit={handleSubmit} className="relative w-full">
      {/* Soft periwinkle glow behind the pill */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-4 top-3 -bottom-2 rounded-full bg-periwinkle/60 blur-xl"
      />
      <div className="relative flex h-14 items-center gap-3 rounded-full border border-white/80 bg-gradient-to-b from-periwinkle to-white pr-2 pl-6 shadow-[0_10px_30px_-12px_rgba(125,138,230,0.55)] transition-shadow focus-within:shadow-[0_14px_36px_-10px_rgba(125,138,230,0.75)]">
        <Search aria-hidden="true" className="size-[18px] shrink-0 text-ink" />
        <label htmlFor="home-search" className="sr-only">
          Search Zorro-X
        </label>
        <input
          id="home-search"
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search rules, agents, services, posts"
          className="h-full min-w-0 flex-1 bg-transparent text-[15px] text-ink placeholder:text-ink/50 focus:outline-none"
        />
        <button
          type="submit"
          aria-label="Search"
          className="flex size-10 shrink-0 items-center justify-center rounded-full bg-ink text-white transition-transform hover:scale-105 focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2 focus-visible:outline-none active:scale-95"
        >
          <ArrowRight aria-hidden="true" className="size-4" />
        </button>
      </div>
    </form>
  )
}
