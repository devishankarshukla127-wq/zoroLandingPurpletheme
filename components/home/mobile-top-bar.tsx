'use client'

import { useState } from 'react'
import { Menu } from 'lucide-react'
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import type { NavKey } from '@/lib/mock/home'
import { ShareUpdateButton, SidebarBrand, SidebarNav } from './sidebar-nav'

export function MobileTopBar({ activeKey }: { activeKey: NavKey }) {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-40 flex h-14 items-center gap-2 border-b border-line bg-canvas/90 px-3 backdrop-blur md:hidden">
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger
          aria-label="Open navigation"
          className="flex size-10 items-center justify-center rounded-xl text-ink outline-none hover:bg-surface focus-visible:ring-2 focus-visible:ring-ink/60"
        >
          <Menu aria-hidden="true" className="size-5" />
        </SheetTrigger>
        <SheetContent side="left" className="w-[260px] gap-0 border-white/5 bg-rail p-3 shadow-none">
          <SheetTitle className="sr-only">Navigation</SheetTitle>
          <SidebarBrand collapsed={false} />
          <div className="my-3 h-px bg-white/10" />
          <nav aria-label="Primary">
            <SidebarNav collapsed={false} activeKey={activeKey} onNavigate={() => setOpen(false)} />
          </nav>
          <div className="mt-4">
            <ShareUpdateButton collapsed={false} />
          </div>
        </SheetContent>
      </Sheet>
      <span className="flex h-8 items-center rounded-[10px] bg-ink px-3 font-display text-[17px] leading-none text-white">zorro-x</span>
    </header>
  )
}
