import type { LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

/* Shared pieces that mirror the zorro-x landing page: pastel icon tiles and crisp black buttons. */

export type Tone = 'sun' | 'periwinkle' | 'leaf' | 'peach' | 'mist' | 'coral' | 'white' | 'ink'

export const toneBg: Record<Tone, string> = {
  sun: 'bg-periwinkle-soft text-ink',
  periwinkle: 'bg-periwinkle text-ink',
  leaf: 'bg-periwinkle-soft text-ink',
  peach: 'bg-periwinkle-soft text-ink',
  mist: 'bg-periwinkle-soft text-ink',
  coral: 'bg-coral text-white',
  white: 'bg-white text-ink',
  ink: 'bg-ink text-white',
}

export function IconTile({
  icon: Icon,
  label,
  tone = 'sun',
  size = 'md',
  className,
}: {
  icon?: LucideIcon
  label?: string
  tone?: Tone
  size?: 'sm' | 'md' | 'lg'
  className?: string
}) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        'flex shrink-0 items-center justify-center font-display leading-none',
        toneBg[tone],
        size === 'sm' && 'size-8 rounded-lg text-xs',
        size === 'md' && 'size-10 rounded-xl text-sm',
        size === 'lg' && 'size-12 rounded-2xl text-base',
        className,
      )}
    >
      {Icon ? <Icon className={size === 'sm' ? 'size-4' : 'size-5'} strokeWidth={2} /> : label}
    </span>
  )
}

const focus =
  'outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2 focus-visible:ring-offset-white'

/** Black, square, uppercase — the landing page's JOIN THE BETA / SIGN UP button. */
export const btnPrimary = cn(
  'inline-flex h-10 items-center justify-center gap-2 rounded-[4px] bg-ink px-4 font-display text-[12px] tracking-[0.04em] text-white uppercase transition-[background-color,transform] hover:bg-[#2a2a33] active:scale-[0.98]',
  focus,
)

/** White with a black outline — the landing page's SIGN IN button. */
export const btnSecondary = cn(
  'inline-flex h-10 items-center justify-center gap-2 rounded-[4px] border-[1.5px] border-ink bg-white px-4 font-display text-[12px] tracking-[0.04em] text-ink uppercase transition-[background-color,transform] hover:bg-canvas active:scale-[0.98]',
  focus,
)

export const btnGhost = cn(
  'inline-flex h-10 items-center gap-2 rounded-[4px] px-3 text-sm font-medium text-ink transition-colors hover:bg-ink/5',
  focus,
)

export const cardBase = 'rounded-[24px] border border-line bg-white'
export const cardHover =
  'transition-[transform,box-shadow] duration-300 ease-out hover:-translate-y-0.5 hover:shadow-[0_18px_40px_-24px_rgba(11,11,15,0.35)]'
