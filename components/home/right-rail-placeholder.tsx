import { ArrowRight, ArrowUpRight, CalendarDays, Flame, GraduationCap, ShieldCheck, Sparkles } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

import { btnPrimary, cardHover, IconTile, toneBg, type Tone } from '@/components/home/brand'
import { CountUp } from '@/components/home/count-up'
import { learnItems, trustStatus, weeklySummary, zorroFamily } from '@/lib/mock/home'
import { cn } from '@/lib/utils'

type RailCardProps = {
  title: string
  subtitle: string
  icon: LucideIcon
  tone: Tone
  iconTone: Tone
  children: React.ReactNode
  className?: string
  aside?: React.ReactNode
}

function RailCard({ title, subtitle, icon, tone, iconTone, children, className, aside }: RailCardProps) {
  return (
    <section
      aria-label={title}
      className={cn('relative overflow-hidden rounded-[24px] p-5', toneBg[tone], tone === 'white' && 'border border-line', cardHover, className)}
    >
      <header className="flex items-center gap-3">
        <IconTile icon={icon} tone={iconTone} size="sm" />
        <div className="min-w-0 leading-tight">
          <h2 className="truncate font-display text-[15px] text-ink">{title}</h2>
          <p className="truncate text-xs text-ink/60">{subtitle}</p>
        </div>
        {aside && <div className="ml-auto">{aside}</div>}
      </header>
      <div className="relative mt-4">{children}</div>
    </section>
  )
}

/** The circular "Zorro QC verified" seal from the landing page. */
function VerifiedSeal({ className }: { className?: string }) {
  const text = 'ZORRO QC · VERIFIED · ZORRO QC · VERIFIED · '
  return (
    <div aria-hidden="true" className={cn('relative size-[76px] shrink-0 rounded-full bg-white', className)}>
      <svg viewBox="0 0 100 100" className="seal-spin absolute inset-0 size-full">
        <defs>
          <path id="seal-circle" d="M50,50 m-37,0 a37,37 0 1,1 74,0 a37,37 0 1,1 -74,0" />
        </defs>
        <text className="fill-ink font-display" fontSize="9.2" letterSpacing="1.4">
          <textPath href="#seal-circle">{text}</textPath>
        </text>
      </svg>
      <span className="absolute inset-0 m-auto flex size-8 items-center justify-center rounded-lg bg-sun">
        <ShieldCheck className="size-4 text-ink" strokeWidth={2.25} />
      </span>
    </div>
  )
}

function TrustStatusCard() {
  return (
    <RailCard title="Trust status" subtitle={trustStatus.levels[1]} icon={ShieldCheck} tone="sun" iconTone="white" aside={<VerifiedSeal className="-my-3 -mr-1" />}>
      <div className="flex flex-wrap items-center gap-2">
        <span
          aria-current="true"
          className="label-caps rounded-full bg-white px-2.5 py-1 text-[10px] text-ink"
        >
          {trustStatus.current}
        </span>
        <ArrowRight aria-hidden="true" className="size-3.5 text-ink/50" />
        <span className="label-caps inline-flex items-center gap-1 rounded-full bg-leaf px-2.5 py-1 text-[10px] text-ink">
          <ShieldCheck aria-hidden="true" className="size-3" strokeWidth={2.5} />
          Verified
        </span>
      </div>
      <p className="mt-4 text-pretty font-display text-[26px] leading-[1.02] text-ink">
        Get a trade code buyers can check.
      </p>
      <p className="mt-2 text-pretty text-sm leading-relaxed text-ink/75">
        Verified members see leads shared only with verified exporters.
      </p>
      <button type="button" className={cn(btnPrimary, 'group mt-5 h-11 w-full justify-between')}>
        Get verified
        <ArrowRight aria-hidden="true" className="size-4 transition-transform group-hover:translate-x-0.5" />
      </button>
    </RailCard>
  )
}

const statTones: Tone[] = ['peach', 'periwinkle', 'leaf']

function WeeklySummaryCard() {
  return (
    <RailCard title="This week" subtitle="Across your lanes" icon={CalendarDays} tone="white" iconTone="periwinkle">
      <ul className="flex flex-col gap-2">
        {weeklySummary.map((row, index) => (
          <li key={row.label} className="flex items-center gap-3">
            <span
              className={cn(
                'relative flex size-12 shrink-0 items-center justify-center rounded-xl font-display text-[22px] leading-none',
                toneBg[statTones[index % statTones.length]],
              )}
            >
              <CountUp value={Number(row.value)} />
              {index === 0 && (
                <span aria-hidden="true" className="absolute -top-1.5 -right-1.5 flex size-5 items-center justify-center rounded-full bg-coral ring-2 ring-white">
                  <Flame className="size-3 fill-white text-white" />
                </span>
              )}
            </span>
            <span className="text-sm leading-snug text-ink/75">{row.label}</span>
          </li>
        ))}
      </ul>
    </RailCard>
  )
}

function LearnCard() {
  return (
    <RailCard title="Learn" subtitle="Picked for your lanes" icon={GraduationCap} tone="peach" iconTone="white">
      <ul className="flex flex-col gap-2">
        {learnItems.map((item) => (
          <li key={item.title}>
            <a
              href="/home#learn"
              className="group flex items-start justify-between gap-3 rounded-2xl bg-white p-3.5 transition-transform hover:-translate-y-0.5 focus-visible:ring-2 focus-visible:ring-ink focus-visible:outline-none"
            >
              <span>
                <span className="label-caps text-[10px] text-ink/55">{item.kind}</span>
                <span className="mt-1 block text-pretty font-display text-[17px] leading-snug text-ink">
                  {item.title}
                </span>
              </span>
              <ArrowUpRight
                aria-hidden="true"
                className="mt-0.5 size-4 shrink-0 text-ink/40 transition-[color,transform] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-ink"
              />
            </a>
          </li>
        ))}
      </ul>
    </RailCard>
  )
}

function ZorroFamilyCard() {
  return (
    <RailCard title="From the Zorro family" subtitle="Other Zorro products" icon={Sparkles} tone="mist" iconTone="white">
      <ul className="flex flex-col gap-3">
        {zorroFamily.map((item) => (
          <li key={item.name} className="flex items-center gap-3">
            <IconTile label={item.initial} tone="white" />
            <div className="min-w-0 leading-tight">
              <p className="font-display text-[17px] text-ink">{item.name}</p>
              <p className="text-xs text-ink/65">{item.description}</p>
            </div>
          </li>
        ))}
      </ul>
    </RailCard>
  )
}

export function RightRailPlaceholder() {
  return (
    <div className="flex flex-col gap-5">
      <TrustStatusCard />
      <WeeklySummaryCard />
      <LearnCard />
      <ZorroFamilyCard />
    </div>
  )
}
