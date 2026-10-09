import { DirectoryCard } from '@/components/home/directory-card'
import { RulesCheckerCard } from '@/components/home/rules-checker-card'
import { SuggestedFeed } from '@/components/home/suggested-feed'

export function FeedPlaceholder() {
  return (
    <div className="flex flex-col gap-5">
      <RulesCheckerCard />
      <DirectoryCard />
      <SuggestedFeed />
    </div>
  )
}
