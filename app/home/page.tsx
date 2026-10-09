import { AppSidebar } from '@/components/home/app-sidebar'
import { FeedPlaceholder } from '@/components/home/feed-placeholder'
import { MobileTopBar } from '@/components/home/mobile-top-bar'
import { RightRailPlaceholder } from '@/components/home/right-rail-placeholder'

export default function HomePage() {
  return (
    <div className="min-h-dvh bg-canvas md:flex md:gap-6 md:p-4">
      <MobileTopBar activeKey="home" />
      <AppSidebar activeKey="home" />

      <div className="flex min-w-0 flex-1 justify-center gap-6 p-4 md:p-0 xl:gap-10 xl:pr-6">
        <main className="w-full max-w-[880px] min-w-0">
          <FeedPlaceholder />
        </main>
        <aside aria-label="Your activity" className="hidden w-[300px] shrink-0 lg:block xl:ml-4">
          {/* keep the rail inset from the right edge */}
          <div className="sticky top-4">
            <RightRailPlaceholder />
          </div>
        </aside>
      </div>
    </div>
  )
}
