'use client'

import { useState } from 'react'
import Image from 'next/image'
import { ArrowRight, Eye, Heart, Play, ShieldCheck } from 'lucide-react'
import type { FeedPost } from '@/lib/mock/home'
import { btnGhost, btnPrimary, cardBase, cardHover, IconTile, toneBg, type Tone } from '@/components/home/brand'
import { cn } from '@/lib/utils'

function PostHeader({ post, tone }: { post: FeedPost; tone: Tone }) {
  const isCore = post.tier === 'Core trade'
  return (
    <header className="flex flex-wrap items-center justify-between gap-3">
      <div className="flex min-w-0 items-center gap-3">
        <IconTile label={post.initials} tone={tone} />
        <div className="min-w-0">
          <h3 className="truncate font-display text-base leading-tight text-ink">{post.author}</h3>
          <p className="truncate text-sm text-ink/60">{post.role}</p>
        </div>
      </div>
      <div className="flex flex-wrap items-center gap-1.5">
        {post.verifiedCode && (
          <span className="label-caps inline-flex items-center gap-1 rounded-full bg-periwinkle-soft px-2.5 py-1 text-[10px] text-ink">
            <ShieldCheck aria-hidden="true" className="size-3.5" />
            Verified · {post.verifiedCode}
          </span>
        )}
        <span
          className={cn(
            'label-caps rounded-full px-2.5 py-1 text-[10px]',
            isCore ? 'bg-ink text-white' : 'bg-mist text-ink',
          )}
        >
          {post.tier}
        </span>
      </div>
    </header>
  )
}

function LeadBody({ post, tone }: { post: FeedPost; tone: Tone }) {
  return (
    <>
      {post.headline && (
        <p className="mt-2 text-balance font-display text-[28px] leading-[1.05] text-ink sm:text-[32px]">
          {post.headline}
        </p>
      )}
      <p className="mt-3 max-w-[52ch] text-[15px] leading-relaxed text-ink/75">{post.body}</p>
      {post.details && (
        <dl className={cn('mt-4 grid grid-cols-3 divide-x divide-ink/10 rounded-2xl', toneBg[tone])}>
          {post.details.map((detail) => (
            <div key={detail.label} className="min-w-0 px-4 py-3">
              <dt className="label-caps text-[10px] text-ink/60">{detail.label}</dt>
              <dd className="mt-1 font-display text-[15px] leading-snug text-ink sm:text-base">{detail.value}</dd>
            </div>
          ))}
        </dl>
      )}
    </>
  )
}

function VideoBody({ post }: { post: FeedPost }) {
  if (!post.video) return null
  return (
    <>
      <p className="mt-2 max-w-[52ch] text-[15px] leading-relaxed text-ink/75">{post.body}</p>
      <div className="group/video relative mt-4 aspect-video overflow-hidden rounded-2xl bg-ink">
        <Image
          src={post.video.thumbnail}
          alt=""
          fill
          sizes="(min-width: 1024px) 600px, 100vw"
          className="object-cover transition-transform duration-700 ease-out group-hover/video:scale-105"
        />
        <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/10 to-transparent" />
        <span
          aria-hidden="true"
          className="absolute top-1/2 left-1/2 flex size-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-2xl bg-periwinkle transition-transform duration-300 ease-out group-hover/video:scale-110"
        >
          <Play className="ml-0.5 size-5 fill-ink text-ink" />
        </span>
        <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-4">
          <p className="font-display text-lg leading-tight text-white">{post.video.title}</p>
          <span className="label-caps shrink-0 rounded-md bg-white px-2 py-0.5 text-[10px] text-ink">
            {post.video.length}
          </span>
        </div>
      </div>
    </>
  )
}

export function FeedPostCard({
  post,
  tone,
  index = 0,
  appreciated,
  onAppreciate,
}: {
  post: FeedPost
  tone: Tone
  index?: number
  appreciated: boolean
  onAppreciate: (next: boolean) => void
}) {
  // Bumped on each new appreciation so the pop animation restarts.
  const [popKey, setPopKey] = useState(0)
  const isVideo = post.kind === 'video'
  const count = post.appreciations + (appreciated ? 1 : 0)

  const toggleAppreciate = () => {
    if (!appreciated) setPopKey((k) => k + 1)
    onAppreciate(!appreciated)
  }

  return (
    <article style={{ '--i': index } as React.CSSProperties} className={cn('feed-in p-5 sm:p-6', cardBase, cardHover)}>
      <PostHeader post={post} tone={tone} />

      <div className="mt-5">
        <p className="label-caps text-ink/55">
          {post.context} · {post.time}
          <span className="sm:hidden"> · {post.visibility}</span>
        </p>
        {isVideo ? <VideoBody post={post} /> : <LeadBody post={post} tone={tone} />}
      </div>

      <footer className="mt-5 flex items-center justify-between gap-3 border-t border-line pt-4">
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            aria-pressed={appreciated}
            aria-label={`${appreciated ? 'Appreciated' : 'Appreciate'}, ${count} appreciations`}
            onClick={toggleAppreciate}
            className={cn(btnGhost, '-ml-3', appreciated && 'text-coral')}
          >
            <span aria-hidden="true" className="relative flex size-4 items-center justify-center">
              {appreciated && (
                <span key={`ring-${popKey}`} className="heart-ring absolute inset-0 rounded-full border-2 border-coral" />
              )}
              <Heart
                key={popKey}
                className={cn('size-4 transition-colors', appreciated && 'heart-pop fill-coral text-coral')}
              />
            </span>
            <span className="tabular-nums">{count}</span>
          </button>
          <span className="label-caps hidden items-center gap-1.5 text-ink/55 sm:inline-flex">
            <Eye aria-hidden="true" className="size-3.5" />
            {post.visibility}
          </span>
        </div>
        <button type="button" className={cn(btnPrimary, 'group/action')}>
          {isVideo && <Play aria-hidden="true" className="size-3.5 fill-current" />}
          {post.action}
          {!isVideo && (
            <ArrowRight
              aria-hidden="true"
              className="size-4 transition-transform duration-200 group-hover/action:translate-x-0.5"
            />
          )}
        </button>
      </footer>
    </article>
  )
}
