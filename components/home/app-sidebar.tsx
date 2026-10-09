'use client'

import { ChevronsLeft, ChevronsRight } from 'lucide-react'
import { TooltipProvider } from '@/components/ui/tooltip'
import { useSidebarCollapsed } from '@/hooks/use-sidebar-collapsed'
import type { NavKey } from '@/lib/mock/home'
import { cn } from '@/lib/utils'
import { ShareUpdateButton, SidebarBrand, SidebarNav } from './sidebar-nav'

export function AppSidebar({ activeKey }: { activeKey: NavKey }) {
  const { collapsed, toggle, hydrated } = useSidebarCollapsed()

  return (
    <TooltipProvider delay={150}>
      {/* Spacer reserves the sidebar's width in the flex layout; the aside itself is fixed and vertically centered. */}
      <div
        aria-hidden="true"
        className={cn(
          'hidden shrink-0 md:block',
          hydrated && 'transition-[width] duration-250 ease-in-out',
          collapsed ? 'w-16' : 'w-52',
        )}
      />
      <aside
        className={cn(
          'fixed top-1/2 left-4 z-30 hidden -translate-y-1/2 overflow-hidden rounded-[20px] border border-white/10 bg-white p-3 md:block',
          hydrated && 'transition-[width] duration-250 ease-in-out',
          collapsed ? 'w-16' : 'w-52',
        )}
      >
        <SidebarBrand collapsed={collapsed} />
        <div className="my-3 h-px bg-line" />

        <nav id="primary-nav" aria-label="Primary">
          <SidebarNav collapsed={collapsed} activeKey={activeKey} />
        </nav>

        <div className="mt-4">
          <ShareUpdateButton collapsed={collapsed} />
        </div>

        <div className="mt-4 flex px-1">
          <button
            type="button"
            onClick={toggle}
            aria-controls="primary-nav"
            aria-expanded={!collapsed}
            aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            className="flex size-8 items-center justify-center rounded-full border border-line bg-surface-soft text-ink/70 outline-none transition-colors hover:bg-canvas hover:text-ink focus-visible:ring-2 focus-visible:ring-ink/60"
          >
            {collapsed ? (
              <ChevronsRight aria-hidden="true" className="size-4" />
            ) : (
              <ChevronsLeft aria-hidden="true" className="size-4" />
            )}
          </button>
        </div>
      </aside>
    </TooltipProvider>
  )
}
