export type NavKey = 'home' | 'trade-rules' | 'directory' | 'learn' | 'messages' | 'verified-profile'

export interface NavItem {
  key: NavKey
  label: string
  fullLabel: string
  href: string
}

export const navItems: NavItem[] = [
  { key: 'home', label: 'Home', fullLabel: 'Home', href: '/home' },
  { key: 'trade-rules', label: 'Trade rules', fullLabel: 'Trade rules & schemes', href: '/home#trade-rules' },
  { key: 'directory', label: 'Directory', fullLabel: 'Directory', href: '/home#directory' },
  { key: 'learn', label: 'Learn', fullLabel: 'Learn', href: '/home#learn' },
  { key: 'messages', label: 'Messages', fullLabel: 'Messages', href: '/home#messages' },
  { key: 'verified-profile', label: 'Verified profile', fullLabel: 'Verified profile', href: '/home#verified-profile' },
]

export const tradeRules = {
  products: ['Mango', 'Rice', 'Turmeric', 'Cashew'],
  destinations: ['United States', 'United Arab Emirates', 'United Kingdom', 'Saudi Arabia'],
  savedLanes: [
    { product: 'Mango', destination: 'United States' },
    { product: 'Rice', destination: 'United Arab Emirates' },
  ],
  changesThisWeek: 1,
}

export const directory = {
  tabs: ['Services', 'Finance'],
  categories: ['Warehousing', 'Transport', 'CHAs', 'Labs', 'Packaging', 'Certification', 'Agents'],
  activeCategory: 'CHAs',
}

export const feedInterests = ['Rice', 'Mango', 'Gulf', 'USA']
export const feedFilters: FeedFilter[] = ['For you', 'Trade leads', 'Learn', 'Verified only']

export type FeedFilter = 'For you' | 'Trade leads' | 'Learn' | 'Verified only'

export interface FeedPost {
  id: string
  kind: 'lead' | 'video'
  context: string
  headline?: string
  details?: { label: string; value: string }[]
  video?: { title: string; length: string; thumbnail: string }
  author: string
  initials: string
  verifiedCode?: string
  tier: 'Core trade' | 'Wider ecosystem'
  role: string
  time: string
  body: string
  visibility: string
  action: string
  appreciations: number
}

export const feedPosts: FeedPost[] = [
  {
    id: 'p1',
    kind: 'lead',
    context: 'Suggested · Rice · Gulf',
    headline: 'Basmati lot ready for Gulf buyers',
    details: [
      { label: 'Commodity', value: '1121 Basmati' },
      { label: 'Quantity', value: '25 MT' },
      { label: 'Port', value: 'Mundra' },
    ],
    author: 'Shree Agro Exports',
    initials: 'SA',
    verifiedCode: 'ZQC-2041',
    tier: 'Core trade',
    role: 'Exporter · Rice & pulses',
    time: '2h',
    body: 'Lot ready for dispatch. Lab report and QC inspection attached to our profile. Looking for a buyer in the Gulf region.',
    visibility: 'Visible to verified buyers',
    action: 'Send enquiry',
    appreciations: 18,
  },
  {
    id: 'p2',
    kind: 'video',
    context: 'Suggested · Mango · USA',
    video: {
      title: 'Mango to the USA, step by step',
      length: '6:42',
      thumbnail: '/images/rules/packhouse.png',
    },
    author: 'Zorro-X Learn',
    initials: 'ZL',
    tier: 'Wider ecosystem',
    role: 'Video guide',
    time: '5h',
    body: 'Walkthrough of the treatment and inspection steps for shipping mangoes to the US, filmed at a packhouse.',
    visibility: 'Public',
    action: 'Watch',
    appreciations: 42,
  },
  {
    id: 'p3',
    kind: 'lead',
    context: 'Suggested · Mango · your region',
    headline: 'Season mango ready for aggregation',
    details: [
      { label: 'Commodity', value: 'Alphonso mango' },
      { label: 'Quantity', value: '40 MT' },
      { label: 'Port', value: 'Nhava Sheva' },
    ],
    author: 'Kisan Sangam FPO',
    initials: 'KS',
    verifiedCode: 'ZQC-1187',
    tier: 'Core trade',
    role: 'Farmer producer organisation',
    time: '6h',
    body: 'Our member farmers have mango ready for aggregation this season. Open to conversations with exporters.',
    visibility: 'Visible to verified buyers',
    action: 'Send enquiry',
    appreciations: 9,
  },
]

export const trustStatus = {
  levels: ['Self-declared', 'Core trade · Exporter'],
  current: 'Self-declared',
}

export const weeklySummary = [
  { label: 'Rule changes on your lanes', value: '1' },
  { label: 'Buyers who viewed your profile', value: '4' },
  { label: 'New posts in your products', value: '12' },
]

export const learnItems = [
  { kind: 'Article', title: 'A first-time exporter’s guide to RCMC' },
  { kind: 'Podcast', title: 'Clearing customs without a broker' },
]

export const zorroFamily = [
  { name: 'Zorro', initial: 'Z', description: 'Identity and verification for trade' },
  { name: 'Seion', initial: 'S', description: 'Community for verified members' },
]
