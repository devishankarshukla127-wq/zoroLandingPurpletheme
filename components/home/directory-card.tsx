'use client'

import { useState } from 'react'
import type { LucideIcon } from 'lucide-react'
import {
  ArrowUpRight,
  BadgeCheck,
  Banknote,
  Coins,
  FileCheck2,
  FlaskConical,
  Handshake,
  Landmark,
  ScrollText,
  Receipt,
  Truck,
  Umbrella,
  Warehouse,
} from 'lucide-react'
import { cardBase, IconTile, type Tone } from '@/components/home/brand'
import { cn } from '@/lib/utils'

type Category = { name: string; hint: string; icon: LucideIcon; tone: Tone; count: number }

// Sample listings; counts are placeholders until the directory API exists.
const groups: Record<'Services' | 'Finance', Category[]> = {
  Services: [
    { name: 'CHAs', hint: 'Customs house agents', icon: FileCheck2, tone: 'periwinkle', count: 38 },
    { name: 'Transport', hint: 'Trucking & freight', icon: Truck, tone: 'sun', count: 64 },
    { name: 'Warehousing', hint: 'Cold & dry storage', icon: Warehouse, tone: 'leaf', count: 21 },
    { name: 'Labs', hint: 'Residue & quality tests', icon: FlaskConical, tone: 'peach', count: 17 },
    { name: 'Certification', hint: 'Organic, GlobalGAP', icon: BadgeCheck, tone: 'periwinkle', count: 12 },
    { name: 'Agents', hint: 'Buying & sourcing', icon: Handshake, tone: 'sun', count: 45 },
  ],
  Finance: [
    { name: 'Export credit', hint: 'Pre & post-shipment', icon: Landmark, tone: 'leaf', count: 9 },
    { name: 'Invoice discounting', hint: 'Get paid early', icon: Receipt, tone: 'periwinkle', count: 6 },
    { name: 'Trade insurance', hint: 'Cargo & credit cover', icon: Umbrella, tone: 'peach', count: 8 },
    { name: 'Forex', hint: 'Hedging & conversion', icon: Coins, tone: 'sun', count: 5 },
    { name: 'Payments', hint: 'LC & collections', icon: Banknote, tone: 'mist', count: 11 },
    { name: 'Govt schemes', hint: 'Subsidies & incentives', icon: ScrollText, tone: 'leaf', count: 14 },
  ],
}

export function DirectoryCard() {
  const [tab, setTab] = useState<keyof typeof groups>('Services')
  const items = groups[tab]

  return (
    <section id="directory" aria-labelledby="directory-heading" className={cn(cardBase, 'p-5 sm:p-6')}>
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="label-caps text-ink/55">Directory</p>
          <h2 id="directory-heading" className="mt-1 font-display text-[26px] leading-tight text-ink">
            Services &amp; finance
          </h2>
        </div>
        <div role="tablist" aria-label="Directory type" className="flex rounded-[6px] bg-canvas p-1">
          {(Object.keys(groups) as (keyof typeof groups)[]).map((key) => (
            <button
              key={key}
              type="button"
              role="tab"
              aria-selected={tab === key}
              onClick={() => setTab(key)}
              className={cn(
                'h-8 rounded-[4px] px-3.5 text-sm font-medium transition-colors focus-visible:ring-2 focus-visible:ring-ink focus-visible:outline-none',
                tab === key ? 'bg-ink text-white' : 'text-ink/70 hover:text-ink',
              )}
            >
              {key}
            </button>
          ))}
        </div>
      </div>

      <ul key={tab} className="mt-5 grid grid-cols-2 gap-2 sm:grid-cols-3">
        {items.map((item, index) => (
          <li key={item.name} className="feed-in" style={{ '--i': index } as React.CSSProperties}>
            <a
              href="/home#directory"
              title={item.hint}
              className="group relative flex h-full flex-col gap-3 rounded-2xl border border-line p-3.5 transition-[background-color,border-color] hover:border-ink/15 hover:bg-canvas focus-visible:ring-2 focus-visible:ring-ink focus-visible:outline-none"
            >
              <IconTile icon={item.icon} tone={item.tone} />
              <ArrowUpRight
                aria-hidden="true"
                className="absolute top-3.5 right-3.5 size-4 text-ink/30 transition-[color,transform] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-ink"
              />
              <span className="leading-tight">
                <span className="block font-display text-[15px] text-ink">{item.name}</span>
                <span className="mt-1 block text-xs text-ink/55">{item.hint}</span>
                <span className="label-caps mt-2 block text-[10px] text-ink/45">{item.count} listed</span>
              </span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  )
}
