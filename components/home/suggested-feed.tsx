'use client'

import { useLayoutEffect, useRef, useState } from 'react'
import { feedFilters, feedInterests, feedPosts, type FeedFilter, type FeedPost } from '@/lib/mock/home'
import { FeedPostCard } from '@/components/home/feed-post-card'
import type { Tone } from '@/components/home/brand'
import { cn } from '@/lib/utils'

// Each post keeps its own accent, matching the pastel cards on the landing page.
const postTones: Tone[] = ['sun', 'periwinkle', 'leaf', 'peach']

const filterMatches: Record<FeedFilter, (post: FeedPost) => boolean> = {
  'For you': () => true,
  'Trade leads': (post) => post.kind === 'lead',
  Learn: (post) => post.kind === 'video',
  'Verified only': (post) => Boolean(post.verifiedCode),
}

export function SuggestedFeed() {
  const [activeFilter, setActiveFilter] = useState<FeedFilter>('For you')
  const visiblePosts = feedPosts.filter(filterMatches[activeFilter])
  const [appreciated, setAppreciated] = useState<Set<string>>(() => new Set())
  const groupRef = useRef<HTMLDivElement>(null)
  const [pill, setPill] = useState<{ left: number; width: number } | null>(null)

  // Measure the active button so the dark pill can slide between filters.
  useLayoutEffect(() => {
    const measure = () => {
      const el = groupRef.current?.querySelector<HTMLButtonElement>('[aria-pressed="true"]')
      if (el) setPill({ left: el.offsetLeft, width: el.offsetWidth })
    }
    measure()
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [activeFilter])

  const selectFilter = (filter: FeedFilter, button: HTMLButtonElement) => {
    setActiveFilter(filter)
    button.scrollIntoView({ block: 'nearest', inline: 'nearest', behavior: 'smooth' })
  }

  return (
    <section aria-labelledby="suggested-heading" className="mx-auto flex w-full max-w-[750px] flex-col gap-5">
      <div className="flex flex-col gap-3">
        <div>
          <h2 id="suggested-heading" className="font-display text-[32px] leading-tight text-ink">
            Suggested for you
          </h2>
          <p className="mt-1 text-sm text-ink/65">From your products and regions. You decide who to contact.</p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <span className="label-caps mr-1 text-[10px] text-ink/55">Your interests</span>
        <ul aria-label="Your interests" className="contents">
          {feedInterests.map((interest) => (
            <li
              key={interest}
              className="rounded-full bg-mist px-3 py-1 text-sm font-medium text-ink"
            >
              {interest}
            </li>
          ))}
        </ul>
        </div>

        <div
          ref={groupRef}
          role="group"
          aria-label="Filter feed"
          className="relative flex w-full gap-1 overflow-x-auto rounded-full border border-line bg-white p-1 [scrollbar-width:none] sm:w-fit [&::-webkit-scrollbar]:hidden"
        >
          {pill && (
            <span
              aria-hidden="true"
              className="absolute top-1 bottom-1 left-0 rounded-full bg-ink transition-[transform,width] duration-300 ease-[cubic-bezier(0.2,0.8,0.2,1)]"
              style={{ width: pill.width, transform: `translateX(${pill.left}px)` }}
            />
          )}
          {feedFilters.map((filter) => {
            const isActive = filter === activeFilter
            return (
              <button
                key={filter}
                type="button"
                aria-pressed={isActive}
                onClick={(event) => selectFilter(filter, event.currentTarget)}
                className={cn(
                  'relative z-10 h-9 shrink-0 rounded-full px-3 text-[13px] font-semibold sm:px-4 sm:text-sm transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-1',
                  isActive ? 'text-white' : 'text-ink/70 hover:bg-canvas hover:text-ink',
                  isActive && !pill && 'bg-ink',
                )}
              >
                {filter}
              </button>
            )
          })}
        </div>
      </div>

      {/* Keyed by filter so cards replay their entrance when the filter changes */}
      <div key={activeFilter} className="flex flex-col gap-5" aria-live="polite">
        {visiblePosts.map((post, index) => (
          <FeedPostCard
            key={post.id}
            post={post}
            index={index}
            tone={postTones[feedPosts.indexOf(post) % postTones.length]}
            appreciated={appreciated.has(post.id)}
            onAppreciate={(next) =>
              setAppreciated((prev) => {
                const copy = new Set(prev)
                if (next) copy.add(post.id)
                else copy.delete(post.id)
                return copy
              })
            }
          />
        ))}
      </div>
    </section>
  )
}
