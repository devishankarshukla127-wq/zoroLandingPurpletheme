'use client'

import { useEffect, useRef, useState, type FormEvent } from 'react'
import { ArrowRight, Bookmark, BookmarkCheck, Check, ChevronDown, FileText, Flame, Loader2, X } from 'lucide-react'
import { btnPrimary, btnSecondary } from '@/components/home/brand'
import { tradeRules } from '@/lib/mock/home'
import { getRuleResult, shortDestination, statusMeta, type RuleResult } from '@/lib/mock/rules'
import { cn } from '@/lib/utils'

type Lane = { product: string; destination: string }

const laneKey = (lane: Lane) => `${lane.product}|${lane.destination}`
const laneLabel = (lane: Lane) => `${lane.product} → ${shortDestination[lane.destination] ?? lane.destination}`

function FieldSelect({
  id,
  label,
  options,
  value,
  onChange,
}: {
  id: string
  label: string
  options: string[]
  value: string
  onChange: (value: string) => void
}) {
  return (
    <div className="flex min-w-0 flex-1 flex-col gap-1 text-left">
      <label htmlFor={id} className="label-caps px-1 text-[10px] text-ink/60">
        {label}
      </label>
      <div className="relative">
        <select
          id={id}
          name={id}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className="h-11 w-full cursor-pointer appearance-none rounded-[4px] border-[1.5px] border-transparent bg-white pr-9 pl-3 font-medium text-ink transition-colors hover:border-ink/20 focus-visible:border-ink focus-visible:outline-none"
        >
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        <ChevronDown
          aria-hidden="true"
          className="pointer-events-none absolute top-1/2 right-3 size-4 -translate-y-1/2 text-ink/70"
        />
      </div>
    </div>
  )
}

