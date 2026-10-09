'use client'

import Link from 'next/link'
import type { ReactElement } from 'react'
import {
  BookOpen,
  FileText,
  House,
  type LucideIcon,
  MessageCircle,
  Plus,
  Search,
  ShieldCheck,
} from 'lucide-react'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { cn } from '@/lib/utils'
import { type NavKey, navItems } from '@/lib/mock/home'

const navIcons: Record<NavKey, LucideIcon> = {
  home: House,
  'trade-rules': FileText,
  directory: Search,
  learn: BookOpen,
  messages: MessageCircle,
  'verified-profile': ShieldCheck,
}

const focusRing =
  'outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-rail'

const labelFade = 'min-w-0 truncate whitespace-nowrap transition-opacity duration-150 ease-out'

interface SidebarNavProps {
  collapsed: boolean
  activeKey: NavKey
  onNavigate?: () => void
}

function WithTooltip({
  enabled,
  label,
  children,
}: {
  enabled: boolean
  label: string
  children: ReactElement
}) {
  if (!enabled) return children
  return (
    <Tooltip>
      <TooltipTrigger render={children} />
      <TooltipContent side="right" sideOffset={10}>
        {label}
      </TooltipContent>
    </Tooltip>
  )
}

export function SidebarBrand({ collapsed }: { collapsed: boolean }) {
  return (
    <div className="flex h-10 items-center px-1">
      {/* Wordmark pill from the landing page; collapses to the "z" mark */}
      <span
        className={cn(
          'flex h-8 items-center overflow-hidden rounded-[10px] bg-white font-display text-[17px] leading-none text-ink transition-[width,padding] duration-250 ease-in-out',
          collapsed ? 'w-9 justify-center px-0' : 'w-[92px] px-3',
        )}
      >
        <span aria-hidden={collapsed || undefined}>{collapsed ? 'z' : 'zorro-x'}</span>
      </span>
      {collapsed && <span className="sr-only">zorro-x</span>}
    </div>
  )
}

export function SidebarNav({ collapsed, activeKey, onNavigate }: SidebarNavProps) {
  return (
    <ul className="flex flex-col gap-1">
      {navItems.map((item) => {
        const Icon = navIcons[item.key]
        const active = item.key === activeKey
        return (
          <li key={item.key}>
            <WithTooltip enabled={collapsed} label={item.fullLabel}>
              <Link
                href={item.href}
                onClick={onNavigate}
                title={collapsed ? undefined : item.fullLabel}
                aria-current={active ? 'page' : undefined}
                className={cn(
                  'group/nav flex h-10 w-full items-center gap-3 overflow-hidden rounded-xl px-2.5 text-sm transition-colors',
                  focusRing,
                  active
                    ? 'bg-white font-medium text-ink'
                    : 'text-white/65 hover:bg-white/10 hover:text-white',
                )}
              >
                <Icon
                  aria-hidden="true"
                  className="size-5 shrink-0 transition-transform duration-200 ease-out group-hover/nav:scale-110"
                  strokeWidth={1.75}
                />
                <span className={cn(labelFade, collapsed && 'opacity-0')}>{item.label}</span>
              </Link>
            </WithTooltip>
          </li>
        )
      })}
    </ul>
  )
}

export function ShareUpdateButton({ collapsed }: { collapsed: boolean }) {
  return (
    <WithTooltip enabled={collapsed} label="Share an update">
      <button
        type="button"
        aria-label={collapsed ? 'Share an update' : undefined}
        className={cn(
          'flex h-10 items-center gap-3 overflow-hidden rounded-[4px] bg-white px-2.5 font-display text-[12px] tracking-[0.04em] text-ink uppercase transition-[background-color,width,transform] duration-250 ease-in-out hover:bg-canvas active:scale-[0.97] [&_svg]:transition-transform [&_svg]:duration-300 hover:[&_svg]:rotate-90',
          focusRing,
          collapsed ? 'w-10' : 'w-full',
        )}
      >
        <Plus aria-hidden="true" className="size-5 shrink-0" strokeWidth={2} />
        <span className={cn(labelFade, collapsed && 'opacity-0')}>Share an update</span>
      </button>
    </WithTooltip>
  )
}