function RuleResultPanel({
  lane,
  result,
  saved,
  onSave,
  onClose,
}: {
  lane: Lane
  result: RuleResult
  saved: boolean
  onSave: () => void
  onClose: () => void
}) {
  const meta = statusMeta[result.status]
  return (
    <div className="relative w-full rounded-[20px] bg-white p-4 text-left text-ink shadow-[0_24px_60px_-28px_rgba(11,11,15,0.45)] sm:p-5">
      <button
        type="button"
        onClick={onClose}
        aria-label="Close result"
        className="absolute top-3 right-3 z-10 flex size-8 items-center justify-center rounded-[4px] text-ink/60 transition-colors hover:bg-ink/5 hover:text-ink focus-visible:ring-2 focus-visible:ring-ink focus-visible:outline-none"
      >
        <X aria-hidden="true" className="size-4" />
      </button>

      <div className="rule-stagger flex flex-col gap-3.5">
        <div className="flex flex-wrap items-center gap-2 pr-8">
          <span className={cn('label-caps inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px]', meta.tone)}>
            <span aria-hidden="true" className={cn('size-1.5 rounded-full', meta.dot)} />
            {meta.label}
          </span>
          <span className="label-caps text-[10px] text-ink/55">{laneLabel(lane)}</span>
        </div>

        <p className="font-display text-[22px] leading-[1.1] text-balance">{result.summary}</p>

        {result.changedThisWeek && (
          <p className="flex items-start gap-2.5 rounded-xl bg-periwinkle-soft px-3 py-2.5 text-sm">
            <span aria-hidden="true" className="mt-px flex size-5 shrink-0 items-center justify-center rounded-full bg-coral">
              <Flame className="size-3 fill-white text-white" />
            </span>
            <span>
              <span className="font-display">Changed this week · </span>
              {result.changedThisWeek}
            </span>
          </p>
        )}

        <div>
          <h3 className="label-caps text-[10px] text-ink/55">What you need to do</h3>
          <ol className="mt-2 flex flex-col gap-2">
            {result.steps.map((step, index) => (
              <li key={step} className="flex items-start gap-2.5 text-sm">
                <span
                  aria-hidden="true"
                  className="flex size-5 shrink-0 items-center justify-center rounded-md bg-periwinkle font-display text-[11px] text-ink"
                >
                  {index + 1}
                </span>
                {step}
              </li>
            ))}
          </ol>
        </div>

        <div>
          <h3 className="label-caps text-[10px] text-ink/55">Documents</h3>
          <ul className="mt-2 flex flex-wrap gap-1.5">
            {result.documents.map((doc) => (
              <li key={doc} className="inline-flex items-center gap-1 rounded-md bg-canvas px-2.5 py-1 text-xs">
                <FileText aria-hidden="true" className="size-3 text-ink/55" />
                {doc}
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-line pt-3.5">
          <p className="text-xs text-ink/55">
            Source: {result.authority} · <span className="italic">sample data</span>
          </p>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={onSave}
              disabled={saved}
              className={cn(btnSecondary, 'h-9', saved && 'border-periwinkle bg-periwinkle-soft hover:bg-periwinkle-soft')}
            >
              {saved ? (
                <BookmarkCheck aria-hidden="true" className="size-4" />
              ) : (
                <Bookmark aria-hidden="true" className="size-4" />
              )}
              {saved ? 'Saved' : 'Save lane'}
            </button>
            <a href="/home#trade-rules" className={cn(btnPrimary, 'group h-9')}>
              Full rules
              <ArrowRight aria-hidden="true" className="size-4 transition-transform group-hover:translate-x-0.5" />
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export function RulesCheckerCard() {
  const [product, setProduct] = useState(tradeRules.products[0])
  const [destination, setDestination] = useState(tradeRules.destinations[0])
  const [savedLanes, setSavedLanes] = useState<Lane[]>(tradeRules.savedLanes)
  const [checking, setChecking] = useState(false)
  const [checked, setChecked] = useState<{ lane: Lane; result: RuleResult } | null>(null)
  const [justSaved, setJustSaved] = useState<string | null>(null)
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined)

  useEffect(() => () => clearTimeout(timer.current), [])

  const runCheck = (lane: Lane) => {
    clearTimeout(timer.current)
    setChecking(true)
    // Short delay stands in for the network call so the loading state is visible.
    timer.current = setTimeout(() => {
      setChecked({ lane, result: getRuleResult(lane.product, lane.destination) })
      setChecking(false)
    }, 550)
  }

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()
    runCheck({ product, destination })
  }

  const pickLane = (lane: Lane) => {
    setProduct(lane.product)
    setDestination(lane.destination)
    runCheck(lane)
  }

  const changeSelection = (next: Partial<Lane>) => {
    if (next.product) setProduct(next.product)
    if (next.destination) setDestination(next.destination)
    setChecked(null)
  }

  const saveLane = (lane: Lane) => {
    if (savedLanes.some((l) => laneKey(l) === laneKey(lane))) return
    setSavedLanes((prev) => [...prev, lane])
    setJustSaved(laneKey(lane))
  }

  const isSaved = checked ? savedLanes.some((l) => laneKey(l) === laneKey(checked.lane)) : false
  const open = Boolean(checked)
  const changedLane = tradeRules.savedLanes[0]

  return (
    <section
      id="trade-rules"
      aria-labelledby="trade-rules-heading"
      className="relative isolate overflow-hidden rounded-[24px] bg-periwinkle"
    >
      {/* Tilted "rule changed" card, echoing the "12 enquiries this week" card on the landing page */}
      <button
        type="button"
        onClick={() => pickLane(changedLane)}
        className="group absolute top-6 right-6 hidden rotate-[4deg] items-center gap-3 rounded-2xl bg-white py-3 pr-4 pl-3 text-left shadow-[0_14px_30px_-18px_rgba(11,11,15,0.5)] transition-transform duration-300 hover:rotate-0 hover:-translate-y-0.5 focus-visible:ring-2 focus-visible:ring-ink focus-visible:outline-none sm:flex"
      >
        <span aria-hidden="true" className="relative flex size-9 items-center justify-center rounded-full bg-coral">
          <span className="absolute inset-0 animate-ping rounded-full bg-coral/40 motion-reduce:hidden" />
          <Flame className="relative size-4 fill-white text-white" />
        </span>
        <span className="leading-tight">
          <span className="block font-display text-xl text-ink">{tradeRules.changesThisWeek}</span>
          <span className="block text-xs text-ink/70">rule changed · {laneLabel(changedLane)}</span>
        </span>
      </button>

      <div className="flex flex-col gap-5 p-5 sm:p-7">
        <div className="flex flex-col gap-2 sm:pr-48">
          <p className="label-caps text-ink/60">Trade rules &amp; schemes</p>
          <h1
            id="trade-rules-heading"
            className="font-display text-[36px] leading-[0.98] text-balance text-ink sm:text-[48px]"
          >
            Can I export it there?
          </h1>
          <p className="max-w-[40ch] text-[15px] leading-relaxed text-ink/75">
            Pick a product and a destination. We'll show what's allowed and the papers you need.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          aria-busy={checking}
          className="flex w-full flex-col gap-2.5 rounded-[20px] bg-white/45 p-2.5 sm:flex-row sm:items-end"
        >
          <FieldSelect
            id="rules-product"
            label="Product"
            options={tradeRules.products}
            value={product}
            onChange={(value) => changeSelection({ product: value })}
          />
          <FieldSelect
            id="rules-destination"
            label="Destination"
            options={tradeRules.destinations}
            value={destination}
            onChange={(value) => changeSelection({ destination: value })}
          />
          <button
            type="submit"
            disabled={checking}
            className={cn(btnPrimary, 'h-11 min-w-[150px] shrink-0 disabled:cursor-wait')}
          >
            {checking ? (
              <>
                <Loader2 aria-hidden="true" className="size-4 animate-spin" />
                Checking
              </>
            ) : (
              <>
                Check rules
                <ArrowRight aria-hidden="true" className="size-4" />
              </>
            )}
          </button>
        </form>

        {/* grid-rows 0fr → 1fr animates the panel's height without measuring it */}
        <div
          className={cn(
            'grid w-full transition-[grid-template-rows,opacity,margin] duration-400 ease-out',
            open ? 'grid-rows-[1fr] opacity-100' : '-mt-5 grid-rows-[0fr] opacity-0',
          )}
        >
          <div className="min-h-0 overflow-hidden">
            {checked && (
              <RuleResultPanel
                key={laneKey(checked.lane)}
                lane={checked.lane}
                result={checked.result}
                saved={isSaved}
                onSave={() => saveLane(checked.lane)}
                onClose={() => setChecked(null)}
              />
            )}
          </div>
        </div>

        <p className="sr-only" aria-live="polite">
          {checking
            ? 'Checking rules'
            : checked
              ? `${statusMeta[checked.result.status].label}: ${checked.result.summary}`
              : ''}
        </p>

        <div className="flex flex-wrap items-center gap-2 text-sm">
          <span className="label-caps mr-1 text-[10px] text-ink/60">Saved lanes</span>
          <ul className="flex flex-wrap items-center gap-2" aria-label="Saved lanes">
            {savedLanes.map((lane) => {
              const active = checked && laneKey(checked.lane) === laneKey(lane)
              return (
                <li key={laneKey(lane)} className={cn(justSaved === laneKey(lane) && 'lane-pop')}>
                  <button
                    type="button"
                    onClick={() => pickLane(lane)}
                    aria-pressed={Boolean(active)}
                    className={cn(
                      'inline-flex h-8 items-center gap-1.5 rounded-full px-3.5 font-medium transition-colors focus-visible:ring-2 focus-visible:ring-ink focus-visible:outline-none',
                      active ? 'bg-ink text-white' : 'bg-white text-ink hover:bg-white/70',
                    )}
                  >
                    {active && <Check aria-hidden="true" className="size-3.5" />}
                    {laneLabel(lane)}
                  </button>
                </li>
              )
            })}
          </ul>
          <button
            type="button"
            onClick={() => pickLane(changedLane)}
            className="inline-flex h-8 items-center gap-1.5 rounded-full bg-periwinkle-soft px-3 font-medium text-ink focus-visible:ring-2 focus-visible:ring-ink focus-visible:outline-none sm:hidden"
          >
            <Flame aria-hidden="true" className="size-3.5 fill-coral text-coral" />
            {tradeRules.changesThisWeek} rule changed
          </button>
        </div>
      </div>
    </section>
  )
}
